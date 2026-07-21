import type { SkillCategory } from '../types';

/**
 * 핵심 역량 태그. PDF 원본의 카테고리·항목을 그대로 유지(왜곡 금지).
 * Backend가 실제 주력 분야 — Skills 컴포넌트에서 강조(★) 처리.
 */
export const skills: SkillCategory[] = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Flutter', 'Riverpod', 'go_router'],
  },
  {
    label: 'Backend',
    items: ['Express', 'NestJS', 'TypeScript', 'JWT', 'bcrypt', 'Swagger', 'WebSocket'],
  },
  {
    label: 'Data · Deploy',
    items: ['PostgreSQL', 'Render', 'Vercel', 'CORS', 'ExcelJS', 'jsPDF'],
  },
];
