import Link from "next/link";
import { CATEGORIES, SITE } from "@/lib/constants";
import NewsletterForm from "./NewsletterForm";
import Logo from "./Logo";

const GUIDES = [
  { slug: "como-conseguir-creditos-aws-startup-brasileira", label: "Guia de créditos AWS" },
  { slug: "como-conseguir-creditos-openai-anthropic", label: "Guia de créditos de IA" },
  { slug: "melhores-programas-para-startups-brasileiras", label: "Programas no Brasil" },
  { slug: "como-reduzir-custos-de-infraestrutura-startup", label: "Reduzir custos de infra" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-mute dark:text-slate-400">
              O diretório gratuito de créditos, programas, aceleradoras, editais e benefícios
              para startups brasileiras. Compare mais de R$ 5 milhões em oportunidades e
              construa sua stack com confiança.
            </p>
            <div className="mt-6 max-w-sm">
              <NewsletterForm source="rodape" />
            </div>
          </div>

          <nav aria-label="Categorias">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink dark:text-white">
              Categorias
            </h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="text-sm text-ink-mute transition hover:text-brand-600 dark:text-slate-400"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Programas populares">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink dark:text-white">
              Populares
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: "/cloud/aws-activate", label: "AWS Activate" },
                { href: "/cloud/google-cloud-para-startups", label: "Google Cloud para Startups" },
                { href: "/cloud/microsoft-for-startups", label: "Microsoft for Startups" },
                { href: "/inteligencia-artificial/anthropic-claude-para-startups", label: "Anthropic Claude" },
                { href: "/editais/fapesp-pipe", label: "FAPESP PIPE" },
                { href: "/editais/finep-startup", label: "Finep Startup" },
                { href: "/programas/sebrae-para-startups", label: "Sebrae para Startups" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-mute transition hover:text-brand-600 dark:text-slate-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Guias">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink dark:text-white">
              Guias
            </h3>
            <ul className="mt-4 space-y-2.5">
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/blog/${g.slug}`}
                    className="text-sm text-ink-mute transition hover:text-brand-600 dark:text-slate-400"
                  >
                    {g.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-sm font-medium text-brand-600">
                  Ver todos os guias →
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-ink-mute sm:flex-row sm:items-center dark:border-slate-800 dark:text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Os valores são estimativas — confirme
            sempre as condições no site oficial de cada programa.
          </p>
          <div className="flex gap-4">
            <Link href="/blog" className="hover:text-brand-600">Blog</Link>
            <Link href="/admin" className="hover:text-brand-600">Admin</Link>
            <a href="/sitemap.xml" className="hover:text-brand-600">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
