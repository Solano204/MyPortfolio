"use client";

import React, {
  memo,
  useMemo,
  useCallback,
  lazy,
  Suspense,
  useState,
  useEffect,
} from "react";
import { Download, Check } from "lucide-react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { useApp } from "@/context/AppContext";

// ────────────────────────────────────────────────────────────────────────────
// ERROR BOUNDARY FOR THREE.JS ISSUES
// ────────────────────────────────────────────────────────────────────────────

interface ProfileCardErrorBoundaryProps {
  children: React.ReactNode;
}

interface ProfileCardErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ProfileCardErrorBoundary extends React.Component<
  ProfileCardErrorBoundaryProps,
  ProfileCardErrorBoundaryState
> {
  constructor(props: ProfileCardErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ProfileCardErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ProfileCard Three.js Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-60 sm:w-72 md:w-80 p-6 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
          <p className="text-sm text-amber-400 font-medium">
            ⚠️ Profile card loading...
          </p>
          <p className="text-xs text-amber-300/70 mt-2">
            Check your browser console for details
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// LAZY LOAD WITH DELAY FOR THREE.JS INITIALIZATION
// ────────────────────────────────────────────────────────────────────────────

const ProfileCard = lazy(() =>
  new Promise<{ default: React.ComponentType<any> }>((resolve) => {
    setTimeout(() => {
      resolve(
        import("@/components/Hero").then((module) => ({
          default: module.ProfileCard,
        }))
      );
    }, 800);
  })
);

// ────────────────────────────────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────────────────────────────────

interface SocialLink {
  readonly id: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly url: string;
  readonly label: string;
  readonly copyValue?: string;
  readonly copyLabelKey?: string;
}

interface Skill {
  readonly id: string;
  readonly translationKey: string;
}

// ────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ────────────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: "linkedin",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/carlos-josue-lopez-solano98/",
    label: "LinkedIn",
  },
  {
    id: "github",
    icon: FaGithub,
    url: "https://github.com/Solano204",
    label: "GitHub",
  },
  {
    id: "email",
    icon: FaEnvelope,
    url: "mailto:carlosjosuelopezsolano98@gmail.com",
    label: "Email",
    copyValue: "carlosjosuelopezsolano98@gmail.com",
    copyLabelKey: "Email",
  },
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    url: "https://wa.me/529631585303",
    label: "WhatsApp",
    copyValue: "+52 963 158 5303",
    copyLabelKey: "WhatsApp",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/aapiofhope/",
    label: "Instagram",
    copyValue: "aapiofhope",
    copyLabelKey: "Instagram",
  },
] as const;

const SKILLS: readonly Skill[] = [
  { id: "respect", translationKey: "profile.skills.respect" },
  { id: "patience", translationKey: "profile.skills.patience" },
  { id: "discipline", translationKey: "profile.skills.discipline" },
  { id: "communication", translationKey: "profile.skills.communication" },
] as const;

const CV_URLS = {
  es: "/CV_ESPAÑOL.pdf",
  en: "/CV_ENGLISH.pdf",
} as const;

// ────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ────────────────────────────────────────────────────────────────────────────

const CopyAlert = memo<{ message: string; isVisible: boolean }>(
  ({ message, isVisible }) => (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-2xl transform transition-all duration-500 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <Check className="w-4 h-4" />
      <span className="text-sm font-medium">{message} copied!</span>
    </div>
  )
);
CopyAlert.displayName = "CopyAlert";

const LoadingScreen = memo(() => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div className="space-y-8 text-center">
      <div className="relative">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse">
          <div className="absolute flex items-center justify-center bg-gray-800 rounded-full inset-2">
            <span className="text-2xl font-bold text-white">J</span>
          </div>
        </div>
        <div className="absolute rounded-full -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-ping" />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Loading Portfolio</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>
      <div className="w-64 h-1 overflow-hidden bg-gray-700 rounded-full mx-auto">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
      </div>
    </div>
  </div>
));
LoadingScreen.displayName = "LoadingScreen";

const CVDownloadButtons = memo(() => {
  const { t } = useApp();

  const handleDownload = useCallback((url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  const buttonBaseStyles =
    "relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all duration-300 transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/70 overflow-hidden group";

  const darkBtnStyles =
    "bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 light:from-gray-100 light:to-gray-200 border-gray-700 dark:border-gray-600 light:border-gray-300 text-gray-200 dark:text-gray-200 light:text-gray-700 hover:text-white dark:hover:text-white light:hover:text-gray-900 shadow-lg";

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleDownload(CV_URLS.es, "CV_Josue_ES.pdf")}
        className={`${buttonBaseStyles} ${darkBtnStyles} hover:border-blue-500 hover:shadow-blue-500/20`}
        aria-label="Download CV in Spanish"
      >
        <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover:opacity-100" />
        <Download className="z-10 w-4 h-4 text-blue-400 group-hover:text-blue-300 group-hover:animate-pulse flex-shrink-0" />
        <span className="z-10 whitespace-nowrap">
          {t("hero.downloadCv")} <span className="text-xs text-gray-400">(ES)</span>
        </span>
      </button>

      <button
        onClick={() => handleDownload(CV_URLS.en, "CV_Josue_EN.pdf")}
        className={`${buttonBaseStyles} ${darkBtnStyles} hover:border-purple-500 hover:shadow-purple-500/20`}
        aria-label="Download CV in English"
      >
        <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 group-hover:opacity-100" />
        <Download className="z-10 w-4 h-4 text-purple-400 group-hover:text-purple-300 group-hover:animate-pulse flex-shrink-0" />
        <span className="z-10 whitespace-nowrap">
          {t("hero.downloadCv")} <span className="text-xs text-gray-400">(EN)</span>
        </span>
      </button>
    </div>
  );
});
CVDownloadButtons.displayName = "CVDownloadButtons";

