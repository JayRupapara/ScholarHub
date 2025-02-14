import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // For testing: accept any email/password combination
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', formData.email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-base-100 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-accent text-center mb-2">Sign in to your account</h1>
        <p className="text-center mb-6 text-base-content/70">
          Or <Link to="/signup" className="text-primary hover:text-accent">create a new account</Link>
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text text-accent">Email address</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input input-bordered w-full bg-neutral focus:border-primary"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-accent">Password</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="input input-bordered w-full bg-neutral focus:border-primary"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="label cursor-pointer">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <span className="label-text ml-2 text-accent">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-primary hover:text-accent text-sm">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-neutral"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-base-content/70 mt-6">
          For testing: Enter any email and password
        </p>
      </div>
    </div>
  );
}