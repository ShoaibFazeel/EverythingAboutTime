import UnixTime from "@/components/tools/UnixTime";

export const metadata = {
  title: "Unix Timestamp | Everything About Time",
  description: "Live Unix timestamp, convert Unix to human date, and human date to Unix timestamp instantly.",
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
