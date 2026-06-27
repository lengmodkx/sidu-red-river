import { motion } from "framer-motion";
import { useMemo } from "react";
import { places } from "../data/places";
import { forceById, forces } from "../data/forces";
import {
  getForcePosAt,
  getRoutesUpTo,
  getBattlesUpTo,
  resolve,
} from "../data/phases";

type MasterMapProps = {
  date: string; // 1935-01-19 形式
};

type Range = { id: string; name: string; ridge: Array<[number, number]>; width?: number };

const ranges: Range[] = [
  {
    id: "dalushan", name: "大娄山",
    ridge: [[330, 245], [400, 235], [470, 228], [540, 225], [610, 230], [680, 235]],
    width: 28,
  },
  {
    id: "miaoling", name: "苗岭",
    ridge: [[310, 470], [400, 460], [490, 458], [580, 460], [670, 462], [760, 465]],
    width: 24,
  },
  {
    id: "wumeng", name: "乌蒙山",
    ridge: [[255, 280], [255, 350], [255, 420], [260, 490], [265, 560]],
    width: 22,
  },
];

function RangeShape({ range }: { range: Range }) {
  const half = (range.width ?? 20) / 2;
  const ridge = range.ridge;
  if (ridge.length < 2) return null;
  const top = ridge.map(([x, y]) => [x, y - half] as [number, number]);
  const bot = ridge.map(([x, y]) => [x, y + half] as [number, number]);
  const d = [
    `M ${top[0][0]} ${top[0][1]}`,
    ...top.slice(1).map(([x, y]) => `L ${x} ${y}`),
    ...bot.slice().reverse().map(([x, y]) => `L ${x} ${y}`),
    "Z",
  ].join(" ");
  return (
    <g className="range">
      <path d={d} />
      {ridge.map(([x, y], i) => (
        <text key={i} x={x} y={y + 4} className="range-peak" textAnchor="middle">&#9651;</text>
      ))}
    </g>
  );
}

function RangeLabel({ range }: { range: Range }) {
  const mid = range.ridge[Math.floor(range.ridge.length / 2)];
  const offset = (range.width ?? 20) / 2 + 10;
  return <text x={mid[0]} y={mid[1] - offset} className="range-label" textAnchor="middle">{range.name}</text>;
}

function Boundaries() {
  return (
    <g>
      <path d="M 100 580 L 160 560 L 240 590 L 340 600 L 440 640 L 520 670 L 600 660 L 690 620 L 760 560 L 820 480 L 860 380 L 900 280 L 920 180 L 880 100 L 800 80 L 700 100 L 600 90 L 500 100 L 420 80 L 360 90 L 300 70 L 240 100 L 180 180 L 140 260 L 120 360 L 100 460 Z" className="boundary" />
      <path d="M 880 100 L 600 90 L 500 100 L 400 130 L 320 180 L 280 240 L 220 320 L 180 400 L 160 480 L 180 540" className="boundary" />
      <path d="M 100 580 L 160 560 L 240 590 L 320 580 L 380 540 L 360 470 L 300 420 L 240 380 L 180 320 L 140 260" className="boundary" />
    </g>
  );
}

function Rivers() {
  return (
    <g>
      <path d="M 265 295 Q 295 320 330 330 Q 365 335 395 320 Q 430 305 460 280 Q 500 245 545 210 Q 580 185 600 165" className="river major" />
      <text x="380" y="358" className="river-label" transform="rotate(8 380 358)">赤水河</text>
      <path d="M 460 580 Q 520 540 580 500 Q 640 470 690 440 Q 730 415 760 380 Q 770 330 750 270 Q 720 200 690 145 Q 660 105 640 85" className="river major" />
      <text x="700" y="320" className="river-label" transform="rotate(-72 700 320)">乌江</text>
      <path d="M 480 50 Q 540 80 600 110 Q 660 130 720 145 Q 780 155 840 160 Q 900 165 950 165" className="river major" />
      <text x="660" y="118" className="river-label">长江</text>
      <path d="M 50 410 Q 60 450 65 490 Q 60 530 55 580 Q 50 620 50 660" className="river major" />
      <text x="62" y="445" className="river-label" transform="rotate(90 62 445)">金沙江</text>
      <path d="M 80 660 Q 160 640 220 620 Q 280 600 330 580 Q 360 555 380 530 Q 400 510 430 490" className="river" />
      <text x="290" y="600" className="river-label" transform="rotate(-18 290 600)">北盘江</text>
      <path d="M 40 670 Q 120 660 200 650 Q 250 640 280 620" className="river" />
      <text x="170" y="678" className="river-label" transform="rotate(-6 170 678)">南盘江</text>
      <path d="M 600 165 Q 615 155 625 145" className="river major" />
    </g>
  );
}

