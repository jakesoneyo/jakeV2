import { projects } from "../data/projects";

/**
 * Render 무료 티어 백엔드는 15분 이상 유휴 시 콜드스타트(22~54초)가 걸린다.
 * 방문자가 실제로 로그인 버튼을 누르기 전에 미리 헬스체크 요청을 흘려보내
 * 그 시간을 벌어두기 위한 fire-and-forget 프리워밍. 응답 내용은 관심 없고
 * 요청 자체가 목적이므로, 실패/타임아웃/CORS 에러는 화면에 영향 없이 조용히 무시한다.
 */
export function prewarmBackends(): void {
  for (const project of projects) {
    if (!project.apiHealthUrl) continue;
    fetch(project.apiHealthUrl, { mode: "no-cors" }).catch(() => {
      // 콜드스타트를 깨우는 것이 목적이라 실패해도 무시한다.
    });
  }
}
