import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { getImageUrl } from '../../utils/helpers';

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'news', label: '📰 News' },
  { value: 'announcement', label: '📢 Announcements' },
  { value: 'update', label: '🔔 Updates' },
  { value: 'event', label: '🗓️ Events' },
];

export default function NewsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const url = filterCat ? `/news-updates?category=${filterCat}` : '/news-updates';
    api.get(url)
      .then(r => setPosts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filterCat]);

  if (selected) {
    return (
      <div className="page-container">
        <div className="page-content">
          <button onClick={() => setSelected(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284c7', fontSize: '0.9rem', marginBottom: 20, padding: 0 }}>
            ← Back to News
          </button>
          {selected.image_url && (
            <img src={getImageUrl(selected.image_url)} alt={selected.title}
              style={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius: 12, marginBottom: 24 }}
              onError={e => e.target.style.display = 'none'} />
          )}
          <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', background: '#e0f2fe', color: '#0284c7', borderRadius: 20, padding: '3px 12px' }}>
              {selected.category}
            </span>
            {selected.published_date && (
              <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                📅 {selected.published_date.split('T')[0]}
              </span>
            )}
          </div>
          <h1 style={{ fontSize: '1.6rem', color: '#111', marginBottom: 16, lineHeight: 1.3 }}>{selected.title}</h1>
          {selected.content ? (
            <div style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{selected.content}</div>
          ) : (
            <p style={{ color: '#6b7280' }}>{selected.excerpt}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-hero">
        <h1>News & Updates</h1>
        <p>Latest news, announcements, and events from AANNHS</p>
      </div>

      <div className="page-content">
        {/* Category filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c.value} onClick={() => setFilterCat(c.value)}
              style={{
                padding: '8px 18px', borderRadius: 20, border: '1px solid',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
                background: filterCat === c.value ? '#0284c7' : '#fff',
                color: filterCat === c.value ? '#fff' : '#374151',
                borderColor: filterCat === c.value ? '#0284c7' : '#d1d5db',
                transition: 'all 0.15s',
              }}>
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#888', padding: 40 }}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: 40 }}>No posts available yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {posts.map(post => (
              <article key={post.id} onClick={() => setSelected(post)}
                style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s, transform 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}
              >
                {post.image_url ? (
                  <img src={getImageUrl(post.image_url)} alt={post.title}
                    style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                    onError={e => e.target.style.display = 'none'} />
                ) : (
                  <div style={{ width: '100%', height: 100, background: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>📰</div>
                )}
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0284c7', borderRadius: 20, padding: '2px 10px' }}>
                      {post.category}
                    </span>
                    {post.published_date && (
                      <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                        {post.published_date.split('T')[0]}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111', margin: '0 0 8px', lineHeight: 1.4 }}>{post.title}</h3>
                  {post.excerpt && <p style={{ fontSize: '0.82rem', color: '#6b7280', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{post.excerpt}</p>}
                  <p style={{ fontSize: '0.8rem', color: '#0284c7', marginTop: 10, marginBottom: 0, fontWeight: 500 }}>Read more →</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
