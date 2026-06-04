import { Button } from "./ui/Button";

export const Intro = ({ start }: { start: () => void }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="capa-quiz"
            src="/assets/images/capa-quiz.jpeg"
          />
        </div>
        <div className="lg:grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            MONITORIA EM AVALIAÇÃO NUTRICIONAL
          </h1>
          <p className="mb-8 leading-relaxed">
            PROGRAMA DE MONITORIA E INICIAÇÃO CIENTÍFICA – PROMIC
          </p>
          <div className="flex justify-center">
            <Button
              classname="inline-flex text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
              label="Iniciar"
              onClick={start}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
