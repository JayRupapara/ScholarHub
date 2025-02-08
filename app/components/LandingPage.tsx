'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useClerk, useUser } from '@clerk/nextjs';
import { ArrowRight, BookOpen, Users, Trophy } from 'lucide-react';

export function LandingPage() {
  const { openSignIn, openSignUp, signOut } = useClerk();
  const { isSignedIn } = useUser();

  // Sign out any existing session when landing page loads
  useEffect(() => {
    const clearExistingSession = async () => {
      if (isSignedIn) {
        await signOut();
      }
    };
    clearExistingSession();
  }, [isSignedIn, signOut]);

  const handleSignIn = async () => {
    // Ensure user is signed out before opening sign in
    if (isSignedIn) {
      await signOut();
    }
    openSignIn({
      redirectUrl: '/dashboard',
      afterSignInUrl: '/dashboard',
    });
  };

  const handleSignUp = async () => {
    // Ensure user is signed out before opening sign up
    if (isSignedIn) {
      await signOut();
    }
    openSignUp({
      redirectUrl: '/dashboard',
      afterSignUpUrl: '/dashboard',
    });
  };

  return (
    <div>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600 flex items-center">
                <BookOpen className="h-6 w-6 mr-2" />
                ScholarMatch
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSignUp}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Up
              </button>
              <button
                onClick={handleSignIn}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

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
            <button
              onClick={handleSignIn}
              className="w-full sm:w-auto bg-white text-indigo-600 px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-indigo-50 flex items-center justify-center"
            >
              Start Your Search
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={handleSignUp}
              className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-white/10"
            >
              Create Account
            </button>
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ScholarMatch</h3>
            <p className="text-gray-400">
              Connecting students with opportunities for a brighter future.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/search" className="hover:text-white">Search</Link></li>
              <li><Link href="/browse" className="hover:text-white">Browse</Link></li>
              <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Stay updated with new scholarships</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full"
              />
              <button className="bg-indigo-600 px-4 py-2 rounded-r-md hover:bg-indigo-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} ScholarMatch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 