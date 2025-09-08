"use client";
import LoginModal from "@/components/loginPage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import isTokenPrsent from "@/utils/isTokenPresent";

export default function LoginPage() {
  const router = useRouter();
  // useEffect(() => {
  //   if (isTokenPrsent()) {
  //     router.push("/apply");
  //   } else {
  //     router.push("/");
  //   }
  // }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Always open for this page */}
      <LoginModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
// 6294910181
// andro
