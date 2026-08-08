import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        'rounded-[26px] border border-stone-200/80 bg-white p-5 shadow-[0_16px_44px_rgba(41,55,44,0.07)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
