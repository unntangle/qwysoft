import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost-light";

/**
 * Every button rests in a quiet neutral tone and, on hover, shifts to a
 * subtle grey (same treatment as the industry dial's arrow buttons).
 */
const styles: Record<Variant, string> = {
  primary:
    "bg-[#2e2b35] text-white ring-1 ring-inset ring-[#2e2b35] shadow-[0_6px_16px_-10px_rgba(23,19,31,0.45)] hover:bg-[#45414d]",
  secondary: "bg-white/80 text-ink ring-1 ring-inset ring-line-strong backdrop-blur hover:bg-[#ebe9ee]",
  light: "bg-white text-ink ring-1 ring-inset ring-white/60 hover:bg-[#ebe9ee]",
  "ghost-light": "text-white ring-1 ring-inset ring-white/30 hover:bg-white/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const sizing =
    size === "lg" ? "h-[52px] px-6 text-base" : size === "sm" ? "h-9 px-3.5 text-sm" : "h-11 px-5 text-[0.9375rem]";
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        `btn btn-${variant} group inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] font-medium tracking-[-0.005em] transition-colors duration-200 active:translate-y-px`,
        sizing,
        styles[variant],
        className,
      )}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          strokeWidth={1.75}
          className="-mr-0.5 size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
