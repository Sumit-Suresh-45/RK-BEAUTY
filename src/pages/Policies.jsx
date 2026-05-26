import React, { useEffect } from 'react';
import './Policies.css';

const Policies = () => {
  useEffect(() => {
    document.title = "Policies | RK Beauty - Privacy, Terms & Cancellation";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policies-page container section">
      <h1 className="section-title">Our Policies</h1>
      <p className="section-subtitle">Transparency and trust are at the heart of RK Beauty.</p>

      <div className="policies-grid">
        {/* Navigation for links within the page */}
        <aside className="policies-nav">
          <ul>
            <li><a href="#cancellation">Cancellation Policy</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
          </ul>
        </aside>

        <div className="policies-content">
          <section id="cancellation" className="policy-section">
            <h2>📅 Cancellation & Rescheduling</h2>
            <div className="policy-card">
              <p>We value your time and the time of our stylists. To ensure a smooth experience for all guests, please adhere to the following:</p>
              <ul>
                <li><strong>24-Hour Notice:</strong> Cancellations or rescheduling must be done at least 24 hours before your appointment.</li>
                <li><strong>Late Arrivals:</strong> If you are more than 15 minutes late, we may need to reschedule your appointment or shorten the service duration to avoid impacting other guests.</li>
                <li><strong>No-Shows:</strong> Repeated no-shows may require a non-refundable deposit for future bookings.</li>
              </ul>
            </div>
          </section>

          <section id="privacy" className="policy-section">
            <h2>🔒 Privacy Policy</h2>
            <div className="policy-card">
              <p>At RK Beauty, we are committed to protecting your personal information.</p>
              <p><strong>Information Collection:</strong> We collect only the data necessary for appointments (name, email, phone) and to improve our service experience.</p>
              <p><strong>Data Usage:</strong> Your information is never sold to third parties. We use it solely for booking confirmations, reminders, and occasional service updates.</p>
              <p><strong>Security:</strong> All personal data is stored securely on our encrypted servers.</p>
            </div>
          </section>

          <section id="terms" className="policy-section">
            <h2>📜 Terms & Conditions</h2>
            <div className="policy-card">
              <p>By using our services and website, you agree to the following terms:</p>
              <ul>
                <li><strong>Service Rights:</strong> RK Beauty reserves the right to refuse service to anyone for safety or hygiene reasons.</li>
                <li><strong>Pricing:</strong> All prices are subject to change based on specific client requirements (e.g., hair length/thickness). Final pricing will be confirmed during your consultation.</li>
                <li><strong>Liability:</strong> While we use premium products, clients are responsible for informing us of any allergies or sensitivities before treatment.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Policies;
