import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkIcon } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <Link to="/" className="mb-8 flex items-center space-x-2">
        <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center text-on-primary">
          <LinkIcon size={24} />
        </div>
        <span className="text-2xl font-bold tracking-tight text-on-surface">Shortify</span>
      </Link>
      
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-xl shadow-ambient border border-outline-variant/15">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-on-surface mb-2">{title}</h1>
          <p className="text-on-surface-variant text-sm">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
