import { IconArrowBigDownLines, IconPlusFilled } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  type ICategory,
  type IOption,
  type IQuestion,
  type ITag,
} from "../../domain/entities/entities";
import { GenericUseCases } from "../../domain/useCases/GenericUseCases";
import { QuestionUseCases } from "../../domain/useCases/QuestionUseCases";
import { QuestionSupabaseRepository } from "../../infra/supabase/QuestionSupabaseRepository";
import { QuestionTagsSupabaseRepository } from "../../infra/supabase/QuestionTagsSupabaseRepository";
import { SupabaseRepository } from "../../infra/supabase/SupabaseRepository";
import { Table } from "../layout/Table";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

const ucQuestions = new QuestionUseCases(
  new QuestionSupabaseRepository(),
  new QuestionTagsSupabaseRepository(),
);

const ucTags = new GenericUseCases<ITag>(new SupabaseRepository("Tags"));
const ucCategories = new GenericUseCases<ICategory>(
  new SupabaseRepository("Categories"),
);

export const QuestionForm = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm<IQuestion>(
    {
      defaultValues: {
        id: 0,
        title: "",
        statement: "",
        question: "",
        options: [],
        correctOptionId: 0,
        explanation: "",
        categoryId: 0,
        difficulty: "",
        tags: [],
        summaryImage: "",
      },
    },
  );

  const queryClient = useQueryClient();

  const { data: tagsList } = useQuery({
    queryKey: ["nutri-monitoria-tags"],
    queryFn: async () => {
      return await ucTags.listAll();
    },
  });

  const { data: categoriesList } = useQuery({
    queryKey: ["nutri-monitoria-categories"],
    queryFn: async () => {
      return await ucCategories.listAll();
    },
  });

  const { data: questionsList } = useQuery({
    queryKey: ["nutri-monitoria-questions"],
    queryFn: async () => {
      return await ucQuestions.listAll();
    },
  });

  const createUpdateMutation = useMutation({
    mutationFn: (question: IQuestion) => {
      return ucQuestions.createOrUpdate(question);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-questions", "nutri-monitoria-quiz"],
      });
      toast.success(
        `Pergunta "${variables.title}" ${variables.id ? "atualizada" : "criada"} com sucesso!`,
      );
      reset();
    },
    onError: () => {
      console.error("Falha ao registrar Pergunta");
      toast.error("Falha ao registrar Pergunta");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return ucQuestions.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-questions"],
      });
      toast.success("Pergunta excluída com sucesso!", {
        position: "bottom-right",
      });
    },
    onError: () => {
      console.error("Falha ao excluir Pergunta");
      toast.error("Falha ao excluir Pergunta", { position: "bottom-right" });
    },
  });

  const [selectedTagId, setSelectedTagId] = useState(0);

  const submit = async (data: IQuestion) => {
    createUpdateMutation.mutate(data);
  };

  const handleDelete = async (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleUpdate = async (id: number) => {
    const QuestionToUpdate = questionsList?.find(
      (Question) => Question.id === id,
    );
    if (!QuestionToUpdate) {
      toast.error("Pergunta não encontrada", { position: "bottom-right" });
      return;
    }

    setValue("id", QuestionToUpdate.id);
    setValue("title", QuestionToUpdate.title);
    setValue("question", QuestionToUpdate.question);
    setValue("explanation", QuestionToUpdate.explanation);
    setValue("statement", QuestionToUpdate.statement);
    setValue("tags", QuestionToUpdate.tags || []);
    setValue("categoryId", QuestionToUpdate.categoryId || 0);
    setValue("difficulty", QuestionToUpdate.difficulty);
    setValue("summaryImage", QuestionToUpdate.summaryImage || "");
    setValue("options", QuestionToUpdate.options || []);

    handleSelectRightOption(QuestionToUpdate.correctOptionId);
  };

  const addTagToQuestion = (tagId: number) => {
    const currentTags = watch("tags") || [];
    if (currentTags.find((t: ITag) => t.id === tagId)) {
      toast.error("TAG já adicionada à pergunta", { position: "bottom-right" });
      return;
    }
    const tagToAdd = tagsList?.find((tag) => tag.id === tagId);
    if (!tagToAdd) {
      toast.error("TAG não encontrada", { position: "bottom-right" });
      return;
    }
    setValue("tags", [...currentTags, tagToAdd]);
  };

  const handleSelectRightOption = (optionId: number) => {
    setValue("correctOptionId", optionId);
  };

  return (
    <section className="flex flex-col gap-2 w-1/2 border-2 border-mediumGrey p-4 rounded-md">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
        <Input
          label={"Caso"}
          type="text"
          placeholder="Nome do Caso"
          value={watch("title")}
          {...register("title")}
        />

        <Input
          label={"Contexto"}
          type="text"
          placeholder="Contexto da Pergunta"
          value={watch("statement")}
          {...register("statement")}
        />

        <Input
          label={"Pergunta"}
          type="text"
          placeholder="Pergunta"
          value={watch("question")}
          {...register("question")}
        />

        <Input
          label={"Explicação"}
          type="text"
          placeholder="Explicação"
          value={watch("explanation")}
          {...register("explanation")}
        />

        <Input
          label={"Dificuldade"}
          type="text"
          placeholder="Dificuldade"
          value={watch("difficulty")}
          {...register("difficulty")}
        />

        <Input
          label={"Imagem associada - não finalizado"}
          type="text"
          placeholder="Imagem associada"
          value={watch("summaryImage")}
          {...register("summaryImage")}
        />

        <Select
          label={"Categoria"}
          placeholder={"Selecione a categoria"}
          items={
            categoriesList?.map((category) => ({
              id: category.id,
              name: category.name,
            })) || []
          }
          observechange={(value) => setValue("categoryId", value)}
          value={watch("categoryId")}
        />

        <div className="flex gap-2 items-center cursor-pointer">
          <Select
            label={"TAGs"}
            placeholder="Selecione uma TAG"
            items={
              tagsList?.map((tag) => ({ id: tag.id, name: tag.name })) || []
            }
            observechange={setSelectedTagId}
          />
          <IconArrowBigDownLines
            size={32}
            className="mt-6"
            onClick={() => addTagToQuestion(selectedTagId)}
          />
          <IconPlusFilled strokeWidth={225} size={32} className="mt-6" />
        </div>

        <Table
          caption={""}
          items={watch("tags") || []}
          deleteAction={(tagId) =>
            setValue(
              "tags",
              watch("tags")?.filter((tag: ITag) => tag.id !== tagId) || [],
            )
          }
        />

        <div className="flex flex-col gap-2 my-2">
          <Table
            caption={"Opções de Resposta"}
            items={
              watch("options")?.map((option: IOption) => ({
                id: option.id,
                name: option.description,
              })) || []
            }
            onSelectOption={handleSelectRightOption}
            deleteAction={(optionId) =>
              setValue(
                "options",
                watch("options")?.filter(
                  (option: IOption) => option.id !== optionId,
                ) || [],
              )
            }
            selectedOption={watch("correctOptionId")}
            highlightingOption
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            label="Limpar"
            type="button"
            onClick={() => reset()}
          />

          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            type="submit"
            label="Salvar"
          />
        </div>
      </form>

      <div className="border-2 border-dark-green my-3"></div>

      <Table
        caption={"Perguntas"}
        items={
          questionsList?.map((question) => ({
            id: question.id,
            name: question.title,
          })) || []
        }
        deleteAction={(id) => handleDelete(id)}
        updateAction={(id) => handleUpdate(id)}
      />
    </section>
  );
};
