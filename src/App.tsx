import { useEffect, useRef, useState } from "react";
import { Timeline } from "./components/Timeline";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { Recap } from "./components/Recap";
import { MasterView } from "./components/MasterView";
import { phases } from "./data/phases";
import "./App.css";

function App() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  const goTo = (i: number) => {
    setActive(i);
    const el = sectionRefs.current[i];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const trigger = window.scrollY + 220;
      let cur = 0;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (el && el.offsetTop <= trigger) cur = i;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="name">四渡赤水</div>
          <div className="sub">FOUR CROSSINGS OF THE CHISHUI · 1935</div>
        </div>
        <div className="stat">
          <span>
            <span className="red">30,000</span> vs <span className="kmt">400,000+</span>
          </span>
          <span>1935.01 – 1935.03</span>
        </div>
      </header>

      <Timeline active={active} onChange={goTo} />

      <main className="main">
        <Hero />
        <MasterView />

        {phases.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
          >
            <Section phase={p} index={i} total={phases.length} reverse={i % 2 === 1} />
          </div>
        ))}

        <Recap />
      </main>
    </div>
  );
}

export default App;