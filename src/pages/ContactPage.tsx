import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Send, Cpu, Briefcase, Trees } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact', active: true },
  { name: 'for-US-t', href: '/forust', isCta: true },
];
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});
type ContactFormValues = z.infer<typeof contactSchema>;
export function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });
  const onSubmit = (values: ContactFormValues) => {
    const { name, email, subject, message } = values;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:support@rysys.org?subject=${encodeURIComponent(`RYSYS Contact: ${subject || name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };
  return (
    <div className="min-h-screen bg-rysys-cream text-rysys-black selection:bg-rysys-gold selection:text-white font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-rysys-black px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-20 md:h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-rysys-gold border-3 border-rysys-black flex flex-col items-center justify-center shadow-brutal-gold group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-brutal-gold-hover transition-all leading-none overflow-hidden">
              <span className="text-white font-black text-[10px] select-none">RY</span>
              <span className="text-white font-black text-[10px] select-none">SYS</span>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">RYSYS</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              link.isCta ? (
                <Link key={link.name} to={link.href} className="inline-block">
                  <Button className="bg-rysys-green-power text-white border-3 border-rysys-black shadow-brutal-gold hover:shadow-brutal-gold-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none py-6 px-8 h-auto flex items-center gap-2">
                    <Trees className="w-5 h-5 text-rysys-gold" />
                    <span className="font-black uppercase tracking-[0.1em]">{link.name}</span>
                    <Trees className="w-5 h-5 text-rysys-gold" />
                  </Button>
                </Link>
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
            Get In <span className="text-rysys-green-power">Contact.</span>
          </h1>
          <p className="text-xl font-medium text-muted-foreground max-w-2xl">
            Inquire about engineering consultations, technical partnerships, or system integrations.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-10">
            <Card className="bg-white border-4 border-rysys-black p-8 md:p-12 shadow-brutal hover:shadow-brutal-gold transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rysys-gold/10 -rotate-45 translate-x-12 -translate-y-12" />
              <div className="flex flex-col gap-10 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-rysys-black flex flex-col items-center justify-center shadow-brutal-gold group-hover:scale-105 transition-transform leading-none overflow-hidden">
                    <span className="text-white font-black text-xs">RY</span>
                    <span className="text-white font-black text-xs">SYS</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">RYSYS</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-rysys-gold">Infrastructure & Engineering</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Lead Engineer</p>
                    <h4 className="text-3xl font-black uppercase tracking-tighter">Ryne Frank Shelton</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3 font-bold uppercase text-sm group/item">
                      <MapPin className="w-5 h-5 text-rysys-green-power" />
                      <span>Portland, Oregon — USA</span>
                    </div>
                    <div className="flex items-center gap-3 font-bold uppercase text-sm group/item">
                      <Mail className="w-5 h-5 text-rysys-green-power" />
                      <a href="mailto:support@rysys.org" className="hover:text-rysys-gold transition-colors">support@rysys.org</a>
                    </div>
                    <div className="flex items-center gap-3 font-bold uppercase text-sm">
                      <Briefcase className="w-5 h-5 text-rysys-green-power" />
                      <span>Registered Industrial Partner</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <Card className="bg-white border-4 border-rysys-black rounded-none p-8 md:p-10 shadow-brutal-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black uppercase tracking-widest text-xs">Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="RYNE SHELTON" {...field} className="rounded-none border-2 border-rysys-black bg-rysys-cream font-bold uppercase" />
                      </FormControl>
                      <FormMessage className="text-red-600 font-bold uppercase text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black uppercase tracking-widest text-xs">Email Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="RS@RYSYS.ORG" {...field} className="rounded-none border-2 border-rysys-black bg-rysys-cream font-bold uppercase" />
                      </FormControl>
                      <FormMessage className="text-red-600 font-bold uppercase text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black uppercase tracking-widest text-xs">Message *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="DESCRIBE YOUR SYSTEM REQUIREMENTS..." {...field} className="rounded-none border-2 border-rysys-black bg-rysys-cream font-bold uppercase min-h-[150px]" />
                      </FormControl>
                      <FormMessage className="text-red-600 font-bold uppercase text-[10px]" />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={!form.formState.isValid} className="w-full bg-rysys-black text-white hover:bg-rysys-green-power hover:shadow-brutal-gold transition-all rounded-none h-14 font-black uppercase tracking-widest text-lg border-2 border-rysys-black disabled:opacity-30 group">
                  Send Proposal <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Form>
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