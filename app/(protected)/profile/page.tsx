'use client';

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-2xl font-semibold text-indigo-600">
              {user?.firstName?.[0]}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.fullName}</h1>
            <p className="text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile sections will go here */}
          <div className="border-t pt-6">
            <Link
              href="/profile/settings"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Edit Profile Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 