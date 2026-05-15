import StudyTimer from "@/components/tools/StudyTimer";
import ToolInfoTabs from "@/components/tools/ToolInfoTabs";
import Script from "next/script";

export const metadata = {
  title: "Minimal Study Timer for Deep Work",
  description:
    "Improve your academic focus with our free online study timer. Track your learning sessions and maximize efficiency with a minimal, clutter-free stopwatch.",
  keywords: [
    "study timer",
    "deep work tool",
    "learning stopwatch",
    "student productivity",
  ],
  alternates: {
    canonical: "/tools/study-timer",
  },
  openGraph: {
    title: "Minimal Study Timer for Deep Work",
    description:
      "Improve your academic focus with our free online study timer. Track your learning sessions and maximize efficiency with a minimal, clutter-free stopwatch.",
    url: "/tools/study-timer",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "Study Timer Tool",
      },
    ],
  },
};

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Minimal Study Timer for Deep Work",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "description": metadata.description,
    "url": `${siteUrl}/tools/study-timer`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Script
        id="schema-study-timer"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Study Timer</h1>
        <p className="text-lg text-foreground/70 max-w-2xl">Use this minimal stopwatch to track deep work sessions and save them internally.</p>
      </div>
      <StudyTimer />

      <ToolInfoTabs
        description={
          <section>
            <h2 className="text-3xl font-bold mb-6">Maximizing Study Efficiency</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                Success in learning is often more about the <strong>quality</strong> of time spent rather than just the quantity. Deep work, a term coined by Cal Newport, refers to the ability to focus without distraction on a cognitively demanding task. Our <strong>Study Timer</strong> is designed to help you achieve and track these high-value sessions.
              </p>
              <p>
                By timing your study periods, you create a psychological boundary that encourages focus. Seeing the clock run reminds you that you are currently in a dedicated "learning mode," helping you resist the urge to check notifications or browse social media.
              </p>
            </div>
          </section>
        }
        howToUse={
          <section>
            <h2 className="text-3xl font-bold mb-6">How to Use the Study Timer</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                This tool functions as a specialized stopwatch tailored for academic and professional growth:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Track Your Focus:</strong> Start the timer when you begin a task. The minimal interface ensures that the tool itself is never a distraction.</li>
                <li><strong>Save Your Sessions:</strong> Once you finish a session, you can save it to keep a record of your deep work history. This helps you visualize your progress over time.</li>
                <li><strong>Analyze Your Habits:</strong> Use your saved session data to identify your most productive times of day and optimize your study schedule accordingly.</li>
              </ul>
              <p>
                Whether you are preparing for a major exam or working on a complex coding project, this timer provides the structure you need to stay consistent and achieve your goals.
              </p>
            </div>
          </section>
        }
      />
    </div>
    </>
  );
}
