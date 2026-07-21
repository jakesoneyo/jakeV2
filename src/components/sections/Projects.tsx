import { projects } from '../../data/projects';
import { SectionHead } from './SectionHead';
import { ProjectCard } from './ProjectCard';

/**
 * projects.ts를 그대로 map한 카드 그리드 — 하드코딩 카드 없음(SPEC 성공 기준).
 * 배열이 비어 있으면 "포트폴리오 프로젝트 준비 중" 빈 상태를 렌더한다.
 */
export function Projects() {
  const hasProjects = projects.length > 0;

  return (
    <section id="projects" className="border-b border-line py-16 sm:py-20" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHead path="~/projects" heading="프로젝트" headingId="projects-heading" />

        {hasProjects ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

/** 프로젝트 데이터가 아직 없을 때의 안내 카드 */
function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-line px-6 py-14 text-center sm:py-16">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="mx-auto mb-4 h-8 w-8 text-muted"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
      <h3 className="m-0 mb-1 font-sans text-base font-semibold text-ink">포트폴리오 프로젝트 준비 중</h3>
      <p className="m-0 text-sm text-muted">새 프로젝트가 완성되는 대로 이곳에 추가됩니다.</p>
    </div>
  );
}
