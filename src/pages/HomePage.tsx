import React from 'react';
import { Link } from 'react-router-dom';
import {
  QrCode,
  Cpu,
  Globe,
  CheckCircle2,
  Terminal,
  Code2,
  Mail,
  MapPin,
  UploadCloud
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const NAVBAR_LINKS = [
  { name: 'Capabilities', href: '#capabilities', isAnchor: true },
  { name: 'Leadership', href: '#leadership', isAnchor: true },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Community Portal', href: '#portal', isCta: true, isAnchor: true },
];
const TRUST_AFFILIATIONS = ['IEEE', 'ANSI', 'OSHA', 'NEMA'];
export function HomePage() {
  return (
    <div className="min-h-screen bg-rysys-cream text-rysys-black selection:bg-rysys-gold selection:text-white font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-rysys-black px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-rysys-gold border-3 border-rysys-black flex items-center justify-center shadow-brutal-gold group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-brutal-gold-hover transition-all">
              <span className="text-white font-black text-xl">R</span>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">RYSYS</span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {NAVBAR_LINKS.map((link) => (
              link.isCta ? (
                <a key={link.name} href={link.href} className="inline-block">
                  <Button className="bg-rysys-blue text-white border-3 border-rysys-black shadow-brutal-gold hover:shadow-brutal-gold-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none font-bold uppercase py-6 px-8 h-auto">
                    {link.name}
                  </Button>
                </a>
              ) : (
                link.isAnchor ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-bold uppercase tracking-widest hover:text-rysys-gold transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-bold uppercase tracking-widest hover:text-rysys-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              )
            ))}
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b-4 border-rysys-black">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1541457523724-95f54f7740cc?auto=format&fit=crop&q=80&w=1600"
            alt="Portland Skyline"
            className="w-full h-full object-cover object-center grayscale contrast-125 opacity-20"
          />
          <div className="absolute inset-0 bg-rysys-blue/10 mix-blend-multiply" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-10 md:space-y-12">
              <Badge className="bg-white text-rysys-black border-2 border-rysys-gold rounded-none px-4 py-1 font-mono uppercase font-bold text-sm shadow-brutal-gold">
                Established 2025 // <span className="text-rysys-gold">v1.1.0</span>
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
                Physical <br />
                <span className="text-rysys-blue">Intelligence</span> <br />
                at Scale.
              </h1>
              <p className="mt-4 text-xl md:text-2xl font-medium leading-loose max-w-2xl text-muted-foreground border-l-4 border-rysys-gold pl-8 md:pl-10 bg-rysys-cream/80 backdrop-blur-sm md:bg-transparent">
                RYSYS bridges the gap between massive-scale electrical infrastructure and next-generation AI automation.
                Engineering the foundation for the silicon century.
              </p>
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
                    <p className="text-rysys-gold font-bold">GRID_LINK: ACTIVE</p>
                    <p>PWR_LOAD: 4.8 GW</p>
                    <p>AI_SYNC: 99.99%</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 border-4 border-rysys-gold px-6 py-4 shadow-brutal-gold z-20">
                <span className="font-black italic text-xl uppercase">Safety First.</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Trust Bar */}
      <section className="bg-rysys-black py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-16">
            {TRUST_AFFILIATIONS.map((name) => (
              <span key={name} className="text-white text-3xl md:text-5xl font-black tracking-[0.2em] uppercase opacity-80 hover:text-rysys-gold hover:opacity-100 transition-all cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* Capabilities Grid */}
      <section id="capabilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Proven <span className="text-rysys-gold">Capabilities</span>
          </h2>
          <div className="h-2 w-32 bg-rysys-black" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          <CapabilityCard
            icon={<QrCode className="w-10 h-10" />}
            title="Machine Vision & SoC"
            description="CNN-Based QR Localizer and SoC integration for noisy environments. Real-time embedded processing for robust edge perception."
            tags={["CNN", "QR Localization", "Real-time SoC"]}
          />
          <CapabilityCard
            icon={<Code2 className="w-10 h-10" />}
            title="Industrial AI Ops"
            description="Machine learning models deployed at the edge for predictive maintenance of critical electrical infrastructure."
            tags={["TensorFlow", "Edge-Computing", "IoT"]}
          />
          <CapabilityCard
            icon={<Globe className="w-10 h-10" />}
            title="Energy Modeling & Infra"
            description="High-fidelity energy modeling and smart-switching technology to integrate battery storage (BESS) into legacy power grids."
            tags={["BESS", "Microgrids", "Solar-Tie"]}
          />
        </div>
      </section>
      {/* Leadership Profile */}
      <section id="leadership" className="bg-rysys-grey py-24 md:py-28 border-y-4 border-rysys-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-4 border-rysys-black shadow-brutal-gold-lg p-10 md:p-14 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
              <div className="lg:col-span-4">
                <div className="aspect-[4/5] bg-rysys-grey border-4 border-rysys-black shadow-brutal relative p-6 flex items-center justify-center overflow-hidden group cursor-pointer hover:bg-white transition-colors duration-300">
                  <div
                    className="w-full h-full border-4 border-dashed border-rysys-gold/40 group-hover:border-rysys-gold flex flex-col items-center justify-center gap-4 text-center transition-colors"
                    aria-label="Upload Leadership Portrait Placeholder"
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
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Director of Engineering</h3>
                  <p className="text-xl font-bold text-rysys-gold uppercase tracking-widest font-mono">GPA 4.0 / Senior EE Lead</p>
                </div>
                <p className="text-lg leading-relaxed font-medium">
                  With a background spanning core electrical engineering and advanced machine learning, our leadership ensures that RYSYS solutions aren't just theoretically sound—they're industrially hardened. We believe infrastructure should be as smart as the silicon it powers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    "Electrical Power Systems Specialists",
                    "Certified ML Systems Architect",
                    "Critical Infrastructure Consultant",
                    "Lead Developer: GridOS Core"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-rysys-gold w-5 h-5 flex-shrink-0" />
                      <span className="font-bold text-sm uppercase">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Community Portal CTA */}
      <section id="portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28">
        <div className="bg-rysys-blue border-4 border-rysys-black p-12 md:p-20 text-center shadow-brutal-gold-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rotate-45 translate-x-16 -translate-y-16" />
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">
            Join the RYSYS <br /> Community
          </h2>
          <p className="text-white/80 text-xl md:text-2xl font-bold mb-12 max-w-2xl mx-auto leading-relaxed">
            Access our open-source infrastructure tools, engineering standards, and technical whitepapers.
          </p>
          <div className="flex justify-center mt-4">
            <Button className="bg-white text-rysys-black border-3 border-rysys-black shadow-brutal-gold hover:shadow-brutal-gold-hover hover:text-rysys-gold hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none font-black uppercase py-8 px-12 text-xl h-auto group">
              Review Open Proposals <Terminal className="ml-2 group-hover:text-rysys-gold transition-colors" />
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t-4 border-rysys-black bg-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-16 mb-20">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-rysys-gold border-2 border-rysys-black flex items-center justify-center shadow-brutal-gold">
                  <span className="text-white font-black">R</span>
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase">RYSYS</span>
              </div>
              <p className="text-lg font-bold text-muted-foreground leading-relaxed">
                Engineering the physical foundations of tomorrow's digital world. Strength, precision, and intelligence at scale.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 border-b-2 border-rysys-gold pb-2 inline-block">Sitemap</h4>
              <div className="space-y-4 font-bold uppercase text-sm flex flex-col text-muted-foreground">
                <Link to="/" className="hover:text-rysys-gold transition-colors">Home</Link>
                <Link to="/about" className="hover:text-rysys-gold transition-colors">About RYSYS</Link>
                <Link to="/contact" className="hover:text-rysys-gold transition-colors">Contact</Link>
                <a href="#portal" className="hover:text-rysys-gold transition-colors">Community Portal</a>
              </div>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 border-b-2 border-rysys-gold pb-2 inline-block">Contact</h4>
              <div className="space-y-4 font-bold uppercase text-sm flex flex-col text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rysys-gold" />
                  <span>Portland, Oregon</span>
                </div>
                <a href="mailto:support@rysys.org" className="flex items-center gap-2 hover:text-rysys-gold transition-colors">
                  <Mail className="w-4 h-4 text-rysys-gold" />
                  <span>support@rysys.org</span>
                </a>
                <span className="hover:text-rysys-gold cursor-pointer transition-colors">LinkedIn</span>
                <span className="hover:text-rysys-gold cursor-pointer transition-colors">Twitter (X)</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t-2 border-rysys-grey gap-4">
            <span className="font-mono text-xs font-bold text-muted-foreground uppercase">
              © 2025 RYSYS Infrastructure & Engineering. All rights reserved.
            </span>
            <div className="flex gap-6 font-mono text-xs font-bold uppercase text-muted-foreground">
              <span className="hover:text-rysys-gold cursor-pointer">Privacy Policy</span>
              <span className="hover:text-rysys-gold cursor-pointer">Terms of Service</span>
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
    <Card className="bg-white border-4 border-rysys-black rounded-none p-10 lg:p-12 shadow-brutal hover:shadow-brutal-gold hover:border-rysys-gold transition-all duration-300 group">
      <div className="w-16 h-16 bg-rysys-grey border-3 border-rysys-black flex items-center justify-center mb-8 group-hover:bg-rysys-gold group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-rysys-gold transition-colors">{title}</h3>
      <p className="font-medium text-muted-foreground mb-8 leading-loose">
        {description}
      </p>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span key={tag} className="bg-rysys-grey border-2 border-rysys-black px-3 py-1.5 text-[11px] font-mono font-black uppercase group-hover:border-rysys-gold transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
}