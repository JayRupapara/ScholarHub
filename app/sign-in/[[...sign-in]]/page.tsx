'use client';

import { SignIn } from "@clerk/nextjs";
 
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn 
        afterSignInUrl="/dashboard"
        redirectUrl="/dashboard"
        signUpUrl="/sign-up"
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