"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Globe, Search, Check, ChevronDown, X } from "lucide-react";

export interface TimezoneOption {
  value: string;
  label: string;
  region: string;
}

export const ALL_TIMEZONES: TimezoneOption[] = [
  { value: "UTC", label: "UTC — Coordinated Universal Time", region: "Universal" },
  { value: "America/Anchorage",    label: "Anchorage",         region: "Americas" },
  { value: "America/Los_Angeles",  label: "Los Angeles",       region: "Americas" },
  { value: "America/Denver",       label: "Denver",            region: "Americas" },
  { value: "America/Phoenix",      label: "Phoenix",           region: "Americas" },
  { value: "America/Chicago",      label: "Chicago",           region: "Americas" },
  { value: "America/New_York",     label: "New York",          region: "Americas" },
  { value: "America/Toronto",      label: "Toronto",           region: "Americas" },
  { value: "America/Halifax",      label: "Halifax",           region: "Americas" },
  { value: "America/St_Johns",     label: "St. John's",        region: "Americas" },
  { value: "America/Sao_Paulo",    label: "São Paulo",         region: "Americas" },
  { value: "America/Argentina/Buenos_Aires", label: "Buenos Aires", region: "Americas" },
  { value: "America/Santiago",     label: "Santiago",          region: "Americas" },
  { value: "America/Lima",         label: "Lima",              region: "Americas" },
  { value: "America/Bogota",       label: "Bogotá",            region: "Americas" },
  { value: "America/Mexico_City",  label: "Mexico City",       region: "Americas" },
  { value: "America/Vancouver",    label: "Vancouver",         region: "Americas" },
  { value: "Europe/London",        label: "London",            region: "Europe" },
  { value: "Europe/Lisbon",        label: "Lisbon",            region: "Europe" },
  { value: "Europe/Paris",         label: "Paris",             region: "Europe" },
  { value: "Europe/Amsterdam",     label: "Amsterdam",         region: "Europe" },
  { value: "Europe/Berlin",        label: "Berlin",            region: "Europe" },
  { value: "Europe/Rome",          label: "Rome",              region: "Europe" },
  { value: "Europe/Madrid",        label: "Madrid",            region: "Europe" },
  { value: "Europe/Stockholm",     label: "Stockholm",         region: "Europe" },
  { value: "Europe/Warsaw",        label: "Warsaw",            region: "Europe" },
  { value: "Europe/Athens",        label: "Athens",            region: "Europe" },
  { value: "Europe/Helsinki",      label: "Helsinki",          region: "Europe" },
  { value: "Europe/Istanbul",      label: "Istanbul",          region: "Europe" },
  { value: "Europe/Moscow",        label: "Moscow",            region: "Europe" },
  { value: "Europe/Kiev",          label: "Kyiv",              region: "Europe" },
  { value: "Europe/Zurich",        label: "Zurich",            region: "Europe" },
  { value: "Africa/Cairo",         label: "Cairo",             region: "Africa" },
  { value: "Africa/Johannesburg",  label: "Johannesburg",      region: "Africa" },
  { value: "Africa/Nairobi",       label: "Nairobi",           region: "Africa" },
  { value: "Africa/Lagos",         label: "Lagos",             region: "Africa" },
  { value: "Africa/Casablanca",    label: "Casablanca",        region: "Africa" },
  { value: "Asia/Dubai",           label: "Dubai",             region: "Asia" },
  { value: "Asia/Riyadh",          label: "Riyadh",            region: "Asia" },
  { value: "Asia/Tehran",          label: "Tehran",            region: "Asia" },
  { value: "Asia/Karachi",         label: "Karachi",           region: "Asia" },
  { value: "Asia/Kolkata",         label: "Mumbai / New Delhi", region: "Asia" },
  { value: "Asia/Colombo",         label: "Colombo",           region: "Asia" },
  { value: "Asia/Dhaka",           label: "Dhaka",             region: "Asia" },
  { value: "Asia/Yangon",          label: "Yangon",            region: "Asia" },
  { value: "Asia/Bangkok",         label: "Bangkok",           region: "Asia" },
  { value: "Asia/Ho_Chi_Minh",     label: "Ho Chi Minh City",  region: "Asia" },
  { value: "Asia/Singapore",       label: "Singapore",         region: "Asia" },
  { value: "Asia/Kuala_Lumpur",    label: "Kuala Lumpur",      region: "Asia" },
  { value: "Asia/Shanghai",        label: "Beijing / Shanghai", region: "Asia" },
  { value: "Asia/Hong_Kong",       label: "Hong Kong",         region: "Asia" },
  { value: "Asia/Taipei",          label: "Taipei",            region: "Asia" },
  { value: "Asia/Manila",          label: "Manila",            region: "Asia" },
  { value: "Asia/Tokyo",           label: "Tokyo",             region: "Asia" },
  { value: "Asia/Seoul",           label: "Seoul",             region: "Asia" },
  { value: "Australia/Perth",      label: "Perth",             region: "Pacific" },
  { value: "Australia/Darwin",     label: "Darwin",            region: "Pacific" },
  { value: "Australia/Adelaide",   label: "Adelaide",          region: "Pacific" },
  { value: "Australia/Sydney",     label: "Sydney",            region: "Pacific" },
  { value: "Australia/Brisbane",   label: "Brisbane",          region: "Pacific" },
  { value: "Pacific/Auckland",     label: "Auckland",          region: "Pacific" },
];

