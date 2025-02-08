'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!userId) {
      router.push("/sign-in");
    } else {
      setLoading(false);
    }
  }, [isLoaded, userId, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
} 