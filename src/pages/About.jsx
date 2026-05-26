import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  useEffect(() => {
    document.title = "About Us | RK Beauty - Our Story & Expert Team";
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero section container">
        <h1 className="section-title">About RK Beauty</h1>
        <p className="about-intro">
          <strong>Welcome to RK Beauty</strong>, your sanctuary of elegance, style, and self-care. At RK Beauty, we believe that beauty isn’t just about looking good—it’s about feeling confident, empowered, and radiant in every aspect of your life.
        </p>
      </section>

      {/* Two Column Section: Story and Mission/Vision */}
      <section className="about-content container">
        <div className="about-grid">
          <div className="about-block card-style">
            <div className="accent-line"></div>
            <h2>🌟 Our Story</h2>
            <p>
              Founded with a passion for enhancing natural beauty, RK Beauty began as a dream to create a space where clients feel pampered, inspired, and transformed. Over the years, our salon has grown into a trusted destination for hair, skincare, makeup, nails, and wellness, serving a loyal clientele who value quality and professionalism.
            </p>
          </div>
          <div className="about-block card-style highlighted-card">
            <h2>💇‍♀️ Mission & Vision</h2>
            <ul className="styled-list">
              <li><strong>Mission:</strong> To deliver premium beauty services that combine artistry, skill, and personalized care, ensuring every client leaves feeling confident and radiant.</li>
              <li><strong>Vision:</strong> To be the leading salon destination in our region, recognized for excellence, innovation, and a client-first approach.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team container section">
        <div className="section-header text-center">
          <h2 className="section-title">Meet Our Experts</h2>
          <p className="section-subtitle">The talented professionals behind the RK Beauty experience.</p>
        </div>
        
        <div className="team-grid">
          <div className="team-card">
            <div className="team-img-wrapper">
              <img src="/images/services/haircut.jpg" alt="Sarah Jenkins" className="team-img" />
            </div>
            <div className="team-info">
              <h3>Sarah Jenkins</h3>
              <p className="team-role">Master Colorist</p>
              <p className="team-desc">10+ years of experience. Specializes in advanced balayage and color correction.</p>
            </div>
          </div>
          <div className="team-card">
            <div className="team-img-wrapper">
              <img src="/images/gallery/makeup-1.jpg" alt="Elena Marquez" className="team-img" />
            </div>
            <div className="team-info">
              <h3>Elena Marquez</h3>
              <p className="team-role">Lead Makeup Artist</p>
              <p className="team-desc">Award-winning bridal styling and editorial High-Definition makeup techniques.</p>
            </div>
          </div>
          <div className="team-card">
            <div className="team-img-wrapper">
              <img src="/images/services/facial.jpg" alt="Michelle Tran" className="team-img" />
            </div>
            <div className="team-info">
              <h3>Michelle Tran</h3>
              <p className="team-role">Spa Director</p>
              <p className="team-desc">Certified in deep tissue massage, organic facials, and holistic skin therapy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Grid Section */}
      <section className="about-details section bg-surface">
        <div className="container">
          <div className="details-grid">
            <div className="details-card">
              <span className="details-icon">🏆</span>
              <h2>Certifications</h2>
              <p>RK Beauty is proud to hold industry-recognized certifications that speak to our commitment to excellence and hygiene.</p>
            </div>

            <div className="details-card promise-card">
              <span className="details-icon">💖</span>
              <h2>Our Promise</h2>
              <p>To make you look beautiful, feel confident, and leave happier than when you arrived through personalized care.</p>
            </div>

            <div className="details-card">
              <span className="details-icon">✨</span>
              <h2>Premium Quality</h2>
              <p>We use only luxury brands and maintain strict hygiene standards to ensure your safety and comfort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Callout */}
      <section className="about-footer container section text-center">
        <h2 className="final-callout">
          Experience the art of beauty at RK Beauty—where style meets sophistication.
        </h2>
        <div className="mt-2">
          <Link to="/booking" className="btn btn-primary">Book Your Visit</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
