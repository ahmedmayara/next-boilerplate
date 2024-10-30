import React from "react";

import { SignInForm } from "@/features/auth/sign-in/components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50">
      <SignInForm />
    </div>
  );
}
