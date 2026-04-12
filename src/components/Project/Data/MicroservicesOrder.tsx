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

export const microservicesTechnologiesOrder: Technology[] = [
  {
    name: "Spring Boot 3.2",
    color: "#6DB33F",
    icon: <Layers className="w-5 h-5" />,
    descriptionEs:
      "Framework empresarial principal para construir microservicios listos para producción con servidores embebidos y auto-configuración.",
    descriptionEn:
      "Main enterprise framework for building production-ready microservices with embedded servers and auto-configuration.",
  },
  {
    name: "Spring Cloud",
    color: "#6DB33F",
    icon: <Cloud className="w-5 h-5" />,
    descriptionEs:
      "Herramientas para desarrolladores que construyen patrones de sistemas distribuidos en microservicios con service discovery y circuit breakers.",
    descriptionEn:
      "Toolset for developers building distributed system patterns in microservices with service discovery and circuit breakers.",
  },
  {
    name: "Apache Kafka",
    color: "#231F20",
    icon: <MessageSquare className="w-5 h-5" />,
    descriptionEs:
      "Plataforma de streaming de eventos distribuida para procesamiento de datos en tiempo real con alta throughput y baja latencia.",
    descriptionEn:
      "Distributed event streaming platform for real-time data processing with high throughput and low latency.",
  },
  {
    name: "Java 17",
    color: "#ED8B00",
    icon: <Code className="w-5 h-5" />,
    descriptionEs:
      "Lenguaje principal con características modernas que proporciona rendimiento optimizado y sintaxis mejorada para desarrollo empresarial.",
    descriptionEn:
      "Primary language with modern features providing optimized performance and improved syntax for enterprise development.",
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    icon: <Database className="w-5 h-5" />,
    descriptionEs:
      "Base de datos relacional principal que garantiza consistencia ACID y soporte avanzado para transacciones distribuidas.",
    descriptionEn:
      "Primary relational database ensuring ACID consistency and advanced support for distributed transactions.",
  },
  {
    name: "Redis",
    color: "#DC382D",
    icon: <Zap className="w-5 h-5" />,
    descriptionEs:
      "Cache distribuido para sesiones y datos frecuentes, mejorando significativamente los tiempos de respuesta del sistema.",
    descriptionEn:
      "Distributed cache for sessions and frequently accessed data, significantly improving system response times.",
  },
  {
    name: "Docker",
    color: "#2496ED",
    icon: <Container className="w-5 h-5" />,
    descriptionEs:
      "Contenerización para desarrollo local y despliegue consistente, facilitando la portabilidad entre entornos.",
    descriptionEn:
      "Containerization for local development and consistent deployment, enabling portability across environments.",
  },
  {
    name: "Kubernetes",
    color: "#326CE5",
    icon: <Settings className="w-5 h-5" />,
    descriptionEs:
      "Orquestación para entornos productivos con escalado automático, service mesh y gestión de configuraciones.",
    descriptionEn:
      "Orchestration for production environments with automatic scaling, service mesh, and configuration management.",
  },
  {
    name: "SAGA Pattern",
    color: "#FF6B35",
    icon: <RefreshCw className="w-5 h-5" />,
    descriptionEs:
      "Patrón de transacciones distribuidas que coordina múltiples servicios con compensación automática en caso de fallos.",
    descriptionEn:
      "Distributed transaction pattern that coordinates multiple services with automatic compensation on failure.",
  },
  {
    name: "Event Sourcing",
    color: "#8E44AD",
    icon: <FileText className="w-5 h-5" />,
    descriptionEs:
      "Almacenamiento de todos los cambios como secuencia de eventos, proporcionando auditabilidad completa y capacidad de replay.",
    descriptionEn:
      "Storing all changes as a sequence of events, providing complete auditability and replay capability.",
  },
  {
    name: "CQRS",
    color: "#E74C3C",
    icon: <GitBranch className="w-5 h-5" />,
    descriptionEs:
      "Separación de Command Query Responsibility para optimizar operaciones de lectura y escritura independientemente.",
    descriptionEn:
      "Command Query Responsibility Segregation to independently optimize read and write operations.",
  },
  {
    name: "Spring Security",
    color: "#6DB33F",
    icon: <Shield className="w-5 h-5" />,
    descriptionEs:
      "Framework de seguridad robusto con autenticación JWT, autorización OAuth 2.0 y protección contra vulnerabilidades comunes.",
    descriptionEn:
      "Robust security framework with JWT authentication, OAuth 2.0 authorization, and protection against common vulnerabilities.",
  },
  {
    name: "Outbox Pattern",
    color: "#17A2B8",
    icon: <Package className="w-5 h-5" />,
    descriptionEs:
      "Garantiza consistencia eventual entre servicios almacenando eventos y cambios de estado en la misma transacción local.",
    descriptionEn:
      "Guarantees eventual consistency between services by storing events and state changes in the same local transaction.",
  },
  {
    name: "Circuit Breaker",
    color: "#FFC107",
    icon: <AlertTriangle className="w-5 h-5" />,
    descriptionEs:
      "Patrón de tolerancia a fallos que previene cascadas de errores y permite recuperación automática de servicios.",
    descriptionEn:
      "Fault tolerance pattern that prevents error cascades and allows automatic service recovery.",
  },
];

