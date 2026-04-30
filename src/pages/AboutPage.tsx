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
import { PageTransition } from '@/components/PageTransition';
import { RysysHeader } from '@/components/RysysHeader';
import { RysysFooter } from '@/components/RysysFooter';
export function AboutPage() {
  return (
    <div className="min-h-screen bg-rysys-cream text-rysys-black selection:bg-rysys-gold selection:text-white font-sans scroll-smooth">
      <RysysHeader current="about" />
      <PageTransition>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        {/* About Hero */}
        <section className="mb-24">
          <Badge className="bg-white text-rysys-black border-4 border-rysys-black rounded-none px-6 py-2 font-mono uppercase font-black text-sm shadow-brutal-gold mb-8">
            Established 2025 // Core Infrastructure
          </Badge>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black uppercase leading-[0.9] tracking-tight mb-8">
            The RYSYS <br />
            <span className="text-rysys-green-power">Blueprint.</span>
          </h1>
          <p className="text-xl md:text-3xl font-sans font-black leading-tight max-w-3xl text-muted-foreground border-l-8 border-rysys-gold pl-8 md:pl-12 py-4">
            We don't just build systems; we engineer the physical reality that makes artificial intelligence possible.
          </p>
        </section>
        {/* Leadership Bio */}
        <section className="bg-white faceted-gold shadow-brutal-lg p-8 md:p-14 mb-24 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] bg-rysys-grey border-4 border-rysys-black shadow-brutal-blue relative p-6 flex items-center justify-center overflow-hidden group cursor-pointer hover:bg-white transition-colors duration-300">
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
                <h3 className="text-4xl font-display font-black uppercase tracking-tight">Engineering Leadership</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <span className="text-sm font-black text-rysys-gold uppercase tracking-widest font-mono border-2 border-rysys-gold px-3 py-1">GPA 4.0 Graduate</span>
                  <span className="text-sm font-black text-rysys-blue-power uppercase tracking-widest font-mono border-2 border-rysys-blue-power px-3 py-1">Senior EE Lead</span>
                </div>
              </div>
              <p className="text-xl leading-relaxed font-bold">
                RYSYS was founded on the principle that the next generation of automation requires a fundamental rethinking of industrial infrastructure.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Academic Excellence (GPA 4.0)",
                  "Industrial Power Systems",
                  "Embedded AI Integration",
                  "Grid Reliability Expert"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-rysys-blue-power w-6 h-6 flex-shrink-0" />
                    <span className="font-black text-sm uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Rest of page kept as-is */}
        <section className="mb-24">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight mb-4">Core <span className="text-rysys-gold">DNA</span></h2>
            <div className="h-3 w-32 bg-rysys-black" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CapabilitySummaryCard
              icon={<QrCode className="w-8 h-8" />}
              title="01. Computer Vision & AI"
              description="CNN-Based QR Localizer: neural nets for real-time localization."
              tags={["CNN", "QR", "Real-time"]}
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
              description="Systems Integration: CD-SEM, metrology, digital logic."
              tags={["CD-SEM", "Metrology", "TTL"]}
            />
          </div>
        </section>
        <section id="business-plan" className="mb-24">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight mb-4">
              Business <span className="text-rysys-gold">Plan</span>
            </h2>
            <div className="h-3 w-40 bg-rysys-gold mb-6" />
            <div className="filigree-gold w-40 -mt-5" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Card className="bg-white border-4 border-rysys-black rounded-none p-8 shadow-brutal hover:shadow-brutal-gold transition-all group flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-rysys-grey border-4 border-rysys-black group-hover:bg-rysys-gold transition-colors">
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
                        <span className="text-sm font-bold">Electrical engineering excellence as the immutable backbone.</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-rysys-gold shrink-0 mt-0.5" />
                        <span className="text-sm font-bold">Applied AI and Computer Vision deployed at the edge.</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
            <Card className="bg-white border-4 border-rysys-black rounded-none p-8 shadow-brutal-blue hover:shadow-brutal-blue-lg transition-all group flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-rysys-grey border-4 border-rysys-black group-hover:bg-rysys-blue-power transition-colors">
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
                  <div className="flex items-center gap-3">
                    <Badge className="bg-rysys-gold text-white border-none rounded-none px-3 font-black">GPA 4.0</Badge>
                    <span className="text-xs font-black uppercase tracking-widest text-rysys-blue-power">Lead Systems Engineer</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground border-y-4 border-rysys-black/5 py-4">
                  <MapPin className="w-5 h-5 text-rysys-blue-power" />
                  <span>Portland, Oregon — USA</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <RysysFooter />
      </PageTransition>
    </div>
  );
}
function CapabilitySummaryCard({ icon, title, description, tags }: { icon: React.ReactNode, title: string, description: string, tags: string[] }) {
  return (
    <Card className="bg-white border-4 border-rysys-black rounded-none p-8 shadow-brutal hover:shadow-brutal-blue hover:border-rysys-blue-power transition-all group">
      <div className="w-12 h-12 bg-rysys-grey border-2 border-rysys-black flex items-center justify-center mb-6 group-hover:bg-rysys-blue-power group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase tracking-tighter mb-3">{title}</h3>
      <p className="text-sm font-bold text-muted-foreground mb-6">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map(t => (
          <span key={t} className="bg-rysys-grey border-2 border-rysys-black px-2 py-1 text-[10px] font-black uppercase group-hover:border-rysys-blue-power transition-colors">{t}</span>
        ))}
      </div>
    </Card>
  )
}