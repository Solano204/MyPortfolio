"use client";
import { useRef, useState, ReactNode, CSSProperties, MouseEvent } from "react";

interface TiltProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const BentoTilt = ({ children, className = "", style = {} }: TiltProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5; // Reduced from 10 to 5 for subtler effect
    const tiltY = (relativeX - 0.5) * -5; // Reduced from 10 to 5 for subtler effect

    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        ...style,
        willChange: "transform", // Improves performance
      }}
    >
      {children}
    </div>
  );
};
