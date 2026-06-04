import { IconArrowBigLeftLines } from "@tabler/icons-react";

type HeaderProps = {
  questionnaireName: string;
  showBackButton?: boolean;
};

export const Header = ({ questionnaireName, showBackButton }: HeaderProps) => {

  return (
    <header className="text-gray-600 body-font border-b-2 border-dark-green">
      <div className="container mx-auto flex flex-wrap px-5 py-2 flex-col md:flex-row items-center justify-center gap-2">
        {showBackButton && (
          <a
            href="/"
            className="flex items-center gap-1 text-light-green hover:text-dark-green rounded-full p-2 transition-colors bg-lighter-green"
          >
            <IconArrowBigLeftLines />
          </a>
        )}
        <a
          className="flex title-font font-medium items-center mb-4 md:mb-0"
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
          <h1>{questionnaireName}</h1>
        </div>
      </div>
    </header>
  );
};
