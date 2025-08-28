"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, ExternalLink, Award, Trophy, Filter } from "lucide-react";
import { DesktopSidebar } from "@/components/common/DesktopSidebar";
import { MobileNavbar } from "@/components/common/MobileNavbar";
import { profileData, Achievement, achievementsData } from "@/lib/data";
import SpotlightCard from "@/components/elements/SpotlightCard";

// shadcn/ui components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FilterType = "all" | "certificate" | "badge";

export default function AchievementsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Filter and search logic
  const filteredAchievements = useMemo((): Achievement[] => {
    let filtered: Achievement[] = achievementsData;

    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    if (searchTerm) {
      filtered = filtered.filter((item: Achievement) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.issuer.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return filtered;
  }, [searchTerm, filterType]);

  const getTypeIcon = (type: Achievement["type"]): React.ReactElement => {
    return type === "badge" ? <Award className="w-3 h-3" /> : <Trophy className="w-3 h-3" />;
  };

  const getTypeBadgeVariant = (type: Achievement["type"]) => {
    return type === "badge" ? "secondary" : "default";
  };

  const handleImageError = (achievementId: number) => {
    setImageErrors((prev) => ({ ...prev, [achievementId]: true }));
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <div className="flex-1 lg:ml-80 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          <div className="pt-20 lg:pt-0">
            {/* Header Section */}
            <div className="mb-8 lg:mb-12">
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-50">Achievements</h1>

                  {/* Search and Filter Controls - Hidden on mobile */}
                  <div className="hidden lg:flex flex-col sm:flex-row gap-4 lg:min-w-96">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <Input
                        placeholder="Search certificates..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-400 focus:border-zinc-700"
                        aria-label="Search certificates"
                      />
                    </div>

                    <Select value={filterType} onValueChange={(value: FilterType) => setFilterType(value)}>
                      <SelectTrigger className="w-full sm:w-48 bg-zinc-900 border-zinc-800 text-zinc-100" aria-label="Filter certificates by type">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="all" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                          All
                        </SelectItem>
                        <SelectItem value="certificate" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                          Certificates
                        </SelectItem>
                        <SelectItem value="badge" className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100">
                          Badges
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <p className="text-zinc-400 text-base lg:text-lg max-w-2xl">A showcase of my professional certificates and badges, highlighting my skills and accomplishments in technology and innovation.</p>

                <Separator className="my-6 bg-zinc-800" />
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.length === 0 ? (
                <div className="col-span-full">
                  <Alert className="bg-zinc-900 border-zinc-800">
                    <Search className="h-4 w-4 text-zinc-400" />
                    <AlertDescription className="text-center py-8">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-zinc-100">No certificates found</h3>
                        <p className="text-zinc-400">Try adjusting your search terms or select a different filter to find what you&apos;re looking for.</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                filteredAchievements.map((item: Achievement) => (
                  <SpotlightCard key={item.id} className="group overflow-hidden transition-all duration-300 cursor-pointer !p-0">
                    {/* Certificate Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
                      {imageErrors[item.id] ? (
                        // Fallback when image fails to load
                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-800">
                          <Award className="w-12 h-12 mb-2 opacity-50" />
                          <span className="text-sm text-center px-4">Certificate Image</span>
                        </div>
                      ) : (
                        <Image
                          src={item.image}
                          alt={`Sertifikat ${item.title} dari ${item.issuer} diterbitkan pada ${item.issuedOn}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          quality={85}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={() => handleImageError(item.id)}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R6i+gaVUoUS4udNcwuBvdgeCUtxbeI/fkjqGDC3Ew=="
                        />
                      )}

                      {/* Achievement Type Badge */}
                      <div className="absolute top-1 right-1 p-1">
                        <Badge variant={getTypeBadgeVariant(item.type)} className={`gap-1 ${item.type === "badge" ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600" : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"}`}>
                          {getTypeIcon(item.type)}
                          <span className="capitalize text-xs">{item.type}</span>
                        </Badge>
                      </div>

                      {/* Credential ID Badge */}
                      {item.credentialId && (
                        <div className="absolute bottom-1 left-1 p-1">
                          <Badge variant="outline" className="gap-1 bg-zinc-900 text-zinc-100 border-zinc-700 hover:bg-zinc-800 text-xs">
                            <span>{item.credentialId}</span>
                          </Badge>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="gap-2 bg-transparent text-white hover:bg-white/20"
                          onClick={() => window.open(item.credentialUrl, "_blank", "noopener,noreferrer")}
                        >
                          View Credentials
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-1">
                      <h3 className="text-base line-clamp-2 leading-tight text-zinc-100">{item.title}</h3>
                      <p className="font-medium text-zinc-400">{item.issuer}</p>
                      <p className="text-sm font-medium text-zinc-700">Issued on</p>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span>{item.issuedOn}</span>
                      </div>
                    </div>
                  </SpotlightCard>
                ))
              )}
            </div>

            {/* Enhanced Footer */}
            <div className="lg:hidden mt-20 pt-8 border-t border-zinc-800/50">
              <div className="text-center">
                <p className="text-zinc-500 text-xs leading-relaxed">Made with by {profileData.name}</p>
                <p className="text-zinc-600 text-xs mt-1">© 2025 All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}