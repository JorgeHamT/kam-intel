"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils/cn";

type AvatarBadgeProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  imageSrc?: string;
  className?: string;
};

export function AvatarBadge({
  name,
  size = "md",
  imageSrc,
  className,
}: AvatarBadgeProps) {
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [imageSrc]);

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sizes =
    size === "sm"
      ? "h-10 w-10 rounded-[14px] text-xs"
      : size === "lg"
        ? "h-16 w-16 rounded-[18px] text-sm"
        : "h-12 w-12 rounded-[16px] text-sm";
  const pixels = size === "sm" ? 40 : size === "lg" ? 64 : 48;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden border border-[#e6e8ee] bg-[linear-gradient(180deg,#373943_0%,#1f2025_100%)] font-semibold text-white shadow-[0_6px_18px_rgba(15,15,18,0.14)]",
        sizes,
        className,
      )}
    >
      {imageSrc && !hasImageError ? (
        <Image
          src={imageSrc}
          alt={name}
          width={pixels}
          height={pixels}
          className="h-full w-full object-cover"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <>
          <div className="absolute inset-[1px] rounded-[inherit] bg-[radial-gradient(circle_at_top,#7b8090_0%,transparent_58%)] opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_48%)]" />
          <span className="relative text-[0.78em] tracking-[0.08em] text-white/88">
            {initials}
          </span>
        </>
      )}
    </div>
  );
}
