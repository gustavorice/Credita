import Link from "next/link";
import { createAdminClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { deleteOpportunity } from "../actions";
import type { Opportunity } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminOpportunities() {
  let ops: Opportunity[] = [];
  if (hasSupabaseEnv() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("opportunities")
      .select("*")
      .order("updated_at", { ascending: false });
    ops = (data as Opportunity[]) ?? [];
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Oportunidades ({ops.length})</h1>
        <Link
          href="/admin/oportunidades/nova"
          className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          + Nova
        </Link>
      </div>

      {ops.length === 0 ? (
        <p className="mt-8 rounded-xl bg-slate-50 px-5 py-8 text-center text-sm text-ink-mute dark:bg-slate-900">
          Nenhuma oportunidade no banco ainda. Rode o <code>supabase/seed.sql</code> ou crie a primeira.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-ink-mute dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {ops.map((o) => (
                <tr key={o.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                  <td className="px-4 py-3 font-medium">
                    {o.title}
                    {o.featured && <span className="ml-2 text-xs text-brand-600">★</span>}
                  </td>
                  <td className="px-4 py-3 text-ink-mute">{o.category}</td>
                  <td className="px-4 py-3 font-semibold text-money">{o.value_label ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={o.published ? "text-emerald-600" : "text-amber-600"}>
                      {o.published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/oportunidades/${o.id}`} className="font-semibold text-brand-600">
                        Editar
                      </Link>
                      <form action={deleteOpportunity}>
                        <input type="hidden" name="id" value={o.id} />
                        <button className="font-semibold text-red-600">Excluir</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
