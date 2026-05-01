import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    icon: "/time-is-money.png",
    shortcut: "/time-is-money.png",
    apple: "/time-is-money.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Everything About Time",
    title: "Everything About Time",
    description:
      "Advanced productivity tools for developers and creators. Unix timestamp converter, time difference, age calculator, and more.",
    url: "/",
    images: [
      {
        url: "/time-is-money.png",
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
    images: ["/time-is-money.png"],
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

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
        <link rel="icon" href="/time-is-money.png" sizes="32x32" type="image/png" />
        <link rel="shortcut icon" href="/time-is-money.png" type="image/png" />
        <link rel="apple-touch-icon" href="/time-is-money.png" />
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
