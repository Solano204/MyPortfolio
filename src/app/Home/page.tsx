"use client";

import React, {
  memo,
  useMemo,
  useCallback,
  lazy,
  Suspense,
  useState,
  useEffect,
} from "react";
import { Download, Check } from "lucide-react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

// Lazy loading de componentes para mejor rendimiento
const ProfileCard = lazy(() =>
  import("@/components/Hero").then((module) => ({
    default: module.ProfileCard,
  }))
);

// Tipos TypeScript
interface EnlaceSocial {
  readonly id: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly url: string;
  readonly label: string;
  readonly spotlightColor?: string;
  readonly copyValue?: string; // Valor a copiar
  readonly copyLabel?: string; // Etiqueta para mostrar en la alerta
}

interface Habilidad {
  readonly id: string;
  readonly nombre: string;
}

interface DatosPerfil {
  readonly nombre: string;
  readonly titulo: string;
  readonly subtitulo: string;
  readonly handle: string;
  readonly avatarUrl: string;
  readonly descripcion: string;
  readonly cvUrl?: string;
}

// Constantes - fuera del componente para evitar recreación
const ENLACES_SOCIALES: readonly EnlaceSocial[] = [
  {
    id: "linkedin",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/carlos-josue-lopez-solano98/",
    label: "Perfil de LinkedIn",
    spotlightColor:
      "rgba(0, 119, 181, 0.4)" as `rgba(${number}, ${number}, ${number}, ${number})`,
  },
  {
    id: "github",
    icon: FaGithub,
    url: "https://github.com/Solano204",
    label: "Perfil de GitHub",
    spotlightColor:
      "rgba(88, 96, 105, 0.4)" as `rgba(${number}, ${number}, ${number}, ${number})`,
  },
  {
    id: "email",
    icon: FaEnvelope,
    url: "mailto:carlosjosuelopezsolano98@gmail.com",
    label: "Copiar correo electrónico",
    spotlightColor:
      "rgba(220, 53, 69, 0.4)" as `rgba(${number}, ${number}, ${number}, ${number})`,
    copyValue: "carlosjosuelopezsolano98@gmail.com",
    copyLabel: "Email",
  },
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    url: "https://wa.me/529631585303",
    label: "Copiar número de WhatsApp",
    spotlightColor:
      "rgba(37, 211, 102, 0.4)" as `rgba(${number}, ${number}, ${number}, ${number})`,
    copyValue: "+52 963 158 5303",
    copyLabel: "WhatsApp",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/aapiofhope/",
    label: "Copiar Instagram",
    spotlightColor:
      "rgba(225, 48, 108, 0.4)" as `rgba(${number}, ${number}, ${number}, ${number})`,
    copyValue: "aapiofhope",
    copyLabel: "Instagram",
  },
] as const;

const HABILIDADES: readonly Habilidad[] = [
  { id: "respeto", nombre: "RESPETO" },
  { id: "paciencia", nombre: "PACIENCIA" },
  { id: "disciplina", nombre: "DISCIPLINA" },
  { id: "comunicacion", nombre: "COMUNICACIÓN" },
] as const;

const DATOS_PERFIL: DatosPerfil = {
  nombre: "JOSUÉ",
  titulo: "DESARROLLADOR  FULLSTACK",
  subtitulo: "SOY JOSUÉ",
  handle: "josue_dev",
  avatarUrl: "/Images/Profile/profile.png",
  descripcion:
    "Especializado en Spring Boot y React. Experiencia comprobada creando aplicaciones escalables y optimizando rendimiento de sistemas. Experto en arquitecturas de microservicios, event-driven y tecnologías frontend.",
  cvUrl: "/documents/cv-josue-developer.pdf",
} as const;

