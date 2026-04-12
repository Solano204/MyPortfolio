"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import { X, ZoomIn, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Lang } from "./page";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortfolioImage {
  src: string;
  alt: string;
  title: string;
  descriptionEs: string;
  descriptionEn: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

interface PortfolioImageTemplateProps {
  portfolioImages: PortfolioImage[];
  lang?: Lang;
  columns?: { sm?: number; md?: number; lg?: number };
}

// ─── Custom hooks ─────────────────────────────────────────────────────────────

const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observer.current = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: "50px 0px 50px 0px",
      ...options,
    });
    return () => observer.current?.disconnect();
  }, [callback, options]);
  const observe = useCallback((element: Element) => { observer.current?.observe(element); }, []);
  return { observe };
};

const useKeyboardNavigation = (
  isModalOpen: boolean,
  isGalleryOpen: boolean,
  onNext?: () => void,
  onPrev?: () => void,
  onCloseDetail?: () => void,
  onCloseGallery?: () => void
) => {
  useEffect(() => {
    if (!isModalOpen && !isGalleryOpen) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") { isGalleryOpen ? onCloseGallery?.() : onCloseDetail?.(); }
      else if (isGalleryOpen) {
        if (e.key === "ArrowRight") { e.preventDefault(); onNext?.(); }
        if (e.key === "ArrowLeft")  { e.preventDefault(); onPrev?.(); }
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isModalOpen, isGalleryOpen, onNext, onPrev, onCloseDetail, onCloseGallery]);
};

const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const orig = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => { Object.assign(body.style, orig); window.scrollTo(0, scrollY); };
  }, [isLocked]);
};

// ─── StarryBackground ─────────────────────────────────────────────────────────

const StarryBackground = memo(() => {
  const stars = useMemo(() =>
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: 1 + Math.random(),
      color: (["#00ffff", "#9333ea", "#ec4899"] as const)[Math.floor(Math.random() * 3)],
      delay: Math.random(),
      glowSize: Math.random() * 10 + 5,
    })), []
  );
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div key={star.id} className="absolute animate-pulse"
          style={{ left: `${star.left}%`, top: `${star.top}%`, animationDuration: `${star.duration}s`, animationDelay: `${star.delay}s` }}>
          <div className="rounded-full opacity-70"
            style={{ width: `${star.size}px`, height: `${star.size}px`, backgroundColor: star.color, boxShadow: `0 0 ${star.glowSize}px ${star.color}` }} />
        </div>
      ))}
    </div>
  );
});
StarryBackground.displayName = "StarryBackground";

// ─── ImageCard ────────────────────────────────────────────────────────────────

