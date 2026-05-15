import SleepCalculator from "@/components/tools/SleepCalculator";
import FaqSchema from "@/components/SEO/FaqSchema";
import ToolInfoTabs from "@/components/tools/ToolInfoTabs";

export const metadata = {
  title: "Sleep Cycle Calculator & Bedtime Planner",
  description:
    "Calculate the perfect time to go to bed or wake up based on 90-minute sleep cycles. Avoid morning grogginess and improve sleep quality.",
  keywords: [
    "sleep calculator",
    "sleep cycle",
    "bedtime calculator",
    "wake up time",
  ],
  alternates: {
    canonical: "/tools/sleep-calculator",
  },
  openGraph: {
    title: "Sleep Cycle Calculator & Bedtime Planner",
    description:
      "Calculate the perfect time to go to bed or wake up based on 90-minute sleep cycles. Avoid morning grogginess and improve sleep quality.",
    url: "/tools/sleep-calculator",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator Tool",
      },
    ],
  },
};

const faqs = [
  {
    question: "Why should I wake up at the end of a sleep cycle?",
    answer: "Sleep cycles last approximately 90 minutes. Waking up in the middle of a deep sleep cycle causes sleep inertia, leaving you groggy. Waking up at the end ensures you feel refreshed."
  },
  {
    question: "How long does it take an average person to fall asleep?",
    answer: "The average person takes about 15 to 20 minutes to fall asleep. Our calculator automatically adds a 15-minute buffer to bedtimes to ensure accurate cycle alignments."
  }
];

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Sleep Calculator</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Wake up between natural 90-minute sleep cycles to avoid grogginess and start your day energized.</p>
      </div>
      <SleepCalculator />

      <ToolInfoTabs
        description={
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6">The Science of Sleep Cycles</h2>
              <div className="prose prose-lg dark:prose-invert text-foreground/70">
                <p>
                  When you sleep, your brain goes through several cycles, each consisting of four distinct stages. On average, a single sleep cycle lasts about <strong>90 minutes</strong>. Waking up during the middle of a cycle—especially during deep sleep—can leave you feeling exhausted and groggy, a phenomenon known as <em>sleep inertia</em>.
                </p>
                <p>
                  By timing your wake-up call to coincide with the end of a sleep cycle, you allow your body to transition naturally from light sleep to wakefulness. This helps you feel more alert and energized, even if you've had slightly less total sleep.
                </p>
              </div>
            </section>

            <div className="max-w-4xl mx-auto mt-16 pt-12 border-t border-primary/5">
              <FaqSchema faqs={faqs} />
            </div>
          </div>
        }
        howToUse={
          <section>
            <h2 className="text-3xl font-bold mb-6">Tips for a Better Night's Rest</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                While timing your cycles is important, the quality of your environment also plays a massive role in how well you sleep:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Maintain a Routine:</strong> Go to bed and wake up at the same time every day, even on weekends, to regulate your internal clock.</li>
                <li><strong>Limit Blue Light:</strong> Avoid screens (phones, laptops) for at least 30-60 minutes before bed, as blue light inhibits melatonin production.</li>
                <li><strong>Optimize Your Room:</strong> Ensure your bedroom is cool, dark, and quiet to encourage deeper, uninterrupted sleep.</li>
              </ul>
              <p>
                Use our calculator to find your ideal bedtime based on when you need to wake up, or determine the best wake-up time if you're heading to bed right now.
              </p>
            </div>
          </section>
        }
      />
    </div>
  );
}
