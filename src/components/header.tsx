"use client"
import LogoutButton from "./logoutButton";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // close menu bar
   // 👇 Close menu automatically when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="flex justify-between items-center p-4 shadow bg-[#f8f3eb] relative">
      {/* Left side brand */}
      <h1 className="text-xl font-bold text-black">GPU App</h1>

      {/* Desktop Right Section */}
      <div className="hidden sm:flex items-center gap-4">
        {/* <h1 className="text-xl font-bold text-black">Certificates</h1> */}
        <Link href="/apply"><button className="font-bold text-black">Apply</button></Link>
         <Link href="/downloadCF"><button className="font-bold text-black">Certificates</button></Link>
        <LogoutButton />
      </div>

      {/* Mobile Hamburger */}
      <button
        className="sm:hidden p-2 rounded-md hover:bg-gray-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
      </button>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div
          ref={menuRef}
          className="absolute top-14 right-4 bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 sm:hidden animate-fadeSlide"
        >
          {/* <LogoutButton /> */}
          {/* <h1 className="text-lg font-bold text-black">Certificates</h1> */}
          <Link href="/apply"><button className="font-bold text-black">Apply</button></Link>
         <Link href="/downloadCF"><button className="font-bold text-black">Certificates</button></Link>
        <LogoutButton />

        </div>
      )}
    </nav>
  );
}
