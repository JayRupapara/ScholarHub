import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">ScholarMatch</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Connecting students with opportunities for a brighter future.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white">
                  Search
                </Link>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white">Browse</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sign In</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with new scholarships</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md text-gray-900"
              />
              <button className="bg-indigo-600 px-4 py-2 rounded-r-md hover:bg-indigo-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ScholarMatch. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}