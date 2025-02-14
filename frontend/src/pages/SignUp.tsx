import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-base-100 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-accent text-center mb-2">Create your account</h1>
        <p className="text-center mb-6 text-base-content/70">
          Already have an account? <Link to="/signin" className="text-primary hover:text-accent">Sign in</Link>
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text text-accent">First name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-neutral focus:border-primary"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-accent">Last name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-neutral focus:border-primary"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-accent">Email address</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-neutral focus:border-primary"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-accent">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full bg-neutral focus:border-primary"
              placeholder="Create a password"
            />
          </div>

          <button className="btn btn-primary w-full text-neutral">Create account</button>
        </form>

        <p className="text-xs text-base-content/70 mt-6">
          By clicking "Create account", you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export default SignUp;