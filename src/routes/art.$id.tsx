import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Heart, ShoppingBag, Share2, Palette, ArrowUpRight } from "lucide-react";
import {
  getArtwork,
  getArtist,
  getArtistArtworks,
  artGradient,
  ARTWORKS,
  type Artwork,
  type Artist,
} from "@/lib/mock-data";

export const Route = createFileRoute("/art/$id")({
  loader: ({ params }): { art: Artwork; artist: Artist; related: Artwork[] } => {
    const art = getArtwork(params.id);
    if (!art) throw notFound();
    const artist = getArtist(art.artistHandle);
    if (!artist) throw notFound();
    const related = getArtistArtworks(artist.handle)
      .filter((w) => w.id !== art.id)
      .slice(0, 3);
    return { art, artist, related };
  },
  head: ({ params }) => {
    const art = ARTWORKS.find((x) => x.id === params.id);
    const title = art ? `${art.title} — Palette` : "Artwork — Palette";
    const description = art ? `${art.title} — ${art.category}, $${art.price} on Palette.` : "Artwork on Palette.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ArtworkDetail,
});

function ArtworkDetail() {
  const { art, artist, related } = Route.useLoaderData();
  const [liked, setLiked] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  function handleBuyNow() {
    setShareMessage("");
    setCheckoutMessage(
      "Checkout is not live yet, but your interest has been saved. Contact the artist to complete this purchase.",
    );
  }

  async function handleShare() {
    setCheckoutMessage("");
    const shareUrl = window.location.href;
    const shareTitle = `${art.title} by ${artist.name} on Palette`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: `Check out ${art.title} by ${artist.name}.`,
          url: shareUrl,
        });
        setShareMessage("Share sheet opened.");
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareMessage("Artwork link copied.");
    } catch {
      setShareMessage("Share cancelled.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
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

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-6 md:grid-cols-12">
        {/* Preview */}
        <div className="md:col-span-7">
          <div
            className="aspect-[4/5] w-full rounded-3xl border border-border shadow-2xl shadow-foreground/10"
            style={{ background: artGradient(art.color) }}
          />
        </div>

        {/* Info */}
        <div className="md:col-span-5">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">{art.category}</p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">{art.title}</h1>

          {/* Artist link */}
          <Link
            to="/artist/$handle"
            params={{ handle: artist.handle }}
            className="group mt-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition hover:border-primary"
          >
            <span
              className="grid h-12 w-12 place-items-center rounded-xl font-display text-lg font-extrabold text-primary-foreground"
              style={{ background: artist.color }}
            >
              {artist.name.charAt(0)}
            </span>
            <div className="flex-1">
              <p className="font-display text-base font-extrabold">{artist.name}</p>
              <p className="text-xs text-muted-foreground">
                View portfolio · {artist.followers.toLocaleString()} followers
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" />
          </Link>

          {/* Price + buy */}
          <div className="mt-8 rounded-3xl bg-gradient-sunset p-1">
            <div className="rounded-[1.4rem] bg-card p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl font-extrabold text-gradient-sunset">${art.price}</span>
                <span className="text-xs text-muted-foreground">incl. 12% platform fee</span>
              </div>
              <button
                onClick={handleBuyNow}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-base font-semibold text-background transition hover:opacity-90"
              >
                <ShoppingBag className="h-4 w-4" /> Buy now
              </button>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLiked((v) => !v)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-primary"
                >
                  <Heart className={"h-4 w-4 " + (liked ? "fill-current text-primary" : "")} />
                  {liked ? "Liked" : "Like"}
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-primary"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
              {checkoutMessage ? (
                <p className="mt-4 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-foreground">
                  {checkoutMessage}
                </p>
              ) : null}
              {shareMessage ? (
                <p className="mt-4 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-muted-foreground">
                  {shareMessage}
                </p>
              ) : null}
            </div>
          </div>

          <p className="mt-8 text-muted-foreground">
            A one-of-a-kind piece from {artist.name}'s studio. Printed and shipped within 48 hours, with global tax and tracking handled by Palette.
          </p>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-extrabold md:text-3xl">More from {artist.name}</h2>
            <Link
              to="/artist/$handle"
              params={{ handle: artist.handle }}
              className="text-sm font-semibold underline decoration-2 underline-offset-4 hover:text-primary"
            >
              See full portfolio →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((w: Artwork) => (
              <Link
                key={w.id}
                to="/art/$id"
                params={{ id: w.id }}
                className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="aspect-[4/5] w-full" style={{ background: artGradient(w.color) }} />
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <p className="font-display text-sm font-extrabold">{w.title}</p>
                  <span className="font-display text-base font-extrabold text-gradient-sunset">${w.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
