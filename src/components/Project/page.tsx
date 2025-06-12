"use client";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { usePathname} from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import { X  } from "lucide-react";
import PortfolioImageTemplate from "./Project.BlogImages";
import TechnologyTimelineModal from "./Project.Timeline";
import { FuzzyText, SpotlightCard } from "../Common";
import { FcBiotech } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { healthFitnessTechnologies } from "./Data/AppFitness";
import {
  microservicesTechnologiesOrder,
  sagaPatternPortfolioImagesOrder,
} from "./Data/MicroservicesOrder";
import {
  fitnessMicroservicesImage,
  gymTechnologiesMicroservices,
} from "./Data/MicroservicesFitness";
import {
  ecommerceTechnologies,
  portfolioImagesFurniture,
} from "./Data/WebFurniture";
import {
  microservicesPortfolioImagesTwiter,
  microservicesTechnologiesTwitter,
} from "./Data/MicroservicesTwiter";
import {
  fut7Technologies,
  ManagementPortfolioImagesSoccer,
} from "./Data/WebSoccer";

gsap.registerPlugin(ScrollTrigger);

export type Technology = {
  name: string;
  color: string;
  icon: React.ReactNode;
  description: string;
};

export type PortfolioImage = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type Project = {
  name: string;
  codeUrl: string;
  images: PortfolioImage[];
  technologies: Technology[];
  featuredImage?: string;
};

