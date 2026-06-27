 export function Recap() {
   return (
     <section className="recap" id="recap">
       <div className="eyebrow">复 盘</div>
       <h2>四渡赤水,到底打的是什么?</h2>
       <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--ink-soft)" }}>
         把它放在整个长征的尺度上看,四渡赤水不是"打赢了一仗",而是"始终没被围歼"。
         中央红军从 8.6 万人出发到遵义会议时只剩 3 万,强敌环伺、目标全部落空。
         在这三个月里,毛泽东没有追求任何一战的歼敌数字,他只做一件事:
         <strong>让红军始终保有自己的运动自由</strong>——具体到每一步,就是不断放弃已经暴露的意图,转去敌人认为你不会去的地方。
       </p>
       <div className="grid3">
         <div className="card">
           <div className="k">空间</div>
           <div className="v">
             把战场从 1,000 平方公里级的黔北,撑到 40,000 平方公里的黔、川、滇三省交界。
           </div>
         </div>
         <div className="card">
           <div className="k">时间</div>
           <div className="v">
             把"立即决战"变成"持续机动"——蒋介石无法锁定决战时间,围歼就无从发生。
           </div>
         </div>
         <div className="card">
           <div className="k">信息</div>
           <div className="v">
             用佯动与节奏控制敌人的判断。1,000 人的"主力"调动了十几万追兵。
           </div>
         </div>
         <div className="card">
           <div className="k">地形</div>
           <div className="v">
             赤水河、乌江、金沙江是天然的"换向"工具,每渡一次,红军都换了一组可以封锁与可以利用的边界。
           </div>
         </div>
       </div>
       <div className="closer">
         "四渡赤水"后来被反复讲述,并不是因为战术上多么新奇,
         而是因为它把"承认自己打不赢"这件事变成了一种能力。<br />
         <em>三万对四十万,赢的方式只有一种:不让对方知道你要干什么。</em>
       </div>
       <div className="foot">
         资料综合自《红军长征史》、《遵义会议文献》、《毛泽东年谱》;兵力数字取教材通行说法。
       </div>
     </section>
   );
 }
