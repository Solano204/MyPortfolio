"use client";

import React, { 
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
  useMemo, 
  memo,
  lazy,
  Suspense
} from "react";
import type { FC, RefObject, CSSProperties } from "react";
import { Technology } from "./page";

// ===== TYPE DEFINITIONS =====


interface TechnologyTimelineModalProps {
  technologies: Technology[];
  isOpen?: boolean;
  onClose?: () => void;
  animationDuration?: number;
  staggerDelay?: number;
}

interface TimelineItemProps {
  tech: Technology;
  index: number;
  isVisible: boolean;
  isLeft: boolean;
  animationDelay: number;
}

interface StarProps {
  style: CSSProperties;
  key: string;
}

// ===== LAZY LOADED COMPONENTS =====
const BentoTilt = lazy(() => 
  import("../Common").then(module => ({ default: module.BentoTilt }))
    .catch(() => ({ default: ({ children, className, style }: any) => 
      <div className={className} style={style}>{children}</div> 
    }))
);

const TextGenerateEffect = lazy(() => 
  import("../Common").then(module => ({ default: module.TextGenerateEffect }))
    .catch(() => ({ default: ({ words }: { words: string }) => 
      <h1 className="text-5xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text">
        {words}
      </h1> 
    }))
);

// ===== CONSTANTS =====
const ANIMATION_CONFIG = {
  MODAL_TRANSITION: 700,
  ITEM_STAGGER: 100,
  OBSERVER_THRESHOLD: 0.3,
  OBSERVER_ROOT_MARGIN: "0px 0px -50px 0px",
  OBSERVER_DELAY: 500,
} as const;

const COLORS = {
  STAR_COLORS: ["#00ffff", "#9333ea", "#ec4899"] as const,
  NEBULA_COLORS: {
    cyan: "from-cyan-500/20",
    purple: "from-purple-600/15", 
    pink: "from-pink-500/10"
  } as const,
} as const;

