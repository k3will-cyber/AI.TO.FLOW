"use client";

import React from "react";

export type BrutalistVariant =
  | "cyan"
  | "magenta"
  | "lime"
  | "white"
  | "ghost"
  | "danger";

export type BrutalistSize = "sm" | "md" | "lg" | "xl";

interface BrutalistButtonProps {
  variant?: BrutalistVariant;
  size?: BrutalistSize;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: "submit" | "button" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

/**
 * BrutalistButton — Aggressive, high-contrast button component.
 *
 * Design principles:
 * - Uppercase, bold, sans-serif
 * - Hard drop shadows (no blur, pure offset)
 * - Thick 2px borders
 * - Neon accent colors
 * - Sharp corners (no border-radius)
 * - Lift effect on hover
 */
const BrutalistButton = ({
  variant = "cyan",
  size = "md",
  block = false,
  disabled = false,
  loading = false,
  type = "button",
  className = "",
  children,
  onClick,
  href,
  startIcon,
  endIcon,
}: BrutalistButtonProps) => {
  // ── Size Map (static Tailwind classes) ──
  const sizeMap: Record<BrutalistSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
    xl: "px-9 py-4.5 text-lg",
  };

  const sizeClasses = sizeMap[size];

  // ── Variant Style Map ──
  const variantMap: Record<BrutalistVariant, string> = {
    cyan:
      "bg-neon-cyan text-bg border-neon-cyan border-thick shadow-hard-cyan hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[-2px]",
    magenta:
      "bg-neon-magenta text-bg border-neon-magenta border-thick shadow-hard-magenta hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[-2px]",
    lime:
      "bg-neon-lime text-bg border-neon-lime border-thick shadow-hard-lime hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[-2px]",
    white:
      "bg-white text-bg border-white border-thick shadow-hard-white hover:shadow-hard-cyan hover:translate-x-[-2px] hover:translate-y-[-2px]",
    ghost:
      "bg-transparent text-white border-white border-thick shadow-hard-none hover:shadow-hard-white hover:translate-x-[-2px] hover:translate-y-[-2px]",
    danger:
      "bg-error text-white border-neon-magenta border-thick shadow-hard-magenta hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[-2px]",
  };

  const variantClasses = variantMap[variant];

  // ── State classes ──
  const stateClasses = [
    disabled ? "opacity-30 cursor-not-allowed pointer-events-none" : "cursor-pointer",
    loading ? "cursor-wait" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // ── Base classes ──
  const baseClasses = [
    "inline-flex items-center justify-center gap-2",
    "font-bold uppercase tracking-wider",
    "transition-all duration-100 ease-in",
    "select-none",
    "rounded-none",
    block ? "w-full" : "",
    sizeClasses,
    variantClasses,
    stateClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // ── Content ──
  const content = (
    <>
      {loading && (
        <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent animate-spin" />
      )}
      {!loading && startIcon && (
        <span className="flex-shrink-0 inline-flex">{startIcon}</span>
      )}
      <span>{children}</span>
      {!loading && endIcon && (
        <span className="flex-shrink-0 inline-flex">{endIcon}</span>
      )}
    </>
  );

  // ── Render ──
  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={baseClasses}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default BrutalistButton;
