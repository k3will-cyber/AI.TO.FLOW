"use client";

import { Heart, ArrowUp } from "lucide-react";
import { Button } from "./atoms/Button";

const footerLinks = {
  produto: [
    { label: "Diagnóstico IA", href: "#diagnostic" },
    { label: "Soluções", href: "#solutions" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "Calculadora ROI", href: "#roi" },
    { label: "Roadmap", href: "#roadmap" },
  ],
  empresa: [
    { label: "Sobre", href: "#" },
    { label: "Cases", href: "#cases" },
    { label: "Blog", href: "#" },
    { label: "Carreiras", href: "#" },
    { label: "Contato", href: "#" },
  ],
  legal: [
    { label: "Privacidade", href: "#" },
    { label: "Termos", href: "#" },
    { label: "LGPD", href: "#" },
    { label: "Segurança", href: "#" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-surface overflow-hidden">
      {/* Top gradient - using design system colors */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tertiary/30 to-transparent" />

      <div className="container py-12 md:py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-3 mb-4">
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
            <p className="text-text-sm text-text-muted leading-relaxed">
              Transformando empresas tradicionais em operações assistidas por
              inteligência artificial.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-text-xs font-semibold text-text-muted font-mono tracking-wider uppercase mb-3">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label} className="whitespace-nowrap">
                      <a
                        href={link.href}
                        className="text-text-sm text-text-muted hover:text-text transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-10" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Alto Flow OS. Todos os direitos
            reservados.
          </p>

          <div className="flex items-center gap-3">
            {/* X/Twitter */}
            <a
              href="#"
              className="w-8 h-8 rounded-md bg-border/20 flex items-center justify-center hover:bg-tertiary/10 hover:text-tertiary transition-colors duration-200"
              aria-label="X (Twitter)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="w-8 h-8 rounded-md bg-border/20 flex items-center justify-center hover:bg-tertiary/10 hover:text-tertiary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="w-8 h-8 rounded-md bg-border/20 flex items-center justify-center hover:bg-tertiary/10 hover:text-tertiary transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="#"
              className="w-8 h-8 rounded-md bg-border/20 flex items-center justify-center hover:bg-tertiary/10 hover:text-tertiary transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <div className="w-px h-6 bg-border/20" />
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="p-0"
            >
              <ArrowUp size={14} className="text-text-muted" />
            </Button>
          </div>
        </div>
      </div>

      {/* Made with love */}
      <div className="border-t border-border/20 py-4">
        <p className="text-text-xs text-text-muted text-center flex items-center justify-center gap-2">
          Feito com <Heart size={10} className="text-tertiary" /> pela Alto Flow OS
        </p>
      </div>
    </footer>
  );
}