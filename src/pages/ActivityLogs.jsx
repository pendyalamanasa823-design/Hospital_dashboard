import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockActivityLogs } from '../data/activityLogs';
import './ActivityLogs.css';

export default function ActivityLogs() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'patient', 'appointment', 'emergency', 'medical', 'lab', 'surgery', 'staff', 'system'];

  const filtered = filter === 'All'
    ? mockActivityLogs
    : mockActivityLogs.filter((l) => l.category === filter);

  const formatDate = (ts) => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>Activity Logs</h1>
          <p>Track all activities and events in the system</p>
        </div>
      </div>

      <div className="filter-bar card">
        <div className="filter-chips">
          {categories.map((c) => (
            <button key={c} className={`filter-chip ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}>
              {c === 'All' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="timeline">
        {filtered.map((log, i) => (
          <motion.div className="timeline-item" key={log.id}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="timeline-marker">
              <div className="timeline-icon">{log.icon}</div>
              {i < filtered.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-content card">
              <div className="timeline-header">
                <h4>{log.action}</h4>
                <span className={`badge badge-${log.category === 'emergency' ? 'danger' : log.category === 'system' ? 'info' : 'primary'}`}>
                  {log.category}
                </span>
              </div>
              <p className="timeline-desc">{log.description}</p>
              <div className="timeline-meta">
                <span>👤 {log.user}</span>
                <span>📅 {formatDate(log.timestamp)}</span>
                <span>🕐 {formatTime(log.timestamp)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
