import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const SignUpStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/api/users/signup", formData);
    if (response.data.msg === "User created") {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', 'student');
      localStorage.setItem('userEmail', formData.email);
      navigate("/student/dashboard");
    } else {
      toast.error(response.data.msg);
    }

    navigate('/signin/student');
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-8">
      <ToastContainer />
      <div className="max-w-4xl w-full px-6">
        <div className="text-center mb-8">
          <User className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold">Create Student Account</h1>
          <p className="mt-2 text-gray-600">
            Start your journey to find the perfect scholarship
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <div className="flex items-center gap-4">
                    <User className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="input input-bordered flex-1"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                      placeholder="Enter your email"
                      className="input input-bordered flex-1"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      value={formData.mobileNo}
                      onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                  Already have an account?{' '}
                  <Link to="/signin/student" className="text-primary hover:underline">
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

export default SignUpStudent; 