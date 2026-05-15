"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isTools = !pathname.startsWith("/blog");
  const isBlog = pathname.startsWith("/blog");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Tools", active: isTools },
    { href: "/blog", label: "Blog", active: isBlog },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full bg-background/70 backdrop-blur-xl border-b border-foreground/10">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground shrink-0 group flex-wrap justify-center sm:justify-start">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform duration-300">
            <Image
              src="/timing.png"
              alt="EverythingAboutTime-logo"
              fill
              sizes="(max-width: 640px) 28px, 32px"
              className="rounded-sm object-contain"
              priority
            />
          </div>
          <span className="font-bold text-base sm:text-xl tracking-tight whitespace-nowrap">EverythingAboutTime</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${link.active
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "text-foreground/70 hover:text-primary hover:bg-foreground/5"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground/70 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-foreground/10 py-6 px-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-3 rounded-2xl text-lg font-bold transition-all ${link.active
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-foreground/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
