import type { Profile } from '../types';

/**
 * Hero/Contact/Footer가 공유하는 프로필 콘텐츠.
 * PLAN.md "콘텐츠 지침" 문구를 그대로 사용 — 실무 프로젝트명은 언급하지 않는다(경력 섹션은 스코프 제외).
 */
export const profile: Profile = {
  name: '손영선',
  tagline: '요구사항 분석부터 설계·구현·연동·배포까지 아우르는 신입 풀스택 개발자',
  intro:
    '백엔드(NestJS, Express)에서 시작해 인증, API 설계, 데이터 처리 흐름을 다루고 프론트엔드까지 확장하는 풀스택 개발을 지향합니다. 데이터를 수집하고 정제해 저장, 가공, 조회하는 흐름을 실무 맥락에서 다뤄봤고, 배포 이후의 운영과 오류 대응까지 책임지는 개발자입니다.',
  email: 'jakesoneyo@gmail.com',
  github: 'https://github.com/jakesoneyo',
};
