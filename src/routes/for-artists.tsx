import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Upload, Wallet, Sparkles, Palette } from "lucide-react";

export const Route = createFileRoute("/for-artists")({
  head: () => ({
    meta: [
      { title: "For artists — Palette" },
      { name: "description", content: "Sell your art on Palette. Upload, set a price, and get paid in 48 hours." },
      { property: "og:title", content: "For artists — Palette" },
      { property: "og:description", content: "Sell your art on Palette. Upload, set a price, and get paid in 48 hours." },
    ],
  }),
  component: ForArtists,
});

function ForArtists() {
  const perks = [
    { icon: Upload, t: "Upload anything", d: "Prints, originals, or digital files. As many as you want." },
    { icon: Wallet, t: "Get paid fast", d: "Money lands in your account 48 hours after a sale." },
    { icon: Sparkles, t: "Keep 85%", d: "We only take 15% when your art sells. No other fees." },
  ];
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob animate-float-slow absolute -top-20 -left-10 h-80 w-80" style={{ background: "var(--sunset)" }} />
        <div className="blob animate-float-slow absolute top-40 right-0 h-96 w-96" style={{ background: "var(--magenta)", animationDelay: "-4s" }} />
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-sunset text-primary-foreground shadow-lg shadow-primary/30">
            <Palette className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">Palette</span>
        </Link>
        <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">For artists</p>
        <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-7xl">
          Sell your art. <span className="text-gradient-sunset">Keep most of it.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Make a free shop in five minutes. Upload your art and start selling today.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-[1.02]"
          >
            Start selling <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link to="/for-customers" className="inline-flex items-center gap-1 text-base font-semibold underline decoration-2 underline-offset-4 hover:text-primary">
            Looking to buy art? →
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {perks.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl border border-border bg-card p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-warm text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold">{t}</h3>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}