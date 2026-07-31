// Vitest 전역 설정 — jest-dom 커스텀 매처(toBeInTheDocument 등) 등록
import "@testing-library/jest-dom/vitest";

// jsdom은 HTMLDialogElement.showModal/close를 구현하지 않는다(open 속성도 안 바뀜).
// <dialog> 모달 테스트가 실제 open 상태 토글에 의존하므로 최소 폴리필을 추가한다.
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
}
