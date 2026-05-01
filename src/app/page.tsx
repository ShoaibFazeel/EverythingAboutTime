import Link from "next/link";
import { Calculator, Clock, Moon, Timer, Activity, Globe, Code } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Tools Suite for Productivity",
  description:
    "Use free online time tools including Pomodoro timer, sleep calculator, world clocks, countdown timer, Unix converter, and more.",
  keywords: [
    "time tools",
    "productivity tools",
    "pomodoro timer",
    "sleep calculator",
    "unix timestamp converter",
    "world clock",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const categories = [
    {
      title: "Time Calculations",
      description: "Quickly determine differences and durations.",
      tools: [
        { name: "Time Difference", path: "/tools/time-difference", icon: <Calculator className="w-5 h-5" /> },
        { name: "Add/Subtract Time", path: "/tools/add-subtract-time", icon: <Clock className="w-5 h-5" /> },
        { name: "Countdown Timer", path: "/tools/countdown", icon: <Timer className="w-5 h-5" /> },
        { name: "Unix Timestamp", path: "/tools/unix-time", icon: <Code className="w-5 h-5" /> },
      ]
    },
    {
      title: "Personal Time Tools",
      description: "Manage your life schedules effectively.",
      tools: [
        { name: "Age Calculator", path: "/tools/age-calculator", icon: <Activity className="w-5 h-5" /> },
        { name: "Sleep Calculator", path: "/tools/sleep-calculator", icon: <Moon className="w-5 h-5" /> },
      ]
    },
    {
      title: "Productivity & World",
      description: "Stay focused globally and locally.",
      tools: [
        { name: "World Clocks", path: "/tools/world-clocks", icon: <Globe className="w-5 h-5" /> },
        { name: "Study Timer", path: "/tools/study-timer", icon: <Timer className="w-5 h-5" /> },
        { name: "Pomodoro Timer", path: "/tools/pomodoro", icon: <Clock className="w-5 h-5" /> },
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">Master Your <span className="text-primary">Time</span></h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          A suite of fast, minimal time-management tools designed for clarity, productivity, and focus.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((cat, idx) => (
          <section key={idx}>
            <div className="mb-6">
              <h2 className="text-3xl font-bold tracking-tight">{cat.title}</h2>
              <p className="text-foreground/60">{cat.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.tools.map((tool) => (
                <Link href={tool.path} key={tool.path} className="group block h-full">
                  <div className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </div>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{tool.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
