import React from "react";

import { Logo } from "@/components/marketing/logo";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F7FCFE]">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <h1 className="font-heading text-4xl font-bold tracking-tight">
            Next.js Boilerplate
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          A boilerplate for Next.js projects with TypeScript and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
