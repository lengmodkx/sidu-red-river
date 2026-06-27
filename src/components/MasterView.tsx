import { useEffect, useMemo, useRef, useState } from "react";

import { MasterMap } from "./MasterMap";
import { phases, dateNum } from "../data/phases";

const MIN_DATE = "1935-01-07";
const MAX_DATE = "1935-05-29";
const MIN_N = dateNum(MIN_DATE);
const MAX_N = dateNum(MAX_DATE);

function formatDate(n: number): string {
  const s = String(Math.floor(n));
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
}

function dateStringToN(s: string): number {
  return Number(s.replaceAll("-", ""));
}

function describeDay(n: number): { label: string; phase: string; phaseTag: string } {
  // 找出当前最贴近的 phase
  let bestIdx = 0;
  for (let i = 0; i < phases.length; i++) {
    if (n >= dateNum(phases[i].date)) bestIdx = i;
  }
  const ph = phases[bestIdx];
  const inPhase = n >= dateNum(ph.date) && n <= dateNum(ph.endDate);
  if (inPhase) {
    return { label: ph.label, phase: ph.tagline, phaseTag: ph.id };
  }
  return { label: `(${ph.label}之间)`, phase: ph.tagline, phaseTag: ph.id };
}

export function MasterView() {
  const [date, setDate] = useState("1935-01-07");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);

  // 自动播放:从 MIN_DATE 推到 MAX_DATE。1x = 4 天/秒,慢得足以看清每个阶段
  useEffect(() => {
    if (!playing) return;
    const stepMs = 50;
    const daysPerSec = 4 * speed;
    const daysPerTick = (daysPerSec * stepMs) / 1000; // 0.2 天/tick @ 1x
    const id = setInterval(() => {
      setDate((prev) => {
        const cur = dateStringToN(prev);
        const nextN = cur + daysPerTick;
        if (nextN >= MAX_N) {
          setPlaying(false);
          return MAX_DATE;
        }
        return formatDate(Math.min(nextN, MAX_N));
      });
    }, stepMs);
    return () => clearInterval(id);
  }, [playing, speed]);

  // 计算当前位置百分比
  const pct = useMemo(() => {
    const n = dateStringToN(date);
    return ((n - MIN_N) / (MAX_N - MIN_N)) * 100;
  }, [date]);

  // 阶段标记
  const phaseMarks = useMemo(
    () =>
      phases.map((p) => ({
        id: p.id,
        label: p.label,
        date: p.date,
        endDate: p.endDate,
        startPct: ((dateNum(p.date) - MIN_N) / (MAX_N - MIN_N)) * 100,
        endPct: ((dateNum(p.endDate) - MIN_N) / (MAX_N - MIN_N)) * 100,
      })),
    [],
  );

  // 拖拽
  const onTrackClick = (e: React.MouseEvent) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const p = Math.max(0, Math.min(1, x / rect.width));
    const n = Math.round(MIN_N + p * (MAX_N - MIN_N));
    setDate(formatDate(n));
  };

  const onThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const onMove = (ev: MouseEvent) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ev.clientX - rect.left;
      const pp = Math.max(0, Math.min(1, x / rect.width));
      const n = Math.round(MIN_N + pp * (MAX_N - MIN_N));
      setDate(formatDate(n));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const info = describeDay(dateStringToN(date));

  return (
    <section className="master">
      <div className="master-inner">
        <div className="master-head">
          <div>
            <div className="eyebrow">CAMPAIGN SIMULATION · 全程态势推演</div>
            <h2>把 142 天拖到眼前</h2>
            <p className="lead">
              拖动下面的时间轴,或点击播放。中央红军的位置、行军路线、发生过的战斗,都会按历史时刻同步演变。
            </p>
          </div>
          <div className="master-readout">
            <div className="readout-date">{date}</div>
            <div className="readout-label">{info.label}</div>
            <div className="readout-phase">{info.phase}</div>
          </div>
        </div>

        <div className="master-stage">
          <MasterMap date={date} />
        </div>

        <div className="master-controls">
          <button
            type="button"
            className={`play ${playing ? "playing" : ""}`}
            onClick={() => {
              if (!playing && dateStringToN(date) >= MAX_N) {
                setDate(MIN_DATE);
                setTimeout(() => setPlaying(true), 50);
              } else {
                setPlaying((p) => !p);
              }
            }}
            aria-label={playing ? "暂停" : "播放"}
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><rect x="2" y="2" width="3.5" height="10" fill="currentColor"/><rect x="8.5" y="2" width="3.5" height="10" fill="currentColor"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><polygon points="3,1.5 12,7 3,12.5" fill="currentColor"/></svg>
            )}
            <span>{playing ? "暂停" : dateStringToN(date) >= MAX_N ? "重播" : "播放"}</span>
          </button>
          <div className="speed">
            <button type="button" className={speed === 0.5 ? "active" : ""} onClick={() => setSpeed(0.5)}>0.5×</button>
            <button type="button" className={speed === 1 ? "active" : ""} onClick={() => setSpeed(1)}>1×</button>
            <button type="button" className={speed === 2 ? "active" : ""} onClick={() => setSpeed(2)}>2×</button>
          </div>
          <div className="scrubber" ref={trackRef} onClick={onTrackClick}>
            <div className="scrubber-track" />
            {phaseMarks.map((m) => (
              <div
                key={m.id}
                className={`scrubber-mark ${m.id === info.phaseTag ? "active" : ""}`}
                style={{ left: `${m.startPct}%` }}
                title={`${m.label} (${m.date} – ${m.endDate})`}
              >
                <span className="scrubber-mark-dot" />
                <span className="scrubber-mark-label">{m.label}</span>
              </div>
            ))}
            <div className="scrubber-fill" style={{ width: `${pct}%` }} />
            <div
              className="scrubber-thumb"
              style={{ left: `${pct}%` }}
              onMouseDown={onThumbMouseDown}
              role="slider"
              aria-valuemin={MIN_N}
              aria-valuemax={MAX_N}
              aria-valuenow={dateStringToN(date)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}