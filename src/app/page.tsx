"use client";
import LandingPage from "@/components/landingPage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import isTokenPrsent from "@/utils/isTokenPresent";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (isTokenPrsent()) {
      router.push("/apply");
    } else {
      router.push("/");
    }
  }, [router]);
  return <LandingPage />;
}
