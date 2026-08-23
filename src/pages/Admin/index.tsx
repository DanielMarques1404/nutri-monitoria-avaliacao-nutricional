import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { CategoryForm } from "../../components/admin/CategoryForm";
import { Radio } from "../../components/admin/NavButtons";
import { QuestionForm } from "../../components/admin/QuestionForm";
import { QuestionnaireForm } from "../../components/admin/QuestionnaireForm";
import { TagForm } from "../../components/admin/TagForm";
import { Button } from "../../components/ui/Button";

export const Admin = () => {
  const { logout } = useAuthContext();
  const [entity, setEntity] = useState<
    "tag" | "category" | "questionnaire" | "question"
  >("tag");
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <h1>Console Administrativo</h1>
        <div className="flex gap-2">
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            label="Voltar"
            onClick={() => {
              navigate("/");
            }}
          />
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            label="Logout"
            onClick={() => {
              logout();
            }}
          />
        </div>
      </div>

      <nav className="flex items-center justify-center text-white">
        <Radio onselect={setEntity} />
      </nav>
      <div className="flex items-center justify-center py-2 px-6 w-full">
        {entity === "tag" && <TagForm />}
        {entity === "category" && <CategoryForm />}
        {entity === "questionnaire" && <QuestionnaireForm />}
        {entity === "question" && <QuestionForm />}
        {/* {entity === "question" && <QForm />} */}
      </div>
    </section>
  );
};
