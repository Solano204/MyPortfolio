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
export const microservicesTechnologiesOrder: Technology[] = [
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
    name: "SAGA Pattern",
    color: "#FF6B35",
    icon: <RefreshCw className="w-5 h-5" />,
    description:
      "Patrón de transacciones distribuidas que coordina múltiples servicios con compensación automática en caso de fallos",
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
];

export const sagaPatternPortfolioImagesOrder: PortfolioImage[] = [
  {
    src: "https://github.com/Solano204/Images/blob/main/saga-2%20(3).png?raw=true",
    alt: "Complete microservices architecture implementing Saga pattern for distributed transactions",
    title: "Arquitectura Completa del Proyecto (Patrón Saga)",
    description:
      "Arquitectura de extremo a extremo que muestra el patrón de orquestación Saga para la gestión de transacciones distribuidas",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/change-data-capture-debezium%20(2).png?raw=true",
    alt: "Debezium connectors architecture for change data capture and event streaming",
    title: "Arquitectura de Captura de Cambios de Datos con Debezium",
    description:
      "Implementación de CDC con Debezium para streaming de datos en tiempo real y arquitectura basada en eventos",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/order-request-simple-flow%20(1).png?raw=true",
    alt: "Simplified order service request processing flow diagram",
    title: "Flujo de Solicitudes del Servicio de Pedidos",
    description:
      "Flujo de trabajo del procesamiento de pedidos mostrando el manejo de solicitudes y la ejecución de lógica de negocio",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/outbox%20(2).png?raw=true",
    alt: "Outbox pattern implementation for reliable event publishing",
    title: "Implementación del Patrón Outbox",
    description:
      "Patrón outbox transaccional que garantiza la publicación confiable de eventos y la consistencia de datos",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/outbox-cdc%20(2).png?raw=true",
    alt: "Outbox pattern integrated with Debezium for automated event streaming",
    title: "Patrón Outbox con Integración de Debezium",
    description:
      "Patrón outbox mejorado que aprovecha Debezium CDC para captura y streaming automático de eventos",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/outbox-happy-flow%20(2).png?raw=true",
    alt: "Complete system flow showing successful transaction processing with Saga, Outbox, and Debezium",
    title: "Flujo Completo del Sistema (Escenario Exitoso)",
    description:
      "Flujo de transacción exitosa de extremo a extremo integrando orquestación Saga, patrón Outbox y Debezium CDC",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/outbox-payment-failure.png?raw=true",
    alt: "Complete system flow demonstrating compensation handling when payment fails",
    title: "Flujo del Sistema con Manejo de Fallas de Pago",
    description:
      "Escenario de falla que demuestra las transacciones de compensación Saga y los mecanismos de resistencia del sistema",
  },
];
