type AvatarBadgeProps = {
  name: string;
  size?: "sm" | "md";
};

export function AvatarBadge({ name, size = "md" }: AvatarBadgeProps) {
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
      : "h-12 w-12 rounded-[16px] text-sm";

  return (
    <div
      className={`flex ${sizes} items-center justify-center border border-[#e6e8ee] bg-[linear-gradient(180deg,#373943_0%,#1f2025_100%)] font-semibold text-white shadow-[0_6px_18px_rgba(15,15,18,0.14)]`}
    >
      {initials}
    </div>
  );
}
