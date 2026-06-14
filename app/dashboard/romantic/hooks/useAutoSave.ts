"use client";
import { useEffect, useRef, useState, useCallback } from 'react';

export type AutoSaveStatus = 'idle' | 'unsaved' | 'saving' | 'saved';

export function useAutoSave<T>(
  data: T,
  saveFn: (data: T) => Promise<void>,
  debounceMs = 1000,
): { status: AutoSaveStatus; setStatus: (s: AutoSaveStatus) => void; cancelPending: () => void } {
  const [status, setStatus] = useState<AutoSaveStatus>('idle');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRenderRef = useRef(true);
  const isSavingRef = useRef(false);
  const dataRef = useRef(data);
  const saveFnRef = useRef(saveFn);

  dataRef.current = data;
  saveFnRef.current = saveFn;

  const cancelPending = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const doSave = useCallback(async () => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setStatus('saving');
    try {
      await saveFnRef.current(dataRef.current);
      setStatus('saved');
    } catch (error) {
      console.error('Autosave error:', error);
      setStatus('unsaved');
    } finally {
      isSavingRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Skip first render
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    // If already saving, mark as unsaved to trigger retry after
    if (isSavingRef.current) {
      setStatus('unsaved');
      return;
    }

    setStatus('unsaved');
    cancelPending();

    // Schedule autosave
    timerRef.current = setTimeout(() => {
      doSave();
    }, debounceMs);

    return () => {
      cancelPending();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  return {
    status,
    setStatus,
    cancelPending,
  };
}

