"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  // email: string;
  phone: string;
  password: string;
  // confirmPassword: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    password: "",
  });
  const router = useRouter();

  if (!isOpen) return null; // don’t render if closed

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (formData.password !== formData.confirmPassword) {
    //   alert("❌ Passwords do not match!");
    //   return;
    // }
    console.log("✅ Submitted:", formData);
    // TODO: send data to backend
    onClose();

    // api call to login
    try {
      const phone = formData.phone;
      const password = formData.password;

      const res = await fetch("http://localhost:5000/api/login/user", {
        // 👈 backend endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // save token in local storage.
        console.log("✅ Login successful!");
        router.push("/apply");
      } else {
        console.log(`❌ ${data.message}`);
      }
    } catch (err) {
      console.log("⚠️ Something went wrong", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <Link href="/">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </Link>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to GPU Certificate App
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Confirm Password
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
