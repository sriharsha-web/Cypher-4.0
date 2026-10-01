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
  { label: "About", id: "about", href: "/#about" },
  { label: "Experience", id: "experience", href: "/#experience" },
  { label: "Schedule", id: "schedule", href: "/#schedule" },
  { label: "Past Events", id: "past-events", href: "/#past-events" },
  { label: "Sponsors", id: "sponsors", href: "/#sponsors" },
  { label: "Access Passes", id: "register", href: "/#register" },
  { label: "FAQs", id: "faq", href: "/#faq" },
] as const;

export function Header({
  menuOpen: controlledMenuOpen,
  onMenuToggle,
  onNavigate,
}: HeaderProps = {}) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
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

  // Active section scrollspy
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (window.location.pathname !== "/") {
        setActiveSection("");
        return;
      }

      const scrollPosition = window.scrollY + 140;
      const ids = navItems.map((item) => item.id);

      for (let i = ids.length - 1; i >= 0; i--) {
        const id = ids[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler for anchor links
  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    handleNavigate();

    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${id}`);
        setActiveSection(id);
      }
    }
  };

  // Logo home click
  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleNavigate();
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      setActiveSection("");
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
        <Link className="brand" href="/#top" aria-label="Rotaract home" onClick={handleBrandClick}>
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

          <div className="nav-links-container">
            {navItems.map(({ label, id, href }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={label}
                  href={href}
                  className={`nav-link ${isActive ? "is-active" : ""}`}
                  onClick={(e) => handleNavLinkClick(e, href, id)}
                >
                  <span>{label}</span>
                  <span className="mobile-nav-link-arrow">→</span>
                </a>
              );
            })}
          </div>

          <div className="nav-actions-container">
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
