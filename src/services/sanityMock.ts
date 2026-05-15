import { BlogPost, blogPosts } from "@/data/blogData";

export type { BlogPost };

export async function getPosts(): Promise<BlogPost[]> {
  // Simulate network delay
  return new Promise((resolve) => setTimeout(() => resolve(blogPosts), 300));
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(blogPosts.find((p) => p.slug === slug));
    }, 300);
  });
}
