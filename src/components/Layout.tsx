
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { PageTabsNav } from "./PageTabsNav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-6">
            {/* Red tab navigation now appears on every page, above the other content */}
            <PageTabsNav />
            {/* Remove the "Live Dashboard" label and indicator */}
            <div className="flex items-center mb-6">
              <SidebarTrigger className="mr-4 lg:hidden" />
              {/* Removed status indicator and label */}
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

