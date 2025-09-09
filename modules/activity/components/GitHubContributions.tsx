import React from "react";
import { SiGithub } from "react-icons/si";
import GitHubCalendar from "react-github-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";

import Link from "next/link";

export const GitHubContributions: React.FC = () => {
  const username = "hasbihasbullh";

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-center sm:justify-start gap-2 text-lg sm:text-xl font-semibold text-zinc-200">
        <SiGithub className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
        <h2 className="capitalize truncate">GitHub Contributions</h2>
      </div>

      <div className="flex flex-col items-center gap-2 sm:gap-3 text-zinc-500 sm:flex-row sm:justify-between sm:items-center">
        <p className="text-xs sm:text-sm text-center sm:text-left">My GitHub activity over the past year.</p>
        <Link target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-green-500 hover:text-green-300 transition-colors duration-200 font-medium" href={`https://github.com/${username}`}>
          @{username}
        </Link>
      </div>

      <div className="w-full">
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl shadow-lg p-6 lg:mt-6">
          <div className="space-y-4 flex justify-center">
            <GitHubCalendar
              username={username}
              colorScheme="dark"
              blockSize={12}
              blockMargin={4.8}
              fontSize={13}
              theme={{
                dark: ["#18181D", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              renderBlock={(block, activity) =>
                React.cloneElement(block, {
                  "data-tooltip-id": "react-tooltip",
                  "data-tooltip-html": `
                    <strong>${activity.count}</strong> contribution${activity.count !== 1 ? "s" : ""}<br/>
                    <span style="opacity: 0.8;">${activity.date}</span>
                  `,
                })
              }
              style={{
                color: "#a1a1aa",
              }}
            />
            <ReactTooltip
              id="react-tooltip"
              place="top"
              style={{
                backgroundColor: "#27272a",
                border: "1px solid #52525b",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "500",
              }}
              className="hidden sm:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
