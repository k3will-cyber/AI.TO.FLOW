import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string; // If provided, renders as <a> instead of <button>
  startIcon?: React.ReactNode | (() => React.ReactNode);
  endIcon?: React.ReactNode | (() => React.ReactNode);
  loading?: boolean;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  onClick,
  href,
  startIcon,
  endIcon,
  loading = false
}: ButtonProps) => {
  // Size configurations based on design system
  // Design system uses 8px baseline: sm=8px, md=16px, lg=24px padding
  // But for buttons, let's use more reasonable values
  const sizeConfig: Record<string, { px: number; py: number; fontSize: string; gap: number }> = {
    sm: { px: 8, py: 4, fontSize: 'text-sm', gap: 2 },
    md: { px: 16, py: 8, fontSize: 'text-base', gap: 3 },
    lg: { px: 24, py: 12, fontSize: 'text-lg', gap: 4 }
  };

  const { px, py, fontSize, gap } = sizeConfig[size];

  // Base classes
  const baseClasses = `inline-flex items-center justify-center gap-[${gap}px] ${fontSize} font-semibold`;

  // Variant classes based on DESIGN.md
  const variantClasses: Record<string, string> = {
    // button-primary: Âmbar com texto preto (tertiary background with on-tertiary text)
    primary: `bg-tertiary text-on-tertiary hover:bg-primary hover:text-on-primary transition-all duration-200`,

    // button-secondary: Borda teal, sem fill (border secondary, background transparent, text secondary)
    secondary: `border border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary transition-all duration-200`,

    // button-whatsapp: Verde WhatsApp oficial
    whatsapp: `bg-[#25D366] text-white hover:bg-[#20c957] transition-all duration-200`,

    // ghost: transparente com apenas texto
    ghost: `text-text hover:bg-text/5 hover:text-text-dark transition-all duration-200`,

    // destructive: vermelho para ações perigosas
    destructive: `bg-destructive text-on-destructive hover:bg-destructive/90 transition-all duration-200`,

    // outline: borda com fundo transparente
    outline: `border border-primary text-primary hover:bg-primary/10 hover:text-primary-dark transition-all duration-200`
  };

  // Size-specific padding
  const sizeClasses = `px-[${px}px] py-[${py}px]`;

  // Common classes
  const commonClasses = `rounded-md transition-shadow duration-200`;

  // Combine all classes
  const classes = `${baseClasses} ${variantClasses[variant] || ''} ${sizeClasses} ${commonClasses} ${className}`.trim();

  // Handle disabled state
  const finalClasses = `${classes} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  // Shared props for both button and link
  const sharedProps = {
    className: finalClasses,
    onClick: disabled ? undefined : onClick,
    disabled: disabled || undefined
  };

  // Render as link or button
  if (href) {
    return (
      <a
        {...sharedProps}
        href={href}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        {startIcon && (
          <span className="flex-shrink-0">
            {typeof startIcon === 'function' ? <startIcon /> : startIcon}
          </span>
        )}
        {!loading && children}
        {loading && (
          <span className="flex-shrink-0 animate-spin h-4 w-4 border-2 border-primary/20 border-t-primary rounded-full">
          </span>
        )}
        {endIcon && (
          <span className="flex-shrink-0">
            {typeof endIcon === 'function' ? <endIcon /> : endIcon}
          </span>
        )}
      </a>
    );
  }

  return (
    <button
      {...sharedProps}
      type={type}
    >
      {startIcon && (
        <span className="flex-shrink-0">
          {typeof startIcon === 'function' ? <startIcon /> : startIcon}
        </span>
      )}
      {!loading && children}
      {loading && (
        <span className="flex-shrink-0 animate-spin h-4 w-4 border-2 border-primary/20 border-t-primary rounded-full">
        </span>
      )}
      {endIcon && (
        <span className="flex-shrink-0">
          {typeof endIcon === 'function' ? <endIcon /> : endIcon}
        </span>
      )}
    </button>
  );
};

export default Button;