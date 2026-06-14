"use client";
import { useEffect, useRef, useState, useCallback, Dispatch, SetStateAction } from 'react';

export type AutoSaveStatus = 'idle' | 'unsaved' | 'saving' | 'saved';

interface UseAutoSaveReturn {
  status: AutoSaveStatus;
  setStatus: Dispatch<SetStateAction<AutoSaveStatus>>;
  cancelPending: () => void;
}

export function useAutoSave<T>(
  data: T,
  saveFn: (data: T) => Promise<void>,
  debounceMs = 1000,
): UseAutoSaveReturn {
  const [status, setStatus] = useState<AutoSaveStatus>('idle');
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingRef   = useRef(false);
  const enabledRef  = useRef(false);
  const dataRef     = useRef(data);
  const saveFnRef   = useRef(saveFn);

  dataRef.current   = data;
  saveFnRef.current = saveFn;

  // Activate autosave only after 80ms to skip strict-mode double-mount
  // and initial data sync from parent props.
  useEffect(() => {
    const t = setTimeout(() => { enabledRef.current = true; }, 80);
    return () => {
      clearTimeout(t);
      enabledRef.current = false;
    };
  }, []);

  const cancelPending = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const doSave = useCallback(async () => {
    if (savingRef.current) return;
    savingRef.current = true;
    setStatus('saving');
    try {
      await saveFnRef.current(dataRef.current);
      setStatus('saved');
    } catch {
      setStatus('unsaved');
    } finally {
      savingRef.current = false;
    }
  }, []);

  // JSON.stringify allows value-based comparison so object identity changes
  // from React state updates don't cause spurious triggers.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const serialized = JSON.stringify(data);

  useEffect(() => {
    if (!enabledRef.current) return;
    if (savingRef.current) {
      setStatus('unsaved');
      return;
    }
    setStatus('unsaved');
    cancelPending();
    timerRef.current = setTimeout(doSave, debounceMs);
    return () => cancelPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized, debounceMs, cancelPending, doSave]);

  return { status, setStatus, cancelPending };
}
