import AddSubtractTime from "@/components/tools/AddSubtractTime";

export const metadata = {
  title: "Add or Subtract Time | Date Time Calculator",
  description:
    "Add or subtract years, months, days, hours, and minutes from any date and time with this easy online calculator.",
  keywords: [
    "add subtract time",
    "date time calculator",
    "date add subtract",
    "time math tool",
  ],
  alternates: {
    canonical: "/tools/add-subtract-time",
  },
  openGraph: {
    title: "Add or Subtract Time | Date Time Calculator",
    description:
      "Add or subtract years, months, days, hours, and minutes from any date and time with this easy online calculator.",
    url: "/tools/add-subtract-time",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "Add or Subtract Time Calculator",
      },
    ],
  },
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
