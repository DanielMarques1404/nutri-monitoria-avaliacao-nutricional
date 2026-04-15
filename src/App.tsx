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
import { NavButtons } from "./components/NavButtons";

function App() {
  const { currentQuestion } =
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
            <NavButtons handleOpenModal={handleOpen} />
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
