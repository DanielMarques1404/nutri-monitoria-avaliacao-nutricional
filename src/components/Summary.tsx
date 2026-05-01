import type { IQuestion } from "../domain/entities/entities";

type SummaryProps = {
  question: IQuestion;
  message: string;
  handleClose: () => void;
};

export const Summary = ({ question, message, handleClose }: SummaryProps) => {
  return (
    <section className="h-full p-2 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
      <span className="flex justify-center font-ubuntu font-bold text-3xl text-red-600 uppercase mb-2">
        {message}
      </span>
      <img
        className="md:h-52 w-full object-cover object-center"
        src={question.summaryImage}
        alt={`Imagem ${question.title}`}
      />
      <div className="flex flex-col gap-1 p-4">
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
          {question.title}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {question.tags?.map((tag) => (
            <li className="flex items-center justify-center h-6 bg-answer-user border border-dark-green p-1 text-dark-green">
              {tag.name}
            </li>
          ))}
        </ul>
        <p className="leading-relaxed mb-3">{question.explanation}</p>
        <div className="flex items-center flex-wrap ">
          <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
            Aprender Mais
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
        <button onClick={handleClose}>Fechar</button>
      </div>
    </section>
  );
};
