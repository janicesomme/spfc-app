
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Home", path: "/" },
  { label: "News", path: "/news" },
  { label: "Videos", path: "/youtube" },
  { label: "🛒 Shop", path: "/shop" },
];

export function TopNavTabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 left-0 z-50 bg-[#0D0D0D] border-b border-[#171717] w-full">
      <ul className="flex justify-center items-end gap-2 sm:gap-6 px-2 sm:px-6 pt-2 pb-0.5 select-none">
        {tabs.map((tab) => {
          const isActive =
            tab.path === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.path);

          return (
            <li key={tab.path} className="flex-1">
              <button
                onClick={() => navigate(tab.path)}
                className="relative px-2 pb-2 md:px-4 transition focus:outline-none"
                aria-current={isActive ? "page" : undefined}
                tabIndex={0}
                style={{ fontWeight: 700, fontSize: "16px" }}
              >
                <span
                  className={`font-bold ${
                    isActive ? "text-[#EAEAEA]" : "text-[#A0A0A0]"
                  }`}
                  style={{
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] rounded bg-[#C8102E] w-8"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TopNavTabs;
