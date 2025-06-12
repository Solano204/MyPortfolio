"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { SpotlightCard } from "../Common";

export type stack = {
  title: string;
  icon: React.ReactNode;
};
interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  stacks: stack[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = false,
  stacks = [],
}) => {
  // Use default images if none are provided

  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(autoplay);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const dragStartRef = useRef<{ x: number; rotation: number }>({
    x: 0,
    rotation: 0,
  });
  const velocityRef = useRef<number>(0);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenSizeSm(window.innerWidth <= 240);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 3D geometry calculations
  const faceCount: number = stacks.length;
  const imageWidth = isScreenSizeSm ? 100 : 120;
  const spacing = isScreenSizeSm ? 1 : 20; // Gap between images
  const faceWidth: number = imageWidth + spacing;
  const circumference = faceWidth * faceCount;
  const radius: number = circumference / (2 * Math.PI);

  // Animation loop for autoplay
  const animate = useCallback(
    (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;

      const deltaTime = currentTime - lastTimeRef.current;
      const rotationSpeed = 18; // degrees per second (360/20 for 20 second rotation)

      if (isAutoPlaying && !isDragging) {
        setRotation((prev) => prev - (rotationSpeed / 1000) * deltaTime);
      }

      lastTimeRef.current = currentTime;
      animationRef.current = requestAnimationFrame(animate);
    },
    [isAutoPlaying, isDragging]
  );

  // Start/stop animation
  useEffect(() => {
    if (autoplay) {
      setIsAutoPlaying(true);
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsAutoPlaying(false);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoplay, animate]);

  // Mouse/Touch event handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    dragStartRef.current = { x: clientX, rotation };
    velocityRef.current = 0;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;

    const deltaX = clientX - dragStartRef.current.x;
    const dragFactor = 0.05;
    const newRotation = dragStartRef.current.rotation + deltaX * dragFactor;

    velocityRef.current = deltaX * dragFactor;
    setRotation(newRotation);
  };

  const handleEnd = () => {
    setIsDragging(false);

    // Apply momentum
    const momentum = velocityRef.current * 0.1;
    setRotation((prev) => prev + momentum);

    // Resume autoplay if it was enabled
    if (autoplay) {
      setTimeout(() => {
        setIsAutoPlaying(true);
        lastTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(animate);
      }, 100);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Hover events for pause functionality
  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover && !isDragging) {
      setIsAutoPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover && !isDragging) {
      setIsAutoPlaying(true);
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Global mouse events for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative h-[100px] w-full overflow-hidden">
      {/* Left gradient overlay */}
      <div
        className="absolute top-0 left-0 z-10 w-12 h-full pointer-events-none"
        // style={{
        //   background:
        //     "linear-gradient(to left, rgba(0,0,0,0) 0%, #060606 100%)",
        // }}
      />

      {/* Right gradient overlay */}
      <div
        className="absolute top-0 right-0 z-10 w-12 h-full pointer-events-none"
        style={
          {
            // background:
            // "linear-gradient(to right, rgba(0,0,0,0) 0%, #060606 100%)",
          }
        }
      />

      {/* Main container with perspective */}
      <div
        className="flex items-center justify-center h-full"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        {/* Rotating container */}
        <div
          ref={containerRef}
          className={`flex h-[220px]  items-center justify-center select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            width: circumference,
            transformStyle: "preserve-3d",
            transform: `rotate3d(0,1,0,${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {stacks.map((stack, i) => (
            <SpotlightCard
              spotlightColor={"rgba(46, 213, 115, 0.35)"} // Emerald energy glow
              key={i}
              className="absolute flex items-center justify-center h-full p-4 group"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <div className="flex flex-col items-center justify-center w-full h-full gap-2 ">
                <h2 className="font-bold text-[10px]">{stack.title}</h2>
                <h2 className="font-bold">{stack.icon}</h2>
              </div>

              {/* <Image
                fill
                src={url}
                alt={`Gallery image ${i + 1}`}
                className="pointer-events-none h-[70px] w-[270px] rounded-2xl object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                draggable={false}
              /> */}
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RollingGallery;
