"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { useWindowScroll } from "react-use";
import clsx from "clsx";
import { SpotlightCard } from "@/components/Common/Common.cardCursor";
import { Moon, Sun } from "lucide-react";
import { useApp } from "@/context/AppContext";

const FuzzyText = lazy(() =>
  import("@/components/Common/Common.Titile").then((module) => ({ default: module.FuzzyText }))
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  readonly titleKey: string;
  readonly direction: string;
}

interface AudioIndicatorProps {
  isActive: boolean;
  onClick: () => void;
}

interface NavLinkProps {
  item: NavItem;
  index: number;
  isMobile?: boolean;
  onClick?: () => void;
}

interface MobileMenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: readonly NavItem[] = [
  { titleKey: "nav.projects", direction: "Projects" },
  { titleKey: "nav.stack", direction: "Stack" },
  { titleKey: "nav.contact", direction: "Contact" },
] as const;

const SCROLL_THRESHOLD = 50;
const ANIMATION_DURATION = 0.2;

// ─── Sub-components ───────────────────────────────────────────────────────────

const MobileMenuToggle = memo<MobileMenuToggleProps>(({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden flex flex-col justify-center items-center w-6 h-6 bg-transparent"
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
  >
    <span
      className={clsx(
        "block w-5 h-0.5 transition-all duration-300 transform origin-center",
        "bg-gray-300 dark:bg-gray-300 light:bg-gray-600",
        { "rotate-45 translate-y-1": isOpen }
      )}
    />
    <span
      className={clsx(
        "block w-5 h-0.5 my-1 transition-all duration-300",
        "bg-gray-300 dark:bg-gray-300 light:bg-gray-600",
        { "opacity-0": isOpen }
      )}
    />
    <span
      className={clsx(
        "block w-5 h-0.5 transition-all duration-300 transform origin-center",
        "bg-gray-300 dark:bg-gray-300 light:bg-gray-600",
        { "-rotate-45 -translate-y-1": isOpen }
      )}
    />
  </button>
));
MobileMenuToggle.displayName = "MobileMenuToggle";

const AudioIndicator = memo<AudioIndicatorProps>(({ isActive, onClick }) => (
  <button
    onClick={onClick}
    className="ml-2 flex items-center space-x-0.5 bg-transparent p-1"
    aria-label={isActive ? "Pause audio" : "Play audio"}
  >
    {Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={clsx("indicator-line bg-transparent", { active: isActive })}
        style={{ animationDelay: `${(i + 1) * 0.1}s` }}
      />
    ))}
  </button>
));
AudioIndicator.displayName = "AudioIndicator";

const NavLink = memo<NavLinkProps>(({ item, index, isMobile = false, onClick }) => {
  const { t } = useApp();

  const baseClasses = isMobile
    ? "block w-full py-3 px-4 bg-transparent transition-all duration-300 group/nav focus:outline-none rounded-md border-b border-gray-700/30 dark:border-gray-700/30 light:border-gray-200/60 last:border-b-0 text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5"
    : "relative mr-6 py-1 px-2 bg-transparent transition-all duration-300 group/nav focus:outline-none rounded-md text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900";

  return (
    <a
      key={index}
      href={`/${item.direction}`}
      className={baseClasses}
      aria-label={`Navigate to ${t(item.titleKey)}`}
      onClick={onClick}
    >
      <span className="relative z-10 bg-transparent text-sm">{t(item.titleKey)}</span>
      {!isMobile && (
        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-indigo-500 transition-all duration-300 ease-out group-hover/nav:w-full" />
      )}
    </a>
  );
});
NavLink.displayName = "NavLink";

// ─── Language Toggle (global) ─────────────────────────────────────────────────

const LanguageToggle = memo(() => {
  const { lang, setLang } = useApp();
  return (
    <div className="flex items-center gap-1 mr-2">
      <button
        onClick={() => setLang("es")}
        className={clsx(
          "text-xs px-2 py-1 rounded-md transition-all duration-200 border",
          lang === "es"
            ? "bg-indigo-600 border-indigo-500 text-white"
            : "bg-transparent border-gray-600 dark:border-gray-600 light:border-gray-300 text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-white dark:hover:text-white light:hover:text-gray-900"
        )}
        aria-label="Español"
      >
        ES
      </button>
      <button
        onClick={() => setLang("en")}
        className={clsx(
          "text-xs px-2 py-1 rounded-md transition-all duration-200 border",
          lang === "en"
            ? "bg-indigo-600 border-indigo-500 text-white"
            : "bg-transparent border-gray-600 dark:border-gray-600 light:border-gray-300 text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-white dark:hover:text-white light:hover:text-gray-900"
        )}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
});
LanguageToggle.displayName = "LanguageToggle";

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useApp();
  return (
    <button
      onClick={toggleTheme}
      className="ml-1 mr-2 p-1.5 rounded-md border transition-all duration-200 bg-transparent border-gray-600 dark:border-gray-600 light:border-gray-300 text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:border-gray-400 dark:hover:border-gray-400 light:hover:border-gray-600"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-3.5 h-3.5" />
      ) : (
        <Moon className="w-3.5 h-3.5" />
      )}
    </button>
  );
});
ThemeToggle.displayName = "ThemeToggle";

