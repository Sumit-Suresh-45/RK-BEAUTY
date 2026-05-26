import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET /api/reviews - Fetch approved testimonials
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, rating, comment, is_approved, created_at FROM reviews WHERE is_approved = 1 ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

import jwt from 'jsonwebtoken';

// POST /api/reviews - Submit a new review
router.post('/', async (req, res) => {
  const { name, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Optional Authentication
  let userId = null;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (err) {
      // If token is invalid, we still allow guest submission but don't link the ID
      console.warn('Invalid token for review submission, continuing as guest.');
    }
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO reviews (user_id, name, rating, comment, is_approved) VALUES (?, ?, ?, ?, ?)',
      [userId, name, rating, comment, 0] // 0 = requires approval
    );
    res.status(201).json({ message: 'Review submitted for approval!', id: result.insertId });
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
