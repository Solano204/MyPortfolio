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
  Activity,
  Users,
  Settings,
  Hash,
  FileText,
  Download,
  Eye,
  Sparkles,
  Lock,
  Wifi,
  Container,
  MonitorSpeaker,
  BarChart3,
} from "lucide-react";

// Tecnologías utilizadas en el Sistema de Gestión de Gimnasios
export const gymTechnologiesMicroservices: Technology[] = [
  {
    name: "Spring Boot",
    color: "#6DB33F",
    icon: <Layers className="w-5 h-5" />,
    description:
      "Me proporcionó el framework principal para construir microservicios listos para producción con servidores embebidos y auto-configuración para todos los servicios del gimnasio",
  },
  {
    name: "Spring WebFlux",
    color: "#6DB33F",
    icon: <Zap className="w-5 h-5" />,
    description:
      "Implementé programación reactiva que me permitió manejar operaciones no bloqueantes y procesar miles de solicitudes simultáneas de miembros del gimnasio eficientemente",
  },
  {
    name: "Spring Cloud",
    color: "#6DB33F",
    icon: <Cloud className="w-5 h-5" />,
    description:
      "Me ofreció patrones de sistemas distribuidos para comunicación entre microservicios, descubrimiento de servicios y gestión de configuración centralizada",
  },
  {
    name: "MySQL con R2DBC",
    color: "#4479A1",
    icon: <Database className="w-5 h-5" />,
    description:
      "Implementé acceso reactivo a la base de datos proporcionando operaciones no bloqueantes para datos de miembros, membresías y análisis del gimnasio con rendimiento óptimo",
  },
  {
    name: "Redis",
    color: "#DC382D",
    icon: <Activity className="w-5 h-5" />,
    description:
      "Utilicé como caché distribuido y gestión de sesiones almacenando tokens JWT, datos de ocupación del gimnasio en tiempo real e información de miembros frecuentemente accedida",
  },
  {
    name: "Apache Kafka",
    color: "#231F20",
    icon: <MessageSquare className="w-5 h-5" />,
    description:
      "Plataforma de streaming de eventos que me permitió manejar eventos en tiempo real como check-ins de miembros, procesamiento de pagos y notificaciones entre microservicios",
  },
  {
    name: "Keycloak",
    color: "#4D4D4D",
    icon: <Shield className="w-5 h-5" />,
    description:
      "Implementé gestión de identidad y acceso proporcionando SSO, autenticación multifactor y control de acceso basado en roles para personal y miembros del gimnasio",
  },
  {
    name: "Eureka",
    color: "#FF6B6B",
    icon: <Wifi className="w-5 h-5" />,
    description:
      "Utilicé para descubrimiento de servicios y registro automático, habilitando registro automático, monitoreo de salud y balanceador de carga de microservicios",
  },
  {
    name: "API Gateway",
    color: "#4ECDC4",
    icon: <Globe className="w-5 h-5" />,
    description:
      "Implementé como punto de entrada unificado proporcionando enrutamiento inteligente, limitación de velocidad, manejo CORS y transformación de requests",
  },
  {
    name: "Docker",
    color: "#2496ED",
    icon: <Container className="w-5 h-5" />,
    description:
      "Plataforma de contenerización que me permitió despliegues consistentes en diferentes entornos con builds multi-etapa y optimización de recursos",
  },
  {
    name: "Kubernetes",
    color: "#326CE5",
    icon: <Settings className="w-5 h-5" />,
    description:
      "Orquestación de contenedores proporcionando auto-escalado, actualizaciones sin tiempo de inactividad y alta disponibilidad para servicios en producción",
  },
  {
    name: "Aplicación Móvil",
    color: "#FF9500",
    icon: <Smartphone className="w-5 h-5" />,
    description:
      "Desarrollé aplicación móvil nativa proporcionando acceso por código QR, reserva de clases, seguimiento de entrenamientos y notificaciones en tiempo real",
  },
  {
    name: "Maven",
    color: "#C71A36",
    icon: <Package className="w-5 h-5" />,
    description:
      "Herramienta de automatización de builds y gestión de dependencias asegurando estructura consistente del proyecto y gestión eficiente de artefactos",
  },
];

export const fitnessMicroservicesImage: PortfolioImage[] = [
  {
    src: "https://github.com/Solano204/Images/blob/main/381764723-3bd05d2a-378e-46c8-97ca-36c39a8fb7dc.png?raw=true",
    alt: "Diagrama del Flujo de Comunicación",
    title: "📊 Diagrama del Flujo de Comunicación entre Microservicios",
    description:
      "Diagrama completo que muestra la comunicación e interacción entre los diferentes microservicios del sistema",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/381764713-a1d844c7-a93d-4aeb-a7f1-d01e57bd26b8.png?raw=true",
    alt: "Diagrama de Inicio de Sesión",
    title: "🔄 Diagrama del Flujo de Inicio de Sesión",
    description:
      "Flujo detallado del proceso de autenticación y inicio de sesión de usuarios en el sistema",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/381764719-06bf340a-6001-4715-aae1-bc84c70d28f5.png?raw=true",
    alt: "Diagrama de Cierre de Sesión",
    title: "🔄 Diagrama del Flujo de Cierre de Sesión",
    description:
      "Proceso de cierre de sesión y limpieza de tokens de autenticación en la arquitectura distribuida",
  },
];