// ─── Custom Hooks ─────────────────────────────────────────────────────────────

const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((p) => !p),
    []
  );
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu };
};

const useScrollBehavior = () => {
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const lastScrollY = lastScrollYRef.current;
    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
      setIsNavVisible(currentScrollY < lastScrollY);
    }
    lastScrollYRef.current = currentScrollY;
  }, [currentScrollY]);

  return { isNavVisible, currentScrollY };
};

const useAudioManager = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudioIndicator = useCallback(() => {
    setIsAudioPlaying((p) => !p);
    setIsIndicatorActive((p) => !p);
  }, []);

  useEffect(() => {
    if (!audioElementRef.current) return;
    if (isAudioPlaying) {
      audioElementRef.current.play().catch(console.warn);
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return { isIndicatorActive, audioElementRef, toggleAudioIndicator };
};

const useGSAPAnimation = (isNavVisible: boolean) => {
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    import("gsap").then(() => setGsapLoaded(true));
  }, []);

  useEffect(() => {
    if (!gsapLoaded || !navContainerRef.current) return;
    import("gsap").then(({ gsap }) => {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: ANIMATION_DURATION,
      });
    });
  }, [isNavVisible, gsapLoaded]);

  return navContainerRef;
};

// ─── Main NavBar ──────────────────────────────────────────────────────────────

const NavBar = memo(() => {
  const { isNavVisible, currentScrollY } = useScrollBehavior();
  const { isIndicatorActive, toggleAudioIndicator } = useAudioManager();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useMobileMenu();
  const navContainerRef = useGSAPAnimation(isNavVisible);

  const containerClasses = useMemo(
    () =>
      clsx(
        "fixed inset-x-0 z-20 h-16 transition-all duration-700 border-none top-4 sm:inset-x-6",
        { "floating-nav": currentScrollY > 0 }
      ),
    [currentScrollY]
  );

  const mobileMenuClasses = useMemo(
    () =>
      clsx(
        "fixed inset-x-0 top-20 z-30 mx-4 sm:mx-6 transition-all duration-300 ease-in-out md:hidden",
        {
          "opacity-100 translate-y-0 pointer-events-auto": isMobileMenuOpen,
          "opacity-0 -translate-y-4 pointer-events-none": !isMobileMenuOpen,
        }
      ),
    [isMobileMenuOpen]
  );

  const desktopNavItems = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => (
        <NavLink key={item.direction} item={item} index={index} />
      )),
    []
  );

  const mobileNavItems = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => (
        <NavLink
          key={item.direction}
          item={item}
          index={index}
          isMobile
          onClick={closeMobileMenu}
        />
      )),
    [closeMobileMenu]
  );

  return (
    <>
      <div ref={navContainerRef} className={containerClasses}>
        <header className="absolute w-full -translate-y-1/2 top-1/2 rounded-4xl Z-100">
          <SpotlightCard
            className="flex items-center justify-between p-4 h-[20px] w-full"
            spotlightColor={"rgba(138, 92, 255, 0.35)"}
          >
            <div className="flex items-center gap-4">
              <a
                href="/Home"
                className="flex items-center p-1 font-bold rounded-md bg-transparent"
                aria-label="Home"
              >
                <Suspense fallback={<span>CJ</span>}>
                  <FuzzyText baseIntensity={0.1}>CJ</FuzzyText>
                </Suspense>
              </a>
            </div>

            <div className="flex items-center h-full">
              {/* Desktop nav links */}
              <div className="hidden md:flex items-center">{desktopNavItems}</div>

              {/* Global controls — visible on all breakpoints */}
              <LanguageToggle />
              {/* <ThemeToggle /> */}
              <MobileMenuToggle
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />
              <AudioIndicator
                isActive={isIndicatorActive}
                onClick={toggleAudioIndicator}
              />
            </div>
          </SpotlightCard>
        </header>
      </div>

      {/* Mobile dropdown */}
      <div className={mobileMenuClasses}>
        <SpotlightCard
          className="w-full overflow-hidden"
          spotlightColor={"rgba(138, 92, 255, 0.35)"}
        >
          <nav className="py-2">{mobileNavItems}</nav>
        </SpotlightCard>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
});

NavBar.displayName = "NavBar";
export default NavBar;