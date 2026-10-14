"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const CHANGE_EVENT = "themechange";

/**
 * Runs in <head> before first paint (see app/layout.tsx) so a saved theme
 * never flashes. Keep it in sync with `applyTheme` below.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

function systemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function getTheme(): Theme {
  const chosen = document.documentElement.getAttribute("data-theme");
  return chosen === "light" || chosen === "dark" ? chosen : systemTheme();
}

/**
 * The page follows the system until the reader picks the other theme. Picking
 * the theme the system already uses clears the override, so there's no
 * separate "system" option to manage.
 */
function applyTheme(next: Theme) {
  const root = document.documentElement;
  const followsSystem = next === systemTheme();
  if (followsSystem) root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", next);
  try {
    if (followsSystem) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode, blocked); the choice still applies to this page.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  // Another tab changed the theme: mirror it here.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    const value = event.newValue;
    if (value === "light" || value === "dark") document.documentElement.setAttribute("data-theme", value);
    else document.documentElement.removeAttribute("data-theme");
    onChange();
  };
  media.addEventListener("change", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function ThemeToggle() {
  // `null` on the server and during hydration; the real theme right after.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => applyTheme(next)}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      title={theme === null ? "Switch theme" : `Switch to ${next} theme`}
      className="-m-1.5 inline-grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-200 hover:text-ink"
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="size-4">
        <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5Z" fill="currentColor" />
      </svg>
    </button>
  );
}
