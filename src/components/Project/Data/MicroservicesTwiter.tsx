import { PortfolioImage, Technology } from "../page";
import {
  Layers,
  Database,
  Shield,
  Globe,
  Zap,
  GitBranch,
  Package,
  Cloud,
  Smartphone,
  Server,
  Key,
  MessageSquare,
  Lock,
  Activity,
  BarChart3,
  Settings,
  Hash,
  FileText,
  Download,
  Eye,
  Sparkles,
  Container,
  RefreshCw,
  AlertTriangle,
  Timer,
  CreditCard,
  ShoppingCart,
  Code,
} from "lucide-react";

// Technologies used in the Event-Driven Food Ordering Microservices Architecture
export const microservicesTechnologiesTwitter: Technology[] = [
  {
    name: "Spring Boot 3.2",
    color: "#6DB33F",
    icon: <Layers className="w-5 h-5" />,
    description:
      "Framework empresarial principal para construir microservicios listos para producción con servidores embebidos y auto-configuración",
  },
  {
    name: "Spring Cloud",
    color: "#6DB33F",
    icon: <Cloud className="w-5 h-5" />,
    description:
      "Herramientas para desarrolladores que construyen patrones de sistemas distribuidos en microservicios con service discovery y circuit breakers",
  },
  {
    name: "Apache Kafka",
    color: "#231F20",
    icon: <MessageSquare className="w-5 h-5" />,
    description:
      "Plataforma de streaming de eventos distribuida para procesamiento de datos en tiempo real con alta throughput y baja latencia",
  },
  {
    name: "Java 17",
    color: "#ED8B00",
    icon: <Code className="w-5 h-5" />,
    description:
      "Lenguaje principal con características modernas que proporciona rendimiento optimizado y sintaxis mejorada para desarrollo empresarial",
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    icon: <Database className="w-5 h-5" />,
    description:
      "Base de datos relacional principal que garantiza consistencia ACID y soporte avanzado para transacciones distribuidas",
  },
  {
    name: "Redis",
    color: "#DC382D",
    icon: <Zap className="w-5 h-5" />,
    description:
      "Cache distribuido para sesiones y datos frecuentes, mejorando significativamente los tiempos de respuesta del sistema",
  },
  {
    name: "Docker",
    color: "#2496ED",
    icon: <Container className="w-5 h-5" />,
    description:
      "Contenerización para desarrollo local y despliegue consistente, facilitando la portabilidad entre entornos",
  },
  {
    name: "Kubernetes",
    color: "#326CE5",
    icon: <Settings className="w-5 h-5" />,
    description:
      "Orquestación para entornos productivos con escalado automático, service mesh y gestión de configuraciones",
  },
  {
    name: "Event Sourcing",
    color: "#8E44AD",
    icon: <FileText className="w-5 h-5" />,
    description:
      "Almacenamiento de todos los cambios como secuencia de eventos, proporcionando auditabilidad completa y capacidad de replay",
  },
  {
    name: "CQRS",
    color: "#E74C3C",
    icon: <GitBranch className="w-5 h-5" />,
    description:
      "Separación de Command Query Responsibility para optimizar operaciones de lectura y escritura independientemente",
  },
  {
    name: "Spring Security",
    color: "#6DB33F",
    icon: <Shield className="w-5 h-5" />,
    description:
      "Framework de seguridad robusto con autenticación JWT, autorización OAuth 2.0 y protección contra vulnerabilidades comunes",
  },
  {
    name: "Prometheus",
    color: "#E6522C",
    icon: <BarChart3 className="w-5 h-5" />,
    description:
      "Sistema de monitoreo y alertas que recolecta métricas en tiempo real con capacidades avanzadas de query y alerting",
  },
  {
    name: "Grafana",
    color: "#F46800",
    icon: <Activity className="w-5 h-5" />,
    description:
      "Plataforma de visualización para dashboards interactivos que muestran métricas de negocio y rendimiento del sistema",
  },
  {
    name: "ELK Stack",
    color: "#005571",
    icon: <Eye className="w-5 h-5" />,
    description:
      "Elasticsearch, Logstash y Kibana para centralización, procesamiento y análisis avanzado de logs distribuidos",
  },
  {
    name: "Outbox Pattern",
    color: "#17A2B8",
    icon: <Package className="w-5 h-5" />,
    description:
      "Garantiza consistencia eventual entre servicios almacenando eventos y cambios de estado en la misma transacción local",
  },
  {
    name: "Circuit Breaker",
    color: "#FFC107",
    icon: <AlertTriangle className="w-5 h-5" />,
    description:
      "Patrón de tolerancia a fallos que previene cascadas de errores y permite recuperación automática de servicios",
  },
  {
    name: "HashiCorp Vault",
    color: "#DC38AA",
    icon: <Key className="w-5 h-5" />,
    description:
      "Gestión segura de secretos, tokens y certificados con rotación automática en entornos distribuidos",
  },
];

export const microservicesPortfolioImagesTwiter: PortfolioImage[] = [
  {
    src: "https://github.com/Solano204/Images/blob/main/big_picture.jpg?raw=true",
    alt: "Complete system architecture showing all microservices and their interactions",
    title: "Visión General de la Arquitectura del Sistema",
    description:
      "Vista de alto nivel de todo el ecosistema de microservicios y las relaciones entre componentes",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/Imagen%20de%20WhatsApp%202025-06-10%20a%20las%2010.47.07_036974e1.jpg?raw=true",
    alt: "Detailed flow diagram showing request processing through microservices",
    title: "Diagrama de Flujo de la Arquitectura",
    description:
      "Flujo de solicitudes y pipeline de procesamiento de datos a través de servicios distribuidos",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/Interface.jpg?raw=true",
    alt: "Twitter-like interface where users can view and interact with messages",
    title: "Interfaz del Cliente (Dashboard de Redes Sociales)",
    description:
      "Interfaz de usuario tipo Twitter para visualizar e interactuar con mensajes",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/dependency-graph.png?raw=true",
    alt: "Visual representation of Maven project dependencies and module relationships",
    title: "Gráfico de Dependencias de Maven",
    description:
      "Estructura de dependencias del proyecto e interdependencias entre módulos",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/docker.jpg?raw=true",
    alt: "All microservices running in Docker containers",
    title: "Visión General de Servicios Docker",
    description:
      "Vista del despliegue y orquestación de servicios en contenedores",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/tracinQuery.jpg?raw=true",
    alt: "Zipkin interface for querying and analyzing distributed traces",
    title: "Interfaz de Consulta de Trazabilidad Zipkin",
    description:
      "Dashboard de consulta de trazabilidad distribuida para monitoreo de rendimiento",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/ziopWeb.jpg?raw=true",
    alt: "Zipkin web interface showing trace analysis and service dependencies",
    title: "Dashboard Web de Zipkin",
    description:
      "Dashboard de trazabilidad basado en web con visualización de dependencias de servicios",
  },
];