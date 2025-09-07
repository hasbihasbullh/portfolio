import { Award, Trophy } from "lucide-react";
import { Achievement } from "@/common/data";

export const getTypeIcon = (type: Achievement["type"]): React.ReactElement => {
  return type === "badge" ? <Award className="w-3 h-3" /> : <Trophy className="w-3 h-3" />;
};

export const getTypeBadgeVariant = (type: Achievement["type"]) => {
  return type === "badge" ? "secondary" : "default";
};