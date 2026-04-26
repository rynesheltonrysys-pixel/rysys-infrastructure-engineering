import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal,
  ExternalLink,
  Code2,
  HardHat
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const NAVBAR_LINKS = [
  { name: 'Infrastructure', href: '#infrastructure' },
  { name: 'Engineering', href: '#engineering' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Portal', href: '#portal' },
];
const TRUST_LOGOS = [
  { name: 'IEEE', icon: <Zap className="w-5 h-5" /> },
  { name: 'ANSI', icon: <Cpu className="w-5 h-5" /> },
  { name: 'OSHA', icon: <ShieldCheck className="w-5 h-5" /> },
  { name: 'NEMA', icon: <HardHat className="w-5 h-5" /> },
];
export function HomePage() {
  return (
    <div className="min-h-screen bg-rysys-cream text-rysys-black selection:bg-rysys-blue selection:text-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-rysys-black px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-rysys-blue border-3 border-rysys-black flex items-center justify-center shadow-brutal">
              <span className="text-white font-black text-xl">R</span>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">RYSYS</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAVBAR_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold uppercase tracking-widest hover:text-rysys-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-rysys-blue text-white border-3 border-rysys-black shadow-brutal hover:shadow-brutal-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none font-bold uppercase py-6 px-8">
              Work With Us
            </Button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <Badge className="bg-rysys-grey text-rysys-black border-2 border-rysys-black rounded-none px-4 py-1 font-mono uppercase font-bold text-sm shadow-brutal">
              Established 2025 // v1.0.4
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
              Physical <br />
              <span className="text-rysys-blue">Intelligence</span> <br />
              at Scale.
            </h1>
            <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-2xl text-muted-foreground border-l-4 border-rysys-black pl-6">
              RYSYS bridges the gap between massive-scale electrical infrastructure and next-generation AI automation. 
              Engineering the foundation for the silicon century.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-white text-rysys-black border-3 border-rysys-black shadow-brutal hover:shadow-brutal-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none font-black uppercase py-8 px-10 text-lg">
                View Capabilities <ArrowRight className="ml-2" />
              </Button>
              <Button variant="ghost" className="border-3 border-transparent hover:border-rysys-black rounded-none font-black uppercase py-8 px-10 text-lg">
                Our Mission
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square bg-rysys-blue border-4 border-rysys-black shadow-brutal-lg flex items-center justify-center p-8 overflow-hidden relative group">
              <Cpu className="w-full h-full text-white/20 absolute rotate-12 group-hover:rotate-45 transition-transform duration-700" />
              <div className="bg-white p-6 border-4 border-rysys-black shadow-brutal z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-tighter">System Health: Nominal</span>
                </div>
                <div className="space-y-1 font-mono text-sm">
                  <p className="text-rysys-blue font-bold">GRID_LINK: ACTIVE</p>
                  <p>PWR_LOAD: 4.8 GW</p>
                  <p>AI_SYNC: 99.99%</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 border-4 border-rysys-black px-6 py-4 shadow-brutal z-20">
              <span className="font-black italic text-xl uppercase">Safety First.</span>
            </div>
          </div>
        </div>
      </header>
      {/* Trust Bar */}
      <section className="bg-rysys-black py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            {TRUST_LOGOS.map((logo) => (
              <div key={logo.name} className="flex items-center gap-3 text-white">
                {logo.icon}
                <span className="text-xl font-black tracking-widest">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Capabilities Grid */}
      <section id="infrastructure" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Proven <span className="text-rysys-blue">Capabilities</span>
          </h2>
          <div className="h-2 w-32 bg-rysys-black" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CapabilityCard 
            icon={<Zap className="w-10 h-10" />}
            title="High-Voltage Engineering"
            description="Specialized design for substation automation and grid-scale power distribution systems. We handle the heavy lifting."
            tags={["400kV", "SCADA", "Protective Relaying"]}
          />
          <CapabilityCard 
            icon={<Code2 className="w-10 h-10" />}
            title="Industrial AI Ops"
            description="Machine learning models deployed at the edge for predictive maintenance of critical electrical infrastructure."
            tags={["TensorFlow", "Edge-Computing", "IoT"]}
          />
          <CapabilityCard 
            icon={<Globe className="w-10 h-10" />}
            title="Sustainable Infra"
            description="Integrating renewable sources into legacy grids with smart-switching technology and battery storage solutions."
            tags={["BESS", "Microgrids", "Solar-Tie"]}
          />
        </div>
      </section>
      {/* Leadership Profile */}
      <section id="leadership" className="bg-rysys-grey py-20 border-y-4 border-rysys-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-4 border-rysys-black shadow-brutal-lg p-8 md:p-12 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4">
                <div className="aspect-[4/5] bg-rysys-blue border-4 border-rysys-black shadow-brutal relative overflow-hidden">
                  {/* Placeholder for Founder Portrait */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center grayscale contrast-125" />
                  <div className="absolute inset-0 bg-rysys-blue/20 mix-blend-multiply" />
                </div>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Director of Engineering</h3>
                  <p className="text-xl font-bold text-rysys-blue uppercase tracking-widest font-mono">GPA 4.0 / Senior EE Lead</p>
                </div>
                <p className="text-lg leading-relaxed font-medium">
                  With a background spanning core electrical engineering and advanced machine learning, our leadership ensures that RYSYS solutions aren't just theoretically sound—they're industrially hardened. We believe infrastructure should be as smart as the silicon it powers.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Electrical Power Systems Specialists",
                    "Certified ML Systems Architect",
                    "Critical Infrastructure Consultant",
                    "Lead Developer: GridOS Core"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-rysys-blue w-5 h-5 flex-shrink-0" />
                      <span className="font-bold text-sm uppercase">{item}</span>
                    </div>
                  ))}
                </div>
                <Button className="bg-rysys-black text-white border-3 border-rysys-black shadow-brutal-blue hover:translate-x-1 hover:translate-y-1 transition-all rounded-none py-6 px-10 font-bold uppercase mt-4">
                  Full Technical Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Community Portal CTA */}
      <section id="portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-rysys-blue border-4 border-rysys-black p-10 md:p-16 text-center shadow-brutal-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rotate-45 translate-x-16 -translate-y-16" />
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
            Join the RYSYS <br /> Community
          </h2>
          <p className="text-white/80 text-xl md:text-2xl font-bold mb-10 max-w-2xl mx-auto">
            Access our open-source infrastructure tools, engineering standards, and technical whitepapers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-rysys-black border-3 border-rysys-black shadow-brutal hover:shadow-brutal-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none font-black uppercase py-8 px-12 text-xl">
              Enter Portal <Terminal className="ml-2" />
            </Button>
            <Button variant="ghost" className="text-white border-3 border-white hover:bg-white hover:text-rysys-blue rounded-none font-black uppercase py-8 px-12 text-xl">
              Documentation
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t-4 border-rysys-black bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-rysys-black border-2 border-rysys-black flex items-center justify-center shadow-brutal">
                  <span className="text-white font-black">R</span>
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase">RYSYS</span>
              </div>
              <p className="text-lg font-bold text-muted-foreground max-w-sm">
                Engineering the physical foundations of tomorrow's digital world. Strength, precision, and intelligence at scale.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 border-b-2 border-rysys-black pb-2 inline-block">Sitemap</h4>
              <ul className="space-y-4 font-bold uppercase text-sm">
                <li><a href="#" className="hover:text-rysys-blue transition-colors">Project Portfolio</a></li>
                <li><a href="#" className="hover:text-rysys-blue transition-colors">Technical Papers</a></li>
                <li><a href="#" className="hover:text-rysys-blue transition-colors">Safety Records</a></li>
                <li><a href="#" className="hover:text-rysys-blue transition-colors">Career Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 border-b-2 border-rysys-black pb-2 inline-block">Contact</h4>
              <ul className="space-y-4 font-bold uppercase text-sm">
                <li><a href="#" className="hover:text-rysys-blue transition-colors">HQ - Texas, USA</a></li>
                <li><a href="#" className="hover:text-rysys-blue transition-colors">systems@rysys.dev</a></li>
                <li><a href="#" className="hover:text-rysys-blue transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-rysys-blue transition-colors">Twitter (X)</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t-2 border-rysys-grey gap-4">
            <span className="font-mono text-xs font-bold text-muted-foreground uppercase">
              © 2025 RYSYS Infrastructure & Engineering. All rights reserved.
            </span>
            <div className="flex gap-6 font-mono text-xs font-bold uppercase">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
function CapabilityCard({ icon, title, description, tags }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  tags: string[];
}) {
  return (
    <Card className="bg-white border-4 border-rysys-black rounded-none p-8 shadow-brutal hover:shadow-brutal-lg transition-all duration-300 group">
      <div className="w-16 h-16 bg-rysys-grey border-3 border-rysys-black flex items-center justify-center mb-6 group-hover:bg-rysys-blue group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{title}</h3>
      <p className="font-medium text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="bg-rysys-grey border-2 border-rysys-black px-2 py-1 text-[10px] font-mono font-black uppercase">
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
}