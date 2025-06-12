import { TiSocialGithub, TiHtml5, TiCss3, TiDatabase } from "react-icons/ti";
import {
  SiSpringboot,
  SiKubernetes,
  SiDocker,
  SiKeycloak,
  SiGraphql,
  SiRedis,
  SiMongodb,
  SiJest,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiApachekafka,
  SiAxios,
  SiRedux,
  SiReactquery,
  SiElasticsearch,
  SiJsonwebtokens,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { FaMicroscope } from "react-icons/fa";

// Define the Stack type (fixed capitalization)
export type Stack = {
  title: string;
  icon: React.ReactNode;
  category?: string; // Made optional since GitHub doesn't have a category
};export const stacksBackend: Stack[] = [
  // ===== BACKEND =====
  {
    title: "Java",
    icon: <DiJava className="text-orange-600" />,
    category: "backend",
  },
  {
    title: "Spring Boot",
    icon: <SiSpringboot className="text-green-500" />,
    category: "backend",
  },
  {
    title: "Spring Cloud",
    icon: <SiSpringboot className="text-blue-500" />,
    category: "backend",
  },
  {
    title: "Kafka",
    icon: <SiApachekafka className="text-black dark:text-white" />,
    category: "backend",
  },
  {
    title: "REST APIs",
    icon: <TiDatabase className="text-blue-300" />,
    category: "backend",
  },
  {
    title: "GraphQL",
    icon: <SiGraphql className="text-pink-500" />,
    category: "backend",
  },
  {
    title: "Microservices",
    icon: <FaMicroscope className="text-purple-500" />,
    category: "backend",
  },
  {
    title: "Async Processing",
    icon: <SiApachekafka className="text-yellow-500" />,
    category: "backend",
  },
  {
    title: "Mockito",
    icon: <FaMicroscope className="text-gray-400" />,
    category: "backend",
  },
  {
    title: "SQL",
    icon: <TiDatabase className="text-blue-500" />,
    category: "backend",
  },
  {
    title: "MongoDB",
    icon: <SiMongodb className="text-green-600" />,
    category: "backend",
  },
  {
    title: "Redis",
    icon: <SiRedis className="text-red-600" />,
    category: "backend",
  },
  // New additions
  {
    title: "Elasticsearch",
    icon: <SiElasticsearch className="text-yellow-700" />,
    category: "backend",
  },
  {
    title: "Keycloak",
    icon: <SiKeycloak className="text-blue-600" />,
    category: "backend",
  },
  {
    title: "JWT",
    icon: <SiJsonwebtokens className="text-purple-600" />,
    category: "backend",
  },
]

export const stacksFrontend: Stack[] = [
  // ===== FRONTEND =====
  {
    title: "React",
    icon: <SiReact className="text-blue-500" />,
    category: "frontend",
  },
  {
    title: "Next.js",
    icon: <SiNextdotjs className="text-black dark:text-white" />,
    category: "frontend",
  },
  {
    title: "TypeScript",
    icon: <SiTypescript className="text-blue-600" />,
    category: "frontend",
  },
  {
    title: "Tailwind CSS",
    icon: <SiTailwindcss className="text-cyan-400" />,
    category: "frontend",
  },
  {
    title: "HTML5",
    icon: <TiHtml5 className="text-orange-500" />,
    category: "frontend",
  },
  {
    title: "CSS3",
    icon: <TiCss3 className="text-blue-400" />,
    category: "frontend",
  },
  {
    title: "Jest",
    icon: <SiJest className="text-red-700" />,
    category: "frontend",
  },
  // New additions
  {
    title: "Axios",
    icon: <SiAxios className="text-purple-600" />, // You'll need to import SiAxios
    category: "frontend",
  },
  {
    title: "React Query",
    icon: <SiReactquery className="text-red-500" />, // Alternative icon
    category: "frontend",
  },
  {
    title: "Redux",
    icon: <SiRedux className="text-purple-500" />, // You'll need to import SiRedux
    category: "frontend",
  },
]

export const stacksDevOps: Stack[] = [
  // ===== DEVOPS =====
  {
    title: "Docker",
    icon: <SiDocker className="text-blue-400" />,
    category: "devops",
  },
  {
    title: "Kubernetes",
    icon: <SiKubernetes className="text-blue-600" />,
    category: "devops",
  },
  {
    title: "Keycloak",
    icon: <SiKeycloak className="text-blue-800" />,
    category: "devops",
  },
  {
    title: "GitHub",
    icon: <TiSocialGithub className="text-black dark:text-white" />,
    // No category since it was commented out in original
  },
];


