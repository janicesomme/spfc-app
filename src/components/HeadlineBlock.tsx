
import React from "react";
import { Separator } from "@/components/ui/separator";

export function HeadlineBlock() {
  return (
    <div className="flex flex-col gap-1 pt-4 pb-3 px-3">
      <span
        className="font-black"
        style={{
          color: "#fff",
          fontSize: "2.1rem",
          fontFamily: "Inter, system-ui, sans-serif",
          letterSpacing: "0.06em",
          lineHeight: 1.13,
        }}
      >
        The United Stand
      </span>
      <span
        className="italic text-[1.04rem] font-light"
        style={{ color: "#e4e4e4", letterSpacing: "0", opacity: 0.93 }}
      >
        Your latest news and transfer news, exactly how you want it.
      </span>
      <Separator className="bg-white/80 mt-3 rounded-full" />
    </div>
  );
}
