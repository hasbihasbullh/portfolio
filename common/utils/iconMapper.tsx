import * as SiIcons from "react-icons/si";
import * as LucideIcons from "lucide-react";
import React from "react";

export const getIconComponent = (iconName: string) => {
  if (!iconName) return LucideIcons.Code; // Fallback icon

  // Check in react-icons/si
  if (iconName.startsWith("Si") && iconName in SiIcons) {
    return (SiIcons as any)[iconName];
  }

  // Check in lucide-react
  if (iconName in LucideIcons) {
    return (LucideIcons as any)[iconName];
  }

  // Default fallback
  return LucideIcons.Code;
};
