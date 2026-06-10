import "server-only";
import type { BlogPost, Opportunity } from "@/types";
import { FALLBACK_OPPORTUNITIES, FALLBACK_POSTS } from "./fallback-data";
import { hasSupabaseEnv, createClient } from "./supabase/server";

/**
 * Camada de dados com fallback: se o Supabase ainda não estiver configurado
 * (ex.: preview local), o site funciona com os dados de demonstração.
 */

export async function getOpportunities(): Promise<Opportunity[]> {
  if (!hasSupabaseEnv()) return sortOps(FALLBACK_OPPORTUNITIES);
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("value_brl", { ascending: false, nullsFirst: false });
    if (error || !data?.length) return sortOps(FALLBACK_OPPORTUNITIES);
    return data as Opportunity[];
  } catch {
    return sortOps(FALLBACK_OPPORTUNITIES);
  }
}

export async function getOpportunitiesByCategory(category: string) {
  const all = await getOpportunities();
  if (category === "creditos") {
    return all.filter(
      (o) => o.category === "creditos" || o.tags.includes("creditos")
    );
  }
  if (category === "brasil") {
    return all.filter(
      (o) => o.tags.includes("brasil") || o.category === "editais"
    );
  }
  return all.filter(
    (o) => o.category === category || o.tags.includes(category)
  );
}

export async function getOpportunity(slug: string) {
  const all = await getOpportunities();
  return all.find((o) => o.slug === slug) ?? null;
}

export async function getRelatedOpportunities(op: Opportunity, limit = 4) {
  const all = await getOpportunities();
  return all
    .filter((o) => o.slug !== op.slug)
    .map((o) => ({
      o,
      score:
        (o.category === op.category ? 2 : 0) +
        o.tags.filter((t) => op.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.o);
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!hasSupabaseEnv()) return FALLBACK_POSTS;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error || !data?.length) return FALLBACK_POSTS;
    return data as BlogPost[];
  } catch {
    return FALLBACK_POSTS;
  }
}

export async function getPost(slug: string) {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

function sortOps(ops: Opportunity[]) {
  return [...ops].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      (b.value_brl ?? 0) - (a.value_brl ?? 0)
  );
}
