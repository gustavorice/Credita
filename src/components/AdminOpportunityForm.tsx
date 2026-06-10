import { CATEGORIES } from "@/lib/constants";
import type { Opportunity } from "@/types";

const input =
  "mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950";

export default function AdminOpportunityForm({
  action,
  initial,
}: {
  action: (form: FormData) => Promise<void>;
  initial?: Opportunity;
}) {
  return (
    <form action={action} className="grid max-w-3xl gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Nome da oportunidade *
          <input name="title" required defaultValue={initial?.title} className={input} />
        </label>
        <label className="text-sm font-medium">
          Slug (vazio = automático)
          <input name="slug" defaultValue={initial?.slug} className={input} />
        </label>
        <label className="text-sm font-medium">
          Empresa *
          <input name="company" required defaultValue={initial?.company} className={input} />
        </label>
        <label className="text-sm font-medium">
          Domínio da empresa (logo)
          <input name="company_domain" placeholder="aws.amazon.com" defaultValue={initial?.company_domain ?? ""} className={input} />
        </label>
        <label className="text-sm font-medium">
          Categoria *
          <select name="category" defaultValue={initial?.category ?? "creditos"} className={input}>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Dificuldade *
          <select name="difficulty" defaultValue={initial?.difficulty ?? "aberto"} className={input}>
            <option value="aberto">Aberto a todos</option>
            <option value="condicoes">Com condições</option>
            <option value="vc">Requer VC / parceiro</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Valor exibido
          <input name="value_label" placeholder="Até US$ 100.000" defaultValue={initial?.value_label ?? ""} className={input} />
        </label>
        <label className="text-sm font-medium">
          Valor em R$ (ordenação)
          <input name="value_brl" type="number" defaultValue={initial?.value_brl ?? ""} className={input} />
        </label>
      </div>

      <label className="text-sm font-medium">
        Tags (separadas por vírgula)
        <input name="tags" placeholder="cloud, ia, brasil, gratuito" defaultValue={initial?.tags.join(", ")} className={input} />
      </label>

      <label className="text-sm font-medium">
        Descrição curta (tabela) *
        <textarea name="short_description" required rows={2} defaultValue={initial?.short_description} className={input} />
      </label>

      <label className="text-sm font-medium">
        Descrição completa *
        <textarea name="description" required rows={5} defaultValue={initial?.description} className={input} />
      </label>

      <label className="text-sm font-medium">
        Requisitos (um por linha)
        <textarea name="eligibility" rows={4} defaultValue={initial?.eligibility.join("\n")} className={input} />
      </label>

      <label className="text-sm font-medium">
        Como aplicar (um passo por linha)
        <textarea name="application_process" rows={4} defaultValue={initial?.application_process.join("\n")} className={input} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Link externo
          <input name="external_url" type="url" defaultValue={initial?.external_url ?? ""} className={input} />
        </label>
        <label className="text-sm font-medium">
          Link afiliado (opcional)
          <input name="affiliate_url" type="url" defaultValue={initial?.affiliate_url ?? ""} className={input} />
        </label>
      </div>

      <div className="flex flex-wrap gap-6 text-sm font-medium">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={initial?.featured} className="h-4 w-4 rounded" />
          Destaque
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="sponsored" defaultChecked={initial?.sponsored} className="h-4 w-4 rounded" />
          Patrocinado
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={initial?.published ?? true} className="h-4 w-4 rounded" />
          Publicado
        </label>
      </div>

      <button className="h-12 w-full max-w-xs rounded-xl bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700">
        Salvar oportunidade
      </button>
    </form>
  );
}
