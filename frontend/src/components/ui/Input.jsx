import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

const Input = React.forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-on-surface-variant ml-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 bg-surface-container-highest border-none rounded-md text-on-surface outline-none transition-all duration-300",
          "focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20",
          error && "ring-2 ring-error/20 bg-error-container/10",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-error mt-1 ml-1 font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
