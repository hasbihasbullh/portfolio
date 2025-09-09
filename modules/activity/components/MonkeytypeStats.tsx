import React from "react";

import { SiMonkeytype } from "react-icons/si";

export const MonkeytypeStats = () => {
  return (
    <section className="space-y-2">
      <div className="flex items-center gap-1.5 text-xl font-medium text-zinc-200">
        <SiMonkeytype />
        <h2 className="capitalize">Monkeytype Stats</h2>
      </div>
      <div className="flex flex-col justify-between gap-2 text-neutral-600 md:flex-row lg:items-center">
        <p>Typing statistics and performance.</p>
        <a target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 hover:text-neutral-900" href="https://github.com/">
          hasbixyz
        </a>
      </div>
      {/* <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-4">
          <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden rounded-2xl border-[1.5px] flex flex-col p-4 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
              style={{
                opacity: 0,
                background: "radial-gradient(circle at 168.011px -0.576691px, rgba(255, 255, 255, 0.25), transparent 80%)",
              }}
            />
            <span className="text-sm text-zinc-200">Total</span>
            <div>
              <span className="text-xl font-medium text-green-600 lg:text-2xl"></span>
            </div>
          </SpotlightCard>
          <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden rounded-2xl border-[1.5px] flex flex-col p-4 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
              style={{
                opacity: 0,
                background: "radial-gradient(circle at 116.514px -0.576691px, rgba(255, 255, 255, 0.25), transparent 80%)",
              }}
            />
            <span className="text-sm text-zinc-200">This week</span>
            <div>
              <span className="text-xl font-medium text-green-600 lg:text-2xl"></span>
            </div>
          </SpotlightCard>
          <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden rounded-2xl border-[1.5px] flex flex-col p-4 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
              style={{
                opacity: 0,
                background: "radial-gradient(circle at 21.5824px 38.679px, rgba(255, 255, 255, 0.25), transparent 80%)",
              }}
            />
            <span className="text-sm text-zinc-200">Best</span>
            <div>
              <span className="text-xl font-medium text-green-600 lg:text-2xl"></span>
            </div>
          </SpotlightCard>
          <SpotlightCard className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden rounded-2xl border-[1.5px] flex flex-col p-4 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
              style={{
                opacity: 0,
                background: "radial-gradient(circle at 0px 0px, rgba(255, 255, 255, 0.25), transparent 80%)",
              }}
            />
            <span className="text-sm text-zinc-200">Average</span>
            <div>
              <span className="text-xl font-medium text-green-600 lg:text-2xl"></span>
              <span className="text-sm text-zinc-200"> / day</span>
            </div>
          </SpotlightCard>
        </div>
      </div> */}
    </section>
  );
};
