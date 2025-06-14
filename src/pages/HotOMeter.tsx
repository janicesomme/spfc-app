
import React from "react";
import { HotOMeterList } from "@/components/HotOMeterList";

export default function HotOMeter() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        // Gradient background behind everything except the header
        background: "linear-gradient(180deg, #C8102E 0%, #FFD700 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header: solid black bar */}
      <header
        className="sticky top-0 z-10 w-full flex flex-col items-center"
        style={{
          background: "#111",
          minHeight: 0,
          paddingTop: "1.1rem",
          paddingBottom: "0.5rem",
          paddingLeft: "8px",
          paddingRight: "8px",
          boxShadow: "0 2px 8px #4e09051d",
          // No more than 25% of screen height
          maxHeight: "22vh",
        }}
      >
        <div className="flex items-center gap-2 mb-1 select-none">
          <span className="text-[2rem] md:text-4xl">🔥</span>
          <span
            className="font-black uppercase"
            style={{
              color: "#FFD700",
              fontSize: "2rem",
              letterSpacing: 1.1,
              textShadow: "0 2px 8px #914422",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            HOT-O-METER
          </span>
        </div>
        <span
          className="uppercase tracking-widest"
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "10.5px",
            letterSpacing: "0.17em",
            marginTop: "-1px",
            opacity: 0.83,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          MAN UNITED TRANSFERS
        </span>
      </header>
      <main className="w-full px-2 mx-auto max-w-md">
        <HotOMeterList />
      </main>
    </div>
  );
}
