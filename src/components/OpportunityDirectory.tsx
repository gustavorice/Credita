"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import type { Opportunity } from "@/types";
import { CATEGORIES, FILTER_TAGS } from "@/lib/constants";
import { DifficultyBadge, SponsoredBadge } from "./Badge";
import CompanyLogo from "./CompanyLogo";
import NewsletterForm from "./NewsletterForm";
import { cn } from "@/lib/utils";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const INITIAL_VISIBLE = 10;

export default function OpportunityDirectory({
  opportunities,
  initialCategory = "todas",
  showCategoryTabs = true,
}: {
  opportunities: Opportunity[];
  initialCategory?: string;
  showCategoryTabs?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return opportunities.filter((o) => {
      if (category !== "todas" && o.category !== category && !o.tags.includes(category)) {
        return false;
      }
      if (activeTags.length > 0 && !activeTags.every((t) => o.tags.includes(t))) {
        return false;
      }
      if (q) {
        const haystack = normalize(
          `${o.title} ${o.company} ${o.category} ${o.short_description} ${o.description} ${o.tags.join(" ")}`
        );
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [opportunities, query, category, activeTags]);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <div id="diretorio">
      {/* Busca */}
      <div className="relative">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-mute"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Buscar em ${opportunities.length} oportunidades…`}
          aria-label="Buscar oportunidades"
          className="h-13 w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-[15px] shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      {/* Abas de categoria */}
      {showCategoryTabs && (
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Categorias">
          {[{ slug: "todas", name: "Todas" }, ...CATEGORIES].map((c) => (
            <button
              key={c.slug}
              role="tab"
              aria-selected={category === c.slug}
              onClick={() => setCategory(c.slug)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-1 ring-inset transition",
                category === c.slug
                  ? "bg-ink text-white ring-ink dark:bg-white dark:text-ink dark:ring-white"
                  : "bg-white text-ink-soft ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* Filtros por tag */}
      <div className="no-scrollbar mt-2 flex items-center gap-2 overflow-x-auto pb-1">
        <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-mute">
          Filtros:
        </span>
        {FILTER_TAGS.map((t) => (
          <button
            key={t.slug}
            onClick={() => toggleTag(t.slug)}
            aria-pressed={activeTags.includes(t.slug)}
            className={cn(
              "whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset transition",
              activeTags.includes(t.slug)
                ? "bg-brand-600 text-white ring-brand-600"
                : "bg-white text-ink-mute ring-slate-200 hover:text-ink dark:bg-slate-900 dark:ring-slate-700"
            )}
          >
            {t.label}
          </button>
        ))}
        {activeTags.length > 0 && (
          <button
            onClick={() => setActiveTags([])}
            className="whitespace-nowrap text-xs font-medium text-brand-600 underline-offset-2 hover:underline"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Tabela (desktop) / cards (mobile) */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="hidden w-full text-left md:table">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-ink-mute dark:border-slate-800">
              <th className="px-5 py-3.5">Oportunidade</th>
              <th className="px-5 py-3.5">Valor estimado</th>
              <th className="px-5 py-3.5">Descrição</th>
              <th className="px-5 py-3.5 text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((o, idx) => (
              <Fragment key={o.slug}>
                <tr
                  className={cn(
                    "cursor-pointer border-b border-slate-100 align-top transition hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-800/50",
                    expanded === o.slug && "bg-slate-50/80 dark:bg-slate-800/50"
                  )}
                  onClick={() => setExpanded(expanded === o.slug ? null : o.slug)}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <CompanyLogo domain={o.company_domain} company={o.company} size={40} className="h-10 w-10 shrink-0 p-1" />
                      <div>
                        <p className="font-semibold leading-tight">{o.company}</p>
                        <p className="mt-0.5 text-xs text-ink-mute">{categoryLabel(o.category)}</p>
                        {o.sponsored && <span className="mt-1 inline-block"><SponsoredBadge /></span>}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-bold text-money">
                    {o.value_label ?? "—"}
                  </td>
                  <td className="max-w-md px-5 py-4 text-sm text-ink-soft dark:text-slate-300">
                    {o.short_description}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/${o.category}/${o.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center rounded-lg bg-ink px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-ink/85 dark:bg-white dark:text-ink"
                    >
                      Detalhes
                    </Link>
                  </td>
                </tr>
                {expanded === o.slug && (
                  <tr className="border-b border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/40">
                    <td colSpan={4} className="px-5 py-5">
                      <ExpandedDetails o={o} />
                    </td>
                  </tr>
                )}
                {idx === 4 && visible.length > 6 && (
                  <tr className="border-b border-slate-100 bg-brand-50/60 dark:border-slate-800 dark:bg-slate-800/60">
                    <td colSpan={4} className="px-5 py-5">
                      <InlineNewsletter />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>

        {/* Mobile */}
        <ul className="divide-y divide-slate-100 md:hidden dark:divide-slate-800">
          {visible.map((o, idx) => (
            <Fragment key={o.slug}>
              <li className="p-4">
                <button
                  className="flex w-full items-start gap-3 text-left"
                  onClick={() => setExpanded(expanded === o.slug ? null : o.slug)}
                  aria-expanded={expanded === o.slug}
                >
                  <CompanyLogo domain={o.company_domain} company={o.company} size={40} className="h-10 w-10 shrink-0 p-1" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold">{o.company}</span>
                      <span className="shrink-0 text-sm font-bold text-money">{o.value_label}</span>
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft dark:text-slate-300">
                      {o.short_description}
                    </span>
                  </span>
                </button>
                {expanded === o.slug && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                    <ExpandedDetails o={o} />
                  </div>
                )}
              </li>
              {idx === 4 && visible.length > 6 && (
                <li className="bg-brand-50/60 p-4 dark:bg-slate-800/60">
                  <InlineNewsletter />
                </li>
              )}
            </Fragment>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="px-5 py-12 text-center text-sm text-ink-mute">
            Nenhuma oportunidade encontrada — tente outra categoria ou limpe a busca.
          </p>
        )}
      </div>

      {!showAll && filtered.length > INITIAL_VISIBLE && (
        <div className="mt-5 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            Mostrar todas as {filtered.length} oportunidades
          </button>
        </div>
      )}
    </div>
  );
}

function ExpandedDetails({ o }: { o: Opportunity }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={o.difficulty} />
        <span className="text-xs text-ink-mute">
          Atualizado em {new Date(o.updated_at).toLocaleDateString("pt-BR")}
        </span>
      </div>
      <h4 className="mt-3 text-sm font-bold uppercase tracking-wide text-ink dark:text-white">
        Requisitos
      </h4>
      <ul className="mt-2 space-y-1.5">
        {o.eligibility.map((e, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink-soft dark:text-slate-300">
            <span className="text-brand-600" aria-hidden>•</span>
            {e}
          </li>
        ))}
      </ul>
      <Link
        href={`/${o.category}/${o.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        Ver análise completa →
      </Link>
    </div>
  );
}

function InlineNewsletter() {
  return (
    <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="font-semibold">Novas oportunidades todo mês — receba antes de todo mundo</p>
        <p className="mt-0.5 text-sm text-ink-mute">
          Junte-se a 1.500+ fundadores. Um e-mail por mês, sem spam.
        </p>
      </div>
      <div className="w-full max-w-md">
        <NewsletterForm source="tabela" />
      </div>
    </div>
  );
}

function categoryLabel(slug: string) {
  const map: Record<string, string> = {
    creditos: "Créditos",
    programas: "Programa",
    editais: "Edital / Fomento",
    aceleradoras: "Aceleradora",
    perks: "Perk / Benefício",
    "inteligencia-artificial": "IA",
    cloud: "Cloud",
    brasil: "Brasil",
  };
  return map[slug] ?? slug;
}
