import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import PageTransition from "@/components/PageTransition";
import SiteLoader from "@/components/SiteLoader";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Musfirah Shakeel — Frontend Developer",
  description:
    "Portfolio of Musfirah Shakeel, a Software Engineering student and frontend developer who interned at FlyRank — React, Next.js, TypeScript, Three.js and the Gemini API.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-carbon text-ink">
        <SiteLoader />
        <Nav />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
