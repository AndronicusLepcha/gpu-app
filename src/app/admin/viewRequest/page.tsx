"use client";
import { useState, useEffect } from "react";
import { Download } from "lucide-react";

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
    fetch("http://localhost:5000/api/getApplicantData")
      .then((res) => res.json())
      .then((res) => setRequests(res.data));
  }, []);

  console.log("data from the api", requests);

  return (
    <>
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
                {requests.map((req,idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-gray-700">{req.name}</td>
                    <td className="p-3 text-gray-700">{req.contact}</td>
                    <td className="p-3 text-gray-700">{req.certificateType}</td>
                    <td className="p-3 text-gray-700">
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
