import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

const Card = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-surface-container-lowest rounded-xl shadow-ambient border border-outline-variant/15 p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
