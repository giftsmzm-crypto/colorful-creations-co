import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Heart, ShoppingBag, Search, Palette } from "lucide-react";

export const Route = createFileRoute("/for-customers")({
  head: () => ({
    meta: [
      { title: "For customers — Palette" },
      { name: "description", content: "Discover and buy art from independent artists around the world." },
      { property: "og:title", content: "For customers — Palette" },
      { property: "og:description", content: "Discover and buy art from independent artists around the world." },
    ],
  }),
  component: ForCustomers,
});

function ForCustomers() {
  const perks = [
    { icon: Search, t: "Find real art", d: "Browse work from independent artists, not big brands." },
    { icon: Heart, t: "Follow artists", d: "Save your favorites and see new art as soon as it drops." },
    { icon: ShoppingBag, t: "Easy checkout", d: "Buy in a few clicks. We handle shipping and taxes." },
  ];
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob animate-float-slow absolute -top-20 right-0 h-80 w-80" style={{ background: "var(--violet)" }} />
        <div className="blob animate-float-slow absolute top-40 -left-10 h-96 w-96" style={{ background: "var(--magenta)", animationDelay: "-4s" }} />
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
        <p className="text-sm font-bold uppercase tracking-widest text-primary">For customers</p>
        <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-7xl">
          Find art <span className="text-gradient-sunset">you love.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Browse art from independent artists. Buy what you love. Support real people.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/top-trending"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-[1.02]"
          >
            Top trending <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition hover:bg-accent"
          >
            <Search className="h-4 w-4" /> Search art
          </Link>
          <Link to="/for-artists" className="inline-flex items-center gap-1 text-base font-semibold underline decoration-2 underline-offset-4 hover:text-primary">
            Are you an artist? →
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