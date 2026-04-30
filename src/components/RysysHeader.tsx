import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Trees, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
interface RysysHeaderProps {
  isHome?: boolean;
  current?: 'home' | 'about' | 'contact' | 'forust';
}
const NAV_LINKS = [
  { name: 'Capabilities', href: '#capabilities', isAnchor: true },
  { name: 'Leadership', href: '#leadership', isAnchor: true },
  { name: 'About', href: '/about', key: 'about' },
  { name: 'Contact', href: '/contact', key: 'contact' },
];
export function RysysHeader({ isHome, current }: RysysHeaderProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome) {
      e.preventDefault();
      setOpen(false);
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    } else {
      // Navigation to home with hash is handled by default Link behavior 
      // but we close the sheet anyway
      setOpen(false);
    }
  };
  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {NAV_LINKS.map((link) => {
        const isActive = current === link.key || (current === 'home' && link.isAnchor && location.hash === link.href);
        const linkClass = cn(
          "text-sm font-bold uppercase tracking-widest transition-colors hover:text-rysys-gold whitespace-nowrap",
          isActive && "text-rysys-gold underline underline-offset-8 decoration-4",
          mobile && "text-lg py-4 border-b-2 border-rysys-black/5 w-full text-left"
        );
        if (link.isAnchor) {
          return (
            <Link
              key={link.name}
              to={isHome ? link.href : `/${link.href}`}
              className={linkClass}
              onClick={(e) => handleAnchorClick(e as any, link.href)}
            >
              {link.name}
            </Link>
          );
        }
        return (
          <Link
            key={link.name}
            to={link.href}
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            {link.name}
          </Link>
        );
      })}
      <Link to="/forust" className={cn("inline-block", mobile && "w-full pt-6")} onClick={() => setOpen(false)}>
        <Button className={cn(
          "bg-rysys-green-power text-white border-3 border-rysys-black shadow-brutal-gold hover:shadow-brutal-gold-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none flex items-center gap-2",
          mobile ? "w-full py-8 text-lg" : "py-6 px-8 h-auto"
        )}>
          <Trees className="w-5 h-5 text-rysys-gold" />
          <span className="font-black uppercase tracking-[0.1em]">for-US-t</span>
          <Trees className="w-5 h-5 text-rysys-gold" />
        </Button>
      </Link>
    </>
  );
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-rysys-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-20 md:h-24 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer" onClick={() => setOpen(false)}>
          <div className="w-10 h-10 bg-rysys-gold border-3 border-rysys-black flex flex-col items-center justify-center shadow-brutal-gold group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-brutal-gold-hover transition-all leading-none overflow-hidden">
            <span className="text-white font-black text-[10px] select-none">RY</span>
            <span className="text-white font-black text-[10px] select-none">SYS</span>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">RYSYS</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <NavItems />
        </div>
        {/* Mobile Nav Trigger */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="border-3 border-rysys-black rounded-none h-12 w-12 hover:bg-rysys-grey">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-rysys-cream border-r-4 border-rysys-black p-0 rounded-none outline-none">
              <SheetHeader className="p-6 border-b-4 border-rysys-black bg-white flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-rysys-gold border-2 border-rysys-black flex flex-col items-center justify-center shadow-brutal leading-none overflow-hidden">
                    <span className="text-white font-black text-[8px]">RY</span>
                    <span className="text-white font-black text-[8px]">SYS</span>
                  </div>
                  <SheetTitle className="text-xl font-black uppercase tracking-tighter">RYSYS</SheetTitle>
                </div>
              </SheetHeader>
              <div className="flex flex-col p-6 items-start">
                <NavItems mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}