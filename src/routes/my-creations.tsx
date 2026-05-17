import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Frown, Palette } from "lucide-react";

export const Route = createFileRoute("/my-creations")({
  head: () => ({
    meta: [
      { title: "My creations — Palette" },
      { name: "description", content: "View the art you've uploaded to Palette." },
    ],
  }),
  component: MyCreations,
});

function MyCreations() {
  const uploads: { id: string; title: string }[] = [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-sunset text-primary-foreground shadow-lg shadow-primary/30">
            <Palette className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">Palette</span>
        </Link>
        <Link to="/for-artists" className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Your studio</p>
        <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl">My creations</h1>

        {uploads.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <Frown className="h-16 w-16 text-muted-foreground" />
            <p className="mt-6 text-2xl font-extrabold">You haven't uploaded anything</p>
            <p className="mt-2 max-w-md text-muted-foreground">
              Upload your first piece and it will show up here.
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-[1.02]"
            >
              Start selling <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}