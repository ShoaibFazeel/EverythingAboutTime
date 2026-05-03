import TimeDifference from "@/components/tools/TimeDifference";

export const metadata = {
  title: "Time Difference Calculator | Date Duration Tool",
  description:
    "Calculate the exact difference between two dates and times in years, months, days, hours, minutes, and seconds.",
  keywords: [
    "time difference calculator",
    "date difference",
    "duration calculator",
    "time interval",
  ],
  alternates: {
    canonical: "/tools/time-difference",
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
    </div>
  );
}
