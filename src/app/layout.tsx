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
  title: "BookFlow — Transform Your Book Into Flow",
  description: "AI-powered book analysis and workflow optimization platform for modern authors. Upload, analyze, and perfect your manuscript with intelligent insights.",
  keywords: "book writing, AI analysis, manuscript, writing tool, author, publishing",
  authors: [{ name: "BookFlow" }],
  openGraph: {
    title: "BookFlow — Transform Your Book Into Flow",
    description: "AI-powered book analysis and workflow optimization",
    type: "website",
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