import { describe, expect, it } from "vitest";
import { QuestionUseCases } from "../domain/useCases/QuestionUseCases";
import { RepositoryFactory } from "../infra/factory/RepositoryFactory";
import { CURRENT_TECH_REPOSITORY } from "../utils/data";
import type { IQuestion } from "../domain/entities/entities";

const questionTagsRepo = RepositoryFactory.getRepo(
  CURRENT_TECH_REPOSITORY,
).createQuestionTagsRepo();
const questionOptionsRepo = RepositoryFactory.getRepo(
  CURRENT_TECH_REPOSITORY,
).createQuestionOptionsRepo();
const questionRepo = RepositoryFactory.getRepo(
  CURRENT_TECH_REPOSITORY,
).createQuetionsRepo();

const ucQuestions = new QuestionUseCases(
  questionRepo,
  questionTagsRepo,
  questionOptionsRepo,
);

// describe('Recuperar Tags', () => {
//   it('deve recuperar as Tags de uma questão', async () => {

//     const x = await ucQTags.listTagsByQuestionId(1)
//     expect(x?.length).toBe(2);
//   });
// });

describe("Tratamento para Question", () => {
  it("Recuperando Question TESTE", async () => {
    const x: IQuestion[] | null = await ucQuestions.listByQuestionnaireId(2);
    expect(x && x[0].title).toBe("TITLE TESTE");
    // console.log({...x[0], id: 0})
    // const newQuestion = {...x![0], id: 0}
    // const y = await ucQuestions.createOrUpdate(newQuestion)
  });
});
