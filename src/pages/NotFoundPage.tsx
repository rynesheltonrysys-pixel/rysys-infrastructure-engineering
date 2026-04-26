import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Trees, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RysysHeader } from '@/components/RysysHeader';
import { RysysFooter } from '@/components/RysysFooter';
import { PageTransition } from '@/components/PageTransition';
export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-rysys-cream text-rysys-black selection:bg-rysys-gold selection:text-white font-sans scroll-smooth flex flex-col">
      <RysysHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-32 w-full flex items-center justify-center">
        <PageTransition className="w-full max-w-2xl">
          <div className="mb-8 flex justify-center">
            <div className="filigree-gold w-40" />
          </div>
          <Card className="bg-white border-4 border-rysys-black p-10 md:p-16 shadow-brutal-lg rounded-none text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 bg-rysys-gold/10 -translate-x-8 -translate-y-8 rotate-45" />
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-rysys-grey border-4 border-rysys-black flex items-center justify-center shadow-brutal text-rysys-black">
                <AlertTriangle className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight mb-6">
              404 — <span className="text-rysys-blue-power">Missing</span>
            </h1>
            <p className="text-xl md:text-2xl font-black uppercase tracking-tighter text-muted-foreground mb-12 leading-tight">
              The requested node or protocol does not exist within the RYSYS infrastructure.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link to="/">
                <Button className="w-full bg-white text-rysys-black border-4 border-rysys-black shadow-brutal hover:shadow-brutal-gold transition-all rounded-none h-16 font-black uppercase tracking-widest text-sm flex items-center gap-3">
                  <Home className="w-5 h-5" />
                  Return Home
                </Button>
              </Link>
              <Link to="/forust">
                <Button className="w-full bg-rysys-green-power text-white border-4 border-rysys-black shadow-brutal-gold hover:shadow-brutal-gold-hover transition-all rounded-none h-16 font-black uppercase tracking-widest text-sm flex items-center gap-3">
                  <Trees className="w-5 h-5 text-rysys-gold" />
                  Enter for-US-t
                </Button>
              </Link>
            </div>
          </Card>
          <div className="mt-8 flex justify-center">
            <div className="filigree-gold w-40" />
          </div>
        </PageTransition>
      </main>
      <RysysFooter />
    </div>
  );
}