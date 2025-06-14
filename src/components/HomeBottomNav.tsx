
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Newspaper, Flame, MessageCircle } from "lucide-react";

const navItems = [
  {
    label: "Transfer News",
    href: "/transfer-reports",
    icon: Newspaper,
  },
  {
    label: "Hot-O-Meter",
    href: "/hot-o-meter",
    icon: Flame,
  },
  {
    label: "Social Posts",
    href: "/news",
    icon: MessageCircle,
  },
];

export function HomeBottomNav() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#0d0d0dcc] border-t border-white/20 flex items-stretch w-full max-w-md mx-auto shadow-lg backdrop-blur-lg">
      {navItems.map((item, idx) => {
        const active = location.pathname === item.href;
        return (
          <React.Fragment key={item.href}>
            <Link
              to={item.href}
              className={`flex-1 flex flex-col items-center py-2 gap-1 text-xs font-semibold rounded-none group transition
                ${active ? "text-[#FFD700]" : "text-white/90 hover:text-[#FFD700]"}
                `}
              aria-current={active ? "page" : undefined}
              tabIndex={0}
            >
              <item.icon className="w-5 h-5 mb-0.5" />
              <span className="text-[13px] leading-none">{item.label}</span>
            </Link>
            {idx !== navItems.length - 1 && (
              <span className="w-[1.5px] my-2 bg-white/25 rounded-full" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
