import type { BlogPost } from "@/types";

const input =
  "mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950";

export default function AdminPostForm({
  action,
  initial,
}: {
  action: (form: FormData) => Promise<void>;
  initial?: BlogPost;
}) {
  return (
    <form action={action} className="grid max-w-3xl gap-5">
      <label className="text-sm font-medium">
        Título *
        <input name="title" required defaultValue={initial?.title} className={input} />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Slug (vazio = automático)
          <input name="slug" defaultValue={initial?.slug} className={input} />
        </label>
        <label className="text-sm font-medium">
          Tempo de leitura (min)
          <input name="reading_min" type="number" defaultValue={initial?.reading_min ?? 6} className={input} />
        </label>
        <label className="text-sm font-medium">
          Autor
          <input name="author" defaultValue={initial?.author ?? "Equipe Crédito para Startups"} className={input} />
        </label>
        <label className="text-sm font-medium">
          Imagem de capa (URL, opcional)
          <input name="cover_image" type="url" defaultValue={initial?.cover_image ?? ""} className={input} />
        </label>
      </div>
      <label className="text-sm font-medium">
        Resumo (SEO) *
        <textarea name="excerpt" required rows={2} defaultValue={initial?.excerpt} className={input} />
      </label>
      <label className="text-sm font-medium">
        Conteúdo em Markdown *
        <textarea name="content" required rows={18} defaultValue={initial?.content} className={`${input} font-mono text-[13px]`} />
      </label>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="published" defaultChecked={initial?.published ?? false} className="h-4 w-4 rounded" />
        Publicado
      </label>
      <button className="h-12 w-full max-w-xs rounded-xl bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700">
        Salvar artigo
      </button>
    </form>
  );
}
