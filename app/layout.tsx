import type { Metadata } from "next";
import { Geist, Source_Serif_4 as Source_Serif_Pro } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/client/navbar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Source_Serif_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Story App",
  description: "A beautiful storytelling platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
