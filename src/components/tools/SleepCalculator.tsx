"use client";

import { useState } from "react";
import { Moon, Sun, ArrowRight, Clock } from "lucide-react";
import TimePicker from "@/components/ui/TimePicker";

export default function SleepCalculator() {
  const [mode, setMode] = useState<"sleep" | "wake">("wake");
  const [time, setTime] = useState<string>("07:00");

  // 15 minutes to fall asleep + cycle multiples
  const calculateCycles = () => {
    if (!time) return [];

    // Parse input time safely
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    const cycles = [];
    const fallAsleepBuffer = 15;
    const cycleLength = 90; // 90 min per sleep cycle

    for (let i = 1; i <= 6; i++) {
      const calcDate = new Date(date);

      if (mode === "wake") {
        // We know what time we want to up, calculate when to sleep
        calcDate.setMinutes(calcDate.getMinutes() - (i * cycleLength) - fallAsleepBuffer);
      } else {
        // We know what time we sleep, calculate when to wake up
        calcDate.setMinutes(calcDate.getMinutes() + (i * cycleLength) + fallAsleepBuffer);
      }

      cycles.push({
        num: i,
        time: calcDate,
        duration: i * 1.5,
        rating: i >= 5 ? "Optimal" : i === 4 ? "Okay" : "Poor"
      });
    }

    if (mode === "wake") {
      return cycles.reverse(); // Show earlier bedtimes first
    }
    return cycles;
  };

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const cycles = calculateCycles();

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <div className="glass rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="flex-1 space-y-4">
          <div className="flex bg-foreground/5 p-1 rounded-2xl w-fit">
            <button
              onClick={() => setMode("wake")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'wake' ? 'bg-primary text-white shadow-md' : 'hover:bg-foreground/10'}`}
            >
              I want to wake up at
            </button>
            <button
              onClick={() => setMode("sleep")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'sleep' ? 'bg-primary text-white shadow-md' : 'hover:bg-foreground/10'}`}
            >
              I plan to sleep at
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-full sm:w-64">
              <TimePicker
                value={time}
                onChange={setTime}
                hour12
                accentColor="primary"
                label="Select Time"
              />
            </div>
            <div className="flex-1">
              <p className="text-foreground/60 text-sm leading-relaxed">
                {mode === 'wake'
                  ? "Enter your target wake-up time and we'll calculate the ideal bedtimes to ensure you wake up refreshed."
                  : "Enter the time you plan to fall asleep to discover the perfect wake-up windows based on 90-minute sleep cycles."}
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-64 flex-shrink-0 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            {mode === 'wake' ? <Moon className="w-8 h-8" /> : <Sun className="w-8 h-8" />}
          </div>
          <h3 className="text-xl font-bold mb-2">Sleep Cycles</h3>
          <p className="text-sm text-foreground/70">Waking up during light sleep makes you feel instantly alert.</p>
        </div>
      </div>

      <p className="text-xs text-center text-foreground/50 mt-8">
        * Calculations include an average 15 minutes to fall asleep.
        A normal sleep cycle lasts roughly 90 minutes.
      </p>

      <div className="space-y-4">
        {cycles.map((cycle, idx) => (
          <div key={idx} className={`glass rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:scale-[1.01] ${cycle.rating === 'Optimal' ? 'border-l-4 border-l-accent' : cycle.rating === 'Okay' ? 'border-l-4 border-l-primary' : ''}`}>

            <div className="flex items-center gap-6 w-full sm:w-auto">
              <div className="text-3xl font-bold min-w-[120px] text-center sm:text-left">
                {formatTime(cycle.time)}
              </div>
              <div className="flex-1 sm:flex-none">
                <div className="font-semibold text-lg">{cycle.duration} Hours of Sleep</div>
                <div className="text-sm text-foreground/60 flex items-center gap-1"><Clock className="w-3 h-3" /> {cycle.num} Cycles</div>
              </div>
            </div>

            <div className={`px-4 py-2 rounded-full text-sm font-bold ${cycle.rating === 'Optimal' ? 'bg-accent/10 text-accent' : cycle.rating === 'Okay' ? 'bg-primary/10 text-primary' : 'bg-foreground/10 text-foreground/60'}`}>
              {cycle.rating}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
