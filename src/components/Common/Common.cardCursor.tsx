"use client"
import React, { useRef, useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  style = {},
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Use global mouse move listener instead of local one to avoid conflicts
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!divRef.current || !isHovered) return;

      const rect = divRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    if (isHovered) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOpacity(0);
    setIsHovered(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={` rounded-2xl   overflow-hidden p-8 ${className}`}
      style={style}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 pointer-events-none"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};