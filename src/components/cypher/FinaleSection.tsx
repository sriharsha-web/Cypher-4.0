import { ArrowUpRight } from "lucide-react";

export function FinaleSection() {
  return (
    <section className="finale">
      <div className="shell">
        <h2>
          HACK THE<br />
          <span>STARS.</span>
        </h2>
        <p>CYPHER 4.0 is not an event. It is the core architectural directive of the decade.</p>
        <a className="button button-dark" href="#register">
          BOARD STATION 4.0 <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}