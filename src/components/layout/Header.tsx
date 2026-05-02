"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isTools = !pathname.startsWith("/blog");
  const isBlog = pathname.startsWith("/blog");

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-xl border-b border-foreground/10">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-foreground">
          <Image
            src="/timing.png"
            alt="EverythingAboutTime-logo"
            width={28}
            height={28}
            className="rounded-sm"
            priority
          />
          <span className="font-bold text-xl tracking-tight">EverythingAboutTime</span>
        </Link>
        <nav className="flex space-x-2 text-sm font-medium">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              isTools
                ? "bg-primary text-white shadow-sm shadow-primary/30"
                : "text-foreground/70 hover:text-primary hover:bg-foreground/5"
            }`}
          >
            Tools
          </Link>
          <Link
            href="/blog"
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              isBlog
                ? "bg-primary text-white shadow-sm shadow-primary/30"
                : "text-foreground/70 hover:text-primary hover:bg-foreground/5"
            }`}
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
