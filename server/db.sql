-- RK Beauty MySQL Database Schema
-- Run this file once to set up your database:
-- mysql -u root -p < server/db.sql

CREATE DATABASE IF NOT EXISTS rkbeauty_db;
USE rkbeauty_db;

-- =====================
-- USERS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('customer', 'admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- SERVICES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category ENUM('hair', 'skin', 'makeup', 'nails', 'spa') NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  tag VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- APPOINTMENTS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  service_name VARCHAR(255) NOT NULL,
  appointment_date DATE,
  appointment_time VARCHAR(20),
  stylist VARCHAR(100),
  notes TEXT,
  status ENUM('Scheduled', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================
-- CONTACT MESSAGES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- GALLERY TABLE
-- =====================
CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150),
  category ENUM('hair', 'makeup', 'nails', 'spa', 'interior', 'other') DEFAULT 'other',
  image_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- REVIEWS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100) NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================
-- SEED: Services Data
-- =====================
INSERT IGNORE INTO services (id, name, category, price, description, image, tag) VALUES
(1,  'Haircut & Styling',   'hair',   50,  'Expert cut and style tailored to your face shape.',           '/images/services/haircut.jpg',  'Popular'),
(2,  'Hair Coloring',       'hair',   120, 'Premium balayage, highlights, or full color treatments.',     '/images/services/haircut.jpg',  NULL),
(3,  'Hair Spa Treatment',  'hair',   80,  'Deep conditioning treatment to restore shine and health.',    '/images/hair.png',              NULL),
(4,  'Facial Cleanup',      'skin',   40,  'Quick and refreshing cleanse to remove impurities.',          '/images/services/facial.jpg',   NULL),
(5,  'Advanced Facial',     'skin',   90,  'Luxurious anti-aging or hydrating facial treatment.',         '/images/services/facial.jpg',   'Best Seller'),
(6,  'Bridal Makeup',       'makeup', 250, 'Flawless, long-lasting HD makeup for your special day.',      '/images/services/makeup.jpg',   NULL),
(7,  'Party Makeup',        'makeup', 100, 'Glamorous and elegant makeup for events.',                    '/images/services/makeup.jpg',   NULL),
(8,  'Manicure',            'nails',  30,  'Classic nail shaping, cuticle care, and polish.',             '/images/services/nails.jpg',    NULL),
(9,  'Pedicure',            'nails',  40,  'Relaxing foot soak, scrub, and perfect polish.',              '/images/services/nails.jpg',    NULL),
(10, 'Full Body Massage',   'spa',    150, '60 minutes of deep tissue or Swedish relaxation.',            '/images/spa.png',               'Must Try');

-- =====================
-- SEED: Gallery Data
-- =====================
INSERT IGNORE INTO gallery (id, title, category, image_url) VALUES
(1, 'Balayage Transformation', 'hair',     '/images/gallery/hair-1.jpg'),
(2, 'Bridal Makeup Look',      'makeup',   '/images/gallery/makeup-1.jpg'),
(3, 'Nail Art Design',         'nails',    '/images/gallery/nails-1.jpg'),
(4, 'Salon Interior',          'interior', '/images/gallery/interior.jpg'),
(5, 'Hair Styling',            'hair',     '/images/hair.png'),
(6, 'Spa Treatment',           'spa',      '/images/spa.png');

-- =====================
-- SEED: Reviews Data
-- =====================
INSERT IGNORE INTO reviews (id, name, rating, comment) VALUES
(1, 'Priya Sharma',   5, 'Amazing experience! The bridal makeup was absolutely stunning. I felt like a queen on my wedding day!'),
(2, 'Anjali Mehta',   5, 'The hair spa treatment was incredibly relaxing. My hair feels so soft and shiny now. Will definitely come back!'),
(3, 'Ritu Kapoor',    4, 'Great service and a very welcoming team. The nail art was beautiful and lasted for weeks!');
