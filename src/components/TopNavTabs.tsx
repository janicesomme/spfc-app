
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type Tab = {
  label: string;
  path?: string;
  submenu?: Array<{ label: string; path: string }>;
};

const allTabs: Tab[] = [
  { label: "Home", path: "/" },
  { label: "News", path: "/news" },
  { label: "Videos", path: "/youtube" },
  {
    label: "Play",
    submenu: [
      { label: "Starting XI", path: "/pick-your-xi" },
      { label: "Match Predictions", path: "/predict" },
      { label: "Player Ratings", path: "/player-ratings" },
      { label: "Final Player Ratings", path: "/final-player-ratings" },
      { label: "Leaderboard", path: "/leaderboard" },
    ],
  },
];

export function TopNavTabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isPathActive = (tab: Tab): boolean => {
    if (tab.path) {
      return tab.path === "/" ? pathname === "/" : pathname.startsWith(tab.path);
    }
    // For dropdown, check if any submenu item is active
    if (tab.submenu) {
      return tab.submenu.some((item) => pathname.startsWith(item.path));
    }
    return false;
  };

  const renderNavLevel = (tabs: Tab[]) => (
    <ul className="flex justify-center items-end gap-1 sm:gap-3 px-2 sm:px-4 pt-2 pb-1 select-none">
      {tabs.map((tab) => {
        const isActive = isPathActive(tab);

        // Dropdown menu
        if (tab.submenu) {
          return (
            <li key={tab.label} className="flex-1">
              <DropdownMenu
                open={openDropdown === tab.label}
                onOpenChange={(open) =>
                  setOpenDropdown(open ? tab.label : null)
                }
              >
                <DropdownMenuTrigger asChild>
                  <button
                    className="relative px-1 pb-1 md:px-2 transition focus:outline-none w-full flex items-center justify-center gap-1"
                    style={{ fontWeight: 600, fontSize: "15px" }}
                  >
                    <span
                      className={`font-semibold ${
                        isActive ? "text-[#EAEAEA]" : "text-[#A0A0A0]"
                      } text-base`}
                      style={{
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {tab.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isActive ? "text-[#EAEAEA]" : "text-[#A0A0A0]"
                      } ${openDropdown === tab.label ? "rotate-180" : ""}`}
                    />
                    {isActive && (
                      <span
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-8 rounded bg-[#C8102E]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="bg-[#1A1A1A] border-[#333] min-w-48"
                >
                  {tab.submenu.map((item) => {
                    const isItemActive = pathname.startsWith(item.path);
                    return (
                      <DropdownMenuItem
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setOpenDropdown(null);
                        }}
                        className={`cursor-pointer ${
                          isItemActive
                            ? "bg-[#C8102E] text-[#EAEAEA]"
                            : "text-[#A0A0A0] hover:text-[#EAEAEA] hover:bg-[#252525]"
                        }`}
                      >
                        {item.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          );
        }

        // Simple tab
        return (
          <li key={tab.path} className="flex-1">
            <button
              onClick={() => navigate(tab.path!)}
              className="relative px-1 pb-1 md:px-2 transition focus:outline-none w-full"
              aria-current={isActive ? "page" : undefined}
              tabIndex={0}
              style={{ fontWeight: 600, fontSize: "15px" }}
            >
              <span
                className={`font-semibold ${
                  isActive ? "text-[#EAEAEA]" : "text-[#A0A0A0]"
                } text-base`}
                style={{
                  letterSpacing: "-0.01em",
                }}
              >
                {tab.label}
              </span>
              {isActive && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-8 rounded bg-[#C8102E]"
                  aria-hidden="true"
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="sticky top-0 left-0 z-50 bg-[#0D0D0D] border-b border-[#171717] w-full">
      {renderNavLevel(allTabs)}
    </nav>
  );
}

export default TopNavTabs;
