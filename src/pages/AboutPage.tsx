import React from 'react';
import {
  UploadCloud,
  CheckCircle2,
  QrCode,
  Code2,
  Globe,
  Target,
  Route,
  Wrench,
  Users,
  Award,
  MapPin
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RysysHeader } from '@/components/RysysHeader';
export function AboutPage() {
  return (
    <div className="min-h-screen bg-rysys-cream text-rysys-black selection:bg-rysys-gold selection:text-white font-sans scroll-smooth">
      <RysysHeader current="about" />
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
        <section className="mb-24">
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
        {/* Business Plan Section */}
        <section id="business-plan" className="mb-24">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
              Business <span className="text-rysys-gold">Plan</span>
            </h2>
            <div className="h-2 w-32 bg-rysys-gold mb-6" />
            <p className="text-lg md:text-xl font-bold text-muted-foreground uppercase tracking-wide max-w-2xl">
              A pragmatic path from MVP to real-world infrastructure impact.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Mission Card */}
            <Card className="bg-white border-4 border-rysys-black rounded-none p-8 shadow-brutal hover:shadow-brutal-gold transition-all group flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-rysys-grey border-2 border-rysys-black group-hover:bg-rysys-gold transition-colors">
                  <Target className="w-8 h-8 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Mission</h3>
              </div>
              <Accordion type="single" collapsible defaultValue="mission-1" className="w-full space-y-4">
                <AccordionItem value="mission-1" className="border-4 border-rysys-black px-4 bg-rysys-cream/20">
                  <AccordionTrigger className="hover:no-underline font-black uppercase text-sm tracking-widest text-left py-4">
                    Bridge EE, AI & Physical Wealth
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2">
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-rysys-gold shrink-0 mt-0.5" />
                        <span className="text-sm font-medium leading-relaxed">Electrical engineering excellence as the immutable backbone of modern industrial power.</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-rysys-gold shrink-0 mt-0.5" />
                        <span className="text-sm font-medium leading-relaxed">Applied AI and Computer Vision deployed at the edge to automate human-error prone inspections.</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-rysys-gold shrink-0 mt-0.5" />
                        <span className="text-sm font-medium leading-relaxed">Strategic real-estate and infrastructure alignment to capture long-term, durable asset value.</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
            {/* Roadmap Card */}
            <Card className="bg-white border-4 border-rysys-black rounded-none p-8 shadow-brutal hover:shadow-brutal-gold transition-all group flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-rysys-grey border-2 border-rysys-black group-hover:bg-rysys-gold transition-colors">
                  <Route className="w-8 h-8 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Strategic Roadmap</h3>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {[
                  { phase: "01", title: "MVP & for-US-t Live", outcome: "Establish community node and protocol baseline." },
                  { phase: "02", title: "Federal Grants", outcome: "Pursue SBIR/DOE/NREL funding for deep-tech scaling." },
                  { phase: "03", title: "Pilot Infrastructure", outcome: "Deploy localized microgrids and edge SoC sensors." },
                  { phase: "04", title: "Regional Scale", outcome: "Integrate with real-estate for grid-level intelligence." }
                ].map((item) => (
                  <AccordionItem key={item.phase} value={item.phase} className="border-2 border-rysys-black px-4 hover:bg-rysys-grey/20 transition-colors">
                    <AccordionTrigger className="hover:no-underline font-bold uppercase text-xs tracking-[0.2em] py-3">
                      Phase {item.phase} // {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 font-mono text-[11px] text-muted-foreground uppercase">
                      Outcome: <span className="text-rysys-black font-black">{item.outcome}</span>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
            {/* Services Recap Card */}
            <Card className="bg-white border-4 border-rysys-black rounded-none p-8 shadow-brutal hover:shadow-brutal-gold transition-all group flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-rysys-grey border-2 border-rysys-black group-hover:bg-rysys-gold transition-colors">
                  <Wrench className="w-8 h-8 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Services & Capabilities</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Computer Vision & AI", tags: ["CNN QR", "Edge SoC"] },
                  { title: "Energy Modeling", tags: ["GIS", "Geothermal"] },
                  { title: "Infrastructure", tags: ["CD-SEM", "CMOS Logic"] },
                  { title: "Embedded Systems", tags: ["RT-Pipelines", "SoC"] }
                ].map((service) => (
                  <div key={service.title} className="border-2 border-rysys-black p-4 bg-rysys-cream/30 hover:bg-white transition-colors">
                    <h4 className="font-black uppercase text-[10px] tracking-widest mb-3 border-b border-rysys-black/10 pb-1">{service.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map(t => (
                        <Badge key={t} variant="outline" className="border-2 border-rysys-black bg-white rounded-none text-[8px] font-black uppercase tracking-tighter py-0 px-2 h-5">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            {/* Team Card */}
            <Card className="bg-white border-4 border-rysys-black rounded-none p-8 shadow-brutal hover:shadow-brutal-gold transition-all group flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-rysys-grey border-2 border-rysys-black group-hover:bg-rysys-gold transition-colors">
                  <Users className="w-8 h-8 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Team & Founder</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black uppercase tracking-tighter">Ryne Frank Shelton</span>
                    <Award className="w-6 h-6 text-rysys-gold" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-rysys-gold uppercase tracking-[0.2em] font-mono">
                    <Badge className="bg-rysys-gold text-white rounded-none hover:bg-rysys-gold px-2 py-0 border-none">GPA 4.0</Badge>
                    <span>Lead Systems Engineer</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground border-y-2 border-rysys-black/5 py-2">
                  <MapPin className="w-4 h-4 text-rysys-green-power" />
                  <span>Portland, Oregon — USA</span>
                </div>
                <div className="grid grid-cols-2 gap-y-3">
                  {[
                    "Power Systems",
                    "Embedded AI",
                    "Grid Standards",
                    "Open-Source Infra"
                  ].map(skill => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-rysys-gold rotate-45" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
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