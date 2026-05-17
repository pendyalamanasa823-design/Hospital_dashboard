import { motion } from 'framer-motion';
import { dashboardCards } from '../data/dashboardStats';
import { mockAppointments } from '../data/appointments';

import './Dashboard.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  const recentAppointments = mockAppointments.slice(0, 5);


  const getStatusBadge = (status) => {
    const map = {
      Scheduled: 'badge-primary',
      Completed: 'badge-success',
      'In Progress': 'badge-warning',
      Cancelled: 'badge-danger',
    };
    return map[status] || 'badge-info';
  };

  return (
    <motion.div className="dashboard" variants={containerVariants} initial="hidden" animate="visible">
      <div className="page-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <motion.div className="dashboard-grid" variants={containerVariants}>
        {dashboardCards.map((card) => (
          <motion.div className="stat-card" key={card.id} variants={cardVariants}>
            <div className="stat-card-header">
              <div>
                <p className="stat-label">{card.title}</p>
                <h2 className="stat-value">{card.value}</h2>
              </div>
              <div className="stat-icon" style={{ background: `${card.color}15`, color: card.color }}>
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Row */}
      <div className="dashboard-bottom">
        <motion.div className="recent-appointments card" variants={cardVariants}>
          <div className="section-header">
            <h3>Recent Appointments</h3>
            <span className="view-all">View All →</span>
          </div>
          <div className="table-container" style={{ border: 'none' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td><strong>{apt.patientName}</strong></td>
                    <td>{apt.doctorName}</td>
                    <td>{apt.time}</td>
                    <td><span className={`badge ${getStatusBadge(apt.status)}`}>{apt.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
