import AddSubtractTime from "@/components/tools/AddSubtractTime";
import ToolInfoTabs from "@/components/tools/ToolInfoTabs";
import Script from "next/script";

export const metadata = {
  title: "Add or Subtract Time & Date Calculator",
  description: "Easily add or subtract years, months, days, hours, and minutes from any date. A precise time math calculator for planning and duration adjustments.",
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
    title: "Add or Subtract Time & Date Calculator",
    description: "Easily add or subtract years, months, days, hours, and minutes from any date. A precise time math calculator for planning and duration adjustments.",
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Add or Subtract Time & Date Calculator",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "description": metadata.description,
    "url": `${siteUrl}/tools/add-subtract-time`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Script
        id="schema-add-subtract"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">Add or Subtract Time</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto sm:mx-0">Use this calculator to easily find out what date and time it will be if you add or subtract an exact duration.</p>
      </div>
      <AddSubtractTime />

      <ToolInfoTabs
        description={
          <section>
            <h2 className="text-3xl font-bold mb-6">Simplify Your Time Calculations</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                Calculating future or past dates by adding or subtracting specific durations can be surprisingly tricky. Between varying month lengths and the extra day in leap years, it is easy to make a mistake when doing the math in your head. Our <strong>Add or Subtract Time</strong> tool takes the guesswork out of the process.
              </p>
              <p>
                By providing a simple interface to input years, months, days, hours, and minutes, we allow you to instantly determine the exact resulting date and time. This tool uses standard calendar logic to ensure that every calculation is accurate down to the minute.
              </p>
            </div>
          </section>
        }
        howToUse={
          <section>
            <h2 className="text-3xl font-bold mb-6">When to Use Time Addition & Subtraction</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                This calculator is a versatile utility for many different types of planning and analysis:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Project Deadlines:</strong> Determine exactly when a project phase will end if it takes 45 days and 6 hours from a specific start date.</li>
                <li><strong>Event Planning:</strong> Find out the exact date of an event that occurs "18 months from now" or track back to see what the date was 100 days ago.</li>
                <li><strong>Legal & Financial:</strong> Calculate the exact expiration date of a contract or the maturity date of an investment with a specific term.</li>
              </ul>
              <p>
                Simply enter your starting date and the duration you wish to add or subtract, and our tool will provide the precise result immediately.
              </p>
            </div>
          </section>
        }
      />
    </div>
    </>
  );
}
