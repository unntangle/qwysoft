import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Sarvam-style building blocks, shared by every section so the site
   reads as one calm system:
   - Card: white, thin border, small inner margin
   - Tile: a soft pastel panel that carries a name set large, the way
     Sarvam's customer stories carry a client logo
------------------------------------------------------------------- */

export const TILE_TONES = [
  { bg: "bg-[linear-gradient(180deg,#eef0fd,#dfe3fb)]", ink: "#4b4fb8" }, // periwinkle
  { bg: "bg-[linear-gradient(180deg,#fdf3ec,#fbe3d4)]", ink: "#b4582a" }, // peach
  { bg: "bg-[linear-gradient(180deg,#fcf0f5,#f8dde9)]", ink: "#a8266a" }, // rose
  { bg: "bg-[linear-gradient(180deg,#eef7f1,#dcefe3)]", ink: "#2c7a57" }, // mint
  { bg: "bg-[linear-gradient(180deg,#f4f1fb,#e6dff7)]", ink: "#5a3aa0" }, // lilac
] as const;

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl border border-line bg-white p-2", className)}>{children}</div>;
}

export function Tile({
  tone = 0,
  className,
  children,
}: {
  tone?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const t = TILE_TONES[tone % TILE_TONES.length];
  return (
    <div className={cn("grid place-items-center rounded-xl px-5 text-center", t.bg, className)} style={{ color: t.ink }}>
      {children}
    </div>
  );
}

/** Large, logo-like label for inside a Tile */
export function TileLabel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-medium leading-[1.08] tracking-[-0.025em]", className)}>{children}</p>;
}
