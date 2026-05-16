import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockPatients } from '../data/patients';
import { mockDoctors } from '../data/doctors';
import { mockAppointments } from '../data/appointments';
import './PatientProfile.css';

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = mockPatients.find((p) => p.id === Number(id));

  if (!patient) {
    return (
      <div className="profile-not-found">
        <span>👥</span>
        <h2>Patient Not Found</h2>
        <p>The patient you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/patients')}>← Back to Patients</button>
      </div>
    );
  }

  // Find the assigned doctor
  const assignedDoctor = mockDoctors.find(
    (d) => d.name === patient.assignedDoctor
  );

  // Find appointments for this patient
  const patientAppointments = mockAppointments.filter(
    (a) => a.patientName === patient.name
  );

  const getStatusBadge = (status) => {
    const map = {
      Admitted: 'badge-primary', 'Under Treatment': 'badge-warning', Critical: 'badge-danger',
      'Post-Surgery': 'badge-info', Recovering: 'badge-success', Discharged: 'badge-success',
      Scheduled: 'badge-primary', Completed: 'badge-success', 'In Progress': 'badge-warning', Cancelled: 'badge-danger',
    };
    return map[status] || 'badge-info';
  };

  const getAvailBadge = (avail) => {
    const map = { Available: 'badge-success', 'In Surgery': 'badge-warning', 'On Leave': 'badge-danger' };
    return map[avail] || 'badge-primary';
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="profile-back">
        <button className="btn btn-ghost" onClick={() => navigate('/patients')}>← Back to Patients</button>
      </div>

      <div className="patient-profile-layout">
        {/* Patient Info Card */}
        <motion.div className="patient-profile-card card"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="pp-avatar">
            {patient.name.charAt(0)}
          </div>
          <h2 className="pp-name">{patient.name}</h2>
          <span className={`badge ${getStatusBadge(patient.status)}`}>{patient.status}</span>

          <div className="pp-info-grid">
            <div className="pp-info-item">
              <span className="pp-info-label">Age</span>
              <span className="pp-info-value">{patient.age} years</span>
            </div>
            <div className="pp-info-item">
              <span className="pp-info-label">Gender</span>
              <span className="pp-info-value">{patient.gender}</span>
            </div>
            <div className="pp-info-item">
              <span className="pp-info-label">Blood Group</span>
              <span className="pp-info-value">{patient.bloodGroup}</span>
            </div>
            <div className="pp-info-item">
              <span className="pp-info-label">Room</span>
              <span className="pp-info-value">{patient.room}</span>
            </div>
          </div>

          <div className="pp-details">
            <div className="pp-detail-row">
              <span className="pp-detail-icon">🦠</span>
              <div>
                <span className="pp-detail-label">Condition</span>
                <span className="pp-detail-value">{patient.disease}</span>
              </div>
            </div>
            <div className="pp-detail-row">
              <span className="pp-detail-icon">📅</span>
              <div>
                <span className="pp-detail-label">Admission Date</span>
                <span className="pp-detail-value">{patient.admissionDate}</span>
              </div>
            </div>
            <div className="pp-detail-row">
              <span className="pp-detail-icon">📧</span>
              <div>
                <span className="pp-detail-label">Email</span>
                <span className="pp-detail-value">{patient.email}</span>
              </div>
            </div>
            <div className="pp-detail-row">
              <span className="pp-detail-icon">📞</span>
              <div>
                <span className="pp-detail-label">Phone</span>
                <span className="pp-detail-value">{patient.phone}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="patient-profile-content">
          {/* Assigned Doctor */}
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="section-header">
              <h3>🩺 Assigned Doctor</h3>
            </div>
            {assignedDoctor ? (
              <div className="assigned-doctor-card">
                <div className="adc-left">
                  <div className="adc-avatar">
                    {assignedDoctor.name.split(' ').slice(1).map((n) => n[0]).join('')}
                  </div>
                  <div className="adc-info">
                    <h4>{assignedDoctor.name}</h4>
                    <p className="adc-spec">{assignedDoctor.specialization}</p>
                    <div className="adc-meta">
                      <span>📧 {assignedDoctor.email}</span>
                      <span>📞 {assignedDoctor.contact}</span>
                      <span>🕐 {assignedDoctor.schedule}</span>
                    </div>
                  </div>
                </div>
                <div className="adc-right">
                  <span className={`badge ${getAvailBadge(assignedDoctor.availability)}`}>
                    {assignedDoctor.availability}
                  </span>
                  <Link to={`/doctors/${assignedDoctor.id}`} className="btn btn-sm btn-secondary" style={{ marginTop: '8px' }}>
                    View Profile →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '32px' }}>
                <span>🩺</span>
                <p>No doctor assigned</p>
              </div>
            )}
          </motion.div>

          {/* Patient Appointments */}
          <motion.div className="card" style={{ marginTop: 'var(--space-lg)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="section-header">
              <h3>📅 Appointment History ({patientAppointments.length})</h3>
            </div>
            {patientAppointments.length > 0 ? (
              <div className="table-container" style={{ border: 'none' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Notes</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td><strong>{apt.doctorName}</strong></td>
                        <td>{apt.date}</td>
                        <td>{apt.time}</td>
                        <td><span className="badge badge-info">{apt.type}</span></td>
                        <td style={{ maxWidth: '200px', whiteSpace: 'normal', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{apt.notes}</td>
                        <td><span className={`badge ${getStatusBadge(apt.status)}`}>{apt.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '32px' }}>
                <span>📅</span>
                <p>No appointments recorded</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
