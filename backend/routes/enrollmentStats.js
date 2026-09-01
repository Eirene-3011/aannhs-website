const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const COLS = [
  'school_year', 'sort_order', 'chart_image_url',
  'grade7_male', 'grade7_female',
  'grade8_male', 'grade8_female',
  'grade9_male', 'grade9_female',
  'grade10_male', 'grade10_female',
];

const LEVELS = ['grade7', 'grade8', 'grade9', 'grade10'];

function totals(row) {
  let total_male = 0, total_female = 0;
  LEVELS.forEach(l => {
    total_male   += Number(row[`${l}_male`]   || 0);
    total_female += Number(row[`${l}_female`] || 0);
  });
  return { ...row, total_male, total_female, grand_total: total_male + total_female };
}

// GET all school years (newest first by sort_order DESC)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM enrollment_stats ORDER BY sort_order DESC');
    res.json(rows.map(totals));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET single year
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM enrollment_stats WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(totals(rows[0]));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST create
router.post('/', authenticateAdmin, upload.single('chart_image'), async (req, res) => {
  const b = req.body;
  const chart_image_url = req.file ? req.file.path : null;
  try {
    const [result] = await db.query(
      `INSERT INTO enrollment_stats
         (school_year, sort_order, chart_image_url,
          grade7_male, grade7_female, grade8_male, grade8_female,
          grade9_male, grade9_female, grade10_male, grade10_female)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        b.school_year, b.sort_order || 0, chart_image_url,
        b.grade7_male || 0, b.grade7_female || 0,
        b.grade8_male || 0, b.grade8_female || 0,
        b.grade9_male || 0, b.grade9_female || 0,
        b.grade10_male || 0, b.grade10_female || 0,
      ]
    );
    res.json({ id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT update
router.put('/:id', authenticateAdmin, upload.single('chart_image'), async (req, res) => {
  const b = req.body;
  // Keep existing image if no new file uploaded and no explicit clear
  const chart_image_url = req.file ? req.file.path : (b.chart_image_url || null);
  try {
    await db.query(
      `UPDATE enrollment_stats SET
         school_year=?, sort_order=?, chart_image_url=?,
         grade7_male=?, grade7_female=?, grade8_male=?, grade8_female=?,
         grade9_male=?, grade9_female=?, grade10_male=?, grade10_female=?
       WHERE id=?`,
      [
        b.school_year, b.sort_order || 0, chart_image_url,
        b.grade7_male || 0, b.grade7_female || 0,
        b.grade8_male || 0, b.grade8_female || 0,
        b.grade9_male || 0, b.grade9_female || 0,
        b.grade10_male || 0, b.grade10_female || 0,
        req.params.id,
      ]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM enrollment_stats WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
