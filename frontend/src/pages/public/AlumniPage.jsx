import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { getImageUrl } from '../../utils/helpers';

export default function AlumniPage() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterYear, setFilterYear] = useState('');

  useEffect(() => {
    api.get('/alumni')
      .then(r => setAlumni(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const batchYears = [...new Set(alumni.map(a => a.batch_year).filter(Boolean))].sort((a, b) => b - a);

  const filtered = alumni.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${a.full_name} ${a.course_profession} ${a.company} ${a.location}`.toLowerCase().includes(q);
    const matchYear = !filterYear || String(a.batch_year) === filterYear;
    return matchSearch && matchYear;
  });

  const featured = alumni.filter(a => a.is_featured);

  return (
    <div className="page-container">
      <div className="page-hero">
        <h1>Alumni</h1>
        <p>Proud graduates of Andres A. Nocon National High School</p>
      </div>

      <div className="page-content">
        {/* Featured Alumni */}
        {featured.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ marginBottom: 20 }}>Featured Alumni</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
              {featured.map(a => (
                <AlumniCard key={a.id} alumni={a} />
              ))}
            </div>
          </section>
        )}

        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Search alumni by name, profession, company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 220, padding: '10px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.92rem' }}
          />
          <select
            value={filterYear}
            onChange={e => setFilterYear(e.target.value)}
            style={{ padding: '10px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.92rem', minWidth: 140 }}
          >
            <option value="">All Batches</option>
            {batchYears.map(y => <option key={y} value={y}>Batch {y}</option>)}
          </select>
        </div>

        {/* All Alumni */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#888', padding: 40 }}>Loading alumni...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: 40 }}>
            {alumni.length === 0 ? 'No alumni records available yet.' : 'No alumni match your search.'}
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {filtered.map(a => (
              <AlumniCard key={a.id} alumni={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AlumniCard({ alumni: a }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10 }}>
      {a.photo_url ? (
        <img src={getImageUrl(a.photo_url)} alt={a.full_name}
          style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #e5e7eb' }}
          onError={e => { e.target.style.display = 'none'; }} />
      ) : (
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🎓</div>
      )}
      <div>
        <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111', margin: '0 0 3px' }}>{a.full_name}</p>
        {a.batch_year && <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: '0 0 2px' }}>Batch {a.batch_year}</p>}
        {a.course_profession && <p style={{ fontSize: '0.82rem', color: '#374151', margin: '0 0 2px' }}>{a.course_profession}</p>}
        {a.company && <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: '0 0 2px' }}>🏢 {a.company}</p>}
        {a.location && <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>📍 {a.location}</p>}
      </div>
      {a.bio && <p style={{ fontSize: '0.8rem', color: '#6b7280', fontStyle: 'italic', margin: 0 }}>{a.bio}</p>}
      {a.facebook_url && (
        <a href={a.facebook_url} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '0.8rem', color: '#1877f2', textDecoration: 'none' }}>
          Facebook Profile →
        </a>
      )}
    </div>
  );
}
