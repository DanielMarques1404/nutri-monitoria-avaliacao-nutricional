import { useState } from "react";
import "./App.css";
import { useQuestionnaireContext } from "./app/hooks/useQuestionnaireContext";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import Modal from "./components/layout/Modal";
import { QuestionForm } from "./components/QuestionForm";
import { Summary } from "./components/Summary";
import { Button } from "./components/ui/Button";

function App() {
  const { currentQuestion, next, prior, showAnswer } =
    useQuestionnaireContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <Header />

        {!currentQuestion ? (
          <Intro />
        ) : (
          // <Summary question={currentQuestion} />
          <>
            <QuestionForm />
            <nav className="flex items-center justify-center gap-2 w-full">
              {currentQuestion.index > 1 && <Button
                label={"Anterior"}
                onClick={prior}
                classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
              />}
              <Button
                label={"Ver resposta"}
                onClick={() => {
                  showAnswer(true);
                  handleOpen();
                }}
                classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
              />
              {currentQuestion.index < 10 && <Button
                label={"Próxima"}
                onClick={next}
                classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
              />}
            </nav>
          </>
        )}

        <Footer />
      </div>
      {isModalOpen && currentQuestion && (
        <Modal isOpen={isModalOpen}>
          <Summary handleClose={handleClose} question={currentQuestion} message="Parabéns"/>
        </Modal>
      )}
    </>
  );
}

export default App;
