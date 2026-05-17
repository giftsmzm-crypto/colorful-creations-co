import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Frown, Loader2, Palette } from "lucide-react";
import { useEffect, useState } from "react";

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

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
  const [uploads, setUploads] = useState<{ id: string; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCreations() {
      if (!isSupabaseConfigured || !supabase) {
        setMessage("Supabase is not configured yet.");
        setIsLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        setNeedsSignIn(true);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("artworks")
        .select("id,title")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        setMessage("Your artwork storage is not set up yet. Uploads will appear here once the artworks table exists.");
        setIsLoading(false);
        return;
      }

      setUploads(data ?? []);
      setIsLoading(false);
    }

    void loadCreations();

    return () => {
      cancelled = true;
    };
  }, []);

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

        {isLoading ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-16 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-6 text-2xl font-extrabold">Loading your creations</p>
          </div>
        ) : needsSignIn ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <Frown className="h-16 w-16 text-muted-foreground" />
            <p className="mt-6 text-2xl font-extrabold">Sign in to see your creations</p>
            <p className="mt-2 max-w-md text-muted-foreground">
              Your uploaded artwork is private to your account.
            </p>
            <Link
              to="/signin"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-[1.02]"
            >
              Sign in <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : uploads.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <Frown className="h-16 w-16 text-muted-foreground" />
            <p className="mt-6 text-2xl font-extrabold">You haven't uploaded anything</p>
            <p className="mt-2 max-w-md text-muted-foreground">
              {message || "Upload your first piece and it will show up here."}
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-[1.02]"
            >
              Start selling <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {uploads.map((upload) => (
              <div key={upload.id} className="rounded-3xl border border-border bg-card p-6">
                <p className="font-display text-xl font-extrabold">{upload.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">Saved in your Supabase artwork library.</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
