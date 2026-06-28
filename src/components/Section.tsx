 import { Map } from "./Map";
 import { type Phase } from "../data/phases";

 type Props = {
   phase: Phase;
   index: number;
   total: number;
   reverse?: boolean;
 };

 export function Section({ phase, index, total, reverse }: Props) {
   return (
     <section className={`phase ${reverse ? "reverse" : ""}`} id={`phase-${phase.id}`}>
       <div className="grid">
         <div className="copy">
           <div className="index">
             阶段 {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
           </div>
           <div className="label">{phase.tagline}</div>
           <h2>{phase.label}</h2>
           <div className="date">
             {phase.date} – {phase.endDate}
           </div>
           <div className="narrative">
             {phase.narrative.map((p, i) => (
               <p key={i}>{renderBold(p)}</p>
             ))}
           </div>
           <div className="insight">
             <span className="tag">战略点评</span>
             {renderBold(phase.insight)}
           </div>
           {phase.facts.length > 0 && (
             <div className="facts">
               {phase.facts.map((f, i) => (
                 <div className="fact" key={i}>
                   <b>{f.k}</b>
                   {f.v}
                 </div>
               ))}
             </div>
           )}
         </div>
         <div className="mapwrap">
           <div className="maphead">
             <span>黔北 · 川南 · 滇东北</span>
             <span className="phase-tag">{phase.label}</span>
           </div>
          <div className="map-scroll">
            <Map phase={phase} />
            <div className="scroll-indicator" aria-hidden>← 左右滑动查看全图 →</div>
          </div>
           <div className="legend">
             <div className="lg"><span className="sw red" /> 中央红军</div>
             <div className="lg"><span className="sw central" /> 中央军(薛岳)</div>
             <div className="lg"><span className="sw sichuan" /> 川军</div>
             <div className="lg"><span className="sw yunnan" /> 滇军</div>
             <div className="lg"><span className="sw guizhou" /> 黔军</div>
             <div className="lg"><span className="sw river" /> 主要河流</div>
           </div>
         </div>
       </div>
     </section>
   );
 }

 // 把叙述里的引号 "..." 转成 <strong> 高亮
function renderBold(text: string) {
  const parts = text.split(/(`([^`]+)`)/g);
  return parts.map((p, i) =>
    i % 3 === 2 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>
  );
 }
