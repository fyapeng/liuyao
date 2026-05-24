import type { TemporalProfile } from "../types/index.ts";

interface TemporalOverviewProps {
  profile: TemporalProfile;
}

export function TemporalOverview({ profile }: TemporalOverviewProps) {
  return (
    <div className="temporal-grid">
      {profile.overview.map((item) => (
        <article key={item.key} className={`temporal-card temporal-${item.tone}`}>
          <span className="summary-label">{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.note}</p>
        </article>
      ))}
    </div>
  );
}
