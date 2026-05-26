import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET /api/gallery  (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM gallery ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Fetch gallery error:', err);
    res.status(500).json({ message: 'Server error fetching gallery.' });
  }
});

export default router;
