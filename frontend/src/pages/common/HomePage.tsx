import { Link } from 'react-router-dom';
import { Calendar, Users, Award } from 'lucide-react';

const SCHOLARSHIP_IMAGES = {
  stem: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80", // Lab/science image
  global: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80", // Business meeting
  arts: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80", // Art supplies
};

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero min-h-[600px]" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="hero-overlay bg-accent bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-3xl">
            <h1 className="mb-5 text-5xl font-bold text-white">Your Future Starts Here</h1>
            <p className="mb-8 text-lg text-white/90">
              Access thousands of scholarships worth over $500M. Join 50,000+ students who found
              their perfect scholarship match.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                to="/signin" 
                className="btn bg-primary text-neutral hover:bg-accent w-36"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="btn bg-neutral text-primary hover:bg-secondary w-36"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Scholarships */}
      <div className="py-16 bg-neutral">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Opportunities</h2>
          <p className="text-center mb-12 text-base-content/70">
            Discover top scholarships matching your profile
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* STEM Scholarship */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-secondary/20">
              <figure>
                <img
                  src={SCHOLARSHIP_IMAGES.stem}
                  alt="STEM"
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">
                  STEM Excellence Scholarship
                  <div className="badge bg-primary text-neutral">$10,000</div>
                </h3>
                <p className="text-sm">Engineering</p>
                <p className="text-sm text-gray-500">Due 5/15/2024</p>
                <div className="card-actions justify-start mt-4">
                  <Link to="/scholarships/stem" className="text-primary hover:text-accent">Learn More →</Link>
                </div>
              </div>
            </div>

            {/* Global Leaders */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-secondary/20">
              <figure>
                <img
                  src={SCHOLARSHIP_IMAGES.global}
                  alt="Global Leaders"
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">
                  Global Leaders Fund
                  <div className="badge bg-primary text-neutral">$15,000</div>
                </h3>
                <p className="text-sm">Business</p>
                <p className="text-sm text-gray-500">Due 6/1/2024</p>
                <div className="card-actions justify-start mt-4">
                  <Link to="/scholarships/global-leaders" className="text-primary hover:text-accent">Learn More →</Link>
                    </div>
                    </div>
                  </div>

            {/* Arts Grant */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-secondary/20">
              <figure>
                <img
                  src={SCHOLARSHIP_IMAGES.arts}
                  alt="Creative Arts"
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">
                  Creative Arts Grant
                  <div className="badge bg-primary text-neutral">$7,500</div>
                </h3>
                <p className="text-sm">Arts</p>
                <p className="text-sm text-gray-500">Due 5/30/2024</p>
                <div className="card-actions justify-start mt-4">
                  <Link to="/scholarships/arts" className="text-primary hover:text-accent">Learn More →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose ScholarHub?</h2>
          <p className="text-center mb-12 text-base-content/70">
            We make finding and applying for scholarships easier than ever
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100">
              <div className="card-body items-center text-center">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Personalized Matches</h3>
                <p>Our smart algorithm finds scholarships that perfectly match your profile and interests.</p>
            </div>
          </div>

            <div className="card bg-base-100">
              <div className="card-body items-center text-center">
                <Calendar className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Track Applications</h3>
                <p>Keep track of all your applications, deadlines, and requirements in one place.</p>
              </div>
            </div>

            <div className="card bg-base-100">
              <div className="card-body items-center text-center">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Success Rate</h3>
                <p>Students using ScholarHub are 3x more likely to receive scholarship funding.</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-neutral">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already found their perfect scholarship match.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/signin/student" 
              className="btn btn-lg bg-white text-primary hover:bg-white/90 w-40"
            >
              Sign In Now
            </Link>
            <Link 
              to="/signup/student" 
              className="btn btn-lg bg-neutral text-primary hover:bg-neutral/90 w-40"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;