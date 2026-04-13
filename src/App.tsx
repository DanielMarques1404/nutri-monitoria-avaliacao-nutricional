import "./App.css";
import { useQuestionnaireContext } from "./app/hooks/useQuestionnaireContext";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import { QuestionForm } from "./components/QuestionForm";

function App() {
  const { currentQuestion, next, prior } = useQuestionnaireContext();

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      {!currentQuestion ? (
        <Intro />
      ) : (
        <QuestionForm />
      )}
      <div className="flex gap-2">
        <button onClick={prior}>Anterior</button>
        <button onClick={next}>Próxima</button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
