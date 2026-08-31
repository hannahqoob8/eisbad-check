"use client";

import { useT } from "@/lib/i18n";

type Props = {
  index: number; // 0-basierter Quiz-Index
  picked?: "A" | "B" | "C";
  onAnswer: (key: "A" | "B" | "C") => void;
  onNext: () => void;
};

export default function QuizScreen({ index, picked, onAnswer, onNext }: Props) {
  const t = useT();
  const q = t.QUIZ[index];
  const correct = picked === q.right;
  const isLast = index === t.QUIZ.length - 1;

  return (
    <>
      <div className="mono-label" style={{ marginTop: 22, letterSpacing: "0.14em" }}>
        {t.quiz.kicker} {index + 1} {t.quiz.of}
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
              {correct ? t.quiz.correct : t.quiz.wrong}
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
          {isLast ? t.quiz.ctaFinish : t.quiz.ctaNext}
        </button>
      </div>
    </>
  );
}
