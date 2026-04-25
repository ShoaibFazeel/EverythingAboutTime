"use client";

import { useState } from "react";
import { format, add, sub } from "date-fns";
import { ArrowRight, Plus, Minus, CalendarDays } from "lucide-react";
import DateTimePicker from "@/components/ui/DateTimePicker";

export default function AddSubtractTime() {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatDateForInput = (d: Date) => {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const [baseDateStr, setBaseDateStr] = useState(formatDateForInput(new Date()));
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  const [values, setValues] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0
  });

  const updateValue = (key: keyof typeof values, val: string) => {
    setValues((prev) => ({ ...prev, [key]: Math.max(0, parseInt(val) || 0) }));
  };

  const baseDate = new Date(baseDateStr);
  const isValid = !isNaN(baseDate.getTime());

  let resultDate = baseDate;
  if (isValid) {
    if (operation === "add") {
      resultDate = add(baseDate, values);
    } else {
      resultDate = sub(baseDate, values);
    }
  }

  const inputs = [
    { label: "Years", key: "years" },
    { label: "Months", key: "months" },
    { label: "Days", key: "days" },
    { label: "Hours", key: "hours" },
    { label: "Minutes", key: "minutes" }
  ] as const;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      
      <div className="glass rounded-3xl p-8 flex flex-col gap-8">
        <div>
          <DateTimePicker
            value={baseDateStr}
            onChange={setBaseDateStr}
            label="Base Date & Time"
          />
        </div>

        <div className="flex bg-foreground/5 p-1 rounded-2xl w-fit">
          <button 
            onClick={() => setOperation("add")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${operation === 'add' ? 'bg-primary text-white shadow-md' : 'hover:bg-foreground/10'}`}
          >
            <Plus className="w-4 h-4"/> Add Time
          </button>
          <button 
            onClick={() => setOperation("subtract")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${operation === 'subtract' ? 'bg-red-500 text-white shadow-md' : 'hover:bg-foreground/10'}`}
          >
            <Minus className="w-4 h-4"/> Subtract Time
          </button>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground/70 mb-4 uppercase tracking-wider">Adjustment Amounts</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {inputs.map(({ label, key }) => (
              <div key={key}>
                <label className="block tracking-tight text-xs font-semibold text-foreground/50 mb-1 pl-1">{label}</label>
                <input 
                  type="number" 
                  min="0"
                  value={values[key]}
                  onChange={(e) => updateValue(key, e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors font-bold text-center text-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-8 flex flex-col justify-center items-center text-center">
        {!isValid ? (
          <div className="text-foreground/50">Please enter a valid base date.</div>
        ) : (
          <>
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <CalendarDays className="w-8 h-8"/>
            </div>
            <h3 className="text-sm font-semibold text-foreground/50 mb-3 uppercase tracking-widest">Resulting Date</h3>
            <div className="text-4xl font-extrabold text-primary mb-2 leading-tight">
              {format(resultDate, "h:mm a")}
            </div>
            <div className="text-2xl font-bold text-foreground/80">
              {format(resultDate, "EEEE")}
            </div>
            <div className="text-xl font-medium text-foreground/60">
              {format(resultDate, "MMMM do, yyyy")}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
