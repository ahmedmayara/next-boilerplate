"use client";

import React from "react";

import { signOut } from "@/features/auth/actions";
import { useServerAction } from "zsa-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SignOutButton() {
  const { execute, isPending } = useServerAction(signOut);

  const onClick = () => {
    execute();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-destructive hover:text-destructive"
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Spinner size="sm" />
          Signing out...
        </div>
      ) : (
        "Sign Out"
      )}
    </Button>
  );
}
