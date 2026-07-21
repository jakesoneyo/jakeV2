import type { Project } from '../../types';

const STATUS_LABELS: Record<Project['status'], string> = {
  completed: '완료',
  'in-progress': '진행중',
  'coming-soon': '준비중',
};

/** 프로젝트 카드 1개 — 제목/설명/유형 배지/스택 pill과 optional live·repo 링크(있을 때만 렌더) */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="m-0 font-sans text-base font-semibold text-ink">{project.title}</h3>
        <span
          className="shrink-0 rounded border border-line px-2 py-0.5 text-[0.7rem] text-muted"
          aria-label={`상태: ${STATUS_LABELS[project.status]}`}
        >
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      <p className="m-0 font-sans text-sm text-ink-soft">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.types.map((type) => (
          <span key={type} className="rounded border border-accent/40 px-2 py-0.5 text-[0.72rem] text-accent">
            {type}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span key={tech} className="rounded border border-line px-2 py-0.5 text-[0.72rem] text-ink-soft">
            {tech}
          </span>
        ))}
      </div>

      {(project.liveUrl || project.repoUrl) && (
        <div className="mt-auto flex gap-3 pt-2 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent no-underline hover:brightness-110"
            >
              라이브 데모
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft no-underline hover:text-accent"
            >
              GitHub
            </a>
          )}
        </div>
      )}
    </article>
  );
}
