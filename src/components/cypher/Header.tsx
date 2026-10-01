"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

type HeaderProps = {
  menuOpen?: boolean;
  onMenuToggle?: () => void;
  onNavigate?: () => void;
};

const navItems = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Schedule", "#schedule"],
  ["Past Events", "#past-events"],
  ["Sponsors", "#sponsors"],
  ["Access Passes", "#register"],
  ["FAQs", "#faq"],
] as const;

export function Header({
  menuOpen = false,
  onMenuToggle = () => {},
  onNavigate = () => {},
}: HeaderProps = {}) {
  return (
    <>
      <div className="ticker">
        <div className="ticker-track">
          <span>✦ LIVE UPDATE: REGISTRATIONS ARE NOW OPEN</span>
          <span>✦ CYPHER 4.0 / OCTOBER 9, 10 2026</span>
          <span>✦ JOIN 500+ BUILDERS AT ATRIA AUDITORIUM</span>
          <span>✦ LIVE UPDATE: REGISTRATIONS ARE NOW OPEN</span>
        </div>
      </div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Rotaract home" onClick={onNavigate}>
          <Image
            src="/Rotaract_logo_white.png"
            alt="Rotaract Club of Atria Logo"
            width={220}
            height={70}
            priority
            style={{ height: "54px", width: "auto", objectFit: "contain" }}
          />
        </a>

        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={onNavigate}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#register" onClick={onNavigate}>
            Register Now <ArrowUpRight size={16} />
          </a>
        </nav>

        <button
          className="icon-button menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
    </>
  );
}

export default Header;
