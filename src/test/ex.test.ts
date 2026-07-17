import { describe, expect, it } from "vitest";
import { RepositoryFactory } from "../infra/factory/RepositoryFactory";
import { CURRENT_TECH_REPOSITORY } from "../utils/data";
import type { IQuestionnaire } from "../domain/entities/entities";
import { QuestionnaireUseCase } from "../domain/useCases/QuestionnaireUseCase";

const ucQuestionnaires = new QuestionnaireUseCase(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuestionnaireRepo(),
);

// describe('Recuperar Tags', () => {
//   it('deve recuperar as Tags de uma questão', async () => {

//     const x = await ucQTags.listTagsByQuestionId(1)
//     expect(x?.length).toBe(2);
//   });
// });

// describe("Tratamento para Question", () => {
//   it("Recuperando Question TESTE", async () => {
//     const x: IQuestion[] | null = await ucQuestions.listByQuestionnaireId(2);
//     expect(x && x[0].title).toBe("TITLE TESTE");
//     // console.log({...x[0], id: 0})
//     // const newQuestion = {...x![0], id: 0}
//     // const y = await ucQuestions.createOrUpdate(newQuestion)
//   });
// });

describe("QuestionnaireRepository", () => {
  it("Recuperando Question TESTE", async () => {
    const x: IQuestionnaire[] | null = await ucQuestionnaires.getActiveQuestionnaires();
    //console.log("urls",x?.flatMap(q => q.urls.map(u => u.url)));
    expect(x?.length).toBe(8);
  });
});
