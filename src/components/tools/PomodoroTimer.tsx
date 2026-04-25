"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Brain, Coffee, CheckCircle, Settings2, X } from "lucide-react";
import { playChime } from "@/utils/audio";

type Mode = "focus" | "shortBreak" | "longBreak";

export default function PomodoroTimer() {
  const [modes, setModes] = useState({
    focus: { label: "Focus", minutes: 25 },
    shortBreak: { label: "Short Break", minutes: 5 },
    longBreak: { label: "Long Break", minutes: 15 }
  });

  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(modes.focus.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, pomodorosCompleted]);

  useEffect(() => {
    setTimeLeft(modes[mode].minutes * 60);
    setIsRunning(false);
  }, [mode, modes]);

  const handleComplete = () => {
    playChime();
    setIsRunning(false);
    if (mode === "focus") {
      setPomodorosCompleted(prev => prev + 1);
      if ((pomodorosCompleted + 1) % 4 === 0) {
        setMode("longBreak");
      } else {
        setMode("shortBreak");
      }
    } else {
      setMode("focus");
    }
  };

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${pad(m)}:${pad(s)}`;
  };

  const progress = ((modes[mode].minutes * 60 - timeLeft) / (modes[mode].minutes * 60)) * 100;

  const getIcon = (m: Mode) => {
    return m === "focus" ? <Brain className="w-4 h-4" /> : <Coffee className="w-4 h-4" />;
  };

  return (
    <div className="max-w-4xl mx-auto transition-all">
      <div className="glass rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
        
        {/* Settings Toggle */}
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="absolute top-8 right-8 p-2.5 rounded-full hover:bg-foreground/10 text-foreground/40 transition-all z-20 hover:rotate-90"
        >
          {showSettings ? <X className="w-5 h-5"/> : <Settings2 className="w-5 h-5"/>}
        </button>

        {showSettings ? (
          <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-300">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-widest text-primary">
               Settings
            </h3>
            <div className="space-y-6 mb-10">
              {(Object.keys(modes) as Mode[]).map((m) => (
                <div key={m}>
                  <label className="block text-[10px] font-black text-foreground/30 mb-2 uppercase tracking-[0.2em]">
                    {modes[m].label} (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={modes[m].minutes}
                    onChange={(e) => {
                      const val = Math.max(1, parseInt(e.target.value) || 1);
                      setModes(prev => ({
                        ...prev,
                        [m]: { ...prev[m], minutes: val }
                      }));
                    }}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-5 py-4 outline-none focus:border-primary/50 transition-all font-mono font-bold text-xl"
                  />
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowSettings(false)}
              className="w-full py-4 rounded-2xl bg-primary text-white text-[11px] font-black tracking-[0.25em] uppercase hover:opacity-90 shadow-xl shadow-primary/20 transition-all active:scale-95"
            >
              Apply Settings
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* LEFT: Mode Navigation */}
            <div className="flex flex-col gap-3 w-full md:w-56 order-2 md:order-1">
              <div className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-2 px-4">Select Mode</div>
              {(Object.keys(modes) as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${mode === m ? (m === 'focus' ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-accent text-white shadow-xl shadow-accent/20 scale-105') : 'hover:bg-foreground/5 text-foreground/50'}`}
                >
                  <div className={`p-2 rounded-lg transition-colors ${mode === m ? 'bg-white/20' : 'bg-foreground/5 group-hover:bg-foreground/10'}`}>
                    {getIcon(m)}
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-xs uppercase tracking-wider">{modes[m].label}</span>
                    <span className={`text-[10px] opacity-60 font-mono ${mode === m ? 'text-white' : 'text-foreground/40'}`}>{modes[m].minutes} min</span>
                  </div>
                  {mode === m && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </button>
              ))}
            </div>

            {/* MIDDLE: Timer Face */}
            <div className="relative order-1 md:order-2 flex flex-col items-center">
               <div className="relative w-64 h-64 md:w-80 md:h-80 flex justify-center items-center">
                    <svg className="w-full h-full -rotate-90 transform opacity-5 absolute top-0 left-0 pointer-events-none">
                        <circle cx="50%" cy="50%" r="48%" stroke="currentColor" strokeWidth="8" fill="none" className="text-foreground" />
                    </svg>
                    <svg className="w-full h-full -rotate-90 transform absolute top-0 left-0 pointer-events-none transition-all duration-1000 ease-linear">
                        <circle 
                        cx="50%" cy="50%" r="48%" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        fill="none" 
                        className={mode === 'focus' ? 'text-primary' : 'text-accent'}
                        strokeDasharray="301.59%" // Approximated for responsiveness
                        strokeDashoffset={`${301.59 - (301.59 * progress) / 100}%`}
                        strokeLinecap="round"
                        />
                    </svg>

                    <div className="flex flex-col items-center z-10">
                        <div className={`text-7xl md:text-8xl font-mono font-black tracking-tighter transition-colors duration-500 ${mode === 'focus' ? 'text-primary' : 'text-accent'}`}>
                            {formatTime(timeLeft)}
                        </div>
                        <div className="mt-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em]">Time Left</div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center">
                    <div className="text-[9px] uppercase tracking-[0.2em] font-black text-foreground/20 mb-3">Daily Progress</div>
                    <div className="flex gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-3 h-3 rounded-full transition-all duration-700 ${i < pomodorosCompleted ? (mode === 'focus' ? 'bg-primary shadow-lg shadow-primary/40' : 'bg-accent shadow-lg shadow-accent/40') : 'bg-foreground/5'}`} 
                        />
                        ))}
                        {pomodorosCompleted >= 4 && <div className="text-[10px] font-bold text-primary">+{pomodorosCompleted - 4}</div>}
                    </div>
                </div>
            </div>

            {/* RIGHT: Controls */}
            <div className="flex flex-col gap-4 w-full md:w-56 order-3">
              <div className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-2 px-4">Actions</div>
              
              <button 
                onClick={() => setIsRunning(!isRunning)} 
                className={`group flex items-center justify-between px-6 py-5 rounded-[2rem] font-black transition-all duration-300 hover:scale-[1.02] ${isRunning ? 'bg-foreground/10 text-foreground' : (mode === 'focus' ? 'bg-primary text-white shadow-2xl shadow-primary/30' : 'bg-accent text-white shadow-2xl shadow-accent/30')}`}
              >
                <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">{isRunning ? 'Running' : 'Ready'}</span>
                    <span className="text-lg">{isRunning ? 'Pause' : 'Start'}</span>
                </div>
                <div className={`p-3 rounded-full transition-all ${isRunning ? 'bg-foreground/10' : 'bg-white/20'}`}>
                    {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
                </div>
              </button>
              
              <button 
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(modes[mode].minutes * 60);
                }} 
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-foreground/5 text-foreground/40 hover:bg-foreground/10 hover:text-foreground transition-all font-bold group"
              >
                <div className="p-2 rounded-lg bg-foreground/5 group-hover:rotate-180 transition-transform duration-500">
                    <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase tracking-widest">Reset Timer</span>
              </button>

              <div className="mt-4 p-5 rounded-[2rem] border border-foreground/5 bg-foreground/[0.02] text-center">
                 <div className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-1">Focus Score</div>
                 <div className="text-2xl font-mono font-black text-foreground/60">{pomodorosCompleted * modes.focus.minutes} <span className="text-[10px] uppercase">min</span></div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
