"use client";
import React, { useRef } from "react";

/**
 * Returns an array of stable React refs, one per index.
 * Preserves existing refs when the count changes.
 */
export function useArrayRefs<T extends HTMLElement>(count: number) {
  const refs = useRef<React.RefObject<T>[]>([]);
  if (refs.current.length !== count) {
    refs.current = Array.from({ length: count }, (_, i) => refs.current[i] ?? React.createRef<T>());
  }
  return refs.current;
}