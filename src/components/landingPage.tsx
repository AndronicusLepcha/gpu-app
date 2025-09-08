import Link from "next/link";
import Image from "next/image";
export default function LandingPage() {
  return (
    <div className="flex flex-col gap-4 w-full bg- max-w-xs mx-auto mt-10 bg-[#f8f3eb] ">
      {/* Image Section */}
      <div className="mb-3">
        <Image
          src="/landingPage/app-image.webp" // replace with your image path in /public
          alt="App Logo"
          height={300}
          width={200}
          className="object-contain w-full"
          priority
          
        />
      </div>

      <a
        href="/login"
        className="w-full py-3 text-center rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Login
      </a>
      <a
        href="/signup"
        className="w-full py-3 text-center rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
      >
        Sign Up
      </a>
    </div>
  );
}
