"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

/** Garante que o usuário logado é admin antes de qualquer escrita. */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!user?.email || !admins.includes(user.email.toLowerCase())) {
    redirect("/admin/login");
  }
}

function lines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function csv(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

function opportunityPayload(form: FormData) {
  const title = String(form.get("title") ?? "").trim();
  return {
    title,
    slug: String(form.get("slug") ?? "").trim() || slugify(title),
    company: String(form.get("company") ?? "").trim(),
    company_domain: String(form.get("company_domain") ?? "").trim() || null,
    category: String(form.get("category") ?? "creditos"),
    tags: csv(form.get("tags")),
    value_label: String(form.get("value_label") ?? "").trim() || null,
    value_brl: form.get("value_brl") ? Number(form.get("value_brl")) : null,
    short_description: String(form.get("short_description") ?? "").trim(),
    description: String(form.get("description") ?? "").trim(),
    eligibility: lines(form.get("eligibility")),
    application_process: lines(form.get("application_process")),
    difficulty: String(form.get("difficulty") ?? "aberto"),
    external_url: String(form.get("external_url") ?? "").trim() || null,
    affiliate_url: String(form.get("affiliate_url") ?? "").trim() || null,
    featured: form.get("featured") === "on",
    sponsored: form.get("sponsored") === "on",
    published: form.get("published") === "on",
  };
}

export async function createOpportunity(form: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("opportunities")
    .insert(opportunityPayload(form));
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  redirect("/admin/oportunidades");
}

export async function updateOpportunity(id: string, form: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("opportunities")
    .update(opportunityPayload(form))
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  redirect("/admin/oportunidades");
}

export async function deleteOpportunity(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id"));
  const supabase = createAdminClient();
  const { error } = await supabase.from("opportunities").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  revalidatePath("/admin/oportunidades");
}

function postPayload(form: FormData) {
  const title = String(form.get("title") ?? "").trim();
  return {
    title,
    slug: String(form.get("slug") ?? "").trim() || slugify(title),
    excerpt: String(form.get("excerpt") ?? "").trim(),
    content: String(form.get("content") ?? ""),
    cover_image: String(form.get("cover_image") ?? "").trim() || null,
    author: String(form.get("author") ?? "").trim() || "Equipe Crédito para Startups",
    reading_min: Number(form.get("reading_min") ?? 6),
    published: form.get("published") === "on",
  };
}

export async function createPost(form: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("blog_posts").insert(postPayload(form));
  if (error) throw new Error(error.message);
  revalidatePath("/blog", "layout");
  redirect("/admin/artigos");
}

export async function updatePost(id: string, form: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("blog_posts")
    .update(postPayload(form))
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/blog", "layout");
  redirect("/admin/artigos");
}

export async function deletePost(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id"));
  const supabase = createAdminClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/blog", "layout");
  revalidatePath("/admin/artigos");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
