import express from 'express';
import pool from '../config/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// ─────────────────────────────────────────────
// GET /api/appointments  (protected - own bookings only)
// ─────────────────────────────────────────────
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM appointments WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error('Fetch appointments error:', err);
    res.status(500).json({ message: 'Server error fetching appointments.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/appointments  (protected)
// ─────────────────────────────────────────────
router.post('/', auth, async (req, res) => {
  const { name, email, phone, service_name, appointment_date, appointment_time, stylist, notes } = req.body;

  if (!service_name) {
    return res.status(400).json({ message: 'Service name is required.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO appointments 
        (user_id, name, email, phone, service_name, appointment_date, appointment_time, stylist, notes, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Scheduled')`,
      [
        req.user.id,
        name || req.user.name,
        email || req.user.email,
        phone || null,
        service_name,
        appointment_date || null,
        appointment_time || null,
        stylist || null,
        notes || null,
      ]
    );

    const [newRow] = await pool.query('SELECT * FROM appointments WHERE id = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error('Create appointment error:', err);
    res.status(500).json({ message: 'Server error creating appointment.' });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/appointments/:id  (protected - owner only)
// ─────────────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM appointments WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Appointment not found or access denied.' });
    }

    await pool.query("UPDATE appointments SET status = 'Cancelled' WHERE id = ?", [req.params.id]);
    res.json({ message: 'Appointment cancelled successfully.', id: req.params.id });
  } catch (err) {
    console.error('Delete appointment error:', err);
    res.status(500).json({ message: 'Server error cancelling appointment.' });
  }
});

export default router;
