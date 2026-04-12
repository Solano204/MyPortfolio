"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

type Lang = "es" | "en";
type Theme = "dark" | "light";

interface AppContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  es: {
    // Nav
    "nav.projects": "Proyectos",
    "nav.stack": "Stack",
    "nav.contact": "Contacto",
    // Hero
    "hero.subtitle": "SOY JOSUÉ",
    "hero.title": "DESARROLLADOR FULLSTACK",
    "hero.description":
      "Especializado en Spring Boot y React. Experiencia comprobada creando aplicaciones escalables y optimizando rendimiento de sistemas. Experto en arquitecturas de microservicios, event-driven y tecnologías frontend modernas.",
    "hero.followMe": "Sígueme en:",
    "hero.downloadCv": "Descargar CV",
    "hero.softwareEngineer": "Ingeniero de Software",
    "hero.online": "En línea",
    "hero.contact": "Contáctame",
    // Profile card
    "profile.skills.respect": "RESPETO",
    "profile.skills.patience": "PACIENCIA",
    "profile.skills.discipline": "DISCIPLINA",
    "profile.skills.communication": "COMUNICACIÓN",
    // Projects page
    "projects.loading": "Cargando proyectos...",
    "projects.scrollDown": "DESPLÁZATE",
    // Projects data
    "project.gymSystem.title": "Sistema de Gestión de Gimnasio",
    "project.gymSystem.description":
      "Plataforma completa para gestión de gimnasios con control de membresías, seguimiento de asistencia, pagos y panel de administración en tiempo real.",
    "project.gymSystem.tech": "Spring Boot · React · PostgreSQL · Docker",
    "project.ecommerce.title": "Plataforma E-Commerce",
    "project.ecommerce.description":
      "Tienda en línea con carrito de compras, pasarela de pagos, gestión de inventario y panel de vendedor. Arquitectura de microservicios con alta disponibilidad.",
    "project.ecommerce.tech": "Spring Boot · Next.js · Kafka · Redis",
    "project.taskManager.title": "Gestor de Tareas Colaborativo",
    "project.taskManager.description":
      "Herramienta de productividad en tiempo real con tableros Kanban, asignación de tareas, notificaciones push y soporte para equipos distribuidos.",
    "project.taskManager.tech": "React · WebSockets · Node.js · MongoDB",
    "project.authService.title": "Servicio de Autenticación",
    "project.authService.description":
      "Microservicio de autenticación y autorización con OAuth2, JWT, gestión de roles y auditoría de accesos. Seguro, escalable y fácil de integrar.",
    "project.authService.tech": "Spring Security · Keycloak · PostgreSQL",
    // Stack page
    "stack.loading": "Cargando tecnologías...",
    "stack.studies": "Estudios",
    "stack.degree": "Ingeniería en Sistemas Computacionales",
    "stack.school": "Tecnológico de México - Campus Comitán Chiapas",
    "stack.backend": "TECNOLOGÍAS BACKEND",
    "stack.frontend": "TECNOLOGÍAS FRONTEND",
    "stack.devops": "TECNOLOGÍAS DEVOPS",
    // Contact / Form page
    "contact.title": "Contáctame",
    "contact.emailPlaceholder": "Deja tu email para contactarte",
    "contact.subjectPlaceholder": "Déjame un asunto",
    "contact.messagePlaceholder": "Déjame un mensaje",
    "contact.sending": "Enviando mensaje...",
    "contact.send": "Enviar Mensaje",
    "contact.sending.button": "Enviando...",
    "contact.success": "Gracias por tu tiempo, Nos veremos pronto, Excelente día.",
    // Generic
    "common.copied": "copiado",
    "common.clickToCopy": "Click para copiar",
    "common.loading": "Cargando...",
  },
  en: {
    // Nav
    "nav.projects": "Projects",
    "nav.stack": "Stack",
    "nav.contact": "Contact",
    // Hero
    "hero.subtitle": "I'M JOSUÉ",
    "hero.title": "FULLSTACK DEVELOPER",
    "hero.description":
      "Specialized in Spring Boot and React. Proven experience building scalable applications and optimizing system performance. Expert in microservices, event-driven architectures, and modern frontend technologies.",
    "hero.followMe": "Follow me:",
    "hero.downloadCv": "Download CV",
    "hero.softwareEngineer": "Software Engineer",
    "hero.online": "Online",
    "hero.contact": "Contact me",
    // Profile card
    "profile.skills.respect": "RESPECT",
    "profile.skills.patience": "PATIENCE",
    "profile.skills.discipline": "DISCIPLINE",
    "profile.skills.communication": "COMMUNICATION",
    // Projects page
    "projects.loading": "Loading projects...",
    "projects.scrollDown": "SCROLL DOWN",
    // Projects data
    "project.gymSystem.title": "Gym Management System",
    "project.gymSystem.description":
      "Full-featured gym management platform with membership control, attendance tracking, payments, and a real-time admin dashboard.",
    "project.gymSystem.tech": "Spring Boot · React · PostgreSQL · Docker",
    "project.ecommerce.title": "E-Commerce Platform",
    "project.ecommerce.description":
      "Online store with shopping cart, payment gateway, inventory management, and seller dashboard. Microservices architecture with high availability.",
    "project.ecommerce.tech": "Spring Boot · Next.js · Kafka · Redis",
    "project.taskManager.title": "Collaborative Task Manager",
    "project.taskManager.description":
      "Real-time productivity tool with Kanban boards, task assignment, push notifications, and support for distributed teams.",
    "project.taskManager.tech": "React · WebSockets · Node.js · MongoDB",
    "project.authService.title": "Authentication Service",
    "project.authService.description":
      "Authentication and authorization microservice with OAuth2, JWT, role management, and access auditing. Secure, scalable, and easy to integrate.",
    "project.authService.tech": "Spring Security · Keycloak · PostgreSQL",
    // Stack page
    "stack.loading": "Loading technologies...",
    "stack.studies": "Education",
    "stack.degree": "Computer Systems Engineering",
    "stack.school": "Tecnológico de México - Comitán Chiapas Campus",
    "stack.backend": "BACKEND TECHNOLOGIES",
    "stack.frontend": "FRONTEND TECHNOLOGIES",
    "stack.devops": "DEVOPS TECHNOLOGIES",
    // Contact / Form page
    "contact.title": "Contact me",
    "contact.emailPlaceholder": "Leave your email to get in touch",
    "contact.subjectPlaceholder": "Leave a subject",
    "contact.messagePlaceholder": "Leave me a message",
    "contact.sending": "Sending message...",
    "contact.send": "Send Message",
    "contact.sending.button": "Sending...",
    "contact.success": "Thanks for your time. See you soon, have a great day!",
    // Generic
    "common.copied": "copied",
    "common.clickToCopy": "Click to copy",
    "common.loading": "Loading...",
  },
};

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(
    () => setLangState((l) => (l === "es" ? "en" : "es")),
    []
  );
  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );
  const t = useCallback(
    (key: string) => TRANSLATIONS[lang][key] ?? key,
    [lang]
  );

  const value = useMemo<AppContextValue>(
    () => ({ lang, setLang, toggleLang, theme, toggleTheme, t }),
    [lang, setLang, toggleLang, theme, toggleTheme, t]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
};