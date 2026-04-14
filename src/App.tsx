import "./App.css";
import { useQuestionnaireContext } from "./app/hooks/useQuestionnaireContext";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import { QuestionForm } from "./components/QuestionForm";
import { Button } from "./components/ui/Button";

function App() {
  const { currentQuestion, next, prior, showAnswer } =
    useQuestionnaireContext();

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      {!currentQuestion ? (
        <Intro />
      ) : (
        <>
          <QuestionForm />
          <div className="flex items-center justify-center gap-2 w-full">
            <Button
              label={"Anterior"}
              onClick={prior}
              classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
            />
            <Button
              label={"Ver resposta"}
              onClick={() => showAnswer(true)}
              classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
            />
            <Button
              label={"Próxima"}
              onClick={next}
              classname="bg-light-green rounded-md px-3 py-2 text-white m-1"
            />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
