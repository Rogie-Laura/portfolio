import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
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
  title: `${profile.name} | ${profile.roles[0]}`,
  description: profile.tagline,
  keywords: [
    profile.name,
    "Data Entry",
    "AI Evaluation",
    "Web Research",
    "IT Professional",
    "Web Development",
    "Flutter",
    "Mobile Application Development",
    "Philippines",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | Portfolio`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0a0f1a] font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
