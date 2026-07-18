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
import { QuestionnaireQuestionsUseCase } from "../../domain/useCases/QuestionnaireQuestionsUseCase";
import { QuestionnaireUseCase } from "../../domain/useCases/QuestionnaireUseCase";
import { QuestionUseCases } from "../../domain/useCases/QuestionUseCases";
import { RepositoryFactory } from "../../infra/factory/RepositoryFactory";
import { CURRENT_TECH_REPOSITORY } from "../../utils/data";
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

const ucQuestionnaires = new QuestionnaireUseCase(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuestionnaireRepo(),
);

const ucQuestionnaireQuestions = new QuestionnaireQuestionsUseCase(
  RepositoryFactory.getRepo(
    CURRENT_TECH_REPOSITORY,
  ).createQuestionnaireQuestionsRepo(),
);

export const QuestionForm = () => {
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(-1);
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState(0);
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
      correctOption: 0,
      explanation: "",
      categoryId: 0,
      difficulty: "",
      tags: [],
    },
  });

  const { data: questionsList } = useQuery({
    queryKey: ["nutri-monitoria-questions", selectedQuestionnaireId],
    queryFn: async () => {
      return await ucQuestions.listByQuestionnaireId(selectedQuestionnaireId);
    },
    enabled: !!selectedQuestionnaireId,
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

  const { data: questionnairesList } = useQuery({
    queryKey: ["nutri-monitoria-questionnaires"],
    queryFn: async () => {
      return await ucQuestionnaires.listAll();
    },
  });

  const queryClient = useQueryClient();

  const createUpdateMutation = useMutation({
    mutationFn: async (question: IQuestion) => {
      const questionId = await ucQuestions.createOrUpdate(question);
      await ucQuestionnaireQuestions.create(selectedQuestionnaireId, questionId);
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
    if (selectedQuestionnaireId === 0) {
      toast.error("Selecione um questionário antes de salvar a pergunta");
      return;
    }

    if (watch("correctOption") === 0) {
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
    setValue("options", QuestionToUpdate.options || []);
    setValue("correctOption", QuestionToUpdate.correctOption);

    setSelectedOptionId(
      QuestionToUpdate.options?.find(
        (op) => op.id === QuestionToUpdate.correctOption,
      )?.id || -1,
    );
  };

  const handleOptions = (optionId: number, action: "DELETE") => {
    let optionList = watch("options") || [];
    let newList: IOption[] | undefined = [];

    switch (action) {
      case "DELETE":
        newList = optionList?.filter((op) => op.id !== optionId);
        if (selectedOptionId === optionId) {
          setSelectedOptionId(-1);
          setValue("correctOption", 0);
        }
        break;

      default:
        break;
    }

    setValue("options", newList);

    const newCorrectOption = newList.find((op) => op.id === selectedOptionId);
    if (!newCorrectOption) {
      setSelectedOptionId(-1);
      setValue("correctOption", 0);
    } else {
      setSelectedOptionId(newCorrectOption.id);
      setValue("correctOption", newCorrectOption.id);
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
    setValue("correctOption", option.id);
    setSelectedOptionId(option.id);
  };

  function handleUpdateQuestionnaire(id: number): void {
    setSelectedQuestionnaireId(id);
    reset();
  }

  return (
    <section className="flex flex-col lg:grid lg:grid-cols-4 p-2 w-full gap-2">
      <div className="border-2 border-mediumGrey p-2 rounded-md">
        <Table
          caption="Questionários"
          items={
            questionnairesList?.map((q) => ({ id: q.id, name: q.name })) || []
          }
          updateAction={handleUpdateQuestionnaire}
        />
      </div>
      <div className="border-2 border-mediumGrey p-2 rounded-md">
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
        <caption className="w-full p-1 font-semibold">
          Itens de Resposta
        </caption>
        {watch("options")?.map((op) => (
          <OptionItem
            option={op}
            onDelete={(id) => handleOptions(id, "DELETE")}
            onSelect={handleSelectRightOption}
            selected={op.id === watch("correctOption")}
          />
        ))}
      </div>
    </section>
  );
};
