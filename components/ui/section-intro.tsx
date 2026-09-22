import { cn } from "@/lib/utils";

/** Editorial opening for a section: optional kicker, serif statement, supporting copy. */
export function SectionIntro({
  kicker,
  title,
  body,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
  titleClassName,
}: {
  kicker?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {kicker && <p className={cn("kicker mb-5", tone === "dark" && "text-violet-soft")}>{kicker}</p>}
      <Tag className={cn("display display-md", tone === "dark" ? "text-white" : "text-ink", titleClassName)}>{title}</Tag>
      {body && (
        <p className={cn("lede mt-6 max-w-[58ch]", align === "center" && "mx-auto", tone === "dark" && "text-white/65")}>{body}</p>
      )}
    </div>
  );
}
