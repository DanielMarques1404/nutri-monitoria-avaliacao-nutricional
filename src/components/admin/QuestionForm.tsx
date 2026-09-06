import { IconArrowBigDownLines, IconPlusFilled } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ConfirmActionModal } from "./ConfirmActionModal";
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
import { CURRENT_TECH_REPOSITORY, MAX_QUESTION_OPTIONS } from "../../utils/data";
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
  RepositoryFactory.getRepo(
    CURRENT_TECH_REPOSITORY,
  ).createQuestionnaireQuestionsRepo(),
);

const ucTags = new GenericUseCases<ITag>(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createTagRepo(),
);

const ucCategories = new GenericUseCases<ICategory>(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createCategoryRepo(),
);

const ucQuestionnaires = new QuestionnaireUseCase(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuestionnaireRepo(),
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuestionnaireUrlsRepo(),
  RepositoryFactory.getRepo(
    CURRENT_TECH_REPOSITORY,
  ).createQuestionnaireQuestionsRepo(),
);

const ucQuestionnaireQuestions = new QuestionnaireQuestionsUseCase(
  RepositoryFactory.getRepo(
    CURRENT_TECH_REPOSITORY,
  ).createQuestionnaireQuestionsRepo(),
);

const defaultQuestion: IQuestion = {
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
};

type PendingQuestionAction =
  | { type: "delete"; questionId: number }
  | { type: "unlink"; questionId: number }
  | null;

