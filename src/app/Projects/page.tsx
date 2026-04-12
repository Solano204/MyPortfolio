"use client";

import React, { useState, useEffect, memo } from "react";
import ContainerGlobal from "@/components/Project/page";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

// ─── Page ─────────────────────────────────────────────────────────────────────

const Page = memo(() => {
  const { t } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 dark:bg-gray-900 light:bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-transparent rounded-full border-t-blue-500 border-r-blue-500 animate-spin" />
            <div
              className="absolute border-4 border-transparent rounded-full inset-1 border-t-purple-500 border-r-purple-500 animate-spin"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <motion.p
            className="text-xl font-medium text-gray-100 dark:text-gray-100 light:text-gray-800"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
          >
            {t("projects.loading")}
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Scroll hint — fixed bottom */}
      <div
        className="
          flex flex-col items-center gap-2
          fixed bottom-0 w-full pb-4 z-30
          pointer-events-none
          text-white dark:text-white light:text-gray-700
          bg-gradient-to-t from-black/30 dark:from-black/30 light:from-white/30 to-transparent
          pt-8
        "
      >
        <p className="text-xs sm:text-sm font-medium tracking-widest">
          {t("projects.scrollDown")}
        </p>
        <FaArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
      </div>

      <ContainerGlobal />
    </div>
  );
});

Page.displayName = "Page";
export default Page;