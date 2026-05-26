import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user, isLoggedIn, token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Review Form State
  const [reviewForm, setReviewForm] = useState({
    name: user?.name || '',
    rating: 5,
    comment: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', text: '' });

  useEffect(() => {
    // Update Document Title for SEO
    document.title = "RK Beauty | Premium Salon & Spa Experience";
    
    // Fetch Testimonials
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(Array.isArray(data) ? data.slice(0, 3) : []);
        setLoadingReviews(false);
      })
      .catch(err => {
        console.error('Error fetching reviews:', err);
        setLoadingReviews(false);
      });
      
    if (user) {
      setReviewForm(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    setSubmitStatus({ type: '', text: '' });

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(reviewForm)
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitStatus({ type: 'success', text: 'Thank you! Your review has been submitted for approval. ✨' });
        setReviewForm({ name: user?.name || '', rating: 5, comment: '' });
      } else {
        setSubmitStatus({ type: 'error', text: data.message || 'Failed to submit review.' });
      }
    } catch (err) {
      setSubmitStatus({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSubmittingReview(false);
    }
  };

  const features = [
    {
      title: "Expert Stylists",
      description: "Our certified professionals bring years of international experience to every service.",
      icon: "💇‍♀️"
    },
    {
      title: "Premium Products",
      description: "We use only the finest, eco-friendly, and high-end beauty brands for your skin and hair.",
      icon: "✨"
    },
    {
      title: "Luxury Ambiance",
      description: "Step into a world of relaxation with our serene and sophisticated salon environment.",
      icon: "🌸"
    },
    {
      title: "Personalized Care",
      description: "Every treatment is tailored specifically to your unique needs and beauty goals.",
      icon: "💖"
    }
  ];

  const faqs = [
    {
      question: "Do I need to book in advance?",
      answer: "While we do accept walk-ins based on availability, we highly recommend booking in advance to ensure you get your preferred time and stylist."
    },
    {
      question: "What products do you use for facials?",
      answer: "We use premium, dermatologist-tested brands like Dermalogica and Forest Essentials to ensure the best results for your skin type."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule through your 'My Bookings' page or by calling us. We request at least 24 hours' notice."
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tagline">Excellence in Beauty</span>
          <h1>Enhance Your Natural Beauty</h1>
          <p>Experience premium care and luxurious treatments at RK Beauty. Your sanctuary for hair, skin, and wellness.</p>
          <div className="hero-actions">
            <Button to="/booking" variant="primary">Book Appointment</Button>
            <Button to="/services" variant="secondary">Explore Services</Button>
          </div>
        </div>
      </section>

      {/* Featured Services Quick Links */}
      <section className="home-services section container">
        <div className="section-header text-center">
          <h2 className="section-title">Our Specialties</h2>
          <p className="section-subtitle">Discover our most popular premium treatments.</p>
        </div>
        
        <div className="services-overview-grid">
          <Link to="/services" className="service-promo-card hair">
            <div className="service-promo-content">
              <h3>Hair Artistry</h3>
              <span>View Transformations →</span>
            </div>
          </Link>
          <Link to="/services" className="service-promo-card skin">
            <div className="service-promo-content">
              <h3>Skin & Facial</h3>
              <span>Glow Naturally →</span>
            </div>
          </Link>
          <Link to="/services" className="service-promo-card spa">
            <div className="service-promo-content">
              <h3>Spa & Wellness</h3>
              <span>Pure Relaxation →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us section bg-surface">
        <div className="container">
          <div className="why-us-grid">
            <div className="why-us-content">
              <h2 className="section-title text-left">Why RK Beauty?</h2>
              <p className="section-desc">We combine traditional care with modern techniques to give you an experience that goes beyond a regular salon visit.</p>
              
              <div className="features-list">
                {features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <span className="feature-icon">{f.icon}</span>
                    <div className="feature-text">
                      <h4>{f.title}</h4>
                      <p>{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-us-image">
              <img src="/images/spa.png" alt="Luxury Salon Experience" />
              <div className="experience-badge">
                <span className="years">10+</span>
                <span className="label">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Real experiences from our valued guests.</p>
        
        <div className="testimonials-grid">
          {loadingReviews ? (
            <div className="loading-testimonials">Loading testimonials...</div>
          ) : reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="testimonial-card">
                <div className="stars">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</div>
                <p className="testimonial-text">"{review.comment}"</p>
                <div className="testimonial-author">
                  <strong>{review.name}</strong>
                  <span>Verified Client</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-testimonials">No reviews yet. Be the first to leave one!</div>
          )}
        </div>

        {/* Leave a Review Section */}
        <div className="leave-review-container card-style">
          <h3>Leave a Review</h3>
          {submitStatus.text && (
            <div className={`form-message ${submitStatus.type}`}>
              {submitStatus.text}
            </div>
          )}
          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="review-form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  value={reviewForm.name} 
                  onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  placeholder="Enter your name"
                  required
                  disabled={isLoggedIn}
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <div className="star-rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className={`star ${star <= reviewForm.rating ? 'filled' : ''}`}
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Your Experience</label>
              <textarea 
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                placeholder="Tell us about your visit..."
                required
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={submittingReview}>
              {submittingReview ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq section bg-surface">
        <div className="container narrow">
          <h2 className="section-title">Common Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary>{faq.question}</summary>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta section container">
        <div className="cta-card">
          <h2>Ready to transform your look?</h2>
          <p>Book your appointment today and experience the RK Beauty magic.</p>
          <div className="cta-actions">
            <Button to="/booking" variant="primary">Book Appointment</Button>
            <Button to="/contact" variant="secondary">Get in Touch</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
