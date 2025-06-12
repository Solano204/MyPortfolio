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
  Image,
  Code,
  Palette,
  Settings,
  Hash,
  FileText,
  Download,
  Eye,
  Sparkles,
  MessageSquare,
  Activity,
  Lock,
  Search,
  BarChart3,
  Timer,
  Users,
  Cpu,
  Network,
} from "lucide-react";
export const fut7Technologies: Technology[] = [
  {
    name: "Next.js 15",
    color: "#DC38AA",
    icon: <Globe className="w-5 h-5" />,
    description:
      "Framework full-stack con renderizado del lado del servidor, generación estática y capacidades de desarrollo full-stack para máximo rendimiento y SEO",
  },
  {
    name: "React 19",
    color: "#61DAFB",
    icon: <Code className="w-5 h-5" />,
    description:
      "La última versión de React con características concurrentes y rendimiento mejorado para interfaces de usuario dinámicas",
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    icon: <FileText className="w-5 h-5" />,
    description:
      "Sistema de tipado fuerte que mejora la calidad del código, la mantenibilidad y la experiencia de desarrollo",
  },
  {
    name: "Spring Boot",
    color: "#6DB33F",
    icon: <Layers className="w-5 h-5" />,
    description:
      "Framework backend robusto para servicios escalables con auto-configuración y servidor embebido",
  },
  {
    name: "Spring WebFlux",
    color: "#6DB33F",
    icon: <Zap className="w-5 h-5" />,
    description:
      "Programación reactiva para operaciones asíncronas no bloqueantes, asegurando alta escalabilidad",
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    icon: <Database className="w-5 h-5" />,
    description:
      "Base de datos relacional avanzada con procedimientos almacenados, vistas especializadas y lógica de negocio compleja",
  },
  {
    name: "Supabase",
    color: "#3ECF8E",
    icon: <Server className="w-5 h-5" />,
    description:
      "Plataforma Backend-as-a-Service con base de datos en tiempo real, autenticación e infraestructura escalable",
  },
  {
    name: "Redux Toolkit",
    color: "#764ABC",
    icon: <Settings className="w-5 h-5" />,
    description:
      "Gestión de estado para aplicaciones complejas con actualizaciones predecibles y depuración avanzada",
  },
  {
    name: "React Query",
    color: "#FF4154",
    icon: <Activity className="w-5 h-5" />,
    description:
      "Biblioteca para fetching de datos con caché, actualizaciones optimistas y sincronización en segundo plano",
  },
  {
    name: "Tailwind CSS v4",
    color: "#06B6D4",
    icon: <Palette className="w-5 h-5" />,
    description:
      "Framework CSS utility-first para desarrollo rápido de UI con diseño consistente y responsive",
  },
  {
    name: "shadcn/ui",
    color: "#DC38AA",
    icon: <Sparkles className="w-5 h-5" />,
    description:
      "Biblioteca de componentes accesibles con soporte para temas oscuro/claro y sistema de diseño moderno",
  },
  {
    name: "GSAP",
    color: "#88CE02",
    icon: <Eye className="w-5 h-5" />,
    description:
      "Biblioteca profesional de animaciones para efectos 3D, transiciones fluidas y experiencias interactivas",
  },
  {
    name: "JWT + Cookies",
    color: "#DC38AA",
    icon: <Lock className="w-5 h-5" />,
    description:
      "Sistema de autenticación seguro usando JSON Web Tokens con cookies httpOnly para máxima seguridad",
  },
  {
    name: "Docker",
    color: "#2496ED",
    icon: <Package className="w-5 h-5" />,
    description:
      "Plataforma de contenedores para entornos de despliegue consistentes y arquitectura escalable",
  },
  {
    name: "Git/GitHub",
    color: "#F05032",
    icon: <GitBranch className="w-5 h-5" />,
    description:
      "Sistema de control de versiones con pipelines CI/CD automatizadas para flujos de trabajo eficientes",
  },
];

