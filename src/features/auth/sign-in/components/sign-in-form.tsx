"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/features/auth/sign-in/actions";
import { SignInInput, SignInSchema } from "@/features/auth/sign-in/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useServerActionMutation } from "@/hooks/action-hooks";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Logo } from "@/components/marketing/logo";

/**
 * SignInForm Component
 *
 * This component renders a form for user authentication (sign in).
 *
 * @component
 * @example
 * return (
 *   <SignInForm />
 * )
 *
 * @description
 * The SignInForm component provides a user interface for existing users to sign in to their account.
 * It includes fields for email and password.
 * The form uses react-hook-form for form management and zod for schema validation.
 *
 * Features:
 * - Input validation using zod schema
 * - Displays error messages for failed sign-in attempts
 * - Disables form submission while processing
 * - Provides a link to the sign-up page for new users
 *
 * @returns {JSX.Element} A form for user authentication
 */
export function SignInForm() {
  const router = useRouter();

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const { mutate, isPending, error } = useServerActionMutation(signIn, {
    onSuccess: () => {
      router.push("/");
    },
  });

  const signInForm = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    mutate(data);
  };

  return (
    <div className="mx-auto w-full p-12 shadow-none md:max-w-xl md:p-0">
      <div className="flex flex-col gap-4">
        <Logo />
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-3xl font-bold">
            Sign in to your account
          </h1>
          <p className="text-muted-foreground">
            Enter your email and password to sign in to your account.
          </p>
        </div>
      </div>
      <div>
        <Form {...signInForm}>
          <form
            onSubmit={signInForm.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <FormField
              control={signInForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signInForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pe-9"
                        placeholder="Password"
                        type={isVisible ? "text" : "password"}
                        disabled={isPending}
                        {...field}
                      />
                      <button
                        className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={
                          isVisible ? "Hide password" : "Show password"
                        }
                        aria-pressed={isVisible}
                        aria-controls="password"
                      >
                        {isVisible ? (
                          <EyeOffIcon
                            className="h-4 w-4 opacity-60"
                            aria-hidden="true"
                          />
                        ) : (
                          <EyeIcon
                            className="h-4 w-4 opacity-60"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <Callout variant="error" title="An error occurred.">
                {error.message}
              </Callout>
            )}

            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Spinner /> : "Sign in"}
              </Button>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-muted-foreground hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-zinc-50 px-2 text-muted-foreground">
                  Don&apos;t have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button className="group w-full" variant="outline" asChild>
                <Link href="/auth/sign-up">
                  Create an account
                  <ArrowRightIcon
                    className="-me-1 ms-2 h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
