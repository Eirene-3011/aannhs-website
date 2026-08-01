const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateAdmin } = require('../middleware/auth');

// Public: get dashboard stats
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM school_dashboard LIMIT 1');
    const [grades] = await db.query('SELECT * FROM school_dashboard_grades ORDER BY sort_order, grade_level');
    res.json({ stats: rows[0] || {}, grades });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Admin: update main stats (enrollment, performance, personnel)
router.put('/stats', authenticateAdmin, async (req, res) => {
  const { enrollment_count, performance_indicator, teaching_personnel, non_teaching_personnel } = req.body;
  try {
    const [existing] = await db.query('SELECT id FROM school_dashboard LIMIT 1');
    if (existing.length) {
      await db.query(
        'UPDATE school_dashboard SET enrollment_count=?, performance_indicator=?, teaching_personnel=?, non_teaching_personnel=? WHERE id=?',
        [enrollment_count || 0, performance_indicator || '', teaching_personnel || 0, non_teaching_personnel || 0, existing[0].id]
      );
    } else {
      await db.query(
        'INSERT INTO school_dashboard (enrollment_count, performance_indicator, teaching_personnel, non_teaching_personnel) VALUES (?, ?, ?, ?)',
        [enrollment_count || 0, performance_indicator || '', teaching_personnel || 0, non_teaching_personnel || 0]
      );
    }
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Admin: upsert a grade level row
router.put('/grades/:gradeLevel', authenticateAdmin, async (req, res) => {
  const { sections_count, classrooms_count, sort_order } = req.body;
  const gradeLevel = req.params.gradeLevel;
  try {
    const [existing] = await db.query('SELECT id FROM school_dashboard_grades WHERE grade_level=?', [gradeLevel]);
    if (existing.length) {
      await db.query(
        'UPDATE school_dashboard_grades SET sections_count=?, classrooms_count=?, sort_order=? WHERE grade_level=?',
        [sections_count || 0, classrooms_count || 0, sort_order || 0, gradeLevel]
      );
    } else {
      await db.query(
        'INSERT INTO school_dashboard_grades (grade_level, sections_count, classrooms_count, sort_order) VALUES (?, ?, ?, ?)',
        [gradeLevel, sections_count || 0, classrooms_count || 0, sort_order || 0]
      );
    }
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
