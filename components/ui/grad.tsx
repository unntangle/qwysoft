import { cn } from "@/lib/utils";

/**
 * Highlights the key words of a headline with the QWY logo gradient.
 * Use `tone="dark"` on night/indigo sections for a brighter version that
 * stays readable on dark backgrounds.
 */
export function Grad({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-clip-text pb-[0.12em] text-transparent [-webkit-box-decoration-break:clone] [box-decoration-break:clone]",
        tone === "dark"
          ? "bg-[linear-gradient(95deg,#ff5c95_0%,#e062c8_50%,#b39cff_100%)]"
          : "bg-[linear-gradient(95deg,#ff1f6b_0%,#c3158a_50%,#6a1fd0_100%)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
