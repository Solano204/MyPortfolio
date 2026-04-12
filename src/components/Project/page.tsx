"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import PortfolioImageTemplate from "./Project.BlogImages";
import TechnologyTimelineModal from "./Project.Timeline";
import { FcBiotech } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { useApp } from "@/context/AppContext";

// ── data imports ──────────────────────────────────────────────────────────────
import { healthFitnessTechnologies } from "./Data/AppFitness";
import { microservicesTechnologiesOrder, sagaPatternPortfolioImagesOrder } from "./Data/MicroservicesOrder";
import { fitnessMicroservicesImage, gymTechnologiesMicroservices } from "./Data/MicroservicesFitness";
import { ecommerceTechnologies, portfolioImagesFurniture } from "./Data/WebFurniture";
import { microservicesPortfolioImagesTwiter, microservicesTechnologiesTwitter } from "./Data/MicroservicesTwiter";
import { fut7Technologies, ManagementPortfolioImagesSoccer } from "./Data/WebSoccer";
import { brainTrustTechnologies, brainTrustImages } from "./Data/BrainTrust";
import { cloudMartTechnologies, cloudMartImages } from "./Data/CloudMart";
import { neoBankTechnologies, neoBankImages } from "./Data/NeoBank";
import { tradeFlowTechnologies, tradeFlowImages } from "./Data/TradeFlow";
import { FuzzyText } from "@/components/Common/Common.Titile";
import { BentoTilt } from "@/components/Common/Common.card3D";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Technology = {
  name: string;
  color: string;
  icon: React.ReactNode;
  descriptionEs: string;
  descriptionEn: string;
};

export type PortfolioImage = {
  src: string;
  alt: string;
  title: string;
  descriptionEs: string;
  descriptionEn: string;
};

type Project = {
  nameEs: string;
  nameEn: string;
  codeUrl: string;
  images: PortfolioImage[];
  technologies: Technology[];
  featuredImage?: string;
};

export type Lang = "es" | "en";

// ─── Projects list ────────────────────────────────────────────────────────────

const buildProjects = (): Project[] => [
  {
    nameEs: "BrainTrust — Plataforma Educativa Monolito Modular",
    nameEn: "BrainTrust — Modular Monolith Educational Platform",
    codeUrl: "https://github.com/Solano204/BrainTrust",
    images: brainTrustImages,
    technologies: brainTrustTechnologies,
    featuredImage: "/Images/Projects/brainTrust.jpg",
  },
  {
    nameEs: "NeoBank — Banca Digital Cloud-Native con IA",
    nameEn: "NeoBank — Cloud-Native Digital Bank with AI",
    codeUrl: "https://github.com/Solano204/neobank-fullstack",
    images: neoBankImages,
    technologies: neoBankTechnologies,
    featuredImage: "/Images/Projects/neoBanks2.jpg",
  },
  {
    nameEs: "TradeFlow — Marketplace Distribuido Event-Driven",
    nameEn: "TradeFlow — Event-Driven Distributed Marketplace",
    codeUrl: "https://github.com/Solano204/tradeflow-microservices-architecture-project",
    images: tradeFlowImages,
    technologies: tradeFlowTechnologies,
    featuredImage: "/Images/Projects/neoBank.jpg",
  },
  {
    nameEs: "CloudMart — E-Commerce Serverless AWS",
    nameEn: "CloudMart — Serverless AWS E-Commerce",
    codeUrl: "https://github.com/Solano204/AWS-LAMBDA-SERVERLES",
    images: cloudMartImages,
    technologies: cloudMartTechnologies,
    featuredImage: "/Images/Projects/e-commerce.jpg",
  },
  {
    nameEs: "Sistema de administración de partidos en un torneo de fútbol",
    nameEn: "Football Tournament Match Management System",
    codeUrl: "https://github.com/Solano204/Sistema-de-administracion-de-partidos-en-un-torneo-de-futbol",
    images: ManagementPortfolioImagesSoccer,
    technologies: fut7Technologies,
    featuredImage: "/Images/Projects/soccerProject.jpeg",
  },
  {
    nameEs: "Sistema de Microservicios para Pedidos de Comida",
    nameEn: "Food Orders Microservices System",
    codeUrl: "https://github.com/Solano204/Sistema-de-Microservicios-para-Pedidos-de-Comida",
    images: sagaPatternPortfolioImagesOrder,
    technologies: microservicesTechnologiesOrder,
    featuredImage: "/Images/Projects/foodProject.jpeg",
  },
  {
    nameEs: "Plataforma de mensajes Twitter Microservicios Event-Driven",
    nameEn: "Twitter-Style Messaging — Event-Driven Microservices",
    codeUrl: "https://github.com/Solano204/Plataforma-de-mesajes-Twitter-Microservicios-Event-Driven",
    images: microservicesPortfolioImagesTwiter,
    technologies: microservicesTechnologiesTwitter,
    featuredImage: "/Images/Projects/messageProject.png",
  },
  {
    nameEs: "E-Commerce Full-Stack de Muebles",
    nameEn: "Full-Stack Furniture E-Commerce",
    codeUrl: "https://github.com/Solano204/furniture_store",
    images: portfolioImagesFurniture,
    technologies: ecommerceTechnologies,
    featuredImage: "/Images/Projects/furnitureProject.png",
  },
  {
    nameEs: "Sistema Escalable de procesamiento de inscripciones y administración de un gimnasio",
    nameEn: "Scalable Gym Enrollment & Management System",
    codeUrl: "https://github.com/Solano204/GymMonster",
    images: fitnessMicroservicesImage,
    technologies: gymTechnologiesMicroservices,
    featuredImage: "/Images/Projects/GymProject2.jpeg",
  },
  {
    nameEs: "Plataforma de Salud & Fitness",
    nameEn: "Health & Fitness Platform",
    codeUrl: "https://github.com/Solano204/MyProgressApp",
    images: [],
    technologies: healthFitnessTechnologies,
    featuredImage: "/Images/Projects/GymProject1.jpeg",
  },
];

