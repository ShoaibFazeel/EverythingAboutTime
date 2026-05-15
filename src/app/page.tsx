import Link from "next/link";
import { 
  Clock, 
  Calendar, 
  Timer, 
  Languages, 
  Calculator, 
  Moon, 
  Focus, 
  Hash,
  Plus
} from "lucide-react";

export const metadata = {
  title: "Everything About Time | Free Productivity & Time Tools",
  description: "A comprehensive suite of free, fast, and minimal time-management tools including Unix converters, world clocks, pomodoro timers, and sleep calculators.",
};

const categories = [
  {
    title: "Developers & Technical",
    description: "Essential tools for timestamp conversion and technical time tracking.",
    tools: [
      { name: "Unix Timestamp", path: "/tools/unix-time", icon: <Hash className="w-6 h-6" /> },
    ]
  },
  {
    title: "Calculators",
    description: "Precise calculations for age, duration, and date math.",
    tools: [
      { name: "Age Calculator", path: "/tools/age-calculator", icon: <Calculator className="w-6 h-6" /> },
      { name: "Time Difference", path: "/tools/time-difference", icon: <Timer className="w-6 h-6" /> },
      { name: "Add/Subtract Time", path: "/tools/add-subtract-time", icon: <Plus className="w-6 h-6" /> },
    ]
  },
  {
    title: "Productivity",
    description: "Tools designed to help you focus and manage your daily routines.",
    tools: [
      { name: "Pomodoro Timer", path: "/tools/pomodoro", icon: <Focus className="w-6 h-6" /> },
      { name: "Study Timer", path: "/tools/study-timer", icon: <Timer className="w-6 h-6" /> },
      { name: "Sleep Calculator", path: "/tools/sleep-calculator", icon: <Moon className="w-6 h-6" /> },
    ]
  },
  {
    title: "Clocks & Planning",
    description: "Stay in sync with the world and keep track of upcoming events.",
    tools: [
      { name: "World Clocks", path: "/tools/world-clocks", icon: <Languages className="w-6 h-6" /> },
      { name: "Countdown", path: "/tools/countdown", icon: <Clock className="w-6 h-6" /> },
    ]
  }
];

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">Master Your <span className="text-primary">Time</span></h1>
        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
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
        
        <div className="mt-24 max-w-4xl mx-auto space-y-12 border-t border-primary/10 pt-20 pb-12">
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-8">Why Choose Everything About Time?</h2>
            <div className="prose prose-lg dark:prose-invert text-foreground/70 mx-auto">
              <p>
                In a digital world overflowing with complex software, we believe in the power of <strong>simplicity</strong>. Our mission is to provide a comprehensive suite of time-management utilities that are fast, accessible, and entirely free to use. No accounts, no subscriptions, and no unnecessary clutter.
              </p>
              <p>
                From technical tools like our <strong>Unix Timestamp Converter</strong> to personal productivity aids like the <strong>Pomodoro Timer</strong> and <strong>Sleep Calculator</strong>, every tool is built with a focus on accuracy and user experience. We use modern web technologies to ensure that our tools load instantly and work seamlessly on any device.
              </p>
              <p>
                Whether you are a developer looking for a quick epoch conversion, a student optimizing your study sessions, or a professional coordinating across time zones, <strong>Everything About Time</strong> is your reliable companion for mastering every second of your day.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
