import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

// SEO optimized
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookFlow | Best AI PDF Analyzer & Document Summarizer",
  description: "Analyze your PDFs instantly with BookFlow. Extract insights, summarize long chapters, and chat directly with your documents using advanced AI. 100% free and fast.",
  keywords: ["pdf analyzer", "ai pdf summarizer", "chat with pdf", "document analyzer", "bookflow", "ai reader"],
  openGraph: {
    title: "BookFlow | Best AI PDF Analyzer & Document Summarizer",
    description: "Analyze your PDFs instantly with BookFlow. Extract insights, summarize long chapters, and chat directly with your documents using advanced AI.",
    url: "https://smartbookflow.vercel.app",
    siteName: "BookFlow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookFlow | Best AI PDF Analyzer & Document Summarizer",
    description: "Analyze your PDFs instantly with BookFlow. Extract insights, summarize long chapters, and chat directly with your documents using advanced AI.",
  },
  verification: {
    google: "f4fsH8HbswK8KOn4",
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
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-BZ70682JJB" />
      </body>
    </html>
  );
}