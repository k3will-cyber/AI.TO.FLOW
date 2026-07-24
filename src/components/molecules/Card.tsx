import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outline';
}

const Card = ({
  title,
  description,
  footer,
  className = '',
  children,
  variant = 'default'
}: CardProps) => {
  const variantClasses = {
    default: 'bg-surface border border-border',
    elevated: 'bg-surface border-border shadow-card',
    outline: 'bg-transparent border border-border'
  };

  return (
    <div className={`rounded-xl ${variantClasses[variant]} p-6 ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-text-lg font-semibold text-text">{title}</h3>
          {description && (
            <p className="text-text-sm text-text-muted mt-1">{description}</p>
          )}
        </div>
      )}

      <div className="mb-4">{children}</div>

      {footer && (
        <div className="mt-4 pt-4 border-t border-border/20">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;