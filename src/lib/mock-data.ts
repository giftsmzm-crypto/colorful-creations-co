export type Artwork = {
  id: string;
  title: string;
  price: number;
  color: string;
  category: string;
  artistHandle: string;
  ratio?: "portrait" | "square" | "landscape";
};

export type Artist = {
  handle: string;
  name: string;
  tag: string;
  color: string;
  bio: string;
  location: string;
  followers: number;
  links: { label: string; href: string }[];
};

export const ARTISTS: Artist[] = [
  {
    handle: "mira",
    name: "Mira Kovač",
    tag: "Illustration",
    color: "var(--sunset)",
    bio: "Bright, citrusy illustrations made in a sunny Lisbon studio. Prints, originals, and the occasional zine.",
    location: "Lisbon, PT",
    followers: 12480,
    links: [
      { label: "Instagram", href: "#" },
      { label: "Website", href: "#" },
    ],
  },
  {
    handle: "owen",
    name: "Owen Reyes",
    tag: "Photography",
    color: "var(--violet)",
    bio: "Neon-drenched film photography from late-night coastal cities.",
    location: "Los Angeles, US",
    followers: 8210,
    links: [{ label: "Instagram", href: "#" }],
  },
  {
    handle: "ines",
    name: "Ines Duarte",
    tag: "Mixed media",
    color: "var(--magenta)",
    bio: "Bloom series and other soft rebellions in paint, paper, and thread.",
    location: "Porto, PT",
    followers: 5340,
    links: [{ label: "Website", href: "#" }],
  },
  {
    handle: "kai",
    name: "Kai Lindqvist",
    tag: "Posters",
    color: "var(--tangerine)",
    bio: "Screen-printed posters with a love of warm grit and tall type.",
    location: "Stockholm, SE",
    followers: 3120,
    links: [{ label: "Shop", href: "#" }],
  },
];

export const ARTWORKS: Artwork[] = [
  { id: "citrus-daydream", title: "Citrus Daydream", price: 180, color: "var(--sunset)", category: "Illustration", artistHandle: "mira", ratio: "portrait" },
  { id: "soft-rebellion", title: "Soft Rebellion", price: 240, color: "var(--tangerine)", category: "Posters", artistHandle: "kai", ratio: "landscape" },
  { id: "neon-pacific", title: "Neon Pacific", price: 320, color: "var(--violet)", category: "Photography", artistHandle: "owen", ratio: "square" },
  { id: "bloom-04", title: "Bloom 04", price: 420, color: "var(--magenta)", category: "Mixed media", artistHandle: "ines", ratio: "portrait" },
  { id: "mango-hour", title: "Mango Hour", price: 150, color: "var(--sunset)", category: "Illustration", artistHandle: "mira", ratio: "square" },
  { id: "harbor-glow", title: "Harbor Glow", price: 280, color: "var(--violet)", category: "Photography", artistHandle: "owen", ratio: "landscape" },
  { id: "bloom-07", title: "Bloom 07", price: 460, color: "var(--magenta)", category: "Mixed media", artistHandle: "ines", ratio: "square" },
  { id: "loud-type", title: "Loud Type", price: 95, color: "var(--tangerine)", category: "Posters", artistHandle: "kai", ratio: "portrait" },
  { id: "rind", title: "Rind", price: 210, color: "var(--sunset)", category: "Illustration", artistHandle: "mira", ratio: "landscape" },
];

export function getArtist(handle: string) {
  return ARTISTS.find((a) => a.handle === handle);
}

export function getArtwork(id: string) {
  return ARTWORKS.find((a) => a.id === id);
}

export function getArtistArtworks(handle: string) {
  return ARTWORKS.filter((a) => a.artistHandle === handle);
}

export function artGradient(color: string) {
  return `radial-gradient(120% 100% at 20% 10%, color-mix(in oklab, ${color} 90%, white), ${color} 50%, color-mix(in oklab, ${color} 60%, black))`;
}