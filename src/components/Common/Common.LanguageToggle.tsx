"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import ContainerGlobal from "@/components/Project/page";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import type { Lang } from "@/components/Project/page";

const LanguageToggle = memo<{ lang: Lang; onToggle: () => void }>(
  ({ lang, onToggle }) => (
    <button
      onClick={onToggle}
      className="
        flex items-center gap-2 px-3 py-2 rounded-lg
        border border-gray-600 dark:border-gray-500
        bg-gray-800/60 dark:bg-gray-700/60
        hover:bg-gray-700 dark:hover:bg-gray-600
        text-gray-200 dark:text-gray-100
        transition-all duration-200 text-sm font-medium
      "
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4" />
      <span>{lang === "es" ? "ES" : "EN"}</span>
      <span className="text-gray-400 text-xs">→</span>
      <span className="text-gray-400 text-xs">{lang === "es" ? "EN" : "ES"}</span>
    </button>
  )
);
LanguageToggle.displayName = "LanguageToggle";

const TRANSLATIONS = {
  es: { loading: "Cargando proyectos...", scrollDown: "DESPLÁZATE" },
  en: { loading: "Loading projects...",  scrollDown: "SCROLL DOWN"  },
} as const;

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang]           = useState<Lang>("en");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const toggleLang = useCallback(() => setLang((l) => (l === "es" ? "en" : "es")), []);
  const t = TRANSLATIONS[lang];

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-transparent rounded-full border-t-blue-500 border-r-blue-500 animate-spin" />
            <div
              className="absolute border-4 border-transparent rounded-full inset-1 border-t-purple-500 border-r-purple-500 animate-spin"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <motion.p
            className="text-xl font-medium text-gray-100"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          >
            {t.loading}
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="fixed top-20 right-4 z-40">
        <LanguageToggle lang={lang} onToggle={toggleLang} />
      </div>
      <div className="flex flex-col items-center gap-2 fixed bottom-0 w-full pb-4 z-30 pointer-events-none text-white bg-gradient-to-t from-black/30 to-transparent pt-8">
        <p className="text-xs sm:text-sm font-medium tracking-widest">{t.scrollDown}</p>
        <FaArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
      </div>
      <ContainerGlobal  />
    </div>
  );
};

export default Page;