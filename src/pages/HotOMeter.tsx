
import React from "react";
import { HotOMeterList } from "@/components/HotOMeterList";

export default function HotOMeter() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black px-4 py-5 md:py-7 shadow-lg flex flex-col items-start rounded-b-3xl">
        <div className="flex items-center space-x-3">
          <span className="text-yellow-400 text-2xl md:text-3xl">🔥</span>
          <span className="text-yellow-400 font-extrabold text-xl md:text-2xl tracking-wide">HOT-O-METER</span>
        </div>
        <span className="text-white mt-1 text-sm md:text-base font-medium opacity-90 ml-[35px]">Man United Transfers</span>
      </header>

      <main className="max-w-md mx-auto w-full px-2 py-0">
        <HotOMeterList />
      </main>
    </div>
  );
}
