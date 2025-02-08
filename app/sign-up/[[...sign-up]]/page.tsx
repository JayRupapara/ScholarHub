'use client';

import { SignUp } from "@clerk/nextjs";
 
export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp 
        afterSignUpUrl="/dashboard"
        redirectUrl="/dashboard"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white shadow-lg"
          }
        }}
      />
    </div>
  );
} 