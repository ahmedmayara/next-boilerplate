import React from "react";

import Link from "next/link";
import { SignUpForm } from "@/features/auth/sign-up/components/forms/sign-up-form";
import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50">
      <div className="absolute right-5 top-5">
        <Button variant="link">
          <Link href="/" className="flex items-center">
            <ChevronLeftIcon
              className="me-1 h-4 w-4 opacity-60"
              aria-hidden="true"
            />
            Go Back
          </Link>
        </Button>
      </div>
      <SignUpForm />
    </div>
  );
}
