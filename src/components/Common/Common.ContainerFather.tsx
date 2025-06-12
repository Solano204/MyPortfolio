import React, { ReactNode } from "react";

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
  //   as?: keyof JSX.IntrinsicElements; // Optional prop to change the element type
  style?: React.CSSProperties; // Optional style prop
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  className = "",
  //   as: Component = "div", // Defaults to div
  style = {},
}) => {
  return (
    <div
      className={`min-h-screen bg-dark-gradient  bg-gradient-to-br from-gray-900 via-gray-800 to-black ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
