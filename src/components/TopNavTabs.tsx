
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const level1Tabs = [
  { label: "Home", path: "/" },
  { label: "News", path: "/news" },
  { label: "Videos", path: "/youtube" },
  { label: "Shop", path: "/shop" },
];

const level2Tabs = [
  { label: "Player Ratings", path: "/player-ratings" },
  { label: "Starting XI", path: "/pick-your-xi" },
  { label: "Predictions", path: "/predict" },
  { label: "Leaderboard", path: "/leaderboard" },
];

export function TopNavTabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const renderNavLevel = (tabs: typeof level1Tabs, isLevel2 = false) => (
    <ul className={`flex justify-center items-end gap-1 sm:gap-3 px-2 sm:px-4 ${isLevel2 ? 'pt-1 pb-0.5' : 'pt-2 pb-1'} select-none`}>
      {tabs.map((tab) => {
        const isActive =
          tab.path === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.path);

        return (
          <li key={tab.path} className="flex-1">
            <button
              onClick={() => navigate(tab.path)}
              className="relative px-1 pb-1 md:px-2 transition focus:outline-none w-full"
              aria-current={isActive ? "page" : undefined}
              tabIndex={0}
              style={{ fontWeight: 600, fontSize: isLevel2 ? "14px" : "15px" }}
            >
              <span
                className={`font-semibold ${
                  isActive ? "text-[#EAEAEA]" : "text-[#A0A0A0]"
                } ${isLevel2 ? 'text-sm' : 'text-base'}`}
                style={{
                  letterSpacing: "-0.01em",
                }}
              >
                {tab.label}
              </span>
              {isActive && (
                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-0 ${isLevel2 ? 'h-[2px] w-6' : 'h-[3px] w-8'} rounded bg-[#C8102E]`}
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
      {/* Level 1 Navigation */}
      {renderNavLevel(level1Tabs)}
      
      {/* Level 2 Navigation */}
      <div className="border-t border-[#171717]/50">
        {renderNavLevel(level2Tabs, true)}
      </div>
    </nav>
  );
}

export default TopNavTabs;
