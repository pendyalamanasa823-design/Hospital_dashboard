import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import '../../css/auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-branding"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
        <div className="auth-branding-content">
          <span className="brand-icon">🏥</span>
          <h1>MediCare Hospital</h1>
          <p>Advanced Hospital Management System for modern healthcare facilities</p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <span>📊</span>
              <span>Real-time Dashboard Analytics</span>
            </div>
            <div className="auth-feature-item">
              <span>👥</span>
              <span>Complete Patient Management</span>
            </div>
            <div className="auth-feature-item">
              <span>📅</span>
              <span>Smart Appointment Scheduling</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="auth-form-panel"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h2>Welcome Back 👋</h2>
            <p>Sign in to access your hospital dashboard</p>
          </div>

          {error && (
            <div className="auth-alert error">⚠️ {error}</div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="auth-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <strong>Demo Credentials:</strong><br />
            📧 admin@hospital.com / admin123<br />
            📧 doctor@hospital.com / doctor123
          </div>
        </div>
      </motion.div>
    </div>
  );
}
