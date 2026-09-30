import { CalendarDays, Users } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="section section-dark">
      <div className="shell two-column">
        <div className="reveal">
          <p className="mono-label cyan-text">MISSION LOG: 03 / ENTRY</p>
          <h2 className="about-heading">WHAT IS CYPHER <span>4.0</span></h2>
          <p className="statement">CYPHER is the flagship 24-hour build-a-thon organized by the Rotaract Club of Atria. We strip away the slide decks and focus on pure engineering.</p>
          <div className="protocol">
            <h3>PEAKS AND PERKS 4.0</h3>
            <p>Direct mentorship from the architects shaping what comes next. Internship opportunities and exclusive fast-track perks for top performing squads.</p>
          </div>
        </div>
        <div className="info-stack reveal reveal-delay">
          <div className="participate-card-wrapper">
            <div className="peeping-astronaut" aria-hidden="true">
              <img src="/astronaout.png" alt="Astronaut popping out" />
            </div>
            <div className="info-panel panel-purple">
              <Users />
              <h3>WHO CAN PARTICIPATE?</h3>
              <p>Open to university students, independent developers, and technical squads of 2 to 4.</p>
            </div>
          </div>
          <div className="info-panel">
            <CalendarDays />
            <h3>EVENT DETAILS</h3>
            <ul className="event-details-list">
              <li>
                <span>DATE</span>
                <strong>9, 10 October 2026</strong>
              </li>
              <li>
                <span>LOCATION</span>
                <strong>Atria Institute of Technology, Bangalore</strong>
              </li>
              <li>
                <span>HOSTED BY</span>
                <strong>Rotaract Club of Atria Institute of Technology</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}