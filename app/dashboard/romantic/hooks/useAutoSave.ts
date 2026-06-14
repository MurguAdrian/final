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
  const debounceMsRef = useRef(debounceMs);

  dataRef.current = data;
  saveFnRef.current = saveFn;
  debounceMsRef.current = debounceMs;

  const cancelPending = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const doSave = useCallback(async () => {
    // If a save is already in progress, re-schedule so the latest data is sent after it finishes
    if (isSavingRef.current) {
      timerRef.current = setTimeout(doSave, debounceMsRef.current);
      return;
    }
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
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    setStatus('unsaved');
    cancelPending();

    timerRef.current = setTimeout(doSave, debounceMs);

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

