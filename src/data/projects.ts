import type { Project } from '../types';

/**
 * 포트폴리오 프로젝트 목록 — 이 배열이 유일한 카드 데이터 소스다(ARCHITECTURE.md 3.1).
 * 새 프로젝트가 완성되면 아래 배열에 객체 하나만 추가한다. 컴포넌트/타입 수정 불필요.
 *
 * 예시:
 * {
 *   slug: 'url-shortener',
 *   title: 'URL Shortener',
 *   description: '단축 URL 발급·리다이렉트·클릭 통계 API.',
 *   types: ['외부API', '데이터/알고리즘'],
 *   stack: ['NestJS', 'Prisma', 'Neon Postgres', 'Redis'],
 *   status: 'completed',
 *   liveUrl: 'https://...',
 *   repoUrl: 'https://github.com/jakesoneyo/...',
 * },
 */
export const projects: Project[] = [];
