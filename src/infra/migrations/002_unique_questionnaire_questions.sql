-- ============================================================
-- Migration: Prevent duplicate questionnaire-question links
--
-- Execute este script no Supabase SQL Editor para garantir que
-- uma pergunta não seja vinculada mais de uma vez ao mesmo
-- questionário.
-- ============================================================

ALTER TABLE questionnaire_questions
ADD CONSTRAINT questionnaire_questions_questionnaire_id_question_id_key
UNIQUE (questionnaire_id, question_id);

-- ============================================================
-- Rollback (caso necessário):
-- ============================================================
/*
ALTER TABLE questionnaire_questions
DROP CONSTRAINT IF EXISTS questionnaire_questions_questionnaire_id_question_id_key;
*/
