import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET /api/services  (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services WHERE is_active = TRUE ORDER BY category, id'
    );
    res.json(rows);
  } catch (err) {
    console.error('Fetch services error:', err);
    res.status(500).json({ message: 'Server error fetching services.' });
  }
});

export default router;
