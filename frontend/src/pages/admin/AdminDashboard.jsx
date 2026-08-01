import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/staff').then(r => r.data.length),
      api.get('/faqs').then(r => r.data.length),
      api.get('/contact/messages').then(r => r.data),
      api.get('/issuances').then(r => r.data.length),
      api.get('/resources').then(r => r.data.length),
      api.get('/ppas').then(r => r.data.length),
      api.get('/accomplishments').then(r => r.data.length).catch(() => 0),
      api.get('/charter').then(r => (Array.isArray(r.data) ? r.data : [])).catch(() => []),
      api.get('/school-heads').then(r => r.data.length).catch(() => 0),
      api.get('/banners/all').then(r => r.data).catch(() => []),
      api.get('/committees').then(r => r.data).catch(() => []),
    ]).then(([staff, faqs, msgs, issuances, resources, ppas, accomplishments, charterDocs, schoolHeads, banners, committees]) => {
      const charterUploaded = charterDocs.filter(d => d.pdf_url).length;
      const observanceTags = ['teachers_month', 'womens_month', '18day_campaign', 'buwan_ng_wika', 'nutrition_month', 'mens_month'];
      const observanceActive = banners.filter(b => b.observance_tag && b.is_active).length;
      const allMembers = committees.flatMap(c => c.members || []);
      const membersMissingPhoto = allMembers.filter(m => !m.photo_url).length;

      setStats({
        staff, faqs, issuances, resources, ppas, accomplishments,
        charterUploaded, schoolHeads, observanceActive, membersMissingPhoto,
        unread: msgs.filter(m => !m.is_read).length
      });
      setMessages(msgs.slice(0, 5));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const cards = [
    { icon: '👨‍🏫', label: 'Staff Members', val: stats.staff, path: '/admin/staff', color: 'var(--red-primary)' },
    { icon: '❓', label: 'FAQs', val: stats.faqs, path: '/admin/faqs', color: '#4F46E5' },
    { icon: '📢', label: 'Issuances', val: stats.issuances, path: '/admin/issuances', color: '#0891B2' },
    { icon: '📚', label: 'Resources', val: stats.resources, path: '/admin/resources', color: '#059669' },
    { icon: '🎓', label: 'PPAs', val: stats.ppas, path: '/admin/ppas', color: '#D97706' },
    { icon: '🏆', label: 'Accomplishments', val: stats.accomplishments, path: '/admin/accomplishments', color: '#7C3AED' },
    { icon: '👤', label: 'School Heads (History)', val: stats.schoolHeads, path: '/admin/school-heads', color: '#0891B2' },
    { icon: '✉️', label: 'Unread Messages', val: stats.unread, path: '/admin/contact', color: stats.unread > 0 ? '#DC2626' : '#6B7280' },
  ];

  const quickActions = [
    { icon: '🖼️', label: 'Manage Slideshow', path: '/admin/banners' },
    { icon: '📝', label: 'Edit About Us', path: '/admin/content' },
    { icon: '👨‍🏫', label: 'Add Staff', path: '/admin/staff' },
    { icon: '📋', label: 'Upload Issuance', path: '/admin/issuances' },
    { icon: '❓', label: 'Manage FAQs', path: '/admin/faqs' },
    { icon: '📅', label: 'Add Calendar Event', path: '/admin/calendar' },
  ];

  const charterStatus = loading ? '…' : `${stats.charterUploaded ?? 0} / 16 uploaded`;
  const charterColor = !loading && stats.charterUploaded < 16 ? '#D97706' : '#059669';
  const observanceStatus = loading ? '…' : `${stats.observanceActive ?? 0} of 6 active`;
  const photoMissing = loading ? '…' : stats.membersMissingPhoto ?? 0;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">Welcome to the AANNHS Admin Panel. Manage all website content from here.</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">🌐 View Public Site</a>
      </div>

      {/* Main stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        {cards.map(c => (
          <Link key={c.label} to={c.path} style={{
            display: 'block', background: 'white', borderRadius: 'var(--radius-lg)', padding: '20px 24px',
            border: '1px solid var(--gray-200)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--transition)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{c.label}</p>
                <p style={{ fontSize: '2rem', fontWeight: 900, color: c.color, lineHeight: 1 }}>{loading ? '—' : (c.val ?? 0)}</p>
              </div>
              <span style={{ fontSize: '1.6rem' }}>{c.icon}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Special status cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 28 }}>
        {/* School Dashboard */}
        <Link to="/admin/school-dashboard" style={{
          display: 'flex', alignItems: 'center', gap: 14, background: 'white', borderRadius: 'var(--radius-lg)',
          padding: '16px 20px', border: '1px solid var(--gray-200)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '1.8rem' }}>📊</span>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>School Dashboard</p>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--gray-900)', margin: 0 }}>Enrollment, Performance &amp; Sections</p>
          </div>
        </Link>

        {/* Citizen's Charter PDFs */}
        <Link to="/admin/charter" style={{
          display: 'flex', alignItems: 'center', gap: 14, background: 'white', borderRadius: 'var(--radius-lg)',
          padding: '16px 20px', border: '1px solid var(--gray-200)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '1.8rem' }}>📜</span>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>Citizen's Charter</p>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: charterColor, margin: 0 }}>{charterStatus}</p>
          </div>
        </Link>

        {/* Observance Banners */}
        <Link to="/admin/banners" style={{
          display: 'flex', alignItems: 'center', gap: 14, background: 'white', borderRadius: 'var(--radius-lg)',
          padding: '16px 20px', border: '1px solid var(--gray-200)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '1.8rem' }}>🗓️</span>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>Observance Banners</p>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--gray-900)', margin: 0 }}>{observanceStatus}</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--gray-400)', margin: '2px 0 0' }}>Teachers' Month, Women's Month, etc.</p>
          </div>
        </Link>

        {/* Committee photos missing */}
        <Link to="/admin/committees" style={{
          display: 'flex', alignItems: 'center', gap: 14, background: 'white', borderRadius: 'var(--radius-lg)',
          padding: '16px 20px', border: '1px solid var(--gray-200)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '1.8rem' }}>📸</span>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>Committee Photos</p>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: photoMissing > 0 ? '#D97706' : '#059669', margin: 0 }}>
              {loading ? '…' : photoMissing > 0 ? `${photoMissing} member${photoMissing !== 1 ? 's' : ''} missing photo` : '✅ All photos uploaded'}
            </p>
          </div>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Quick Actions */}
        <div className="admin-card">
          <h2 className="admin-card-title">⚡ Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {quickActions.map(a => (
              <Link key={a.label} to={a.path}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', transition: 'all var(--transition)', border: '1px solid var(--gray-200)' }}>
                <span style={{ fontSize: '1.1rem' }}>{a.icon}</span>
                {a.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--gray-100)' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gray-800)', margin: 0 }}>✉️ Recent Messages</h2>
            <Link to="/admin/contact" style={{ fontSize: '0.8rem', color: 'var(--red-primary)', fontWeight: 600 }}>View All</Link>
          </div>
          {loading ? <div className="spinner" style={{ margin: '16px auto' }}></div> : messages.length === 0 ? (
            <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>No messages yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map(m => (
                <div key={m.id} style={{ padding: '10px 12px', background: m.is_read ? 'var(--gray-50)' : 'var(--red-pale)', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${m.is_read ? 'var(--gray-200)' : 'var(--red-primary)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-900)' }}>{m.sender_name}</p>
                    {!m.is_read && <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>New</span>}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--gray-500)', marginTop: 2 }}>{m.subject || 'No subject'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div style={{ marginTop: 20, padding: '14px 18px', background: '#FEF9C3', borderRadius: 'var(--radius-md)', border: '1px solid #FDE68A', fontSize: '0.82rem', color: '#92400E' }}>
        📋 <strong>Contact / Feedback note:</strong> The CSM (Client Satisfaction Survey) link set in <Link to="/admin/feedback" style={{ color: '#92400E', fontWeight: 600 }}>Feedback Links</Link> also powers the floating CSM widget on the homepage. Updating it there updates both locations.
      </div>

      <div style={{ marginTop: 14, padding: '16px 20px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', fontSize: '0.82rem', color: 'var(--gray-500)' }}>
        🔒 <strong>Admin Access Link:</strong> <code style={{ background: 'var(--gray-200)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>http://localhost:5173/admin/login/307802</code> — Keep this link confidential.
      </div>
    </div>
  );
}
