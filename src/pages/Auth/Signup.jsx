import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import '../../css/auth.css';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', role: 'Nurse',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const getPasswordStrength = (pw) => {
    if (!pw) return { level: 0, text: '', class: '' };
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { level: 1, text: 'Weak', class: 'weak' };
    if (score <= 2) return { level: 2, text: 'Fair', class: 'fair' };
    if (score <= 3) return { level: 3, text: 'Good', class: 'good' };
    return { level: 4, text: 'Strong', class: 'strong' };
  };

  const strength = getPasswordStrength(form.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = signup(form);
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
      <motion.div className="auth-branding"
        initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      >
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
        <div className="auth-branding-content">
          <span className="brand-icon">🏥</span>
          <h1>Join MediCare</h1>
          <p>Create your account and start managing healthcare efficiently</p>
          <div className="auth-features">
            <div className="auth-feature-item"><span>🔒</span><span>Secure & Encrypted Platform</span></div>
            <div className="auth-feature-item"><span>⚡</span><span>Instant Access to All Features</span></div>
            <div className="auth-feature-item"><span>🌐</span><span>Access from Any Device</span></div>
          </div>
        </div>
      </motion.div>

      <motion.div className="auth-form-panel"
        initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h2>Create Account ✨</h2>
            <p>Fill in the details to register</p>
          </div>

          {error && <div className="auth-alert error">⚠️ {error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" className="form-input" placeholder="John Doe"
                value={form.fullName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" className="form-input" placeholder="john@hospital.com"
                value={form.email} onChange={handleChange} />
            </div>

            <div className="auth-form .form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-input" placeholder="Min 6 characters"
                  value={form.password} onChange={handleChange} />
                {form.password && (
                  <>
                    <div className="password-strength">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`strength-bar ${i <= strength.level ? `active ${strength.class}` : ''}`} />
                      ))}
                    </div>
                    <span className={`strength-text text-${strength.class === 'weak' ? 'danger' : strength.class === 'fair' ? 'warning' : 'success'}`}>
                      {strength.text}
                    </span>
                  </>
                )}
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" className="form-input" placeholder="Re-enter password"
                  value={form.confirmPassword} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Role</label>
              <select name="role" className="form-input form-select" value={form.role} onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Staff">Staff</option>
              </select>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
