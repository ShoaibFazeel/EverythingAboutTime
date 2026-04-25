import AgeCalculator from "@/components/tools/AgeCalculator";

export const metadata = {
  title: "Age Calculator | Everything about time",
  description: "Calculate your exact age and find out how many days until your next birthday.",
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
