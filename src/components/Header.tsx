"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./atoms/Button";

const navItems = [
  { label: "Diagnóstico", href: "#diagnostic" },
  { label: "Cases", href: "#cases" },
  { label: "Soluções", href: "#solutions" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "ROI", href: "#roi" },
  { label: "Roadmap", href: "#roadmap" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 no-print"
        >
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-surface text-xs font-bold font-mono">AF</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-text">
              Alto Flow
            </span>
            <span className="text-[10px] font-medium text-muted tracking-wider uppercase -mt-0.5">
              OS
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-muted hover:text-text transition-colors duration-200 hover:bg-surface/50 rounded-md"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="md"
            className="hidden sm:inline-flex"
          >
            Diagnóstico Gratuito
          </Button>
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface/50 transition-colors duration-200"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Abrir menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 pb-4 pt-2 bg-surface/95 backdrop-blur-xl border-b border-border/60">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-sm font-medium text-muted hover:text-text rounded-md hover:bg-surface/50 transition-colors duration-200"
              onClick={() => setIsMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button
            variant="primary"
            size="md"
            className="mt-4 w-full"
            onClick={() => setIsMobileOpen(false)}
          >
            Diagnóstico Gratuito
          </Button>
        </nav>
      </div>
    </header>
  );
}