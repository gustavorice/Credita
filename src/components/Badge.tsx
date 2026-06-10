import { DIFFICULTY_META } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const meta = DIFFICULTY_META[difficulty] ?? DIFFICULTY_META.aberto;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        meta.className
      )}
      title={meta.hint}
    >
      {meta.label}
    </span>
  );
}

export function FeaturedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-600 ring-1 ring-inset ring-brand-500/20">
      ★ Destaque
    </span>
  );
}

export function SponsoredBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-inset ring-slate-400/20">
      Patrocinado
    </span>
  );
}
