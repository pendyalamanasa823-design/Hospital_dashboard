import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockDoctors } from '../data/doctors';
import { mockPatients } from '../data/patients';
import { mockAppointments } from '../data/appointments';
import './DoctorProfile.css';

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = mockDoctors.find((d) => d.id === Number(id));

  if (!doctor) {
    return (
      <div className="profile-not-found">
        <span>🩺</span>
        <h2>Doctor Not Found</h2>
        <p>The doctor you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/doctors')}>← Back to Doctors</button>
      </div>
    );
  }

  // Find patients assigned to this doctor
  const assignedPatients = mockPatients.filter(
    (p) => p.assignedDoctor === doctor.name
  );

  // Find appointments for this doctor
  const doctorAppointments = mockAppointments.filter(
    (a) => a.doctorName === doctor.name
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
        <button className="btn btn-ghost" onClick={() => navigate('/doctors')}>← Back to Doctors</button>
      </div>

      <div className="doctor-profile-layout">
        {/* Doctor Info Card */}
        <motion.div className="doctor-profile-card card"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="dp-avatar">
            {doctor.name.split(' ').slice(1).map((n) => n[0]).join('')}
          </div>
          <h2 className="dp-name">{doctor.name}</h2>
          <p className="dp-spec">{doctor.specialization}</p>
          <span className={`badge ${getAvailBadge(doctor.availability)}`}>{doctor.availability}</span>

          <div className="dp-stats-row">
            <div className="dp-stat-item">
              <span className="dp-stat-num">{doctor.experience}</span>
              <span className="dp-stat-label">Years Exp</span>
            </div>
            <div className="dp-stat-item">
              <span className="dp-stat-num">{assignedPatients.length}</span>
              <span className="dp-stat-label">Patients</span>
            </div>
            <div className="dp-stat-item">
              <span className="dp-stat-num">⭐ {doctor.rating}</span>
              <span className="dp-stat-label">Rating</span>
            </div>
          </div>

          <div className="dp-details">
            <div className="dp-detail-row">
              <span className="dp-detail-icon">📧</span>
              <span>{doctor.email}</span>
            </div>
            <div className="dp-detail-row">
              <span className="dp-detail-icon">📞</span>
              <span>{doctor.contact}</span>
            </div>
            <div className="dp-detail-row">
              <span className="dp-detail-icon">🎓</span>
              <span>{doctor.education}</span>
            </div>
            <div className="dp-detail-row">
              <span className="dp-detail-icon">🕐</span>
              <span>{doctor.schedule}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="doctor-profile-content">
          {/* Assigned Patients */}
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="section-header">
              <h3>👥 Patients Under Care ({assignedPatients.length})</h3>
            </div>
            {assignedPatients.length > 0 ? (
              <div className="table-container" style={{ border: 'none' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Age</th>
                      <th>Disease</th>
                      <th>Room</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td>
                          <div className="patient-cell">
                            <div className="patient-avatar">{patient.name.charAt(0)}</div>
                            <div>
                              <strong>{patient.name}</strong>
                              <span className="cell-sub">{patient.gender}, {patient.age} yrs</span>
                            </div>
                          </div>
                        </td>
                        <td>{patient.age}</td>
                        <td>{patient.disease}</td>
                        <td>{patient.room}</td>
                        <td><span className={`badge ${getStatusBadge(patient.status)}`}>{patient.status}</span></td>
                        <td>
                          <Link to={`/patients/${patient.id}`} className="btn btn-sm btn-secondary">
                            View →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '32px' }}>
                <span>👥</span>
                <p>No patients currently assigned</p>
              </div>
            )}
          </motion.div>

          {/* Doctor's Appointments */}
          <motion.div className="card" style={{ marginTop: 'var(--space-lg)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="section-header">
              <h3>📅 Upcoming Appointments ({doctorAppointments.length})</h3>
            </div>
            {doctorAppointments.length > 0 ? (
              <div className="table-container" style={{ border: 'none' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td><strong>{apt.patientName}</strong></td>
                        <td>{apt.date}</td>
                        <td>{apt.time}</td>
                        <td><span className="badge badge-info">{apt.type}</span></td>
                        <td><span className={`badge ${getStatusBadge(apt.status)}`}>{apt.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '32px' }}>
                <span>📅</span>
                <p>No appointments scheduled</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