function Cities() {
  return (
    <g>
      {places.map((p) => (
        <g key={p.id}>
          <circle cx={p.x} cy={p.y} r={p.kind === "city" ? 3.2 : 2.4} className="city-dot" />
          <text x={p.x} y={p.y - (p.kind === "crossing" ? 10 : 7)} className={`city-name ${p.kind}`} textAnchor="middle">{p.name}</text>
        </g>
      ))}
    </g>
  );
}

function buildPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const off = Math.min(60, len * 0.18);
  return {
    d: `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2 + px * off} ${(from.y + to.y) / 2 + py * off} ${to.x} ${to.y}`,
  };
}

function MasterUnit({ forceId, x, y, dateKey: _ }: { forceId: string; x: number; y: number; dateKey: string }) {
  const f = forceById[forceId];
  if (!f) return null;
  const w = Math.max(60, f.name.length * 11 + 14);
  const h = 16;
  const tip = `${f.name} · 指挥 ${f.commander} · 兵力约 ${(f.strength / 1000).toFixed(1)} 千人`;
  return (
    <motion.g
      key={forceId}
      initial={false}
      animate={{ x, y: y - h }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className={`unit ${f.side} ${f.side === "kmt" && f.faction !== "central" ? "f-" + f.faction : ""}`}
    >
      <title>{tip}</title>
      <polygon className="anchor" points={`-4,${h - 1} 4,${h - 1} 0,${h + 4}`} />
      <rect className="body" x={-w / 2} y="0" width={w} height={h} rx="2" />
      <text className="name" x="0" y={h / 2 + 4} textAnchor="middle">{f.name}</text>
    </motion.g>
  );
}

export function MasterMap({ date }: MasterMapProps) {
  // 计算每个部队当前位置
  const unitPositions = useMemo(() => {
    const positions: Array<{ forceId: string; x: number; y: number; side: "red" | "kmt"; faction: string; name: string; commander: string; strength: number }> = [];
    for (const f of forces) {
      const p = getForcePosAt(f.id, date);
      if (!p) continue;
      positions.push({
        forceId: f.id,
        x: p.x,
        y: p.y,
        side: p.side,
        faction: p.faction,
        name: p.name,
        commander: p.commander,
        strength: p.strength,
      });
    }
    return positions;
  }, [date]);

  // 累计路线
  const routes = useMemo(() => getRoutesUpTo(date), [date]);
  // 累计战斗
  const battles = useMemo(() => getBattlesUpTo(date), [date]);

  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="m-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#b13a2a" />
        </marker>
        <marker id="m-arrow-kmt" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#2c4a6e" />
        </marker>
      </defs>
      <g className="ranges">
        {ranges.map((r) => <RangeShape key={r.id} range={r} />)}
        {ranges.map((r) => <RangeLabel key={`l-${r.id}`} range={r} />)}
      </g>
      <Boundaries />
      <Rivers />
      <Cities />
      <text x="500" y="618" className="boundary-label" textAnchor="middle">贵 州</text>
      <text x="780" y="60" className="boundary-label">四 川</text>
      <text x="120" y="460" className="boundary-label" transform="rotate(-90 120 460)">云 南</text>

      {/* 战斗 */}
      {battles.map((b, i) => {
        const pos = resolve({ placeId: b.placeId, x: b.x, y: b.y });
        return (
          <g key={`b-${i}`} className={`battle ${b.result}`}>
            <circle cx={pos.x} cy={pos.y} r="6" />
            <text x={pos.x + 10} y={pos.y + 3} className="lbl">{b.name}</text>
          </g>
        );
      })}

      {/* 路线 */}
      {routes.map((r, i) => {
        const from = resolve(r.from);
        const to = resolve(r.to);
        const { d } = buildPath(from, to);
        const stroke = r.side === "red" ? "#b13a2a" : "#2c4a6e";
        const opacity = r.side === "red" ? 0.7 : 0.3;
        return (
          <path
            key={`r-${i}`}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={r.side === "red" ? 2 : 1.4}
            strokeLinecap="round"
            strokeDasharray={r.side === "red" ? undefined : "5 3"}
            opacity={opacity}
            markerEnd={r.side === "red" ? "url(#m-arrow-red)" : "url(#m-arrow-kmt)"}
          />
        );
      })}

      {/* 部队 */}
      {unitPositions.map((u) => (
        <MasterUnit key={u.forceId} forceId={u.forceId} x={u.x} y={u.y} dateKey={date} />
      ))}
    </svg>
  );
}