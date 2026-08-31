"use client";

import { QUIZ } from "@/lib/content";

type Props = {
  index: number; // 0-basierter Quiz-Index
  picked?: "A" | "B" | "C";
  onAnswer: (key: "A" | "B" | "C") => void;
  onNext: () => void;
};

export default function QuizScreen({ index, picked, onAnswer, onNext }: Props) {
  const q = QUIZ[index];
  const correct = picked === q.right;
  const isLast = index === QUIZ.length - 1;

  return (
    <>
      <div className="mono-label" style={{ marginTop: 22, letterSpacing: "0.14em" }}>
        KURZCHECK · FRAGE {index + 1} VON 3
      </div>
      <h2 className="quiz-q">{q.q}</h2>

      <div className="scroll stack-9">
        {q.opts.map(([key, text]) => {
          const on = picked === key;
          const right = key === q.right;
          const cls = on ? (right ? " correct" : " wrong") : "";
          return (
            <button
              key={key}
              type="button"
              className={`quiz-opt${cls}`}
              aria-pressed={on}
              onClick={() => onAnswer(key as "A" | "B" | "C")}
            >
              <span className="quiz-key">{key}</span>
              <span className="quiz-opt-text">{text}</span>
            </button>
          );
        })}
      </div>

      <div className="foot foot-stack">
        {picked && (
          <div
            className={`feedback ${correct ? "correct" : "wrong"}`}
            role="status"
          >
            <div className="feedback-title">
              {correct ? "Richtig" : "Noch einmal"}
            </div>
            <p className="feedback-text">{correct ? q.ok : q.no}</p>
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={!correct}
          aria-disabled={!correct}
        >
          {isLast ? "Zum Abschluss" : "Nächste Frage"}
        </button>
      </div>
    </>
  );
}
