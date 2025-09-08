"use client";
import ApplyCard from "@/components/applyCard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import isTokenPrsent from "@/utils/isTokenPresent";

export default function ApplyDashBoard() {
  const router = useRouter();
  useEffect(() => {
    if (isTokenPrsent()) {
      router.push("/apply");
    } else {
      router.push("/");
    }
  }, [router]);
  return (
    <div className="min-h-scree  p-6 pb-30">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Available Certificates
      </h1>
      <div className="flex flex-col flex-wrap gap-10 w-full justify-around md:flex-row items-center">
        <ApplyCard
          imageUrl="/certificate-img/ecf.webp"
          title="Employment Certificate"
          description="Join our team as a React + Next.js frontend developer and build amazing UI."
          onApply={() => router.push('/apply/employementCF')}
          disabled={false}
        />
        <ApplyCard
          imageUrl="/certificate-img/ecf.webp"
          title="DOB Certificate"
          description="Work with Node.js, Express, and databases to build scalable APIs."
          onApply={() => alert("✅ Applied successfully!")}
          disabled={true}
        />
        <ApplyCard
          imageUrl="/certificate-img/ecf.webp"
          title="Sanitation Certificate"
          description="Design user-friendly interfaces and deliver great experiences."
          onApply={() => alert("✅ Applied successfully!")}
          disabled={true}
        />
      </div>
    </div>
  );
}
