import type { Opportunity } from "@/types";
import CompanyLogo from "./CompanyLogo";
import Link from "next/link";

export default function LogoMarquee({ opportunities }: { opportunities: Opportunity[] }) {
  const unique = Array.from(
    new Map(opportunities.map((o) => [o.company, o])).values()
  );
  const loop = [...unique, ...unique];

  return (
    <div className="overflow-hidden py-2" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-10">
        {loop.map((o, i) => (
          <Link
            key={`${o.slug}-${i}`}
            href={`/${o.category}/${o.slug}`}
            tabIndex={-1}
            className="flex items-center gap-2 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
          >
            <CompanyLogo domain={o.company_domain} company={o.company} size={28} className="h-7 w-7" />
            <span className="whitespace-nowrap text-sm font-medium text-ink-mute">{o.company}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
