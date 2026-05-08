import AgeCalculator from "@/components/tools/AgeCalculator";
import ToolInfoTabs from "@/components/tools/ToolInfoTabs";

export const metadata = {
  title: "Age Calculator | Exact Age in Years, Months, Days",
  description:
    "Calculate exact age from date of birth and see years, months, and days instantly. Also check time remaining until your next birthday.",
  keywords: [
    "age calculator",
    "calculate age",
    "birthday calculator",
    "dob age tool",
  ],
  alternates: {
    canonical: "/tools/age-calculator",
  },
  openGraph: {
    title: "Age Calculator | Exact Age in Years, Months, Days",
    description:
      "Calculate exact age from date of birth and see years, months, and days instantly. Also check time remaining until your next birthday.",
    url: "/tools/age-calculator",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "Age Calculator Tool",
      },
    ],
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Age Calculator</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Discover exactly how long you've been alive in years, months, and days.</p>
      </div>
      <AgeCalculator />

      <ToolInfoTabs
        description={
          <section>
            <h2 className="text-3xl font-bold mb-6">Precise Age Calculation</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                While most people know their age in years, calculating the exact time elapsed since your birth in months, weeks, and days can be quite complex due to varying month lengths and leap years. Our <strong>Age Calculator</strong> automates this process, providing you with a highly accurate breakdown of your age.
              </p>
              <p>
                This tool uses standard chronological rules to ensure that every day is accounted for. It is particularly useful for administrative forms, medical records, or simply satisfying your curiosity about exactly how many days you have been part of the world.
              </p>
            </div>
          </section>
        }
        howToUse={
          <section>
            <h2 className="text-3xl font-bold mb-6">Why use an Age Calculator?</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                Beyond just knowing your current age, there are several practical applications for a precise age calculation tool:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Milestone Tracking:</strong> Easily see how many days are left until a significant birthday or anniversary.</li>
                <li><strong>Legal & Administrative:</strong> Quickly verify if someone meets specific age requirements for insurance, licensing, or legal documentation.</li>
                <li><strong>Health & Development:</strong> Parents often use this to track the exact age of children in months or days for developmental milestones.</li>
              </ul>
              <p>
                Simply enter your date of birth, and our tool will handle all the complex math, including leap year adjustments, to give you an instant result.
              </p>
            </div>
          </section>
        }
      />
    </div>
  );
}
