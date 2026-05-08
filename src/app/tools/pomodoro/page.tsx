import PomodoroTimer from "@/components/tools/PomodoroTimer";

export const metadata = {
  title: "Pomodoro Timer | Focus & Study Tool",
  description:
    "Boost your productivity with our free online Pomodoro timer. Perfect for students and professionals using the 25-minute focus technique.",
  keywords: [
    "pomodoro timer",
    "study timer",
    "focus tool",
    "productivity timer",
  ],
  alternates: {
    canonical: "/tools/pomodoro",
  },
  openGraph: {
    title: "Pomodoro Timer | Focus & Study Tool",
    description:
      "Boost your productivity with our free online Pomodoro timer. Perfect for students and professionals using the 25-minute focus technique.",
    url: "/tools/pomodoro",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "Pomodoro Timer Tool",
      },
    ],
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Pomodoro Timer</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Boost your productivity using the famous 25-minute focus intervals and scheduled breaks.</p>
      </div>
      <PomodoroTimer />
    </div>
  );
}
