"use client";

import { memo, useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight } from "lucide-react";
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
    date: "Mar 18, 2026",
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
    date: "Apr 19, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "12",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-04-19%20at%208.46.07%20PM%20(1).jpeg",
    date: "Apr 19, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "13",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-04-24%20at%2010.11.31%20AM%20(1).jpeg",
    date: "Apr 24, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "14",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/WhatsApp%20Image%202026-04-24%20at%2010.11.31%20AM.jpeg",
    date: "Apr 24, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "15",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/ChatGPT%20Image%2026%20abr%202026,%2006_36_58%20p.m..png",
    date: "Apr 26, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "16",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/ChatGPT%20Image%2026%20abr%202026,%2006_44_14%20p.m..png",
    date: "Apr 26, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "17",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/ChatGPT%20Image%2026%20abr%202026,%2007_50_11%20p.m..png",
    date: "Apr 26, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "18",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/ChatGPT%20Image%2026%20abr%202026,%2008_15_18%20p.m..png",
    date: "Apr 26, 2026",
    aspectRatio: "portrait",
  },
  {
    id: "19",
    type: "image",
    src: "https://chicfkbdfqdrrevtrrby.supabase.co/storage/v1/object/public/MOMENTS_GRINGOS/Gemini_Generated_Image_p5evzop5evzop5ev.png",
    date: "Apr 26, 2026",
    aspectRatio: "portrait",
  },
] as const;

// ─── Video Lightbox (videos only) ─────────────────────────────────────────────

interface VideoLightboxProps {
  item: MediaItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  activeIndex: number;
  total: number;
}

const VideoLightbox = memo<VideoLightboxProps>(({ item, onClose, onPrev, onNext, activeIndex, total }) => {
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

  useEffect(() => {
    setIsPlaying(false);
  }, [activeIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((p) => !p);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted((p) => !p);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-white/50 font-mono tracking-widest">
        {activeIndex + 1} / {total}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-4xl max-h-[85vh] w-full mx-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full">
          <video
            ref={videoRef}
            src={item.src}
            className="max-w-full max-h-[85vh] object-contain rounded-lg mx-auto block"
            loop
            playsInline
            onEnded={() => setIsPlaying(false)}
          />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 rounded-full px-4 py-2">
            <button onClick={togglePlay} className="text-white hover:text-indigo-400 transition-colors">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-indigo-400 transition-colors">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {item.date && (
          <div className="absolute bottom-2 right-2 text-xs text-white/50 font-mono bg-black/50 px-2 py-1 rounded">
            {item.date}
          </div>
        )}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
});
VideoLightbox.displayName = "VideoLightbox";

// ─── Media Card ───────────────────────────────────────────────────────────────

interface MediaCardProps {
  item: MediaItem;
  index: number;
  onVideoClick: (index: number) => void;
}

const MediaCard = memo<MediaCardProps>(({ item, index, onVideoClick }) => {
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

  const handleClick = () => {
    // Only open lightbox for videos, images do nothing
    if (item.type === "video") {
      onVideoClick(index);
    }
  };

  return (
    <div
      className={clsx(
        "relative group overflow-hidden rounded-xl bg-gray-900 border border-gray-800 transition-all duration-300",
        item.type === "video"
          ? "cursor-pointer hover:border-indigo-500/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10"
          : "cursor-default"
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {item.type === "image" ? (
        <img
          src={item.src}
          alt={item.caption ?? `Moment ${index + 1}`}
          className="w-full h-full object-cover"
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
          {/* Play overlay for videos */}
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

      {/* Hover overlay — only for videos */}
      {item.type === "video" && (
        <div className={clsx(
          "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            {item.date && (
              <span className="text-xs text-white/70 font-mono tracking-wider">{item.date}</span>
            )}
            <span className="text-xs bg-indigo-600/80 text-white px-2 py-0.5 rounded-full">video</span>
          </div>
        </div>
      )}
    </div>
  );
});
MediaCard.displayName = "MediaCard";

// ─── Masonry Grid ─────────────────────────────────────────────────────────────

interface MasonryGridProps {
  items: readonly MediaItem[];
  onVideoClick: (index: number) => void;
}

const MasonryGrid = memo<MasonryGridProps>(({ items, onVideoClick }) => {
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
                <MediaCard item={item} index={originalIndex} onVideoClick={onVideoClick} />
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

// Only video items for lightbox navigation
const VIDEO_ITEMS = MEDIA_ITEMS.filter((m) => m.type === "video");

const MomentsPage = memo(() => {
  // lightboxVideoIndex is an index into VIDEO_ITEMS (not MEDIA_ITEMS)
  const [lightboxVideoIndex, setLightboxVideoIndex] = useState<number | null>(null);

  const handleVideoClick = (mediaIndex: number) => {
    const item = MEDIA_ITEMS[mediaIndex];
    if (item.type !== "video") return;
    const videoIdx = VIDEO_ITEMS.findIndex((v) => v.id === item.id);
    if (videoIdx !== -1) {
      setLightboxVideoIndex(videoIdx);
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    setLightboxVideoIndex(null);
    document.body.style.overflow = "unset";
  };

  const prevVideo = () => {
    setLightboxVideoIndex((prev) =>
      prev !== null ? (prev - 1 + VIDEO_ITEMS.length) % VIDEO_ITEMS.length : null
    );
  };

  const nextVideo = () => {
    setLightboxVideoIndex((prev) =>
      prev !== null ? (prev + 1) % VIDEO_ITEMS.length : null
    );
  };

  return (
    <div className="min-h-screen px-4 py-24 sm:px-6 md:px-10 lg:px-16 bg-transparent">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-indigo-400/80 uppercase mb-3">
            memories
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white tracking-tight leading-tight">
            Moments
          </h1>
          <div className="mt-4 w-12 h-px bg-indigo-500" />
          <p className="mt-4 text-sm text-gray-400 max-w-sm">
            {MEDIA_ITEMS.length} captures
          </p>
        </div>

        {/* Grid */}
        <MasonryGrid items={MEDIA_ITEMS} onVideoClick={handleVideoClick} />
      </div>

      {/* Video Lightbox only */}
      {lightboxVideoIndex !== null && (
        <VideoLightbox
          item={VIDEO_ITEMS[lightboxVideoIndex]}
          activeIndex={lightboxVideoIndex}
          total={VIDEO_ITEMS.length}
          onClose={closeLightbox}
          onPrev={prevVideo}
          onNext={nextVideo}
        />
      )}
    </div>
  );
});

MomentsPage.displayName = "MomentsPage";
export default MomentsPage;