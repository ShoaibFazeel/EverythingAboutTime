import AgeCalculator from "@/components/tools/AgeCalculator";
import ToolInfoTabs from "@/components/tools/ToolInfoTabs";
import Script from "next/script";

export const metadata = {
  title: "Age Calculator: Years, Months & Days",
  description:
    "Discover exactly how long you've been alive in years, months, and days. A free, precise age calculation tool for milestones and records.",
  keywords: [
    "age calculator",
    "calculate age",
    "exact age tool",
    "how old am i",
  ],
  alternates: {
    canonical: "/tools/age-calculator",
  },
  openGraph: {
    title: "Age Calculator: Years, Months & Days",
    description:
      "Discover exactly how long you've been alive in years, months, and days. A free, precise age calculation tool for milestones and records.",
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Age Calculator: Years, Months & Days",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "description": metadata.description,
    "url": `${siteUrl}/tools/age-calculator`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Script
        id="schema-age-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Age Calculator</h1>
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
    </>
  );
}
