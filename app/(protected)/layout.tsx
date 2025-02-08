'use client';

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { ChatBot } from "@/app/components/ChatBot";
import { SessionCleanup } from "@/app/components/SessionCleanup";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      <SessionCleanup />
      <Navbar />
      <main className="min-h-screen pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <ChatBot />
      <Footer />
    </>
  );
} 