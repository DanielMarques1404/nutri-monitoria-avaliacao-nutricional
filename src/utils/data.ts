export type Person = {
  prefix: string;
  name: string;
  foto?: string;
  email?: string;
  facebook?: string;
  tweeter?: string;
  instagram?: string;
  linkedin?: string;
};


export const Student: Person = {
  prefix: "Monitora:",
  name: "Emanuella Alves Monteiro Marques",
  foto: "assets/images/monitora-emanuella.jpg",
  instagram: "https://www.instagram.com/emanuellanutri/",
  email: "emanuellamonteironutri@gmail.com",
};

export const Professor: Person = {
  prefix: "Professor:",
  name: "Leonardo Furtado de Oliveira",
  foto: "assets/images/professor-leonardo.jpg",
  instagram: "https://www.instagram.com/leofnutricionista/",
  email: "leonardo.oliveira@professor.unifametro.edu.br",
};

export const getAttemptStorageKey = (questionnaireId: number) =>
  `quiz-attempt:${questionnaireId}`;

export const MAX_QUESTION_OPTIONS = 5;

export const REPOSITORY_SUPABASE = 1;

export const CURRENT_TECH_REPOSITORY = REPOSITORY_SUPABASE;
