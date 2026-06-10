import AdminOpportunityForm from "@/components/AdminOpportunityForm";
import { createOpportunity } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewOpportunityPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Nova oportunidade</h1>
      <div className="mt-6">
        <AdminOpportunityForm action={createOpportunity} />
      </div>
    </div>
  );
}
