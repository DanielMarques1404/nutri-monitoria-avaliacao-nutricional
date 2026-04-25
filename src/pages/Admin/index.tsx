import { useState } from "react";
import { CategoryForm } from "../../components/admin/CategoryForm";
import { TagForm } from "../../components/admin/TagForm";
import { Button } from "../../components/ui/Button";

export const Admin = () => {
  const [entity, setEntity] = useState<"tag" | "category" | "question">("tag");
  return (
    <section className="flex flex-col gap-4 p-8">
      <h1>Admin</h1>

      <nav className="grid grid-cols-3 gap-2 text-white">
        <Button
          classname={`${entity === "tag" ? "bg-light-green text-white" : "bg-dark-green text-white"}`}
          label="TAGs"
          onClick={() => setEntity("tag")}
        />
        <Button
          classname={`${entity === "category" ? "bg-light-green text-white" : "bg-dark-green text-white"}`}
          label="Categorias"
          onClick={() => setEntity("category")}
        />
        <Button
          classname={`${entity === "question" ? "bg-light-green text-white" : "bg-dark-green text-white"}`}
          label="Questões"
          onClick={() => setEntity("question")}
        />
      </nav>
      <div className="flex items-center justify-center py-2 px-6 w-full">
        {entity === "tag" && <TagForm />}
        {entity === "category" && <CategoryForm />}
        {/* {entity === "question" && <QuestionForm />} */}
      </div>
    </section>
  );
};