// Componente para la alerta de copiado
const CopyAlert = memo<{ message: string; isVisible: boolean }>(
  ({ message, isVisible }) => (
    <div
      className={`
      fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-3
      bg-gradient-to-r from-green-500 to-emerald-500
      text-white rounded-lg shadow-2xl
      transform transition-all duration-500 ease-out
      ${
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      }
    `}
    >
      <Check className="w-5 h-5 text-white" />
      <span className="font-medium">{message} copied!</span>
    </div>
  )
);

CopyAlert.displayName = "CopyAlert";

// Componente de loading
const LoadingScreen = memo(() => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div className="space-y-8 text-center">
      {/* Logo/Avatar animado */}
      <div className="relative">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse">
          <div className="absolute flex items-center justify-center bg-gray-800 rounded-full inset-2">
            <span className="text-2xl font-bold text-white">J</span>
          </div>
        </div>
        <div className="absolute rounded-full -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-ping"></div>
      </div>

      {/* Texto de loading */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Cargando Portfolio</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-64 h-1 overflow-hidden bg-gray-700 rounded-full">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
      </div>
    </div>
  </div>
));

LoadingScreen.displayName = "LoadingScreen";

// Componente memoizado para botón de descarga CV
// Componente memoizado para botón de descarga CV

const convertirGoogleDriveUrl = (url: string): string => {
  // Extraer el ID del archivo de la URL de Google Drive
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    const fileId = match[1];
    // Convertir a URL de descarga directa
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  // Si no es una URL de Google Drive válida, devolver la URL original
  return url;
};

// Componente memoizado para botón de descarga CV
const BotonDescargarCV = memo<{ cvUrl?: string }>(({ cvUrl }) => {
  const manejarDescarga = useCallback(() => {
    if (cvUrl) {
      // Convertir la URL de Google Drive si es necesario
      const urlDescarga = convertirGoogleDriveUrl(cvUrl);

      // Crear un elemento <a> temporal para forzar la descarga
      const enlaceDescarga = document.createElement("a");
      enlaceDescarga.href = urlDescarga;
      enlaceDescarga.download = "CV.pdf"; // Nombre del archivo al descargar
      enlaceDescarga.style.display = "none";

      // Agregar al DOM, hacer clic y remover
      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();
      document.body.removeChild(enlaceDescarga);
    } else {
      console.log("URL del CV no disponible");
    }
  }, [cvUrl]);

  return (
    <button
      // onClick={manejarDescarga}
      className={`
        relative flex items-center gap-3 px-4 py-2.5 sm:px-6 sm:py-3
        text-white transition-all duration-300 rounded-xl
        bg-gradient-to-br from-gray-800 to-gray-900
        border border-gray-700 hover:border-blue-500
        shadow-lg hover:shadow-blue-500/20
        transform hover:scale-[1.02] active:scale-95
        focus:outline-none focus:ring-2 focus:ring-blue-500/70
        overflow-hidden group
        text-sm sm:text-base
        w-full sm:w-auto justify-center sm:justify-start
      `}
      aria-label="Descargar CV"
    >
      {/* Glow effect */}
      <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover:opacity-100" />

      {/* Main content */}
      <a
        href={"/CV.pdf"}
        download={"CV"}
        className="z-10 font-medium text-gray-200 group-hover:text-white"
      >
        Descargar CV
      </a>
      <Download className="z-10 w-4 h-4 text-blue-400 sm:w-5 sm:h-5 group-hover:text-blue-300 group-hover:animate-pulse" />
    </button>
  );
});
// Ejemplo de uso:
// <BotonDescargarCV cvUrl="/path/to/your/cv.pdf" fileName="Mi_CV.pdf" />

BotonDescargarCV.displayName = "BotonDescargarCV";

