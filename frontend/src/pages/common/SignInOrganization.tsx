import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignInOrganization = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/api/organization/login", formData,{withCredentials: true});
    if (response.data.message === "Login successful") {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', 'organization');
      localStorage.setItem('userEmail', formData.email);
      navigate("/organization/dashboard");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-8">
      <div className="max-w-md w-full px-6">
        <div className="text-center mb-8">
          <Building2 className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold">Sign in to your Organization Account</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    placeholder="Enter your password"
                    className="input input-bordered flex-1"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Sign in
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an organization account?{' '}
                  <Link to="/signup/organization" className="text-primary hover:underline">
                    Sign up
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

export default SignInOrganization; 