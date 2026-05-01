import type { MetadataRoute } from "next";
import { getPosts } from "@/services/sanityMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const staticRoutes = [
  "/",
  "/blog",
  "/tools/time-difference",
  "/tools/add-subtract-time",
  "/tools/countdown",
  "/tools/unix-time",
  "/tools/age-calculator",
  "/tools/sleep-calculator",
  "/tools/world-clocks",
  "/tools/study-timer",
  "/tools/pomodoro",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : route === "/blog" ? 0.9 : 0.8,
  }));

  const posts = await getPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
