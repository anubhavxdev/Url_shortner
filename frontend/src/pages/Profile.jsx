import React from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User, Mail, Shield, Calendar, Settings } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-on-surface tracking-tight">Profile Settings</h1>
        <p className="text-on-surface-variant text-sm">Manage your personal information and preferences</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-4 bg-surface-container-low border-none">
            <div className="space-y-1">
              {[
                { label: 'General', icon: <User size={18} />, active: true },
                { label: 'Security', icon: <Shield size={18} />, active: false },
                { label: 'Preferences', icon: <Settings size={18} />, active: false },
              ].map((item, i) => (
                <button 
                  key={i}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    item.active 
                    ? 'bg-primary text-on-primary shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8">
            <h2 className="text-xl font-bold text-on-surface mb-6">Account Information</h2>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-20 h-20 rounded-2xl btn-gradient flex items-center justify-center text-on-primary text-3xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-lg font-bold text-on-surface">{user?.name || 'User'}</h3>
                  <p className="text-sm text-on-surface-variant flex items-center space-x-1">
                    <Mail size={14} />
                    <span>{user?.email || 'user@example.com'}</span>
                  </p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold flex items-center space-x-1 pt-1">
                    <Calendar size={12} />
                    <span>Member since March 2026</span>
                  </p>
                </div>
                <Button variant="secondary" size="sm">Change Avatar</Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <Input label="Full Name" defaultValue={user?.name} />
                <Input label="Email Address" defaultValue={user?.email} disabled />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-error/5 border-error/10">
            <h2 className="text-xl font-bold text-error mb-2">Danger Zone</h2>
            <p className="text-sm text-on-surface-variant mb-6">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="secondary" className="border-error/20 text-error hover:bg-error/10">
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
