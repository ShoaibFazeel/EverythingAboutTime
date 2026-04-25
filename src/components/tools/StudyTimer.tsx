"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Save, RotateCcw, Trash2, Tag, BookOpen } from "lucide-react";

type Session = {
  id: string;
  durationMs: number;
  label: string;
  date: string;
};

export default function StudyTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [label, setLabel] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTickRef = useRef<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("everythingabouttime_study_sessions");
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (e) {
        setSessions([]);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("everythingabouttime_study_sessions", JSON.stringify(sessions));
    }
  }, [sessions, mounted]);

  useEffect(() => {
    if (isRunning) {
      lastTickRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;
        setElapsedMs((prev) => prev + delta);
      }, 100); // 100ms interval is fine for a study timer
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedMs(0);
  };

  const saveSession = () => {
    if (elapsedMs === 0) return;
    const newSession: Session = {
      id: Date.now().toString(),
      durationMs: elapsedMs,
      label: label.trim() || "Unlabeled Session",
      date: new Date().toISOString()
    };
    setSessions(prev => [newSession, ...prev]);
    resetTimer();
  };

  const removeSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const formatTime = (ms: number, includeMs = false) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const pad = (n: number) => n.toString().padStart(2, '0');
    let base = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    
    if (includeMs) {
      const millis = ms % 1000;
      base += `.${Math.floor(millis / 100).toString()}`;
    }
    
    return base;
  };

  if (!mounted) return <div className="p-8 text-center glass rounded-xl">Loading your saved sessions...</div>;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="glass rounded-3xl p-6 md:p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        
        <div className="mb-2">
          <BookOpen className="w-10 h-10 text-primary mx-auto mb-3 opacity-80" />
          <h2 className="text-xl font-semibold mb-1">Focus Session</h2>
        </div>

        <div className="flex items-center bg-foreground/5 rounded-full px-4 py-2 border border-foreground/10 focus-within:border-primary/50 transition-colors w-full max-w-xs mb-8">
          <Tag className="w-3.5 h-3.5 text-foreground/40 mr-2" />
          <input 
            type="text" 
            placeholder="What are you working on?" 
            className="bg-transparent border-none outline-none text-center w-full text-xs font-medium"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <div className="text-6xl md:text-8xl font-mono tracking-tighter font-extrabold mb-8 text-primary">
          {formatTime(elapsedMs, false)}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button 
            onClick={toggleTimer} 
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-transform hover:scale-105 ${isRunning ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}
          >
            {isRunning ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start</>}
          </button>
          
          <button 
            onClick={saveSession} 
            disabled={elapsedMs === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground/10 font-bold hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Save className="w-4 h-4" /> Save
          </button>

          <button 
            onClick={resetTimer} 
            className="flex items-center gap-2 p-3 rounded-xl bg-foreground/5 text-foreground/60 hover:bg-red-500 hover:text-white transition-all text-xs font-bold"
            title="Reset without saving"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 flex flex-col max-h-[500px]">
        <h3 className="text-lg font-bold mb-4 border-b border-foreground/10 pb-3">Saved Sessions</h3>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {sessions.length === 0 ? (
            <p className="text-center text-foreground/50 py-8 text-sm">No saved sessions yet. Get to work!</p>
          ) : (
            sessions.map(session => (
              <div key={session.id} className="p-4 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors group relative">
                <button 
                  onClick={() => removeSession(session.id)}
                  className="absolute top-4 right-4 text-foreground/30 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="font-semibold text-lg mb-1">{session.label}</div>
                <div className="flex items-center justify-between text-sm text-foreground/60">
                  <span className="font-mono bg-foreground/10 px-2 py-0.5 rounded text-foreground/80">{formatTime(session.durationMs)}</span>
                  <span>{new Date(session.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