export const ManagementPortfolioImagesSoccer: PortfolioImage[] = [
  // Autenticación y Gestión de Usuarios
  {
    src: "https://github.com/Solano204/Images/blob/main/HI.jpg?raw=true",
    alt: "Home page of the sports management application",
    title: "Página de Inicio",
    description:
      "Página principal de la aplicación de gestión deportiva con interfaz de bienvenida",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/Logo.jpg?raw=true",
    alt: "Login page interface",
    title: "Inicio de Sesión",
    description:
      "Interfaz de inicio de sesión para usuarios del sistema de gestión deportiva",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/SiO.jpg?raw=true",
    alt: "User registration form",
    title: "Registro de Usuario",
    description: "Formulario de registro para nuevos usuarios en el sistema",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/chnageinfoO.jpg?raw=true",
    alt: "User information change form",
    title: "Cambiar Información Personal",
    description: "Formulario para modificar información personal del usuario",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/cUsu.jpg?raw=true",
    alt: "Username change interface",
    title: "Cambiar Nombre de Usuario",
    description: "Interfaz para modificar el nombre de usuario en el sistema",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/ChangePassworOscu.jpg?raw=true",
    alt: "Password change form",
    title: "Cambiar Contraseña",
    description: "Formulario seguro para cambio de contraseña del usuario",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/changephotousuarios.jpg?raw=true",
    alt: "User photo change interface",
    title: "Cambiar Foto de Perfil",
    description: "Interfaz para actualizar la foto de perfil del usuario",
  },

  // Dashboard y Categorías
  {
    src: "https://github.com/Solano204/Images/blob/main/CategoriesHero.jpg?raw=true",
    alt: "Dashboard showing different categories",
    title: "Dashboard de Categorías",
    description:
      "Panel principal mostrando las diferentes categorías deportivas disponibles",
  },

  // Gestión de Equipos
  {
    src: "https://github.com/Solano204/Images/blob/main/OscuequClaro.jpg?raw=true",
    alt: "Dashboard displaying all teams",
    title: "Vista General de Equipos",
    description:
      "Dashboard que muestra todos los equipos registrados en el sistema",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/OscurtoFormNumfORMEQUIPOSJU.jpg?raw=true",
    alt: "Form for creating a new team",
    title: "Formulario de Creación de Equipo",
    description:
      "Formulario para crear y registrar un nuevo equipo en el sistema",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/OsJugadoresCla.jpg?raw=true",
    alt: "Team information view with players list",
    title: "Detalles del Equipo y Jugadores",
    description:
      "Vista detallada del equipo con información y lista de jugadores",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/inforFOMROIS.jpg?raw=true",
    alt: "Player information edit form",
    title: "Formulario de Edición de Jugador",
    description:
      "Formulario para editar información personal y deportiva de jugadores",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/OscJugadoresCla2.jpg?raw=true",
    alt: "Team management action buttons",
    title: "Panel de Acciones del Equipo",
    description:
      "Panel con botones de acción para gestión y administración de equipos",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/OscJugadoresClaTabaEQUIPO,jpg.jpg?raw=true",
    alt: "Team positions table",
    title: "Tabla de Posiciones de Equipos",
    description:
      "Tabla clasificatoria mostrando posiciones y estadísticas de equipos",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/positionPlayer.jpg?raw=true",
    alt: "Player positions table",
    title: "Tabla de Posiciones de Jugadores",
    description:
      "Ranking y estadísticas individuales de jugadores por posición",
  },

  // Calendario y Gestión de Partidos
  {
    src: "https://github.com/Solano204/Images/blob/main/agendaOscur.jpg?raw=true",
    alt: "Admin agenda interface header",
    title: "Encabezado de Agenda Administrativa",
    description:
      "Interfaz superior de la agenda administrativa para gestión de partidos",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/2agendaOscur.jpg?raw=true",
    alt: "Match information in agenda",
    title: "Información de Partidos",
    description: "Vista de información detallada de partidos en la agenda",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/SELECCIONADO2agendaOscur.jpg?raw=true",
    alt: "Selected match display",
    title: "Vista de Partido Seleccionado",
    description:
      "Visualización de partido seleccionado con información destacada",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/INFOSELECCIONADO2agendaOscur.jpg?raw=true",
    alt: "Detailed information of selected match",
    title: "Detalles del Partido Seleccionado",
    description: "Información detallada y completa del partido seleccionado",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/PARTIDOSELECCIONINFOSELECCIONADO2agendaOscur.jpg?raw=true",
    alt: "Admin agenda bottom section",
    title: "Pie de Agenda Administrativa",
    description:
      "Sección inferior de la agenda administrativa con controles adicionales",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/SELECCIONINFOSELECCIONADO2agendaOscur.jpg?raw=true",
    alt: "Match selection information panel",
    title: "Panel de Selección de Partidos",
    description: "Panel informativo para selección y gestión de partidos",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/TABLAPARTIDOSELECCIONINFOSELECCIONADO2agendaOscur.jpg?raw=true",
    alt: "Match results table for admin",
    title: "Tabla de Resultados de Partidos",
    description:
      "Tabla administrativa con resultados y estadísticas de partidos",
  },

  // Gestión de Categorías
  {
    src: "https://github.com/Solano204/Images/blob/main/CAATEG.jpg?raw=true",
    alt: "Categories management table",
    title: "Tabla de Gestión de Categorías",
    description: "Tabla administrativa para gestionar categorías deportivas",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/formCAATEG.jpg?raw=true",
    alt: "Category creation/edit form",
    title: "Formulario de Categorías",
    description: "Formulario para crear y editar categorías deportivas",
  },

  // Administración de Usuarios
  {
    src: "https://github.com/Solano204/Images/blob/main/usuarios.jpg?raw=true",
    alt: "Users management table",
    title: "Tabla de Usuarios",
    description: "Tabla administrativa para gestión de usuarios del sistema",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/usuarioschangeUser.jpg?raw=true",
    alt: "User information change interface",
    title: "Cambiar Información de Usuario",
    description:
      "Interfaz administrativa para modificar información de usuarios",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/usuarioschangepass.jpg?raw=true",
    alt: "User password change form",
    title: "Cambiar Contraseña de Usuario",
    description:
      "Formulario administrativo para cambio de contraseñas de usuarios",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/editinformationusuarios.jpg?raw=true",
    alt: "User information edit form",
    title: "Editar Información de Usuario",
    description: "Formulario completo para edición de información de usuarios",
  },

  // Gestión de Deudas
  {
    src: "https://github.com/Solano204/Images/blob/main/deudaspl.jpg?raw=true",
    alt: "Player debts management table",
    title: "Tabla de Deudas de Jugadores",
    description: "Tabla para gestión y seguimiento de deudas de jugadores",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/deudasplayerform.jpg?raw=true",
    alt: "Player debt creation form",
    title: "Formulario de Deuda de Jugador",
    description: "Formulario para registrar nuevas deudas de jugadores",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/equopo.jpg?raw=true",
    alt: "Team debts management table",
    title: "Tabla de Deudas de Equipos",
    description: "Tabla administrativa para gestión de deudas de equipos",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/deudadfromequopo.jpg?raw=true",
    alt: "Team debt creation form",
    title: "Formulario de Deuda de Equipo",
    description: "Formulario para registrar y gestionar deudas de equipos",
  },

  // Inscripciones y Árbitros
  {
    src: "https://github.com/Solano204/Images/blob/main/inscripcion.jpg?raw=true",
    alt: "Inscriptions management table",
    title: "Tabla de Inscripciones",
    description: "Tabla para gestión de inscripciones de equipos y jugadores",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/forminscripcion.jpg?raw=true",
    alt: "Inscription creation form",
    title: "Formulario de Inscripción",
    description: "Formulario para procesar nuevas inscripciones en el sistema",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/REFE.jpg?raw=true",
    alt: "Referees management table",
    title: "Tabla de Árbitros",
    description: "Tabla administrativa para gestión de árbitros y oficiales",
  },
  {
    src: "https://github.com/Solano204/Images/blob/main/REFERORM.jpg?raw=true",
    alt: "Referee creation/edit form",
    title: "Formulario de Árbitro",
    description:
      "Formulario para registro y edición de información de árbitros",
  },
];
