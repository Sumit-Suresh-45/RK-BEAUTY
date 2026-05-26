import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const serviceOptions = [
  'Haircut & Styling',
  'Hair Coloring',
  'Hair Spa Treatment',
  'Facial Cleanup',
  'Advanced Facial',
  'Bridal Makeup',
  'Party Makeup',
  'Manicure',
  'Pedicure',
  'Full Body Massage',
  'Custom Package (See Notes)',
];

const stylistOptions = ['No Preference', 'Sarah Jenkins', 'Elena Marquez', 'Michelle Tran'];

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM',
];

const Booking = () => {
  React.useEffect(() => {
    document.title = "Book Appointment | RK Beauty";
  }, []);
  const { user } = useAuth();
  const { cartItems, clearCart, addAppointment } = useCart();
  const [status, setStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const suggestedService = cartItems.length > 0
    ? cartItems.map(i => i.name).join(', ')
    : '';

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    service_name: suggestedService || serviceOptions[0],
    appointment_date: '',
    appointment_time: timeSlots[0],
    stylist: stylistOptions[0],
    notes: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    // 1. Save to MySQL
    const result = await addAppointment({
      ...form,
      service_name: cartItems.length > 0 ? cartItems.map(i => i.name).join(', ') : form.service_name,
    });

    if (result?.error) {
      setStatus(result.error);
      setLoading(false);
      return;
    }

    // 2. Also send email via Web3Forms
    try {
      const formData = new FormData();
      formData.append('access_key', 'bbf8bd0e-4c1c-423d-b6c0-b0af2bf08a16');
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('service', form.service_name);
      formData.append('date', form.appointment_date);
      formData.append('time', form.appointment_time);
      formData.append('stylist', form.stylist);
      formData.append('message', form.notes || 'No additional notes.');
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
    } catch { /* email is best-effort */ }

    setIsSuccess(true);
    setStatus('🎉 Your appointment has been booked successfully!');
    clearCart();
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1rem', borderRadius: '10px',
    border: '1px solid rgba(212,175,55,0.25)', background: 'rgba(255,255,255,0.05)',
    color: 'var(--color-text)', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
  };
  const labelStyle = { display: 'block', marginBottom: '0.45rem', color: 'var(--color-text-light)', fontSize: '0.875rem', fontWeight: '500' };

  if (isSuccess) {
    return (
      <div className="container section" style={{ textAlign: 'center', maxWidth: '500px', margin: 'auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌸</div>
        <h1 className="section-title" style={{ marginBottom: '1rem' }}>Booking Confirmed!</h1>
        <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
          Your appointment has been saved. We'll see you soon!
        </p>
        <Link to="/my-bookings" className="btn btn-primary" style={{ display: 'inline-block', padding: '0.875rem 2rem' }}>
          View My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 className="section-title">Book an Appointment</h1>
      <p className="section-subtitle">Schedule your next visit at RK Beauty.</p>

      {cartItems.length > 0 && (
        <div style={{ maxWidth: '600px', margin: '0 auto 1.5rem', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
          <strong style={{ color: '#d4af37' }}>🛒 Services in your cart:</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', color: 'var(--color-text-light)' }}>
            {cartItems.map(item => <li key={item.id}>{item.name} — ${item.price}</li>)}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input style={inputStyle} type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Jane Doe" />
          </div>
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input style={inputStyle} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Email Address</label>
          <input style={inputStyle} type="email" name="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" />
        </div>

        {cartItems.length === 0 && (
          <div>
            <label style={labelStyle}>Select Service</label>
            <select style={inputStyle} name="service_name" value={form.service_name} onChange={handleChange} required>
              {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Preferred Date</label>
            <input style={inputStyle} type="date" name="appointment_date" value={form.appointment_date} onChange={handleChange}
              min={new Date().toISOString().split('T')[0]} required />
          </div>
          <div>
            <label style={labelStyle}>Preferred Time</label>
            <select style={inputStyle} name="appointment_time" value={form.appointment_time} onChange={handleChange}>
              {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Preferred Stylist</label>
          <select style={inputStyle} name="stylist" value={form.stylist} onChange={handleChange}>
            {stylistOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Additional Notes <span style={{ opacity: 0.5 }}>(optional)</span></label>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} name="notes" value={form.notes} onChange={handleChange} rows="3" placeholder="Any special requests?" />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '1rem', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Booking...' : 'Confirm Appointment'}
        </button>

        {status && !isSuccess && (
          <p style={{ textAlign: 'center', color: status.includes('🎉') ? '#4caf50' : '#ff6b6b' }}>{status}</p>
        )}
      </form>
    </div>
  );
};

export default Booking;
