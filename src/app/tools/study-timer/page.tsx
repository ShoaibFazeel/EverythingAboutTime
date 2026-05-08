import StudyTimer from "@/components/tools/StudyTimer";

export const metadata = {
  title: "Study Timer | Session Stopwatch for Students",
  description:
    "Track deep work and study sessions with a simple online stopwatch. Save focused sessions and stay consistent with your learning goals.",
  keywords: [
    "study timer",
    "study stopwatch",
    "session tracker",
    "focus timer",
  ],
  alternates: {
    canonical: "/tools/study-timer",
  },
  openGraph: {
    title: "Study Timer | Session Stopwatch for Students",
    description:
      "Track deep work and study sessions with a simple online stopwatch. Save focused sessions and stay consistent with your learning goals.",
    url: "/tools/study-timer",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "Study Timer Tool",
      },
    ],
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Study Timer</h1>
        <p className="text-lg text-foreground/70 max-w-2xl">Use this minimal stopwatch to track deep work sessions and save them internally.</p>
      </div>
      <StudyTimer />
    </div>
  );
}
