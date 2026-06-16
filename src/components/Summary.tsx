import { useState } from "react";
import type { IOption, IQuestion } from "../domain/entities/entities";
import { Button } from "./ui/Button";

const imageSuffixByKind = {
  success: "right-answer",
  error: "wrong-answer",
  abstention: "no-answer",
} as const;

const labelByKind = {
  success: "PARABÉNS! VOCÊ ACERTOU!",
  error: "OPS... TENTE NOVAMENTE!",
  abstention: "QUESTÃO NÃO RESPONDIDA",
} as const;

type SummaryProps = {
  question: IQuestion;
  options: IOption[];
  kind: "success" | "error" | "abstention";
  handleClose: () => void;
};

export const Summary = ({ question, options, kind, handleClose }: SummaryProps) => {
  const [imageCharacter] = useState(() =>
    Math.random() < 0.5 ? "monitora" : "professor",
  );
  const imageSrc = `assets/images/${imageCharacter}-${imageSuffixByKind[kind]}.jpg`;
  const correctOptionIndex = options.findIndex(
    (option) => option.id === question.correctOption,
  );
  const correctOptionLetter =
    correctOptionIndex < 0
      ? "-"
      : ["A", "B", "C", "D", "E"][correctOptionIndex];

  return (
    <section className="h-full p-2 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
      <div className="relative h-72 w-full bg-white">
        <div className="absolute top-0 left-0 z-10 w-full bg-dark-green/90 px-3 py-2 text-center text-sm font-bold tracking-wide text-white md:text-base select-none">
          {labelByKind[kind]}
        </div>
        <img
          className="h-full w-full object-contain object-center pt-10 select-none"
          src={imageSrc}
          alt={`Imagem ${question.title}`}
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <ul className="flex flex-wrap gap-2">
          {question.tags?.map((tag) => (
            <li className="flex items-center justify-center h-6 bg-orange border border-dark-green p-1 text-dark-green">
              {tag.name}
            </li>
          ))}
        </ul>
        <p className="leading-relaxed mb-3">{question.explanation}</p>
        <p className="text-dark-green font-bold">{`Resposta correta: ${correctOptionLetter}`}</p>
        {question.urlLearnMore && (
          <div className="flex items-center flex-wrap ">
            <a
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
              href={question.urlLearnMore}
              target="_blank"
              rel="noreferrer"
            >
              Aprender Mais
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        )}
        <Button
          label="Fechar"
          onClick={handleClose}
          classname="bg-light-green rounded-md px-3 py-2 text-white m-auto"
        />
      </div>
    </section>
  );
};
