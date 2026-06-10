import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, CATEGORY_SLUGS, SITE } from "@/lib/constants";
import { getOpportunitiesByCategory } from "@/lib/data";
import OpportunityDirectory from "@/components/OpportunityDirectory";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ categoria: string }>;
}

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((categoria) => ({ categoria }));
}

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const cat = CATEGORIES.find((c) => c.slug === categoria);
  if (!cat) return {};
  return {
    title: cat.seoTitle,
    description: cat.description,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      title: `${cat.seoTitle} | ${SITE.name}`,
      description: cat.description,
      url: `${SITE.url}/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const cat = CATEGORIES.find((c) => c.slug === categoria);
  if (!cat) notFound();

  const opportunities = await getOpportunitiesByCategory(categoria);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", url: SITE.url },
          { name: cat.name, url: `${SITE.url}/${cat.slug}` },
        ])}
      />
      <section className="border-b border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-site px-4 py-12 sm:px-6 sm:py-16">
          <nav className="text-sm text-ink-mute" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-600">Início</Link>
            <span className="mx-2" aria-hidden>/</span>
            <span className="font-medium text-ink dark:text-white">{cat.name}</span>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {cat.seoTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-mute dark:text-slate-400">
            {cat.description}
          </p>
          <p className="mt-4 text-sm font-semibold text-brand-600">
            {opportunities.length}{" "}
            {opportunities.length === 1 ? "oportunidade listada" : "oportunidades listadas"}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-site px-4 py-12 sm:px-6">
        <OpportunityDirectory
          opportunities={opportunities}
          showCategoryTabs={false}
        />
      </section>
    </>
  );
}
