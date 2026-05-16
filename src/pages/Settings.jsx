import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './Settings.css';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    emergencyAlerts: true,
    language: 'English',
    timezone: 'UTC-5 (Eastern)',
    autoLogout: '30',
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Configure your dashboard preferences</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-section card">
          <h3 className="settings-section-title">🎨 Appearance</h3>
          <div className="setting-item">
            <div>
              <p className="setting-label">Dark Mode</p>
              <p className="setting-desc">Switch between light and dark theme</p>
            </div>
            <div className={`toggle-switch ${isDark ? 'active' : ''}`} onClick={toggleTheme} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div className="settings-section card">
          <h3 className="settings-section-title">🔔 Notifications</h3>
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
            { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive SMS alerts' },
            { key: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Get reminded before appointments' },
            { key: 'emergencyAlerts', label: 'Emergency Alerts', desc: 'Receive critical emergency alerts' },
          ].map((item) => (
            <div className="setting-item" key={item.key}>
              <div>
                <p className="setting-label">{item.label}</p>
                <p className="setting-desc">{item.desc}</p>
              </div>
              <div className={`toggle-switch ${settings[item.key] ? 'active' : ''}`}
                onClick={() => handleToggle(item.key)} style={{ cursor: 'pointer' }} />
            </div>
          ))}
        </div>

        <div className="settings-section card">
          <h3 className="settings-section-title">🌐 General</h3>
          <div className="setting-item">
            <div>
              <p className="setting-label">Language</p>
              <p className="setting-desc">Select your preferred language</p>
            </div>
            <select className="form-input form-select" style={{ width: '180px' }}
              value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })}>
              <option>English</option><option>Spanish</option><option>French</option><option>German</option>
            </select>
          </div>
          <div className="setting-item">
            <div>
              <p className="setting-label">Timezone</p>
              <p className="setting-desc">Set your timezone</p>
            </div>
            <select className="form-input form-select" style={{ width: '180px' }}
              value={settings.timezone} onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}>
              <option>UTC-5 (Eastern)</option><option>UTC-6 (Central)</option>
              <option>UTC-7 (Mountain)</option><option>UTC-8 (Pacific)</option>
            </select>
          </div>
          <div className="setting-item">
            <div>
              <p className="setting-label">Auto Logout</p>
              <p className="setting-desc">Automatically log out after inactivity</p>
            </div>
            <select className="form-input form-select" style={{ width: '180px' }}
              value={settings.autoLogout} onChange={(e) => setSettings({ ...settings, autoLogout: e.target.value })}>
              <option value="15">15 minutes</option><option value="30">30 minutes</option>
              <option value="60">1 hour</option><option value="never">Never</option>
            </select>
          </div>
        </div>

        <div className="settings-section card">
          <h3 className="settings-section-title">🔐 Security</h3>
          <div className="setting-item">
            <div>
              <p className="setting-label">Change Password</p>
              <p className="setting-desc">Update your account password</p>
            </div>
            <button className="btn btn-secondary btn-sm">Change</button>
          </div>
          <div className="setting-item">
            <div>
              <p className="setting-label">Two-Factor Authentication</p>
              <p className="setting-desc">Add an extra layer of security</p>
            </div>
            <button className="btn btn-secondary btn-sm">Enable</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