const ImageCard = memo<{
  image: PortfolioImage;
  index: number;
  isVisible: boolean;
  lang: Lang;
  onDetailClick: (image: PortfolioImage) => void;
  onGalleryClick: (index: number) => void;
}>(({ image, index, isVisible, lang, onDetailClick, onGalleryClick }) => {
  const handleDetailClick  = useCallback((e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); onDetailClick(image); }, [image, onDetailClick]);
  const handleGalleryClick = useCallback((e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); onGalleryClick(index); }, [index, onGalleryClick]);

  const cardStyles = useMemo(() => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
    background: "linear-gradient(135deg, rgba(2,6,23,0.9), rgba(15,23,42,0.8))",
    border: "1px solid rgba(0,255,255,0.2)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 60px rgba(0,255,255,0.1)",
  }), [isVisible]);

  // ✅ Pick description by active language
  const description = lang === "es" ? image.descriptionEs : image.descriptionEn;

  return (
    <div data-index={index}
      className="relative overflow-hidden transition-all duration-500 transform cursor-pointer portfolio-image group rounded-2xl hover:scale-105"
      style={cardStyles}
    >
      <div className="relative w-full h-64 overflow-hidden">
        <Image src={image.src} alt={image.alt} fill priority={image.priority || index < 6} quality={85}
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading={index < 6 ? "eager" : "lazy"} />

        <div className="absolute inset-0 z-20 w-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(147,51,234,0.2), rgba(236,72,153,0.1))" }}>
          <div className="absolute inset-0 flex items-center justify-center w-full">
            <div className="flex gap-3 transition-transform duration-300 delay-100 transform scale-0 group-hover:scale-100">
              <button type="button" onClick={handleDetailClick}
                className="z-30 p-3 transition-all duration-200 border rounded-full backdrop-blur-sm hover:scale-110"
                style={{ background: "rgba(0,255,255,0.1)", borderColor: "rgba(0,255,255,0.3)", boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}
                aria-label={`View details for ${image.title}`}>
                <ZoomIn className="w-5 h-5 text-cyan-300" />
              </button>
              <button type="button" onClick={handleGalleryClick}
                className="z-30 p-3 transition-all duration-200 border rounded-full backdrop-blur-sm hover:scale-110"
                style={{ background: "rgba(147,51,234,0.1)", borderColor: "rgba(147,51,234,0.3)", boxShadow: "0 0 20px rgba(147,51,234,0.3)" }}
                aria-label={`View in gallery: ${image.title}`}>
                <Eye className="w-5 h-5 text-purple-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold transition-colors duration-200 text-cyan-100 group-hover:text-cyan-300"
          style={{ textShadow: "0 0 10px rgba(0,255,255,0.3)" }}>
          {image.title}
        </h3>
        {/* ✅ Description rendered in the active language */}
        {description && (
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{description}</p>
        )}
      </div>

      <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none rounded-2xl opacity-20 group-hover:opacity-40"
        style={{ background: "conic-gradient(from 0deg, rgba(0,255,255,0.5), transparent, rgba(147,51,234,0.5), transparent, rgba(236,72,153,0.5))", animation: "spin 8s linear infinite" }} />
    </div>
  );
});
ImageCard.displayName = "ImageCard";

// ─── Main component ───────────────────────────────────────────────────────────

