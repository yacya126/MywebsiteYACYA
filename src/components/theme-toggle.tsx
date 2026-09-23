"use client";

import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const t = useTranslations("common");

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", initialDark);
    const frame = window.requestAnimationFrame(() => setDark(initialDark));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    document.documentElement.classList.toggle("dark", nextDark);
    window.localStorage.setItem("theme", nextDark ? "dark" : "light");
    setDark(nextDark);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={dark ? t("lightMode") : t("darkMode")}
      onClick={toggleTheme}
    >
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </Button>
  );
}
