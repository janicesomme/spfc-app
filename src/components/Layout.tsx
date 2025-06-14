
import React from 'react';
import BottomNavBar from "./BottomNavBar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] w-full relative">
      {/* Remove PageTabsNav (top nav) */}
      <main className="flex-1 pb-16 px-0 w-full">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
}
