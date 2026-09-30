import { journey } from "./data";

export function JourneySection() {
  return <section className="section journey"><div className="shell"><div className="center-heading"><p className="mono-label acid-text">06 / THE STAR PATH</p><h2>INTERSTELLAR <span>JOURNEY</span></h2></div><div className="journey-grid">{journey.map(([number, title, copy]) => <article key={number} className={number === "03" ? "journey-card featured" : "journey-card"}><strong>{number}</strong><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}