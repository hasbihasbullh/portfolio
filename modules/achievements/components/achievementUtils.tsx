import { Award, Trophy } from "lucide-react";

export const getTypeIcon = (type: string): React.ReactElement => {
  return type === "badge" ? <Award className="w-3 h-3" /> : <Trophy className="w-3 h-3" />;
};

export const getTypeBadgeVariant = (type: string) => {
  return type === "badge" ? "secondary" : "default";
};