// Componente memoizado para enlaces sociales
const EnlaceSocialComponent = memo<{
  enlace: EnlaceSocial;
  onCopy: (value: string, label: string) => void;
}>(({ enlace, onCopy }) => {
  const manejarClick = useCallback(() => {
    // Si tiene copyValue, copiar al clipboard
    if (enlace.copyValue && enlace.copyLabel) {
      navigator.clipboard
        .writeText(enlace.copyValue)
        .then(() => {
          onCopy(enlace.copyValue!, enlace.copyLabel!);
        })
        .catch(() => {
          // Fallback si falla el clipboard API
          console.error("Error copiando al clipboard");
          // Abrir URL como fallback
          window.open(enlace.url, "_blank", "noopener,noreferrer");
        });
    } else {
      // Para LinkedIn y GitHub, abrir en nueva pestaña
      window.open(enlace.url, "_blank", "noopener,noreferrer");
    }
  }, [enlace, onCopy]);

  const IconComponent = enlace.icon;

  return (
    <Suspense
      fallback={
        <div className="w-12 h-12 bg-gray-700 rounded-lg sm:h-12 animate-pulse" />
      }
    >
      <div
        className="relative flex items-center justify-center h-full p-2 sm:p-3 md:p-4 group"
        onClick={manejarClick}
        aria-label={enlace.label}
      >
        <IconComponent className="text-white transition-transform duration-200 w-9 h-9 group-hover:scale-110" />

        {/* Tooltip para elementos que se copian */}
        {enlace.copyValue && (
          <div className="absolute z-10 px-2 py-1 text-xs text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 -top-12 left-1/2 group-hover:opacity-100 whitespace-nowrap">
            Click to copy
            <div className="absolute transform -translate-x-1/2 border-4 border-transparent top-full left-1/2 border-t-gray-800"></div>
          </div>
        )}
      </div>
    </Suspense>
  );
});

EnlaceSocialComponent.displayName = "EnlaceSocialComponent";

// Componente memoizado para habilidades
const SeccionHabilidades = memo(() => {
  const habilidadesJSX = useMemo(
    () =>
      HABILIDADES.map((habilidad) => (
        <div
          key={habilidad.id}
          className="flex flex-col items-center justify-center h-full p-3 space-y-2 text-center sm:p-4"
        >
          <div className="text-xs font-medium tracking-wider text-gray-300 transition-colors duration-300 hover:text-white sm:text-sm md:text-base">
            {habilidad.nombre}
          </div>
        </div>
      )),
    []
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6  mx-auto mt-10 sm:mt-16 md:mt-20 max-w-[95%] sm:max-w-[80%] md:max-w-[100%] md:grid-cols-4 animate-toggleAnimationTable">
      {habilidadesJSX}
    </div>
  );
});

SeccionHabilidades.displayName = "SeccionHabilidades";

// Componente memoizado para elementos decorativos
const ElementosDecorativos = memo(() => (
  <>
    <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full top-10 sm:top-20 right-10 sm:right-20 bg-cyan-400 animate-pulse" />
    <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 delay-1000 bg-purple-400 rounded-full bottom-10 sm:bottom-20 left-10 sm:left-20 animate-pulse" />
    <div className="absolute w-1 h-1 delay-500 rounded-full top-1/2 right-5 sm:right-10 bg-emerald-400 animate-ping" />
  </>
));

ElementosDecorativos.displayName = "ElementosDecorativos";

