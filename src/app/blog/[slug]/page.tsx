import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getPosts } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { formatDate, markdownToHtml } from "@/lib/utils";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import NewsletterForm from "@/components/NewsletterForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | ${SITE.name}`,
      description: post.excerpt,
      url: `${SITE.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const posts = await getPosts();
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = `${SITE.url}/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(post, url),
          breadcrumbJsonLd([
            { name: "Início", url: SITE.url },
            { name: "Blog", url: `${SITE.url}/blog` },
            { name: post.title, url },
          ]),
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <nav className="text-sm text-ink-mute" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-600">Início</Link>
          <span className="mx-2" aria-hidden>/</span>
          <Link href="/blog" className="hover:text-brand-600">Blog</Link>
        </nav>

        <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-ink-mute">
          {post.author} · {formatDate(post.created_at)} · {post.reading_min} min de leitura
        </p>

        <div
          className="prose-article mt-10"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />

        <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold tracking-tight">
            Gostou do guia? Receba os próximos por e-mail
          </h2>
          <p className="mt-1.5 text-sm text-ink-mute dark:text-slate-400">
            Um e-mail por mês com novas oportunidades de créditos, editais e programas.
          </p>
          <div className="mt-4 max-w-md">
            <NewsletterForm source={`blog-${post.slug}`} />
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-slate-100 dark:border-slate-800">
          <div className="mx-auto max-w-site px-4 py-12 sm:px-6">
            <h2 className="text-xl font-bold tracking-tight">Continue lendo</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-mute">
                    {p.reading_min} min
                  </p>
                  <h3 className="mt-2 text-[15px] font-bold leading-snug">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
