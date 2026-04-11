'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title_en: '', title_ar: '', description_en: '', description_ar: '',
    icon: 'globe', sort_order: 0, is_active: true,
  });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (Array.isArray(data)) setServices(data);
    } catch (e) { console.log('Fetch error:', e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch('/api/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, ...form }),
        });
      } else {
        await fetch('/api/services', {
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
      title_en: item.title_en, title_ar: item.title_ar,
      description_en: item.description_en || '', description_ar: item.description_ar || '',
      icon: item.icon || 'globe', sort_order: item.sort_order || 0, is_active: item.is_active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const resetForm = () => {
    setForm({ title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'globe', sort_order: 0, is_active: true });
  };

  const openNew = () => {
    resetForm();
    setEditing(null);
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Services</h1>
        <button className="btn btn-primary btn-sm" onClick={openNew}>
          <Plus size={18} /> Add New
        </button>
      </div>

      {services.length === 0 ? (
        <div className={styles.noData}>No services yet. Add your first service!</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title (EN)</th>
                <th>Title (AR)</th>
                <th>Icon</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item) => (
                <tr key={item.id}>
                  <td>{item.title_en}</td>
                  <td>{item.title_ar}</td>
                  <td>{item.icon}</td>
                  <td>{item.sort_order}</td>
                  <td>
                    <span className={`${styles.badge} ${item.is_active ? styles.badgeGreen : styles.badgeRed}`}>
                      {item.is_active ? 'Active' : 'Inactive'}
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
            <h2 className={styles.modalTitle}>{editing ? 'Edit Service' : 'Add Service'}</h2>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div>
                <label>Title (English)</label>
                <input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} required />
              </div>
              <div>
                <label>Title (Arabic)</label>
                <input value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} required />
              </div>
              <div>
                <label>Description (English)</label>
                <textarea value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} />
              </div>
              <div>
                <label>Description (Arabic)</label>
                <textarea value={form.description_ar} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} />
              </div>
              <div>
                <label>Icon</label>
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
                  <option value="globe">Globe</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="search">Search</option>
                  <option value="mapPin">Map Pin</option>
                  <option value="server">Server</option>
                  <option value="headphones">Headphones</option>
                </select>
              </div>
              <div>
                <label>Sort Order</label>
                <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
              </div>
              <div className={styles.checkbox}>
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} id="is_active" />
                <label htmlFor="is_active">Active</label>
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
