export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content supported
  category: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "How Sleep Cycles Work",
    slug: "how-sleep-cycles-work",
    excerpt: "Understand how sleep cycles affect your energy levels and why 90-minute blocks matter.",
    content: `
      <div>
        <p>Sleep cycles typically last about <strong>90 minutes</strong>. Waking up in the middle of a sleep cycle can leave you feeling groggy, a state known as sleep inertia.</p>
        <p>By timing your sleep to align with the end of a cycle, you can wake up feeling refreshed and ready to tackle the day.</p>
        <p>Our bodies go through several stages of sleep, including light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. Deep sleep is crucial for physical restoration, while REM sleep is essential for cognitive functions like memory consolidation.</p>
        <p>Learn more about our <a href="/tools/sleep-calculator" class="text-primary hover:underline">Sleep Calculator</a> to optimize your rest.</p>
      </div>
    `,
    category: "Sleep",
    publishedAt: "2026-01-01T08:00:00Z"
  },
  {
    title: "The Pomodoro Technique Explained",
    slug: "pomodoro-technique-explained",
    excerpt: "Learn how breaking your work into 25-minute chunks can skyrocket your productivity.",
    content: `
      <div>
        <p>The <strong>Pomodoro Technique</strong> is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.</p>
        <p>This method trains your brain to focus for short periods and helps you stay on top of deadlines. Over time, it can even help improve your attention span and concentration.</p>
        <p>Ready to start? Use our <a href="/tools/pomodoro" class="text-primary hover:underline">Pomodoro Timer</a> to boost your focus today.</p>
      </div>
    `,
    category: "Productivity",
    publishedAt: "2026-02-15T09:30:00Z"
  },
  {
    title: "Mastering World Clocks",
    slug: "mastering-world-clocks",
    excerpt: "Why coordinating across time zones is easier than you think when you use the right tools.",
    content: `
      <div>
        <p>Working with a globally distributed team means constantly translating time zones. This can lead to missed meetings and communication breakdowns if not managed correctly.</p>
        <p>By using robust world clock solutions, you can effortlessly sync schedules and ensure everyone is on the same page, regardless of their geographical location.</p>
        <p>Check out our <a href="/tools/world-clocks" class="text-primary hover:underline">World Clocks Tool</a> to stay in sync with your global team.</p>
      </div>
    `,
    category: "Time Zones",
    publishedAt: "2026-03-20T14:45:00Z"
  }
];
