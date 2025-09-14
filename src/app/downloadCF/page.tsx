"use client"
import React from "react";
import { useEffect } from "react";
import isTokenPrsent from "@/utils/isTokenPresent";
import { useRouter } from "next/navigation";

type Doc = {
  id: string;
  title: string;
  certificateType: string;
  downloadUrl: string;
};

// Dummy data
const docs: Doc[] = [
  {
    id: "d-001",
    title: "Unmarried Certificate - John Doe",
    certificateType: "Unmarried",
    downloadUrl: "#",
  },
  {
    id: "d-002",
    title: "Income Certificate - Jane Smith",
    certificateType: "Income",
    downloadUrl: "#",
  },
  {
    id: "d-003",
    title: "Employment Certificate - Raj Kumar",
    certificateType: "Employment",
    downloadUrl: "#",
  },
];

export default function CertificateDocumentsReady() {
   const router = useRouter();
  useEffect(() => {
      if (isTokenPrsent()) {
        router.push("/downloadCF");
      } else {
        router.push("/");
      }
    }, [router]);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-black">Certificates Ready for Download</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((doc) => (
          <div key={doc.id} className="bg-white shadow rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-medium mb-1 text-blue-500">{doc.title}</h2>
              <p className="text-sm text-black">Type: {doc.certificateType}</p>
              <p className="text-xs text-black">ID: {doc.id}</p>
            </div>
            <a
              href={doc.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
