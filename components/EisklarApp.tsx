"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PREP, QUIZ, STEPS } from "@/lib/content";
import {
  EisklarState,
  initialState,
  loadState,
  saveState,
  clampStep,
  lastStep,
} from "@/lib/state";

import AppHeader from "./AppHeader";
import AppMenu from "./AppMenu";
import SourcesDrawer from "./SourcesDrawer";
import IntroScreen from "./screens/IntroScreen";
import HealthScreen from "./screens/HealthScreen";
import TodayScreen from "./screens/TodayScreen";
import BodyScreen from "./screens/BodyScreen";
import PrepScreen from "./screens/PrepScreen";
import EntryScreen from "./screens/EntryScreen";
import DuringScreen from "./screens/DuringScreen";
import AfterScreen from "./screens/AfterScreen";
import QuizScreen from "./screens/QuizScreen";
import DoneScreen from "./screens/DoneScreen";

function hashForStep(step: number) {
  return "#" + STEPS[clampStep(step)];
}

function stepFromHash(): number | null {
  if (typeof window === "undefined") return null;
  const name = window.location.hash.replace(/^#/, "");
  const idx = STEPS.indexOf(name as (typeof STEPS)[number]);
  return idx >= 0 ? idx : null;
}

export default function EisklarApp() {
  const [state, setState] = useState<EisklarState>(initialState);
  const [mounted, setMounted] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Mount: gespeicherten Fortschritt laden, History initialisieren ---
  useEffect(() => {
    const persisted = loadState();
    const hashStep = stepFromHash();
    setState((s) => {
      const merged = { ...s, ...(persisted ?? {}), drawer: false };
      if (hashStep !== null) merged.step = hashStep;
      return merged;
    });
    const startStep =
      hashStep !== null ? hashStep : clampStep(persisted?.step ?? 0);
    window.history.replaceState({ step: startStep }, "", hashForStep(startStep));
    setMounted(true);

    function onPop(e: PopStateEvent) {
      const fromState =
        e.state && typeof e.state.step === "number" ? e.state.step : null;
      const next = fromState ?? stepFromHash() ?? 0;
      setState((s) => ({ ...s, step: clampStep(next), drawer: false, menu: false }));
    }
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (autoTimer.current) clearTimeout(autoTimer.current);
    };
  }, []);

  // --- Persistenz bei jeder relevanten Aenderung ---
  useEffect(() => {
    if (mounted) saveState(state);
  }, [mounted, state]);

  // --- Navigation mit eigener History-Entry pro Schritt ---
  const goTo = useCallback((target: number, replace = false) => {
    const clamped = clampStep(target);
    setState((s) => ({ ...s, step: clamped, drawer: false, menu: false }));
    const data = { step: clamped };
    if (replace) window.history.replaceState(data, "", hashForStep(clamped));
    else window.history.pushState(data, "", hashForStep(clamped));
  }, []);

  const next = useCallback(() => goTo(state.step + 1), [goTo, state.step]);

  const back = useCallback(() => {
    // Echte Browser-History: Zurueck geht einen Schritt zurueck, ohne
    // den Fortschritt zu loeschen.
    if (state.step > 0) window.history.back();
  }, [state.step]);

  const openDrawer = useCallback(
    () => setState((s) => ({ ...s, drawer: true, menu: false })),
    []
  );
  const closeDrawer = useCallback(() => setState((s) => ({ ...s, drawer: false })), []);
  const toggleMenu = useCallback(
    () => setState((s) => ({ ...s, menu: !s.menu })),
    []
  );
  const closeMenu = useCallback(() => setState((s) => ({ ...s, menu: false })), []);

  const toggleChip = useCallback(
    (k: string) => setState((s) => ({ ...s, open: s.open === k ? null : k })),
    []
  );
  const pickNoRisk = useCallback(() => setState((s) => ({ ...s, risk: "none" })), []);
  const pickRisk = useCallback(() => setState((s) => ({ ...s, risk: "risk" })), []);
  const pickFit = useCallback(() => setState((s) => ({ ...s, today: "fit" })), []);
  const pickStop = useCallback(() => setState((s) => ({ ...s, today: "stop" })), []);
  const togglePrep = useCallback(
    (k: string) =>
      setState((s) => ({ ...s, prep: { ...s.prep, [k]: !s.prep[k] } })),
    []
  );

  const answerQuiz = useCallback(
    (qi: number, key: "A" | "B" | "C") => {
      setState((s) => ({ ...s, answers: { ...s.answers, [qi]: key } }));
      if (key === QUIZ[qi].right && qi === QUIZ.length - 1) {
        if (autoTimer.current) clearTimeout(autoTimer.current);
        autoTimer.current = setTimeout(() => goTo(clampStep(8 + qi) + 1), 1300);
      }
    },
    [goTo]
  );

  const name = STEPS[state.step];
  const progress = Math.round((state.step / lastStep) * 100);
  const stepLabel = `${state.step}/${lastStep}`;
  const allPrep = PREP.every((p) => state.prep[p.k]);

  function renderScreen() {
    switch (name) {
      case "health":
        return (
          <HealthScreen
            open={state.open}
            risk={state.risk}
            onToggleChip={toggleChip}
            onPickNoRisk={pickNoRisk}
            onPickRisk={pickRisk}
            onNext={next}
          />
        );
      case "today":
        return (
          <TodayScreen
            today={state.today}
            onPickFit={pickFit}
            onPickStop={pickStop}
            onNext={next}
          />
        );
      case "body":
        return <BodyScreen onNext={next} />;
      case "prep":
        return (
          <PrepScreen
            prep={state.prep}
            allPrep={allPrep}
            onToggle={togglePrep}
            onNext={next}
          />
        );
      case "entry":
        return <EntryScreen onNext={next} />;
      case "during":
        return <DuringScreen onNext={next} />;
      case "after":
        return <AfterScreen onNext={next} />;
      case "q1":
      case "q2":
      case "q3": {
        const qi = state.step - 8;
        return (
          <QuizScreen
            index={qi}
            picked={state.answers[qi]}
            onAnswer={(key) => answerQuiz(qi, key)}
            onNext={next}
          />
        );
      }
      case "done":
        return <DoneScreen risk={state.risk} today={state.today} />;
      default:
        return null;
    }
  }

  // Vor dem Mount immer den Intro-Screen rendern (deckt sich mit SSR,
  // verhindert Hydration-Mismatch). Danach ggf. gespeicherten Schritt zeigen.
  const showIntro = !mounted || name === "intro";

  return (
    <div className="app-shell">
      <main className="app" aria-label="Eisklar - Guide">
        {showIntro ? (
          <IntroScreen onNext={next} />
        ) : (
          <div className={`screen screen--${name}`}>
            <AppHeader
              progress={progress}
              stepLabel={stepLabel}
              onBack={back}
            />
            {renderScreen()}
          </div>
        )}
        <AppMenu
          open={state.menu}
          onToggle={toggleMenu}
          onClose={closeMenu}
          onOpenInfo={openDrawer}
          onPhoto={showIntro}
        />
        <SourcesDrawer open={state.drawer} onClose={closeDrawer} />
      </main>
    </div>
  );
}
