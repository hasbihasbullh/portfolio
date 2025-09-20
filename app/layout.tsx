import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { METADATA } from "@/common/constants/metadata";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.DOMAIN || "https://hasbihasbullh.my.id"),
  description: METADATA.description,
  keywords: METADATA.keyword.split(",").map((k) => k.trim()),
  creator: METADATA.creator,
  authors: [
    {
      name: METADATA.creator,
      url: METADATA.openGraph.url,
    },
  ],
  openGraph: {
    title: METADATA.profile,
    description: METADATA.description,
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    images: [
      {
        url: METADATA.profile,
        width: 1200,
        height: 630,
        alt: "M Hasbi Hasbullah Portfolio Preview",
      },
    ],
    locale: METADATA.openGraph.locale,
    type: "website",
  },
  alternates: {
    canonical: METADATA.openGraph.url,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={METADATA.openGraph.locale}>
      <body className={montserrat.className}>
        <div>{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