// ===== UTILITY FUNCTIONS =====
const generateRandomStars = (count: number): StarProps[] => 
  Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 3 + 1;
    const color = COLORS.STAR_COLORS[Math.floor(Math.random() * COLORS.STAR_COLORS.length)];
    
    return {
      key: `star-${i}`,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 3 + 5}px ${color}`,
      } as CSSProperties,
    };
  });

const getTimelineStyles = (tech: Technology, isVisible: boolean, isLeft: boolean): CSSProperties => ({
  backgroundColor: "rgba(2, 6, 23, 0.95)",
  borderColor: `${tech.color}80`,
  transform: isVisible
    ? "translateX(0) scale(1)"
    : `translateX(${isLeft ? "-150px" : "150px"}) scale(0.6)`,
  opacity: isVisible ? 1 : 0,
  boxShadow: isVisible
    ? `0 25px 50px ${tech.color}40, 0 0 80px ${tech.color}30, inset 0 0 40px rgba(0, 0, 0, 0.8), 0 0 120px ${tech.color}20`
    : "none",
  backdropFilter: "blur(15px)",
});

const getIconStyles = (tech: Technology, isVisible: boolean, delay: number): CSSProperties => ({
  background: `conic-gradient(from 0deg, ${tech.color}, ${tech.color}dd, ${tech.color}aa, ${tech.color})`,
  transform: isVisible
    ? "translateX(-50%) scale(1) rotate(0deg)"
    : "translateX(-50%) scale(0) rotate(-720deg)",
  transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDelay: `${delay}ms`,
  boxShadow: isVisible
    ? `0 0 60px ${tech.color}90, 0 0 120px ${tech.color}50, inset 0 0 30px rgba(255, 255, 255, 0.2)`
    : "none",
  borderColor: "#020617",
});

// ===== MEMOIZED COMPONENTS =====
const StarField = memo(({ stars }: { stars: StarProps[] }) => (
  <div className="absolute inset-0">
    {stars.map(({ key, style }) => (
      <div
        key={key}
        className="absolute animate-pulse"
        style={style}
      >
        <div className="rounded-full opacity-70" />
      </div>
    ))}
  </div>
));

const NebulaEffects = memo(() => (
  <>
    <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent animate-pulse" />
    <div 
      className="absolute inset-0 bg-gradient-radial from-purple-600/15 via-transparent to-transparent animate-pulse"
      style={{ animationDelay: "2s" }}
    />
    <div 
      className="absolute inset-0 bg-gradient-radial from-pink-500/10 via-transparent to-transparent animate-pulse"
      style={{ animationDelay: "4s" }}
    />
  </>
));

const CosmicGrid = memo(() => (
  <div
    className="absolute inset-0 opacity-5"
    style={{
      backgroundImage: `
        radial-gradient(circle at 25% 25%, cyan 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, purple 1px, transparent 1px)
      `,
      backgroundSize: "100px 100px, 50px 50px",
    }}
  />
));

const TimelineItem = memo<TimelineItemProps>(({ 
  tech, 
  index, 
  isVisible, 
  isLeft, 
  animationDelay 
}) => (
  <div
    className={`relative flex items-center mb-20 timeline-element ${
      isLeft ? "justify-start" : "justify-end"
    }`}
    data-index={index}
  >
    <Suspense fallback={
      <div className={`w-5/12 h-32 bg-gray-800 rounded-3xl animate-pulse ${
        isLeft ? "mr-auto" : "ml-auto"
      }`} />
    }>
      <BentoTilt
        className={`relative w-5/12 p-8 rounded-3xl shadow-2xl border-2 transition-all duration-1000 ease-out ${
          isLeft ? "mr-auto" : "ml-auto"
        }`}
        style={{
          ...getTimelineStyles(tech, isVisible, isLeft),
          transitionDelay: `${animationDelay}ms`,
        }}
      >
        {/* Holographic Border Effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-30"
          style={{
            background: `conic-gradient(from 0deg, ${tech.color}60, transparent, ${tech.color}60, transparent, ${tech.color}60)`,
            animation: isVisible ? "spin 8s linear infinite" : "none",
          }}
        />

        {/* Energy Pulse Ring */}
        <div
          className="absolute inset-0 rounded-3xl opacity-20"
          style={{
            background: `linear-gradient(45deg, transparent, ${tech.color}40, transparent)`,
            animation: isVisible ? "pulse 3s ease-in-out infinite" : "none",
          }}
        />

        {/* Arrow */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 ${
            isLeft ? "-right-6" : "-left-6"
          }`}
          style={{
            borderTop: "20px solid transparent",
            borderBottom: "20px solid transparent",
            ...(isLeft
              ? { borderLeft: "20px solid rgba(2, 6, 23, 0.95)" }
              : { borderRight: "20px solid rgba(2, 6, 23, 0.95)" }),
            filter: `drop-shadow(0 0 15px ${tech.color}60)`,
          }}
        />

        {/* Content */}
        <div className={`text-${isLeft ? "left" : "right"} relative z-10`}>
          <div className="flex items-center gap-4 mb-6">
            <h3
              className="lg:text-4xl text-[18px] md:text-2xl font-black"
              style={{
                color: tech.color,
                textShadow: `0 0 30px ${tech.color}80, 0 0 60px ${tech.color}40, 0 0 90px ${tech.color}20`,
              }}
            >
              {tech.name}
            </h3>
          </div>
          <p
            className="md:text-lg text-sm font-medium leading-relaxed text-gray-100"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDelay: `${animationDelay + 300}ms`,
            }}
          >
            {tech.description}
          </p>
        </div>
      </BentoTilt>
    </Suspense>

    {/* Cosmic Icon Circle */}
    <div
      className="absolute z-20 flex items-center justify-center w-12 h-12 md:w-24 md:h-24 transform -translate-x-1/2 border-4 rounded-full shadow-2xl border-gray-950 left-1/2"
      style={getIconStyles(tech, isVisible, animationDelay + 200)}
    >
      <div className="text-2xl drop-shadow-xl text-white">
        {tech.icon}
      </div>

      {/* Orbital Rings */}
      {[
        { inset: "inset-0", border: "border-white/30", duration: "6s", direction: "normal" },
        { inset: "inset-2", border: "border-cyan-300/20", duration: "4s", direction: "reverse" },
        { inset: "inset-4", border: "border-purple-300/15", duration: "8s", direction: "normal" },
      ].map((ring, i) => (
        <div
          key={i}
          className={`absolute ${ring.inset} border-2 rounded-full ${ring.border} animate-spin`}
          style={{
            animationDuration: ring.duration,
            animationDirection: ring.direction as any,
          }}
        />
      ))}
    </div>
  </div>
));

