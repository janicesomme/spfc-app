
import React from "react";

// Placeholder for TUS logo as circular badge
export function TUSLogo({ size = 48 }: { size?: number }) {
  return (
    <span
      className="flex items-center justify-center bg-[#222] border-4 border-[#C8102E] rounded-full shadow"
      style={{ width: size, height: size }}
      aria-label="The United Stand Logo"
    >
      {/* SVG logo placeholder – replace with image if available */}
      <svg
        width={size * 0.66}
        height={size * 0.66}
        viewBox="0 0 32 32"
        fill="none"
        className="block"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="16" fill="#C8102E" />
        <text
          x="16"
          y="21"
          textAnchor="middle"
          fontWeight="bold"
          fontSize="14"
          fill="#FFD700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          TUS
        </text>
      </svg>
    </span>
  );
}
