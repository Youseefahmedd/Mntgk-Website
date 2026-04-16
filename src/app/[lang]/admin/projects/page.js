'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title_en: '', title_ar: '', description_en: '', description_ar: '',
    category: 'restaurant', image_url: '', live_url: '', is_featured: false,
  });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
    } catch (e) { console.log('Fetch error:', e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, ...form }),
        });
      } else {
        await fetch('/api/projects', {
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
      category: item.category || 'restaurant', image_url: item.image_url || '',
      live_url: item.live_url || '', is_featured: item.is_featured || false,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const resetForm = () => {
    setForm({ title_en: '', title_ar: '', description_en: '', description_ar: '', category: 'restaurant', image_url: '', live_url: '', is_featured: false });
  };

  const openNew = () => { resetForm(); setEditing(null); setShowModal(true); };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Projects</h1>
        <button className="btn btn-primary btn-sm" onClick={openNew}>
          <Plus size={18} /> Add New
        </button>
      </div>

      {projects.length === 0 ? (
        <div className={styles.noData}>No projects yet. Add your first project!</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title (EN)</th>
                <th>Title (AR)</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item) => (
                <tr key={item.id}>
                  <td>{item.title_en}</td>
                  <td>{item.title_ar}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={`${styles.badge} ${item.is_featured ? styles.badgeGreen : styles.badgeYellow}`}>
                      {item.is_featured ? 'Yes' : 'No'}
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
            <h2 className={styles.modalTitle}>{editing ? 'Edit Project' : 'Add Project'}</h2>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div><label>Title (English)</label><input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} required /></div>
              <div><label>Title (Arabic)</label><input value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} required /></div>
              <div><label>Description (English)</label><textarea value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} /></div>
              <div><label>Description (Arabic)</label><textarea value={form.description_ar} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} /></div>
              <div>
                <label>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option value="restaurant">Restaurant</option>
                  <option value="salon">Salon</option>
                  <option value="retail">Retail</option>
                  <option value="services">Services</option>
                </select>
              </div>
              <div>
                <label>Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload} 
                />
                {form.image_url && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img src={form.image_url} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                  </div>
                )}
              </div>
              <div><label>Live URL</label><input value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} /></div>
              <div className={styles.checkbox}>
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} id="is_featured" />
                <label htmlFor="is_featured">Featured</label>
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
