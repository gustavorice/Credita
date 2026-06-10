import { createAdminClient, hasSupabaseEnv } from "@/lib/supabase/server";
import type { NewsletterSubscriber } from "@/types";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminNewsletter() {
  let subs: NewsletterSubscriber[] = [];
  if (hasSupabaseEnv() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    subs = (data as NewsletterSubscriber[]) ?? [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">
        Inscritos na newsletter ({subs.length})
      </h1>

      {subs.length === 0 ? (
        <p className="mt-8 rounded-xl bg-slate-50 px-5 py-8 text-center text-sm text-ink-mute dark:bg-slate-900">
          Nenhum inscrito ainda. As inscrições do site aparecem aqui.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-ink-mute dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Origem</th>
                <th className="px-4 py-3">Data</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                  <td className="px-4 py-3 font-medium">{s.email}</td>
                  <td className="px-4 py-3 text-ink-mute">{s.source ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-mute">{formatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
