import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './MyBookings.css';

const statusColor = {
  Scheduled:  { bg: 'rgba(212,175,55,0.15)',  color: '#d4af37' },
  Confirmed:  { bg: 'rgba(76,175,80,0.15)',   color: '#4caf50' },
  Completed:  { bg: 'rgba(33,150,243,0.15)',  color: '#64b5f6' },
  Cancelled:  { bg: 'rgba(244,67,54,0.15)',   color: '#ef9a9a' },
};

const MyBookings = () => {
  useEffect(() => {
    document.title = "My Appointments | RK Beauty";
  }, []);
  const { appointments, cancelAppointment } = useCart();
  const { user } = useAuth();
  const [cancelling, setCancelling] = useState(null);

  const handleCancel = async (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCancelling(id);
    await cancelAppointment(id);
    setCancelling(null);
  };

  return (
    <div className="container section bookings-page">
      <div className="bookings-header">
        <div>
          <h1 className="section-title">My Appointments</h1>
          <p className="section-subtitle">Welcome, {user?.name}. Here are all your bookings.</p>
        </div>
        <Button to="/services" variant="primary">Book New Service</Button>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-bookings">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
          <p>You have no appointments booked yet.</p>
          <Link to="/services" className="browse-link">Browse our services</Link>
        </div>
      ) : (
        <div className="bookings-grid">
          {appointments.map((app) => {
            const style = statusColor[app.status] || statusColor.Scheduled;
            return (
              <div key={app.id} className="booking-card">
                <div className="booking-card-header">
                  <h3>📋 Appointment #{app.id}</h3>
                  <span className="status-badge" style={{ background: style.bg, color: style.color }}>
                    {app.status}
                  </span>
                </div>

                <div className="booking-details">
                  <p><strong>👤 Name:</strong> {app.name}</p>
                  <p><strong>📧 Email:</strong> {app.email}</p>
                  {app.phone && <p><strong>📞 Phone:</strong> {app.phone}</p>}

                  <div className="booking-services" style={{ marginTop: '0.75rem' }}>
                    <strong>💇 Service:</strong>
                    <p style={{ marginTop: '0.3rem', color: 'var(--color-text-light)' }}>{app.service_name}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {app.appointment_date && (
                      <p><strong>📅 Date:</strong> {new Date(app.appointment_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    )}
                    {app.appointment_time && (
                      <p><strong>⏰ Time:</strong> {app.appointment_time}</p>
                    )}
                    {app.stylist && app.stylist !== 'No Preference' && (
                      <p><strong>💁 Stylist:</strong> {app.stylist}</p>
                    )}
                  </div>

                  {app.notes && (
                    <div className="booking-notes">
                      <strong>📝 Notes:</strong>
                      <p>{app.notes}</p>
                    </div>
                  )}

                  <p style={{ fontSize: '0.78rem', color: 'rgba(248,225,231,0.35)', marginTop: '0.75rem' }}>
                    Booked on: {new Date(app.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                <div className="booking-actions">
                  {app.status !== 'Cancelled' && app.status !== 'Completed' && (
                    <button
                      className="btn-cancel"
                      onClick={(e) => handleCancel(e, app.id)}
                      disabled={cancelling === app.id}
                    >
                      {cancelling === app.id ? 'Cancelling...' : 'Cancel Booking'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
