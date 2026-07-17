import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { IQuestionnaire } from "../../domain/entities/entities";
import { QuestionnaireUseCase } from "../../domain/useCases/QuestionnaireUseCase";
import { RepositoryFactory } from "../../infra/factory/RepositoryFactory";
import { CURRENT_TECH_REPOSITORY } from "../../utils/data";
import { Table } from "../layout/Table";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const ucQuestionnaire = new QuestionnaireUseCase(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuestionnaireRepo(),
);

const defaultQuestionnaire: IQuestionnaire = {
  id: 0,
  name: "",
  description: "",
  active: false,
  questions: [],
  urls: [],
};

export const QuestionnaireForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IQuestionnaire>({
    defaultValues: defaultQuestionnaire,
  });

  const { data: questionnairesList } = useQuery({
    queryKey: ["nutri-monitoria-questionnaires"],
    queryFn: async () => {
      return await ucQuestionnaire.listAll();
    },
  });

  const createUpdateMutation = useMutation({
    mutationFn: (questionnaire: IQuestionnaire) => {
      return ucQuestionnaire.createOrUpdate(questionnaire);
    },
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-questionnaires"],
      });
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-active-questionnaires"],
      });
      toast.success(
        `Questionário "${variable.name}" ${variable.id ? "atualizado" : "criado"} com sucesso!`,
        { position: "bottom-right" },
      );
      reset(defaultQuestionnaire);
    },
    onError: (error) => {
      console.error("Falha ao registrar Questionário", error);
      toast.error("Falha ao registrar Questionário", {
        position: "bottom-right",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return ucQuestionnaire.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-questionnaires"],
      });
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-active-questionnaires"],
      });
      toast.success("Questionário excluído com sucesso!", {
        position: "bottom-right",
      });
      reset(defaultQuestionnaire);
    },
    onError: (error) => {
      console.error("Falha ao excluir Questionário", error);
      toast.error("Falha ao excluir Questionário", { position: "bottom-right" });
    },
  });

  const submit = (data: IQuestionnaire) => {
    createUpdateMutation.mutate({
      ...defaultQuestionnaire,
      ...data,
      id: data.id ?? 0,
      urls: data.urls ?? [],
      questions: data.questions ?? [],
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleUpdate = (id: number) => {
    const questionnaireToUpdate = questionnairesList?.find(
      (questionnaire) => questionnaire.id === id,
    );

    if (!questionnaireToUpdate) {
      toast.error("Questionário não encontrado", { position: "bottom-right" });
      return;
    }

    setValue("id", questionnaireToUpdate.id);
    setValue("name", questionnaireToUpdate.name);
    setValue("description", questionnaireToUpdate.description);
    setValue("active", questionnaireToUpdate.active);
    setValue("questions", questionnaireToUpdate.questions || []);
    setValue("questionCount", questionnaireToUpdate.questionCount);
    setValue("urls", questionnaireToUpdate.urls || []);
  };

  return (
    <section className="flex flex-col gap-2 w-1/2 border-2 border-mediumGrey p-4 rounded-md">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
        <Input
          label="Questionário"
          type="text"
          id="firstInput"
          placeholder="Nome do Questionário"
          value={watch("name")}
          {...register("name", { required: "Este campo é obrigatório" })}
          errors={errors.name}
        />

        <Input
          label="Descrição"
          type="text"
          placeholder="Descrição do Questionário"
          value={watch("description")}
          {...register("description")}
          errors={errors.description}
        />

        <label className="flex items-center gap-2 p-2 cursor-pointer">
          <input type="checkbox" {...register("active")} />
          Questionário ativo
        </label>

        <div className="flex items-center justify-end gap-2">
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            onClick={() => {
              reset(defaultQuestionnaire);
              (
                document.getElementById("firstInput") as HTMLInputElement | null
              )?.focus();
            }}
            type="button"
            label="Novo"
          />
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            type="submit"
            label="Salvar"
          />
        </div>
      </form>

      <div className="border-2 border-dark-green my-2"></div>

      <Table
        caption="Questionários"
        items={questionnairesList || []}
        deleteAction={(id) => handleDelete(id)}
        updateAction={(id) => handleUpdate(id)}
      />
    </section>
  );
};
