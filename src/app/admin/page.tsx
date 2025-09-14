"use client";
import { useRouter } from "next/navigation";
import { FileUp, List } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Upload CF */}
        <button
          onClick={() => router.push("/admin/uploadCF")}
          className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
        >
          <FileUp className="w-12 h-12 text-blue-600 mb-4" />
          <span className="text-lg font-semibold text-gray-800">
            Upload Certificate (CF)
          </span>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Upload and manage issued certificates.
          </p>
        </button>

        {/* View Requests */}
        <button
          onClick={() => router.push("/admin/viewRequest")}
          className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
        >
          <List className="w-12 h-12 text-green-600 mb-4" />
          <span className="text-lg font-semibold text-gray-800">
            View Requests
          </span>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Review and process certificate applications.
          </p>
        </button>
      </div>
    </div>
  );
}
