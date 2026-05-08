import TimeDifference from "@/components/tools/TimeDifference";
import ToolInfoTabs from "@/components/tools/ToolInfoTabs";

export const metadata = {
  title: "Time Difference & Duration Calculator",
  description: "Calculate the exact duration between two dates and times. Get results in years, months, days, and seconds with our free online duration tool.",
  keywords: [
    "time difference",
    "duration calculator",
    "time between dates",
    "date difference tool",
  ],
  alternates: {
    canonical: "/tools/time-difference",
  },
  openGraph: {
    title: "Time Difference & Duration Calculator",
    description: "Calculate the exact duration between two dates and times. Get results in years, months, days, and seconds with our free online duration tool.",
    url: "/tools/time-difference",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "Time Difference Calculator Tool",
      },
    ],
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Time Difference Calculator</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Quickly determine the exact duration between two dates in years, months, days, and seconds.</p>
      </div>
      <TimeDifference />

      <ToolInfoTabs
        description={
          <section>
            <h2 className="text-3xl font-bold mb-6">Calculating Precise Durations</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                Calculating the exact duration between two points in time is more than just subtracting numbers. Factors like different month lengths (28 to 31 days) and leap years make manual calculations prone to error. Our <strong>Time Difference Calculator</strong> is built to handle these complexities with mathematical precision.
              </p>
              <p>
                Whether you need to know the duration in years, months, and days, or a specific total in minutes or seconds, our tool provides an instant, detailed breakdown. This ensures you have the exact data required for planning, documentation, or historical analysis.
              </p>
            </div>
          </section>
        }
        howToUse={
          <section>
            <h2 className="text-3xl font-bold mb-6">Practical Use Cases</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                The ability to quickly measure time intervals is useful in a variety of personal and professional scenarios:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Project Management:</strong> Calculate the exact time spent between project milestones or determine the total duration of a specific phase.</li>
                <li><strong>HR and Payroll:</strong> Easily determine the length of service for an employee or the exact time between two shifts for compliance.</li>
                <li><strong>Event Planning:</strong> Track the time remaining until a major event or calculate how much time has passed since a significant historical date.</li>
              </ul>
              <p>
                Simply select your start and end dates, and let our tool provide the most accurate time interval measurement available online.
              </p>
            </div>
          </section>
        }
      />
    </div>
  );
}
