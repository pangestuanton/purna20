import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'min-h-12 w-full rounded-[15px] border border-stone-200 bg-[#fffefa] px-4 text-sm font-medium text-stone-950 shadow-[0_1px_0_rgba(28,25,23,0.02)] outline-none transition duration-200 placeholder:font-normal placeholder:text-stone-400 hover:border-stone-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/12 disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-400',
        className,
      )}
      {...props}
    />
  );
}
