import Link from "next/link";
import { createAdminClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { deletePost } from "../actions";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPosts() {
  let posts: BlogPost[] = [];
  if (hasSupabaseEnv() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    posts = (data as BlogPost[]) ?? [];
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Artigos ({posts.length})</h1>
        <Link
          href="/admin/artigos/novo"
          className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          + Novo
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 rounded-xl bg-slate-50 px-5 py-8 text-center text-sm text-ink-mute dark:bg-slate-900">
          Nenhum artigo no banco ainda. Rode o <code>supabase/seed.sql</code> ou crie o primeiro.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {posts.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-ink-mute">
                  {formatDate(p.created_at)} ·{" "}
                  <span className={p.published ? "text-emerald-600" : "text-amber-600"}>
                    {p.published ? "Publicado" : "Rascunho"}
                  </span>
                </p>
              </div>
              <div className="flex gap-3 text-sm">
                <Link href={`/admin/artigos/${p.id}`} className="font-semibold text-brand-600">
                  Editar
                </Link>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={p.id} />
                  <button className="font-semibold text-red-600">Excluir</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