// ─── ContainerGlobal ──────────────────────────────────────────────────────────

const ContainerGlobal = () => {
  // ✅ Global lang from AppContext — no prop drilling needed
  const { lang } = useApp();

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = buildProjects();

  const openPortfolioModal = (i: number) => { setSelectedProject(i); setActiveModal("portfolio"); };
  const openTimelineModal  = (i: number) => { setSelectedProject(i); setActiveModal("timeline"); };
  const openGithub         = (i: number) => { window.open(projects[i].codeUrl, "_blank"); };
  const closeModal         = () => { setActiveModal(null); setSelectedProject(null); };

  const imgLabel  = lang === "es" ? "Imágenes"    : "Images";
  const techLabel = lang === "es" ? "Tecnologías" : "Technologies";
  const title     = lang === "es" ? "Proyectos"   : "Projects";

  return (
    <>
      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <section className="w-full px-4 py-16 sm:px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-gray-900">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-fr">
          {projects.map((project, index) => (
            <BentoTilt
              key={index}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
            >
              <ProjectCard
                project={project}
                index={index}
                lang={lang}
                imgLabel={imgLabel}
                techLabel={techLabel}
                onPortfolio={openPortfolioModal}
                onTimeline={openTimelineModal}
                onGithub={openGithub}
              />
            </BentoTilt>
          ))}
        </div>
      </section>

      {/* ── Modals ───────────────────────────────────────────────────── */}
      {activeModal && selectedProject !== null && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative w-full h-full overflow-auto bg-gray-900 dark:bg-gray-900">
            <button
              onClick={closeModal}
              className="fixed p-3 text-white bg-red-600 rounded-full shadow-lg top-4 right-4 sm:top-6 sm:right-6 z-[310] hover:bg-red-700 transition-colors group"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:rotate-90" />
            </button>

            <div className="w-full h-full">
              {activeModal === "portfolio" && (
                <PortfolioImageTemplate
                  portfolioImages={projects[selectedProject].images}
                  lang={lang}
                />
              )}
              {activeModal === "timeline" && (
                <TechnologyTimelineModal
                  technologies={projects[selectedProject].technologies}
                  lang={lang}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────

type CardProps = {
  project: Project;
  index: number;
  lang: Lang;
  imgLabel: string;
  techLabel: string;
  onPortfolio: (i: number) => void;
  onTimeline:  (i: number) => void;
  onGithub:    (i: number) => void;
};

const ProjectCard = ({
  project, index, lang, imgLabel, techLabel,
  onPortfolio, onTimeline, onGithub,
}: CardProps) => (
  <div className="
    relative flex flex-col overflow-hidden rounded-2xl h-full
    border border-zinc-700 dark:border-cyan-950 light:border-gray-200
    bg-gray-900 dark:bg-gray-900 light:bg-white
    shadow-lg group transition-shadow duration-300
    hover:shadow-2xl hover:shadow-blue-500/10
  ">
    {/* Featured Image */}
    <div className="relative w-full h-48 sm:h-52 overflow-hidden shrink-0">
      {project.featuredImage ? (
        <Image
          fill
          src={project.featuredImage}
          alt={lang === "es" ? project.nameEs : project.nameEn}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 light:from-gray-100 light:to-gray-200" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
    </div>

    {/* Card Body */}
    <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3 sm:gap-4">
      <h3 className="font-bold leading-snug flex-1 text-sm md:text-base min-h-[2.5rem] text-white dark:text-white light:text-gray-900">
        <ProjectTitle name={lang === "es" ? project.nameEs : project.nameEn} />
      </h3>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {project.images.length > 0 && (
          <ActionButton
            onClick={() => onPortfolio(index)}
            label={imgLabel}
            accentClass="hover:bg-indigo-500/20 hover:border-indigo-400/40"
          >
            <FaPhotoFilm className="text-white size-4 transition-transform duration-300 group-hover/btn:scale-125" />
          </ActionButton>
        )}

        <ActionButton
          onClick={() => onTimeline(index)}
          label={techLabel}
          accentClass="hover:bg-emerald-500/20 hover:border-emerald-400/40"
        >
          <FcBiotech className="size-4 transition-transform duration-300 group-hover/btn:scale-125" />
        </ActionButton>

        {project.codeUrl && (
          <ActionButton
            onClick={() => onGithub(index)}
            label="GitHub"
            accentClass="hover:bg-amber-500/20 hover:border-amber-400/40"
          >
            <FaGithub className="text-white size-4 transition-transform duration-300 group-hover/btn:scale-125" />
          </ActionButton>
        )}
      </div>
    </div>
  </div>
);

// ─── ActionButton ─────────────────────────────────────────────────────────────

type ActionButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  accentClass: string;
  label: string;
  children: React.ReactNode;
};

const ActionButton = ({ onClick, accentClass, label, children }: ActionButtonProps) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(e); }}
    aria-label={label}
    className={`
      group/btn relative flex items-center gap-2 px-3 py-2 rounded-xl
      border border-neutral-500/40 bg-gray-800/40 backdrop-blur-sm
      text-white text-xs font-medium transition-all duration-300
      ${accentClass}
    `}
  >
    {children}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

// ─── ProjectTitle ─────────────────────────────────────────────────────────────

const ProjectTitle = ({ name }: { name: string }) => {
  const words = name.split(" ");
  const len   = name.length;
  const fs    = "clamp(0.8rem, 2.5vw, 1rem)";
  const int   = 0.15;

  if (len > 25 && words.length > 3) {
    const a = Math.floor(words.length / 3);
    const b = Math.floor((words.length * 2) / 3);
    return (
      <div className="leading-relaxed">
        <FuzzyText baseIntensity={int} fontSize={fs}>{words.slice(0, a).join(" ")}</FuzzyText>{" "}
        <FuzzyText baseIntensity={int} fontSize={fs}>{words.slice(a, b).join(" ")}</FuzzyText>{" "}
        <FuzzyText baseIntensity={int} fontSize={fs}>{words.slice(b).join(" ")}</FuzzyText>
      </div>
    );
  }
  if (len > 20 && words.length > 1) {
    const mid = Math.ceil(words.length / 2);
    return (
      <div className="leading-relaxed">
        <FuzzyText baseIntensity={int} fontSize={fs}>{words.slice(0, mid).join(" ")}</FuzzyText>{" "}
        <FuzzyText baseIntensity={int} fontSize={fs}>{words.slice(mid).join(" ")}</FuzzyText>
      </div>
    );
  }
  return (
    <div className="leading-relaxed">
      <FuzzyText baseIntensity={int} fontSize={fs}>{name}</FuzzyText>
    </div>
  );
};

export default ContainerGlobal;