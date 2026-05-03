import { getPost, getPosts } from "@/services/sanityMock";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.seoTitle || `${post.title} | Time is Everything`,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-8 gap-2 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>
      
      <article className="glass rounded-3xl p-6 md:p-12 shadow-sm">
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6 text-sm font-medium">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{post.category}</span>
            <span className="text-foreground/50 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
          {post.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
