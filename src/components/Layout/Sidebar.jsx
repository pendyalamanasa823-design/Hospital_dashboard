import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/patients', label: 'Patients', icon: '👥' },
  { path: '/doctors', label: 'Doctors', icon: '🩺' },
  { path: '/appointments', label: 'Appointments', icon: '📅' },
];



export default function Sidebar({ isOpen, onClose }) {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">🏥</div>
          <h2>Medi<span>Care</span></h2>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-label">Main Menu</span>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              end={item.path === '/'}
              onClick={onClose}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="theme-toggle" onClick={toggleTheme}>
            <div className="theme-toggle-label">
              <span>{isDark ? '🌙' : '☀️'}</span>
              <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <div className={`toggle-switch ${isDark ? 'active' : ''}`} />
          </div>
        </div>
      </aside>
    </>
  );
}
