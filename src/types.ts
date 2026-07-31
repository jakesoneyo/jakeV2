/**
 * 포트폴리오 허브 전역 타입 정의.
 * ARCHITECTURE.md 3장 스키마 그대로 — 카드를 그리는 데 실제로 필요한 필드만 둔다(ponytail).
 */

/** 프로젝트 유형 태그. 포폴 워크스페이스 다양성 태그 체계와 동일 */
export type ProjectType =
  "CRUD" | "실시간" | "데이터/알고리즘" | "외부API" | "인증/보안";

/** 카드 표시 상태. 데이터가 채워지기 전에는 'coming-soon' */
export type ProjectStatus = "completed" | "in-progress" | "coming-soon";

/** projects.ts 데이터 배열의 항목 하나가 카드 하나에 대응된다 */
export interface Project {
  /** 안정적 key (예: 'url-shortener') */
  slug: string;
  title: string;
  /** 카드용 1~2문장 요약 */
  description: string;
  /** 유형 배지 — 다양성 근거를 시각적으로 노출 */
  types: ProjectType[];
  stack: string[];
  status: ProjectStatus;
  /** 있을 때만 버튼 렌더 */
  liveUrl?: string;
  /** liveUrl 앵커 텍스트 오버라이드. 기본값 "사이트 바로가기" — 웹사이트가 아닌 링크(예: 모바일 앱 APK)에 사용 */
  primaryLinkLabel?: string;
  /** 있을 때만 버튼 렌더 */
  repoUrl?: string;
  /** 카드에 노출할 트러블슈팅 한 줄 요약 — 실제 개발 과정에서 겪은 문제와 해결 (다른 프로젝트와 겹치지 않는 이야기) */
  troubleshooting?: string;
  /** 있으면 앱 마운트 시 fire-and-forget으로 호출해 Render 콜드스타트를 미리 깨운다 */
  apiHealthUrl?: string;
  /** 있으면 카드에 "자세히 보기" 버튼을 렌더 — 클릭 시 모달로 상세 소개·구현 내용을 보여준다 */
  detail?: ProjectDetail;
}

/** 카드의 "자세히 보기" 모달에서 노출되는 상세 정보 */
export interface ProjectDetail {
  /** 확장 시 노출되는 상세 소개 (2~4문장) */
  intro: string;
  /** 주요 구현 내용 — 불릿 리스트 */
  highlights: string[];
}

/** Skills 섹션의 카테고리 그룹 */
export interface SkillCategory {
  label: "Frontend" | "Backend" | "Data · Deploy";
  items: string[];
}

/** Hero/Contact/Footer가 공유하는 프로필 정보 */
export interface Profile {
  name: string;
  /** 한 줄 소개 */
  tagline: string;
  /** 문단형 자기소개 */
  intro: string;
  email: string;
  phone: string;
  /** URL */
  github: string;
}
