import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const GRADE_LEVELS = [
  { key: 'Grade 7',  label: 'Grade 7',  sort: 1 },
  { key: 'Grade 8',  label: 'Grade 8',  sort: 2 },
  { key: 'Grade 9',  label: 'Grade 9',  sort: 3 },
  { key: 'Grade 10', label: 'Grade 10', sort: 4 },
];

export default function AdminSchoolDashboard() {
  const [stats, setStats] = useState({ enrollment_count: 0, performance_indicator: '', teaching_personnel: 0, non_teaching_personnel: 0 });
  const [grades, setGrades] = useState({});
  const [saving, setSaving] = useState(false);
  const [savingGrade, setSavingGrade] = useState(null);

  const load = () => {
    api.get('/school-dashboard').then(r => {
      if (r.data.stats) setStats(r.data.stats);
      const gradeMap = {};
      (r.data.grades || []).forEach(g => { gradeMap[g.grade_level] = g; });
      setGrades(gradeMap);
    }).catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const handleSaveStats = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/school-dashboard/stats', stats);
      toast.success('School dashboard stats saved!');
    } catch { toast.error('Error saving stats.'); }
    finally { setSaving(false); }
  };

  const handleSaveGrade = async (gradeLevel) => {
    setSavingGrade(gradeLevel);
    const g = grades[gradeLevel] || { sections_count: 0, classrooms_count: 0 };
    const idx = GRADE_LEVELS.findIndex(x => x.key === gradeLevel);
    try {
      await api.put(`/school-dashboard/grades/${encodeURIComponent(gradeLevel)}`, {
        sections_count: g.sections_count || 0,
        classrooms_count: g.classrooms_count || 0,
        sort_order: idx
      });
      toast.success(`${gradeLevel} saved!`);
    } catch { toast.error('Error.'); }
    finally { setSavingGrade(null); }
  };

  const updateGrade = (key, field, val) => {
    setGrades(g => ({ ...g, [key]: { ...(g[key] || {}), [field]: +val } }));
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">📊 School Dashboard</h1>
          <p className="admin-page-sub">Update enrollment count, performance indicators, personnel counts, sections, and classrooms. These appear in the School Dashboard section on the homepage.</p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h3 className="admin-card-title">📈 Main Statistics</h3>
        <form onSubmit={handleSaveStats}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Total Enrollment Count</label>
              <input type="number" className="form-control" value={stats.enrollment_count || ''} min="0"
                onChange={e => setStats(s => ({ ...s, enrollment_count: +e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Teaching Personnel</label>
              <input type="number" className="form-control" value={stats.teaching_personnel || ''} min="0"
                onChange={e => setStats(s => ({ ...s, teaching_personnel: +e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Non-Teaching Personnel</label>
              <input type="number" className="form-control" value={stats.non_teaching_personnel || ''} min="0"
                onChange={e => setStats(s => ({ ...s, non_teaching_personnel: +e.target.value }))} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Performance Indicator</label>
              <input type="text" className="form-control" value={stats.performance_indicator || ''}
                placeholder="e.g. MPS 87.5% | NAT Average 82.3%"
                onChange={e => setStats(s => ({ ...s, performance_indicator: e.target.value }))} />
              <p style={{ fontSize: '0.76rem', color: 'var(--gray-400)', marginTop: 4 }}>Enter a short performance summary, e.g. MPS score, NAT average, or SY achievement.</p>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving} style={{ marginTop: 8 }}>
            {saving ? 'Saving…' : '💾 Save Stats'}
          </button>
        </form>
      </div>

      {/* Grade-Level Sections & Classrooms */}
      <div className="admin-card">
        <h3 className="admin-card-title">🏫 Sections &amp; Classrooms per Grade Level</h3>
        <p style={{ fontSize: '0.84rem', color: 'var(--gray-500)', marginBottom: 18 }}>
          Enter the number of sections and classrooms for each grade level. Save each row individually.
          Teachers per grade level are pulled automatically from the Faculty &amp; Staff Directory.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {GRADE_LEVELS.map(gl => {
            const g = grades[gl.key] || { sections_count: 0, classrooms_count: 0 };
            return (
              <div key={gl.key} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 8, border: '1px solid var(--gray-200)', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gray-800)', minWidth: 80 }}>{gl.label}</span>
                <div style={{ display: 'flex', gap: 10, flex: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                  <div className="form-group" style={{ margin: 0, flex: '0 0 180px' }}>
                    <label className="form-label" style={{ marginBottom: 4 }}>Sections</label>
                    <input type="number" className="form-control" min="0"
                      value={g.sections_count ?? 0}
                      onChange={e => updateGrade(gl.key, 'sections_count', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ margin: 0, flex: '0 0 180px' }}>
                    <label className="form-label" style={{ marginBottom: 4 }}>Classrooms</label>
                    <input type="number" className="form-control" min="0"
                      value={g.classrooms_count ?? 0}
                      onChange={e => updateGrade(gl.key, 'classrooms_count', e.target.value)} />
                  </div>
                  <button className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-end', marginBottom: 0 }}
                    disabled={savingGrade === gl.key}
                    onClick={() => handleSaveGrade(gl.key)}>
                    {savingGrade === gl.key ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
