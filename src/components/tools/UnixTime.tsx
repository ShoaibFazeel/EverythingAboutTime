"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import DateTimePicker from "@/components/ui/DateTimePicker";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-2 rounded-lg hover:bg-foreground/10 transition-colors text-foreground/50 hover:text-primary">
      {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

/** Format a Date to the local datetime-local input format: "YYYY-MM-DDTHH:mm" */
function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
}

export default function UnixTime() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [inputUnix, setInputUnix] = useState("");
  const [inputHumanPicker, setInputHumanPicker] = useState("");

  const [convertedUnixResult, setConvertedUnixResult] = useState<{ gmt: string; local: string; seconds: string; ms: string } | null>(null);
  const [convertedHumanResult, setConvertedHumanResult] = useState<{ seconds: string; ms: string } | null>(null);

  const [unixError, setUnixError] = useState<string | null>(null);
  const [humanError, setHumanError] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const d = new Date();
    setNow(d);
    setInputHumanPicker(toLocalInputValue(d));
    intervalRef.current = setInterval(() => setNow(new Date()), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const unixSeconds = mounted && now ? Math.floor(now.getTime() / 1000) : null;
  const unixMs = mounted && now ? now.getTime() : null;

  // Unix → Human
  const handleConvertUnixToHuman = () => {
    const val = inputUnix.trim();
    if (!val) return;
    const num = Number(val);
    if (isNaN(num)) { setUnixError("Invalid number"); setConvertedUnixResult(null); return; }
    const date = new Date(num > 9_999_999_999 ? num : num * 1000);
    if (isNaN(date.getTime())) { setUnixError("Invalid timestamp"); setConvertedUnixResult(null); return; }
    setUnixError(null);
    setConvertedUnixResult({
      gmt: date.toUTCString(),
      local: date.toLocaleString(undefined, { dateStyle: "full", timeStyle: "long" }),
      seconds: String(Math.floor(date.getTime() / 1000)),
      ms: String(date.getTime()),
    });
  };

  // Human → Unix — from the date/time picker
  const handleConvertHumanPickerToUnix = (pickerVal: string) => {
    setInputHumanPicker(pickerVal);
    if (!pickerVal) return;
    const date = new Date(pickerVal);
    if (isNaN(date.getTime())) return;
    setHumanError(null);
    setConvertedHumanResult({
      seconds: String(Math.floor(date.getTime() / 1000)),
      ms: String(date.getTime()),
    });
  };

  const fmt = (d: Date | null, tz: string) => {
    if (!d) return "—";
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short", year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
    }).format(d);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" suppressHydrationWarning>

      {/* Live Unix Counter */}
      <div className="glass rounded-3xl p-8 text-center">
        <div className="text-xs uppercase tracking-widest font-bold text-foreground/40 mb-4">Current Unix Timestamp (Live)</div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-5xl md:text-6xl font-mono font-extrabold tracking-tighter text-primary tabular-nums">
            {unixSeconds?.toLocaleString() ?? "—"}
          </span>
          <CopyButton value={String(unixSeconds ?? "")} />
        </div>
        <div className="text-sm text-foreground/50 font-mono mb-6 flex items-center justify-center gap-2">
          <span className="text-foreground/40">ms:</span>
          <span>{unixMs?.toLocaleString() ?? "—"}</span>
          <CopyButton value={String(unixMs ?? "")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-sm">
          {["UTC", Intl.DateTimeFormat().resolvedOptions().timeZone].map((tz) => (
            <div key={tz} className="bg-foreground/5 rounded-2xl p-4">
              <div className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-1">{tz === "UTC" ? "UTC" : "Your Local Time"}</div>
              <div className="font-semibold">{fmt(now, tz)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Converters */}
      <div className="grid grid-cols-1 md:grid-cols-[13fr_7fr] gap-6">

        {/* Unix → Human */}
        <div className="glass rounded-3xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold">Unix → Human Date</h3>
          <input
            type="text"
            value={inputUnix}
            onChange={(e) => setInputUnix(e.target.value)}
            placeholder="e.g. 1713974400"
            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 font-mono text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleConvertUnixToHuman()}
          />
          {unixError && <p className="text-sm text-red-500">{unixError}</p>}
          <button
            onClick={handleConvertUnixToHuman}
            className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Convert
          </button>

          {convertedUnixResult && (
            <div className="flex flex-col gap-2">
              {/* GMT row */}
              <div className="bg-foreground/5 rounded-2xl p-4 text-sm font-mono relative">
                <span className="absolute top-2 left-3 text-[10px] font-bold uppercase tracking-widest text-foreground/40 select-none">GMT</span>
                <div className="mt-4 pr-10 leading-snug break-all">{convertedUnixResult.gmt}</div>
                <div className="absolute top-3 right-3"><CopyButton value={convertedUnixResult.gmt} /></div>
              </div>
              {/* Local row */}
              <div className="bg-foreground/5 rounded-2xl p-4 text-sm font-mono relative">
                <span className="absolute top-2 left-3 text-[10px] font-bold uppercase tracking-widest text-foreground/40 select-none">Local</span>
                <div className="mt-4 pr-10 leading-snug break-all">{convertedUnixResult.local}</div>
                <div className="absolute top-3 right-3"><CopyButton value={convertedUnixResult.local} /></div>
              </div>
            </div>
          )}
        </div>

        {/* Human → Unix */}
        <div className="glass rounded-3xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold">Human Date → Unix</h3>

          <DateTimePicker
            value={inputHumanPicker}
            onChange={handleConvertHumanPickerToUnix}
            label="Pick Date & Time"
            accentColor="accent"
          />

          {humanError && <p className="text-sm text-red-500">{humanError}</p>}

          <button
            onClick={() => {
              if (inputHumanPicker) {
                handleConvertHumanPickerToUnix(inputHumanPicker);
              } else {
                const d = new Date();
                handleConvertHumanPickerToUnix(toLocalInputValue(d));
              }
            }}
            className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Convert
          </button>

          {convertedHumanResult && (
            <div className="flex flex-col gap-2">
              {/* 32-bit overflow warning */}
              {Number(convertedHumanResult.seconds) > 2_147_483_647 && (
                <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-xs text-amber-600 dark:text-amber-400">
                  <span className="text-base leading-none">⚠️</span>
                  <span><strong>Exceeds 32-bit Unix max</strong> (Jan 19, 2038 at 03:14:07 UTC). Systems using signed 32-bit integers will overflow.</span>
                </div>
              )}
              <div className="bg-foreground/5 rounded-2xl p-4 text-sm font-mono leading-relaxed relative">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 block">Seconds</span>
                      <span className="text-base font-extrabold tabular-nums">{convertedHumanResult.seconds}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 block">Milliseconds</span>
                      <span className="text-base font-extrabold tabular-nums">{convertedHumanResult.ms}</span>
                    </div>
                  </div>
                  <CopyButton value={`Seconds: ${convertedHumanResult.seconds}\nMilliseconds: ${convertedHumanResult.ms}`} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reference Card */}
      <div className="glass rounded-3xl p-6">
        <h3 className="text-base font-bold mb-4 text-foreground/60 uppercase tracking-widest">Quick Reference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { label: "Unix Epoch", value: "Jan 1, 1970 UTC" },
            { label: "Max 32-bit Unix", value: "Jan 19, 2038" },
            { label: "Seconds precision", value: "10 digits" },
            { label: "Milliseconds", value: "13 digits" },
          ].map((item) => (
            <div key={item.label} className="bg-foreground/5 rounded-2xl p-4">
              <div className="text-xs text-foreground/40 font-bold uppercase tracking-wide mb-1">{item.label}</div>
              <div className="font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
