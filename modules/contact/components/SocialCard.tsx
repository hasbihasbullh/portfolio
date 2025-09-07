"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";

interface SocialCard {
  title: string;
  description: string;
  action: string;
  gradient: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconBg: string;
  onClick: () => void;
  accent: string;
  link: string | undefined;
}

interface SocialCardProps {
  socialCard: SocialCard[];
}

export function SocialCard({ socialCard }: SocialCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent, onClick: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-50 mb-2">Other ways to connect</h2>
        <p className="text-zinc-400 text-sm">Prefer social media? Find me on these platforms.</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {socialCard.map((card, index) => {
          const isDisabled = !card.link;
          return (
            <div
              key={card.title}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${card.gradient} p-[1px] transition-all duration-300 cursor-pointer ${card.accent} ${
                isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-102 focus-within:scale-102"
              }`}
              onClick={!isDisabled ? card.onClick : undefined}
              onKeyDown={!isDisabled ? (e) => handleKeyDown(e, card.onClick) : undefined}
              tabIndex={!isDisabled ? 0 : -1}
              role="button"
              aria-label={`${card.action} - ${card.description}`}
              aria-disabled={isDisabled}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full rounded-xl p-4 transition-all duration-300">
                <div className={`absolute -bottom-2 -right-2 opacity-10 transition-all duration-300 ${!isDisabled && "group-hover:opacity-15 group-hover:scale-110 group-focus:opacity-15 group-focus:scale-110"}`}>
                  <card.icon size={95} className="text-zinc-200 rotate-12" />
                </div>
                <div className="relative z-10 space-y-2">
                  <h3 className="text-zinc-200 text-sm font-bold pr-8">{card.title}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed pr-4">{card.description}</p>
                  <div className={`flex items-center gap-1 text-zinc-200 text-xs font-medium transition-all duration-300 ${!isDisabled && "group-hover:gap-2 group-focus:gap-2"}`}>
                    <span>{isDisabled ? "Not Available" : card.action}</span>
                    {!isDisabled && <ArrowUpRight size={12} className="group-hover:rotate-45 group-focus:rotate-45 transition-transform duration-300" />}
                  </div>
                </div>
                {!isDisabled && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200/5 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 rounded-xl"></div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
