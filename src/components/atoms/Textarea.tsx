import React from 'react';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
  textareaClassName?: string;
}

const Textarea = ({
  label,
  placeholder = '',
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  textareaClassName = ''
}: TextareaProps) => {
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
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          rows={rows}
          className={`block w-full min-h-[80px] resize-y text-text-sm font-medium text-text bg-background border border-border
            rounded-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            ${textareaClassName}`}
        />
      </div>
      {error && (
        <p className="text-text-sm text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;