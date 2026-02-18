import { cn } from "@/lib/utils";
import type { NoteFrontmatter } from "@/lib/mdx";

const categoryConfig: Record<
  NoteFrontmatter["category"],
  { label: string; color: string; bg: string; border: string }
> = {
  networking: {
    label: "Networking",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  offensive: {
    label: "Offensive",
    color: "text-brand-red",
    bg: "bg-brand-red/10",
    border: "border-brand-red/20",
  },
  defensive: {
    label: "Defensive",
    color: "text-brand-green",
    bg: "bg-brand-green/10",
    border: "border-brand-green/20",
  },
  general: {
    label: "General",
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/20",
  },
};

interface NoteCategoryBadgeProps {
  category: NoteFrontmatter["category"];
  count?: number;
  className?: string;
}

export function NoteCategoryBadge({
  category,
  count,
  className,
}: NoteCategoryBadgeProps) {
  const config = categoryConfig[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        config.color,
        config.bg,
        config.border,
        className
      )}
    >
      {config.label}
      {count !== undefined && (
        <span className="ml-0.5 opacity-60">({count})</span>
      )}
    </span>
  );
}

export { categoryConfig };
