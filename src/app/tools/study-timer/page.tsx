import StudyTimer from "@/components/tools/StudyTimer";

export const metadata = {
  title: "Study Timer & Stopwatch | Everything about time",
  description: "Advanced stopwatch and session tracker to help you focus and log your study sessions.",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Study Timer</h1>
        <p className="text-lg text-foreground/70 max-w-2xl">Use this minimal stopwatch to track deep work sessions and save them internally.</p>
      </div>
      <StudyTimer />
    </div>
  );
}
