import type { Profile } from "../types";

/**
 * Hero/Contact/Footer가 공유하는 프로필 콘텐츠.
 * 실무 경험은 보안서약 때문에 회사·서비스명 없이 한 일만 적는다(상세는 Experience 섹션).
 */
export const profile: Profile = {
  name: "손영선",
  tagline:
    "요구사항 분석부터 설계·구현·연동·배포까지 아우르는 신입 풀스택 개발자",
  intro:
    "결제·인증처럼 틀리면 안 되는 백엔드를 끝까지 책임지는 신입 풀스택 개발자입니다. 최근 초기 스타트업 웹서비스를 프리랜서로 혼자 개발해, 결제 연동과 카드사 심사 통과, AWS 인프라 구축, 운영 배포까지 마치고 실결제가 오가는 서비스를 일정 내 납품했습니다. 구현 전에 중복 요청·동시성·재시도 같은 실패 상황을 먼저 정리하고, 그 결과를 실제 DB를 띄운 통합테스트로 고정합니다. 핵심 로직은 직접 설계하고 작성하며, AI 코딩 도구로 만든 코드도 한 줄씩 읽고 리뷰와 테스트로 검증한 뒤에만 반영합니다.",
  email: "jakesoneyo@gmail.com",
  phone: "010-9186-6423",
  github: "https://github.com/jakesoneyo",
};
