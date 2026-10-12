
import { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  UserRound,
} from 'lucide-react';
import './AuthPage.css';

function AuthPage({ mode, onModeChange, onBack, onSuccess }) {
  const isSignUp = mode === 'signup';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  function validateForm() {
    const nextErrors = {};

    if (isSignUp && !name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (isSignUp && password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    // Frontend demo only. Real authentication will use the backend.
    onSuccess({
      name: isSignUp ? name.trim() : email.trim().split('@')[0],
      email: email.trim(),
    });
  }

  return (
    <section className="auth-page">
      <button className="auth-back-button" onClick={onBack}>
        <ArrowLeft size={17} />
        Back to Library
      </button>

      <div className="auth-card">
        <div className="auth-brand-icon">
          <BookOpen size={28} />
        </div>

        <h1>{isSignUp ? 'Create your account' : 'Welcome back!'}</h1>

        <p className="auth-subtitle">
          {isSignUp
            ? 'Join AR Library and discover your next favorite book.'
            : 'Sign in to continue your reading journey.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {isSignUp && (
            <div className="auth-field">
              <label htmlFor="auth-name">Full name</label>
              <div className={`auth-input-wrap ${errors.name ? 'has-error' : ''}`}>
                <UserRound size={18} />
                <input
                  id="auth-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
              </div>
              {errors.name && <p className="auth-error">{errors.name}</p>}
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email address</label>
            <div className={`auth-input-wrap ${errors.email ? 'has-error' : ''}`}>
              <Mail size={18} />
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(errors.email)}
              />
            </div>
            {errors.email && <p className="auth-error">{errors.email}</p>}
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <div className={`auth-input-wrap ${errors.password ? 'has-error' : ''}`}>
              <LockKeyhole size={18} />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                placeholder="At least 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(errors.password)}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="auth-error">{errors.password}</p>
            )}
          </div>

          {isSignUp && (
            <div className="auth-field">
              <label htmlFor="auth-confirm-password">Confirm password</label>
              <div
                className={`auth-input-wrap ${
                  errors.confirmPassword ? 'has-error' : ''
                }`}
              >
                <LockKeyhole size={18} />
                <input
                  id="auth-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Enter your password again"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  aria-invalid={Boolean(errors.confirmPassword)}
                />
              </div>
              {errors.confirmPassword && (
                <p className="auth-error">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {message && <p className="auth-success">{message}</p>}

          <button className="auth-submit-button" type="submit">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setMessage('');
              onModeChange(isSignUp ? 'signin' : 'signup');
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>

        <p className="auth-demo-note">
          Demo mode: account credentials are not verified or saved.
        </p>
      </div>
    </section>
  );
}

export default AuthPage;
