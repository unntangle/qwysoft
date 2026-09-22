import { cn } from "@/lib/utils";

/** The brand's signature: a double gold thread, as on a Kerala kasavu border. */
export function Kasavu({ className }: { className?: string }) {
  return <div aria-hidden className={cn("kasavu w-full", className)} />;
}
