import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Services.css';

const CATEGORIES = ['All', 'Hair', 'Skin', 'Makeup', 'Nails', 'Spa'];

const Services = () => {
  const { addToCart, cartItems } = useCart();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    document.title = "Our Services | RK Beauty - Hair, Skin & Wellness";
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  const handleAddToCart = (service) => {
    if (cartItems.find(item => item.id === service.id)) {
      setToastMessage(`${service.name} is already in your cart!`);
    } else {
      addToCart(service);
      setToastMessage(`✓ Added ${service.name} to cart!`);
    }
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="section services-page">
      <div className="container">
        <h1 className="section-title">Our Premium Services</h1>
        <p className="section-subtitle">
          Discover our comprehensive range of beauty treatments. Add services to cart and book them all at once.
        </p>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.4rem', borderRadius: '25px', fontSize: '0.875rem', fontWeight: '600',
                border: activeCategory === cat ? 'none' : '1px solid rgba(212,175,55,0.3)',
                background: activeCategory === cat ? 'linear-gradient(135deg,#d4af37,#b8952a)' : 'transparent',
                color: activeCategory === cat ? '#1a0a0a' : 'var(--color-text-light)',
                cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'var(--font-body)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {toastMessage && <div className="toast-notification">{toastMessage}</div>}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>Loading services...</div>
        ) : (
          <div className="services-catalog">
            {filtered.map(service => (
              <div key={service.id} className="catalog-card">
                <div className="catalog-img-wrapper">
                  <img src={service.image} alt={service.name} className="catalog-img"
                    onError={(e) => { e.target.src = '/images/spa.png'; }} />
                  {service.tag && <span className="catalog-badge">{service.tag}</span>}
                  <span style={{
                    position: 'absolute', top: '0.75rem', left: '0.75rem',
                    background: 'rgba(0,0,0,0.6)', color: '#d4af37',
                    padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase',
                  }}>{service.category}</span>
                </div>
                <div className="catalog-content">
                  <div className="catalog-header">
                    <h3>{service.name}</h3>
                    <span className="catalog-price">₹{Number(service.price).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="catalog-desc">{service.description}</p>
                  <button
                    className={`btn-add-cart ${cartItems.find(item => item.id === service.id) ? 'btn-added' : ''}`}
                    onClick={() => handleAddToCart(service)}
                  >
                    {cartItems.find(item => item.id === service.id) ? '✓ In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
