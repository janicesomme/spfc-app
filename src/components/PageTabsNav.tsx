
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
    <nav className="flex justify-center gap-2 mt-1 mb-8">
      {tabs.map((tab) => {
        const isActive =
          tab.path === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.path);
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={[
              "px-6 py-2 rounded-full font-semibold text-base transition",
              isActive
                ? "bg-red-600 text-white shadow"
                : "bg-red-400/85 text-white hover:bg-red-500",
              "hover:scale-[1.05] active:scale-95",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
            tabIndex={0}
            style={{
              marginRight: "4px",
              letterSpacing: "0.02em",
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
