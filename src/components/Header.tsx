"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import CommandSearch from "./CommandSearch";
import ThemeToggle from "./ThemeToggle";
import type { Opportunity } from "@/types";
import { cn } from "@/lib/utils";

const NAV = [
  { slug: "creditos", label: "Créditos" },
  { slug: "programas", label: "Programas" },
  { slug: "editais", label: "Editais" },
  { slug: "aceleradoras", label: "Aceleradoras" },
  { slug: "perks", label: "Perks" },
  { slug: "brasil", label: "Brasil 🇧🇷" },
];

export default function Header({ opportunities }: { opportunities: Opportunity[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-site items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-black text-white">
            C$
          </span>
          <span className="text-[15px] font-bold tracking-tight">
            Crédito <span className="text-brand-600">para Startups</span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/blog"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Blog
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <CommandSearch opportunities={opportunities} />
          <ThemeToggle />
          <Link
            href="/#diretorio"
            className="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 sm:block"
          >
            Ver diretório
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-slate-200 lg:hidden dark:ring-slate-700"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={cn("border-t border-slate-200 lg:hidden dark:border-slate-800", open ? "block" : "hidden")}>
        <nav className="mx-auto grid max-w-site gap-1 px-4 py-3" aria-label="Menu mobile">
          {[...CATEGORIES.map((c) => ({ slug: c.slug, label: c.name })), { slug: "blog", label: "Blog" }].map(
            (item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
