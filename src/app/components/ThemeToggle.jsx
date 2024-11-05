"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleChangeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleChangeTheme}
      className={`w-9 h-9 border-2 transition-all duration-300 
      ${theme === 'light' ? 'border-light-primary text-light-foreground' : 'border-dark-primary text-dark-foreground'}`}
      
    >
      {theme === "light" ? (
        <Moon className="icon-dark h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all dark:rotate-0 dark:scale-100" />
      ) : (
        <Sun className="icon-light h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
