import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact', active: true },
  { name: 'Community Portal', href: '/#portal', isCta: true },
];
export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:support@rysys.org?subject=${encodeURIComponent(`RYSYS Contact: ${subject || name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };
  const isFormValid = formData.name && formData.email && formData.message;
  return (
    <div className="min-h-screen bg-rysys-cream text-rysys-black selection:bg-rysys-gold selection:text-white font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-rysys-black px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-20 md:h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-rysys-gold border-3 border-rysys-black flex items-center justify-center shadow-brutal-gold group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-brutal-gold-hover transition-all">
              <span className="text-white font-black text-xl">R</span>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">RYSYS</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              link.isCta ? (
                <a key={link.name} href={link.href} className="inline-block">
                  <Button className="bg-rysys-blue text-white border-3 border-rysys-black shadow-brutal-gold hover:shadow-brutal-gold-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none font-bold uppercase py-6 px-8 h-auto">
                    {link.name}
                  </Button>
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-rysys-gold ${link.active ? 'text-rysys-gold underline underline-offset-8 decoration-4' : ''}`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="mb-16">
          <Badge className="bg-white text-rysys-black border-2 border-rysys-gold rounded-none px-4 py-1 font-mono uppercase font-bold text-sm shadow-brutal-gold mb-8">
            Response Status: WITHIN 48H
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
            Get In <span className="text-rysys-gold">Contact.</span>
          </h1>
          <p className="text-xl font-medium text-muted-foreground max-w-2xl">
            Inquire about engineering consultations, technical partnerships, or system integrations.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Details */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-white border-4 border-rysys-black shadow-brutal flex items-center justify-center flex-shrink-0 group-hover:shadow-brutal-gold transition-all">
                  <Mail className="w-8 h-8 text-rysys-gold" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black uppercase tracking-widest text-sm">Email Support</h4>
                  <a href="mailto:support@rysys.org" className="text-2xl font-black hover:text-rysys-gold transition-colors">support@rysys.org</a>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-white border-4 border-rysys-black shadow-brutal flex items-center justify-center flex-shrink-0 group-hover:shadow-brutal-gold transition-all">
                  <MapPin className="w-8 h-8 text-rysys-gold" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black uppercase tracking-widest text-sm">Office Location</h4>
                  <p className="text-2xl font-black">Portland, Oregon</p>
                </div>
              </div>
            </div>
            <div className="bg-rysys-blue border-4 border-rysys-black p-8 shadow-brutal-gold">
              <p className="text-white font-bold uppercase tracking-widest text-xs mb-4">Availability</p>
              <p className="text-white text-lg font-medium leading-relaxed">
                Mon — Fri: 08:00 — 18:00 PST <br />
                Emergency Support: 24/7 (Registered Partners)
              </p>
            </div>
          </div>
          {/* Form */}
          <Card className="bg-white border-4 border-rysys-black rounded-none p-8 md:p-10 shadow-brutal-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-black uppercase tracking-widest text-xs">Full Name *</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="JOHN DOE"
                  className="rounded-none border-2 border-rysys-black bg-rysys-cream focus:ring-rysys-gold focus:border-rysys-gold font-bold uppercase placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-black uppercase tracking-widest text-xs">Email Address *</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="JD@EXAMPLE.COM"
                  className="rounded-none border-2 border-rysys-black bg-rysys-cream focus:ring-rysys-gold focus:border-rysys-gold font-bold uppercase placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-black uppercase tracking-widest text-xs">Subject</Label>
                <Input 
                  id="subject"
                  value={formData.subject}
                  onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="PROJECT INQUIRY"
                  className="rounded-none border-2 border-rysys-black bg-rysys-cream focus:ring-rysys-gold focus:border-rysys-gold font-bold uppercase placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="font-black uppercase tracking-widest text-xs">Message *</Label>
                <Textarea 
                  id="message"
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  placeholder="TELL US ABOUT YOUR INFRASTRUCTURE NEEDS..."
                  className="rounded-none border-2 border-rysys-black bg-rysys-cream focus:ring-rysys-gold focus:border-rysys-gold font-bold uppercase min-h-[150px] placeholder:text-muted-foreground/50"
                />
              </div>
              <Button 
                type="submit" 
                disabled={!isFormValid}
                className="w-full bg-rysys-black text-white hover:bg-rysys-gold transition-colors rounded-none h-14 font-black uppercase tracking-widest text-lg border-2 border-rysys-black disabled:opacity-50 disabled:bg-muted-foreground"
              >
                Send Message <Send className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-[10px] font-bold text-muted-foreground uppercase text-center">
                This form will open your default email client. No data is stored on our servers.
              </p>
            </form>
          </Card>
        </div>
      </main>
      <footer className="border-t-4 border-rysys-black bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-xs font-bold text-muted-foreground uppercase">
            © 2025 RYSYS Infrastructure & Engineering. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}