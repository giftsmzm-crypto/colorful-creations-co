import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Palette, UserRound } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="blob animate-float-slow absolute -left-16 top-8 h-80 w-80"
          style={{ background: "var(--sunset)" }}
        />
        <div
          className="blob animate-float-slow absolute right-0 top-36 h-96 w-96"
          style={{ background: "var(--magenta)", animationDelay: "-5s" }}
        />
        <div
          className="blob animate-float-slow absolute bottom-0 left-1/3 h-72 w-72"
          style={{ background: "var(--violet)", animationDelay: "-9s" }}
        />
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-sunset text-primary-foreground shadow-lg shadow-primary/30">
            <Palette className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">Palette</span>
        </Link>
        <Button asChild variant="ghost" className="rounded-full">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </Button>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-92px)] max-w-6xl items-center gap-10 px-6 pb-16 lg:grid-cols-[1fr_440px]">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Artist signup
          </p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.02] md:text-7xl">
            Start your <span className="text-gradient-sunset">colorful</span> artist shop.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            Create your Palette account and get your gallery ready for collectors.
          </p>
        </div>

        <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-2xl shadow-foreground/10 backdrop-blur md:p-8">
          <div>
            <h2 className="text-3xl font-extrabold">Create account</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use your email, a public username, and a secure password.
            </p>
          </div>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@studio.com"
                  className="h-12 rounded-2xl bg-background pl-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  minLength={3}
                  placeholder="colorfulcreator"
                  className="h-12 rounded-2xl bg-background pl-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  className="h-12 rounded-2xl bg-background px-11"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-2xl bg-gradient-sunset text-base font-bold text-primary-foreground shadow-xl shadow-primary/25 hover:opacity-95"
            >
              Sign up
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
