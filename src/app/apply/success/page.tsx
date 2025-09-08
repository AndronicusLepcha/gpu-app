"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center py-30">
      <div className="shadow-md rounded-xl p-8 m-4 text-center bg-green-100 max-w-md w-full">
        {/* Tick Icon */}
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Successfully Applied!
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your employment certificate application has been submitted
          successfully.
        </p>

        {/* Button to go back */}
        <Link
          href="/apply"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
