'use client';

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    redirect('/sign-in');
  }

  return <>{children}</>;
} 