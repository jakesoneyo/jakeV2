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
    "요구사항 분석부터 설계·구현·배포·운영까지 수행해온 신입 풀스택 개발자입니다. 최근 초기 스타트업의 웹서비스를 프리랜서로 1인 개발하며 PG 결제 연동과 카드사 심사 통과, AWS 인프라 직접 구축, 운영 배포까지 맡아 실결제가 오가는 서비스를 일정 내 납품했습니다. 구현 전에 데이터 흐름과 실패 시나리오(중복 요청, 동시성, 재시도)를 먼저 정리하고, 그 결과를 통합테스트로 고정하는 방식으로 일합니다.",
  email: "jakesoneyo@gmail.com",
  phone: "010-9186-6423",
  github: "https://github.com/jakesoneyo",
};