const CosmicFooter = memo(() => (
  <div className="pb-12 mt-20 text-center">
    <div className="flex justify-center space-x-6">
      {[
        { color: "bg-cyan-400", shadow: "0 0 20px rgba(0, 255, 255, 0.8)", delay: "0s" },
        { color: "bg-purple-400", shadow: "0 0 20px rgba(147, 51, 234, 0.8)", delay: "0.7s" },
        { color: "bg-pink-400", shadow: "0 0 20px rgba(236, 72, 153, 0.8)", delay: "1.4s" },
      ].map((dot, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full ${dot.color} animate-pulse`}
          style={{
            animationDelay: dot.delay,
            boxShadow: dot.shadow,
          }}
        />
      ))}
    </div>
  </div>
));

// ===== CUSTOM HOOKS =====
const useIntersectionObserver = (
  isModalOpen: boolean,
  modalMounted: boolean,
  setVisibleElements: React.Dispatch<React.SetStateAction<Set<number>>>
) => {
  useEffect(() => {
    if (!isModalOpen || !modalMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt((entry.target as HTMLElement).dataset.index!);
            setVisibleElements((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: ANIMATION_CONFIG.OBSERVER_THRESHOLD,
        rootMargin: ANIMATION_CONFIG.OBSERVER_ROOT_MARGIN,
      }
    );

    const timer = setTimeout(() => {
      const timelineElements = document.querySelectorAll(".timeline-element");
      timelineElements.forEach((el) => observer.observe(el));
    }, ANIMATION_CONFIG.OBSERVER_DELAY);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isModalOpen, modalMounted, setVisibleElements]);
};

const useBodyScrollLock = (isModalOpen: boolean) => {
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);
};

// ===== MAIN COMPONENT =====
const TechnologyTimelineModal: FC<TechnologyTimelineModalProps> = memo(({
  technologies,
  isOpen = true,
  onClose,
  animationDuration = ANIMATION_CONFIG.MODAL_TRANSITION,
  staggerDelay = ANIMATION_CONFIG.ITEM_STAGGER,
}) => {
  // ===== STATE =====
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
  const [modalMounted, setModalMounted] = useState(isOpen);
  const timelineRef = useRef<HTMLDivElement>(null);

  // ===== MEMOIZED VALUES =====
  const stars = useMemo(() => generateRandomStars(100), []);
  
  const timelineItems = useMemo(() => 
    technologies.map((tech, index) => ({
      ...tech,
      index,
      isLeft: index % 2 === 0,
      animationDelay: index * staggerDelay,
    })),
    [technologies, staggerDelay]
  );

  // ===== CALLBACKS =====
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    onClose?.();
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  // ===== CUSTOM HOOKS =====
  useIntersectionObserver(isModalOpen, modalMounted, setVisibleElements);
  useBodyScrollLock(isModalOpen);

  // ===== EFFECTS =====
  useEffect(() => {
    setIsModalOpen(isOpen);
    if (isOpen) {
      setModalMounted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      const timer = setTimeout(() => {
        setVisibleElements(new Set());
        setModalMounted(false);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, animationDuration]);

  // ===== RENDER =====
  if (!isModalOpen && !modalMounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
        <StarField stars={stars} />
        <NebulaEffects />
        <CosmicGrid />
      </div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
          onClick={handleBackdropClick}
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Modal Content */}
        <div
          className="relative w-full h-full overflow-hidden transition-all ease-out border-2  bg-gradient-to-br from-gray-950 via-slate-900/80 to-gray-950 border-cyan-400/40"
          style={{
            transform: modalMounted ? "translateY(0) scale(1)" : "translateY(80px) scale(0.9)",
            opacity: modalMounted ? 1 : 0,
            transitionDuration: `${animationDuration}ms`,
            boxShadow: "0 0 150px rgba(0, 255, 255, 0.2), 0 0 300px rgba(147, 51, 234, 0.1), inset 0 0 100px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 px-8 py-6 border-b-2 border-cyan-400/30 bg-gray-950/90 backdrop-blur-xl">
          
            
            <Suspense fallback={
              <h1 className="text-5xl font-black text-cyan-300">
                🌌 Tecnologias usadas 🚀
              </h1>
            }>
              <TextGenerateEffect
                duration={2}
                filter={false}
                words="🌌 Tecnologias usadas 🚀"
              />
            </Suspense>
          </div>

          {/* Timeline Content */}
          <div
            className="h-full px-8 py-10 overflow-y-auto custom-scrollbar"
            ref={timelineRef}
          >
            <div className="relative max-w-5xl mx-auto">
              {/* Timeline Line */}
              <div
                className="absolute w-3 h-full transform -translate-x-1/2 rounded-full left-1/2"
                style={{
                  background: `linear-gradient(to bottom, 
                    rgba(0, 255, 255, 1) 0%, 
                    rgba(147, 51, 234, 1) 25%, 
                    rgba(236, 72, 153, 1) 50%, 
                    rgba(59, 130, 246, 1) 75%,
                    rgba(34, 197, 94, 1) 100%)`,
                  boxShadow: "0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(147, 51, 234, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2)",
                }}
              />

              {/* Timeline Items */}
              {timelineItems.map((item) => (
                <TimelineItem
                  key={item.index}
                  tech={item}
                  index={item.index}
                  isVisible={visibleElements.has(item.index)}
                  isLeft={item.isLeft}
                  animationDelay={item.animationDelay}
                />
              ))}
            </div>

            <CosmicFooter />
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(2, 6, 23, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00ffff, #9333ea);
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #00ffff, #ec4899);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
});

TechnologyTimelineModal.displayName = "TechnologyTimelineModal";

export default TechnologyTimelineModal;