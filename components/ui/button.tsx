import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost-light";

/**
 * Every button rests in a quiet neutral tone and, on hover, fills with the
 * QWY logo gradient (pink → magenta → violet). The gradient lives on a
 * ::before layer so it can fade in with opacity (gradients can't transition).
 */
const GRADIENT_HOVER =
  "relative isolate overflow-hidden before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(100deg,#ff1f6b_0%,#c3158a_50%,#5a0aa6_100%)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 hover:text-white hover:border-transparent hover:ring-transparent hover:shadow-[0_12px_28px_-12px_rgba(195,21,138,0.6)]";

const styles: Record<Variant, string> = {
  primary: "bg-[#f1eff4] text-ink ring-1 ring-inset ring-[#e2dde9] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_6px_16px_-10px_rgba(23,19,31,0.25)]",
  secondary: "bg-white/80 text-ink ring-1 ring-inset ring-line-strong backdrop-blur",
  light: "bg-white text-ink ring-1 ring-inset ring-white/60",
  "ghost-light": "text-white ring-1 ring-inset ring-white/30",
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
        "btn group inline-flex items-center justify-center gap-2 rounded-[10px] font-medium tracking-[-0.005em] transition-[color,box-shadow] duration-300 active:translate-y-px",
        GRADIENT_HOVER,
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
