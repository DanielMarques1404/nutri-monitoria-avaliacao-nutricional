import { useQuestionnaireContext } from "../app/hooks/useQuestionnaireContext";
import { Button } from "./ui/Button";

type NavButtonsProps = {
  handleOpenModal: () => void;
};

export const NavButtons = ({ handleOpenModal }: NavButtonsProps) => {
  const { currentQuestion, currentQuestionIndex, prior, next, showAnswer } =
    useQuestionnaireContext();

  return (
    <nav className="flex items-center justify-center gap-2 w-full my-2">
      {currentQuestionIndex > 1 && (
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
      {currentQuestionIndex < 9 ? (
        <Button
          label={"Próxima"}
          onClick={next}
          classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
        />
      ) : <Button
          label={"Resultado Final"}
          onClick={next}
          classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
        />}
    </nav>
  );
};
