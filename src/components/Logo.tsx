import { cn } from "@/lib/utils";

// Marca da Creditas: tile com gradiente violeta + glifo "spark" branco.
export default function Logo({
  className,
  wordmark = true,
}: {
  className?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-600/30 ring-1 ring-white/20">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2.5l2.2 5.3 5.3 2.2-5.3 2.2L12 17.5l-2.2-5.3L4.5 10l5.3-2.2L12 2.5z"
            fill="white"
          />
          <circle cx="18.5" cy="18.5" r="2.2" fill="white" fillOpacity="0.85" />
        </svg>
      </span>
      {wordmark && (
        <span className="text-[18px] font-extrabold tracking-tight text-white">
          Creditas
        </span>
      )}
    </span>
  );
}
