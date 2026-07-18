import { useQuery } from "@tanstack/react-query";
import { QuestionnaireUseCase } from "../../domain/useCases/QuestionnaireUseCase";
import { RepositoryFactory } from "../../infra/factory/RepositoryFactory";
import { CURRENT_TECH_REPOSITORY } from "../../utils/data";

const ucQuestionnaire = new QuestionnaireUseCase(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuestionnaireRepo(),
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuestionnaireUrlsRepo(),
  RepositoryFactory.getRepo(
    CURRENT_TECH_REPOSITORY,
  ).createQuestionnaireQuestionsRepo(),
);

export const useQuestionnaire = (questionnaireId: number | null) => {
  return useQuery({
    queryKey: ["nutri-monitoria-quiz", questionnaireId],
    queryFn: async () => {
      if (!questionnaireId) return null;

      return await ucQuestionnaire.getQuestionnaireById(questionnaireId);
    },
    enabled: questionnaireId !== null,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });
};

export const useActiveQuestionnaires = () => {
  return useQuery({
    queryKey: ["nutri-monitoria-active-questionnaires"],
    queryFn: async () => {
      return await ucQuestionnaire.getActiveQuestionnaires();
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });
};
