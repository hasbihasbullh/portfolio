import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.DOMAIN || "https://hasbihasbullh.my.id";
  const routes = ["", "/about", "/projects", "/achievements", "/activity", "/contact"];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  for (const route of routes) {
    // Generate alternate URLs for all supported locales
    const alternates = routing.locales.reduce((acc, locale) => {
      acc[locale] = `${baseUrl}/${locale}${route}`;
      return acc;
    }, {} as Record<string, string>);
    
    // Create an entry for each locale variant of the route
    routing.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: alternates
        }
      });
    });
  }

  return sitemapEntries;
}