export const QuestionForm = () => {
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(-1);
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState(0);
  const [optionDescription, setOptionDescription] = useState("");
  const [editingOptionId, setEditingOptionId] = useState<number | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingQuestionAction>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IQuestion>({
    defaultValues: defaultQuestion,
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

  const resetQuestionForm = () => {
    reset(defaultQuestion);
    setSelectedOptionId(-1);
    setSelectedTagId(0);
    resetOptionForm();
  };

  const resetOptionForm = () => {
    setOptionDescription("");
    setEditingOptionId(null);
  };

  const createUpdateMutation = useMutation({
    mutationFn: (question: IQuestion) =>
      ucQuestions.createOrUpdateForQuestionnaire(
        question,
        selectedQuestionnaireId,
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-questions"],
      });
      toast.success(
        `Pergunta "${variables.title}" ${variables.id ? "atualizada" : "criada"} com sucesso!`,
      );
      resetQuestionForm();
    },
    onError: (error) => {
      console.error("Falha ao registrar Pergunta", error);
      toast.error(
        error instanceof Error ? error.message : "Falha ao registrar Pergunta",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (questionId: number) => {
      return ucQuestions.delete(questionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-questions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-questionnaires"],
      });
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-active-questionnaires"],
      });
      toast.success("Pergunta excluída com sucesso!");
      resetQuestionForm();
    },
    onError: (error) => {
      console.error("Falha ao excluir Pergunta", error);
      toast.error("Falha ao excluir Pergunta");
    },
  });

  const unlinkMutation = useMutation({
    mutationFn: (questionId: number) => {
      return ucQuestionnaireQuestions.deleteByQuestionnaireAndQuestion(
        selectedQuestionnaireId,
        questionId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-questions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-questionnaires"],
      });
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-active-questionnaires"],
      });
      toast.success("Pergunta removida do questionário com sucesso!");
      resetQuestionForm();
    },
    onError: (error) => {
      console.error("Falha ao remover Pergunta do Questionário", error);
      toast.error("Falha ao remover Pergunta do Questionário");
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

  const handleSaveOption = () => {
    const description = optionDescription.trim();
    const currentOptions = watch("options") || [];

    if (!description) {
      toast.error("Informe a descrição do item de resposta");
      return;
    }

    if (editingOptionId !== null) {
      setValue(
        "options",
        currentOptions.map((option) =>
          option.id === editingOptionId ? { ...option, description } : option,
        ),
      );
      resetOptionForm();
      return;
    }

    if (currentOptions.length >= MAX_QUESTION_OPTIONS) {
      toast.error(
        `Cada pergunta pode ter no máximo ${MAX_QUESTION_OPTIONS} itens de resposta`,
      );
      return;
    }

    const nextTemporaryId =
      Math.min(0, ...currentOptions.map((option) => option.id)) - 1;

    setValue("options", [
      ...currentOptions,
      {
        id: nextTemporaryId,
        questionId: watch("id") || 0,
        description,
      },
    ]);
    resetOptionForm();
  };

  const handleEditOption = (option: IOption) => {
    setEditingOptionId(option.id);
    setOptionDescription(option.description);
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

  const handleDeleteQuestion = () => {
    const questionId = watch("id");

    if (!questionId) {
      toast.error("Selecione uma pergunta para excluir");
      return;
    }

    setPendingAction({ type: "delete", questionId });
  };

  const handleNewQuestion = () => {
    resetQuestionForm();
    (document.getElementById("question-title") as HTMLInputElement | null)?.focus();
  };

  const handleUnlinkQuestion = (questionId: number) => {
    if (selectedQuestionnaireId === 0) {
      toast.error("Selecione um questionário antes de remover a pergunta");
      return;
    }

    setPendingAction({ type: "unlink", questionId });
  };

  const handleConfirmPendingAction = () => {
    if (!pendingAction) return;

    if (pendingAction.type === "delete") {
      deleteMutation.mutate(pendingAction.questionId);
    } else {
      unlinkMutation.mutate(pendingAction.questionId);
    }

    setPendingAction(null);
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
        if (editingOptionId === optionId) resetOptionForm();
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
    resetQuestionForm();
  }

  return (
    <section className="flex flex-col lg:grid lg:grid-cols-4 p-2 w-full gap-3">
      <div className="border-2 border-mediumGrey bg-white p-3 rounded-md shadow-sm">
        <Table
          caption="Questionários"
          items={
            questionnairesList?.map((q) => ({ id: q.id, name: q.name, active: q.active })) || []
          }
          updateAction={handleUpdateQuestionnaire}
          markInactives
        />
      </div>
      <div className="border-2 border-mediumGrey bg-white p-3 rounded-md shadow-sm">
        <Table
          caption={"Perguntas"}
          items={
            questionsList?.map((question) => ({
              id: question.id,
              name: question.title,
            })) || []
          }
          updateAction={handleUpdate}
          deleteAction={handleUnlinkQuestion}
        />
      </div>

      <form
        className="flex flex-col lg:col-span-2 border-2 border-mediumGrey bg-white p-3 rounded-md shadow-sm"
        onSubmit={handleSubmit(submit)}
      >
        <div className="mb-2 flex flex-col gap-1 border-b border-lighter-green pb-2">
          <h2 className="text-lg font-semibold text-dark-green">Dados da pergunta</h2>
          <p className="text-sm text-gray-500">
            Selecione um questionário, edite a pergunta e salve o vínculo automaticamente.
          </p>
        </div>

        <Input
          label="Título"
          id="question-title"
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

        <div className="flex justify-end gap-2">
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            type="button"
            label="Nova pergunta"
            onClick={handleNewQuestion}
          />
          {watch("id") > 0 && (
            <Button
              classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
              type="button"
              label="Excluir pergunta"
              onClick={handleDeleteQuestion}
            />
          )}
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            type="submit"
            label="Salvar"
          />
        </div>
      </form>

      <div className="flex flex-col gap-2 border-2 border-mediumGrey bg-white p-3 rounded-md shadow-sm">
        <caption className="w-full p-1 font-semibold">
          Itens de Resposta
        </caption>
        <div className="flex flex-col gap-2">
          <Input
            label="Item de resposta"
            placeholder="Descrição do item de resposta"
            value={optionDescription}
            onChange={(event) => setOptionDescription(event.target.value)}
          />
          <div className="flex justify-end gap-2">
            {editingOptionId !== null && (
              <Button
                classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
                type="button"
                label="Cancelar"
                onClick={resetOptionForm}
              />
            )}
            <Button
              classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
              type="button"
              label={editingOptionId === null ? "Adicionar" : "Atualizar"}
              onClick={handleSaveOption}
            />
          </div>
        </div>
        {watch("options")?.map((op) => (
          <OptionItem
            key={op.id}
            option={op}
            onDelete={(id) => handleOptions(id, "DELETE")}
            onEdit={handleEditOption}
            onSelect={handleSelectRightOption}
            selected={op.id === watch("correctOption")}
          />
        ))}
      </div>

      <ConfirmActionModal
        isOpen={pendingAction !== null}
        title={
          pendingAction?.type === "delete"
            ? "Excluir pergunta definitivamente?"
            : "Remover pergunta do questionário?"
        }
        description={
          pendingAction?.type === "delete"
            ? "Esta ação removerá a pergunta, seus vínculos, TAGs e itens de resposta. Ela não poderá ser desfeita pela interface."
            : "Esta ação remove a pergunta apenas do questionário selecionado. A pergunta continuará existindo na base."
        }
        confirmLabel={pendingAction?.type === "delete" ? "Excluir" : "Remover"}
        onCancel={() => setPendingAction(null)}
        onConfirm={handleConfirmPendingAction}
      />
    </section>
  );
};
