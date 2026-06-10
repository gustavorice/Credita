"use client";

import Link from "next/link";
import { useState } from "react";
import CommandSearch from "./CommandSearch";
import type { Opportunity } from "@/types";
import { cn } from "@/lib/utils";

type MenuItem = { label: string; slug: string; desc: string };
type Menu = { label: string; items: MenuItem[]; browse: { label: string; slug: string } };

const MENU: Menu[] = [
  {
    label: "Créditos",
    items: [
      { label: "Créditos de IA", slug: "inteligencia-artificial", desc: "OpenAI, Anthropic, GPUs e ML" },
      { label: "Créditos de Cloud", slug: "cloud", desc: "AWS, Google Cloud, Azure, Oracle" },
      { label: "Ferramentas de dev", slug: "creditos", desc: "SaaS e ferramentas para construir" },
    ],
    browse: { label: "Ver todos os créditos", slug: "creditos" },
  },
  {
    label: "Programas",
    items: [
      { label: "Programas para startups", slug: "programas", desc: "Google, Microsoft, NVIDIA Inception" },
      { label: "Aceleradoras", slug: "aceleradoras", desc: "Investimento, rede e mentoria" },
    ],
    browse: { label: "Ver todos os programas", slug: "programas" },
  },
  {
    label: "Perks & Benefícios",
    items: [
      { label: "Perks & Benefícios", slug: "perks", desc: "Stripe, Notion, HubSpot e mais" },
    ],
    browse: { label: "Ver todos os perks", slug: "perks" },
  },
  {
    label: "Editais",
    items: [
      { label: "Editais & fomento", slug: "editais", desc: "FAPESP, Finep, BNDES, Sebrae" },
      { label: "Brasil 🇧🇷", slug: "brasil", desc: "Exclusivo para startups brasileiras" },
    ],
    browse: { label: "Ver todos os editais", slug: "editais" },
  },
];

const LINKS = [{ label: "Recursos", href: "/blog" }];

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
        <circle cx="12" cy="11.5" r="6.5" fill="#a78bfa" />
        <circle cx="20" cy="11.5" r="6.5" fill="#7c3aed" fillOpacity="0.92" />
        <circle cx="16" cy="20.5" r="6.5" fill="#8b5cf6" fillOpacity="0.92" />
      </svg>
      <span className="text-[17px] font-extrabold tracking-tight text-ink">Creditas</span>
    </span>
  );
}

export default function Header({ opportunities }: { opportunities: Opportunity[] }) {
  const [open, setOpen] = useState(false);

  const count = (slug: string) =>
    opportunities.filter((o) => o.category === slug || o.tags.includes(slug)).length;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-site items-center gap-3 px-4 sm:px-6">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Nav desktop com dropdowns */}
        <nav className="ml-3 hidden items-center lg:flex" aria-label="Principal">
          {MENU.map((menu) => (
            <div key={menu.label} className="group relative">
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition group-hover:text-brand-600">
                {menu.label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 opacity-60" aria-hidden>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5">
                  {menu.items.map((item) => (
                    <Link
                      key={item.slug + item.label}
                      href={`/${item.slug}`}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-brand-50"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-ink">{item.label}</span>
                        <span className="block truncate text-xs text-ink-mute">{item.desc}</span>
                      </span>
                      <span className="mt-0.5 shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-ink-mute">
                        {count(item.slug)}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href={`/${menu.browse.slug}`}
                    className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
                  >
                    {menu.browse.label} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:text-brand-600"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#diretorio"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
          >
            Anunciar
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <CommandSearch opportunities={opportunities} />
          <Link
            href="/#diretorio"
            className="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 sm:block"
          >
            Ver diretório
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-slate-200 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={cn("border-t border-slate-200 lg:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto grid max-w-site gap-1 px-4 py-3" aria-label="Menu mobile">
          {MENU.flatMap((m) => m.items).map((item) => (
            <Link
              key={item.slug + item.label}
              href={`/${item.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-slate-100"
            >
              {item.label}
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-ink-mute">
                {count(item.slug)}
              </span>
            </Link>
          ))}
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-slate-100"
          >
            Recursos
          </Link>
          <Link
            href="/#diretorio"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-lg bg-brand-600 px-3 py-2.5 text-center text-[15px] font-semibold text-white"
          >
            Ver diretório
          </Link>
        </nav>
      </div>
    </header>
  );
}
