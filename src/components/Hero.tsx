 export function Hero() {
   return (
     <header className="hero">
       <div className="eyebrow">长 征 · 1935</div>
       <h1>
         四渡<span className="accent">赤水</span>
       </h1>
       <p className="lead">
         1935 年 1 月到 5 月,中央红军在黔北川南的山地间三次渡过赤水河,毛泽东以一系列出人意料的机动,把三万红军从四十万敌军的包围中拖了出来。
         这是一次没有地图教程的战争,也是把"运动战"三个字写到极致的一战。本页把它所依赖的地形、双方态势、机动方向,逐段摆开。
       </p>
       <div className="figures">
         <div className="fig red">
           <div className="num">
             30,000<span className="small">人</span>
           </div>
           <div className="lbl">中央红军</div>
         </div>
         <div className="fig kmt">
           <div className="num">
             400,000<span className="small">+ 人</span>
           </div>
           <div className="lbl">国民党军</div>
         </div>
         <div className="fig">
           <div className="num">
             5<span className="small"> 个月</span>
          </div>
          <div className="lbl">战役跨度</div>
         </div>
         <div className="fig">
           <div className="num">
             4<span className="small"> 次</span>
          </div>
          <div className="lbl">渡赤水</div>
         </div>
       </div>
       <div className="scroll-hint">↓ 向下滚动 · 点击上方阶段切换</div>
     </header>
   );
 }
