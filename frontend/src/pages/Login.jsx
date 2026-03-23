import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Enter your credentials to access your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="space-y-1">
          <Input 
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <Link to="/forgot-password" size="sm" className="text-xs text-primary font-medium hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
        
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Sign In
        </Button>
      </form>
      
      <div className="mt-8 text-center pt-6 border-t border-outline-variant/10">
        <p className="text-sm text-on-surface-variant">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
