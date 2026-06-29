"use client";
import React, { useEffect, useState } from "react";
import { SiMonkeytype } from "react-icons/si";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const MonkeytypeStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/activity/monkeytype")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setStats(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch monkeytype stats", err);
        setLoading(false);
      });
  }, []);

  const getBestWpm = (time: number) => {
    try {
      const records = stats?.personalBests?.time?.[time];
      if (records && records.length > 0) {
        return Math.max(...records.map((r: any) => r.wpm)).toFixed(0);
      }
    } catch (e) {}
    return "-";
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return "-";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getChartData = () => {
    if (!stats || !stats.personalBests) return [];
    const records: any[] = [];
    
    const processCategory = (category: any) => {
      if (!category) return;
      Object.keys(category).forEach((key) => {
        category[key].forEach((record: any) => {
          if (record.timestamp && record.wpm) {
            records.push({
              date: new Date(record.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
              timestamp: record.timestamp,
              wpm: parseFloat(record.wpm.toFixed(1)),
              acc: record.acc
            });
          }
        });
      });
    };
    
    processCategory(stats.personalBests.time);
    processCategory(stats.personalBests.words);
    
    records.sort((a, b) => a.timestamp - b.timestamp);
    return records;
  };

  const chartData = getChartData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl">
          <p className="text-zinc-400 text-xs mb-1">{label}</p>
          <p className="text-yellow-500 font-bold">
            {payload[0].value} <span className="text-xs font-normal">WPM</span>
          </p>
          <p className="text-zinc-300 text-sm">
            {payload[0].payload.acc}% <span className="text-xs text-zinc-500">Acc</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xl font-medium text-zinc-200">
          <SiMonkeytype className="text-yellow-500" />
          <h2 className="capitalize">Monkeytype Stats</h2>
        </div>
        <div className="flex flex-col justify-between gap-2 text-neutral-600 md:flex-row lg:items-center">
          <p className="text-xs sm:text-sm text-center sm:text-left text-zinc-500">Typing statistics and performance progression.</p>
          <a target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200 font-medium" href={`https://monkeytype.com/profile/${stats?.name || "hasbixyz"}`}>
            @{stats?.name || "hasbixyz"}
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden rounded-2xl border-[1.5px] flex flex-col p-4 text-center">
            <span className="text-sm text-zinc-400">15s Best WPM</span>
            <div className="mt-2">
              {loading ? (
                <div className="h-6 w-16 bg-zinc-800 animate-pulse rounded mx-auto"></div>
              ) : (
                <span className="text-2xl font-bold text-yellow-500">{getBestWpm(15)}</span>
              )}
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden rounded-2xl border-[1.5px] flex flex-col p-4 text-center">
            <span className="text-sm text-zinc-400">60s Best WPM</span>
            <div className="mt-2">
              {loading ? (
                <div className="h-6 w-16 bg-zinc-800 animate-pulse rounded mx-auto"></div>
              ) : (
                <span className="text-2xl font-bold text-yellow-500">{getBestWpm(60)}</span>
              )}
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden rounded-2xl border-[1.5px] flex flex-col p-4 text-center">
            <span className="text-sm text-zinc-400">Tests Started</span>
            <div className="mt-2">
              {loading ? (
                <div className="h-6 w-16 bg-zinc-800 animate-pulse rounded mx-auto"></div>
              ) : (
                <span className="text-2xl font-bold text-zinc-200">{stats?.typingStats?.startedTests || "-"}</span>
              )}
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden rounded-2xl border-[1.5px] flex flex-col p-4 text-center">
            <span className="text-sm text-zinc-400">Time Typed</span>
            <div className="mt-2">
              {loading ? (
                <div className="h-6 w-16 bg-zinc-800 animate-pulse rounded mx-auto"></div>
              ) : (
                <span className="text-2xl font-bold text-zinc-200">{formatTime(stats?.typingStats?.timeTyping)}</span>
              )}
            </div>
          </SpotlightCard>
        </div>

        {/* Chart Section */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl shadow-lg p-6 lg:mt-6 w-full">
          <h3 className="text-sm font-medium text-zinc-400 mb-6 text-center sm:text-left">WPM Progression (Personal Bests)</h3>
          <div className="h-[250px] w-full">
            {loading ? (
              <div className="w-full h-full bg-zinc-800/50 animate-pulse rounded-lg"></div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="date" 
                    stroke="#52525b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    minTickGap={20}
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    domain={['dataMin - 10', 'dataMax + 10']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="wpm" 
                    stroke="#eab308" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#eab308", strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#facc15" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm">
                No typing data available.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
