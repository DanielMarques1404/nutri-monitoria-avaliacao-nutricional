import { Button } from "./ui/Button";

type NavButtonsProps = {
  BOF: boolean;
  EOF: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onRevealAnswer: () => void;
};

export const NavButtons = ({
  BOF,
  EOF,
  onPrevious,
  onNext,
  onRevealAnswer,
}: NavButtonsProps) => {
  return (
    <nav className="flex items-center justify-center gap-2 w-full my-2">
      {!BOF && (
        <Button
          label="Anterior"
          onClick={onPrevious}
          classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
        />
      )}

      <Button
        label="Confirmar Resposta"
        onClick={onRevealAnswer}
        classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
      />

      {!EOF && (
        <Button
          label="Próxima"
          onClick={onNext}
          classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
        />
      )}

      {EOF && (
        <Button
          label="Resumo"
          // onClick={onNext}
          classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
        />
      )}
    </nav>
  );
};
