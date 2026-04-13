"use client";
import { useRef, useState, CSSProperties, MouseEvent } from "react";
import Image from "next/image";

interface ProfileCardProps {
  avatarUrl: string;
  name?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  tiltIntensity?: number;
  scale?: number;
  glowColor?: string;
  borderColor?: string;
}

export const ProfileCard = ({
  avatarUrl,
  name = "JOSUÉ",
  title = "Software Engineer",
  subtitle,
  className = "",
  tiltIntensity = 8,
  scale = 0.98,
  glowColor = "from-blue-600/20 via-purple-600/20 to-pink-600/20",
  borderColor = "border-gray-700/30",
}: ProfileCardProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    // Store mouse position for shine effect
    setMousePosition({ x: relativeX * 100, y: relativeY * 100 });

    // Calculate tilt angles
    const tiltX = (relativeY - 0.5) * tiltIntensity;
    const tiltY = (relativeX - 0.5) * -tiltIntensity;

    setTransformStyle(
      `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
    setMousePosition({ x: 50, y: 50 });
  };

  const cardStyle: CSSProperties = {
    transform: transformStyle,
    willChange: "transform",
    transition: transformStyle ? "none" : "transform 0.3s ease-out",
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-full max-w-sm overflow-hidden rounded-2xl border ${borderColor} backdrop-blur-sm ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} pointer-events-none z-10`} />

      {/* Image container */}
      <div className="relative w-full h-full aspect-[3/4] overflow-hidden bg-gray-900">
        <Image
          src={avatarUrl}
          alt={name}
          fill
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content overlay - bottom section with blur background */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-20">
        {/* Text content */}
        <div className="space-y-2">
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-wider leading-tight">
            {name}
          </h3>
          <p className="text-sm sm:text-base text-gray-200 font-medium tracking-widest uppercase">
            {title}
          </p>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-400 font-light tracking-wide mt-2">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Dynamic shine effect based on mouse position */}
      <div
        className="absolute inset-0 pointer-events-none z-15 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)`,
        }}
      />

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none z-20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ProfileCard;