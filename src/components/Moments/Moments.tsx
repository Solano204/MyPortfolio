"use client";

import { memo, useState, useCallback, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MediaItem {
  readonly id: string;
  readonly type: "image" | "video";
  readonly src: string;
  readonly caption?: string;
  readonly date?: string;
  readonly aspectRatio?: "portrait" | "landscape" | "square";
}

// ─── Media Data ───────────────────────────────────────────────────────────────

const MEDIA_ITEMS: readonly MediaItem[] = [
  {
    id: "1",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-03-23%20at%208.08.49%20PM.jpeg",
    date: "Mar 23, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "2",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-03-23%20at%208.08.50%20PM.jpeg",
    date: "Mar 23, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "3",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-03-26%20at%2011.55.57%20PM.jpeg",
    date: "Mar 26, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "4",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-04-01%20at%208.55.39%20PM.jpeg",
    date: "Apr 1, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "5",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-04-11%20at%203.14.14%20PM.jpeg",
    date: "Apr 11, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "6",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-04-16%20at%208.04.54%20PM%20(1).jpeg",
    date: "Apr 16, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "7",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-04-16%20at%208.04.54%20PM%20(2).jpeg",
    date: "Apr 16, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "8",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-04-16%20at%208.04.54%20PM.jpeg",
    date: "Apr 16, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "9",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-03-18%20at%201.39.32%20PM.jpeg",
    date: "Apr 16, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "10",
    type: "video",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Video%202026-04-11%20at%209.18.39%20AM.mp4",
    date: "Apr 11, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "11",
    type: "video",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Video%202026-04-19%20at%207.50.35%20PM%20(1).mp4",
    date: "Apr 11, 2026",
    aspectRatio: "portrait",
  },
] as const;

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
  items: readonly MediaItem[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = memo<LightboxProps>(({ items, activeIndex, onClose, onPrev, onNext }) => {
  const item = items[activeIndex];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  // Pause video when switching items
  useEffect(() => {
    setIsPlaying(false);
  }, [activeIndex]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((p) => !p);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted((p) => !p);
  }, [isMuted]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-white/50 font-mono tracking-widest">
        {activeIndex + 1} / {items.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Media */}
      <div
        className="relative max-w-4xl max-h-[85vh] w-full mx-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" ? (
          <img
            src={item.src}
            alt={item.caption ?? `Moment ${activeIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            draggable={false}
          />
        ) : (
          <div className="relative w-full">
            <video
              ref={videoRef}
              src={item.src}
              className="max-w-full max-h-[85vh] object-contain rounded-lg mx-auto block"
              loop
              playsInline
              onEnded={() => setIsPlaying(false)}
            />
            {/* Video controls overlay */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 rounded-full px-4 py-2">
              <button onClick={togglePlay} className="text-white hover:text-indigo-400 transition-colors">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button onClick={toggleMute} className="text-white hover:text-indigo-400 transition-colors">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Date badge */}
        {item.date && (
          <div className="absolute bottom-2 right-2 text-xs text-white/50 font-mono bg-black/50 px-2 py-1 rounded">
            {item.date}
          </div>
        )}
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Filmstrip thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-x-auto max-w-[90vw] px-4 py-2">
        {items.map((m, i) => (
          <button
            key={m.id}
            onClick={(e) => { e.stopPropagation(); /* handled by parent state */ }}
            className={clsx(
              "flex-shrink-0 w-10 h-10 rounded overflow-hidden border-2 transition-all duration-200",
              i === activeIndex
                ? "border-indigo-500 opacity-100 scale-110"
                : "border-transparent opacity-40 hover:opacity-70"
            )}
          >
            {m.type === "image" ? (
              <img src={m.src} alt="" className="w-full h-full object-cover" draggable={false} />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Play className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
});
Lightbox.displayName = "Lightbox";

// ─── Media Card ───────────────────────────────────────────────────────────────

interface MediaCardProps {
  item: MediaItem;
  index: number;
  onClick: (index: number) => void;
}

const MediaCard = memo<MediaCardProps>(({ item, index, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10"
      onClick={() => onClick(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 0.07}s`,
      }}
    >
      {item.type === "image" ? (
        <img
          src={item.src}
          alt={item.caption ?? `Moment ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          draggable={false}
        />
      ) : (
        <>
          <video
            ref={videoRef}
            src={item.src}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          />
          {/* Play overlay */}
          <div className={clsx(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
            isHovered ? "opacity-0" : "opacity-100"
          )}>
            <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Play className="w-5 h-5 text-white ml-0.5" />
            </div>
          </div>
        </>
      )}

      {/* Hover overlay */}
      <div className={clsx(
        "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          {item.date && (
            <span className="text-xs text-white/70 font-mono tracking-wider">{item.date}</span>
          )}
          {item.type === "video" && (
            <span className="text-xs bg-indigo-600/80 text-white px-2 py-0.5 rounded-full">video</span>
          )}
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className={clsx(
        "absolute inset-0 pointer-events-none transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )}
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
        }}
      />
    </div>
  );
});
MediaCard.displayName = "MediaCard";

// ─── Masonry Grid ─────────────────────────────────────────────────────────────

interface MasonryGridProps {
  items: readonly MediaItem[];
  onItemClick: (index: number) => void;
}

const MasonryGrid = memo<MasonryGridProps>(({ items, onItemClick }) => {
  // Distribute items into 3 columns for masonry effect
  const columns: MediaItem[][] = [[], [], []];
  items.forEach((item, i) => {
    columns[i % 3].push(item);
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-3 sm:gap-4">
          {col.map((item) => {
            const originalIndex = items.findIndex((m) => m.id === item.id);
            return (
              <div
                key={item.id}
                style={{ aspectRatio: item.aspectRatio === "landscape" ? "4/3" : item.aspectRatio === "square" ? "1/1" : "3/4" }}
              >
                <MediaCard item={item} index={originalIndex} onClick={onItemClick} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});
MasonryGrid.displayName = "MasonryGrid";

// ─── Main Page ────────────────────────────────────────────────────────────────

const MomentsPage = memo(() => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "unset";
  }, []);

  const prevItem = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length : null
    );
  }, []);

  const nextItem = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % MEDIA_ITEMS.length : null
    );
  }, []);

  return (
    <div className="min-h-screen px-4 py-24 sm:px-6 md:px-10 lg:px-16 bg-transparent">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-indigo-400/80 uppercase mb-3">
            memories
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white light:text-gray-900 tracking-tight leading-tight">
            Moments
          </h1>
          <div className="mt-4 w-12 h-px bg-indigo-500" />
          <p className="mt-4 text-sm text-gray-400 dark:text-gray-400 light:text-gray-500 max-w-sm">
            {MEDIA_ITEMS.length} captures
          </p>
        </div>

        {/* Grid */}
        <MasonryGrid items={MEDIA_ITEMS} onItemClick={openLightbox} />
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={MEDIA_ITEMS}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </div>
  );
});

MomentsPage.displayName = "MomentsPage";
export default MomentsPage;