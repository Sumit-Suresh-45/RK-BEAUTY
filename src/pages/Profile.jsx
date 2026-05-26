import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, token, login } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    document.title = "My Profile | RK Beauty";
    if (user) {
      setFormData({
        name: user.name,
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        // Update AuthContext user data
        login(data.user, token);
        setMessage({ type: 'success', text: 'Profile updated successfully! ✨' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="container section">Please log in to view your profile.</div>;

  return (
    <div className="profile-page container section">
      <div className="profile-header">
        <h1 className="section-title">My Account</h1>
        <p className="section-subtitle">Manage your personal information and preferences.</p>
      </div>

      <div className="profile-grid">
        {/* Profile Sidebar/Summary */}
        <div className="profile-sidebar card-style">
          <div className="user-avatar-large">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="user-name-display">{user.name}</h2>
          <p className="user-email-display">{user.email}</p>
          <div className="membership-badge">
            <span className="badge-icon">💎</span>
            <span className="badge-text">Premium Member</span>
          </div>
          <div className="join-date">
            Joined: {new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* Profile Content/Form */}
        <div className="profile-main card-style">
          <div className="card-header">
            <h3>Personal Information</h3>
            <button 
              className={`btn-edit ${isEditing ? 'active' : ''}`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          {message.text && (
            <div className={`form-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="read-only"
                />
                <small className="help-text">Email cannot be changed for security.</small>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g. +91 9876543210"
                />
              </div>

              <div className="form-group">
                <label>Account Role</label>
                <input
                  type="text"
                  value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  disabled
                  className="read-only"
                />
              </div>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
