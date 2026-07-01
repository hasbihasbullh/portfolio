"use client";
import React, { useEffect, useState } from "react";
import { SiWakatime } from "react-icons/si";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { useTranslations } from "next-intl";

export const WakatimeStats = () => {
  const t = useTranslations("Activity.wakatime");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/activity/wakatime")
      .then(res => res.json())
      .then(resData => {
        if (!resData.error) {
          setData(resData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch wakatime", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-lg sm:text-xl font-semibold text-zinc-200">
          <SiWakatime className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <h2 className="capitalize truncate">{t("title")}</h2>
        </div>
        <div className="flex flex-col items-center gap-2 sm:gap-3 text-zinc-500 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-xs sm:text-sm text-center sm:text-left">{t("description")}</p>
        </div>
      </div>

      <SpotlightCard className="bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors duration-300 border border-zinc-800/80 rounded-xl shadow-lg p-5">
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 w-1/3 bg-zinc-800 animate-pulse rounded" />
            <div className="space-y-4 mt-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 w-16 bg-zinc-800 animate-pulse rounded" />
                    <div className="h-3 w-8 bg-zinc-800 animate-pulse rounded" />
                  </div>
                  <div className="h-2 w-full bg-zinc-800 animate-pulse rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
              <span className="text-sm font-medium text-zinc-400">{t("totalTime")}</span>
              <span className="text-sm font-bold tracking-wide">{data?.total_time || "0 hrs"}</span>
            </div>

            <div className="space-y-5">
              {data?.languages?.length > 0 ? (
                data.languages.map((lang: any) => (
                  <div key={lang.name} className="space-y-2 group">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-zinc-300 group-hover:text-white transition-colors">{lang.name}</span>
                      <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">{lang.percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: lang.color || '#ffffffff'
                        }}
                      >
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-zinc-500 py-4 text-center">{t("noData")}</div>
              )}
            </div>
          </div>
        )}
      </SpotlightCard>
    </section>
  );
};
