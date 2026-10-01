"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Sparkles, MapPin, Calendar } from "lucide-react";

type HeaderProps = {
  menuOpen?: boolean;
  onMenuToggle?: () => void;
  onNavigate?: () => void;
};

const navItems = [
  ["About", "/#about"],
  ["Experience", "/#experience"],
  ["Schedule", "/#schedule"],
  ["Past Events", "/#past-events"],
  ["Sponsors", "/#sponsors"],
  ["Access Passes", "/#register"],
  ["FAQs", "/#faq"],
] as const;

export function Header({
  menuOpen: controlledMenuOpen,
  onMenuToggle,
  onNavigate,
}: HeaderProps = {}) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const isControlled = controlledMenuOpen !== undefined;
  const menuOpen = isControlled ? controlledMenuOpen : internalMenuOpen;

  const handleToggle = () => {
    if (isControlled && onMenuToggle) {
      onMenuToggle();
    } else {
      setInternalMenuOpen((open) => !open);
    }
  };

  const handleNavigate = () => {
    if (isControlled && onNavigate) {
      onNavigate();
    } else {
      setInternalMenuOpen(false);
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("nav-menu-locked");
    } else {
      document.body.classList.remove("nav-menu-locked");
    }
    return () => {
      document.body.classList.remove("nav-menu-locked");
    };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        handleNavigate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

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
        <Link className="brand" href="/#top" aria-label="Rotaract home" onClick={handleNavigate}>
          <Image
            src="/Rotaract_logo_white.png"
            alt="Rotaract Club of Atria Logo"
            width={220}
            height={70}
            priority
            style={{ height: "46px", width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Mobile menu backdrop */}
        {menuOpen && (
          <div
            className="mobile-nav-backdrop"
            onClick={handleNavigate}
            aria-hidden="true"
          />
        )}

        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <div className="mobile-nav-header">
            <span className="mobile-nav-badge">
              <Sparkles size={11} /> CYPHER 4.0 DIRECTORY
            </span>
          </div>

          <div className="mobile-nav-links">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={handleNavigate}>
                <span>{label}</span>
                <span className="mobile-nav-link-arrow">→</span>
              </a>
            ))}
          </div>

          <div className="mobile-nav-actions">
            <Link className="nav-cta" href="/register" onClick={handleNavigate}>
              Register Now <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mobile-nav-meta">
            <div className="mobile-nav-meta-item">
              <Calendar size={13} />
              <span>OCT 9-10, 2026</span>
            </div>
            <div className="mobile-nav-meta-item">
              <MapPin size={13} />
              <span>ATRIA AUDITORIUM, BLR</span>
            </div>
          </div>
        </nav>

        <button
          className="icon-button menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={handleToggle}
          type="button"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
    </>
  );
}

export default Header;
