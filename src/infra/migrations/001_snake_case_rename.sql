-- ============================================================
-- Migration: Rename tables and columns to snake_case
--
-- FLUXO CORRETO:
-- 1. Execute este script no Supabase SQL Editor
-- 2. No terminal, regenere os tipos:  supabase gen types typescript --linked > src/infra/supabase/supabase.ts
-- 3. Os repositórios em src/infra/supabase/ já estão atualizados para snake_case
-- ============================================================

-- 1. Renomear colunas dentro das tabelas (antes de renomear as tabelas)
ALTER TABLE "Questions" RENAME COLUMN "categoryId" TO "category_id";
ALTER TABLE "Questions" RENAME COLUMN "correctOption" TO "correct_option";

ALTER TABLE "QuestionOptions" RENAME COLUMN "questionId" TO "question_id";

ALTER TABLE "QuestionTags" RENAME COLUMN "questionId" TO "question_id";
ALTER TABLE "QuestionTags" RENAME COLUMN "tagId" TO "tag_id";

ALTER TABLE "QuestionnaireQuestions" RENAME COLUMN "questionnaireId" TO "questionnaire_id";
ALTER TABLE "QuestionnaireQuestions" RENAME COLUMN "questionId" TO "question_id";

-- 2. Renomear as tabelas
ALTER TABLE "Categories" RENAME TO categories;
ALTER TABLE "Tags" RENAME TO tags;
ALTER TABLE "Questionnaires" RENAME TO questionnaires;
ALTER TABLE "Questions" RENAME TO questions;
ALTER TABLE "QuestionOptions" RENAME TO question_options;
ALTER TABLE "QuestionTags" RENAME TO question_tags;
ALTER TABLE "QuestionnaireQuestions" RENAME TO questionnaire_questions;

-- 3. Renomear constraints FK para manter consistência
ALTER TABLE "questionnaire_questions" RENAME CONSTRAINT "QuestionnaireQuestions_questionId_fkey" TO "questionnaire_questions_question_id_fkey";
ALTER TABLE "questionnaire_questions" RENAME CONSTRAINT "QuestionnaireQuestions_questionnaireId_fkey" TO "questionnaire_questions_questionnaire_id_fkey";

ALTER TABLE "question_options" RENAME CONSTRAINT "QuestionOptions_questionId_fkey" TO "question_options_question_id_fkey";

ALTER TABLE "questions" RENAME CONSTRAINT "Questions_categoryId_fkey" TO "questions_category_id_fkey";

ALTER TABLE "question_tags" RENAME CONSTRAINT "QuestionsTags_questionId_fkey" TO "question_tags_question_id_fkey";
ALTER TABLE "question_tags" RENAME CONSTRAINT "QuestionsTags_tagId_fkey" TO "question_tags_tag_id_fkey";

-- 4. Criar índices nas colunas de chave estrangeira (se não existirem)
CREATE INDEX IF NOT EXISTS idx_questionnaire_questions_questionnaire_id
  ON questionnaire_questions(questionnaire_id);

CREATE INDEX IF NOT EXISTS idx_questionnaire_questions_question_id
  ON questionnaire_questions(question_id);

CREATE INDEX IF NOT EXISTS idx_question_options_question_id
  ON question_options(question_id);

CREATE INDEX IF NOT EXISTS idx_question_tags_question_id
  ON question_tags(question_id);

CREATE INDEX IF NOT EXISTS idx_question_tags_tag_id
  ON question_tags(tag_id);

CREATE INDEX IF NOT EXISTS idx_questions_category_id
  ON questions(category_id);

-- ============================================================
-- Rollback (caso necessário):
-- ============================================================
/*
-- Remover índices
DROP INDEX IF EXISTS idx_questions_category_id;
DROP INDEX IF EXISTS idx_question_tags_tag_id;
DROP INDEX IF EXISTS idx_question_tags_question_id;
DROP INDEX IF EXISTS idx_question_options_question_id;
DROP INDEX IF EXISTS idx_questionnaire_questions_question_id;
DROP INDEX IF EXISTS idx_questionnaire_questions_questionnaire_id;

-- Renomear constraints de volta
ALTER TABLE question_tags RENAME CONSTRAINT question_tags_tag_id_fkey TO "QuestionsTags_tagId_fkey";
ALTER TABLE question_tags RENAME CONSTRAINT question_tags_question_id_fkey TO "QuestionsTags_questionId_fkey";
ALTER TABLE questions RENAME CONSTRAINT questions_category_id_fkey TO "Questions_categoryId_fkey";
ALTER TABLE question_options RENAME CONSTRAINT question_options_question_id_fkey TO "QuestionOptions_questionId_fkey";
ALTER TABLE questionnaire_questions RENAME CONSTRAINT questionnaire_questions_questionnaire_id_fkey TO "QuestionnaireQuestions_questionnaireId_fkey";
ALTER TABLE questionnaire_questions RENAME CONSTRAINT questionnaire_questions_question_id_fkey TO "QuestionnaireQuestions_questionId_fkey";

-- Renomear tabelas de volta
ALTER TABLE categories RENAME TO "Categories";
ALTER TABLE tags RENAME TO "Tags";
ALTER TABLE questionnaires RENAME TO "Questionnaires";
ALTER TABLE questions RENAME TO "Questions";
ALTER TABLE question_options RENAME TO "QuestionOptions";
ALTER TABLE question_tags RENAME TO "QuestionTags";
ALTER TABLE questionnaire_questions RENAME TO "QuestionnaireQuestions";

-- Renomear colunas de volta
ALTER TABLE "QuestionnaireQuestions" RENAME COLUMN question_id TO "questionId";
ALTER TABLE "QuestionnaireQuestions" RENAME COLUMN questionnaire_id TO "questionnaireId";
ALTER TABLE "QuestionTags" RENAME COLUMN tag_id TO "tagId";
ALTER TABLE "QuestionTags" RENAME COLUMN question_id TO "questionId";
ALTER TABLE "QuestionOptions" RENAME COLUMN question_id TO "questionId";
ALTER TABLE "Questions" RENAME COLUMN correct_option TO "correctOption";
ALTER TABLE "Questions" RENAME COLUMN category_id TO "categoryId";
*/
