import { useId, useRef } from "react";
import type { Project } from "../../types";

const STATUS_LABELS: Record<Project["status"], string> = {
  completed: "완료",
  "in-progress": "진행중",
  "coming-soon": "준비중",
};

/**
 * 라이브/GitHub 링크 줄. 카드 앞면과 상세 모달 양쪽에서 동일한 라벨로 재사용한다.
 */
function ProjectLinks({
  project,
  className,
}: {
  project: Project;
  className: string;
}) {
  if (!project.liveUrl && !project.repoUrl) return null;

  return (
    <div className={className}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent no-underline hover:brightness-110"
        >
          사이트 바로가기 <span aria-hidden="true">↗</span>
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
  );
}

/**
 * 프로젝트 카드 1개.
 * 앞면(항상 보임): 제목/상태 배지/설명/유형 배지/스택 pill/링크.
 * `project.detail`이 있으면 "자세히 보기" 클릭 시 네이티브 `<dialog>` 모달로 상세 소개·구현 내용·
 * troubleshooting을 보여준다. 열림/닫힘은 브라우저의 showModal/close가 처리하므로 React state가 필요 없다.
 */
export function ProjectCard({ project }: { project: Project }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <article className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="m-0 font-sans text-base font-semibold text-ink">
          {project.title}
        </h3>
        <span
          className="shrink-0 rounded border border-line px-2 py-0.5 text-[0.7rem] text-muted"
          aria-label={`상태: ${STATUS_LABELS[project.status]}`}
        >
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      <p className="m-0 font-sans text-sm text-ink-soft">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.types.map((type) => (
          <span
            key={type}
            className="rounded border border-accent/40 px-2 py-0.5 text-[0.72rem] text-accent"
          >
            {type}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-line px-2 py-0.5 text-[0.72rem] text-ink-soft"
          >
            {tech}
          </span>
        ))}
      </div>

      <ProjectLinks
        project={project}
        className="mt-auto flex gap-3 pt-2 text-sm"
      />

      {project.detail && (
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          aria-haspopup="dialog"
          className="flex items-center gap-1.5 self-start font-sans text-[0.8rem] text-ink-soft hover:text-accent"
        >
          자세히 보기
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-3.5 w-3.5"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}

      {project.detail && (
        <dialog
          ref={dialogRef}
          aria-labelledby={titleId}
          onClick={(event) => {
            // dialog 자체(=패딩 영역, 시각적 backdrop)를 클릭했을 때만 닫는다.
            // 콘텐츠는 자식 div로 한 번 더 감싸져 있어 그 안 클릭은 target이 자식 div가 되므로 안 닫힌다.
            if (event.target === event.currentTarget) {
              dialogRef.current?.close();
            }
          }}
          className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-lg border border-line bg-surface p-6 max-h-[85vh] overflow-y-auto backdrop:bg-black/60"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <h3
                id={titleId}
                className="m-0 font-sans text-base font-semibold text-ink"
              >
                {project.title}
              </h3>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="닫기"
                className="shrink-0 font-sans text-base leading-none text-ink-soft hover:text-accent"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-line px-2 py-0.5 text-[0.72rem] text-ink-soft"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="m-0 font-sans text-sm text-ink-soft">
              {project.detail.intro}
            </p>

            <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 font-sans text-sm text-ink-soft">
              {project.detail.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            {project.troubleshooting && (
              <div className="rounded border border-line bg-surface-2 px-3 py-2.5">
                <span className="block font-mono text-[0.68rem] tracking-wide text-accent">
                  &gt; troubleshoot
                </span>
                <p className="m-0 mt-1 font-sans text-[0.8rem] leading-relaxed text-ink-soft">
                  {project.troubleshooting}
                </p>
              </div>
            )}

            <ProjectLinks
              project={project}
              className="flex gap-3 pt-1 text-sm"
            />
          </div>
        </dialog>
      )}
    </article>
  );
}
