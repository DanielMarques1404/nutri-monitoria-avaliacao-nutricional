import type { IQuestion } from "../domain/entities/entities";
import { Button } from "./ui/Button";

type SummaryProps = {
  question: IQuestion;
  kind: "success" | "error" | "abstention";
  handleClose: () => void;
};

export const Summary = ({ question, kind, handleClose }: SummaryProps) => {
  return (
    <section className="h-full p-2 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
      <img
        className="md:h-72 w-full object-cover object-center"
        src={
          kind === "success"
            ? "assets/images/resposta-certa.png"
            : kind === "error"
              ? "assets/images/resposta-errada.png"
              : "assets/images/resposta-ausente.png"
        }
        alt={`Imagem ${question.title}`}
      />
      <div className="flex flex-col gap-1 p-4">
        <ul className="flex flex-wrap gap-2">
          {question.tags?.map((tag) => (
            <li className="flex items-center justify-center h-6 bg-answer-user border border-dark-green p-1 text-dark-green">
              {tag.name}
            </li>
          ))}
        </ul>
        <p className="leading-relaxed mb-3">{question.explanation}</p>
        <p className="text-dark-green font-bold">{`Resposta: ${question.correctOption}`}</p>
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
