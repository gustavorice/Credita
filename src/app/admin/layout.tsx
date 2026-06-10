import Link from "next/link";
import { signOut } from "./actions";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-site px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <nav className="flex flex-wrap gap-1" aria-label="Admin">
          {[
            { href: "/admin", label: "Visão geral" },
            { href: "/admin/oportunidades", label: "Oportunidades" },
            { href: "/admin/artigos", label: "Artigos" },
            { href: "/admin/newsletter", label: "Newsletter" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <form action={signOut}>
          <button className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40">
            Sair
          </button>
        </form>
      </div>
      <div className="py-8">{children}</div>
    </div>
  );
}
