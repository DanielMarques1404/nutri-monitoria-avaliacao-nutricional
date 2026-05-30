import { IconArrowBigDownLines, IconPlusFilled } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type {
  ICategory,
  IOption,
  IQuestion,
  ITag,
} from "../../domain/entities/entities";
import { GenericUseCases } from "../../domain/useCases/GenericUseCases";
import { QuestionUseCases } from "../../domain/useCases/QuestionUseCases";
import { RepositoryFactory } from "../../infra/factory/RepositoryFactory";
import {
  CURRENT_QUESTIONNAIRE,
  CURRENT_TECH_REPOSITORY,
} from "../../utils/data";
import { Table } from "../layout/Table";
import { OptionItem } from "../OptionItem";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

const ucQuestions = new QuestionUseCases(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuetionsRepo(),
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuestionTagsRepo(),
  RepositoryFactory.getRepo(
    CURRENT_TECH_REPOSITORY,
  ).createQuestionOptionsRepo(),
);

const ucTags = new GenericUseCases<ITag>(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createTagRepo(),
);

const ucCategories = new GenericUseCases<ICategory>(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createCategoryRepo(),
);

export const QuestionForm = () => {
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(-1);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IQuestion>({
    defaultValues: {
      id: 0,
      title: "",
      statement: "",
      question: "",
      options: [],
      correctOption: "",
      explanation: "",
      categoryId: 0,
      difficulty: "",
      tags: [],
      urlLearnMore: "",
    },
  });

  const { data: questionsList } = useQuery({
    queryKey: ["nutri-monitoria-questions"],
    queryFn: async () => {
      return await ucQuestions.listByQuestionnaireId(CURRENT_QUESTIONNAIRE);
    },
  });

  const { data: categoriesList } = useQuery({
    queryKey: ["nutri-monitoria-categories"],
    queryFn: async () => {
      return await ucCategories.listAll();
    },
  });

  const { data: tagsList } = useQuery({
    queryKey: ["nutri-monitoria-tags"],
    queryFn: async () => {
      return await ucTags.listAll();
    },
  });

    const queryClient = useQueryClient();

  const createUpdateMutation = useMutation({
    mutationFn: (question: IQuestion) => {
      return ucQuestions.createOrUpdate(question);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-questions"],
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

  const submit = (data: IQuestion) => {
    if (watch("correctOption") === "") {
      alert("É necessário indicar uma resposta válida");
      return;
    }
    createUpdateMutation.mutate(data);
  };

  const handleUpdate = async (id: number) => {
    const QuestionToUpdate = questionsList?.find(
      (Question) => Question.id === id,
    );

    if (!QuestionToUpdate) return;

    setValue("id", QuestionToUpdate.id);
    setValue("title", QuestionToUpdate.title);
    setValue("question", QuestionToUpdate.question);
    setValue("explanation", QuestionToUpdate.explanation);
    setValue("statement", QuestionToUpdate.statement);
    setValue("tags", QuestionToUpdate.tags || []);
    setValue("categoryId", QuestionToUpdate.categoryId || 0);
    setValue("difficulty", QuestionToUpdate.difficulty);
    setValue("urlLearnMore", QuestionToUpdate.urlLearnMore || "");
    setValue("options", QuestionToUpdate.options || []);
    setValue("correctOption", QuestionToUpdate.correctOption);

    setSelectedOptionId(
      QuestionToUpdate.options?.find(
        (op) => op.option === QuestionToUpdate.correctOption,
      )?.id || -1,
    );
  };

  const handleOptions = (
    optionId: number,
    action: "ADD" | "DELETE" | "MOVEUP" | "MOVEDOWN",
  ) => {
    let optionList = watch("options") || [];
    let newList: IOption[] | undefined = [];
    const optionsAvailable = ["A", "B", "C", "D"];

    switch (action) {
      case "DELETE":
        newList = optionList?.filter((op) => op.id !== optionId);
        if (selectedOptionId === optionId) {
          setSelectedOptionId(-1);
          setValue("correctOption", "");
        }
        break;

      case "MOVEUP":
        const i = optionList?.findIndex((op) => op.id === optionId);
        if (i === 0) return;
        [optionList[i], optionList[i - 1]] = [optionList[i - 1], optionList[i]];
        newList = [...optionList];
        break;

      case "MOVEDOWN":
        const d = optionList?.findIndex((op) => op.id === optionId);
        if (d === optionList.length - 1) return;
        [optionList[d], optionList[d + 1]] = [optionList[d + 1], optionList[d]];
        newList = [...optionList];
        break;

      default:
        break;
    }

    newList = newList.map((op, idx) => ({
      ...op,
      option: optionsAvailable[idx],
    }));
    setValue("options", newList);

    const newCorrectOption = newList.find((op) => op.id === selectedOptionId);
    if (!newCorrectOption) {
      setSelectedOptionId(-1);
      setValue("correctOption", "");
    } else {
      setSelectedOptionId(newCorrectOption.id);
      setValue("correctOption", newCorrectOption.option);
    }
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
    setValue("tags", [
      ...currentTags,
      { id: tagToAdd.id, name: tagToAdd.name },
    ]);
  };

  const handleSelectRightOption = (option: IOption) => {
    setValue("correctOption", option.option);
    setSelectedOptionId(option.id);
  };

  return (
    <section className="flex flex-col lg:grid lg:grid-cols-4 p-2 w-full gap-2">
      <div className="border-2 border-mediumGrey p-2 rounded-md h-1/2">
        <Table
          caption={"Perguntas"}
          items={
            questionsList?.map((question) => ({
              id: question.id,
              name: question.title,
            })) || []
          }
          updateAction={handleUpdate}
        />
      </div>

      <form
        className="flex flex-col lg:col-span-2 border-2 border-mediumGrey p-2 rounded-md"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          label="Título"
          placeholder="Título"
          {...register("title", { required: "Este campo é obrigatório" })}
          errors={errors.title}
        />

        <Input
          label="Contexto"
          placeholder="Contexto da Pergunta"
          {...register("statement", { required: "Este campo é obrigatório" })}
          errors={errors.statement}
        />

        <Input
          label="Pergunta"
          placeholder="Pergunta"
          {...register("question", { required: "Este campo é obrigatório" })}
          errors={errors.question}
        />

        <Input
          label={"Explicação"}
          placeholder="Explicação"
          {...register("explanation")}
          errors={errors.explanation}
        />

        <Input
          label={"Dificuldade"}
          placeholder="Dificuldade"
          {...register("difficulty")}
          errors={errors.difficulty}
        />

        <Input
          label={"URL para aprender mais"}
          placeholder="https://..."
          type="url"
          {...register("urlLearnMore")}
          errors={errors.urlLearnMore}
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
          {...register("categoryId")}
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

        <div className="p-2">
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
        </div>

        <Button
          className="bg-dark-green text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg cursor-pointer ml-auto"
          type="submit"
          label="Salvar"
        />
      </form>

      <div className="flex flex-col gap-2 border-2 border-mediumGrey p-2 rounded-md">
        {watch("options")?.sort((a, b) => a.option.localeCompare(b.option))?.map((op) => (
          <OptionItem
            option={op}
            onDelete={(id) => handleOptions(id, "DELETE")}
            onMoveUp={(id) => handleOptions(id, "MOVEUP")}
            onMoveDown={(id) => handleOptions(id, "MOVEDOWN")}
            onSelect={handleSelectRightOption}
            selected={op.option === watch("correctOption")}
          />
        ))}
      </div>
    </section>
  );
};
