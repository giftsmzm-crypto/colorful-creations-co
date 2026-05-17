import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Flame, Palette, Star } from "lucide-react";
import { ARTISTS, ARTWORKS, artGradient } from "@/lib/mock-data";

export const Route = createFileRoute("/top-trending")({
  head: () => ({
    meta: [
      { title: "Top trending — Palette" },
      { name: "description", content: "The most loved art on Palette right now." },
    ],
  }),
  component: TopTrending,
});

function TopTrending() {
  const trending = ARTWORKS.slice(0, 8);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-sunset text-primary-foreground shadow-lg shadow-primary/30">
            <Palette className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">Palette</span>
        </Link>
        <Link to="/for-customers" className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
          <Flame className="h-4 w-4" /> Trending
        </p>
        <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl">
          Top trending <span className="text-gradient-sunset">right now</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">The art people are loving this week.</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((art, i) => {
            const artist = ARTISTS.find((a) => a.handle === art.artistHandle)!;
            return (
              <Link
                key={art.id}
                to="/art/$id"
                params={{ id: art.id }}
                className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1"
              >
                <div className="relative h-56 w-full" style={{ background: artGradient(art.color) }}>
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
                    <Star className="h-3 w-3 fill-current text-primary" /> #{i + 1}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <p className="font-display text-sm font-bold">{art.title}</p>
                  <p className="text-xs text-muted-foreground">by {artist.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}