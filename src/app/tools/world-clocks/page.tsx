import WorldClocks from "@/components/tools/WorldClocks";
import ToolInfoTabs from "@/components/tools/ToolInfoTabs";
import Script from "next/script";

export const metadata = {
  title: "World Clocks & Time Zone Converter",
  description: "Track the current time in multiple cities simultaneously. A free online world clock tool with interactive time zone conversion and synchronization.",
  keywords: [
    "world clocks",
    "time zone converter",
    "global time",
    "compare time zones",
  ],
  alternates: {
    canonical: "/tools/world-clocks",
  },
  openGraph: {
    title: "World Clocks & Time Zone Converter",
    description: "Track the current time in multiple cities simultaneously. A free online world clock tool with interactive time zone conversion and synchronization.",
    url: "/tools/world-clocks",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "World Clocks Tool",
      },
    ],
  },
};

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "World Clocks & Time Zone Converter",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "description": metadata.description,
    "url": `${siteUrl}/tools/world-clocks`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Script
        id="schema-world-clocks"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">World Clocks</h1>
        <p className="text-lg text-foreground/70">Observe multiple time zones and adjust one to instantly see the relative time everywhere else.</p>
      </div>
      <WorldClocks />

      <ToolInfoTabs
        description={
          <section>
            <h2 className="text-3xl font-bold mb-6">Global Time Synchronization</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                In our interconnected world, keeping track of time across different continents is a daily requirement for many. From remote teams coordinating meetings to families staying in touch across oceans, understanding time zone differences is essential. Our <strong>World Clocks</strong> tool simplifies this by providing a unified view of multiple regions simultaneously.
              </p>
              <p>
                Unlike standard clocks that only show the current time, our interactive interface allows you to adjust one clock and instantly see the relative time in all other selected cities. This makes it incredibly easy to find the perfect window for a cross-border call or to track a global event.
              </p>
            </div>
          </section>
        }
        howToUse={
          <section>
            <h2 className="text-3xl font-bold mb-6">Why use World Clocks?</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                Managing time zones can be confusing due to Daylight Saving Time (DST) changes and non-standard offsets. Here is how our tool helps:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Meeting Planning:</strong> Quickly identify when it is 9 AM in New York and see what time that corresponds to in London, Tokyo, or Sydney.</li>
                <li><strong>Travel Coordination:</strong> Track the local time of your destination alongside your home time to better manage jet lag and flight schedules.</li>
                <li><strong>Stock Markets & Finance:</strong> Keep an eye on global market opening and closing times across different financial hubs.</li>
              </ul>
              <p>
                Add the cities you care about most and enjoy a streamlined, clutter-free way to stay synchronized with the rest of the world.
              </p>
            </div>
          </section>
        }
      />
    </div>
    </>
  );
}