export const sagaPatternPortfolioImagesOrder: PortfolioImage[] = [
  {
    src: "https://github.com/Solano204/Images/blob/main/saga-2%20(3).png?raw=true",
    alt: "Complete microservices architecture implementing Saga pattern for distributed transactions",
    title: "Arquitectura Completa del Proyecto (Patrón Saga)",
    descriptionEs:
      "Arquitectura de extremo a extremo que muestra el patrón de orquestación Saga para la gestión de transacciones distribuidas.",
    descriptionEn:
      "End-to-end architecture showcasing the Saga orchestration pattern for distributed transaction management.",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/change-data-capture-debezium%20(2).png?raw=true",
    alt: "Debezium connectors architecture for change data capture and event streaming",
    title: "Arquitectura de Captura de Cambios de Datos con Debezium",
    descriptionEs:
      "Implementación de CDC con Debezium para streaming de datos en tiempo real y arquitectura basada en eventos.",
    descriptionEn:
      "CDC implementation with Debezium for real-time data streaming and event-driven architecture.",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/order-request-simple-flow%20(1).png?raw=true",
    alt: "Simplified order service request processing flow diagram",
    title: "Flujo de Solicitudes del Servicio de Pedidos",
    descriptionEs:
      "Flujo de trabajo del procesamiento de pedidos mostrando el manejo de solicitudes y la ejecución de lógica de negocio.",
    descriptionEn:
      "Order processing workflow showing request handling and business logic execution.",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/outbox%20(2).png?raw=true",
    alt: "Outbox pattern implementation for reliable event publishing",
    title: "Implementación del Patrón Outbox",
    descriptionEs:
      "Patrón outbox transaccional que garantiza la publicación confiable de eventos y la consistencia de datos.",
    descriptionEn:
      "Transactional outbox pattern ensuring reliable event publishing and data consistency.",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/outbox-cdc%20(2).png?raw=true",
    alt: "Outbox pattern integrated with Debezium for automated event streaming",
    title: "Patrón Outbox con Integración de Debezium",
    descriptionEs:
      "Patrón outbox mejorado que aprovecha Debezium CDC para captura y streaming automático de eventos.",
    descriptionEn:
      "Enhanced outbox pattern leveraging Debezium CDC for automatic event capture and streaming.",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/outbox-happy-flow%20(2).png?raw=true",
    alt: "Complete system flow showing successful transaction processing with Saga, Outbox, and Debezium",
    title: "Flujo Completo del Sistema (Escenario Exitoso)",
    descriptionEs:
      "Flujo de transacción exitosa de extremo a extremo integrando orquestación Saga, patrón Outbox y Debezium CDC.",
    descriptionEn:
      "End-to-end successful transaction flow integrating Saga orchestration, Outbox pattern, and Debezium CDC.",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/outbox-payment-failure.png?raw=true",
    alt: "Complete system flow demonstrating compensation handling when payment fails",
    title: "Flujo del Sistema con Manejo de Fallas de Pago",
    descriptionEs:
      "Escenario de falla que demuestra las transacciones de compensación Saga y los mecanismos de resistencia del sistema.",
    descriptionEn:
      "Failure scenario demonstrating Saga compensation transactions and system resilience mechanisms.",
  },
];