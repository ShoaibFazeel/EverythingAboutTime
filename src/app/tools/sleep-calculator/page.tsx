import SleepCalculator from "@/components/tools/SleepCalculator";
import FaqSchema from "@/components/SEO/FaqSchema";

export const metadata = {
  title: "Sleep Cycle Calculator | Everything About Time",
  description: "Find your optimal bedtimes and wake times based on natural 90-minute sleep cycles.",
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
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Sleep Calculator</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Wake up between natural 90-minute sleep cycles to avoid grogginess and start your day energized.</p>
      </div>
      <SleepCalculator />
      {/* <div className="max-w-4xl mx-auto mt-16">
        <FaqSchema faqs={faqs} />
      </div> */}
    </div>
  );
}
