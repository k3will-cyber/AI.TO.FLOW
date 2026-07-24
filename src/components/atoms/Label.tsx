import React from 'react';

interface LabelProps {
  htmlFor?: string;
  className?: string;
  required?: boolean;
  children: React.ReactNode;
}

const Label = ({
  htmlFor,
  className = '',
  required = false,
  children
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${className} text-text-sm font-semibold text-text`}
    >
      {children}
      {required && (
        <span className="ml-1 text-destructive">*</span>
      )}
    </label>
  );
};

export default Label;