"use client";

import FadeIn from "@/components/FadeIn";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface BentoItem {
  value: ReactNode;
  label: string;
  accent?: "olive" | "red" | "amber";
  size?: "lg" | "md" | "sm";
  icon?: LucideIcon;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

const accentColors = {
  olive: { border: "border-olive", text: "text-olive", icon: "text-olive" },
  red: { border: "border-red", text: "text-red", icon: "text-red" },
  amber: { border: "border-amber", text: "text-amber", icon: "text-amber" },
};

export default function BentoGrid({ items, className = "" }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 ${className}`}
    >
      {items.map((item, i) => {
        const colors = accentColors[item.accent || "olive"];
        const isLarge = item.size === "lg";

        return (
          <FadeIn
            key={i}
            delay={i * 0.08}
            className={
              isLarge
                ? "col-span-2 row-span-1 lg:row-span-2"
                : ""
            }
          >
            <div
              className={`p-6 ${
                isLarge ? "lg:p-8" : ""
              } bg-white rounded-xl border-t-4 ${colors.border} h-full flex flex-col justify-center card-hover`}
            >
              {item.icon && (
                <item.icon
                  className={`w-5 h-5 mb-3 ${colors.icon}`}
                  strokeWidth={1.5}
                />
              )}
              <p
                className={`font-serif leading-none ${colors.text} ${
                  isLarge
                    ? "text-[40px] md:text-[48px] lg:text-[56px]"
                    : "text-[28px] md:text-[36px]"
                }`}
              >
                {item.value}
              </p>
              <p
                className={`text-text-secondary leading-snug ${
                  isLarge ? "mt-3 text-base" : "mt-2 text-sm"
                }`}
              >
                {item.label}
              </p>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
