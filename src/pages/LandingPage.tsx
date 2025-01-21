import React from 'react';
import { Link } from 'react-router-dom';
import { SearchFilters } from '../components/SearchFilters';
import { ArrowRight, BookOpen, Users, Trophy } from 'lucide-react';

export function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto pt-16 pb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            Find Your Perfect Scholarship Today!
            
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-indigo-100">
            Discover opportunities that match your unique profile and aspirations
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signin"
              className="w-full sm:w-auto bg-white text-indigo-600 px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-indigo-50 flex items-center justify-center"
            >
              Start Your Search
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/signup"
              className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-white/10"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            Why Choose ScholarMatch?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Personalized Matches</h3>
              <p className="text-gray-600">
                Get scholarship recommendations tailored to your academic profile
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">
                Learn from peer reviews and experiences with scholarship applications
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Manage your applications and never miss important deadlines
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 