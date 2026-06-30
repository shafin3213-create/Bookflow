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

export const metadata: Metadata = {
  title: "BookFlow - Free AI Book Summarizer | PDF Text Extractor",
  description:
    "Instantly summarize any PDF book or textbook online for free using AI. Get accurate chapter-by-chapter summaries, key takeaways, and insights in seconds with BookFlow.",
  keywords:
    "AI book summarizer, PDF text extractor, book summary, free AI tool, textbook summarizer, chapter summary, key takeaways, AI analysis",
  authors: [{ name: "BookFlow" }],
  creator: "BookFlow",
  publisher: "BookFlow",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "BookFlow - Free AI Book Summarizer | PDF Text Extractor",
    description:
      "Instantly summarize any PDF book or textbook online for free using AI. Get accurate chapter-by-chapter summaries, key takeaways, and insights in seconds with BookFlow.",
    url: "https://smartbookflow.vercel.app",
    type: "website",
    locale: "en_US",
    siteName: "BookFlow",
    images: [
      {
        url: "https://smartbookflow.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "BookFlow - AI Book Summarizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BookFlow - Free AI Book Summarizer | PDF Text Extractor",
    description:
      "Instantly summarize any PDF book or textbook online for free using AI. Get accurate chapter-by-chapter summaries, key takeaways, and insights in seconds.",
    creator: "@BookFlow",
    images: ["https://smartbookflow.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://smartbookflow.vercel.app",
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
      className={`h-full antialiased ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}