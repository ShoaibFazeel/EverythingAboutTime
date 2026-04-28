import AddSubtractTime from "@/components/tools/AddSubtractTime";

export const metadata = {
  title: "Add/Subtract Time | Everything About Time",
  description: "Easily add or subtract years, months, days, and times to a given date.",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Add or Subtract Time</h1>
        <p className="text-lg text-foreground/70 max-w-2xl">Use this calculator to easily find out what date and time it will be if you add or subtract an exact duration.</p>
      </div>
      <AddSubtractTime />
    </div>
  );
}
