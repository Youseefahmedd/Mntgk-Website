'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    client_name: '', client_role: '', content_en: '', content_ar: '',
    rating: 5, is_active: true,
  });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (Array.isArray(data)) setReviews(data);
    } catch (e) { console.log('Fetch error:', e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch('/api/reviews', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, ...form }),
        });
      } else {
        await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      setEditing(null);
      resetForm();
      fetchData();
    } catch (e) { console.log('Submit error:', e); }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      client_name: item.client_name, client_role: item.client_role || '',
      content_en: item.content_en, content_ar: item.content_ar,
      rating: item.rating || 5, is_active: item.is_active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const resetForm = () => {
    setForm({ client_name: '', client_role: '', content_en: '', content_ar: '', rating: 5, is_active: true });
  };

  const openNew = () => { resetForm(); setEditing(null); setShowModal(true); };

  return (
    <>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Reviews</h1>
        <button className="btn btn-primary btn-sm" onClick={openNew}>
          <Plus size={18} /> Add New
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className={styles.noData}>No reviews yet. Add your first review!</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Client</th>
                <th>Review (EN)</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.client_name}</strong><br /><span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{item.client_role}</span></td>
                  <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.content_en}</td>
                  <td>{'★'.repeat(item.rating || 5)}</td>
                  <td>
                    <span className={`${styles.badge} ${item.is_active ? styles.badgeGreen : styles.badgeRed}`}>
                      {item.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => handleEdit(item)}>Edit</button>
                      <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{editing ? 'Edit Review' : 'Add Review'}</h2>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div><label>Client Name</label><input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} required /></div>
              <div><label>Client Role</label><input value={form.client_role} onChange={(e) => setForm({ ...form, client_role: e.target.value })} /></div>
              <div><label>Review (English)</label><textarea value={form.content_en} onChange={(e) => setForm({ ...form, content_en: e.target.value })} required /></div>
              <div><label>Review (Arabic)</label><textarea value={form.content_ar} onChange={(e) => setForm({ ...form, content_ar: e.target.value })} required /></div>
              <div>
                <label>Rating</label>
                <select value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}>
                  <option value={5}>★★★★★ (5)</option>
                  <option value={4}>★★★★ (4)</option>
                  <option value={3}>★★★ (3)</option>
                  <option value={2}>★★ (2)</option>
                  <option value={1}>★ (1)</option>
                </select>
              </div>
              <div className={styles.checkbox}>
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} id="review_active" />
                <label htmlFor="review_active">Active</label>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
