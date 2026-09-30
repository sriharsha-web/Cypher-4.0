import { BrainCircuit, Rocket, Trophy, Users, Wrench } from "lucide-react";

const values = [[Wrench, "Build", "Architect production-ready products using cosmic-grade stacks."], [BrainCircuit, "Learn", "Master advanced frameworks via live technical deep-dives."], [Users, "Squad", "Find technical counterparts and build lasting network bonds."], [Trophy, "Compete", "Face off against the top university talent in the galaxy."], [Rocket, "Launch", "Demo live to a panel of mentors and investors."]];

export function ExperienceSection() {
  return <section id="experience" className="section section-grid"><div className="shell"><div className="section-heading"><div><p className="mono-label">04 / THE CORE VALUE</p><h2>WHY BOARD <span>CYPHER 4.0?</span></h2></div><p>Everything you need to go from first idea to final demo in one electric weekend.</p></div><div className="value-grid">{values.map(([Icon, title, copy], index) => { const ValueIcon = Icon; return <article className={`value-card value-${index}`} key={title as string}><span className="value-icon"><ValueIcon size={24} /></span><h3>{title as string}</h3><p>{copy as string}</p></article>; })}</div></div></section>;
}