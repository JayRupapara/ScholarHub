import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, Users, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="hero min-h-screen" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3)',
    }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <div className="mb-5 flex justify-center">
            <Sparkles className="h-16 w-16 text-primary" />
          </div>
          <h1 className="mb-5 text-5xl font-bold">Find Your Perfect Scholarship</h1>
          <p className="mb-5">Access thousands of scholarships worth over $500M. Join 50,000+ students who found their perfect match.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/search" className="btn btn-primary">Get Started</Link>
            <Link to="/how-it-works" className="btn btn-ghost">Learn More</Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-0 w-full bg-base-100 bg-opacity-90">
        <div className="container mx-auto py-8">
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-figure text-primary">
                <Award className="h-8 w-8" />
              </div>
              <div className="stat-title">Total Scholarships</div>
              <div className="stat-value text-primary">25.6K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Users className="h-8 w-8" />
              </div>
              <div className="stat-title">Active Students</div>
              <div className="stat-value text-secondary">50K+</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-accent">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="stat-title">Success Rate</div>
              <div className="stat-value text-accent">86%</div>
              <div className="stat-desc">↗︎ Increased by 14%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 