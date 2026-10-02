"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { analyzeFile } from "../services/analyze-file";
import type { AnalysisKind, AnalysisPhase, AnalysisResult } from "../types";

interface State {
  phase: AnalysisPhase;
  file: File | null;
  kind: AnalysisKind;
  step: number;
  result: AnalysisResult | null;
  error: string | null;
}

const initial: State = { phase: "idle", file: null, kind: "file", step: 0, result: null, error: null };

export function useAnalysis() {
  const [state, setState] = useState<State>(initial);
  const controller = useRef<AbortController | null>(null);

  const run = useCallback(async (file: File, kind: AnalysisKind) => {
    controller.current?.abort();
    const abort = new AbortController();
    controller.current = abort;
    setState({ phase: "analyzing", file, kind, step: 0, result: null, error: null });

    try {
      const result = await analyzeFile(file, kind, (step) => setState((s) => (abort.signal.aborted ? s : { ...s, step })), abort.signal);
      if (abort.signal.aborted) return;
      setState((s) => ({ ...s, phase: "done", result }));
    } catch (error) {
      if (abort.signal.aborted || (error instanceof DOMException && error.name === "AbortError")) return;
      setState((s) => ({
        ...s,
        phase: "error",
        error: "We couldn't analyze this file. It may be unreadable or too large for your browser. Try another file.",
      }));
    }
  }, []);

  const reset = useCallback(() => {
    controller.current?.abort();
    setState(initial);
  }, []);

  const reanalyze = useCallback(() => {
    if (state.file) void run(state.file, state.kind);
  }, [run, state.file, state.kind]);

  useEffect(() => () => controller.current?.abort(), []);

  return { ...state, start: run, reset, reanalyze };
}