const ContainerGlobal = () => {
  const lenisRef = useRef(null);
  useLenis(({ scroll }) => {});
  const container = useRef(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useGSAP(
    () => {
      const cards = document.querySelectorAll(".card");
      const images = document.querySelectorAll(".card img");
      const totalCards = cards.length;

      gsap.set(cards[0], { y: "0%", scale: 1, rotation: 0 });
      gsap.set(images[0], { scale: 1 });

      for (let i = 1; i < totalCards; i++) {
        gsap.set(cards[i], { y: "100%", scale: 1, rotation: 0 });
        gsap.set(images[i], { scale: 1 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cardss",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i];
        const currentImage = images[i];
        const nextCard = cards[i + 1];
        const position = i;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.5,
            rotation: 10,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          currentImage,
          {
            scale: 1.5,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        );
      }

      return () => {
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  const router = useTransitionRouter();
  const pathName = usePathname();

  function animateTournamentStageTransition() {
    document.documentElement.animate(
      [
        {
          clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.8, 0, 0.1, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    if (path === pathName) {
      e.preventDefault();
      return;
    }
    router.push(path, {
      onTransitionReady: animateTournamentStageTransition,
    });
  };

  const openPortfolioModal = (projectIndex: number) => {
    setSelectedProject(projectIndex);
    setActiveModal("portfolio");
  };

  const openTimelineModal = (projectIndex: number) => {
    setSelectedProject(projectIndex);
    setActiveModal("timeline");
  };

  const openGithub = (projectIndex: number) => {
    window.open(projects[projectIndex].codeUrl, "_blank");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedProject(null);
  };

  const projects: Project[] = [
    {
      name: "Sistema de Microservicios para Pedidos de Comida",
      codeUrl:
        "https://github.com/Solano204/Sistema-de-Microservicios-para-Pedidos-de-Comida",
      images: sagaPatternPortfolioImagesOrder,
      technologies: microservicesTechnologiesOrder,
      featuredImage: "/Images/Projects/foodProject.jpeg",
    },
    {
      name: "Sistema de administracion de partidos en un torneo de futbol",
      codeUrl:
        "https://github.com/Solano204/Sistema-de-administracion-de-partidos-en-un-torneo-de-futbol",
      images: ManagementPortfolioImagesSoccer,
      technologies: fut7Technologies,
      featuredImage: "/Images/Projects/soccerProject.jpeg",
    },
    {
      name: "Plataforma de mesajes Twitter Microservicios Event-Driven",
      codeUrl:
        "https://github.com/Solano204/Plataforma-de-mesajes-Twitter-Microservicios-Event-Driven",
      images: microservicesPortfolioImagesTwiter,
      technologies: microservicesTechnologiesTwitter,
      featuredImage: "/Images/Projects/messageProject.png",
    },
    {
      name: "E-Commerce Full-Stack de Muebles",
      codeUrl: "https://github.com/Solano204/furniture_store",
      images: portfolioImagesFurniture,
      technologies: ecommerceTechnologies,
      featuredImage: "/Images/Projects/furnitureProject.png",
    },
    {
      name: "Plataforma de Salud & Fitness",
      codeUrl: "https://github.com/Solano204/MyProgressApp",
      images: [],
      technologies: healthFitnessTechnologies,
      featuredImage: "/Images/Projects/GymProject1.jpeg",
    },
    {
      name: "Sistema Escalable de procesamiento de inscripciones y administracion de un gimnasio",
      codeUrl: "https://github.com/Solano204/GymMonster",
      images: fitnessMicroservicesImage,
      technologies: gymTechnologiesMicroservices,
      featuredImage: "/Images/Projects/GymProject2.jpeg",
    },
  ];
  return (
    <ReactLenis ref={lenisRef} root>
      <div className="container" ref={container}>
        <section className="flex items-center justify-center sticky-cardss animate-toggleAnimationTable w-svw h-svh">
          <div className="cards-container relative w-[50%] h-[50%] overflow-hidden opacity-100">
            {projects.map((project, index) => (
              <div
                key={index}
                className="absolute w-full h-full p-10 cursor-pointer card rounded-2xl group"
              >
                {project.featuredImage && (
                  <Image
                    fill
                    src={project.featuredImage}
                    alt={project.name}
                    className="object-cover w-full h-full"
                  />
                )}

                <div className="absolute inset-0 z-20 flex flex-col justify-between  text-center">
                  <div className="pt-8 w-full  ">
                    <h2 className="font-bold text-[20px] white text drop-shadow">
                      {(() => {
                        const text = project.name;
                        const words = text.split(" ");
                        const charCount = text.length;

                        // Split into 4 parts if more than 25 characters and has enough words
                        if (charCount > 25 && words.length > 2) {
                          const splitPoint1 = Math.floor(words.length / 3);
                          const splitPoint2 = Math.floor(
                            (words.length * 2) / 3
                          );

                          return (
                            <>
                            <div>

                              <FuzzyText
                                baseIntensity={0.1}
                                fontSize={"clamp(0.625rem, 3vw, 1rem)"}
                              >
                                {words.slice(0, splitPoint1).join(" ")}
                              </FuzzyText>{" "}
                              <FuzzyText
                                baseIntensity={0.1}
                                fontSize={"clamp(0.625rem, 3vw, 1rem)"}
                              >
                                {words
                                  .slice(splitPoint1, splitPoint2)
                                  .join(" ")}
                              </FuzzyText>{" "}
                              <FuzzyText
                                baseIntensity={0.1}
                                fontSize={"clamp(0.625rem, 3vw, 1rem)"}
                              >
                                {words.slice(splitPoint2, -1).join(" ")}
                              </FuzzyText>{" "}
                              <FuzzyText
                                baseIntensity={0.1}
                                fontSize={"clamp(0.625rem, 3vw, 1rem)"}
                              >
                                {words[words.length - 1]}
                              </FuzzyText>
                            </div>
                            </>

                          );
                        }
                        // Split into 3 parts if more than 20 characters
                        else if (charCount > 20 && words.length > 1) {
                          return (
                            <>
                            <div>

                              <FuzzyText
                                baseIntensity={0.1}
                                fontSize={"clamp(0.625rem, 3vw, 1rem)"}
                              >
                                {words[0]}
                              </FuzzyText>{" "}
                              <FuzzyText
                                baseIntensity={0.1}
                                fontSize={"clamp(0.625rem, 3vw, 1rem)"}
                              >
                                {words.slice(1, -1).join(" ")}
                              </FuzzyText>{" "}
                              <FuzzyText
                                baseIntensity={0.1}
                                fontSize={"clamp(0.625rem, 3vw, 1rem)"}
                              >
                                {words[words.length - 1]}
                              </FuzzyText>
                            </div>

                            </>
                          );
                        }
                        // Default split into 2 parts
                        else {
                          return (
                            <>
                            <div>

                              <FuzzyText
                                baseIntensity={0.1}
                                fontSize={"clamp(0.625rem, 3vw, 1rem)"}
                              >
                                {words[0]}
                              </FuzzyText>{" "}
                              <FuzzyText
                                baseIntensity={0.1}
                                fontSize={"clamp(0.625rem, 3vw, 1rem)"}
                              >
                                {words.slice(1).join(" ")}
                              </FuzzyText>
                            </div>

                            </>
                          );
                        }
                      })()}
                    </h2>
                  </div>

                  <div className="flex justify-center pb-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-x-4">
                      {project.images.length > 0 && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            openPortfolioModal(index);
                          }}
                          className="relative flex items-center justify-center w-16 h-16 transition-all duration-300 hover:scale-105 group"
                        >
                          <div className="absolute inset-0 z-10 transition-all duration-500 border rounded-2xl bg-gray-800/30 backdrop-blur-md border-neutral-500/50 group-hover:bg-indigo-500/20"></div>
                          <div className="z-20 flex flex-col items-center justify-center w-full h-full">
                            <FaPhotoFilm className="text-white transition-transform duration-300 size-8 group-hover:scale-125" />
                          </div>
                        </div>
                      )}

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          openTimelineModal(index);
                        }}
                        className="relative flex items-center justify-center w-16 h-16 transition-all duration-300 hover:scale-105 group"
                      >
                        <div className="absolute inset-0 z-10 transition-all duration-500 border rounded-2xl bg-gray-800/30 backdrop-blur-md border-neutral-500/50 group-hover:bg-emerald-500/20"></div>
                        <div className="z-20 flex flex-col items-center justify-center w-full h-full">
                          <FcBiotech className="text-white transition-transform duration-300 size-8 group-hover:scale-125" />
                        </div>
                      </div>

                      {project.codeUrl && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            openGithub(index);
                          }}
                          className="relative flex items-center justify-center w-16 h-16 transition-all duration-300 hover:scale-105 group"
                        >
                          <div className="absolute inset-0 z-10 transition-all duration-500 border rounded-2xl bg-gray-800/30 backdrop-blur-md border-neutral-500/50 group-hover:bg-amber-500/20"></div>
                          <div className="z-20 flex flex-col items-center justify-center w-full h-full">
                            <FaGithub className="text-white transition-transform duration-300 size-8 group-hover:scale-125" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {activeModal && selectedProject !== null && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-sm">
            <div className="relative w-full h-full overflow-auto bg-gray-900">
              <button
                onClick={closeModal}
                className="fixed p-3 text-white transition-colors duration-200 bg-red-600 rounded-full shadow-lg top-6 right-6 z-[310] hover:bg-red-700 group"
              >
                <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
              </button>

              <div className="w-full h-full">
                {activeModal === "portfolio" && (
                  <PortfolioImageTemplate
                    portfolioImages={projects[selectedProject].images}
                  />
                )}
                {activeModal === "timeline" && (
                  <TechnologyTimelineModal
                    // isModalOpen={true}
                    technologies={projects[selectedProject].technologies}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ReactLenis>
  );
};

export default ContainerGlobal;
