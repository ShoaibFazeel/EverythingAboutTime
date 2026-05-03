import UnixTime from "@/components/tools/UnixTime";

export const metadata = {
  title: "Unix Timestamp Converter | Epoch Time Tool",
  description:
    "Get the live Unix timestamp and instantly convert Unix epoch time to human-readable date and date to Unix time.",
  keywords: [
    "unix timestamp",
    "epoch converter",
    "unix time converter",
    "timestamp to date",
  ],
  alternates: {
    canonical: "/tools/unix-time",
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
    </div>
  );
}