const PortfolioImageTemplate: React.FC<PortfolioImageTemplateProps> = memo(
  ({ portfolioImages, lang = "en", columns = { sm: 1, md: 2, lg: 3 } }) => {
    const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
    const [visibleImages, setVisibleImages] = useState(new Set<number>());
    const [detailModalMounted, setDetailModalMounted] = useState(false);
    const [galleryModalMounted, setGalleryModalMounted] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
      const newIndices = new Set<number>();
      entries.forEach((e) => { if (e.isIntersecting) newIndices.add(parseInt(e.target.getAttribute("data-index") || "0")); });
      if (newIndices.size > 0) setVisibleImages((prev) => new Set([...prev, ...newIndices]));
    }, []);

    const { observe } = useIntersectionObserver(handleIntersection);
    useEffect(() => { document.querySelectorAll(".portfolio-image").forEach(observe); }, [portfolioImages, observe]);

    const openDetailModal  = useCallback((image: PortfolioImage) => { setSelectedImage(image); setIsDetailModalOpen(true); }, []);
    const closeDetailModal = useCallback(() => { setDetailModalMounted(false); setTimeout(() => { setSelectedImage(null); setIsDetailModalOpen(false); }, 300); }, []);
    const openGalleryModal = useCallback((i = 0) => { setGalleryCurrentIndex(i); setIsGalleryModalOpen(true); }, []);
    const closeGalleryModal= useCallback(() => { setGalleryModalMounted(false); setTimeout(() => setIsGalleryModalOpen(false), 300); }, []);
    const nextImage = useCallback(() => setGalleryCurrentIndex((p) => (p === portfolioImages.length - 1 ? 0 : p + 1)), [portfolioImages.length]);
    const prevImage = useCallback(() => setGalleryCurrentIndex((p) => (p === 0 ? portfolioImages.length - 1 : p - 1)), [portfolioImages.length]);

    useBodyScrollLock(isDetailModalOpen || isGalleryModalOpen);
    useKeyboardNavigation(isDetailModalOpen, isGalleryModalOpen, nextImage, prevImage, closeDetailModal, closeGalleryModal);

    useEffect(() => { if (isDetailModalOpen) { const t = setTimeout(() => setDetailModalMounted(true), 16); return () => clearTimeout(t); } else setDetailModalMounted(false); }, [isDetailModalOpen]);
    useEffect(() => { if (isGalleryModalOpen) { const t = setTimeout(() => setGalleryModalMounted(true), 16); return () => clearTimeout(t); } else setGalleryModalMounted(false); }, [isGalleryModalOpen]);

    const gridClasses = useMemo(() => `grid gap-8 grid-cols-${columns.sm} sm:grid-cols-${columns.md} lg:grid-cols-${columns.lg}`, [columns]);
    const galleryLabel = lang === "es" ? "Vista de Galería" : "Gallery View";
    const ofLabel      = lang === "es" ? "de" : "of";

    if (!portfolioImages?.length) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl text-white">{lang === "es" ? "Sin imágenes" : "No images to display"}</p>
        </div>
      );
    }

    const current = portfolioImages[galleryCurrentIndex];

    return (
      <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 sm:px-6 lg:px-8">
        <StarryBackground />
        <div className="relative mx-auto max-w-7xl">
          <div ref={gridRef} className={gridClasses}>
            {portfolioImages.map((image, index) => (
              <ImageCard key={`${image.src}-${index}`} image={image} index={index}
                isVisible={visibleImages.has(index)} lang={lang}
                onDetailClick={openDetailModal} onGalleryClick={openGalleryModal} />
            ))}
          </div>

          {/* ── Detail Modal ── */}
          {isDetailModalOpen && selectedImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(2,6,23,0.95) 100%)" }}>
              <div className="relative w-full max-w-5xl max-h-full md:h-full my-auto transition-all duration-500 ease-out top-15"
                style={{ transform: detailModalMounted ? "translateY(0) scale(1)" : "translateY(50px) scale(0.9)", opacity: detailModalMounted ? 1 : 0 }}>
                <button type="button" onClick={closeDetailModal}
                  className="absolute z-20 p-3 transition-all duration-200 border rounded-full -top-5 -right-2 backdrop-blur-sm hover:scale-110"
                  style={{ background: "rgba(0,255,255,0.1)", borderColor: "rgba(0,255,255,0.3)", boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}
                  aria-label="Close modal">
                  <X className="w-6 h-6 text-cyan-300" />
                </button>
                <div className="overflow-hidden border-2 shadow-2xl rounded-2xl"
                  style={{ background: "linear-gradient(135deg, rgba(2,6,23,0.95), rgba(15,23,42,0.9))", borderColor: "rgba(0,255,255,0.3)", boxShadow: "0 0 100px rgba(0,255,255,0.2)" }}>
                  <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
                    <Image src={selectedImage.src} alt={selectedImage.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" priority />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,6,23,0.3), transparent)" }} />
                  </div>
                  <div className="p-8">
                    <h2 className="mb-3 text-3xl font-bold text-cyan-100" style={{ textShadow: "0 0 20px rgba(0,255,255,0.5)" }}>
                      {selectedImage.title}
                    </h2>
                    {/* ✅ Detail modal description in active language */}
                    <p className="text-lg leading-relaxed text-slate-300">
                      {lang === "es" ? selectedImage.descriptionEs : selectedImage.descriptionEn}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 -z-10" onClick={closeDetailModal} />
            </div>
          )}

          {/* ── Gallery Modal ── */}
          {isGalleryModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(2,6,23,0.98) 100%)" }}>
              <div className="relative w-full h-full max-w-6xl transition-all duration-500 ease-out"
                style={{ transform: galleryModalMounted ? "scale(1)" : "scale(0.8)", opacity: galleryModalMounted ? 1 : 0 }}>

                {/* Header */}
                <div className="absolute top-10 xl:top-2 left-0 right-0 z-10 p-6"
                  style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.8), transparent)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-cyan-100" style={{ textShadow: "0 0 20px rgba(0,255,255,0.5)" }}>{galleryLabel}</h2>
                      <p className="text-slate-400">{galleryCurrentIndex + 1} {ofLabel} {portfolioImages.length}</p>
                    </div>
                    <button type="button" onClick={closeGalleryModal}
                      className="p-3 transition-all duration-200 border rounded-full backdrop-blur-sm hover:scale-110"
                      style={{ background: "rgba(0,255,255,0.1)", borderColor: "rgba(0,255,255,0.3)", boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}
                      aria-label="Close gallery">
                      <X className="w-6 h-6 text-cyan-300" />
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div className="flex items-center justify-center h-full p-20">
                  <div className="relative w-full h-full border-2 rounded-lg shadow-2xl overflow-hidden"
                    style={{ borderColor: "rgba(0,255,255,0.2)", boxShadow: "0 0 60px rgba(0,255,255,0.2), 0 0 120px rgba(147,51,234,0.1)" }}>
                    <Image src={current.src} alt={current.alt} fill className="object-contain rounded-lg" sizes="90vw" priority />
                  </div>
                </div>

                {/* Prev / Next */}
                <button type="button" onClick={prevImage}
                  className="absolute p-4 transition-all duration-200 transform -translate-y-1/2 border rounded-full left-6 top-1/2 backdrop-blur-sm hover:scale-110"
                  style={{ background: "rgba(0,255,255,0.1)", borderColor: "rgba(0,255,255,0.3)", boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}
                  aria-label="Previous image">
                  <ChevronLeft className="w-8 h-8 text-cyan-300" />
                </button>
                <button type="button" onClick={nextImage}
                  className="absolute p-4 transition-all duration-200 transform -translate-y-1/2 border rounded-full right-6 top-1/2 backdrop-blur-sm hover:scale-110"
                  style={{ background: "rgba(0,255,255,0.1)", borderColor: "rgba(0,255,255,0.3)", boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}
                  aria-label="Next image">
                  <ChevronRight className="w-8 h-8 text-cyan-300" />
                </button>

                {/* Caption — description in active language */}
                <div className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: "linear-gradient(to top, rgba(2,6,23,0.8), transparent)" }}>
                  <div className="text-center">
                    <h3 className="mb-2 text-2xl font-bold text-cyan-100" style={{ textShadow: "0 0 20px rgba(0,255,255,0.5)" }}>
                      {current.title}
                    </h3>
                    {/* ✅ Gallery caption description in active language */}
                    <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                      {lang === "es" ? current.descriptionEs : current.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* Dot nav */}
                <div className="absolute transform -translate-x-1/2 bottom-26 left-1/2">
                  <div className="flex gap-2 p-3 border rounded-full backdrop-blur-sm"
                    style={{ background: "rgba(2,6,23,0.7)", borderColor: "rgba(0,255,255,0.2)" }}>
                    {portfolioImages.map((_, i) => (
                      <button key={i} type="button" onClick={() => setGalleryCurrentIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${i === galleryCurrentIndex ? "scale-125" : "hover:scale-110"}`}
                        style={{ background: i === galleryCurrentIndex ? "rgba(0,255,255,1)" : "rgba(0,255,255,0.3)", boxShadow: i === galleryCurrentIndex ? "0 0 15px rgba(0,255,255,0.8)" : "none" }}
                        aria-label={`Go to image ${i + 1}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 -z-10" onClick={closeGalleryModal} />
            </div>
          )}
        </div>
        <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }
);

PortfolioImageTemplate.displayName = "PortfolioImageTemplate";
export default PortfolioImageTemplate;