import { notFound } from "next/navigation";
import AdminOpportunityForm from "@/components/AdminOpportunityForm";
import { createAdminClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { updateOpportunity } from "../../actions";
import type { Opportunity } from "@/types";

export const dynamic = "force-dynamic";

export default async function EditOpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) notFound();

  const supabase = createAdminClient();
  const { data } = await supabase.from("opportunities").select("*").eq("id", id).single();
  if (!data) notFound();

  const update = updateOpportunity.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Editar: {data.title}</h1>
      <div className="mt-6">
        <AdminOpportunityForm action={update} initial={data as Opportunity} />
      </div>
    </div>
  );
}
