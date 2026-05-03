import WorldClocks from "@/components/tools/WorldClocks";

export const metadata = {
  title: "World Clocks | Compare Time Zones Instantly",
  description:
    "Compare multiple world time zones in one view. Track current times across cities and plan meetings across regions easily.",
  keywords: [
    "world clock",
    "time zones",
    "global clock",
    "timezone converter",
  ],
  alternates: {
    canonical: "/tools/world-clocks",
  },
  openGraph: {
    url: "/tools/world-clocks",
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">World Clocks</h1>
        <p className="text-lg text-foreground/70">Observe multiple time zones and adjust one to instantly see the relative time everywhere else.</p>
      </div>
      <WorldClocks />
    </div>
  );
}
