import { useQuestionnaireContext } from "../app/hooks/useQuestionnaireContext";
import { Button } from "./ui/Button";

type NavButtonsProps = {
  handleOpenModal: () => void;
};

export const NavButtons = ({ handleOpenModal }: NavButtonsProps) => {
  const { currentQuestion, prior, next, showAnswer } =
    useQuestionnaireContext();

  return (
    <nav className="flex items-center justify-center gap-2 w-full">
      {currentQuestion!.index > 1 && (
        <Button
          label={"Anterior"}
          onClick={prior}
          classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
        />
      )}
      <Button
        label={"Ver resposta"}
        onClick={() => {
          showAnswer(true);
          handleOpenModal();
        }}
        classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
      />
      {currentQuestion!.index < 10 && (
        <Button
          label={"Próxima"}
          onClick={next}
          classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
        />
      )}
    </nav>
  );
};
