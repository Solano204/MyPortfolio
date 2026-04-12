import { Activity, BarChart, Coffee, Cpu, Database, FileText, Layers, Shield, Zap } from "lucide-react";
import { Technology } from "../page";

export const healthFitnessTechnologies: Technology[] = [
  {
    name: "Java 21",
    color: "#ED8B00",
    icon: <Coffee className="w-5 h-5" />,
    descriptionEs: "Lenguaje de programación principal con las últimas características de rendimiento y sintaxis moderna",
    descriptionEn: "Primary programming language with the latest performance features and modern syntax",
  },
  {
    name: "Spring Boot 3.2",
    color: "#6DB33F",
    icon: <Layers className="w-5 h-5" />,
    descriptionEs: "Framework empresarial para construir microservicios reactivos con WebFlux y auto-configuración",
    descriptionEn: "Enterprise framework for building reactive microservices with WebFlux and auto-configuration",
  },
  {
    name: "Spring WebFlux",
    color: "#6DB33F",
    icon: <Zap className="w-5 h-5" />,
    descriptionEs: "Framework reactivo para APIs de alto rendimiento con soporte para 8,000+ peticiones/minuto",
    descriptionEn: "Reactive framework for high-performance APIs supporting 8,000+ requests/minute",
  },
  {
    name: "MySQL",
    color: "#4479A1",
    icon: <Database className="w-5 h-5" />,
    descriptionEs: "Base de datos relacional para datos transaccionales con cumplimiento ACID",
    descriptionEn: "Relational database for transactional data with full ACID compliance",
  },
  {
    name: "MongoDB",
    color: "#47A248",
    icon: <FileText className="w-5 h-5" />,
    descriptionEs: "Base de datos NoSQL para esquemas flexibles de entrenamiento y nutrición con Change Streams",
    descriptionEn: "NoSQL database for flexible workout and nutrition schemas with Change Streams",
  },
  {
    name: "Redis",
    color: "#DC382D",
    icon: <Cpu className="w-5 h-5" />,
    descriptionEs: "Sistema de caché distribuido para baja latencia, reduciendo tiempos de respuesta en 40%",
    descriptionEn: "Distributed cache system for low latency, reducing response times by 40%",
  },
  {
    name: "JWT & OAuth 2.0",
    color: "#DC38AA",
    icon: <Shield className="w-5 h-5" />,
    descriptionEs: "Autenticación segura y control de acceso por roles con Spring Security",
    descriptionEn: "Secure authentication and role-based access control with Spring Security",
  },
  {
    name: "Real-Time Analytics",
    color: "#FF5722",
    icon: <BarChart className="w-5 h-5" />,
    descriptionEs: "Procesamiento de datos en vivo para recomendaciones adaptativas personalizadas",
    descriptionEn: "Live data processing for personalized adaptive recommendations",
  },
];