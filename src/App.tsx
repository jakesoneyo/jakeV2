import { useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";
import { PrintResume } from "./components/PrintResume";
import { prewarmBackends } from "./lib/prewarmBackends";

/**
 * 포트폴리오 허브 단일 페이지 조립 — 데이터(src/data)는 각 섹션 컴포넌트가 직접 import해 소비한다.
 * 화면용 다크 콘솔 섹션들은 인쇄 시 `print:hidden`으로 숨고, 대신 PrintResume가 노출된다
 * (별도 라우트 없이 같은 페이지 안에서 미디어 쿼리로 전환).
 */
function App() {
  // 방문자가 프로젝트 링크를 클릭하기 전에 Render 백엔드를 미리 깨워둔다(마운트 1회).
  useEffect(() => {
    prewarmBackends();
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        본문 바로가기
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <PrintResume />
    </>
  );
}

export default App;
