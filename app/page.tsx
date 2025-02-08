import { LandingPage } from "@/app/components/LandingPage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  
  // No redirect if user is signed in, let LandingPage handle the sign out
  return <LandingPage />;
}