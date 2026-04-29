import { IconArrowBigDownLines, IconPlusFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type {
  ICategory,
  IQuestion,
  ITag,
} from "../../domain/entities/entities";
import { GenericUseCases } from "../../domain/useCases/GenericUseCases";
import { QuestionUseCases } from "../../domain/useCases/QuestionUseCases";
import { QuestionSupabaseRepository } from "../../infra/supabase/QuestionSupabaseRepository";
import { SupabaseRepository } from "../../infra/supabase/SupabaseRepository";
import { Table } from "../layout/Table";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

const ucQuestions = new QuestionUseCases(new QuestionSupabaseRepository());

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

  const [questionsList, setQuestionsList] = useState<IQuestion[] | null>(null);
  const [tagsList, setTagsList] = useState<ITag[] | null>(null);
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [categoriesList, setCategoriesList] = useState<ICategory[] | null>(
    null,
  );

  const updateList = () =>
    ucQuestions.listAll().then((questions) => {
      setQuestionsList(questions);
    });

  useEffect(() => {
    updateList();

    ucTags.listAll().then((tags) => {
      setTagsList(tags);
    });

    ucCategories.listAll().then((categories) => {
      setCategoriesList(categories);
    });
  }, []);

  const submit = async (data: IQuestion) => {
    // try {
    //   await ucQuestions.createOrUpdate(data);
    //   toast.success(
    //     `Pergunta "${data.title}" ${data.id ? "atualizada" : "criada"} com sucesso!`,
    //   );
    //   reset();
    //   updateList();
    // } catch (error) {
    //   console.error("Falha ao registrar Pergunta", error);
    //   toast.error("Falha ao registrar Pergunta");
    // }
    console.log(data);
  };

  const handleDelete = async (id: number) => {
    try {
      await ucQuestions.delete(id);
      updateList();
      toast.success("Pergunta excluída com sucesso!");
    } catch (error) {
      console.error("Falha ao excluir Pergunta", error);
      toast.error("Falha ao excluir Pergunta");
    }
  };

  const handleUpdate = async (id: number) => {
    const QuestionToUpdate = questionsList?.find(
      (Question) => Question.id === id,
    );
    if (!QuestionToUpdate) {
      toast.error("Pergunta não encontrada");
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
  };

  const addTagToQuestion = (tagId: number) => {
    const currentTags = watch("tags") || [];
    if (currentTags.find((t: ITag) => t.id === tagId)) {
      toast.error("TAG já adicionada à pergunta");
      return;
    }
    const tagToAdd = tagsList?.find((tag) => tag.id === tagId);
    if (!tagToAdd) {
      toast.error("TAG não encontrada");
      return;
    }
    setValue("tags", [...currentTags, tagToAdd]);
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
          onchange={() => setValue("categoryId", Number(watch("categoryId")))}
          value={watch("categoryId")}
        />

        <div className="flex gap-2 items-center cursor-pointer">
          <Select
            label={"TAGs"}
            placeholder="Selecione uma TAG"
            items={
              tagsList?.map((tag) => ({ id: tag.id, name: tag.name })) || []
            }
            onchange={setSelectedTagId}
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

        <Button
          classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg ml-auto"
          type="submit"
          label="Salvar"
        />
      </form>

      <div className="border-2 border-dark-green my-2"></div>

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
