import React from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud,
  CheckCircle2,
  QrCode,
  Code2,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about', active: true },
  { name: 'Contact', href: '/contact' },
  { name: 'forUST', href: '/forust', isCta: true },
];
export function AboutPage() {
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
                  <Button className="bg-rysys-green-power text-white border-3 border-rysys-black shadow-brutal-gold hover:shadow-brutal-gold-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none font-bold uppercase py-6 px-8 h-auto">
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
        {/* About Hero */}
        <section className="mb-24">
          <Badge className="bg-white text-rysys-black border-2 border-rysys-gold rounded-none px-4 py-1 font-mono uppercase font-bold text-sm shadow-brutal-gold mb-8">
            Established 2025 // Core Infrastructure
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
            The RYSYS <br />
            <span className="text-rysys-green-power">Blueprint.</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium leading-loose max-w-3xl text-muted-foreground border-l-4 border-rysys-gold pl-8 md:pl-10">
            We don't just build systems; we engineer the physical reality that makes artificial intelligence possible. From high-voltage distribution to edge-embedded machine vision.
          </p>
        </section>
        {/* Leadership Bio */}
        <section className="bg-white border-4 border-rysys-black shadow-brutal-lg p-8 md:p-14 mb-24 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] bg-rysys-grey border-4 border-rysys-black shadow-brutal relative p-6 flex items-center justify-center overflow-hidden group cursor-pointer hover:bg-white transition-colors duration-300">
                <div
                  className="w-full h-full border-4 border-dashed border-rysys-gold/40 group-hover:border-rysys-gold flex flex-col items-center justify-center gap-4 text-center transition-colors"
                >
                  <UploadCloud className="w-12 h-12 text-rysys-gold animate-bounce group-hover:scale-110 transition-transform" />
                  <span className="font-black text-xs uppercase tracking-widest text-rysys-gold px-4">
                    Upload Portrait
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter">Engineering Leadership</h3>
                <p className="text-lg font-bold text-rysys-gold uppercase tracking-widest font-mono">Senior EE Lead // 4.0 GPA Graduate</p>
              </div>
              <p className="text-lg leading-relaxed font-medium">
                RYSYS was founded on the principle that the next generation of automation requires a fundamental rethinking of industrial infrastructure. Our leadership brings together academic excellence in Electrical Engineering with years of hands-on experience in critical infrastructure hardening and machine learning systems.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Academic Excellence (GPA 4.0)",
                  "Industrial Power Systems",
                  "Embedded AI Integration",
                  "Grid Reliability Expert"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="text-rysys-gold w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span className="font-bold text-sm uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Capability Recap */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Core <span className="text-rysys-gold">DNA</span></h2>
            <div className="h-2 w-24 bg-rysys-black" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CapabilitySummaryCard
              icon={<QrCode className="w-8 h-8" />}
              title="01. Computer Vision & AI"
              description="CNN-Based QR Localizer: neural nets for real-time localization."
              tags={["CNN", "QR-Localization", "Real-time"]}
            />
            <CapabilitySummaryCard
              icon={<Globe className="w-8 h-8" />}
              title="02. Energy Modeling"
              description="Geothermal Favorability: multi-layer datasets for prospecting."
              tags={["Geothermal", "Faults", "GIS"]}
            />
            <CapabilitySummaryCard
              icon={<Code2 className="w-8 h-8" />}
              title="03. Infrastructure"
              description="Systems Integration: CD-SEM, metrology, digital logic (TTL/CMOS)."
              tags={["CD-SEM", "Metrology", "TTL/CMOS"]}
            />
          </div>
        </section>
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
function CapabilitySummaryCard({ icon, title, description, tags }: { icon: React.ReactNode, title: string, description: string, tags: string[] }) {
  return (
    <Card className="bg-white border-4 border-rysys-black rounded-none p-8 shadow-brutal hover:shadow-brutal-gold hover:border-rysys-gold hover:-translate-y-1 transition-all group">
      <div className="w-12 h-12 bg-rysys-grey border-2 border-rysys-black flex items-center justify-center mb-6 group-hover:bg-rysys-gold group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase tracking-tighter mb-3">{title}</h3>
      <p className="text-sm font-medium text-muted-foreground mb-6">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map(t => (
          <span key={t} className="bg-rysys-grey border-2 border-rysys-black px-2 py-1 text-[10px] font-black uppercase group-hover:border-rysys-gold transition-colors">{t}</span>
        ))}
      </div>
    </Card>
  )
}