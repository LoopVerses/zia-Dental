"use client";

import { useRef } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";

type Options = {
  margin?: UseInViewOptions["margin"];
  amount?: UseInViewOptions["amount"];
  once?: boolean;
};

/**
 * Hook for scroll-triggered animations. Returns a ref to attach to the element
 * and an `inView` flag to gate animations. Single-shot by default.
 */
export function useScrollAnimation<T extends Element = HTMLDivElement>(
  options: Options = {},
) {
  const { margin = "-100px", amount = "some", once = true } = options;
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin, amount, once });
  return { ref, inView };
}
