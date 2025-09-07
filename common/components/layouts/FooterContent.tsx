"use client";
import React from "react";
import { profileData } from "@/common/data/profileData";

export const FooterContent = () => {
  return (
    <div className="lg:hidden mt-20 pt-8 border-t border-zinc-800/50">
      <div className="text-center">
        <p className="text-zinc-500 text-xs leading-relaxed">Made with by {profileData.name}</p>
        <p className="text-zinc-600 text-xs mt-1">© 2025 All rights reserved</p>
      </div>
    </div>
  );
};
