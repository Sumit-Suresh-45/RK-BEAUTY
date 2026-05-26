import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import './Header.css';
import './HeaderCart.css';

const Header = () => {
  const { cartItems, setIsCartOpen } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <span className="logo-rk">RK</span>
          <span className="logo-beauty">Beauty</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
          {isLoggedIn && (
            <Link to="/my-bookings" className={location.pathname === '/my-bookings' ? 'active' : ''}>My Bookings</Link>
          )}
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </nav>

        <div className="header-actions">
          <button className="btn-cart-icon" onClick={() => setIsCartOpen(true)}>
            🛒 <span className="cart-badge">{cartItems.length}</span>
          </button>

          {isLoggedIn ? (
            <div className="user-menu">
              <Link to="/profile" className="user-greeting">Hi, {user?.name?.split(' ')[0]} 👋</Link>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-nav-btns">
              <Link to="/login" className="btn-login-nav">Login</Link>
              <Button to="/register" variant="primary" className="btn-book">Join Free</Button>
            </div>
          )}

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About Us</Link>
          <Link to="/gallery">Gallery</Link>
          {isLoggedIn && <Link to="/my-bookings">My Bookings</Link>}
          <Link to="/contact">Contact</Link>
          <button className="mobile-cart-btn" onClick={() => { setIsCartOpen(true); setMobileMenuOpen(false); }}>
            View Cart ({cartItems.length})
          </button>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="mobile-user">Hi, {user?.name?.split(' ')[0]} 👋</Link>
              <button className="btn-logout-mobile" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Button to="/register" variant="primary">Create Account</Button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
