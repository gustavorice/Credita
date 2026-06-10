import Link from "next/link";
import { createAdminClient, hasSupabaseEnv } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let stats = { ops: 0, posts: 0, subs: 0 };

  if (hasSupabaseEnv() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createAdminClient();
    const [ops, posts, subs] = await Promise.all([
      supabase.from("opportunities").select("id", { count: "exact", head: true }),
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    ]);
    stats = { ops: ops.count ?? 0, posts: posts.count ?? 0, subs: subs.count ?? 0 };
  }

  const cards = [
    { label: "Oportunidades", value: stats.ops, href: "/admin/oportunidades", cta: "Gerenciar" },
    { label: "Artigos", value: stats.posts, href: "/admin/artigos", cta: "Gerenciar" },
    { label: "Inscritos na newsletter", value: stats.subs, href: "/admin/newsletter", cta: "Ver lista" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Visão geral</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm font-medium text-ink-mute">{c.label}</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">{c.value}</p>
            <Link href={c.href} className="mt-4 inline-block text-sm font-semibold text-brand-600">
              {c.cta} →
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/oportunidades/nova"
          className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          + Nova oportunidade
        </Link>
        <Link
          href="/admin/artigos/novo"
          className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          + Novo artigo
        </Link>
      </div>
    </div>
  );
}
