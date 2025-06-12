"use client";
import React, { useState, useEffect } from "react";
import ContainerGlobal from "@/components/Project/page";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (replace with actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          {/* Animated gradient spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-transparent rounded-full border-t-blue-500 border-r-blue-500 animate-spin"></div>
            <div className="absolute border-4 border-transparent rounded-full inset-1 border-t-purple-500 border-r-purple-500 animate-spin animation-delay-200"></div>
          </div>
          
          {/* Text with fade animation */}
          <motion.p 
            className="text-xl font-medium text-gray-100"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ 
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5
            }}
          >
            Loading Projects...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
       <div className="flex flex-col items-center h-[150px] gap-5 fixed  bottom-0 w-full justify-center text-white">
        <h3>SCROLL DOWN</h3>
        <FaArrowDown className="w-6 h-6 animate-bounce" />
      </div>
      <ContainerGlobal />
    </div>
  );
};

export default Page;