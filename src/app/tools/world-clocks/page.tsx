import WorldClocks from "@/components/tools/WorldClocks";

export const metadata = {
  title: "World Clocks | Compare Time Zones Instantly",
  description: "Compare multiple world time zones in one view. Track current times across global cities and plan international meetings across different regions with ease.",
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
    title: "World Clocks | Compare Time Zones Instantly",
    description: "Compare multiple world time zones in one view. Track current times across global cities and plan international meetings across different regions with ease.",
    url: "/tools/world-clocks",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "World Clocks Tool",
      },
    ],
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
