import { Activity, BarChart, Coffee, Cpu, Database, FileText, Layers, Shield, Zap } from "lucide-react";
import { Technology } from "../page";

export const healthFitnessTechnologies: Technology[] = [
  {
    name: "Java 21",
    color: "#ED8B00",
    icon: <Coffee className="w-5 h-5" />,
    description:
      "Lenguaje de programación principal con las últimas características de rendimiento y sintaxis moderna",
  },
  {
    name: "Spring Boot 3.2",
    color: "#6DB33F",
    icon: <Layers className="w-5 h-5" />,
    description:
      "Framework empresarial para construir microservicios reactivos con WebFlux y auto-configuración",
  },
  {
    name: "Spring WebFlux",
    color: "#6DB33F",
    icon: <Zap className="w-5 h-5" />,
    description:
      "Framework reactivo para APIs de alto rendimiento con soporte para 8,000+ peticiones/minuto",
  },
  {
    name: "MySQL",
    color: "#4479A1",
    icon: <Database className="w-5 h-5" />,
    description:
      "Base de datos relacional para datos transaccionales con cumplimiento ACID",
  },
  {
    name: "MongoDB",
    color: "#47A248",
    icon: <FileText className="w-5 h-5" />,
    description:
      "Base de datos NoSQL para esquemas flexibles de entrenamiento y nutrición con Change Streams",
  },
  {
    name: "Redis",
    color: "#DC382D",
    icon: <Cpu className="w-5 h-5" />,
    description:
      "Sistema de caché distribuido para baja latencia, reduciendo tiempos de respuesta en 40%",
  },
  {
    name: "JWT & OAuth 2.0",
    color: "#DC38AA",
    icon: <Shield className="w-5 h-5" />,
    description:
      "Autenticación segura y control de acceso por roles con Spring Security",
  },
  {
    name: "Analítica en Tiempo Real",
    color: "#FF5722",
    icon: <BarChart className="w-5 h-5" />,
    description:
      "Procesamiento de datos en vivo para recomendaciones adaptativas personalizadas",
  },
];
