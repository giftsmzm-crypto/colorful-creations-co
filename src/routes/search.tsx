import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Palette, Search as SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ARTISTS, ARTWORKS, artGradient } from "@/lib/mock-data";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({
    meta: [
      { title: "Search art — Palette" },
      { name: "description", content: "Search art and artists on Palette." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q: initialQ } = Route.useSearch();
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ARTWORKS;
    return ARTWORKS.filter((art) => {
      const artist = ARTISTS.find((a) => a.handle === art.artistHandle);
      return (
        art.title.toLowerCase().includes(needle) ||
        art.category.toLowerCase().includes(needle) ||
        artist?.name.toLowerCase().includes(needle)
      );
    });
  }, [q]);

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
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Search</p>
        <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl">Find art you love</h1>

        <div className="mt-8 flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-sm">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, artist, or category…"
            className="w-full bg-transparent text-base focus:outline-none"
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((art) => {
            const artist = ARTISTS.find((a) => a.handle === art.artistHandle)!;
            return (
              <Link
                key={art.id}
                to="/art/$id"
                params={{ id: art.id }}
                className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1"
              >
                <div className="h-56 w-full" style={{ background: artGradient(art.color) }} />
                <div className="px-4 py-3">
                  <p className="font-display text-sm font-bold">{art.title}</p>
                  <p className="text-xs text-muted-foreground">by {artist.name}</p>
                </div>
              </Link>
            );
          })}
          {results.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">No art matches "{q}".</p>
          ) : null}
        </div>
      </section>
    </main>
  );
}