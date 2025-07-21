
import React from 'react';
import TopNavTabs from "./TopNavTabs";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <TopNavTabs />
      <main className="flex-1 pb-0 px-0 w-full">
        {children}
      </main>
      {/* Removed BottomNavBar, replaced by TopNavTabs */}
    </div>
  );
}
