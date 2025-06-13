
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar";
import { 
  Home, 
  FileText, 
  TrendingUp, 
  Users, 
  Settings,
  Youtube,
  Target
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Transfer Reports",
    url: "/transfer-reports",
    icon: FileText,
  },
  {
    title: "Transfer Targets",
    url: "/transfer-targets",
    icon: Target,
  },
  {
    title: "News Intelligence",
    url: "/news",
    icon: TrendingUp,
  },
  {
    title: "YouTube Content",
    url: "/youtube",
    icon: Youtube,
  },
  {
    title: "Player Database",
    url: "/players",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar className="border-r border-red-200 bg-white">
      <SidebarHeader className="p-6 border-b border-red-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">MG</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Mark Goldbridge</h2>
            <p className="text-sm text-gray-500">Transfer Intelligence</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-red-600 font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`hover:bg-red-50 hover:text-red-600 ${
                      location.pathname === item.url ? 'bg-red-100 text-red-600 border-r-2 border-red-600' : ''
                    }`}
                  >
                    <button onClick={() => navigate(item.url)} className="w-full flex items-center">
                      <item.icon className="mr-3" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
