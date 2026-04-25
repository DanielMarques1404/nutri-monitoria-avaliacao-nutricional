import { CategoryForm } from "../../components/admin/CategoryForm";
import { TagForm } from "../../components/admin/TagForm";

export const Admin = () => {
  return (
    <section className="flex flex-col gap-4 p-8">
      <h1>Admin</h1>
      <TagForm />
      <CategoryForm />
    </section>
  );
};
