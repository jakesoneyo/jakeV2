import type { SkillCategory } from "../types";

/**
 * 핵심 역량 태그. 완성 포트폴리오 프로젝트(linkstash-ai, pingboard, SiteScope, 스트롱쌀롱, study-fine)에서
 * 실제로 쓴 스택을 반영해 갱신함. 카테고리 내 정렬은 프레임워크/플랫폼(큰 것) → 개별 라이브러리(작은 것) 순.
 * Backend가 실제 주력 분야 — Skills 컴포넌트에서 강조(★) 처리.
 * study-fine으로 Java·Spring 생태계(Spring Boot/Security/Data JPA, Flyway, Maven) 추가.
 */
export const skills: SkillCategory[] = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Zod",
      "Axios",
      "Recharts",
      "Flutter",
      "Riverpod",
      "go_router",
    ],
  },
  {
    label: "Backend",
    items: [
      "NestJS",
      "Express",
      "Spring Boot",
      "Java",
      "TypeScript",
      "Prisma",
      "TypeORM",
      "Spring Data JPA",
      "Flyway",
      "Maven",
      "Spring Security",
      "JWT",
      "bcrypt",
      "Socket.io",
      "WebSocket",
      "class-validator",
      "Swagger",
    ],
  },
  {
    label: "Data · Deploy",
    items: [
      "PostgreSQL",
      "Neon Postgres",
      "Docker",
      "Render",
      "Vercel",
      "GitHub Actions",
      "Testcontainers",
      "CORS",
      "ExcelJS",
      "jsPDF",
    ],
  },
];
