import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/db.js';

const router = express.Router();

// POST /api/contact  (public)
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, message } = req.body;

    try {
      const [result] = await pool.query(
        'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
        [name, email, phone || null, message]
      );
      res.status(201).json({ message: 'Message saved successfully.', id: result.insertId });
    } catch (err) {
      console.error('Contact save error:', err);
      res.status(500).json({ message: 'Server error saving contact message.' });
    }
  }
);

// GET /api/contact/reviews  (public)
router.get('/reviews', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM reviews WHERE is_approved = TRUE ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Fetch reviews error:', err);
    res.status(500).json({ message: 'Server error fetching reviews.' });
  }
});

export default router;
