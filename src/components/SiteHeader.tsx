import { Link, NavLink } from "react-router-dom";
import { Phone, Mail, Facebook, Twitter, Instagram, Youtube, Menu, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lotus } from "@/components/Lotus";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { content } = useData();
  const { settings } = content;

  const links = [
    { to: "/", label: t('nav.home') },
    { to: "/about", label: t('nav.about') },
    { to: "/development", label: t('nav.development') },
    { to: "/schemes", label: t('nav.schemes') },
    { to: "/news", label: t('nav.news') },
    { to: "/janasamvad", label: language === 'hi' ? 'सोशल मीडिया' : 'Social Media' },
    { to: "/gallery", label: t('nav.gallery') },
    { to: "/contact", label: t('nav.contact') },
  ];

  return (
    <>
      {settings.show_topbar && (
        <div className="bg-gradient-cta text-primary-foreground text-xs md:text-sm">
          <div className="container flex flex-wrap items-center justify-between gap-2 py-2">
            <span className="font-medium">{language === 'hi' ? 'जनसेवा ही मेरा धर्म, विकास ही मेरा कर्म' : 'Service is my Religion, Progress is my Work'}</span>
            <div className="hidden md:flex items-center gap-5">
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> 0141-4105020</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +91 97850 18444</span>
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> contact@rikeshsen.in</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 border-r border-white/20 pr-4 mr-1">
                <span className="hidden sm:inline">Follow Us:</span>
                <Facebook className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform" />
                <Twitter className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform" />
                <Instagram className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform" />
                <Youtube className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform" />
              </div>
              {/* Language Toggle */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-xs hover:bg-white/10 hover:text-white border border-white/30 rounded-full"
                onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
              >
                <Globe className="h-3.5 w-3.5 mr-1" />
                {language === 'hi' ? 'English' : 'हिंदी'}
              </Button>
            </div>
          </div>
        </div>
      )}
      {settings.show_navbar && (
        <header className="bg-background sticky top-0 z-40 shadow-card">
          <div className="container flex items-center justify-between py-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full border-2 border-primary flex items-center justify-center text-primary overflow-hidden bg-white">
                <Lotus className="h-full w-full object-cover" />
              </div>
              <div>
                <h1 className="text-primary text-xl md:text-2xl font-bold leading-tight font-hindi">{t('hero.mla_name')}</h1>
                <p className="text-xs md:text-sm text-muted-foreground">{t('hero.mla_pos')}, {t('footer.address').split(',')[1]}</p>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-foreground/80">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} end className={({isActive}) =>
                  `relative hover:text-primary transition-colors ${isActive ? "text-primary after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full" : ""}`
                }>{l.label}</NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Button asChild className="bg-gradient-cta hover:opacity-90 shadow-soft hidden sm:inline-flex">
                <a 
                  href={`https://wa.me/919977891333?text=${encodeURIComponent(
                    language === 'hi' ? 'नमस्ते विधायक जी, मुझे "कमल सेतु" के माध्यम से सहायता चाहिए।' : 'Namaste MLA Ji, I need assistance through "Kamal Setu".'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t('nav.cta')}
                </a>
              </Button>
              <button className="lg:hidden p-2" onClick={() => setOpen(!open)}><Menu className="h-6 w-6" /></button>
            </div>
          </div>
          {open && (
            <div className="lg:hidden border-t bg-background">
              <div className="container py-3 flex flex-col gap-2">
                {links.map(l => (
                  <NavLink key={l.to} to={l.to} end onClick={() => setOpen(false)}
                    className={({isActive}) => `py-2 ${isActive ? "text-primary font-semibold" : ""}`}>{l.label}</NavLink>
                ))}
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
};
