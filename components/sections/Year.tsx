"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Static fallback for the prerendered page, current year once hydrated. */
export function Year() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <span>{year}</span>;
}
