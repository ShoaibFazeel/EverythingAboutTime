"use client";

import { useState, useEffect, useRef } from "react";
import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { Hourglass } from "lucide-react";
import DateTimePicker from "@/components/ui/DateTimePicker";

export default function CountdownTimer() {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatDateForInput = (d: Date) => {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const initialTarget = new Date();
  initialTarget.setHours(initialTarget.getHours() + 24);
  
  const [targetData, setTargetData] = useState(formatDateForInput(initialTarget));
  const [timeRemaining, setTimeRemaining] = useState({ d: 0, h: 0, m: 0, s: 0, isPast: false });
  const [mounted, setMounted] = useState(false);
  const hasChimed = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetData);
      
      if (isNaN(target.getTime())) return;

      const isPast = now > target;
      
      if (isPast && !hasChimed.current) {
        hasChimed.current = true;
        import("@/utils/audio").then(m => m.playChime()); // Trigger only once when reaching 0
      } else if (!isPast) {
        hasChimed.current = false; // Reset if target changes to the future
      }

      let diffSeconds = isPast ? differenceInSeconds(now, target) : differenceInSeconds(target, now);
      
      const d = Math.floor(diffSeconds / (3600 * 24));
      diffSeconds -= d * 3600 * 24;
      const h = Math.floor(diffSeconds / 3600);
      diffSeconds -= h * 3600;
      const m = Math.floor(diffSeconds / 60);
      const s = diffSeconds % 60;

      setTimeRemaining({ d, h, m, s, isPast });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetData, mounted]);

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto glass rounded-3xl p-8 md:p-12 flex flex-col items-center">
      
      <Hourglass className="w-12 h-12 text-primary opacity-80 mb-6" />
      
      <div className="w-full max-w-sm mb-12">
        <DateTimePicker
          value={targetData}
          onChange={setTargetData}
          label="Target Date & Time"
        />
      </div>

      <div className="mb-4 text-center">
        {timeRemaining.isPast ? (
          <span className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">Time elapsed since target</span>
        ) : (
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">Time remaining</span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {[
          { label: "Days", val: timeRemaining.d },
          { label: "Hours", val: timeRemaining.h },
          { label: "Minutes", val: timeRemaining.m },
          { label: "Seconds", val: timeRemaining.s }
        ].map((block) => (
          <div key={block.label} className="bg-foreground/5 rounded-2xl flex flex-col items-center justify-center p-6 border border-foreground/5">
            <span className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-2 text-primary">
              {block.val}
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/50">
              {block.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
