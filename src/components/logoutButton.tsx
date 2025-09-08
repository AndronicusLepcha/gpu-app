"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

//   async function handleLogout() {
//     setLoading(true);
//     await fetch("/api/logout", { method: "POST" });
//     router.push("/"); // redirect to login
//   }

function handleLogout(){
    console.log("logout clicked!")
    localStorage.removeItem("token");
    router.push("/")
}

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="p-2 rounded-full hover:bg-gray-200 transition"
      aria-label="Logout"
    >
      <LogOut className="w-5 h-5 text-red-600" />
    </button>
  );
}
