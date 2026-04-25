"use client";

import { useState, useRef, useEffect } from "react";
import { Clock, Check, ChevronUp, ChevronDown, X } from "lucide-react";

interface TimePickerProps {
  value: string; // "HH:mm" 24h
  onChange: (val: string) => void;
  label?: string;
  accentColor?: "primary" | "accent";
  hour12?: boolean;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

function parseTime(val: string): { hour: number; minute: number } {
  const [h, m] = (val || "").split(":").map(Number);
  const hour = isNaN(h) ? new Date().getHours() : ((h % 24) + 24) % 24;
  const minute = isNaN(m) ? 0 : ((m % 60) + 60) % 60;
  return { hour, minute };
}

function formatDisplay(hour: number, minute: number, hour12: boolean): string {
  if (!hour12) return `${pad(hour)}:${pad(minute)}`;
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${pad(minute)} ${period}`;
}

export default function TimePicker({ value, onChange, label, accentColor = "primary", hour12 = false }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(() => parseTime(value));

  useEffect(() => {
    if (!open) setInternal(parseTime(value));
  }, [value, open]);

  const { hour, minute } = internal;
  const h12 = hour % 12 || 12;
  const isPM = hour >= 12;

  const handleDone = () => {
    onChange(`${pad(hour)}:${pad(minute)}`);
    setOpen(false);
  };

  const update = (patch: Partial<{ hour: number, minute: number }>) => {
    setInternal(prev => ({ ...prev, ...patch }));
  };

  const colorCls = accentColor === "accent" ? "text-accent" : "text-primary";
  const bgHighlight = accentColor === "accent" ? "bg-accent" : "bg-primary";

  const CounterColumn = ({ label, value, onUp, onDown, width = "w-14" }: { label: string, value: string | number, onUp: () => void, onDown: () => void, width?: string }) => (
    <div className={`flex flex-col items-center gap-1 ${width}`}>
      <button onClick={onUp} className="p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/40 hover:text-foreground transition-all active:scale-90"><ChevronUp className="w-4 h-4" /></button>
      <div className="flex flex-col items-center leading-none">
        <div className="text-lg font-mono font-black text-foreground">{value}</div>
        <span className="text-[7px] font-bold uppercase tracking-widest text-foreground/20">{label}</span>
      </div>
      <button onClick={onDown} className="p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/40 hover:text-foreground transition-all active:scale-90"><ChevronDown className="w-4 h-4" /></button>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-2">{label}</label>}

      <div className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${open ? `border-${accentColor}/30 bg-foreground/[0.02]` : "border-foreground/10 bg-foreground/5 hover:border-foreground/25"}`}>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all"
        >
          <Clock className={`w-4 h-4 flex-shrink-0 ${open ? colorCls : "text-foreground/40"}`} />
          <span className={`flex-1 text-sm font-mono font-bold ${colorCls}`}>
            {formatDisplay(hour, minute, hour12)}
          </span>
          <div className={`p-1 rounded-full transition-transform duration-300 ${open ? "rotate-180 bg-foreground/10" : "bg-transparent"}`}>
            <ChevronDown className="w-3.5 h-3.5 text-foreground/40" />
          </div>
        </button>

        {open && (
            <div className="p-4 border-t border-foreground/5 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
                <div className="flex justify-center items-center gap-2 bg-foreground/5 rounded-2xl p-4">
                    <CounterColumn label="Hr" value={pad(hour12 ? h12 : hour)} onUp={() => update({ hour: (hour + 1) % 24 })} onDown={() => update({ hour: (hour + 23) % 24 })} />
                    <div className="text-lg font-bold text-foreground/10 pb-4">:</div>
                    <CounterColumn label="Min" value={pad(minute)} onUp={() => update({ minute: (minute + 1) % 60 })} onDown={() => update({ minute: (minute + 59) % 60 })} />
                    
                    {hour12 && (
                        <>
                            <div className="w-px h-6 bg-foreground/10 mx-1" />
                            <button 
                                onClick={() => update({ hour: isPM ? hour - 12 : hour + 12 })}
                                className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all ${isPM ? "bg-indigo-500/20 text-indigo-500" : "bg-amber-500/20 text-amber-500"}`}
                            >
                                {isPM ? "PM" : "AM"}
                            </button>
                        </>
                    )}
                </div>

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
                        Apply <Check className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
