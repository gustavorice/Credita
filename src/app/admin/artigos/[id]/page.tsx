import { notFound } from "next/navigation";
import AdminPostForm from "@/components/AdminPostForm";
import { createAdminClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { updatePost } from "../../actions";
import type { BlogPost } from "@/types";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) notFound();

  const supabase = createAdminClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (!data) notFound();

  const update = updatePost.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Editar: {data.title}</h1>
      <div className="mt-6">
        <AdminPostForm action={update} initial={data as BlogPost} />
      </div>
    </div>
  );
}
