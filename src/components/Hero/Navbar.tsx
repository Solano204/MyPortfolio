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
import { SpotlightCard } from "../Common";

// GSAP is dynamically imported where needed; do not use React.lazy for non-components

// Lazy load FuzzyText component
const FuzzyText = lazy(() =>
  import("../Common").then((module) => ({ default: module.FuzzyText }))
);

// Types
interface NavItem {
  readonly title: string;
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

// Constants - moved outside component to prevent recreation
const NAV_ITEMS: readonly NavItem[] = [
  { title: "Projectos", direction: "Projects" },
  { title: "Tecnologias y Estudio", direction: "Stack" },
  { title: "Contactame", direction: "Contact" },
] as const;

const SCROLL_THRESHOLD = 50;
const ANIMATION_DURATION = 0.2;

// Memoized Mobile Menu Toggle component
const MobileMenuToggle = memo<MobileMenuToggleProps>(({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden flex flex-col justify-center items-center w-6 h-6 bg-transparent"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span
        className={clsx(
          "block w-5 h-0.5 bg-gray-300 transition-all duration-300 transform origin-center",
          {
            "rotate-45 translate-y-1": isOpen,
            "rotate-0 translate-y-0": !isOpen,
          }
        )}
      />
      <span
        className={clsx(
          "block w-5 h-0.5 bg-gray-300 my-1 transition-all duration-300",
          {
            "opacity-0": isOpen,
            "opacity-100": !isOpen,
          }
        )}
      />
      <span
        className={clsx(
          "block w-5 h-0.5 bg-gray-300 transition-all duration-300 transform origin-center",
          {
            "-rotate-45 -translate-y-1": isOpen,
            "rotate-0 translate-y-0": !isOpen,
          }
        )}
      />
    </button>
  );
});

MobileMenuToggle.displayName = "MobileMenuToggle";

// Memoized AudioIndicator component
const AudioIndicator = memo<AudioIndicatorProps>(({ isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="ml-4 md:ml-10 flex items-center space-x-0.5 bg-transparent p-1"
      aria-label={isActive ? "Pause audio" : "Play audio"}
    >
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className={clsx("indicator-line bg-transparent", {
            active: isActive,
          })}
          style={{
            animationDelay: `${(i + 1) * 0.1}s`,
          }}
        />
      ))}
    </button>
  );
});

AudioIndicator.displayName = "AudioIndicator";

// Memoized NavLink component
const NavLink = memo<NavLinkProps>(({ item, index, isMobile = false, onClick }) => {
  const baseClasses = isMobile
    ? `
        block w-full py-3 px-4
        text-gray-300 bg-transparent hover:text-white hover:bg-white/5
        transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        group/nav
        focus:outline-none rounded-md
        border-b border-gray-700/30 last:border-b-0
      `
    : `
        relative mr-10 py-1 px-2
        text-gray-300 bg-transparent hover:text-white
        transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        group/nav
        focus:outline-none rounded-md
      `;

  return (
    <a
      key={index}
      href={`/${item.direction}`}
      className={baseClasses}
      aria-label={`Navigate to ${item.title}`}
      onClick={onClick}
    >
      <span className="relative z-10 bg-transparent">{item.title}</span>
      {!isMobile && (
        <>
          <span
            className="
              absolute left-0 bottom-0 h-0.5 w-0
              bg-indigo-500
              transition-all duration-300 ease-out
              group-hover/nav:w-full 
            "
          />
          <span className="absolute inset-0 transition-all duration-300 scale-95 rounded-md backdrop-blur-2xl blur-3xl -opacity-0 bg group-hover/nav:scale-100 group-hover/nav:bg-opacity-5 -z-10 bg-transparent" />
        </>
      )}
    </a>
  );
});

NavLink.displayName = "NavLink";

// Custom hook for mobile menu
const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close mobile menu on window resize if screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  };
};

// Custom hook for scroll behavior
const useScrollBehavior = () => {
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY === 0) {
        setIsNavVisible(true);
      } else if (Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
        setIsNavVisible(currentScrollY < lastScrollY);
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
  }, [currentScrollY]);

  return { isNavVisible, currentScrollY };
};

// Custom hook for audio management
const useAudioManager = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudioIndicator = useCallback(() => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!audioElementRef.current) return;

    if (isAudioPlaying) {
      audioElementRef.current.play().catch(console.warn);
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return {
    isAudioPlaying,
    isIndicatorActive,
    audioElementRef,
    toggleAudioIndicator,
  };
};

// Custom hook for GSAP animations
const useGSAPAnimation = (isNavVisible: boolean) => {
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    // Lazy load GSAP
    import("gsap").then(() => {
      setGsapLoaded(true);
    });
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

// Main NavBar component
const NavBar = memo(() => {
  const { isNavVisible, currentScrollY } = useScrollBehavior();
  const { isIndicatorActive, toggleAudioIndicator } = useAudioManager();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();
  const navContainerRef = useGSAPAnimation(isNavVisible);

  // Memoize container classes
  const containerClasses = useMemo(
    () =>
      clsx(
        "fixed inset-x-0 z-20 h-16 transition-all duration-700 border-none top-4 sm:inset-x-6",
        {
          "floating-nav": currentScrollY > 0,
        }
      ),
    [currentScrollY]
  );

  // Memoize mobile menu classes
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

  // Memoize nav items rendering
  const desktopNavItemsJSX = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => (
        <NavLink key={item.direction} item={item} index={index} />
      )),
    []
  );

  const mobileNavItemsJSX = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => (
        <NavLink
          key={item.direction}
          item={item}
          index={index}
          isMobile={true}
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
            <div className="flex items-center gap-7">
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
              {/* Desktop Navigation */}
              <div className="hidden md:block">{desktopNavItemsJSX}</div>

              {/* Mobile Menu Toggle */}
              <MobileMenuToggle
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />

              {/* Audio Indicator */}
              <AudioIndicator
                isActive={isIndicatorActive}
                onClick={toggleAudioIndicator}
              />
            </div>
          </SpotlightCard>
        </header>
      </div>

      {/* Mobile Menu */}
      <div className={mobileMenuClasses}>
        <SpotlightCard
          className="w-full overflow-hidden"
          spotlightColor={"rgba(138, 92, 255, 0.35)"}
        >
          <nav className="py-2">
            {mobileNavItemsJSX}
          </nav>
        </SpotlightCard>
      </div>

      {/* Mobile Menu Overlay */}
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