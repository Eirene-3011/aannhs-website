const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Magic link login — no password, just the school code
// POST /api/auth/login { code: "307802" }
router.post('/login', (req, res) => {
  const { code } = req.body;
  const MAGIC_CODE = process.env.ADMIN_MAGIC_CODE || '307802';

  if (!code || code !== MAGIC_CODE) {
    return res.status(401).json({ error: 'Invalid access code.' });
  }

  const token = jwt.sign(
    { id: 1, username: 'admin', role: 'admin' },
    process.env.JWT_SECRET || 'aannhs_secret',
    { expiresIn: '12h' }
  );

  res.json({ token, message: 'Login successful.' });
});

// GET /api/auth/verify — verify token validity
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ valid: false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aannhs_secret');
    res.json({ valid: true, admin: decoded });
  } catch {
    res.status(403).json({ valid: false });
  }
});

module.exports = router;
