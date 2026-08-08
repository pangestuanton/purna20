import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ children, className, variant = 'primary', ...props }: PropsWithChildren<ButtonProps>) {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-green-600 text-white shadow-[0_10px_24px_rgba(22,163,74,0.20)] hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-[0_14px_30px_rgba(22,163,74,0.24)]',
    secondary: 'border border-green-200 bg-green-50 text-green-900 shadow-sm hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-100',
    ghost: 'bg-transparent text-stone-700 hover:bg-stone-100',
  };

  return (
    <button
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-[15px] px-5 text-sm font-extrabold transition duration-200 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 disabled:active:scale-100',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
