import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Loader from '../common/Loader';

const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  loading, 
  disabled, 
  ...props 
}) => {
  const variants = {
    primary: 'btn-gradient text-on-primary shadow-ambient hover:translate-y-[-2px] transition-all duration-300',
    secondary: 'bg-transparent border border-outline-variant/15 text-primary hover:bg-surface-container-high transition-all duration-300',
    ghost: 'text-on-surface-variant hover:bg-surface-container-high transition-all duration-300',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-sm',
    md: 'px-6 py-2.5 text-sm font-medium rounded-md',
    lg: 'px-8 py-3.5 text-base font-semibold rounded-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader className="w-4 h-4 border-2" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
