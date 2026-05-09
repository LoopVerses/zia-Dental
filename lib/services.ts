import { Award, Users, MapPin, type LucideIcon } from "lucide-react";

export type Stat = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export const STATS: Stat[] = [
  { value: "15+", label: "Years of Care", icon: Award },
  { value: "5,000+", label: "Happy Smiles", icon: Users },
  { value: "G-6", label: "Islamabad", icon: MapPin },
];
