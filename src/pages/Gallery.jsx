import React, { useState, useEffect } from 'react';
import './Gallery.css';

const CATEGORIES = ['All', 'Hair', 'Makeup', 'Nails', 'Spa', 'Interior'];

const FALLBACK_GALLERY = [
  { id: 1, title: 'Balayage Transformation', category: 'hair',     image_url: '/images/gallery/hair-1.jpg' },
  { id: 2, title: 'Bridal Makeup Look',      category: 'makeup',   image_url: '/images/gallery/makeup-1.jpg' },
  { id: 3, title: 'Nail Art Design',         category: 'nails',    image_url: '/images/gallery/nails-1.jpg' },
  { id: 4, title: 'Salon Interior',          category: 'interior', image_url: '/images/gallery/interior.jpg' },
  { id: 5, title: 'Hair Styling',            category: 'hair',     image_url: '/images/hair.png' },
  { id: 6, title: 'Spa Treatment',           category: 'spa',      image_url: '/images/spa.png' }
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.title = "Gallery | RK Beauty - Transitions & Artistry";
    fetch('/api/gallery')
      .then(res => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then(data => {
        setImages(Array.isArray(data) && data.length > 0 ? data : FALLBACK_GALLERY);
        setLoading(false);
      })
      .catch(() => {
        setImages(FALLBACK_GALLERY);
        setLoading(false);
      });
  }, []);


  const filtered = activeCategory === 'All'
    ? images
    : images.filter(img => img.category.toLowerCase() === activeCategory.toLowerCase());

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setLightbox(null);
  };

  return (
    <div className="gallery-page">
      <div className="container section">
        <h1 className="section-title">Our Gallery</h1>
        <p className="section-subtitle">Explore our latest work and salon transformations.</p>

        {/* Category Filter */}
        <div className="gallery-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>Loading gallery...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
            No images in this category yet. Check back soon!
          </div>
        ) : (
          <div className="gallery-masonry">
            {filtered.map((img, idx) => (
              <div key={img.id} className="gallery-item" onClick={() => setLightbox(img)}>
                <img
                  src={img.image_url}
                  alt={img.title || 'Gallery image'}
                  loading="lazy"
                  onError={(e) => { e.target.src = '/images/spa.png'; }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-title">{img.title || 'View'}</span>
                  <span className="gallery-zoom">🔍</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} onKeyDown={handleKeyDown} tabIndex={-1}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.image_url} alt={lightbox.title} />
            {lightbox.title && <p className="lightbox-caption">{lightbox.title}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
