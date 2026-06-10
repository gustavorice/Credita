import { logoUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function CompanyLogo({
  domain,
  company,
  size = 40,
  className,
}: {
  domain: string | null;
  company: string;
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoUrl(domain, company)}
      alt={`Logo ${company}`}
      width={size}
      height={size}
      loading="lazy"
      className={cn("rounded-lg bg-white object-contain ring-1 ring-slate-200", className)}
    />
  );
}
