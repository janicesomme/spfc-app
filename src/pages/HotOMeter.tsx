
import React from "react";
import { HotOMeterList } from "@/components/HotOMeterList";

export default function HotOMeter() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(180deg, #C8102E 0%, #FFD700 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 w-full flex flex-col items-center py-7 px-4 md:py-10" style={{background: "transparent"}}>
        <div className="flex items-center gap-2">
          <span className="text-[2.2rem] md:text-4xl select-none">🔥</span>
          <span
            className="font-black uppercase"
            style={{
              color: "#FFD700",
              fontSize: "2.1rem",
              letterSpacing: 1.5,
              textShadow: "0 2px 8px #914422",
            }}
          >
            HOT-O-METER
          </span>
        </div>
        <span className="uppercase font-semibold mt-1 text-sm tracking-widest text-white/95 drop-shadow" style={{letterSpacing: "0.15em"}}>
          man united transfers
        </span>
      </header>

      <main className="w-full px-2 mx-auto max-w-md">
        <HotOMeterList />
      </main>
    </div>
  );
}
