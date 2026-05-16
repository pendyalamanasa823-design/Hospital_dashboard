import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mockPatients } from '../data/patients';
import { mockDoctors } from '../data/doctors';
import Modal from '../components/Modals/Modal';
import './Patients.css';

const emptyPatient = {
  name: '', age: '', gender: 'Male', disease: '', assignedDoctor: '',
  admissionDate: '', status: 'Admitted', phone: '', email: '', bloodGroup: 'A+', room: '',
};

export default function Patients() {
  const [patients, setPatients] = useState(mockPatients);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPatient);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const statuses = ['All', 'Admitted', 'Under Treatment', 'Critical', 'Post-Surgery', 'Recovering', 'Discharged'];

  const filtered = patients.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.disease.toLowerCase().includes(search.toLowerCase()) ||
      p.assignedDoctor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => { setEditing(null); setForm(emptyPatient); setModalOpen(true); };
  const openEdit = (patient) => { setEditing(patient.id); setForm({ ...patient }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.age || !form.disease) return;
    if (editing) {
      setPatients((prev) => prev.map((p) => (p.id === editing ? { ...form, id: editing } : p)));
    } else {
      setPatients((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const getStatusBadge = (status) => {
    const map = {
      Admitted: 'badge-primary', 'Under Treatment': 'badge-warning', Critical: 'badge-danger',
      'Post-Surgery': 'badge-info', Recovering: 'badge-success', Discharged: 'badge-success',
    };
    return map[status] || 'badge-primary';
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>Patient Management</h1>
          <p>Manage and monitor all patients</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={openAdd}>+ Add Patient</button>
        </div>
      </div>

      <div className="filter-bar card">
        <div className="search-input-wrapper">
          <span className="search-icon-sm">🔍</span>
          <input type="text" placeholder="Search patients..." className="form-input search-field"
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
              <th>Age</th>
              <th>Gender</th>
              <th>Disease</th>
              <th>Doctor</th>
              <th>Room</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((patient) => (
                <motion.tr key={patient.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  layout
                >
                  <td>
                    <div className="patient-cell">
                      <div className="patient-avatar">{patient.name.charAt(0)}</div>
                      <div>
                        <strong>{patient.name}</strong>
                        <span className="cell-sub">{patient.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.disease}</td>
                  <td>{patient.assignedDoctor}</td>
                  <td>{patient.room}</td>
                  <td><span className={`badge ${getStatusBadge(patient.status)}`}>{patient.status}</span></td>
                  <td>
                    <div className="table-actions">
                      <Link to={`/patients/${patient.id}`} className="btn btn-sm btn-primary">👁️</Link>
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(patient)}>✏️</button>
                      <button className="btn btn-sm btn-danger" onClick={() => setDeleteConfirm(patient.id)}>🗑️</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">
            <span>🔍</span>
            <p>No patients found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Patient' : 'Add New Patient'}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {editing ? 'Update Patient' : 'Add Patient'}
            </button>
          </>
        }
      >
        <div className="modal-form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <input className="form-input" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Patient name" />
          </div>
          <div className="form-group">
            <label>Age *</label>
            <input type="number" className="form-input" value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Age" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select className="form-input form-select" value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Blood Group</label>
            <select className="form-input form-select" value={form.bloodGroup}
              onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}>
              {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="form-group full-width">
            <label>Disease / Condition *</label>
            <input className="form-input" value={form.disease}
              onChange={(e) => setForm({ ...form, disease: e.target.value })} placeholder="Disease" />
          </div>
          <div className="form-group">
            <label>Assigned Doctor</label>
            <select className="form-input form-select" value={form.assignedDoctor}
              onChange={(e) => setForm({ ...form, assignedDoctor: e.target.value })}>
              <option value="">Select Doctor</option>
              {mockDoctors.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Room</label>
            <input className="form-input" value={form.room}
              onChange={(e) => setForm({ ...form, room: e.target.value })} placeholder="Room number" />
          </div>
          <div className="form-group">
            <label>Admission Date</label>
            <input type="date" className="form-input" value={form.admissionDate}
              onChange={(e) => setForm({ ...form, admissionDate: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select className="form-input form-select" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {statuses.filter((s) => s !== 'All').map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input className="form-input" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-input" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
          </div>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
          </>
        }
      >
        <p style={{ color: 'var(--text)' }}>Are you sure you want to remove this patient? This action cannot be undone.</p>
      </Modal>
    </motion.div>
  );
}
