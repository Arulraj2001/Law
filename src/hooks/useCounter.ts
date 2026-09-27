"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export interface UseCounterReturn {
  count: number;
  isComplete: boolean;
  trigger: () => void;
}

export function useCounter(
  end: number,
  duration: number = 2,
  start: number = 0
): UseCounterReturn {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  // Normalize duration: if duration <= 10, consider it in seconds (e.g. 2s -> 2000ms)
  const durationMs = duration <= 10 ? duration * 1000 : duration;

  const trigger = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsComplete(false);

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(elapsed / durationMs, 1);

      // easeOut cubic curve: 1 - Math.pow(1 - t, 3)
      const easeProgress = 1 - Math.pow(1 - t, 3);
      const current = Math.round(start + (end - start) * easeProgress);

      setCount(current);

      if (t < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsComplete(true);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [end, durationMs, start]);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return { count, isComplete, trigger };
}

export default useCounter;
