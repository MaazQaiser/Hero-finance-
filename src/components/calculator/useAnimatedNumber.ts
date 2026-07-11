"use client";

import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(value: number, duration = 450): number {
  const [displayValue, setDisplayValue] = useState(value);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef({ value: displayValue, time: 0 });

  useEffect(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const startValue = displayValue;
    const delta = value - startValue;
    if (Math.abs(delta) < 0.5) {
      setDisplayValue(value);
      return;
    }

    startRef.current = { value: startValue, time: performance.now() };

    const animate = (time: number) => {
      const elapsed = time - startRef.current.time;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startRef.current.value + delta * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return displayValue;
}
