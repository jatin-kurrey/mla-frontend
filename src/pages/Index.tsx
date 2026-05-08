import heroBg from "@/assets/hero-bg.jpg";
import leaderNamaste from "@/assets/leader-namaste.png";
import news1 from "@/assets/news1.jpg";
import news2 from "@/assets/news2.jpg";
import news3 from "@/assets/news3.jpg";
import {
  MapPin, Users, HeartPulse, BookOpen, Briefcase, Zap, Droplets,
  Construction, GraduationCap, HandHeart, MessageSquare, MessageCircle, ShieldCheck, ChevronRight,
  ArrowRight, Send, Calendar, Youtube, Facebook, Instagram, Twitter, Home, Tractor
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lotus } from "@/components/Lotus";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Index = () => {
  const { t, language } = useLanguage();
  const { content, isLoading } = useData();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"]
  });

  const translateX = useTransform(scrollYProgress, [0, 1], ["0vw", `-${Math.max(0, (content?.milestones?.length || 0) * 30)}vw`]);
  const smoothX = useSpring(translateX, { damping: 25, stiffness: 80 });

  const services = [
    { 
      icon: Construction, 
      title: t('nav.development'), 
      sub: language === 'hi' ? "हमara कार्य, हमारी पहचान" : "Our work, our identity", 
      to: "/development" 
    },
    { 
      icon: Users, 
      title: language === 'hi' ? "जन शिकायत" : "Public Complaint", 
      sub: language === 'hi' ? "आपकी समस्या, हमारा समाधान" : "Your problem, our solution", 
      to: "/janasamvad" 
    },
    { 
      icon: HandHeart, 
      title: t('nav.schemes'), 
      sub: language === 'hi' ? "आपके लिए सरकारी योजनाएं" : "Government schemes for you", 
      to: "/schemes" 
    },
    { 
      icon: HeartPulse, 
      title: language === 'hi' ? "स्वास्थ्य सेवाएं" : "Health Services", 
      sub: language === 'hi' ? "स्वस्थ नागरिक, समृद्ध नगर" : "Healthy citizens, prosperous city", 
      to: "/schemes" 
    },
    { 
      icon: BookOpen, 
      title: language === 'hi' ? "शिक्षा एवं युवा" : "Education & Youth", 
      sub: language === 'hi' ? "शिक्षित युवा, उज्ज्वल भविष्य" : "Educated youth, bright future", 
      to: "/schemes" 
    },
    { 
      icon: MapPin, 
      title: language === 'hi' ? "संपर्क कार्यालय" : "Contact Office", 
      sub: language === 'hi' ? "हमसे संपर्क करें" : "Get in touch with us", 
      to: "/contact" 
    },
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { settings } = content;

  return (
    <>
      {/* Hero */}
      {settings.show_hero && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-black">
            {content.hero.videoUrl && (
              <video 
                key={content.hero.videoUrl}
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              >
                <source src={content.hero.videoUrl} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/95 via-orange-50/70 to-orange-100/30" />
          </div>
          <div className="container relative grid md:grid-cols-2 gap-8 items-center py-12 md:py-20 min-h-[560px]">
            <div className="space-y-6 z-10">
              {settings.show_hero_slogan && (
                <>
                  <h2 className="font-hindi text-4xl md:text-6xl font-bold leading-tight">
                    <span className="text-secondary">{language === 'hi' ? content.hero.slogan1_hi : content.hero.slogan1_en}</span><br/>
                    <span className="text-primary">{language === 'hi' ? content.hero.slogan2_hi : content.hero.slogan2_en}</span>
                  </h2>
                  <p className="text-lg text-foreground/80 max-w-md">
                    {language === 'hi' ? content.hero.desc_hi : content.hero.desc_en}
                  </p>
                </>
              )}
              {settings.show_hero_buttons && (
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-gradient-cta shadow-soft hover:opacity-90">
                    <Link to="/development"><Construction className="mr-2 h-4 w-4" /> {t('hero.btn_dev')}</Link>
                  </Button>
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-soft">
                    <Link to="/janasamvad"><MessageSquare className="mr-2 h-4 w-4" /> {t('hero.btn_complain')}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-background border-2 shadow-soft">
                    <Link to="/janasamvad"><Users className="mr-2 h-4 w-4 text-primary" /> {t('nav.cta')}</Link>
                  </Button>
                </div>
              )}
            </div>
            <div className="relative z-10 flex justify-center md:justify-end items-end h-full min-h-[400px]">
              {settings.show_hero_mla && (
                <>
                  <div 
                    className="relative w-full max-w-[380px] md:max-w-[460px] h-[280px] md:h-[380px] overflow-hidden"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                    }}
                  >
                    <img 
                      src={content.hero.mlaImage || "/image.png"} 
                      alt={t('hero.mla_name')} 
                      className="w-full h-full object-cover object-top scale-[1.25] md:scale-[1.35] origin-top drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] brightness-105 contrast-105" 
                    />
                  </div>
                  <div className="absolute bottom-6 right-0 bg-background/95 backdrop-blur rounded-2xl p-4 shadow-glow border border-primary/20 flex items-center gap-3 max-w-[240px]">
                    <div>
                      <p className="text-xs italic text-muted-foreground">Rikesh Sen</p>
                      <p className="font-bold text-primary">{t('hero.mla_name')}</p>
                      <p className="text-xs text-muted-foreground">{t('hero.mla_pos')}<br/>{t('hero.mla_exp')}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Lotus className="h-7 w-7" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {settings.show_hero_services && (
            <div className="container relative -mt-8 md:-mt-12 pb-10 z-20">
              <div className="bg-background rounded-2xl shadow-card grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-border overflow-hidden">
                {services.map((s) => (
                  <Link to={s.to} key={s.title} className="p-5 text-center hover:bg-muted transition-colors group">
                    <s.icon className="h-9 w-9 mx-auto text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-bold text-foreground text-sm md:text-base">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Professional About Section */}
      {settings.show_about && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-orange-100/50 rounded-[40px] -rotate-3 -z-10" />
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5]">
                  <img 
                    src={content.about.image} 
                    alt={t('hero.mla_name')} 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-3xl shadow-xl hidden md:block">
                  <div className="text-4xl font-bold mb-1">{content.about.experience}</div>
                  <div className="text-xs uppercase tracking-widest opacity-80">
                    {language === 'hi' ? 'वर्षों का सेवा अनुभव' : 'Years of Service'}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-orange-600 font-bold uppercase tracking-widest text-sm">
                    <Lotus className="h-5 w-5" />
                    <span>{language === 'hi' ? 'जनसेवक ka परिचय' : 'Leader Introduction'}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif text-primary leading-tight">
                    {language === 'hi' ? content.about.title_hi : content.about.title_en} <br />
                    <span className="text-orange-600">{language === 'hi' ? content.about.subtitle_hi : content.about.subtitle_en}</span>
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {language === 'hi' ? content.about.description_hi : content.about.description_en}
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    language === 'hi' ? content.about.point1_hi : content.about.point1_en,
                    language === 'hi' ? content.about.point2_hi : content.about.point2_en,
                    language === 'hi' ? content.about.point3_hi : content.about.point3_en,
                    language === 'hi' ? content.about.point4_hi : content.about.point4_en
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <div className="mt-1 h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <Zap className="h-3 w-3" />
                      </div>
                      <span className="font-semibold text-primary">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">{language === 'hi' ? 'जन्मस्थान' : 'Birthplace'}</p>
                    <p className="text-sm font-bold text-primary">{language === 'hi' ? content.about.birthplace_hi : content.about.birthplace_en}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">{language === 'hi' ? 'शिक्षा' : 'Education'}</p>
                    <p className="text-sm font-bold text-primary">{language === 'hi' ? content.about.education_hi : content.about.education_en}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg bg-orange-600 hover:bg-orange-700">
                    <Link to="/about">{language === 'hi' ? 'विस्तृत परिचय' : 'Know More'} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Impact Stats Section */}
      {settings.show_stats && (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 -skew-x-12 translate-x-1/2 -z-10" />
          <div className="container">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="space-y-4">
                <h3 className="text-primary font-bold uppercase tracking-widest text-sm">
                  {language === 'hi' ? 'विकास के आंकड़े' : 'Development Statistics'}
                </h3>
                <h2 className="text-4xl md:text-5xl font-serif text-foreground">
                  {language === 'hi' ? 'हमारा कार्य, हमारी पहचान' : 'Our Work, Our Identity'}
                </h2>
              </div>
              <Button variant="outline" asChild className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                <Link to="/development">{t('home.stats_all')} <ChevronRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {content.stats.map((stat) => {
                const IconComp = { Construction, Droplets, GraduationCap, HeartPulse, Zap, Briefcase, ShieldCheck, Users, MessageSquare }[stat.icon] || Construction;
                return (
                  <div key={stat.id} className="bg-white p-8 rounded-[32px] shadow-soft hover:shadow-glow transition-all group border border-transparent hover:border-orange-100">
                    <div className="h-14 w-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                      <IconComp className="h-7 w-7" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-primary">{stat.value}</div>
                      <div className="font-bold text-foreground text-lg">{stat.label}</div>
                      <div className="text-sm text-muted-foreground">{stat.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {settings.show_timeline && (
        <section ref={timelineRef} className="relative bg-white" style={{ height: `${Math.max(300, (content?.milestones?.length || 0) * 75)}vh` }}>
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <div className="container relative z-20 mb-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">
                    {language === 'hi' ? 'राजनीतिक यात्रा' : 'Political Journey'}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif text-foreground">
                  {language === 'hi' ? 'विकास के मील के पत्थर' : 'Milestones of Development'}
                </h2>
              </div>
            </div>

            <div className="relative flex-1 flex flex-col justify-center">
              {/* Curved Connecting Path */}
              <svg className="absolute top-1/2 left-0 w-full h-[300px] -translate-y-1/2 opacity-10 pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <motion.path 
                  d="M 0 150 C 100 100, 200 200, 300 150 C 400 100, 500 200, 600 150 C 700 100, 800 200, 900 150 C 1000 100, 1100 200, 1200 150" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  className="text-primary"
                  initial={{ pathLength: 0 }}
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>

              <motion.div 
                style={{ x: smoothX }}
                className="flex w-max gap-32 px-[20vw] will-change-transform items-center"
              >
                {content.milestones && content.milestones.length > 0 ? [...content.milestones].sort((a, b) => (a.year || '').localeCompare(b.year || '')).map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ 
                      y: i % 2 === 0 ? -60 : 60 
                    }}
                    className="shrink-0 w-[350px] flex flex-col items-center group relative z-20"
                  >
                    {/* Connection Line to Path */}
                    <div className={`absolute w-px h-16 bg-primary/20 ${i % 2 === 0 ? 'top-full' : 'bottom-full'}`} />

                    {/* Image Bubble */}
                    <div className={`${i % 2 === 0 ? 'mb-8' : 'order-2 mt-8'} relative`}>
                      <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-soft group-hover:scale-105 group-hover:shadow-glow transition-all duration-700">
                        <img src={item.image} alt={item.year} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      {/* Year Badge */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-30">
                        {item.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`text-center space-y-3 ${i % 2 === 0 ? '' : 'order-1'}`}>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {language === 'hi' ? item.title_hi : item.title_en}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
                        {language === 'hi' ? item.description_hi : item.description_en}
                      </p>
                    </div>

                    {/* Node Dot */}
                    <div className={`absolute ${i % 2 === 0 ? '-bottom-16' : '-top-16'} h-4 w-4 rounded-full border-4 border-white bg-primary shadow-glow group-hover:scale-125 transition-transform`} />
                  </motion.div>
                )) : (
                  <div className="w-full flex items-center justify-center text-muted-foreground italic">
                    {language === 'hi' ? 'कोई मील के पत्थर अभी तक नहीं जोड़े गए हैं' : 'No milestones added yet'}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}


      {(settings.show_news || settings.show_schemes) && (
        <section className="container pb-12 grid lg:grid-cols-2 gap-6">
          {settings.show_news && (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-primary">{t('home.news_title')}</h3>
                <Link to="/news" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">{t('home.stats_all')} <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {content.news.slice(0, 3).map(n => (
                  <div key={n.id} className="space-y-3 group">
                    <div className="rounded-xl aspect-[4/3] overflow-hidden bg-muted relative">
                      <img 
                        src={n.image} 
                        alt={n.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.classList.add('bg-gradient-to-br', 'from-primary/20', 'to-secondary/20');
                        }}
                      />
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Calendar className="h-3 w-3 text-primary" />{language === 'hi' ? n.date_hi : n.date_en}</p>
                    <p className="text-sm font-bold leading-tight line-clamp-2 text-primary group-hover:text-secondary transition-colors">{language === 'hi' ? n.title_hi : n.title_en}</p>
                    <Link className="text-[10px] font-bold text-primary flex items-center gap-1 hover:text-secondary" to={`/news/${n.id}`}>{t('about.more')} <ChevronRight className="h-3 w-3" /></Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {settings.show_schemes && (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-primary">{t('home.schemes_title')}</h3>
                <Link to="/schemes" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">{t('home.schemes_all')} <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {content.schemes.slice(0, 3).map(s => {
                   const IconComp = { Users, HandHeart, GraduationCap, Briefcase, HeartPulse, Home, Tractor, Zap }[s.icon] || Users;
                   return (
                    <Link to="/schemes" key={s.id} className="bg-muted/50 border border-border/40 rounded-2xl p-4 text-center hover:shadow-soft hover:border-primary/20 transition-all group">
                      <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <IconComp className={`h-6 w-6 ${s.color || "text-primary"}`} />
                      </div>
                      <p className="text-xs font-bold text-primary line-clamp-1">{language === 'hi' ? s.title_hi : s.title_en}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter font-bold">{t('nav.schemes')}</p>
                    </Link>
                   );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Public Interaction Section */}
      {settings.show_gallery && (
        <section className="bg-primary/5 py-20 overflow-hidden">
          <div className="container relative">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative">
                <img src="/images/DSC_7316.JPG" alt="Janasamvad" className="rounded-3xl shadow-lg mt-12" />
                <img src="/images/DSC_8478.JPG" alt="Public Rally" className="rounded-3xl shadow-lg" />
                <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-3xl shadow-glow z-10 hidden md:block">
                  <p className="text-4xl font-bold">1000+</p>
                  <p className="text-sm font-semibold opacity-90">{language === 'hi' ? 'जनता से मुलाकात' : 'Public Meetings'}</p>
                </div>
              </div>
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-4xl font-bold text-primary leading-tight">
                  {language === 'hi' ? 'सीधा संवाद, सच्चा समाधान' : 'Direct Dialogue, Real Solution'}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {language === 'hi' 
                    ? 'जनता की समस्याओं को सुनना और उन्हें हल करना ही हमारा धर्म है। हर सप्ताह आयोजित होने वाले "जनसंवाद" कार्यक्रम के माध्यम से हम सीधे नागरिकों से जुड़ते हैं।' 
                    : 'Listening to the problems of the public and solving them is our duty. Through the weekly "Janasamvad" program, we connect directly with citizens.'}
                </p>
                <div className="space-y-4">
                  {[
                    language === 'hi' ? "साप्ताहिक जनसुनवाई" : "Weekly Public Hearing",
                    language === 'hi' ? "वार्ड स्तर पर बैठकें" : "Ward-level Meetings",
                    language === 'hi' ? "डिजिटल शिकायत निवारण" : "Digital Complaint Redressal"
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary" />
                      <p className="font-bold text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <Button asChild size="lg" className="bg-primary shadow-soft">
                  <Link to="/janasamvad">{t('nav.cta')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Social Media Hub Section */}
      {settings.show_social && (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">
                {language === 'hi' ? 'सोशल मीडिया हब' : 'Social Media Hub'}
              </h2>
              <div className="h-1 w-20 bg-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-muted-foreground text-lg italic">
                {language === 'hi' ? 'विधायक जी की गतिविधियों से जुड़ने के लिए फॉलो करें' : 'Follow to connect with the activities of the MLA'}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* YouTube Embed */}
              <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-soft border border-border group hover:shadow-glow transition-all">
                <div className="bg-red-600 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Youtube className="h-6 w-6" />
                     <span className="font-bold tracking-wider">{language === 'hi' ? 'लेटेस्ट वीडियो' : 'Latest Videos'}</span>
                  </div>
                  <a href="https://www.youtube.com/@RIKESHSENBJP" target="_blank" rel="noopener noreferrer" className="text-xs hover:underline flex items-center gap-1">
                     Visit Channel <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
                <div className="aspect-video">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed?listType=user_uploads&list=RIKESHSENBJP" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Other Platforms Links */}
              <div className="space-y-6">
                {[
                  { 
                    name: "Facebook", 
                    user: "@SenRikesh", 
                    color: "bg-blue-600", 
                    icon: Facebook, 
                    url: "https://www.facebook.com/SenRikesh/",
                    hi: "फेसबुक पर जुड़ें",
                    en: "Join on Facebook"
                  },
                  { 
                    name: "Instagram", 
                    user: "@rikeshsenbjp", 
                    color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600", 
                    icon: Instagram, 
                    url: "https://www.instagram.com/rikeshsenbjp/",
                    hi: "इंस्टाग्राम पर फॉलो करें",
                    en: "Follow on Instagram"
                  },
                  { 
                    name: "X (Twitter)", 
                    user: "@Rikesh_SenBJP", 
                    color: "bg-black", 
                    icon: Twitter, 
                    url: "https://x.com/Rikesh_SenBJP",
                    hi: "X पर अपडेट्स पाएं",
                    en: "Get Updates on X"
                  }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-6 bg-white rounded-2xl shadow-soft border border-border hover:shadow-glow transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl ${social.color} flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <social.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{social.name}</h4>
                        <p className="text-xs text-muted-foreground">{social.user}</p>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                         <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-50">
                      <span className="text-sm font-semibold text-primary">
                         {language === 'hi' ? social.hi : social.en}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {settings.show_cta && (
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-primary z-0">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-primary to-secondary/30" />
          </div>
          
          <div className="container relative z-10">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[50px] p-8 md:p-16 text-center text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
                {language === 'hi' ? content.cta.title_hi : content.cta.title_en}
              </h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                {language === 'hi' ? content.cta.subtitle_hi : content.cta.subtitle_en}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="xl" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-10 py-7 rounded-2xl shadow-glow">
                  <Link to={content.cta.button1_link}><MessageCircle className="mr-2 h-6 w-6" /> {language === 'hi' ? 'कमल सेतु से जुड़ें' : 'Connect with Kamal Setu'}</Link>
                </Button>
                <Button asChild size="xl" variant="outline" className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 text-lg px-10 py-7 rounded-2xl">
                  <Link to={content.cta.button2_link}>{language === 'hi' ? 'संपर्क करें' : 'Contact Us'}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Index;
