import CountdownTimer from "@/components/tools/CountdownTimer";
import ToolInfoTabs from "@/components/tools/ToolInfoTabs";

export const metadata = {
  title: "Online Countdown Timer & Event Tracker",
  description:
    "Create a live-updating countdown for any event or deadline. A free, precise online timer to track the days, hours, and minutes until your big moment.",
  keywords: [
    "countdown timer",
    "online countdown",
    "event tracker",
    "timer tool",
  ],
  alternates: {
    canonical: "/tools/countdown",
  },
  openGraph: {
    title: "Online Countdown Timer & Event Tracker",
    description:
      "Create a live-updating countdown for any event or deadline. A free, precise online timer to track the days, hours, and minutes until your big moment.",
    url: "/tools/countdown",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "Countdown Timer Tool",
      },
    ],
  },
};

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Countdown Timer</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Create a precise, live-updating countdown to any future date and time.</p>
      </div>
      <CountdownTimer />

      <ToolInfoTabs
        description={
          <section>
            <h2 className="text-3xl font-bold mb-6">Why use a Countdown Timer?</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                Countdown timers are powerful tools for building anticipation and managing deadlines. Whether you are tracking the time remaining until a product launch, a high-stakes exam, or a personal milestone like a wedding or vacation, seeing the seconds tick down helps you stay focused and organized.
              </p>
              <p>
                In professional settings, a countdown can serve as a visual motivator for project deadlines, helping teams visualize the remaining time and prioritize tasks effectively. On a personal level, it adds excitement to upcoming events and helps you stay on top of your schedule.
              </p>
            </div>
          </section>
        }
        howToUse={
          <section>
            <h2 className="text-3xl font-bold mb-6">How to Create Your Countdown</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                Our online countdown tool is designed for simplicity and precision. To get started:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Select a Date:</strong> Use the calendar picker to choose the specific day of your event.</li>
                <li><strong>Set the Time:</strong> Fine-tune the countdown by selecting the exact hour and minute the event begins.</li>
                <li><strong>Live Updates:</strong> Once set, the timer will update every second, showing the remaining days, hours, minutes, and seconds in real-time.</li>
              </ul>
              <p>
                This tool works directly in your browser, requiring no downloads or account setup, making it the perfect quick-access utility for any time-tracking need.
              </p>
            </div>
          </section>
        }
      />
    </div>
  );
}
