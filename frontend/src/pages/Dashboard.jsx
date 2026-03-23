import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Table from '../components/ui/Table';
import Loader from '../components/common/Loader';
import { toast } from 'sonner';
import { ExternalLink, Copy, Trash2, Plus, BarChart3, Search } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState('');

  const fetchUrls = async () => {
    try {
      const response = await api.post('/user/urls');
      setUrls(response.data.urls || []);
    } catch (error) {
      console.error('Failed to fetch URLs', error);
      toast.error('Failed to load your URLs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post('/create/', { url: originalUrl, slug: alias });
      toast.success('URL shortened successfully!');
      setOriginalUrl('');
      setAlias('');
      fetchUrls();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (shortUrl) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;
    try {
      await api.delete(`/create/${shortUrl}`);
      toast.success('Link deleted successfully');
      fetchUrls();
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const copyToClipboard = (shortUrl) => {
    const fullUrl = `${window.location.origin}/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Copied to clipboard!');
  };

  const filteredUrls = urls.filter(url => 
    (url.full_url || '').toLowerCase().includes(search.toLowerCase()) || 
    (url.short_url || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader /></div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-on-surface tracking-tight">Dashboard</h1>
          <p className="text-on-surface-variant text-sm">Manage and track your shortened links</p>
        </div>
        <div className="flex items-center space-x-2 bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/15">
          <BarChart3 size={16} className="text-primary" />
          <span className="text-sm font-bold text-on-surface">Total Clicks: <span className="text-primary">2.4k</span></span>
        </div>
      </header>

      {/* Create Section */}
      <Card className="p-8">
        <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center space-x-2">
          <Plus size={20} className="text-primary" />
          <span>Shorten New URL</span>
        </h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <div className="md:col-span-3">
            <Input 
              placeholder="Paste your long URL here..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Input 
              placeholder="Custom alias (optional)"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" loading={creating} className="w-full h-full" size="md">
              Shorten URL
            </Button>
          </div>
        </form>
      </Card>

      {/* List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-on-surface">Your Links</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <input 
              type="text"
              placeholder="Search links..."
              className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table 
          headers={['Original URL', 'Short Link', 'Clicks', 'Actions']}
          data={filteredUrls}
          renderRow={(url) => (
            <>
              <td className="px-6 py-4">
                <div className="max-w-xs truncate text-sm font-medium text-on-surface" title={url.full_url}>
                  {url.full_url}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-primary">{url.short_url}</span>
                  <button 
                    onClick={() => copyToClipboard(url.short_url)}
                    className="p-1 hover:bg-primary/10 rounded transition-colors text-primary"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-bold text-on-surface">{url.clicks || 0}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <a 
                    href={url.full_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button 
                    onClick={() => handleDelete(url.short_url)}
                    className="p-2 hover:bg-error/10 rounded-lg text-error transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default Dashboard;
