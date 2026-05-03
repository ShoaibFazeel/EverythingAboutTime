import CountdownTimer from "@/components/tools/CountdownTimer";

export const metadata = {
  title: "Countdown Timer | Online Event Countdown",
  description:
    "Create a live countdown to any future date and time. Perfect for exams, launches, events, deadlines, and special occasions.",
  keywords: [
    "countdown timer",
    "event countdown",
    "deadline timer",
    "online countdown",
  ],
  alternates: {
    canonical: "/tools/countdown",
  },
  openGraph: {
    url: "/tools/countdown",
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Countdown Timer</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Create a precise, live-updating countdown to any future date and time.</p>
      </div>
      <CountdownTimer />
    </div>
  );
}
