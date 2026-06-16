import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react';
import { Controller, type Control, type FieldValues, type Path, type RegisterOptions } from 'react-hook-form';

// ============================================
// Base Input Components
// ============================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-300 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 bg-neutral-900 border rounded-lg text-neutral-100
            placeholder:text-neutral-500 focus:outline-none transition-colors
            ${error ? 'border-error-500 focus:border-error-500' : 'border-neutral-700 focus:border-primary-500'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-neutral-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea component
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-neutral-300 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-3 bg-neutral-900 border rounded-lg text-neutral-100
            placeholder:text-neutral-500 resize-y min-h-[120px]
            focus:outline-none transition-colors
            ${error ? 'border-error-500 focus:border-error-500' : 'border-neutral-700 focus:border-primary-500'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-neutral-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Select component
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-neutral-300 mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-4 py-3 bg-neutral-900 border rounded-lg text-neutral-100
            focus:outline-none transition-colors appearance-none cursor-pointer
            bg-no-repeat bg-right-3
            ${error ? 'border-error-500 focus:border-error-500' : 'border-neutral-700 focus:border-primary-500'}
            ${className}
          `}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px'
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

// ============================================
// Form Field Component - Works with control prop
// ============================================

interface FormFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
  rules?: RegisterOptions;
  className?: string;
  control: Control<T>;
  required?: boolean;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  helperText,
  options,
  rules,
  className = '',
  control,
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        switch (type) {
          case 'textarea':
            return (
              <Textarea
                {...field}
                label={label}
                placeholder={placeholder}
                error={error?.message}
                helperText={helperText}
                className={className}
              />
            );
          case 'select':
            return (
              <Select
                {...field}
                label={label}
                options={options || []}
                placeholder={placeholder}
                error={error?.message}
                className={className}
              />
            );
          default:
            return (
              <Input
                {...field}
                type={type}
                label={label}
                placeholder={placeholder}
                error={error?.message}
                helperText={helperText}
                className={className}
              />
            );
        }
      }}
    />
  );
}

