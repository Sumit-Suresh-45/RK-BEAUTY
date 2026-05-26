import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  React.useEffect(() => {
    document.title = "Contact Us | RK Beauty - Visit Our Salon";
  }, []);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending message...');

    const formData = new FormData(e.target);
    const name    = formData.get('name');
    const email   = formData.get('email');
    const phone   = formData.get('phone');
    const message = formData.get('message');

    try {
      // 1. Save to MySQL
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      // 2. Send via Web3Forms email (best-effort)
      formData.append("access_key", "bbf8bd0e-4c1c-423d-b6c0-b0af2bf08a16");
      await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });

      setStatus('Success! We will get back to you promptly.');
      e.target.reset();
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero section container">
        <h1 className="section-title">📍 Contact Us – RK Beauty</h1>
        <p className="contact-intro">
          We’d love to hear from you! Whether you have questions, want to book an appointment, or just want to say hello, RK Beauty is here to help. Reach out through any of the methods below, and we’ll get back to you promptly.
        </p>
      </section>

      <section className="contact-content container section">
        <div className="contact-grid">
          
          {/* Information Column */}
          <div className="contact-info">
            <div className="info-block">
              <h2>🏢 Address</h2>
              <address>
                <strong>RK Beauty Salon</strong><br />
                Ch. Nathu Singh Complex, Main Market, Madanpur Khadar<br />
                Near Chaudhary Bartan, Sarita Vihar,<br />
                New Delhi, Delhi 110076
              </address>
              <a href="https://maps.app.goo.gl/iyVvgnyak2WhYbiL7" target="_blank" rel="noreferrer" className="map-link">View on Google Maps</a>
            </div>

            <div className="info-block">
              <h2>☎️ Phone & Email</h2>
              <p><strong>Phone:</strong> +1 (123) 456-7890</p>
              <p><strong>Email:</strong> contact@rkbeauty.com</p>
            </div>

            <div className="info-block">
              <h2>⏰ Business Hours</h2>
              <ul className="hours-list">
                <li>Monday – Friday: 10:00 AM – 8:00 PM</li>
                <li>Saturday: 10:00 AM – 9:00 PM</li>
                <li>Sunday: 11:00 AM – 6:00 PM</li>
              </ul>
            </div>

            <div className="info-block">
              <h2>🌐 Social Media</h2>
              <p>Stay connected and follow us for updates, tips, and offers:</p>
              <div className="social-links-contact">
                <a href="https://facebook.com/rkbeauty" target="_blank" rel="noreferrer">Facebook</a>
                <a href="https://instagram.com/rkbeauty" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://twitter.com/rkbeauty" target="_blank" rel="noreferrer">Twitter</a>
                <a href="https://youtube.com/rkbeauty" target="_blank" rel="noreferrer">YouTube</a>
              </div>
            </div>

            <div className="info-block quick-links">
              <h2>💡 Quick Links</h2>
              <div className="links-row">
                <Link to="/booking">Book Appointment</Link>
                <Link to="/services">Services</Link>
                <Link to="/services">Offers & Packages</Link>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="contact-form-wrapper">
            <h2>📝 Send Us a Message</h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-light)' }}>
              Fill out the form below to send us a message directly.
            </p>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" required placeholder="Jane Doe" />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" required placeholder="jane@example.com" />
              </div>

              <div className="form-group">
                <label>Phone (optional)</label>
                <input type="tel" name="phone" placeholder="(555) 123-4567" />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows="5" required placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-submit">Submit Message</button>
              
              {status && (
                <p className={`status-message ${status.includes('Success') ? 'success' : 'error'}`}>
                  {status}
                </p>
              )}
            </form>
          </div>

        </div>
      </section>

      {/* Map Embed Section (Visual Polish) */}
      <section className="map-embed-section container">
        <iframe 
          title="RK Beauty Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14022.38381898565!2d77.2882894!3d28.5218086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce151cdb1c553%3A0xc3412a8e83b4b5e2!2sMadanpur%20Khadar%2C%20New%20Delhi%2C%20Delhi%20110076%2C%20India!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus"
          width="100%" 
          height="400" 
          style={{ border: 0, borderRadius: '8px', filter: 'grayscale(0.6) contrast(1.2)' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
