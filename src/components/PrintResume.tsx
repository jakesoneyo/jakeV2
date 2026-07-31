import { profile } from "../data/profile";
import { skills } from "../data/skills";
import { projects } from "../data/projects";

/**
 * 브라우저 인쇄(Cmd+P) 전용 이력서 뷰.
 * 화면에서는 항상 숨겨져 있고(`hidden`) 인쇄 미디어에서만 노출된다(`print:block`).
 * 콘텐츠는 profile/skills/projects 데이터를 그대로 재사용한다 — 중복 작성 금지(ponytail).
 * 인쇄물은 클릭이 안 되므로 링크는 앵커 텍스트 자체에 URL을 노출한다.
 */
export function PrintResume() {
  return (
    <div className="hidden bg-white p-0 text-black print:block">
      <header className="mb-6 border-b border-black/20 pb-4">
        <h1 className="m-0 text-2xl font-bold">{profile.name}</h1>
        <p className="m-0 mt-1 text-sm text-black/70">{profile.tagline}</p>
        <p className="m-0 mt-2 text-xs text-black/70">
          {profile.phone} · email: {profile.email} · github: {profile.github}
        </p>
      </header>

      <section className="mb-6">
        <h2 className="m-0 mb-2 text-sm font-semibold uppercase tracking-wide text-black/60">
          소개
        </h2>
        <p className="m-0 text-sm leading-relaxed">{profile.intro}</p>
      </section>

      <section className="mb-6">
        <h2 className="m-0 mb-2 text-sm font-semibold uppercase tracking-wide text-black/60">
          핵심역량
        </h2>
        <dl className="m-0">
          {skills.map((category) => (
            <div key={category.label} className="mb-1.5 flex gap-2 text-sm">
              <dt className="w-28 shrink-0 font-medium">{category.label}</dt>
              <dd className="m-0">{category.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="m-0 mb-2 text-sm font-semibold uppercase tracking-wide text-black/60">
          프로젝트
        </h2>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <article key={project.slug} className="break-inside-avoid">
              <h3 className="m-0 text-base font-semibold">{project.title}</h3>
              <p className="m-0 mt-0.5 text-sm leading-relaxed">
                {project.description}
              </p>
              <p className="m-0 mt-0.5 text-xs text-black/70">
                스택: {project.stack.join(", ")}
              </p>
              {project.troubleshooting && (
                <p className="m-0 mt-0.5 text-xs leading-relaxed text-black/70">
                  트러블슈팅: {project.troubleshooting}
                </p>
              )}
              {(project.liveUrl || project.repoUrl) && (
                <p className="m-0 mt-0.5 text-xs text-black/70">
                  {project.liveUrl && <>라이브: {project.liveUrl} </>}
                  {project.repoUrl && <>GitHub: {project.repoUrl}</>}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
