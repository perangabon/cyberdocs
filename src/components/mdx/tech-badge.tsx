import { cn } from "@/lib/utils";

type BadgeVariant = "flag" | "port" | "protocol" | "tool" | "warning" | "info";

interface TechBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  flag: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
  port: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  protocol: "bg-brand-green/10 text-brand-green border-brand-green/20",
  tool: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  warning: "bg-brand-red/10 text-brand-red border-brand-red/20",
  info: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

export function TechBadge({ children, variant = "flag" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-xs font-medium transition-colors",
        variantStyles[variant]
      )}
    >
      {children}
    </span>
  );
}
