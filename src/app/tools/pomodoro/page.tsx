import PomodoroTimer from "@/components/tools/PomodoroTimer";
import ToolInfoTabs from "@/components/tools/ToolInfoTabs";

export const metadata = {
  title: "Pomodoro Focus Timer for Productivity",
  description:
    "Boost your focus with our free online Pomodoro timer. Use the 25/5 rule to manage your work and breaks for maximum productivity.",
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
    title: "Pomodoro Focus Timer for Productivity",
    description:
      "Boost your focus with our free online Pomodoro timer. Use the 25/5 rule to manage your work and breaks for maximum productivity.",
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

      <ToolInfoTabs
        description={
          <section>
            <h2 className="text-3xl font-bold mb-6">What is the Pomodoro Technique?</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                The <strong>Pomodoro Technique</strong> is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a <em>pomodoro</em>, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student.
              </p>
              <p>
                The technique is based on the idea that frequent breaks can improve mental agility and focus. By working in short, focused bursts, you reduce the impact of internal and external interruptions and maintain a high level of productivity throughout the day.
              </p>
            </div>
          </section>
        }
        howToUse={
          <section>
            <h2 className="text-3xl font-bold mb-6">How to Use the Pomodoro Timer</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                Our free online Pomodoro timer is pre-configured to follow the standard 25/5 rule, but it is flexible enough for any workflow:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>The Focus Session:</strong> Start the timer and work on a single task with zero distractions for 25 minutes.</li>
                <li><strong>The Short Break:</strong> When the timer rings, take a 5-minute break. Step away from your desk, stretch, or grab a glass of water.</li>
                <li><strong>The Long Break:</strong> After completing four focus sessions, take a longer break of 15-30 minutes to fully recharge.</li>
              </ul>
              <p>
                By using this structured approach, you can avoid burnout and ensure that your brain stays fresh and capable of deep work for longer periods.
              </p>
            </div>
          </section>
        }
      />
    </div>
  );
}
