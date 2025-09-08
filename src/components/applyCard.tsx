"use client";
import Image from "next/image";

interface JobCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onApply?: () => void;
  disabled: boolean;
}

export default function ApplyCard({
  imageUrl,
  title,
  description,
  onApply,
  disabled,
}: JobCardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden w-80">
      {/* Image */}
      <div className="relative w-full h-40 pt-7">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-contain mt-2.5"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        {/* Apply Button */}
        <button
          disabled={disabled}
          onClick={onApply}
          className={`mt-4 w-full py-2 rounded-lg transition 
    ${
      !disabled
        ? "bg-blue-600 hover:bg-blue-700  text-white"
        : "bg-gray-100 cursor-not-allowed  text-black"
    }`}
        >
          {!disabled ? "Apply" : "Coming Soon.."}
        </button>
      </div>
    </div>
  );
}
