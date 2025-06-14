
import React from 'react';
import { PageTabsNav } from "./PageTabsNav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Red tab navigation now appears on every page, above the other content */}
      <div className="pt-6 px-6">
        <PageTabsNav />
      </div>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
