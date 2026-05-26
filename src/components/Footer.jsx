import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span className="logo-rk">RK</span>
            <span className="logo-beauty">Beauty</span>
          </Link>
          <p className="footer-tagline">Your Beauty, Our Passion</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/booking">Book Appointment</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <span>123 Elegance Blvd, Luxury City</span>
            </li>
            <li>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </li>
            <li>
              <a href="mailto:hello@rkbeauty.com">hello@rkbeauty.com</a>
            </li>
          </ul>
        </div>

        <div className="footer-hours">
          <h3>Business Hours</h3>
          <ul>
            <li><span>Mon - Fri:</span> 9:00 AM - 8:00 PM</li>
            <li><span>Saturday:</span> 9:00 AM - 6:00 PM</li>
            <li><span>Sunday:</span> Closed</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RK Beauty. All rights reserved.</p>
        <div className="footer-policies">
          <Link to="/policies">Privacy Policy</Link>
          <Link to="/policies">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
