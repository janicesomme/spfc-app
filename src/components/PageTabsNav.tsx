
import React from "react";
import { useLocation, Link } from "react-router-dom";

const tabs = [
  { label: "Home", path: "/" },
  { label: "News", path: "/news" },
  { label: "Transfers", path: "/transfer-reports" },
  { label: "TUS Videos", path: "/youtube" },
];

export function PageTabsNav() {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-center gap-2 mt-1 mb-1"> {/* Decreased mb-1 for less bottom spacing */}
      {tabs.map((tab) => {
        const isActive =
          tab.path === "/" ? pathname === "/" : pathname.startsWith(tab.path);
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={[
              "px-5 py-1.5 rounded-[12px] font-semibold text-base transition select-none",
              isActive
                ? "bg-[#C8102E] text-white shadow"
                : "bg-[#F0F0F0] text-[#333333] hover:bg-[#E0E0E0]",
              "hover:scale-[1.04] active:scale-95",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
            tabIndex={0}
            style={{
              marginRight: "4px",
              letterSpacing: "0.01em",
              minWidth: 0,
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
