"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Opportunity } from "@/types";
import CompanyLogo from "./CompanyLogo";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function CommandSearch({ opportunities }: { opportunities: Opportunity[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return opportunities.slice(0, 7);
    return opportunities
      .filter((o) =>
        normalize(
          `${o.title} ${o.company} ${o.category} ${o.short_description} ${o.tags.join(" ")}`
        ).includes(q)
      )
      .slice(0, 8);
  }, [query, opportunities]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-ink-mute ring-1 ring-slate-200 transition hover:bg-slate-50 dark:text-slate-400 dark:ring-slate-700 dark:hover:bg-slate-800"
        aria-label="Buscar oportunidades"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="hidden md:inline">Buscar</span>
        <kbd className="hidden rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium md:inline dark:border-slate-700 dark:bg-slate-800">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Busca global"
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-mute" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque por nome, empresa ou categoria…"
                className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-slate-400"
              />
              <kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-[11px] text-ink-mute dark:border-slate-700">esc</kbd>
            </div>
            <ul className="max-h-[55vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-ink-mute">
                  Nada encontrado para “{query}”. Tente outro termo.
                </li>
              )}
              {results.map((o) => (
                <li key={o.slug}>
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push(`/${o.category}/${o.slug}`);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <CompanyLogo domain={o.company_domain} company={o.company} size={32} className="h-8 w-8 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{o.title}</span>
                      <span className="block truncate text-xs text-ink-mute">{o.short_description}</span>
                    </span>
                    {o.value_label && (
                      <span className="shrink-0 text-sm font-bold text-money">{o.value_label}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
