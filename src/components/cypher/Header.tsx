"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

type HeaderProps = { menuOpen?: boolean; onMenuToggle?: () => void; onNavigate?: () => void };
const navItems = [["About", "#about"], ["Experience", "#experience"], ["Schedule", "#schedule"], ["Sponsors", "#sponsors"], ["Prizes", "#register"], ["FAQs", "#faq"]] as const;

export function Header({ menuOpen = false, onMenuToggle = () => {}, onNavigate = () => {} }: HeaderProps = {}) {
  return <>
    <div className="ticker"><div className="ticker-track"><span>✦ LIVE UPDATE: REGISTRATIONS ARE NOW OPEN</span><span>✦ CYPHER 4.0 / OCTOBER 9, 10 2026</span><span>✦ LIVE UPDATE: REGISTRATIONS ARE NOW OPEN</span></div></div>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Rotaract home">
        <Image
          src="/Rotaract_logo_white.png"
          alt="Rotaract Logo"
          width={220}
          height={70}
          priority
          style={{ height: "58px", width: "auto", objectFit: "contain" }}
        />
      </a>
      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
        {navItems.map(([label, href]) => <a key={label} href={href} onClick={onNavigate}>{label}</a>)}
        <a className="nav-cta" href="#register" onClick={onNavigate}>Register <ArrowUpRight size={16} /></a>
      </nav>
      <button className="icon-button menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={onMenuToggle}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
  </>;
}