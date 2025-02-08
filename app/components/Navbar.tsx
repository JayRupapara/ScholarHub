'use client';

import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";
import { Search } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">ScholarMatch</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/search" className="text-gray-600 hover:text-gray-900">
              Search
            </Link>
            <Link href="/advanced-search" className="text-gray-600 hover:text-gray-900">
              Advanced Search
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
} 