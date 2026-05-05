import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Everything About Time",
    template: "%s | Everything About Time",
  },
  description:
    "Advanced productivity tools for developers and creators. Unix timestamp converter, time difference, age calculator, and more.",
  applicationName: "Everything About Time",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/timing.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/timing.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Everything About Time",
    title: "Everything About Time",
    description:
      "Advanced productivity tools for developers and creators. Unix timestamp converter, time difference, age calculator, and more.",
    images: [
      {
        url: "/timing.png",
        width: 1200,
        height: 630,
        alt: "Everything About Time",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everything About Time",
    description:
      "Advanced productivity tools for developers and creators. Unix timestamp converter, time difference, age calculator, and more.",
    images: ["/timing.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics Consent & Loader */}
        <script src="/consent.js"></script>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q120BKTZF7"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q120BKTZF7');`,
          }}
        />

        <script src="https://analytics.ahrefs.com/analytics.js" data-key="pHgU/tUEXvwtMUzyAMYkBg" async></script>
      </head>
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 flex flex-col pt-8 pb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
