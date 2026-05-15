"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, Clock, ChevronUp, ChevronDown, Check, X, RefreshCw } from "lucide-react";

interface DateTimePickerProps {
  value: string; // "YYYY-MM-DDTHH:mm"
  onChange: (val: string) => void;
  label?: string;
  accentColor?: "primary" | "accent";
  dateOnly?: boolean;
}

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function pad(n: number) { return String(n).padStart(2, "0"); }

function parseValue(val: string, dateOnly?: boolean) {
  const raw = val ? (dateOnly && !val.includes("T") ? val + "T12:00" : val) : "";
  let d = new Date(raw);
  if (isNaN(d.getTime())) d = new Date();
  return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate(), hour: d.getHours(), minute: d.getMinutes() };
}

function toInputValue(year: number, month: number, day: number, hour: number, minute: number, dateOnly?: boolean) {
  if (dateOnly) return `${year}-${pad(month + 1)}-${pad(day)}`;
  return `${year}-${pad(month + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}`;
}

export default function DateTimePicker({ value, onChange, label, accentColor = "primary", dateOnly = false }: DateTimePickerProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"date" | "time">("date");

  // Internal state for the picker values
  const [internal, setInternal] = useState(() => parseValue(value, dateOnly));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync internal state when parent value changes AND picker is closed
  useEffect(() => {
    if (!open) {
      setInternal(parseValue(value, dateOnly));
    }
  }, [value, open, dateOnly]);

  const { year, month, day, hour, minute } = internal;
  const isPM = hour >= 12;
  const h12 = hour % 12 || 12;

  const update = (patch: Partial<typeof internal>) => {
    setInternal(prev => {
        const next = { ...prev, ...patch };
        const maxDays = new Date(next.year, next.month + 1, 0).getDate();
        if (next.day > maxDays) next.day = maxDays;
        return next;
    });
  };

  const handleDone = () => {
    onChange(toInputValue(year, month, day, hour, minute, dateOnly));
    setOpen(false);
  };

  const handleNow = () => {
    const d = new Date();
    update({ year: d.getFullYear(), month: d.getMonth(), day: d.getDate(), hour: d.getHours(), minute: d.getMinutes() });
  };

  const colorCls = accentColor === "accent" ? "text-accent" : "text-primary";
  const bgHighlight = accentColor === "accent" ? "bg-accent" : "bg-primary";

  // Individual Column Component (Counter Style)
  const CounterColumn = ({ label, value, onUp, onDown, width = "w-16" }: { label: string, value: string | number, onUp: () => void, onDown: () => void, width?: string }) => (
    <div className={`flex flex-col items-center gap-1.5 ${width}`}>
      <button 
        onClick={onUp}
        className="p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/40 hover:text-foreground transition-all active:scale-90"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
      <div className="flex flex-col items-center relative group/col">
        <div className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-t from-transparent to-card/0 pointer-events-none" />
        <div className="text-xl font-mono font-black text-foreground transition-all duration-200 group-hover/col:scale-110 group-hover/col:text-primary">{value}</div>
        <span className="text-[7px] font-bold uppercase tracking-widest text-foreground/20 leading-none mt-1">{label}</span>
        <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-card/0 pointer-events-none" />
      </div>
      <button 
        onClick={onDown}
        className="p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/40 hover:text-foreground transition-all active:scale-90"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );

  const displayDate = mounted && value
    ? new Date(dateOnly && !value.includes("T") ? value + "T12:00" : value).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })
    : "Pick a date";
  const displayTime = mounted && value ? `${pad(hour)}:${pad(minute)}` : "--:--";

  return (
    <div className="w-full flex flex-col gap-2 relative" suppressHydrationWarning ref={containerRef}>
      {label && <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-2">{label}</label>}

      {/* Trigger / Expandable Input */}
      <div className={`group relative rounded-2xl border transition-all duration-300 ${open ? `border-${accentColor}/30 bg-foreground/[0.02]` : "border-foreground/10 bg-foreground/5 hover:border-foreground/25"}`}>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all rounded-2xl"
        >
          <Calendar className={`w-4 h-4 flex-shrink-0 ${open ? colorCls : "text-foreground/40"}`} />
          <span className="flex-1 text-sm font-semibold truncate">{displayDate}</span>
          {!dateOnly && (
            <span className={`flex items-center gap-1 text-sm font-mono font-bold ${colorCls}`}>
              <Clock className="w-3.5 h-3.5" />
              {displayTime}
            </span>
          )}
          <div className={`p-1 rounded-full transition-transform duration-300 ${open ? "rotate-180 bg-foreground/10" : "bg-transparent"}`}>
            <ChevronDown className="w-3.5 h-3.5 text-foreground/40" />
          </div>
        </button>

        {/* Absolute Expansion Area */}
        {open && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 p-4 bg-card border border-foreground/10 rounded-3xl flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300 shadow-2xl shadow-primary/5">
                {/* Tabs & Quick Select */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        {!dateOnly && (
                            <div className="flex bg-foreground/10 rounded-xl p-1 w-fit">
                                <button 
                                    onClick={() => setTab("date")}
                                    className={`px-6 py-1.5 rounded-lg text-[9px] font-black transition-all ${tab === "date" ? `${bgHighlight} text-white shadow-md` : "text-foreground/30 hover:text-foreground/60"}`}
                                >
                                    DATE
                                </button>
                                <button 
                                    onClick={() => setTab("time")}
                                    className={`px-6 py-1.5 rounded-lg text-[9px] font-black transition-all ${tab === "time" ? `${bgHighlight} text-white shadow-md` : "text-foreground/30 hover:text-foreground/60"}`}
                                >
                                    TIME
                                </button>
                            </div>
                        )}
                        <button 
                            onClick={handleNow}
                            className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 ml-auto"
                        >
                            <RefreshCw className="w-3 h-3" /> SET TO NOW
                        </button>
                    </div>
                </div>

                {/* Counter Grid */}
                <div className="flex justify-center items-center gap-1 bg-foreground/5 rounded-2xl p-4">
                    {tab === "date" ? (
                    <>
                        <CounterColumn label="Month" value={MONTHS_SHORT[month]} onUp={() => update({ month: (month + 1) % 12 })} onDown={() => update({ month: (month + 11) % 12 })} width="w-14" />
                        <div className="w-px h-6 bg-foreground/10" />
                        <CounterColumn label="Day" value={pad(day)} onUp={() => { const max = new Date(year, month + 1, 0).getDate(); update({ day: (day % max) + 1 }); }} onDown={() => { const max = new Date(year, month + 1, 0).getDate(); update({ day: day === 1 ? max : day - 1 }); }} width="w-12" />
                        <div className="w-px h-6 bg-foreground/10" />
                        <CounterColumn label="Year" value={year} onUp={() => update({ year: year + 1 })} onDown={() => update({ year: year - 1 })} width="w-16" />
                    </>
                    ) : (
                    <>
                        <CounterColumn label="Hour" value={pad(h12)} onUp={() => update({ hour: (hour + 1) % 24 })} onDown={() => update({ hour: (hour + 23) % 24 })} width="w-12" />
                        <div className="text-lg font-bold text-foreground/10 pb-4">:</div>
                        <CounterColumn label="Min" value={pad(minute)} onUp={() => update({ minute: (minute + 1) % 60 })} onDown={() => update({ minute: (minute + 59) % 60 })} width="w-12" />
                        <div className="w-px h-6 bg-foreground/10 mx-1" />
                        <button 
                            onClick={() => update({ hour: isPM ? hour - 12 : hour + 12 })}
                            className={`px-3 py-2 rounded-xl font-black text-xs transition-all ${isPM ? "bg-indigo-500/20 text-indigo-500" : "bg-amber-500/20 text-amber-500"}`}
                        >
                            {isPM ? "PM" : "AM"}
                        </button>
                    </>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setOpen(false)}
                        className="p-3 rounded-xl bg-foreground/5 text-foreground/40 hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-95"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={handleDone}
                        className={`flex-1 py-3 rounded-xl ${bgHighlight} text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95`}
                    >
                        Set Changes <Check className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
