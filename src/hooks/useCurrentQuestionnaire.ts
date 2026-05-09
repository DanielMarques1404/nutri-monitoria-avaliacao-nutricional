import { useQuery } from "@tanstack/react-query";
import { RepositoryFactory } from "../infra/factory/RepositoryFactory";
import { CURRENT_TECH_REPOSITORY } from "../utils/data";
import { QuestionnaireUseCase } from "../domain/useCases/QuestionnaireUseCase";

const ucQuestionnaire = new QuestionnaireUseCase(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuestionnaireRepo(),
);

export const useCurrentQuestionnaire = () => {

  return useQuery({
    queryKey: ["nutri-monitoria-quiz"],
    queryFn: async () => {
      return await ucQuestionnaire
        .getCurrentQuestionnaire()
    },
    staleTime: 1000 * 60 * 30, // exemplo: 30 min
    gcTime: 1000 * 60 * 60 * 24, // manter em cache por mais tempo
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });
  
};