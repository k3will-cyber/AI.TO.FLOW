import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'ghost';
  className?: string;
  children: React.ReactNode;
}

const Badge = ({
  variant = 'primary',
  className = '',
  children
}: BadgeProps) => {
  const variantClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
    ghost: 'bg-text/5 text-text'
  };

  return (
    <span
      className={`${variantClasses[variant]} rounded-full px-3 py-0.5 text-text-xs font-semibold text-label-caps ${className}`}>
      {children}
    </span>
  );
};

export default Badge;