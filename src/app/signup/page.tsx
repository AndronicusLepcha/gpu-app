"use client";
import { useState } from "react";
import SignupModal from "@/components/signupPage";

export default function SignupPage() {

  const [open, setOpen] = useState(true);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignupModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
