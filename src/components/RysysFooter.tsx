import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Trees } from 'lucide-react';
export function RysysFooter() {
  return (
    <footer className="border-t-4 border-rysys-black bg-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"><div className="filigree-gold w-full" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-16 mb-20">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-rysys-gold border-2 border-rysys-black flex flex-col items-center justify-center shadow-brutal-gold leading-none overflow-hidden">
                <span className="text-white font-black text-[8px] select-none">RY</span>
                <span className="text-white font-black text-[8px] select-none">SYS</span>
              </div>
              <span className="text-2xl font-display font-black tracking-tight uppercase">RYSYS</span>
            </div>
            <p className="text-lg font-bold text-muted-foreground leading-relaxed max-w-md">
              Engineering the physical foundations of tomorrow's digital world. Strength, precision, and intelligence at scale.
            </p>
          </div>
          <div>
            <h4 className="font-display font-black uppercase tracking-widest mb-6 border-b-2 border-rysys-gold pb-2 inline-block text-xs">Sitemap</h4>
            <div className="space-y-4 font-bold uppercase text-sm flex flex-col text-muted-foreground">
              <Link to="/" className="hover:text-rysys-gold transition-colors">Home</Link>
              <Link to="/about" className="hover:text-rysys-gold transition-colors">About RYSYS</Link>
              <Link to="/contact" className="hover:text-rysys-gold transition-colors">Contact</Link>
              <Link to="/forust" className="hover:text-rysys-gold transition-colors flex items-center gap-1">
                <Trees className="w-3 h-3 text-rysys-green-power" />
                <span className="font-black uppercase tracking-[0.1em]">for-US-t</span>
                <Trees className="w-3 h-3 text-rysys-gold" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-black uppercase tracking-widest mb-6 border-b-2 border-rysys-gold pb-2 inline-block text-xs">Contact</h4>
            <div className="space-y-4 font-bold uppercase text-sm flex flex-col text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rysys-gold shrink-0" />
                <span>Portland, Oregon</span>
              </div>
              <a href="mailto:support@rysys.org" className="flex items-center gap-2 hover:text-rysys-gold transition-colors truncate">
                <Mail className="w-4 h-4 text-rysys-gold shrink-0" />
                <span>support@rysys.org</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t-2 border-rysys-grey gap-4">
          <span className="font-mono text-xs font-bold text-muted-foreground uppercase">
            © 2025 RYSYS Infrastructure & Engineering. All rights reserved.
          </span>
          <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase opacity-50">
            v1.2.0 // Silicon Forest
          </span>
        </div>
      </div>
    </footer>
  );
}