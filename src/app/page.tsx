import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { getOpportunities, getPosts } from "@/lib/data";
import NewsletterForm from "@/components/NewsletterForm";
import LogoMarquee from "@/components/LogoMarquee";
import OpportunityDirectory from "@/components/OpportunityDirectory";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
  const [opportunities, posts] = await Promise.all([getOpportunities(), getPosts()]);
  const latestPost = posts[0];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(60rem 30rem at 85% -10%, rgba(53,86,224,.45), transparent 60%), radial-gradient(40rem 24rem at 0% 110%, rgba(16,185,129,.25), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-site px-4 py-20 sm:px-6 sm:py-28">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-emerald-300 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            Mais de R$ 5 milhões em créditos e benefícios disponíveis
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Descubra créditos, benefícios e oportunidades para startups brasileiras
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Mais de R$ 5 milhões em créditos, programas e benefícios para fundadores de
            startups e SaaS — de AWS e Google Cloud a FAPESP, Finep e Sebrae. Compare tudo
            lado a lado e aplique com confiança.
          </p>
          <div className="mt-8 max-w-xl">
            <NewsletterForm variant="hero" source="hero" />
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-white/[0.03] py-4">
          <p className="mb-1 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
            Oportunidades de empresas como
          </p>
          <div className="invert-0 [&_img]:bg-transparent [&_img]:ring-0 [&_span]:text-slate-300">
            <LogoMarquee opportunities={opportunities} />
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="mx-auto max-w-site px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Explore por categoria
            </h2>
            <p className="mt-2 text-ink-mute dark:text-slate-400">
              Créditos de cloud e IA, fomento público brasileiro, aceleradoras e perks.
            </p>
          </div>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const count = opportunities.filter(
              (o) => o.category === c.slug || o.tags.includes(c.slug)
            ).length;
            return (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="font-semibold group-hover:text-brand-600">{c.name}</p>
                <p className="mt-1.5 line-clamp-2 text-sm text-ink-mute dark:text-slate-400">
                  {c.description}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {count} {count === 1 ? "oportunidade" : "oportunidades"} →
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* DIRETÓRIO */}
      <section className="border-t border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-site px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Todas as oportunidades
          </h2>
          <p className="mt-2 max-w-2xl text-ink-mute dark:text-slate-400">
            Busque por nome, empresa ou categoria. Clique em uma linha para ver os requisitos.
          </p>
          <div className="mt-7">
            <OpportunityDirectory opportunities={opportunities} />
          </div>
        </div>
      </section>

      {/* ÚLTIMO GUIA */}
      {latestPost && (
        <section className="mx-auto max-w-site px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Último guia</h2>
            <Link href="/blog" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              Ver todos →
            </Link>
          </div>
          <Link
            href={`/blog/${latestPost.slug}`}
            className="mt-6 block rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-brand-500/40 hover:shadow-md sm:p-9 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              Guia · {formatDate(latestPost.created_at)}
            </p>
            <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
              {latestPost.title}
            </h3>
            <p className="mt-3 max-w-3xl text-ink-mute dark:text-slate-400">{latestPost.excerpt}</p>
            <p className="mt-5 text-sm font-semibold text-brand-600">
              Ler guia ({latestPost.reading_min} min) →
            </p>
          </Link>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-site px-4 py-16 sm:px-6">
          <div className="rounded-3xl bg-ink px-6 py-12 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Junte-se a 1.500+ fundadores brasileiros
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Receba todo mês as novas oportunidades de créditos, editais e programas —
              antes de elas lotarem.
            </p>
            <div className="mx-auto mt-7 flex max-w-xl justify-center">
              <NewsletterForm variant="hero" source="cta-final" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
