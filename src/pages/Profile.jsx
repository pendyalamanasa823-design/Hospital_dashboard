import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    role: user?.role || '',
  });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [message, setMessage] = useState('');

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>View and edit your profile information</p>
        </div>
      </div>

      {message && (
        <div className="auth-alert success" style={{ marginBottom: '16px' }}>✅ {message}</div>
      )}

      <div className="profile-layout">
        <motion.div className="profile-card card"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="profile-header">
            <div className="profile-avatar-large">
              {getInitials(user?.fullName)}
            </div>
            <h2>{user?.fullName || 'User'}</h2>
            <span className="badge badge-primary">{user?.role || 'Staff'}</span>
            <p className="profile-email">{user?.email}</p>
          </div>
          <div className="profile-details">
            <div className="profile-detail-item">
              <span className="detail-label">📞 Phone</span>
              <span className="detail-value">{user?.phone || 'Not set'}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">🏥 Department</span>
              <span className="detail-value">{user?.department || 'Not set'}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">📅 Joined</span>
              <span className="detail-value">{user?.joinDate || 'N/A'}</span>
            </div>
          </div>
        </motion.div>

        <div className="profile-forms">
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 style={{ marginBottom: 'var(--space-lg)', paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--border)' }}>
              ✏️ Edit Profile
            </h3>
            <div className="modal-form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input className="form-input" value={form.fullName} disabled={!editing}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input className="form-input" value={form.email} disabled={!editing}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input className="form-input" value={form.phone} disabled={!editing}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input className="form-input" value={form.department} disabled={!editing}
                  onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="Department" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              {editing ? (
                <>
                  <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                  <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
                </>
              ) : (
                <button className="btn btn-secondary" onClick={() => setEditing(true)}>Edit Profile</button>
              )}
            </div>
          </motion.div>

          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ marginTop: 'var(--space-lg)' }}>
            <h3 style={{ marginBottom: 'var(--space-lg)', paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--border)' }}>
              🔐 Change Password
            </h3>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" className="form-input" value={pwForm.current}
                onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })} placeholder="Current password" />
            </div>
            <div className="modal-form-grid">
              <div className="form-group">
                <label>New Password</label>
                <input type="password" className="form-input" value={pwForm.newPw}
                  onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })} placeholder="New password" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" className="form-input" value={pwForm.confirm}
                  onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })} placeholder="Confirm" />
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: '8px' }}
              onClick={() => { setMessage('Password updated successfully!'); setPwForm({ current: '', newPw: '', confirm: '' }); setTimeout(() => setMessage(''), 3000); }}>
              Update Password
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
