"use client";

import React from "react";

import Link from "next/link";
import { signUp } from "@/features/auth/sign-up/actions";
import { SignUpInput, SignUpSchema } from "@/features/auth/sign-up/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
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
 * SignUpForm Component
 *
 * This component renders a form for user registration (sign up).
 *
 * @component
 * @example
 * return (
 *   <SignUpForm />
 * )
 *
 * @description
 * The SignUpForm component provides a user interface for new users to create an account.
 * It includes fields for full name, email, password, and password confirmation.
 * The form uses react-hook-form for form management and zod for schema validation.
 *
 * Features:
 * - Input validation using zod schema
 * - Displays success message upon successful account creation
 * - Shows error messages for failed sign-up attempts
 * - Disables form submission while processing
 * - Provides a link to the sign-in page for existing users
 *
 * @returns {JSX.Element} A form for user registration
 */
export function SignUpForm() {
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    React.useState<boolean>(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const togglePasswordConfirmationVisibility = () =>
    setIsPasswordConfirmationVisible(!isPasswordConfirmationVisible);

  const { mutate, isPending, error, isSuccess } =
    useServerActionMutation(signUp);

  const signUpForm = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpInput> = async (data) => {
    mutate(data);
    signUpForm.reset();
  };

  return (
    <div className="mx-auto w-full p-12 shadow-none md:max-w-xl md:p-0">
      <div className="flex flex-col gap-4">
        <Logo />
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your details below to create your account.
          </p>
        </div>
      </div>
      <div>
        <Form {...signUpForm}>
          <form
            onSubmit={signUpForm.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <FormField
              control={signUpForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
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
              control={signUpForm.control}
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
                        type={isPasswordVisible ? "text" : "password"}
                        disabled={isPending}
                        {...field}
                      />
                      <button
                        className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          isPasswordVisible ? "Hide password" : "Show password"
                        }
                        aria-pressed={isPasswordVisible}
                        aria-controls="password"
                      >
                        {isPasswordVisible ? (
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

            <FormField
              control={signUpForm.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm Password <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pe-9"
                        placeholder="Confirm Password"
                        type={
                          isPasswordConfirmationVisible ? "text" : "password"
                        }
                        disabled={isPending}
                        {...field}
                      />
                      <button
                        className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={togglePasswordConfirmationVisibility}
                        aria-label={
                          isPasswordConfirmationVisible
                            ? "Hide password"
                            : "Show password"
                        }
                        aria-pressed={isPasswordConfirmationVisible}
                        aria-controls="password"
                      >
                        {isPasswordConfirmationVisible ? (
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

            {isSuccess && (
              <Callout variant="success" title="Account created successfully.">
                You can now sign in using your email and password.
              </Callout>
            )}

            {error && (
              <Callout variant="error" title="An error occurred.">
                {error.message}
              </Callout>
            )}

            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Spinner /> : "Create account"}
              </Button>
              <li className="text-sm text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </li>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-zinc-50 px-2 text-muted-foreground">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button className="group w-full" variant="outline" asChild>
                <Link href="/auth/sign-in">
                  <ArrowLeftIcon
                    className="-ms-1 me-2 h-4 w-4 opacity-60 transition-transform group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                  Back to sign in
                </Link>
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
