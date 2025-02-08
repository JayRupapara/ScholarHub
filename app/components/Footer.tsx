'use client';

import Link from 'next/link';

export function Footer() {
  return (
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
  );
} 