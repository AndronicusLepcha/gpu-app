"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import isTokenPrsent from "@/utils/isTokenPresent";

//
// 1. Define types
//
type Request = {
  id: string;
  name: string;
  contact: string;
  certificateType: string;
  documentUrls: { key: string; url: string }[];
};

type ApiResponseItem = {
  _id: string;
  name: string;
  contact: string;
  certificateType: string;
  documentUrls: string | { key: string; url: string }[];
};

type ApiResponse = {
  message: string;
  data: ApiResponseItem[];
};

type User = { _id: string };

//
// 2. Component
//
export default function CertificatedataumentsReady() {
  const [requests, setRequests] = useState<Request[]>([]);
  const router = useRouter();

  //
  // 3. API fetch
  //
  const getCertificate = async (): Promise<Request[]> => {
    const token = localStorage.getItem("token");
    const userObjStr = localStorage.getItem("user");

    if (!token || !userObjStr) {
      throw new Error("Missing token or user");
    }

    const userObj: User = JSON.parse(userObjStr);
    const customBody = { userID: userObj._id };

    const output = await fetch("http://localhost:5000/api/getCF", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customBody),
    });

    const response: ApiResponse = await output.json();

    // Normalize API -> Request[]
    return response.data.map((item) => ({
      id: item._id,
      name: item.name,
      contact: item.contact,
      certificateType: item.certificateType,
      documentUrls: Array.isArray(item.documentUrls)
        ? item.documentUrls
        : [{ key: "file", url: item.documentUrls }],
    }));
  };

  //
  // 4. useEffect
  //
  useEffect(() => {
    if (!isTokenPrsent()) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const normalized = await getCertificate();
        setRequests(normalized);
      } catch (err) {
        console.error("error while fetching the CF", err);
      }
    };

    fetchData();
  }, [router]);

  //
  // 5. Render
  //
  return (
    <>
      {requests.length > 0 ? (
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6 text-black">
            Certificates Ready for Download
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((data) => (
              <div
                key={data.id}
                className="bg-white shadow rounded-2xl p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-medium mb-1 text-blue-500">
                    {data.name}
                  </h2>
                  <p className="text-sm text-black">
                    Type: {data.certificateType}
                  </p>
                  <p className="text-xs text-black">ID: {data.id}</p>
                </div>

                {/* Show all document links */}
                <div className="mt-4 flex flex-col gap-2">
                  {data.documentUrls.map((doc) => (
                    <a
                      key={doc.url}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                    >
                      Download
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
          No Certificate!
        </div>
      )}
    </>
  );
}
