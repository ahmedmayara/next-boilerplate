import React from "react";

import { cn } from "@/utils";

type LogoProps = React.SVGProps<SVGSVGElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      className={cn("h-9 w-9 stroke-zinc-800 dark:stroke-zinc-100", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 32 32"
      aria-hidden="true"
      {...props}
    >
      <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8"></circle>
    </svg>
  );
}
