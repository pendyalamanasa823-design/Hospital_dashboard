import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../css/auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setSent(true);
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
          <span className="brand-icon">🔐</span>
          <h1>Reset Password</h1>
          <p>Don't worry! We'll help you recover your account access quickly and securely.</p>
        </div>
      </motion.div>

      <motion.div className="auth-form-panel"
        initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="auth-form-wrapper">
          {!sent ? (
            <>
              <div className="auth-form-header">
                <h2>Forgot Password? 🔑</h2>
                <p>Enter your email and we'll send you a reset link</p>
              </div>

              {error && <div className="auth-alert error">⚠️ {error}</div>}

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-input" placeholder="Enter your registered email"
                    value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} />
                </div>
                <button type="submit" className="auth-submit">Send Reset Link</button>
              </form>

              <div className="auth-footer">
                <p>Remember your password? <Link to="/login">Sign In</Link></p>
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✉️</div>
              <h2 style={{ marginBottom: '12px' }}>Check Your Email</h2>
              <p style={{ marginBottom: '24px', lineHeight: 1.7 }}>
                We've sent a password reset link to <strong style={{ color: 'var(--primary)' }}>{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <Link to="/login" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
                Back to Sign In
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
