import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MapPin, Check, Plus, Palette } from "lucide-react";
import { getArtist, getArtistArtworks, artGradient, ARTISTS } from "@/lib/mock-data";

export const Route = createFileRoute("/artist/$handle")({
  loader: ({ params }) => {
    const artist = getArtist(params.handle);
    if (!artist) throw notFound();
    return { artist, works: getArtistArtworks(params.handle) };
  },
  head: ({ params }) => {
    const a = ARTISTS.find((x) => x.handle === params.handle);
    const title = a ? `${a.name} — Palette` : "Artist — Palette";
    const description = a?.bio ?? "Independent artist on Palette.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ArtistProfile,
});

function ArtistProfile() {
  const { artist, works } = Route.useLoaderData();
  const [following, setFollowing] = useState(false);
  const followerCount = artist.followers + (following ? 1 : 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-sunset text-primary-foreground shadow-lg shadow-primary/30">
            <Palette className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">Palette</span>
        </Link>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </header>

      {/* Banner */}
      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className="h-48 w-full rounded-3xl md:h-64"
          style={{
            background: `conic-gradient(from 140deg at 60% 40%, color-mix(in oklab, ${artist.color} 80%, white), ${artist.color}, color-mix(in oklab, ${artist.color} 40%, black), color-mix(in oklab, ${artist.color} 80%, white))`,
          }}
        />
        {/* Avatar */}
        <div
          className="absolute left-12 -bottom-10 grid h-28 w-28 place-items-center rounded-3xl border-4 border-background font-display text-4xl font-extrabold text-primary-foreground shadow-xl"
          style={{ background: artist.color }}
        >
          {artist.name.charAt(0)}
        </div>
      </div>

      {/* Header info */}
      <section className="mx-auto max-w-7xl px-6 pt-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">{artist.tag}</p>
            <h1 className="mt-2 text-4xl font-extrabold md:text-6xl">{artist.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {artist.location}
              </span>
              <span>
                <span className="font-bold text-foreground">{followerCount.toLocaleString()}</span> followers
              </span>
              <span>
                <span className="font-bold text-foreground">{works.length}</span> works
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {artist.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => setFollowing((v) => !v)}
              className={
                following
                  ? "inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-foreground hover:text-background"
                  : "inline-flex items-center gap-1.5 rounded-full bg-gradient-sunset px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.03]"
              }
            >
              {following ? (
                <>
                  <Check className="h-4 w-4" /> Following
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Follow
                </>
              )}
            </button>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{artist.bio}</p>
      </section>

      {/* Portfolio grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-extrabold md:text-3xl">Portfolio</h2>
          <p className="text-sm text-muted-foreground">{works.length} pieces</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <Link
              key={w.id}
              to="/art/$id"
              params={{ id: w.id }}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div
                className={
                  "w-full transition group-hover:scale-[1.03] " +
                  (w.ratio === "landscape" ? "aspect-[4/3]" : w.ratio === "square" ? "aspect-square" : "aspect-[4/5]")
                }
                style={{ background: artGradient(w.color) }}
              />
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="font-display text-base font-extrabold">{w.title}</p>
                  <p className="text-xs text-muted-foreground">{w.category}</p>
                </div>
                <span className="font-display text-lg font-extrabold text-gradient-sunset">${w.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}