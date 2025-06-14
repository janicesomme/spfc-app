
import React from "react";

// Use the provided logo, rounded, with shadow and alt for accessibility
export function OfficialTUSLogo({
  size = 54,
}: {
  size?: number;
}) {
  return (
    <span
      className="flex items-center justify-center rounded-full bg-[#fff] border-4 border-[#C8102E] shadow-md"
      style={{
        width: size,
        height: size,
        overflow: "hidden",
        background: "#fff"
      }}
      aria-label="The United Stand Official Logo"
    >
      <img
        src="/lovable-uploads/ba4e6e13-b343-4b1c-8127-3789cb3d6d69.png"
        alt="The United Stand Official Logo"
        className="object-cover rounded-full"
        width={size}
        height={size}
        draggable={false}
        style={{ width: "100%", height: "100%" }}
      />
    </span>
  );
}
