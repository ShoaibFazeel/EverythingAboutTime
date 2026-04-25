export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // simplistic for mock
  category: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

const mockPosts: BlogPost[] = [
  {
    title: "How Sleep Cycles Work",
    slug: "how-sleep-cycles-work",
    excerpt: "Understand how sleep cycles affect your energy levels and why 90-minute blocks matter.",
    content: "Sleep cycles typically last about 90 minutes. Waking up in the middle of a sleep cycle can leave you feeling groggy, a state known as sleep inertia. By timing your sleep to align with the end of a cycle, you can wake up feeling refreshed and ready to tackle the day.\n\nOur bodies go through several stages of sleep, including light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. Deep sleep is crucial for physical restoration, while REM sleep is essential for cognitive functions like memory consolidation.",
    category: "Sleep",
    publishedAt: "2026-01-01T08:00:00Z"
  },
  {
    title: "The Pomodoro Technique Explained",
    slug: "pomodoro-technique-explained",
    excerpt: "Learn how breaking your work into 25-minute chunks can skyrocket your productivity.",
    content: "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.\n\nThis method trains your brain to focus for short periods and helps you stay on top of deadlines. Over time, it can even help improve your attention span and concentration.",
    category: "Productivity",
    publishedAt: "2026-02-15T09:30:00Z"
  },
  {
    title: "Mastering World Clocks",
    slug: "mastering-world-clocks",
    excerpt: "Why coordinating across time zones is easier than you think when you use the right tools.",
    content: "Working with a globally distributed team means constantly translating time zones. This can lead to missed meetings and communication breakdowns if not managed correctly. \n\nBy using robust world clock solutions, you can effortlessly sync schedules and ensure everyone is on the same page, regardless of their geographical location.",
    category: "Time Zones",
    publishedAt: "2026-03-20T14:45:00Z"
  }
];

export async function getPosts(): Promise<BlogPost[]> {
  // Simulate network delay
  return new Promise((resolve) => setTimeout(() => resolve(mockPosts), 300));
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPosts.find((p) => p.slug === slug));
    }, 300);
  });
}
