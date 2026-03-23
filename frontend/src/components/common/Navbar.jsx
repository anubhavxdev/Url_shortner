import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { LogOut, User, LayoutDashboard, Link as LinkIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center text-on-primary">
            <LinkIcon size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-on-surface">Shortify</span>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center space-x-1">
                <LayoutDashboard size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link to="/profile" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center space-x-1">
                <User size={16} />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center space-x-1">
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
