"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Unlink, Link as LinkIcon, RefreshCw } from "lucide-react";
import TimezoneSelect, { ALL_TIMEZONES } from "@/components/ui/TimezoneSelect";
import TimePicker from "@/components/ui/TimePicker";

type ClockData = {
  id: string;
  timezone: string;
  label: string;
  synced: boolean;
  manualOffsetMs: number; 
};

const defaultClocks: ClockData[] = [
  { id: "1", timezone: "America/New_York", label: "New York", synced: true, manualOffsetMs: 0 },
  { id: "2", timezone: "Europe/London", label: "London", synced: true, manualOffsetMs: 0 },
  { id: "3", timezone: "Asia/Tokyo", label: "Tokyo", synced: true, manualOffsetMs: 0 },
];



export default function WorldClocks() {
  const [clocks, setClocks] = useState<ClockData[]>([]);
  const [baseTimeMs, setBaseTimeMs] = useState<number>(0);
  const [isTick, setIsTick] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTz, setNewTz] = useState(ALL_TIMEZONES[0].value);
  const [newLabel, setNewLabel] = useState("");

  useEffect(() => {
    setClocks(defaultClocks);
    setBaseTimeMs(Date.now());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showAddModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showAddModal]);

  useEffect(() => {
    if (!isTick) return;
    const interval = setInterval(() => {
      setBaseTimeMs(prev => prev + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTick]);

  const resumeLiveTime = () => {
    setBaseTimeMs(Date.now());
    setIsTick(true);
    setClocks(clocks.map(c => ({...c, manualOffsetMs: 0})));
  };

  const adjustClock = (id: string, deltaMs: number) => {
    setIsTick(false); // Stop live ticking
    setClocks(prev => prev.map(c => {
      if (c.synced) {
        // If the clock being adjusted is synced, ALL synced clocks move by adjusting baseTime
        return c; 
      }
      // If it's unsynced and it's the one being adjusted, adjust its manual offset
      if (c.id === id) {
        return { ...c, manualOffsetMs: c.manualOffsetMs + deltaMs };
      }
      return c;
    }));

    const isTargetSynced = clocks.find(c => c.id === id)?.synced;
    if (isTargetSynced) {
      setBaseTimeMs(prev => prev + deltaMs);
    }
  };

  const toggleSync = (id: string) => {
    setClocks(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, synced: !c.synced, manualOffsetMs: 0 };
      }
      return c;
    }));
  };

  const removeClock = (id: string) => {
    setClocks(prev => prev.filter(c => c.id !== id));
  };

  const submitAddClock = () => {
    if (newTz && newLabel) {
      setClocks([...clocks, { id: Date.now().toString(), timezone: newTz, label: newLabel, synced: true, manualOffsetMs: 0 }]);
      setShowAddModal(false);
      setNewLabel("");
      setNewTz(ALL_TIMEZONES[0].value);
    }
  };

  if (!mounted) return <div className="p-8 text-center glass rounded-xl">Loading clocks...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">World Clocks</h2>
          <p className="text-sm text-foreground/60">{!isTick ? "Live time paused. Adjusting manually." : "Live synchronized time."}</p>
        </div>
        <div className="flex gap-2">
          {!isTick && (
            <button onClick={resumeLiveTime} className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors text-sm font-semibold">
              <RefreshCw className="w-4 h-4" /> Reset Live
            </button>
          )}
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-semibold">
            <Plus className="w-4 h-4" /> Add Clock
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clocks.map((clock) => {
          const effectiveTime = new Date((clock.synced ? baseTimeMs : Date.now()) + clock.manualOffsetMs);
          
          let formattedTime = "";
          let formattedDate = "";
          try {
            formattedTime = new Intl.DateTimeFormat('en-US', {
              timeZone: clock.timezone,
              hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
            }).format(effectiveTime);
            
            formattedDate = new Intl.DateTimeFormat('en-US', {
              timeZone: clock.timezone,
              weekday: 'short', month: 'short', day: 'numeric'
            }).format(effectiveTime);
          } catch(e) {
            formattedTime = "Invalid TZ";
          }

          return (
            <div 
            key={clock.id} 
            className="glass rounded-[2.5rem] p-8 flex flex-col gap-6 relative transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 focus-within:z-50 focus-within:ring-2 focus-within:ring-primary/20 group"
          >
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => toggleSync(clock.id)} 
                  className={`p-2 rounded-lg ${clock.synced ? 'bg-primary/20 text-primary' : 'bg-foreground/10 text-foreground/60'}`}
                  title={clock.synced ? "Synced with global time" : "Unlinked from global time"}
                >
                  {clock.synced ? <LinkIcon className="w-4 h-4" /> : <Unlink className="w-4 h-4" />}
                </button>
                <button onClick={() => removeClock(clock.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-semibold mb-1">{clock.label}</h3>
              <p className="text-xs text-foreground/50 mb-4">{clock.timezone}</p>
              
              <div className="mb-6">
                <div className="text-4xl font-bold tracking-tight mb-1 text-primary">{formattedTime}</div>
                <div className="text-sm font-medium text-foreground/70">{formattedDate}</div>
              </div>

              <div className="flex bg-foreground/5 rounded-2xl p-4 flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">Manual Adjustment</span>
                  {!clock.synced && <span className="text-[10px] font-bold text-accent uppercase">Custom Offset</span>}
                </div>
                <div className="relative">
                  <TimePicker
                    value={(() => {
                      try {
                        return new Intl.DateTimeFormat('en-US', { timeZone: clock.timezone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(effectiveTime);
                      } catch(e) { return "00:00"; }
                    })()}
                    onChange={(newTimeStr) => {
                      if (!newTimeStr) return;
                      try {
                        const [newH, newM] = newTimeStr.split(":").map(Number);
                        const currentStr = new Intl.DateTimeFormat('en-US', { timeZone: clock.timezone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(effectiveTime);
                        const [currentH, currentM] = currentStr.split(":").map(Number);
                        const deltaMs = ((newH - currentH) * 60 + (newM - currentM)) * 60000;
                        adjustClock(clock.id, deltaMs);
                      } catch(err) {}
                    }}
                    accentColor="primary"
                    hour12
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="glass rounded-3xl p-8 w-full max-w-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-6">Add New Clock</h3>
            
            <div className="space-y-4 mb-8">
              <div>
                <TimezoneSelect
                  value={newTz}
                  onChange={setNewTz}
                  label="Timezone"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-2">Label</label>
                <input 
                  type="text" 
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. Home, Office, Paris"
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm font-bold placeholder:text-foreground/30"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-xl bg-foreground/5 hover:bg-foreground/10 font-bold transition-all text-sm text-foreground/70"
              >
                Cancel
              </button>
              <button 
                onClick={submitAddClock}
                disabled={!newLabel.trim()}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-bold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Add Clock
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
