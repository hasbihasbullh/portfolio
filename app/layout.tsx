import type React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "M Hasbi Hasbullah | Portfolio",
  description: " available for freelance projects worldwide. Specializing in user-centered design and modern web development.",
  keywords: "Portfolio, Freelance, Design, Web Development, M Hasbi Hasbullah",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="min-h-screen bg-zinc-950">{children}</div>
      </body>
    </html>
  );
}
