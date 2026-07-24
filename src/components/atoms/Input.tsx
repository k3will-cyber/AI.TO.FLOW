import React from 'react';

interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = ({
  type = 'text',
  label,
  placeholder = '',
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
  inputClassName = '',
  startIcon,
  endIcon
}: InputProps) => {
  return (
    <div className={`${className} space-y-1.5`}>
      {label && (
        <label
          className="text-text-sm font-medium text-text"
        >
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {startIcon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`block w-full pl-${startIcon ? '9' : '3'} pr-${endIcon ? '9' : '3'}
            text-text-sm font-medium text-text bg-background border border-border
            rounded-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            ${inputClassName}`}
        />
        {endIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            {endIcon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-text-sm text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;