const SocialLinkItem = memo<{
  link: SocialLink;
  onCopy: (value: string, label: string) => void;
}>(({ link, onCopy }) => {
  const { t } = useApp();

  const handleClick = useCallback(() => {
    if (link.copyValue && link.copyLabelKey) {
      navigator.clipboard
        .writeText(link.copyValue)
        .then(() => onCopy(link.copyValue!, link.copyLabelKey!))
        .catch(() =>
          window.open(link.url, "_blank", "noopener,noreferrer")
        );
    } else {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  }, [link, onCopy]);

  const Icon = link.icon;

  return (
    <div
      className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl cursor-pointer bg-gray-800/60 dark:bg-gray-700/60 light:bg-gray-100/80 border border-gray-700 dark:border-gray-600 light:border-gray-300 hover:border-blue-500/60 dark:hover:border-blue-400/60 light:hover:border-blue-500/60 hover:scale-110 transition-all duration-200 group"
      onClick={handleClick}
      aria-label={link.label}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 dark:text-gray-300 light:text-gray-600 group-hover:text-white dark:group-hover:text-white light:group-hover:text-gray-900 transition-colors" />
      {link.copyValue && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 dark:bg-gray-800 light:bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
          {t("common.clickToCopy")}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
});
SocialLinkItem.displayName = "SocialLinkItem";

const SkillsSection = memo(() => {
  const { t } = useApp();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14 animate-toggleAnimationTable">
      {SKILLS.map((skill) => (
        <div
          key={skill.id}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-gray-700/50 dark:border-gray-600/50 light:border-gray-300/70 bg-gray-900/40 dark:bg-gray-800/40 light:bg-gray-100/60 backdrop-blur-sm"
        >
          <span className="text-xs sm:text-sm font-medium tracking-wider text-center text-gray-300 dark:text-gray-200 light:text-gray-700">
            {t(skill.translationKey)}
          </span>
        </div>
      ))}
    </div>
  );
});
SkillsSection.displayName = "SkillsSection";

// ────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ────────────────────────────────────────────────────────────────────────────

const PortfolioInterface = memo(() => {
  const { t } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [copyAlert, setCopyAlert] = useState({ message: "", isVisible: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = useCallback((value: string, label: string) => {
    setCopyAlert({ message: label, isVisible: true });
    setTimeout(
      () => setCopyAlert((prev) => ({ ...prev, isVisible: false })),
      3000
    );
  }, []);

  const socialLinksJSX = useMemo(
    () =>
      SOCIAL_LINKS.map((link) => (
        <SocialLinkItem key={link.id} link={link} onCopy={handleCopy} />
      )),
    [handleCopy]
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <CopyAlert message={copyAlert.message} isVisible={copyAlert.isVisible} />

      <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12 lg:px-16 lg:py-16 opacity-0 animate-fadeIn bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 mt-4 sm:mt-6">
            {/* Left Column */}
            <div className="order-2 lg:order-1 space-y-5 sm:space-y-6 flex flex-col justify-center">
              <div className="text-center lg:text-left">
                <h1 className="font-mono text-base sm:text-lg md:text-xl font-bold tracking-wider text-zinc-400 dark:text-zinc-400 light:text-zinc-500">
                  {t("hero.subtitle")}
                </h1>
                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold leading-tight tracking-wider text-white dark:text-white light:text-gray-900">
                  {t("hero.title")}
                </h2>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-center lg:text-left text-gray-300 dark:text-gray-300 light:text-gray-600 max-w-lg mx-auto lg:mx-0">
                {t("hero.description")}
              </p>

              <div className="flex flex-col items-center lg:items-start gap-5 sm:gap-6 mt-2">
                <CVDownloadButtons />

                <div className="w-full">
                  <h3 className="mb-3 text-xs sm:text-sm font-medium text-center lg:text-left text-gray-400 dark:text-gray-400 light:text-gray-500">
                    {t("hero.followMe")}
                  </h3>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                    {socialLinksJSX}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Card with Error Boundary */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-start">
              <ProfileCardErrorBoundary>
                <Suspense
                  fallback={
                    <div className="w-60 h-72 sm:w-72 sm:h-80 rounded-xl bg-gray-700 dark:bg-gray-700 light:bg-gray-200 animate-pulse" />
                  }
                >
                  <div className="w-60 sm:w-72 md:w-80 lg:w-full max-w-xs">
                    <ProfileCard
                      name="JOSUÉ"
                      title={t("hero.softwareEngineer")}
                      handle="josue_dev"
                      status={t("hero.online")}
                      contactText={t("hero.contact")}
                      avatarUrl="/Images/Profile/profile.png"
                      showUserInfo={true}
                      enableTilt={true}
                    />
                  </div>
                </Suspense>
              </ProfileCardErrorBoundary>
            </div>
          </div>

          <SkillsSection />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
});

PortfolioInterface.displayName = "PortfolioInterface";
export default PortfolioInterface;