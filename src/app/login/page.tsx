"use client";
import LoginModal from "@/components/loginPage";
export default function LoginPage() {
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Always open for this page */}
      <LoginModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
