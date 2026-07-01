import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Montserrat } from "next/font/google";
import "../globals.css";

import { METADATA } from "@/common/constants/metadata";
import { DesktopSidebar } from "@/common/components/layouts/DesktopSidebar";
import { MobileNavbar } from "@/common/components/layouts/MobileNavbar";
import { Preloader } from "@/common/components/ui/Preloader";
import { PreloaderProvider } from "@/common/context/PreloaderContext";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const montserrat = Montserrat({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#09090b",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.DOMAIN || "https://hasbihasbullh.my.id"),
    description: t("description"),
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
      description: t("description"),
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
      locale: locale === "id" ? "id-ID" : "en-US",
      type: "website",
    },
    alternates: {
      canonical: METADATA.openGraph.url,
    },
  };
}

export default async function RootLayout({ 
  children,
  params
}: { 
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <meta name="apple-mobile-web-app-title" content="HSB" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/web-app-manifest-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="msapplication-TileImage" content="/web-app-manifest-192x192.png" />
      </head>
      <body className={montserrat.className}>
        <Preloader />
        {/* Ambient Glow Background */}
        <div className="ambient-glow-container">
          <div className="ambient-glow-orb-1" />
          <div className="ambient-glow-orb-2" />
          <div className="ambient-grid" />
        </div>
        <NextIntlClientProvider messages={messages}>
          <PreloaderProvider>
            <div className="relative z-10 flex min-h-screen">
              <DesktopSidebar />
              <MobileNavbar />
              <main className="flex-1 w-full lg:ml-80 overflow-x-hidden">
                {children}
              </main>
            </div>
          </PreloaderProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
