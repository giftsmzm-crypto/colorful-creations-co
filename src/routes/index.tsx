import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Upload, Palette, Wallet, Globe, Star } from "lucide-react";
import { ARTISTS, ARTWORKS, artGradient } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Showcase />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-sunset text-primary-foreground shadow-lg shadow-primary/30">
          <Palette className="h-5 w-5" />
        </span>
        <span className="font-display text-xl font-extrabold tracking-tight">Palette</span>
      </Link>
      <nav className="hidden gap-8 text-sm font-medium md:flex">
        <a href="#how" className="hover:text-primary">How it works</a>
        <a href="#showcase" className="hover:text-primary">Showcase</a>
        <a href="#pricing" className="hover:text-primary">Pricing</a>
      </nav>
      <div className="flex items-center gap-3">
        <Link to="/signup" className="hidden text-sm font-medium hover:text-primary md:inline">Sign up</Link>
        <Link
          to="/signup"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
        >
          Start selling <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-12 pb-28 md:pt-20 md:pb-36">
      {/* Blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob animate-float-slow absolute -top-20 -left-10 h-80 w-80" style={{ background: "var(--sunset)" }} />
        <div className="blob animate-float-slow absolute top-40 right-0 h-96 w-96" style={{ background: "var(--magenta)", animationDelay: "-4s" }} />
        <div className="blob animate-float-slow absolute -bottom-10 left-1/3 h-72 w-72" style={{ background: "var(--violet)", animationDelay: "-8s" }} />
      </div>

      <div className="grid gap-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> New • Open for artists worldwide
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] md:text-7xl">
            A loud, <span className="text-gradient-sunset">colorful</span> home for your art.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            Upload prints, originals or downloads. We host the gallery, run the checkout, and keep
            things simple — you keep the spotlight.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-[1.02]"
            >
              <Upload className="h-4 w-4" /> Upload your first piece
            </Link>
            <a href="#showcase" className="inline-flex items-center gap-1 text-base font-semibold underline decoration-2 underline-offset-4 hover:text-primary">
              See the gallery →
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 text-sm">
            {[
              ["12%", "flat fee"],
              ["48h", "payouts"],
              ["120+", "countries"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-extrabold text-gradient-sunset">{n}</dt>
                <dd className="mt-1 text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-5">
          <HeroCollage />
        </div>
      </div>
    </section>
  );
}

function HeroCollage() {
  const layout = [
    { id: "citrus-daydream", rot: "-rotate-3", h: "h-64" },
    { id: "neon-pacific", rot: "rotate-2 -mt-6", h: "h-52" },
    { id: "bloom-04", rot: "rotate-1 -mt-10", h: "h-72" },
    { id: "soft-rebellion", rot: "-rotate-2 -mt-4", h: "h-56" },
  ];
  return (
    <div className="relative grid grid-cols-2 gap-5">
      {layout.map((l) => {
        const art = ARTWORKS.find((a) => a.id === l.id)!;
        const artist = ARTISTS.find((a) => a.handle === art.artistHandle)!;
        return (
          <Link
            key={l.id}
            to="/art/$id"
            params={{ id: art.id }}
            className={`group relative ${l.rot} overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/10 transition hover:rotate-0`}
          >
            <div className={`${l.h} w-full`} style={{ background: artGradient(art.color) }} />
            <div className="flex items-center justify-between gap-2 px-4 py-3">
              <div>
                <p className="font-display text-sm font-bold">{art.title}</p>
                <p className="text-xs text-muted-foreground">by {artist.name.split(" ")[0]}</p>
              </div>
              <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
                For sale
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function Marquee() {
  const words = ["Illustration", "Photography", "Prints", "Ceramics", "Digital", "Posters", "Originals", "3D", "Textiles"];
  return (
    <div className="border-y border-border bg-foreground py-5 text-background">
      <div className="flex animate-[float-slow_30s_linear_infinite] gap-10 overflow-hidden whitespace-nowrap px-6 font-display text-2xl font-extrabold uppercase tracking-tight md:text-4xl">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w} <span className="text-gradient-sunset">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Upload, t: "Upload your art", d: "Drag in JPGs, PNGs or PDFs. Add a price, story, and edition size." },
    { icon: Globe, t: "Reach collectors", d: "Your work appears in a curated, colorful gallery seen worldwide." },
    { icon: Wallet, t: "Get paid fast", d: "We handle checkout and shipping labels. Payouts hit in 48 hours." },
  ];
  return (
    <section id="how" className="mx-auto max-w-7xl px-6 py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">How it works</p>
        <h2 className="mt-3 text-4xl font-extrabold md:text-6xl">Three steps. Zero gallery politics.</h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map(({ icon: Icon, t, d }, i) => (
          <div
            key={t}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-sunset opacity-20 blur-2xl transition group-hover:opacity-40" />
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-warm text-primary-foreground">
              <Icon className="h-6 w-6" />
            </span>
            <p className="mt-6 font-display text-sm font-bold text-muted-foreground">0{i + 1}</p>
            <h3 className="mt-1 text-2xl font-extrabold">{t}</h3>
            <p className="mt-3 text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="showcase" className="bg-foreground py-28 text-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-gradient-sunset">Featured artists</p>
            <h2 className="mt-3 text-4xl font-extrabold md:text-6xl">
              Bold work from people <span className="text-gradient-sunset">making things</span> right now.
            </h2>
          </div>
          <Link to="/signup" className="inline-flex items-center gap-1 text-sm font-semibold underline decoration-2 underline-offset-4">
            Become a featured artist →
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTISTS.map((a) => (
            <Link
              key={a.handle}
              to="/artist/$handle"
              params={{ handle: a.handle }}
              className="group overflow-hidden rounded-3xl bg-background text-foreground transition hover:-translate-y-1"
            >
              <div
                className="aspect-[4/5] w-full transition group-hover:scale-[1.03]"
                style={{
                  background: `conic-gradient(from 120deg at 60% 40%, color-mix(in oklab, ${a.color} 80%, white), ${a.color}, color-mix(in oklab, ${a.color} 50%, black), color-mix(in oklab, ${a.color} 80%, white))`,
                }}
              />
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-display text-lg font-extrabold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.tag}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <Star className="h-3.5 w-3.5 fill-current text-primary" /> 4.9
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Simple pricing</p>
          <h2 className="mt-3 text-4xl font-extrabold md:text-6xl">
            One flat fee. <span className="text-gradient-sunset">No surprises.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            We take a flat <span className="font-bold text-foreground">12%</span> when your art sells.
            That's it. No listing fees, no monthly bill, no hidden cuts.
          </p>
          <ul className="mt-8 space-y-3 text-base">
            {["Unlimited uploads", "Built-in checkout & shipping labels", "Global tax handled for you", "Cancel any time, keep your fans"].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-sunset" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-[2rem] bg-gradient-sunset p-1 shadow-2xl shadow-primary/30">
          <div className="rounded-[1.85rem] bg-card p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Artist plan</p>
            <div className="mt-4 flex items-end gap-2">
              <span className="font-display text-7xl font-extrabold text-gradient-sunset">12%</span>
              <span className="pb-3 text-muted-foreground">per sale</span>
            </div>
            <p className="mt-3 text-muted-foreground">Free to join. Only pay when you make money.</p>
            <Link
              to="/signup"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-base font-semibold text-background transition hover:opacity-90"
            >
              Create my shop <ArrowUpRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-center text-xs text-muted-foreground">No card required to start.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mx-auto max-w-7xl px-6 pb-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-sunset p-10 text-primary-foreground md:p-20">
        <div aria-hidden className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cream/30 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-violet/40 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Your next collector is scrolling right now.
          </h2>
          <p className="mt-5 text-lg text-primary-foreground/90 md:text-xl">
            Set up your artist shop in under five minutes. Bring the art — we'll bring the buyers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@studio.com"
              className="flex-1 rounded-full bg-cream/95 px-6 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-cream/40"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-base font-semibold text-background transition hover:opacity-90"
            >
              Join the waitlist <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-10">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-xl bg-gradient-sunset text-primary-foreground">
            <Palette className="h-4 w-4" />
          </span>
          <span className="font-display font-extrabold text-foreground">Palette</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Twitter</a>
          <a href="#" className="hover:text-foreground">Instagram</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
