type NavButtonsProps = {
  BOF: boolean;
  EOF: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onRevealAnswer: () => void;
};

export function NavButtons({
  BOF,
  EOF,
  onPrevious,
  onNext,
  onRevealAnswer,
}: NavButtonsProps) {
  return (
    <nav style={{ display: "flex", gap: 8, marginTop: 24 }}>
      {!BOF && (
        <button type="button" onClick={onPrevious}>
          Anterior
        </button>
      )}

      <button type="button" onClick={onRevealAnswer}>
        Ver resposta
      </button>

      {!EOF && (
        <button type="button" onClick={onNext}>
          Próxima
        </button>
      )}
    </nav>
  );
}