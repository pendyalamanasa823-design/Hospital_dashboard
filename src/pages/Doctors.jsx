import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDoctors } from '../data/doctors';
import Modal from '../components/Modals/Modal';
import './Doctors.css';

const emptyDoctor = {
  name: '', specialization: '', experience: '', contact: '',
  email: '', availability: 'Available', schedule: '', education: '',
};

export default function Doctors() {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [search, setSearch] = useState('');
  const [filterSpec, setFilterSpec] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyDoctor);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const specializations = ['All', ...new Set(mockDoctors.map((d) => d.specialization))];

  const filtered = doctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase());
    const matchSpec = filterSpec === 'All' || d.specialization === filterSpec;
    return matchSearch && matchSpec;
  });

  const openAdd = () => { setEditing(null); setForm(emptyDoctor); setModalOpen(true); };
  const openEdit = (doc) => { setEditing(doc.id); setForm({ ...doc }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.specialization) return;
    if (editing) {
      setDoctors((prev) => prev.map((d) => (d.id === editing ? { ...form, id: editing } : d)));
    } else {
      setDoctors((prev) => [...prev, { ...form, id: Date.now(), patients: 0, rating: 0 }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    setDeleteConfirm(null);
  };

  const getAvailBadge = (avail) => {
    const map = { Available: 'badge-success', 'In Surgery': 'badge-warning', 'On Leave': 'badge-danger' };
    return map[avail] || 'badge-primary';
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>Doctor Management</h1>
          <p>Manage hospital doctors and their schedules</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={openAdd}>+ Add Doctor</button>
        </div>
      </div>

      <div className="filter-bar card">
        <div className="search-input-wrapper">
          <span className="search-icon-sm">🔍</span>
          <input type="text" placeholder="Search doctors..." className="form-input search-field"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="filter-chips">
          {specializations.map((s) => (
            <button key={s} className={`filter-chip ${filterSpec === s ? 'active' : ''}`}
              onClick={() => setFilterSpec(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="doctors-grid">
        <AnimatePresence>
          {filtered.map((doctor) => (
            <motion.div className="doctor-card card" key={doctor.id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }} layout
            >
              <div className="doctor-card-top">
                <div className="doctor-avatar">
                  {doctor.name.split(' ').slice(1).map((n) => n[0]).join('')}
                </div>
                <span className={`badge ${getAvailBadge(doctor.availability)}`}>{doctor.availability}</span>
              </div>
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-spec">{doctor.specialization}</p>
              <div className="doctor-stats">
                <div className="doctor-stat">
                  <span className="stat-num">{doctor.experience}</span>
                  <span className="stat-desc">Years Exp</span>
                </div>
                <div className="doctor-stat">
                  <span className="stat-num">{doctor.patients}</span>
                  <span className="stat-desc">Patients</span>
                </div>
                <div className="doctor-stat">
                  <span className="stat-num">⭐ {doctor.rating}</span>
                  <span className="stat-desc">Rating</span>
                </div>
              </div>
              <div className="doctor-info">
                <p>📧 {doctor.email}</p>
                <p>📞 {doctor.contact}</p>
                <p>🕐 {doctor.schedule}</p>
              </div>
              <div className="doctor-actions">
                <Link to={`/doctors/${doctor.id}`} className="btn btn-sm btn-primary">👁️ View</Link>
                <button className="btn btn-sm btn-secondary" onClick={() => openEdit(doctor)}>✏️ Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => setDeleteConfirm(doctor.id)}>🗑️</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="empty-state card">
          <span>🩺</span><p>No doctors found</p>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Doctor' : 'Add New Doctor'}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {editing ? 'Update' : 'Add Doctor'}
            </button>
          </>
        }
      >
        <div className="modal-form-grid">
          <div className="form-group full-width">
            <label>Full Name *</label>
            <input className="form-input" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Name" />
          </div>
          <div className="form-group">
            <label>Specialization *</label>
            <input className="form-input" value={form.specialization}
              onChange={(e) => setForm({ ...form, specialization: e.target.value })} placeholder="Cardiology" />
          </div>
          <div className="form-group">
            <label>Experience (years)</label>
            <input type="number" className="form-input" value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="10" />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input className="form-input" value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Phone" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-input" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
          </div>
          <div className="form-group">
            <label>Availability</label>
            <select className="form-input form-select" value={form.availability}
              onChange={(e) => setForm({ ...form, availability: e.target.value })}>
              <option>Available</option><option>In Surgery</option><option>On Leave</option>
            </select>
          </div>
          <div className="form-group">
            <label>Schedule</label>
            <input className="form-input" value={form.schedule}
              onChange={(e) => setForm({ ...form, schedule: e.target.value })} placeholder="Mon-Fri, 9AM-5PM" />
          </div>
          <div className="form-group full-width">
            <label>Education</label>
            <input className="form-input" value={form.education}
              onChange={(e) => setForm({ ...form, education: e.target.value })} placeholder="MD - University" />
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
          </>
        }
      >
        <p style={{ color: 'var(--text)' }}>Are you sure you want to remove this doctor?</p>
      </Modal>
    </motion.div>
  );
}
