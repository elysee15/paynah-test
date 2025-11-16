import { useRef, useEffect, useState, useCallback } from "react";

interface UseDynamicHeightOptions {
  gap?: number;
  padding?: number;
}

export function useDynamicHeight(options: UseDynamicHeightOptions = {}) {
  const { gap = 16, padding = 48 } = options;

  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [calculatedHeight, setCalculatedHeight] = useState<number>(0);

  const calculateHeight = useCallback(() => {
    if (containerRef.current && headerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const headerHeight = headerRef.current.offsetHeight;

      const remainingHeight = containerHeight - headerHeight - gap - padding;
      setCalculatedHeight(Math.max(0, remainingHeight));
    }
  }, [gap, padding]);

  useEffect(() => {
    calculateHeight();

    const resizeObserver = new ResizeObserver(() => {
      calculateHeight();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener("resize", calculateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateHeight);
    };
  }, [calculateHeight]);

  return {
    containerRef,
    headerRef,
    calculatedHeight,
  };
}
