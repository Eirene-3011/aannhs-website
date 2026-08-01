import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { getImageUrl } from '../../utils/helpers';

const CATEGORIES = [
  { value: 'news', label: '📰 News' },
  { value: 'announcement', label: '📢 Announcement' },
  { value: 'update', label: '🔔 Update' },
  { value: 'event', label: '🗓️ Event' },
];

const BLANK = {
  title: '', content: '', excerpt: '',
  category: 'news', published_date: '', is_published: true, sort_order: 0
};

export default function AdminNewsAndUpdates() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(BLANK);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterCat, setFilterCat] = useState('');

  const load = () => api.get('/news-updates/all').then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required.'); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v === true ? '1' : v === false ? '0' : v));
      if (file) fd.append('image', file);
      if (editId) await api.put(`/news-updates/${editId}`, fd);
      else await api.post('/news-updates', fd);
      toast.success(editId ? 'Updated!' : 'Post added!');
      setForm(BLANK); setFile(null); setEditId(null);
      load();
    } catch (err) { toast.error(err.response?.data?.error || 'Error saving.'); }
    finally { setSaving(false); }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title || '', content: item.content || '', excerpt: item.excerpt || '',
      category: item.category || 'news',
      published_date: item.published_date ? item.published_date.split('T')[0] : '',
      is_published: !!item.is_published, sort_order: item.sort_order || 0
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    await api.delete(`/news-updates/${id}`);
    toast.success('Deleted.'); load();
  };

  const togglePublish = async (item) => {
    try {
      const fd = new FormData();
      const updated = { ...item, is_published: item.is_published ? 0 : 1 };
      Object.entries(updated).forEach(([k, v]) => {
        if (v !== null && v !== undefined) fd.append(k, v);
      });
      await api.put(`/news-updates/${item.id}`, fd);
      toast.success(updated.is_published ? 'Published!' : 'Unpublished.');
      load();
    } catch { toast.error('Error updating status.'); }
  };

  const filtered = filterCat ? items.filter(i => i.category === filterCat) : items;

  const catLabel = (cat) => CATEGORIES.find(c => c.value === cat)?.label || cat;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">📰 News & Updates</h1>
          <p className="admin-page-sub">Manage news posts, announcements, and events shown on the public News page.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 24 }}>
        {/* Form */}
        <div className="admin-card">
          <h3 className="admin-card-title">{editId ? 'Edit Post' : 'New Post'}</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input type="text" className="form-control" value={form.title}
                onChange={e => set('title', e.target.value)} placeholder="Post headline" required />
            </div>
            <div className="form-group">
              <label className="form-label">Excerpt / Short Summary</label>
              <textarea className="form-control" rows={2} value={form.excerpt}
                onChange={e => set('excerpt', e.target.value)} placeholder="One or two sentence summary shown in the news list..." />
            </div>
            <div className="form-group">
              <label className="form-label">Full Content</label>
              <textarea className="form-control" rows={6} value={form.content}
                onChange={e => set('content', e.target.value)} placeholder="Full article content..." />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-control" value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date Published</label>
              <input type="date" className="form-control" value={form.published_date}
                onChange={e => set('published_date', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Cover Image {editId ? '(leave blank to keep current)' : ''}</label>
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" id="is_published" checked={form.is_published}
                onChange={e => set('is_published', e.target.checked)} />
              <label htmlFor="is_published" className="form-label" style={{ margin: 0 }}>Publish immediately (visible on public site)</label>
            </div>
            <div className="form-group">
              <label className="form-label">Sort Order</label>
              <input type="number" className="form-control" value={form.sort_order}
                onChange={e => set('sort_order', e.target.value)} min="0" />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : editId ? 'Update Post' : 'Publish Post'}
              </button>
              {editId && (
                <button type="button" className="btn btn-ghost"
                  onClick={() => { setEditId(null); setForm(BLANK); setFile(null); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
            <h3 className="admin-card-title" style={{ margin: 0 }}>All Posts ({items.length})</h3>
            <select className="form-control" style={{ width: 180 }} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          {filtered.length === 0 ? (
            <p style={{ color: 'var(--gray-400)', fontSize: '0.88rem' }}>
              {items.length === 0 ? 'No posts yet. Create one!' : 'No posts in this category.'}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: 14, padding: 14, background: 'var(--gray-50)', borderRadius: 8, border: '1px solid var(--gray-200)', alignItems: 'flex-start' }}>
                  {item.image_url
                    ? <img src={getImageUrl(item.image_url)} alt="" style={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />
                    : <div style={{ width: 80, height: 56, borderRadius: 6, background: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>📰</div>
                  }
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gray-900)', margin: '0 0 3px' }}>{item.title}</p>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.72rem', background: 'var(--gray-200)', borderRadius: 4, padding: '1px 7px', color: 'var(--gray-700)' }}>{catLabel(item.category)}</span>
                      <span style={{ fontSize: '0.72rem', borderRadius: 4, padding: '1px 7px', background: item.is_published ? '#dcfce7' : '#fef9c3', color: item.is_published ? '#16a34a' : '#a16207' }}>
                        {item.is_published ? '✅ Published' : '📝 Draft'}
                      </span>
                    </div>
                    {item.published_date && <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', margin: 0 }}>📅 {item.published_date?.split('T')[0]}</p>}
                    {item.excerpt && <p style={{ fontSize: '0.78rem', color: 'var(--gray-600)', margin: '3px 0 0', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.excerpt}</p>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(item)} title="Edit">✏️</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => togglePublish(item)}
                      title={item.is_published ? 'Unpublish' : 'Publish'}
                      style={{ fontSize: '0.75rem', color: item.is_published ? 'var(--gray-500)' : 'var(--primary, #0284c7)' }}>
                      {item.is_published ? '🙈' : '👁️'}
                    </button>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--red-primary)' }} onClick={() => handleDelete(item.id)} title="Delete">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
