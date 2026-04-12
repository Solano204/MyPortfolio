"use client";
import React, { useRef, useEffect, useState, memo } from "react";
import { RollingGallery } from "@/components/Stack/index";
import { motion } from "framer-motion";
import {
  stacksBackend,
  stacksDevOps,
  stacksFrontend,
} from "@/components/Stack/Stack.Data";
import { BentoTilt } from "@/components/Common/Common.card3D";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { stack } from "@/components/Stack/Stack.Page";
import { TextGenerateEffect } from "@/components/Common/Common.Parrafe";
import { FuzzyText } from "@/components/Common/Common.Titile";

// ─── Section Card ─────────────────────────────────────────────────────────────

const TechSection = memo<{
  label: string;
  stacks: stack[];
  galleryKey: string;
}>(({ label, stacks, galleryKey }) => (
  <div className="
    w-full max-w-4xl mx-auto
    bg-gray-900/70 dark:bg-gray-900/70 light:bg-white/80
    backdrop-blur-sm p-5 sm:p-8 rounded-xl
    border border-gray-700 dark:border-gray-700 light:border-gray-200
  ">
    <h2 className="font-bold mb-16 sm:mb-20">
      <FuzzyText baseIntensity={0.1} fontSize={"clamp(0.7rem, 2.5vw, 1rem)"}>
        {label}
      </FuzzyText>
    </h2>
    <RollingGallery autoplay={true} key={galleryKey} stacks={stacks} />
  </div>
));
TechSection.displayName = "TechSection";

// ─── Main Page ────────────────────────────────────────────────────────────────

// ─── Main Page ────────────────────────────────────────────────────────────────

const Page = () => {
  const { t, lang } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
          <motion.p
            className="text-lg font-medium text-gray-100"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("stack.loading")}
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Education Card — key={lang} forces remount so TextGenerateEffect replays cleanly */}
      <div
        key={lang}
        className="
          max-w-4xl mx-auto
          bg-gray-900/70 dark:bg-gray-900/70 light:bg-white/80
          backdrop-blur-sm p-5 sm:p-8 rounded-xl
          border border-gray-700 dark:border-gray-700 light:border-gray-200
          flex flex-col sm:flex-row gap-5 items-start sm:items-center
        "
      >
        <div className="flex-1" ref={containerRef}>
          <TextGenerateEffect duration={2} filter={false} words={t("stack.studies")} />
          <TextGenerateEffect duration={2} filter={false} words={t("stack.degree")} />
          <TextGenerateEffect duration={2} filter={false} words={t("stack.school")} />
        </div>

        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <BentoTilt className="w-36 h-36 sm:w-48 sm:h-48 overflow-hidden border-2 rounded-xl border-cyan-500/20 bg-white/10 backdrop-blur-xs">
            <Image
              fill
              src="/Images/School/schoolTecn.png"
              alt="TecNM Comitán Logo"
              className="object-contain w-full h-full p-4"
            />
          </BentoTilt>
        </div>
      </div>

      {/* Technology Sections */}
      <div className="flex flex-col items-center gap-6 sm:gap-10 mt-8 sm:mt-10">
        <TechSection
          label={t("stack.backend")}
          stacks={stacksBackend}
          galleryKey={`backend-${lang}`}
        />
        <TechSection
          label={t("stack.frontend")}
          stacks={stacksFrontend}
          galleryKey={`frontend-${lang}`}
        />
        <TechSection
          label={t("stack.devops")}
          stacks={stacksDevOps}
          galleryKey={`devops-${lang}`}
        />
      </div>
    </div>
  );
};

export default Page;