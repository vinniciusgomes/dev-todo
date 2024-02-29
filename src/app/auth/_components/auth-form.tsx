"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm();
  const { toast } = useToast();

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      await signIn("email", {
        email: data.email,
        redirect: false,
      });

      toast({
        title: "Check your email",
        description: "We sent you a login link. Please check your email.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong.",
      });
    }

    setIsLoading(false);
  });

  const handleSignInWithGithub = async () => {
    setIsLoading(true);

    try {
      await signIn("github", {
        redirect: false,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...form.register("email")}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleSignInWithGithub}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
