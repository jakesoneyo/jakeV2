import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';

/** 포트폴리오 허브 단일 페이지 조립 — 데이터(src/data)는 각 섹션 컴포넌트가 직접 import해 소비한다 */
function App() {
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
    </>
  );
}

export default App;
