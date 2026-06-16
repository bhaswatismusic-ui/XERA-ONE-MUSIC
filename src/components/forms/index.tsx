import { type FormHTMLAttributes, type ReactNode } from 'react';
import { FormProvider, useForm, type UseFormProps, type DefaultValues } from 'react-hook-form';
import type { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui';

interface FormProps<T extends Record<string, unknown>> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  schema: ZodType<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: ReactNode;
  className?: string;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'all';
}

export function Form<T extends Record<string, unknown>>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className = '',
  mode = 'onBlur',
  ...props
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-6 ${className}`}
        noValidate
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}

// Form submit button
interface FormSubmitProps {
  label?: string;
  loadingLabel?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function FormSubmit({
  label = 'Submit',
  loadingLabel = 'Submitting...',
  className = '',
  variant = 'primary',
  size = 'lg',
}: FormSubmitProps) {
  const { formState: { isSubmitting } } = useForm();

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      isLoading={isSubmitting}
      fullWidth
      className={className}
    >
      {isSubmitting ? loadingLabel : label}
    </Button>
  );
}

// useForm hook wrapper for external access
export { useFormContext } from 'react-hook-form';

export * from './FormField';
