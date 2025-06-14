
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Newspaper, Repeat, Video } from "lucide-react";

const tabs = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "News",
    path: "/news",
    icon: Newspaper,
  },
  {
    label: "Transfers",
    path: "/transfer-reports",
    icon: Repeat,
  },
  {
    label: "TUS Videos",
    path: "/youtube",
    icon: Video,
  },
];

export function BottomNavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#171717] z-40 border-t border-[#151515]">
      <ul className="max-w-md mx-auto flex justify-between items-center px-3 py-1.5">
        {tabs.map((tab) => {
          const isActive = tab.path === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.path);

          const Icon = tab.icon;
          return (
            <li key={tab.path} className="flex-1">
              <button
                onClick={() => navigate(tab.path)}
                className={`w-full flex flex-col items-center justify-center py-1 px-1.5 outline-none select-none rounded-lg transition font-semibold
                  ${isActive
                    ? "text-white"
                    : "text-[#888]"} 
                `}
                aria-current={isActive ? "page" : undefined}
                tabIndex={0}
                style={{
                  background: isActive ? "#C8102E" : "transparent",
                  borderRadius: "9px",
                  fontSize: "13px",
                  gap: "3px",
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={2.3}
                  className={isActive ? "text-white" : "text-[#888]"}
                  style={{
                    marginBottom: 2,
                  }}
                />
                <span
                  className={`block mt-0.5 text-xs tracking-tight font-semibold ${
                    isActive ? "text-white" : "text-[#888]"
                  }`}
                  style={{
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tab.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {/* Spacer for iOS safe area */}
      <div className="h-[6px]" />
    </nav>
  );
}

export default BottomNavBar;
