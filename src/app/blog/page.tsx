import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog — Guias de créditos, editais e programas para startups",
  description:
    "Guias práticos para fundadores brasileiros: como conseguir créditos AWS, OpenAI e Anthropic, melhores programas no Brasil e como reduzir custos de infraestrutura.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${SITE.name}`,
    description:
      "Guias práticos de créditos, editais e programas para startups brasileiras.",
    url: `${SITE.url}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="border-b border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-site px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Blog</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Guias para conseguir créditos e fomento
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-mute dark:text-slate-400">
            O passo a passo real — sem enrolação — para startups brasileiras acessarem
            créditos de cloud e IA, editais públicos e programas de aceleração.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-12 sm:px-6">
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="block rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-brand-500/40 hover:shadow-md sm:p-10 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              Mais recente · {formatDate(featured.created_at)}
            </p>
            <h2 className="mt-3 max-w-3xl text-2xl font-extrabold tracking-tight sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-3xl text-ink-mute dark:text-slate-400">{featured.excerpt}</p>
            <p className="mt-5 text-sm font-semibold text-brand-600">
              Ler guia ({featured.reading_min} min) →
            </p>
          </Link>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-mute">
                {formatDate(post.created_at)} · {post.reading_min} min
              </p>
              <h2 className="mt-2.5 text-lg font-bold leading-snug tracking-tight">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-ink-mute dark:text-slate-400">
                {post.excerpt}
              </p>
              <p className="mt-4 text-sm font-semibold text-brand-600">Ler guia →</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
