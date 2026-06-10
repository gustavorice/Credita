import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, CATEGORY_SLUGS, DIFFICULTY_META, SITE } from "@/lib/constants";
import { getOpportunities, getOpportunity, getRelatedOpportunities } from "@/lib/data";
import CompanyLogo from "@/components/CompanyLogo";
import { DifficultyBadge, FeaturedBadge, SponsoredBadge } from "@/components/Badge";
import NewsletterForm from "@/components/NewsletterForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, opportunityJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ categoria: string; slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const ops = await getOpportunities();
  return ops.map((o) => ({ categoria: o.category, slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const op = await getOpportunity(slug);
  if (!op) return {};
  const title = `${op.title} — ${op.value_label ?? "créditos e benefícios"}`;
  return {
    title,
    description: op.short_description,
    alternates: { canonical: `/${op.category}/${op.slug}` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description: op.short_description,
      url: `${SITE.url}/${op.category}/${op.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description: op.short_description },
  };
}

export default async function OpportunityPage({ params }: Props) {
  const { categoria, slug } = await params;
  if (!CATEGORY_SLUGS.includes(categoria)) notFound();

  const op = await getOpportunity(slug);
  if (!op) notFound();
  if (op.category !== categoria) redirect(`/${op.category}/${op.slug}`);

  const related = await getRelatedOpportunities(op);
  const cat = CATEGORIES.find((c) => c.slug === op.category)!;
  const url = `${SITE.url}/${op.category}/${op.slug}`;
  const applyUrl = op.affiliate_url || op.external_url;
  const difficulty = DIFFICULTY_META[op.difficulty];

  return (
    <>
      <JsonLd
        data={[
          opportunityJsonLd(op, url),
          breadcrumbJsonLd([
            { name: "Início", url: SITE.url },
            { name: cat.name, url: `${SITE.url}/${cat.slug}` },
            { name: op.title, url },
          ]),
        ]}
      />

      <div className="mx-auto max-w-site px-4 py-10 sm:px-6 sm:py-14">
        <nav className="text-sm text-ink-mute" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-600">Início</Link>
          <span className="mx-2" aria-hidden>/</span>
          <Link href={`/${cat.slug}`} className="hover:text-brand-600">{cat.name}</Link>
          <span className="mx-2" aria-hidden>/</span>
          <span className="font-medium text-ink dark:text-white">{op.company}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Conteúdo principal */}
          <article>
            <div className="flex items-start gap-4">
              <CompanyLogo domain={op.company_domain} company={op.company} size={64} className="h-16 w-16 shrink-0 p-2" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <DifficultyBadge difficulty={op.difficulty} />
                  {op.featured && <FeaturedBadge />}
                  {op.sponsored && <SponsoredBadge />}
                </div>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {op.title}
                </h1>
                <p className="mt-1.5 text-ink-mute dark:text-slate-400">
                  {op.company} · {cat.name} · atualizado em {formatDate(op.updated_at)}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-mute">
                  Valor estimado
                </p>
                <p className="mt-1.5 text-2xl font-extrabold text-money">
                  {op.value_label ?? "Variável"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-mute">
                  Nível de dificuldade
                </p>
                <p className="mt-1.5 text-lg font-bold">{difficulty.label}</p>
                <p className="mt-0.5 text-sm text-ink-mute dark:text-slate-400">{difficulty.hint}</p>
              </div>
            </div>

            <section className="mt-10">
              <h2 className="text-xl font-bold tracking-tight">Sobre a oportunidade</h2>
              <p className="mt-3 leading-relaxed text-ink-soft dark:text-slate-300">
                {op.description}
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold tracking-tight">Requisitos</h2>
              <ul className="mt-4 space-y-3">
                {op.eligibility.map((e, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                  >
                    <span className="font-bold text-emerald-600" aria-hidden>✓</span>
                    {e}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold tracking-tight">Como aplicar</h2>
              <ol className="mt-4 space-y-3">
                {op.application_process.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-ink-soft dark:text-slate-300">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            {applyUrl && (
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener nofollow sponsored"
                className="mt-10 inline-flex w-full items-center justify-center rounded-2xl bg-brand-600 px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-700 sm:w-auto"
              >
                Aplicar agora ↗
              </a>
            )}
            <p className="mt-3 text-xs text-ink-mute">
              Você será direcionado ao site oficial de {op.company}. Confirme as condições
              vigentes antes de aplicar.
            </p>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-sm font-bold uppercase tracking-wide">Receba novas oportunidades</h2>
              <p className="mt-1.5 text-sm text-ink-mute dark:text-slate-400">
                Um e-mail por mês com créditos e editais recém-abertos.
              </p>
              <div className="mt-4">
                <NewsletterForm source={`oportunidade-${op.slug}`} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-sm font-bold uppercase tracking-wide">Oportunidades relacionadas</h2>
              <ul className="mt-4 space-y-1">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/${r.category}/${r.slug}`}
                      className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <CompanyLogo domain={r.company_domain} company={r.company} size={32} className="h-8 w-8 shrink-0 p-0.5" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{r.company}</span>
                        <span className="block text-xs font-bold text-money">{r.value_label}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
