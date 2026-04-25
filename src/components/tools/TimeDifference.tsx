"use client";

import { useState } from "react";
import { format, differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { ArrowRight, Clock, Calendar, Globe } from "lucide-react";
import DateTimePicker from "@/components/ui/DateTimePicker";
import TimezoneSelect from "@/components/ui/TimezoneSelect";


export default function TimeDifference() {
  const now = new Date();
  
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatDateForInput = (d: Date) => {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const defaultStart = formatDateForInput(now);
  const later = new Date(now.getTime() + 24 * 60 * 60 * 1000 * 7);
  const defaultEnd = formatDateForInput(later);

  const [startData, setStartData] = useState(defaultStart);
  const [endData, setEndData] = useState(defaultEnd);

  // Time Zone toggles
  const [useTimeZones, setUseTimeZones] = useState(false);
  const [startTz, setStartTz] = useState("Asia/Karachi");
  const [endTz, setEndTz] = useState("America/New_York");

  // Determine actual UTC time moment based on if distinct timezones are used
  let t1Raw: Date;
  let t2Raw: Date;

  if (useTimeZones) {
    t1Raw = fromZonedTime(startData, startTz);
    t2Raw = fromZonedTime(endData, endTz);
  } else {
    t1Raw = new Date(startData);
    t2Raw = new Date(endData);
  }

  const isValid = !isNaN(t1Raw.getTime()) && !isNaN(t2Raw.getTime());

  let t1 = t1Raw;
  let t2 = t2Raw;
  const isReverse = isValid && t1 > t2;
  
  if (isReverse) {
    t1 = t2Raw;
    t2 = t1Raw;
  }

  // Calculate totals
  const totalDays = isValid ? differenceInDays(t2, t1) : 0;
  const totalHours = isValid ? differenceInHours(t2, t1) : 0;
  const totalMinutes = isValid ? differenceInMinutes(t2, t1) : 0;
  const totalSeconds = isValid ? differenceInSeconds(t2, t1) : 0;

  // Calculate compound exact breakdown
  let diffYears = 0, diffMonths = 0, diffDays = 0, diffHours = 0, diffMinutes = 0;
  
  if (isValid) {
    diffYears = differenceInYears(t2, t1);
    const tAfterYears = new Date(t1);
    tAfterYears.setFullYear(t1.getFullYear() + diffYears);

    diffMonths = differenceInMonths(t2, tAfterYears);
    const tAfterMonths = new Date(tAfterYears);
    tAfterMonths.setMonth(tAfterYears.getMonth() + diffMonths);

    diffDays = differenceInDays(t2, tAfterMonths);
    const tAfterDays = new Date(tAfterMonths);
    tAfterDays.setDate(tAfterDays.getDate() + diffDays);

    diffHours = differenceInHours(t2, tAfterDays);
    const tAfterHours = new Date(tAfterDays);
    tAfterHours.setHours(tAfterHours.getHours() + diffHours);

    diffMinutes = differenceInMinutes(t2, tAfterHours);
  }

  const breakdown = [
    { label: "Years", value: diffYears },
    { label: "Months", value: diffMonths },
    { label: "Days", value: diffDays },
    { label: "Hours", value: diffHours },
    { label: "Minutes", value: diffMinutes }
  ].filter(b => b.value > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      
      <div className="glass rounded-3xl p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Select Dates</h2>
          
          <button 
            onClick={() => setUseTimeZones(!useTimeZones)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${useTimeZones ? "bg-primary text-white" : "bg-foreground/10 text-foreground/70"}`}
          >
            <Globe className="w-3 h-3" />
            Time Zones {useTimeZones ? "ON" : "OFF"}
          </button>
        </div>
        
          <DateTimePicker
            value={startData}
            onChange={setStartData}
            label="Start Date & Time"
          />
          {useTimeZones && (
            <div className="mt-1">
              <TimezoneSelect value={startTz} onChange={setStartTz} label="Timezone" />
            </div>
          )}

        <div className="flex justify-center my-2 opacity-50">
          <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
        </div>

          <DateTimePicker
            value={endData}
            onChange={setEndData}
            label="End Date & Time"
          />
          {useTimeZones && (
            <div className="mt-1">
              <TimezoneSelect value={endTz} onChange={setEndTz} label="Timezone" />
            </div>
          )}

        {isReverse && (
          <div className="bg-amber-500/10 text-amber-600 rounded-xl p-4 text-sm font-medium mt-4">
            Notice: The start time is after the end time. We have swapped them to calculate the absolute difference.
          </div>
        )}
      </div>

      <div className="glass rounded-3xl p-8 flex flex-col justify-center">
        {!isValid ? (
          <div className="text-center text-foreground/50 py-12">
            Please enter valid dates to see the difference.
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-foreground/50 mb-2 uppercase tracking-wide">Exact Difference</h3>
            
            <div className="mb-8">
              {breakdown.length === 0 ? (
                <div className="text-4xl font-extrabold text-primary pt-2">Simultaneous</div>
              ) : (
                <div className="flex flex-wrap gap-x-2 text-3xl font-extrabold items-baseline">
                  {breakdown.map((b, i) => (
                    <span key={b.label}>
                      <span className="text-primary">{b.value}</span>
                      <span className="text-lg ml-1 text-foreground/80 lowercase">{b.label}</span>
                      {i < breakdown.length - 1 && <span className="text-foreground/40 mx-2">,</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px w-full bg-foreground/10 mb-8" />

            <h3 className="text-lg font-semibold text-foreground/50 mb-4 uppercase tracking-wide">Expressed In Totals</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-foreground/5 rounded-2xl p-4">
                <div className="text-2xl font-bold">{totalDays.toLocaleString()}</div>
                <div className="text-sm text-foreground/60 flex items-center gap-1"><Calendar className="w-3 h-3"/> Total Days</div>
              </div>
              <div className="bg-foreground/5 rounded-2xl p-4">
                <div className="text-2xl font-bold">{totalHours.toLocaleString()}</div>
                <div className="text-sm text-foreground/60 flex items-center gap-1"><Clock className="w-3 h-3"/> Total Hours</div>
              </div>
              <div className="bg-foreground/5 rounded-2xl p-4">
                <div className="text-2xl font-bold">{totalMinutes.toLocaleString()}</div>
                <div className="text-sm text-foreground/60 flex items-center gap-1"><Clock className="w-3 h-3"/> Total Minutes</div>
              </div>
              <div className="bg-foreground/5 rounded-2xl p-4">
                <div className="text-2xl font-bold">{totalSeconds.toLocaleString()}</div>
                <div className="text-sm text-foreground/60 flex items-center gap-1"><Clock className="w-3 h-3"/> Total Seconds</div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
