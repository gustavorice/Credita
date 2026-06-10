import AdminPostForm from "@/components/AdminPostForm";
import { createPost } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Novo artigo</h1>
      <div className="mt-6">
        <AdminPostForm action={createPost} />
      </div>
    </div>
  );
}
