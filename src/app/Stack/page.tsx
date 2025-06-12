"use client";
import React, { useRef, useEffect, useState } from "react";
import {  RollingGallery } from "@/components/Stack/index";
import { motion } from "framer-motion";
import {
  stacksBackend,
  stacksDevOps,
  stacksFrontend,
} from "@/components/Stack/Stack.Data";
import { BentoTilt, TextGenerateEffect } from "@/components/Common";
import Image from "next/image";
import { FuzzyText } from "@/components/Project";


const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          
          {/* Loading text with animation */}
          <motion.p 
            className="text-lg font-medium text-gray-100"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading technologies...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Full-screen Lightning Background */}
      <div className="absolute inset-0 -z-10">
        {/* <Lightning
          hue={230}
          speed={1}
          intensity={0.5} // Reduced intensity so content remains visible
          size={1}
        /> */}
      </div>
      
      {/* Main content */}
      <div className="z-50 w-[70%] mx-auto h-[50%] min-h-[20%] bg-gray-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700 flex flex-col md:flex-row gap-5">
        {/* Left Text Section - Estudios */}
        <div className="" ref={containerRef} style={{ position: "relative" }}>
          <TextGenerateEffect duration={2} filter={false} words={"Estudios"} />
          <TextGenerateEffect
            duration={2}
            filter={false}
            words={"Ingeniería en Sistemas Computacionales"}
          />
          <TextGenerateEffect
            duration={2}
            filter={false}
            words={" Tecnológico de México - Campus Comitán Chiapas"}
          />
        </div>

        {/* Right Photo Section - School Logo */}
        <div className="flex items-center justify-center flex-1">
          <BentoTilt className="w-48 h-48 overflow-hidden border-2 rounded-xl border-cyan-500/20 bg-white/10 backdrop-blur-xs">
            <Image
              fill
              src="/Images/School/schoolTecn.png"
              alt="TecNM Comitán Logo"
              className="object-contain w-full h-full p-4"
            />
          </BentoTilt>
        </div>
      </div>
      
      {/* Technologies sections */}
      <div className="relative flex flex-col items-center w-full h-full gap-10 mt-10">
        <div className="w-[70%] h-[60%] bg-gray-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <h2 className="font-bold text-[20px] white text drop-shadow mb-20">
            <FuzzyText
              baseIntensity={0.1}
              fontSize={"clamp(0.625rem, 3vw, 1rem)"}
            >
              {"TECHNOLOGIES BACKEND"}
            </FuzzyText>
          </h2>
          <RollingGallery
            autoplay={true}
            key={"jkds"}
            stacks={stacksBackend}
          />
        </div>
        
        <div className="w-[70%] bg-gray-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <h2 className="font-bold text-[20px] white text drop-shadow mb-20">
            <FuzzyText
              baseIntensity={0.1}
              fontSize={"clamp(0.625rem, 3vw, 1rem)"}
            >
              {"TECHNOLOGIES FRONTEND"}
            </FuzzyText>
          </h2>
          <RollingGallery
            autoplay={true}
            key={"ssjkds"}
            stacks={stacksFrontend}
          />
        </div>
        
        <div className="w-[70%] h-[45%] bg-gray-900/70 backdrop-blur- p-8 rounded-xl border border-gray-700">
          <h2 className="font-bold text-[20px] white text drop-shadow mb-20">
            <FuzzyText
              baseIntensity={0.1}
              fontSize={"clamp(0.625rem, 3vw, 1rem)"}
            >
              {"TECHNOLOGIES DEVOPS"}
            </FuzzyText>
          </h2>
          <RollingGallery autoplay={true} key={"j33kds"} stacks={stacksDevOps} />
        </div>
      </div>
    </div>
  );
};

export default Page;