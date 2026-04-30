import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  QrCode,
  Cpu,
  Globe,
  CheckCircle2,
  Trees,
  UploadCloud
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RysysHeader } from '@/components/RysysHeader';
import { RysysFooter } from '@/components/RysysFooter';
const TRUST_AFFILIATIONS = ['PSU', 'IEEE', 'NCEES', 'Grants.gov'];
export function HomePage() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen bg-rysys-cream text-rysys-black selection:bg-rysys-gold selection:text-white font-sans scroll-smooth">
      <RysysHeader current="home" />
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b-4 border-rysys-black bg-white">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1541457523724-95f54f7740cc?auto=format&fit=crop&q=80&w=1600"
            alt="Portland Skyline"
            className="w-full h-full object-cover object-center grayscale contrast-125 opacity-15"
          />
          <div className="absolute inset-0 bg-rysys-black/5 mix-blend-multiply" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-8 md:space-y-12 lg:-translate-y-2">
              <Badge className="bg-white text-rysys-black border-4 border-rysys-black rounded-none px-6 py-2 font-mono uppercase font-black text-xs shadow-brutal-gold-lg">
                Established 2025 // <span className="text-rysys-gold">v1.2.0</span>
              </Badge>
              <h1 className="text-7xl md:text-[9rem] font-black leading-[0.85] tracking-tighter uppercase break-words">
                ELITE <br />
                <span className="text-rysys-black">ENG.</span> <br />
                <span className="normal-case bg-gradient-to-br from-rysys-gold to-rysys-green-power bg-clip-text text-transparent">
                  Systemic Wealth.
                </span>
              </h1>
              <p className="mt-4 text-xl md:text-3xl font-black leading-tight max-w-2xl text-muted-foreground border-l-8 border-rysys-gold pl-8 md:pl-12 py-2">
                Led by Silicon Forest expertise. We bridge Electrical Engineering and AI into a unified fortress.
              </p>
            </div>
            <div className="lg:col-span-5 relative lg:translate-y-4">
              <div className="aspect-square border-4 border-rysys-black shadow-brutal-lg overflow-hidden relative group bg-rysys-cream">
                <img
                  src="https://images.unsplash.com/photo-1541457523724-95f54f7740cc?auto=format&fit=crop&q=80&w=800&h=800"
                  alt="Infrastructure"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 bg-rysys-gold border-4 border-rysys-black shadow-brutal-lg flex flex-col items-center justify-center gap-2 group-hover:rotate-1 transition-transform">
                    <div className="flex flex-col items-center leading-none">
                      <span className="text-white font-black text-7xl">RY</span>
                      <span className="text-white font-black text-7xl">SYS</span>
                    </div>
                    <span className="text-rysys-black font-black uppercase tracking-[0.2em] text-[10px]">SYSTEM_CORE_INIT</span>
                  </div>
                </div>
                <div className="absolute top-8 right-8 bg-white border-4 border-rysys-black px-4 py-2 shadow-brutal flex items-center gap-2">
                  <div className="w-3 h-3 bg-rysys-blue-power rounded-none animate-pulse" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-tighter">PORTLAND_UN_ACTIVE</span>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-rysys-green-power border-4 border-rysys-black px-8 py-6 shadow-brutal-lg z-20 text-white">
                <span className="font-black italic text-3xl uppercase tracking-tighter">Hardened Build.</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Trust Bar */}
      <section className="bg-rysys-black py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 md:gap-16">
            {TRUST_AFFILIATIONS.map((name) => (
              <span
                key={name}
                className="text-white text-3xl md:text-5xl font-black tracking-widest uppercase opacity-70 hover:text-rysys-blue-power hover:opacity-100 transition-all cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* Capabilities Grid */}
      <section id="capabilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Proven <span className="text-rysys-gold">Capabilities</span>
          </h2>
          <div className="h-3 w-40 bg-rysys-black" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          <CapabilityCard
            icon={<QrCode className="w-10 h-10" />}
            title="01. Computer Vision & AI"
            description="CNN-Based QR Localizer: neural nets for real-time localization in noisy envs."
            tags={["CNN", "QR-Localization", "Edge SoC"]}
          />
          <CapabilityCard
            icon={<Globe className="w-10 h-10" />}
            title="02. Energy Modeling"
            description="Geothermal Favorability: multi-layer datasets (thermal/faults) for renewable prospecting."
            tags={["Geothermal", "Fault Lines", "GIS"]}
          />
          <CapabilityCard
            icon={<Cpu className="w-10 h-10" />}
            title="03. Infrastructure"
            description="Systems Integration: CD-SEM, metrology, digital logic (TTL/CMOS) for process engineering."
            tags={["CD-SEM", "Metrology", "TTL/CMOS"]}
          />
        </div>
      </section>
      {/* Leadership Profile */}
      <section id="leadership" className="bg-rysys-grey py-20 md:py-28 border-y-4 border-rysys-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-4 border-rysys-black shadow-brutal-lg p-8 md:p-14 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4">
                <div className="aspect-[4/5] bg-rysys-grey border-4 border-rysys-black shadow-brutal-blue-lg relative p-6 flex items-center justify-center overflow-hidden group cursor-pointer hover:bg-white transition-colors duration-300">
                  <div
                    className="w-full h-full border-4 border-dashed border-rysys-blue-power/30 group-hover:border-rysys-blue-power flex flex-col items-center justify-center gap-4 text-center transition-colors"
                  >
                    <UploadCloud className="w-12 h-12 text-rysys-blue-power animate-bounce" />
                    <span className="font-black text-xs uppercase tracking-widest text-rysys-blue-power px-4">
                      Upload Portrait
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Director of Engineering</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <span className="text-lg font-black text-rysys-gold uppercase tracking-widest font-mono border-2 border-rysys-gold px-3 py-1">GPA 4.0</span>
                    <span className="text-lg font-black text-rysys-blue-power uppercase tracking-widest font-mono border-2 border-rysys-blue-power px-3 py-1">Senior EE Lead</span>
                  </div>
                </div>
                <p className="text-xl leading-relaxed font-bold">
                  With a background spanning core electrical engineering and advanced machine learning, our leadership ensures that RYSYS solutions aren't just theoretically sound—they're industrially hardened.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    "Electrical Power Systems Specialists",
                    "Certified ML Systems Architect",
                    "Critical Infrastructure Consultant",
                    "Lead Developer: GridOS Core"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="text-rysys-blue-power w-6 h-6 flex-shrink-0" />
                      <span className="font-black text-sm uppercase">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Portal Section */}
      <section id="portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="bg-rysys-green-power border-4 border-rysys-black p-12 md:p-20 text-center shadow-brutal-gold-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rotate-45 translate-x-20 -translate-y-20" />
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-[0.1em] mb-8 flex items-center justify-center gap-6">
            <Trees className="w-10 h-10 md:w-16 md:h-16 text-rysys-gold" />
            <span>Join for-US-t</span>
            <Trees className="w-10 h-10 md:w-16 md:h-16 text-rysys-gold" />
          </h2>
          <p className="text-white/90 text-xl md:text-3xl font-black mb-12 max-w-3xl mx-auto leading-tight">
            Access open-source infrastructure tools, engineering standards, and technical whitepapers.
          </p>
          <div className="flex justify-center mt-4">
            <Link to="/forust">
              <Button className="bg-white text-rysys-black border-4 border-rysys-black shadow-brutal-gold-lg hover:shadow-brutal-gold-hover hover:text-rysys-gold hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none py-10 px-16 text-2xl h-auto group flex items-center gap-4">
                <Trees className="w-8 h-8 text-rysys-green-power" />
                <span className="font-black uppercase tracking-[0.1em]">Enter Portal</span>
                <Trees className="w-8 h-8 text-rysys-green-power" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <RysysFooter />
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
    <Card className="bg-white border-4 border-rysys-black rounded-none p-10 lg:p-12 shadow-brutal hover:shadow-brutal-blue hover:border-rysys-blue-power transition-all duration-300 group">
      <div className="w-16 h-16 bg-rysys-grey border-4 border-rysys-black flex items-center justify-center mb-8 group-hover:bg-rysys-blue-power group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-rysys-blue-power transition-colors">{title}</h3>
      <p className="font-bold text-muted-foreground mb-8 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span key={tag} className="bg-rysys-grey border-2 border-rysys-black px-3 py-1.5 text-[11px] font-mono font-black uppercase group-hover:border-rysys-blue-power transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
}