import { Award, Activity, FolderOpen, Home, Mail, User } from "lucide-react";

export const navigationItems = [
  { name: "Home", href: "/", icon: Home, current: true },
  { name: "About", href: "/about", icon: User, current: false },
  { name: "Achievements", href: "/achievements", icon: Award, current: false },
  { name: "Projects", href: "/projects", icon: FolderOpen, current: false },
  { name: "Activity", href: "/activity", icon: Activity, current: false },
  { name: "Contact", href: "/contact", icon: Mail, current: false },
];
