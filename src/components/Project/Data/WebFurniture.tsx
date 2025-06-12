import { PortfolioImage, Technology } from '../page';
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
  Image,
  Code,
  Palette,
  Settings,
  Hash,
  FileText,
  Download,
  Eye,
  Sparkles
} from 'lucide-react';

// Tecnologías utilizadas en la Aplicación Full-Stack de E-commerce
export const ecommerceTechnologies: Technology[] = [
  {
    name: "Next.js 15",
    color: "#DC38AA",
    icon: <Globe className="w-5 h-5" />,
    description: "Me permitió implementar renderizado del lado del servidor y generación estática para óptimo rendimiento, optimización SEO y desarrollo full-stack fluido"
  },
  {
    name: "React 19",
    color: "#61DAFB",
    icon: <Code className="w-5 h-5" />,
    description: "Aproveché las últimas características concurrentes y rendimiento mejorado para construir interfaces de usuario responsivas y dinámicas con actualizaciones en tiempo real"
  },
  {
    name: "Spring Boot",
    color: "#6DB33F",
    icon: <Layers className="w-5 h-5" />,
    description: "Me proporcionó una base robusta para construir servicios backend escalables con auto-configuración y capacidades de servidor embebido"
  },
  {
    name: "Spring WebFlux",
    color: "#6DB33F",
    icon: <Zap className="w-5 h-5" />,
    description: "Implementé patrones de programación reactiva para operaciones no bloqueantes y asíncronas, asegurando alta escalabilidad y rendimiento"
  },
  {
    name: "Spring Security",
    color: "#6DB33F",
    icon: <Shield className="w-5 h-5" />,
    description: "Aseguré la aplicación con autenticación integral, autorización y protección contra vulnerabilidades de seguridad comunes"
  },
  {
    name: "GraphQL",
    color: "#E10098",
    icon: <GitBranch className="w-5 h-5" />,
    description: "Optimicé la obtención de datos permitiendo que los clientes soliciten exactamente lo que necesitan, reduciendo sobre-consultas y mejorando el rendimiento"
  },
  {
    name: "Apollo Client",
    color: "#311C87",
    icon: <Server className="w-5 h-5" />,
    description: "Gestioné estado complejo y operaciones GraphQL con caché inteligente, actualizaciones en tiempo real y patrones de UI optimista"
  },
  {
    name: "JWT",
    color: "#DC38AA",
    icon: <Key className="w-5 h-5" />,
    description: "Implementé un sistema de autenticación sin estado y seguro que permite sesiones de usuario escalables y autorización entre servicios"
  },
  {
    name: "Tailwind CSS",
    color: "#06B6D4",
    icon: <Palette className="w-5 h-5" />,
    description: "Aceleré el desarrollo de UI con enfoque utility-first, asegurando diseño responsivo consistente en todos los dispositivos"
  },
  {
    name: "Prisma",
    color: "#2D3748",
    icon: <Database className="w-5 h-5" />,
    description: "Me proporcionó operaciones de base de datos type-safe, migraciones automatizadas e integración ORM fluida para gestión confiable de datos"
  },
  {
    name: "MongoDB",
    color: "#47A248",
    icon: <Database className="w-5 h-5" />,
    description: "Manejé almacenamiento flexible de documentos para reseñas, favoritos y datos de usuario con esquemas dinámicos y consultas rápidas"
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    icon: <Database className="w-5 h-5" />,
    description: "Aseguré cumplimiento ACID y fuerte consistencia para datos transaccionales críticos como carrito de compras y gestión de pedidos"
  },
  {
    name: "PostgREST",
    color: "#336791",
    icon: <Settings className="w-5 h-5" />,
    description: "Habilitó generación de API en tiempo real desde el esquema PostgreSQL, proporcionando endpoints RESTful instantáneos para integración frontend"
  },
  {
    name: "Supabase",
    color: "#3ECF8E",
    icon: <Cloud className="w-5 h-5" />,
    description: "Me entregó almacenamiento escalable de archivos para imágenes de productos y perfiles de usuario con integración CDN y optimización automática"
  },
  {
    name: "Shadcn/ui",
    color: "#DC38AA",
    icon: <Package className="w-5 h-5" />,
    description: "Aceleré el desarrollo con componentes pre-construidos y accesibles asegurando sistema de diseño consistente y experiencia de usuario"
  },
  {
    name: "React Icons",
    color: "#61DAFB",
    icon: <Eye className="w-5 h-5" />,
    description: "Mejoré la interfaz de usuario con biblioteca integral de iconos, mejorando la comunicación visual y navegación del usuario"
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    icon: <Code className="w-5 h-5" />,
    description: "Lenguaje de programación principal que me permitió funcionalidad dinámica, interacciones del lado del cliente y experiencias de usuario fluidas"
  },
  {
    name: "Animations-React",
    color: "#FF6B6B",
    icon: <Sparkles className="w-5 h-5" />,
    description: "Creé interacciones de usuario suaves y atractivas con animaciones performantes que mejoran la experiencia general del usuario y el pulido de la interfaz"
  }
];





  
  export const portfolioImagesFurniture: PortfolioImage[] = [
    {
      src: "https://raw.githubusercontent.com/Solano204/Images/0aba312ff04730ee63eb081d46fe4e8f31e82a0f/Captura%20de%20pantalla%202025-01-27%20182619.png",
      alt: "Main store page showing product categories and featured items",
      title: "Main Store Interface",
      description: "Interfaz principal de la tienda mostrando categorías de productos y artículos destacados"
    },
    {
      src: "https://raw.githubusercontent.com/Solano204/Images/0aba312ff04730ee63eb081d46fe4e8f31e82a0f/Captura%20de%20pantalla%202025-01-27%20182830.png",
      alt: "Detailed product view with description, price and add to cart button",
      title: "Product Details",
      description: "Vista detallada del producto con descripción, precio y botón de agregar al carrito"
    },
    {
      src: "https://raw.githubusercontent.com/Solano204/Images/0aba312ff04730ee63eb081d46fe4e8f31e82a0f/Captura%20de%20pantalla%202025-01-27%20182953.png",
      alt: "Grid view of all available products with filters",
      title: "Product Catalog",
      description: "Vista en cuadrícula de todos los productos disponibles con filtros"
    },
    {
      src: "https://raw.githubusercontent.com/Solano204/Images/0aba312ff04730ee63eb081d46fe4e8f31e82a0f/Captura%20de%20pantalla%202025-01-27%20183146.png",
      alt: "Shopping cart page showing selected items and checkout button",
      title: "Shopping Cart",
      description: "Página del carrito de compras mostrando artículos seleccionados y botón de checkout"
    },
    {
      src: "https://raw.githubusercontent.com/Solano204/Images/0aba312ff04730ee63eb081d46fe4e8f31e82a0f/Captura%20de%20pantalla%202025-01-27%20183255.png",
      alt: "User's order history with status and dates",
      title: "Order History",
      description: "Historial de pedidos del usuario con estado y fechas"
    },
    {
      src: "https://raw.githubusercontent.com/Solano204/Images/0aba312ff04730ee63eb081d46fe4e8f31e82a0f/Captura%20de%20pantalla%202025-01-27%20183333.png",
      alt: "Admin dashboard showing sales analytics",
      title: "Admin Sales Dashboard",
      description: "Panel de administración mostrando análisis de ventas"
    },
    {
      src: "https://raw.githubusercontent.com/Solano204/Images/0aba312ff04730ee63eb081d46fe4e8f31e82a0f/Captura%20de%20pantalla%202025-01-27%20183709.png",
      alt: "Admin product management interface",
      title: "Product Management",
      description: "Interfaz de gestión de productos para administradores"
    },
    {
      src: "https://raw.githubusercontent.com/Solano204/Images/0aba312ff04730ee63eb081d46fe4e8f31e82a0f/Captura%20de%20pantalla%202025-01-27%20183835.png",
      alt: "Form for adding/editing products",
      title: "Product Form",
      description: "Formulario para agregar/editar productos"
    },
    {
      src: "https://github.com/Solano204/Images/blob/main/show%20list%20of%20views0.png?raw=true",
      alt: "Customer review section",
      title: "Product Reviews",
      description: "Sección de reseñas de clientes"
    },
    {
      src: "https://github.com/Solano204/Images/blob/main/my%20rese%C3%A1s.png?raw=true",
      alt: "User's favorite products list",
      title: "Favorites List",
      description: "Lista de productos favoritos del usuario"
    }
  ];