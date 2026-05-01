import { useState } from "react";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { CategoryForm } from "../../components/admin/CategoryForm";
import { QuestionForm } from "../../components/admin/QuestionForm";
import { TagForm } from "../../components/admin/TagForm";
import { Button } from "../../components/ui/Button";

export const Admin = () => {
  const { logout } = useAuthContext();
  const [entity, setEntity] = useState<"tag" | "category" | "question">("tag");
  return (
    <section className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between mx-12">
        <h1>Console Administrativo</h1>
        <Button
          classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
          label="Logout"
          onClick={() => {
            logout();
          }}
        />
      </div>

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
        {entity === "question" && <QuestionForm />}
      </div>
    </section>
  );
};
