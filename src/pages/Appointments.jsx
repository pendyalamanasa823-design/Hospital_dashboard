import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockAppointments } from '../data/appointments';
import { mockPatients } from '../data/patients';
import { mockDoctors } from '../data/doctors';
import Modal from '../components/Modals/Modal';
import '../pages/Patients.css';
import './Appointments.css';

const emptyApt = {
  patientName: '', doctorName: '', date: '', time: '',
  status: 'Scheduled', type: 'Consultation', department: '', notes: '',
};

export default function Appointments() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyApt);

  const statuses = ['All', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'];
  const types = ['Consultation', 'Follow-up', 'Emergency', 'Surgery', 'Procedure', 'Lab Review'];

  const filtered = appointments.filter((a) => {
    const matchSearch = a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openBook = () => { setEditing(null); setForm(emptyApt); setModalOpen(true); };
  const openEdit = (apt) => { setEditing(apt.id); setForm({ ...apt }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.patientName || !form.doctorName || !form.date || !form.time) return;
    if (editing) {
      setAppointments((prev) => prev.map((a) => (a.id === editing ? { ...form, id: editing } : a)));
    } else {
      setAppointments((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    );
  };

  const getStatusBadge = (status) => {
    const map = { Scheduled: 'badge-primary', Completed: 'badge-success', 'In Progress': 'badge-warning', Cancelled: 'badge-danger' };
    return map[status] || 'badge-info';
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>Appointment Management</h1>
          <p>Schedule and manage patient appointments</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={openBook}>+ Book Appointment</button>
        </div>
      </div>

      <div className="filter-bar card">
        <div className="search-input-wrapper">
          <span className="search-icon-sm">🔍</span>
          <input type="text" placeholder="Search appointments..." className="form-input search-field"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="filter-chips">
          {statuses.map((s) => (
            <button key={s} className={`filter-chip ${filterStatus === s ? 'active' : ''}`}
              onClick={() => setFilterStatus(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((apt) => (
                <motion.tr key={apt.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout>
                  <td><strong>{apt.patientName}</strong></td>
                  <td>{apt.doctorName}</td>
                  <td>{apt.date}</td>
                  <td>{apt.time}</td>
                  <td><span className="badge badge-info">{apt.type}</span></td>
                  <td>{apt.department}</td>
                  <td><span className={`badge ${getStatusBadge(apt.status)}`}>{apt.status}</span></td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(apt)}>✏️</button>
                      {apt.status === 'Scheduled' && (
                        <button className="btn btn-sm btn-danger" onClick={() => cancelAppointment(apt.id)}>✕</button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state"><span>📅</span><p>No appointments found</p></div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? 'Reschedule Appointment' : 'Book New Appointment'}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {editing ? 'Update' : 'Book Appointment'}
            </button>
          </>
        }
      >
        <div className="modal-form-grid">
          <div className="form-group">
            <label>Patient *</label>
            <select className="form-input form-select" value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}>
              <option value="">Select Patient</option>
              {mockPatients.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Doctor *</label>
            <select className="form-input form-select" value={form.doctorName}
              onChange={(e) => {
                const doc = mockDoctors.find((d) => d.name === e.target.value);
                setForm({ ...form, doctorName: e.target.value, department: doc?.specialization || '' });
              }}>
              <option value="">Select Doctor</option>
              {mockDoctors.map((d) => <option key={d.id} value={d.name}>{d.name} - {d.specialization}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Date *</label>
            <input type="date" className="form-input" value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Time *</label>
            <input type="time" className="form-input" value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select className="form-input form-select" value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select className="form-input form-select" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {statuses.filter((s) => s !== 'All').map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group full-width">
            <label>Notes</label>
            <input className="form-input" value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Appointment notes..." />
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
