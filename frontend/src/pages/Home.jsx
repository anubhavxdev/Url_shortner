import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Zap, Shield, BarChart3, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl hero-gradient p-12 sm:p-20 text-center">
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase">
            Architectural Precision
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
            Shorten your links with <span className="text-primary">Digital Integrity</span>
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Our URL shortener moves beyond generic utility to create an experience of architectural precision. 
            Weightless, structurally sound, and premium.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">Get Started for Free</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">Sign In</Button>
            </Link>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/30 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-secondary/30 blur-[120px] rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-on-surface">Precision Built Features</h2>
          <p className="text-on-surface-variant">
            Every element is designed to provide depth without visual noise, following a "Digital Architect" philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <Zap className="text-primary" />, 
              title: "Lightning Fast", 
              desc: "Links are redirected in milliseconds through our globally distributed edge network." 
            },
            { 
              icon: <Shield className="text-primary" />, 
              title: "Secure & Private", 
              desc: "Your data is encrypted and protected with industry-leading security standards." 
            },
            { 
              icon: <BarChart3 className="text-primary" />, 
              title: "Advanced Analytics", 
              desc: "Deep insights into your link performance with real-time tracking and metrics." 
            },
            { 
              icon: <Globe className="text-primary" />, 
              title: "Custom Domains", 
              desc: "Branded links that build trust and increase click-through rates for your brand." 
            }
          ].map((feature, i) => (
            <Card key={i} className="hover:translate-y-[-4px] transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">{feature.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {feature.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="bg-surface-container-low rounded-3xl p-12 overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { label: "Links Created", value: "12M+" },
            { label: "Monthly Clicks", value: "850M+" },
            { label: "Active Users", value: "2M+" },
            { label: "Global Presence", value: "190+" }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-3xl sm:text-4xl font-black text-primary tracking-tighter">{stat.value}</p>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
