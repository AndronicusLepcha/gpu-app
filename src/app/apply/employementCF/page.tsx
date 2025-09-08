"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { resolve } from "path";
import { rejects } from "assert";

export default function DocumentUploadPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [fileNames, setFileNames] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const [isloading,setIsLoading] = useState(false)

  const router = useRouter();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (!e.target.files) return;

    const selected = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    // validation
    if (!allowedTypes.includes(selected.type)) {
      alert("Only JPG, PNG or PDF files are allowed");
      return;
    }

    setFiles((prev) => ({ ...prev, [key]: selected }));
    setFileNames((prev) => ({ ...prev, [key]: selected.name }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true)
    console.log("handle submit clicked");
    e.preventDefault();

    if (!files["aadhar"] || !files["dob"]) {
      setMessage("Please upload both Aadhar and DOB documents");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("contact", contact);
    formData.append("aadhar", files["aadhar"] as File);
    formData.append("dobProof", files["dob"] as File);

    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    try {
      const token = localStorage.getItem("token");
      console.log("token is ", token);

      const output = await fetch("http://localhost:5000/api/saveFormData", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await output.json();
      const test = await new Promise((resolve,rejects)=>{
        setTimeout(()=>{
          resolve("")
        },5000)
      })

      if (output.ok) {
        setIsLoading(false)
        setMessage("✅ Documents uploaded successfully!");
        router.push("success");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setIsLoading(false)
      console.error(err);
      setMessage("⚠️ Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
       {isloading && <Loading  isOpen={isloading}/> }
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-md font-bold text-red-800 mb-2">
          Please fill the below form to apply for the Employment Certificate
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="tel"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        {/* File Upload Section */}
        <div className="w-full space-y-4">
          {/* Aadhar Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              *Aadhar Card
            </label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Upload className="w-5 h-5 text-blue-600" />
              <input
                type="file"
                accept="image/*,application/pdf"
                id="aadharInput"
                name="aadharInput"
                onChange={(e) => handleFileChange(e, "aadhar")}
                required
              />
              {/* <label
                htmlFor="aadharInput"
                className="cursor-pointer text-blue-600 hover:underline text-sm"
              >
                Choose File
              </label> */}
              <span className="text-gray-600 text-sm truncate">
                {fileNames["aadhar"] || "No file chosen"}
              </span>
            </div>
          </div>

          {/* DOB Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              *DOB Proof
            </label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Upload className="w-5 h-5 text-green-600" />
              <input
                type="file"
                accept="image/*,application/pdf"
                id="dobInput"
                name="dobInput"
                onChange={(e) => handleFileChange(e, "dob")}
                required
              />
              {/* <label
                htmlFor="dobInput"
                className="cursor-pointer text-green-600 hover:underline text-sm"
              >
                Choose File
              </label> */}
              <span className="text-gray-600 text-sm truncate">
                {fileNames["dob"] || "No file chosen"}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          // onClick={() => {
          //   router.push("/apply/success");
          // }}
          onSubmit={handleSubmit}
        >
          Next
        </button>

        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}
