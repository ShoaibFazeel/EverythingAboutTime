import UnixTime from "@/components/tools/UnixTime";
import ToolInfoTabs from "@/components/tools/ToolInfoTabs";

export const metadata = {
  title: "Unix Timestamp Converter | Epoch Time Tool",
  description: "Get the current live Unix timestamp and easily convert between epoch time and human-readable dates. Fast, accurate, and free online Unix time converter tool.",
  keywords: [
    "unix timestamp",
    "epoch converter",
    "unix time converter",
    "timestamp to date",
  ],
  alternates: {
    canonical: "/tools/unix-time",
  },
  openGraph: {
    title: "Unix Timestamp Converter | Epoch Time Tool",
    description: "Get the current live Unix timestamp and easily convert between epoch time and human-readable dates. Fast, accurate, and free online Unix time converter tool.",
    url: "/tools/unix-time",
    siteName: "Everything About Time",
    type: "website",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "Unix Timestamp Converter Tool",
      },
    ],
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Unix Timestamp</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          View the live Unix epoch time, convert timestamps to human-readable dates, and back again instantly.
        </p>
      </div>
      <UnixTime />

      <ToolInfoTabs
        description={
          <section>
            <h2 className="text-3xl font-bold mb-6">What is Unix Time?</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                Unix time (also known as POSIX time or Epoch time) is a system for describing a point in time. It is the number of seconds that have elapsed since the <strong>Unix Epoch</strong>, minus leap seconds. The Unix Epoch is 00:00:00 UTC on 1 January 1970.
              </p>
              <p>
                This system is widely used in computing because it represents time as a single integer, making it easy for computers to store, sort, and manipulate dates across different platforms and programming languages.
              </p>
            </div>
          </section>
        }
        howToUse={
          <section>
            <h2 className="text-3xl font-bold mb-6">How to use the Unix Converter</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70">
              <p>
                Our free online Unix timestamp tool provides a real-time display of the current epoch time. You can use it in two main ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Convert Timestamp to Date:</strong> Paste any Unix timestamp into the converter to instantly see the human-readable date and time in your local time zone and UTC.</li>
                <li><strong>Convert Date to Timestamp:</strong> Select a specific date and time to generate its corresponding Unix integer, perfect for database entries or API requests.</li>
              </ul>
              <p>
                Whether you are a developer debugging a server log or a data analyst processing time-series data, this tool provides the accuracy and speed you need.
              </p>
            </div>
          </section>
        }
      />
    </div>
  );
}
