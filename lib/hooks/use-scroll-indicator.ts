"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type UseScrollIndicatorReturn = {
  scrollRef: React.RefObject<HTMLUListElement | null>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
  checkScrollability: () => void;
};

export function useScrollIndicator(
  scrollAmount: number = 200
): UseScrollIndicatorReturn {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;
    const isScrollable = scrollWidth > clientWidth;

    setCanScrollLeft(isScrollable && scrollLeft > 0);
    setCanScrollRight(
      isScrollable && scrollLeft < scrollWidth - clientWidth - 1
    );
  }, []);

  const scrollLeft = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }, [scrollAmount]);

  const scrollRight = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, [scrollAmount]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    // Initial check - deferred to avoid synchronous setState
    const initialCheck = requestAnimationFrame(() => {
      checkScrollability();
    });

    // Check on scroll
    element.addEventListener("scroll", checkScrollability);

    // Check on resize
    const resizeObserver = new ResizeObserver(checkScrollability);
    resizeObserver.observe(element);

    // Check when window resizes
    window.addEventListener("resize", checkScrollability);

    return () => {
      cancelAnimationFrame(initialCheck);
      element.removeEventListener("scroll", checkScrollability);
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability]);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    checkScrollability,
  };
}
