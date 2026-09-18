"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("modic-theme-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("modic-theme-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => "light");

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("modic-theme", nextTheme);
    window.dispatchEvent(new Event("modic-theme-change"));
  }

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "dark"}
    >
      <Sun
        className="theme-icon theme-icon-light"
        size={17}
        aria-hidden="true"
      />
      <Moon
        className="theme-icon theme-icon-dark"
        size={16}
        aria-hidden="true"
      />
      <span className="theme-label">
        {theme === "light" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