function getGMTOffset(tz: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" }).formatToParts(new Date()).find(p => p.type === "timeZoneName")?.value ?? "";
  } catch { return ""; }
}

export default function TimezoneSelect({ value, onChange, label, inline = false }: { value: string, onChange: (val: string) => void, label?: string, inline?: boolean }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const enriched = useMemo(() => ALL_TIMEZONES.map(tz => ({ ...tz, offset: getGMTOffset(tz.value) })), []);
  
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return enriched;
    return enriched.filter(t => t.label.toLowerCase().includes(q) || t.value.toLowerCase().includes(q) || t.region.toLowerCase().includes(q) || t.offset.toLowerCase().includes(q));
  }, [search, enriched]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const t of filtered) {
      if (!map.has(t.region)) map.set(t.region, []);
      map.get(t.region)!.push(t);
    }
    return map;
  }, [filtered]);

  const selected = enriched.find(t => t.value === value);

  useEffect(() => {
    if (open && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-2">{label}</label>}

      <div className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${open ? "border-primary/30 bg-foreground/[0.02]" : "border-foreground/10 bg-foreground/5 hover:border-foreground/25"}`}>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all"
        >
          <Globe className={`w-4 h-4 flex-shrink-0 ${open ? "text-primary" : "text-foreground/40"}`} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{selected?.label ?? value}</div>
          </div>
          <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md flex-shrink-0">
            {selected?.offset ?? ""}
          </span>
          <div className={`p-1 rounded-full transition-transform duration-300 ${open ? "rotate-180 bg-foreground/10" : "bg-transparent"}`}>
            <ChevronDown className="w-3.5 h-3.5 text-foreground/40" />
          </div>
        </button>

        {open && (
          <div className="flex flex-col border-t border-foreground/5 animate-in slide-in-from-top-2 duration-300">
            {/* Search */}
            <div className="p-3 bg-foreground/[0.02]">
              <div className="flex items-center gap-2 bg-foreground/5 rounded-xl px-3 py-2 border border-foreground/5">
                <Search className="w-3.5 h-3.5 text-foreground/40" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search timezone..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/30 font-medium"
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto overscroll-contain divide-y divide-foreground/5">
              {Array.from(grouped.entries()).map(([region, tzs]) => (
                <div key={region}>
                  <div className="sticky top-0 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-foreground/30 bg-background/90 backdrop-blur-sm z-10">
                    {region}
                  </div>
                  {tzs.map(tz => {
                    const isActive = tz.value === value;
                    return (
                      <button
                        key={tz.value}
                        type="button"
                        onClick={() => { onChange(tz.value); setOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-primary/5 ${isActive ? "bg-primary/10" : ""}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-semibold truncate ${isActive ? "text-primary" : "text-foreground"}`}>{tz.label}</div>
                          <div className="text-[10px] text-foreground/40 font-mono truncate">{tz.value}</div>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-foreground/40">{tz.offset}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-foreground/5 flex justify-end">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-xs font-bold transition-all flex items-center gap-2">
                <X className="w-3.5 h-3.5" /> Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
