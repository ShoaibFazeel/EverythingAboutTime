"use client";

import { useState } from "react";
import { format, differenceInYears, differenceInMonths, differenceInDays } from "date-fns";
import { Activity, Calendar } from "lucide-react";
import DateTimePicker from "@/components/ui/DateTimePicker";

export default function AgeCalculator() {
  const today = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const [dobData, setDobData] = useState("2000-01-01");
  const [compareData, setCompareData] = useState(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`);

  const dob = new Date(dobData);
  const compareDate = new Date(compareData);
  const isValid = !isNaN(dob.getTime()) && !isNaN(compareDate.getTime());

  let diffYears = 0, diffMonths = 0, diffDays = 0;
  let totalMonths = 0, totalDays = 0;
  let nextBirthdayDays = 0;

  if (isValid) {
    const isFutureCompare = compareDate >= dob;
    const t1 = isFutureCompare ? dob : compareDate;
    const t2 = isFutureCompare ? compareDate : dob;

    diffYears = differenceInYears(t2, t1);

    let tAfterYears = new Date(t1);
    tAfterYears.setFullYear(t1.getFullYear() + diffYears);
    diffMonths = differenceInMonths(t2, tAfterYears);

    let tAfterMonths = new Date(tAfterYears);
    tAfterMonths.setMonth(tAfterYears.getMonth() + diffMonths);
    diffDays = differenceInDays(t2, tAfterMonths);

    totalMonths = differenceInMonths(t2, t1);
    totalDays = differenceInDays(t2, t1);

    // Calc Next Birthday based on compareDate
    const currentYearBirthday = new Date(dob);
    currentYearBirthday.setFullYear(compareDate.getFullYear());

    if (currentYearBirthday < compareDate) {
      currentYearBirthday.setFullYear(compareDate.getFullYear() + 1);
    }
    nextBirthdayDays = differenceInDays(currentYearBirthday, compareDate);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="glass rounded-3xl p-8 flex flex-col gap-8">
        <div className="flex items-center gap-4 mb-4">
          <Activity className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold">Age Calculator</h2>
        </div>

        <div>
          <DateTimePicker
            value={dobData}
            onChange={setDobData}
            label="Date of Birth"
            dateOnly
          />
        </div>

        <div>
          <DateTimePicker
            value={compareData}
            onChange={setCompareData}
            label="Compare Against"
            dateOnly
          />
        </div>
      </div>

      <div className="glass rounded-3xl p-8">
        {!isValid ? (
          <div className="h-full flex items-center justify-center text-foreground/50 text-center">
            Enter valid dates to calculate age.
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-widest mb-6">Exact Age</h3>
              <div className="grid grid-cols-3 gap-4 text-center mb-8">
                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                  <div className="text-4xl sm:text-5xl font-extrabold text-primary mb-1">{diffYears}</div>
                  <div className="text-xs uppercase font-bold text-primary/70">Years</div>
                </div>
                <div className="bg-foreground/5 rounded-2xl p-4 border border-foreground/5">
                  <div className="text-4xl sm:text-5xl font-extrabold mb-1">{diffMonths}</div>
                  <div className="text-xs uppercase font-bold text-foreground/50">Months</div>
                </div>
                <div className="bg-foreground/5 rounded-2xl p-4 border border-foreground/5">
                  <div className="text-4xl sm:text-5xl font-extrabold mb-1">{diffDays}</div>
                  <div className="text-xs uppercase font-bold text-foreground/50">Days</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-xl">
                <div className="text-sm font-bold text-foreground/60 uppercase tracking-wider">Total Time Lived</div>
                <div className="text-right">
                  <div className="font-bold">{totalMonths.toLocaleString()} Months</div>
                  <div className="text-sm text-foreground/70">{totalDays.toLocaleString()} Days</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-accent/5 border border-accent/10 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider">
                  <Calendar className="w-4 h-4" /> Next Birthday
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-accent">{nextBirthdayDays} Days</div>
                  <div className="text-xs text-accent/80 font-semibold">Away</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
