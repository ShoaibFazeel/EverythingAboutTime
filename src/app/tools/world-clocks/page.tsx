import WorldClocks from "@/components/tools/WorldClocks";

export const metadata = {
  title: "World Clocks | Everything about time",
  description: "A fast, modern world clocks tool to observe and sync multiple time zones simultaneously.",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">World Clocks</h1>
        <p className="text-lg text-foreground/70">Observe multiple time zones and adjust one to instantly see the relative time everywhere else.</p>
      </div>
      <WorldClocks />
    </div>
  );
}
