 import { phases } from "../data/phases";

 type Props = {
   active: number;
   onChange: (index: number) => void;
 };

 export function Timeline({ active, onChange }: Props) {
  const pct = (active / (phases.length - 1)) * 100;
  return (
    <nav className="timeline" aria-label="战役阶段">
      {phases.map((p, i) => (
        <button
          key={p.id}
          type="button"
          className={`step ${i === active ? "active" : ""}`}
          onClick={() => onChange(i)}
        >
          <span className="dot" />
          <span className="label">{p.label}</span>
          <span className="date">
            {p.date.slice(5).replace("-", "/")} – {p.endDate.slice(5).replace("-", "/")}
          </span>
        </button>
      ))}
      <span aria-hidden className="line" />
      <span
        aria-hidden
        className="line-fill"
        style={{ width: `${Math.max(0, pct * 0.9)}%` }}
      />
    </nav>
  );
}
