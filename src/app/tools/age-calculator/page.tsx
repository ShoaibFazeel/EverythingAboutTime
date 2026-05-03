import AgeCalculator from "@/components/tools/AgeCalculator";

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
    url: "/tools/age-calculator",
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
    </div>
  );
}
