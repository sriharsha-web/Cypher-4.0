import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  ArrowUpRight,
} from "lucide-react";


export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        {/* COLUMN 1: BRAND & MISSION */}
        <div>
          <div className="footer-logo-block">
            <Image
              src="/Rotaract_logo_white.png"
              alt="Rotaract Club of Atria Logo"
              width={200}
              height={60}
              style={{ height: "48px", width: "auto", objectFit: "contain" }}
            />
          </div>
          <p style={{ marginTop: "8px", fontWeight: 600 }}>
            Rotaract Club of Atria Institute of Technology.
            <br />
            Building technical excellence through intensive 24-hour sprints, innovation, and community collaboration.
          </p>

          <div className="footer-meta-pill">
            <span>EVENT DATES</span>
            <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={14} color="var(--purple)" /> October 9-10, 2026
            </p>
          </div>

          <div className="footer-meta-pill" style={{ marginTop: "10px" }}>
            <span>VENUE &amp; LOCATION</span>
            <p style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
              <MapPin size={14} color="var(--purple)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>
                Atria Institute of Technology
                <br />
                ASKB Campus, Hebbal, Bengaluru, Karnataka 560024
              </span>
            </p>
          </div>
        </div>

        {/* COLUMN 2: QUICK LINKS & POLICIES */}
        <div>
          <p className="footer-label">Navigation</p>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#schedule">Schedule</a>
          <a href="#register">Access Passes</a>
          <a href="#faq">FAQs</a>

          <p className="footer-label" style={{ marginTop: "20px" }}>
            Legal &amp; Policies
          </p>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/shipping-policy">Shipping &amp; Delivery</Link>
        </div>

        {/* COLUMN 3: CONTACT & SOCIAL */}
        <div>
          <p className="footer-label">Contact Us</p>
          <a href="mailto:rotaractatriait3191@gmail.com" title="Send email">
            <Mail size={14} /> rotaractatriait3191@gmail.com
          </a>
          <a href="tel:+918296869390" title="Call Rahul">
            <Phone size={14} /> +91 8296869390
          </a>
          <a href="tel:+917349238222" title="Call Contact">
            <Phone size={14} /> +91 7349238222
          </a>
          <a
            href="https://rotaractait2026-27.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            title="Official Club Website"
          >
            <Globe size={14} /> Club Website <ArrowUpRight size={12} />
          </a>

          <p className="footer-label" style={{ marginTop: "20px" }}>
            Connect With Us
          </p>
          <div className="footer-social-row">
            <a
              href="https://www.instagram.com/rotaract_atria"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://x.com/rotaract_atria"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Twitter / X"
              title="Twitter / X"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/rotaract-atria/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.21a1.64 1.64 0 0 0-1.64 1.64c0 .9.74 1.64 1.64 1.64a1.64 1.64 0 0 0 1.64-1.64c0-.9-.74-1.64-1.64-1.64z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="shell footer-bottom">
        <span>&copy; 2026 CYPHER 4.0 / Rotaract Club of Atria Institute of Technology</span>
        <div className="footer-policy-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span>/</span>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          <span>/</span>
          <Link href="/refund-policy">Refund Policy</Link>
          <span>/</span>
          <Link href="/shipping-policy">Shipping Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;