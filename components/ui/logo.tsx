import Image from "next/image";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Official QWY Software logo (public/brand/*.webp).
   The source files have generous transparent padding around the
   artwork. We render the image at its natural aspect ratio and trim
   the padding with negative margins inside an overflow-hidden box,
   so the artwork is never clipped whatever the file's exact size.

   If the logos are re-exported tightly cropped, set TRIM to all zeros.
   TRIM values are fractions of the rendered image HEIGHT.
------------------------------------------------------------------- */

const SOURCES = {
  color: "/brand/logo.webp",
  white: "/brand/logo-white.webp",
  black: "/brand/logo-black.webp",
} as const;

// Artwork occupies roughly 34%–74% of the canvas height.
const ART_TOP = 0.33;
const ART_HEIGHT = 0.42;
// Horizontal padding to trim, kept conservative so the artwork never clips.
const TRIM_X = 0.08;

export type LogoTone = keyof typeof SOURCES;

export function Logo({
  tone = "color",
  height = 28,
  priority = false,
  className,
}: {
  tone?: LogoTone;
  /** Visible height of the artwork in px. */
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  const imgH = height / ART_HEIGHT;
  return (
    <span className={cn("inline-block shrink-0 overflow-hidden align-middle leading-none", className)} style={{ height }}>
      <Image
        src={SOURCES[tone]}
        alt="QWY Software"
        width={1500}
        height={500}
        priority={priority}
        sizes={`${Math.ceil(imgH * 3.2)}px`}
        className="block max-w-none"
        style={{
          height: imgH,
          width: "auto",
          marginTop: -imgH * ART_TOP,
          marginLeft: -imgH * TRIM_X,
          marginRight: -imgH * TRIM_X,
        }}
      />
    </span>
  );
}
