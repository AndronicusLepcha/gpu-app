"use client";

import LogoutButton from "./logoutButton";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [user, setUser] = useState<null | { isAdmin: boolean }>(null);

  // Load user only on client
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const parsed = JSON.parse(userStr);

        const normalizedUser = {
          ...parsed,
          isAdmin:
            parsed.isAdmin === true || parsed.isAdmin === "true" ? true : false,
        };

        setUser(normalizedUser);
        console.log("user data", normalizedUser);
      }
    } catch (err) {
      console.error("Failed to parse user:", err);
    }
  }, [pathname]);

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

  // Close menu automatically when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isAdmin = user?.isAdmin ?? false;

  return (
    <nav className="flex justify-between items-center p-4 shadow bg-[#f8f3eb] relative">
      {/* Left side brand */}
      <h1 className="text-xl font-bold text-black">GPU App</h1>

      {/* Desktop Right Section */}
      <div className="hidden sm:flex items-center gap-4">
        {user && pathname !== "/" ? (
          isAdmin ? (
            <>
              <Link href="/admin/viewRequest" className="font-bold text-black">
                View Request
              </Link>
              <Link href="/admin/uploadCF" className="font-bold text-black">
                Upload Certificate
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/apply" className="font-bold text-black">
                Apply
              </Link>
              <Link href="/downloadCF" className="font-bold text-black">
                Certificates
              </Link>
              <LogoutButton />
            </>
          )
        ) : null}
      </div>

      {/* Mobile Hamburger */}
      {user && pathname !== "/" && (
        <>
          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-200"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>

          {/* Mobile Dropdown Menu */}
          {open && (
            <div
              ref={menuRef}
              className="absolute top-14 right-4 z-50 bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 sm:hidden animate-fadeSlide"
            >
              {isAdmin ? (
                <>
                  <Link
                    href="/admin/viewRequest"
                    className="font-bold text-black"
                    onClick={() => setOpen(false)}
                  >
                    View Request
                  </Link>
                  <Link
                    href="/admin/uploadCF"
                    className="font-bold text-black"
                    onClick={() => setOpen(false)}
                  >
                    Upload Certificate
                  </Link>
                  <Link
                    href="/admin"
                    className="font-bold text-black"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link
                    href="/apply"
                    className="font-bold text-black"
                    onClick={() => setOpen(false)}
                  >
                    Apply
                  </Link>
                  <Link
                    href="/downloadCF"
                    className="font-bold text-black"
                    onClick={() => setOpen(false)}
                  >
                    Certificates
                  </Link>
                  <LogoutButton />
                </>
              )}
            </div>
          )}
        </>
      )}
    </nav>
  );
}
