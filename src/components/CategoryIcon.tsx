import {
  Briefcase,
  Building2,
  Car,
  Cross,
  Heart,
  HeartPulse,
  House,
  Smile,
  CircleHelp,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  auto: Car,
  home: House,
  life: Heart,
  health: HeartPulse,
  medicare: Cross,
  business: Briefcase,
  dental: Smile,
  renters: Building2,
};

export function CategoryIcon({ name, size = 22, className }: { name: string; size?: number; className?: string }) {
  const Icon = MAP[name] ?? CircleHelp;
  return <Icon size={size} strokeWidth={2} className={className} />;
}
