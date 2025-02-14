import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Mail, Lock, Phone } from 'lucide-react';

const SignUpOrganization = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', 'organization');
    localStorage.setItem('userEmail', formData.email);
    navigate('/organization/dashboard');
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-8">
      <div className="max-w-4xl w-full px-6">
        <div className="text-center mb-8">
          <Building2 className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold">Create Organization Account</h1>
          <p className="mt-2 text-gray-600">
            Start offering scholarships to students worldwide
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Organization Name - Full Width */}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Organization Name</label>
                  <div className="flex items-center gap-4">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Enter organization name"
                      className="input input-bordered flex-1"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      placeholder="organization@example.com"
                      className="input input-bordered flex-1"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number</label>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="input input-bordered flex-1"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Password</label>
                  <div className="flex items-center gap-4">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      placeholder="Create a password"
                      className="input input-bordered flex-1"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                  <div className="flex items-center gap-4">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className="input input-bordered flex-1"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox checkbox-sm" required />
                  <span className="text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Create Account
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an organization account?{' '}
                  <Link to="/signin/organization" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpOrganization; 