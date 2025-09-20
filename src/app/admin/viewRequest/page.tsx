"use client";
import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import LoadingModal from "@/components/loading";

// Dummy data for now – replace with API call later
const dummyRequests = [
  {
    id: "1",
    name: "Edup",
    contact: "6294910181",
    certificateType: "Income Certificate",
    documentUrls: [
      {
        key: "documents/sample1.pdf",
        url: "https://gpu-data-prod.s3.ap-south-1.amazonaws.com/documents/sample1.pdf",
      },
    ],
  },
  {
    id: "2",
    name: "John Doe",
    contact: "9876543210",
    certificateType: "Unmarried Certificate",
    documentUrls: [
      {
        key: "documents/sample2.pdf",
        url: "https://gpu-data-prod.s3.ap-south-1.amazonaws.com/documents/sample2.pdf",
      },
    ],
  },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState(dummyRequests);

  //   Later you can fetch from your API
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getApplicantData`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setRequests(res.data));
  }, []);

  const [loading, setLoading] = useState(false);

  return (
    <>
     {loading && <LoadingModal isOpen={loading} isDownloading={loading} />}
      {requests && requests.length > 0 ? (
        <div className="min-h-screen bg-gray-50 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Certificate Requests
          </h1>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-600">
                    Contact
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-gray-700">{req.name}</td>
                    <td className="p-3 text-gray-700">{req.contact}</td>
                    <td className="p-3 text-gray-700">{req.certificateType}</td>
                    {/* <td className="p-3 text-gray-700">
                      {req.documentUrls.map((doc, idx) => (
                        <a
                          key={idx}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 mr-3"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      ))}
                    </td> */}
                    <td className="p-3 text-gray-700">
                      {req.documentUrls.length > 0 && (
                        <button
                          onClick={async () => {
                            setLoading(true);

                            const zip = new JSZip();

                            for (let i = 0; i < req.documentUrls.length; i++) {
                              const doc = req.documentUrls[i];

                              // ✅ Use proxy instead of direct S3 link
                              const proxyUrl = `${process.env.NEXT_PUBLIC_API_URL}/proxy?url=${encodeURIComponent(
                                doc.url
                              )}`;
                              const response = await fetch(proxyUrl);
                              const blob = await response.blob();

                              const fileName = doc.key || `file-${i + 1}.pdf`;
                              zip.file(fileName, blob);
                            }

                            const content = await zip.generateAsync({
                              type: "blob",
                            });
                            saveAs(content, `${req.name || "documents"}.zip`);

                            setLoading(false);
                          }}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          {/* {loading ? (
                            <span className="text-sm text-gray-500">
                              Preparing...
                            </span>
                          ) : ( */}
                            {/* <> */}
                              <Download className="w-5 h-5" />
                              <span className="ml-1">Download All</span>
                            {/* </> */}
                          {/* )} */}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
          No application. Enjoy your day! 🙂
        </div>
      )}
    </>
  );
}