// Componente principal
const PortfolioInterface = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [copyAlert, setCopyAlert] = useState({ message: "", isVisible: false });

  // Simular carga de la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de loading

    return () => clearTimeout(timer);
  }, []);

  // Función para manejar el copiado
  const manejarCopia = useCallback((value: string, label: string) => {
    setCopyAlert({ message: label, isVisible: true });

    // Ocultar la alerta después de 3 segundos
    setTimeout(() => {
      setCopyAlert((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  }, []);

  // Memoizar la sección de enlaces sociales
  const enlacesSocialesJSX = useMemo(
    () =>
      ENLACES_SOCIALES.map((enlace) => (
        <div
          key={enlace.id}
          className="flex items-center justify-center w-12 h-12 overflow-hidden transition-all duration-300 rounded-lg cursor-pointer sm:w-16 sm:h-16 md:w-20 md:h-20 hover:scale-110 focus:ring-opacity-50"
        >
          <EnlaceSocialComponent enlace={enlace} onCopy={manejarCopia} />
        </div>
      )),
    [manejarCopia]
  );

  // Callback para contacto
  const manejarContacto = useCallback(() => {
    console.log("Contacto clickeado");
  }, []);

  // Si está cargando, mostrar la pantalla de loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* Alerta de copiado */}
      <CopyAlert message={copyAlert.message} isVisible={copyAlert.isVisible} />

      <div className="p-4 opacity-0 sm:p-8 md:p-12 lg:p-20 animate-fadeIn">
        <div className="max-w-[95%] sm:max-w-[90%] h-full p-4 sm:p-6 md:p-8 mx-auto animate-toggleAnimationTable relative">
          {/* Contenido Principal */}
          <div className="grid grid-cols-1 gap-8 mt-10 sm:gap-10 md:gap-12 sm:mt-16 md:mt-20 lg:grid-cols-2 animate-toggleAnimationTable">
            {/* Columna Izquierda */}
            <div className="order-2 space-y-2 sm:space-y-6 lg:order-1">
              {/* Título Principal */}
              <div className="text-center lg:text-left">
                <h1 className="font-mono text-lg font-bold tracking-wider sm:text-xl md:text-2xl lg:text-3xl text-zinc-400">
                  {DATOS_PERFIL.subtitulo}
                </h1>
                <h2 className="mt-2 text-2xl font-bold leading-tight tracking-wider text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
                  {DATOS_PERFIL.titulo}
                </h2>
              </div>

              {/* Sección de Información */}
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base leading-relaxed text-center text-gray-300 sm:text-lg lg:text-left max-w-none lg:max-w-lg">
                  {DATOS_PERFIL.descripcion}
                </p>
              </div>

              {/* Botones y Enlaces Sociales */}
              <div className="flex flex-col items-center gap-6 mt-6 lg:items-start sm:gap-8 animate-toggleAnimationTable sm:mt-8 md:mt-10">
                {/* Botón Descargar CV */}
                <BotonDescargarCV cvUrl={DATOS_PERFIL.cvUrl} />

                {/* Enlaces Sociales */}
                <div className="w-full ">
                  <h3 className="mb-3 text-sm font-medium text-center text-gray-400 sm:text-base sm:mb-4 lg:text-left">
                    Sígueme en:
                  </h3>
                  <div className="flex justify-center gap-2 lg:justify-start sm:gap-3 md:gap-4 animate-toggleAnimationTable">
                    {enlacesSocialesJSX}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha - Foto de Perfil */}
            <div className="flex justify-center order-1 lg:order-2 lg:justify-end animate-toggleAnimationTable">
              <Suspense
                fallback={
                  <div className="w-64 bg-gray-700 h-80 sm:w-72 sm:h-90 md:w-80 md:h-96 rounded-xl animate-pulse" />
                }
              >
                <div className="w-64 max-w-sm sm:w-72 md:w-80 lg:w-full">
                  <ProfileCard
                    name={DATOS_PERFIL.nombre}
                    title="Ingeniero de Software"
                    handle={DATOS_PERFIL.handle}
                    status="En línea"
                    contactText="Contáctame"
                    avatarUrl={DATOS_PERFIL.avatarUrl}
                    showUserInfo={true}
                    enableTilt={true}
                    onContactClick={manejarContacto}
                  />
                </div>
              </Suspense>
            </div>
          </div>

          {/* Sección de Habilidades */}
          <SeccionHabilidades />

          {/* Elementos Decorativos */}
          <ElementosDecorativos />
        </div>
      </div>

      {/* Estilos CSS adicionales */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
});

PortfolioInterface.displayName = "PortfolioInterface";

export default PortfolioInterface;
