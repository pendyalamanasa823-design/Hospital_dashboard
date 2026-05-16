import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications } from '../../data/notifications';
import './Topbar.css';

export default function Topbar({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="hamburger" onClick={onMenuToggle}>☰</button>
        <div className="topbar-search">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search patients, doctors, appointments..." />
        </div>
      </div>

      <div className="topbar-right">
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            className="topbar-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-panel">
              <div className="notification-header">
                <h3>Notifications</h3>
                <button className="mark-all-read" onClick={markAllRead}>
                  Mark all read
                </button>
              </div>
              <div className="notification-list">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${!notif.read ? 'unread' : ''}`}
                  >
                    <span className="notification-icon">{notif.icon}</span>
                    <div className="notification-content">
                      <h4>{notif.title}</h4>
                      <p>{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div ref={userRef} style={{ position: 'relative' }}>
          <div
            className="topbar-user"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="topbar-avatar">
              {getInitials(user?.fullName)}
            </div>
            <div className="topbar-user-info">
              <span className="topbar-user-name">{user?.fullName || 'User'}</span>
              <span className="topbar-user-role">{user?.role || 'Staff'}</span>
            </div>
          </div>

          {showUserMenu && (
            <div className="user-dropdown">
              <button className="logout-btn" onClick={logout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
