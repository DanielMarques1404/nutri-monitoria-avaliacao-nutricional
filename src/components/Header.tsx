import { IconArrowBigLeftLines } from "@tabler/icons-react";

type HeaderProps = {
  questionnaireName?: string;
  showBackButton?: boolean;
};

export const Header = ({ questionnaireName, showBackButton }: HeaderProps) => {
  return (
    <header className="text-gray-600 body-font border-b-2 border-dark-green">
      <div className="container mx-auto flex flex-wrap px-5 py-2 flex-col md:flex-row items-center justify-center gap-2">
        <a
          className="flex title-font font-medium items-center mb-4 md:mb-0 select-none"
          href="https://unifametro.edu.br/"
          target="blank"
        >
          <img
            id="image-17-106"
            alt=""
            src="https://unifametro.edu.br/wp-content/uploads/2023/06/logo-unifametro.png"
          />
        </a>
        <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-center justify-center">
          <h1>
            {questionnaireName ? (
              questionnaireName
            ) : (
              <div className="my-1">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  MONITORIA EM AVALIAÇÃO NUTRICIONAL
                </h1>
                <span className="text-xl font-light leading-relaxed">
                  PROGRAMA DE MONITORIA E INICIAÇÃO CIENTÍFICA – PROMIC
                </span>
              </div>
            )}
          </h1>
        </div>
        {showBackButton && (
          <a
            href="/"
            className="flex items-center justify-center gap-1 rounded-md p-2 bg-dark-green hover:bg-medium-green text-white cursor-pointer select-none"
          >
            <IconArrowBigLeftLines />
            <span>Voltar</span>
          </a>
        )}
      </div>
    </header>
  );
};
