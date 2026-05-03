import { getPosts } from "@/services/sanityMock";
import Link from "next/link";
import { Clock } from "lucide-react";

export const metadata = {
  title: "Blog | Everything About Time",
  description: "Read our latest articles on sleep, productivity, and managing your time effectively.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-lg text-foreground/70 max-w-2xl">
          Insights on time management, productivity, and the science of sleep.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
            <div className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 flex flex-col">
              <div className="flex items-center gap-2 mb-4 text-sm font-medium text-primary">
                <span className="bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
                <span className="text-foreground/50 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-foreground/70 line-clamp-3 mb-4 flex-1">
                {post.excerpt}
              </p>
              <div className="text-sm font-bold text-primary group-hover:underline">
                Read article →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
