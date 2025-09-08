"use client";
import { useState } from "react";
import SignupModal from "@/components/signupPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import isTokenPrsent from "@/utils/isTokenPresent";

export default function SignupPage() {
  // const router = useRouter();
  // useEffect(() => {
  //   if (isTokenPrsent()) {
  //     router.push("/apply");
  //   } else {
  //     router.push("/");
  //   }
  // }, [router]);

  const [open, setOpen] = useState(true);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignupModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
