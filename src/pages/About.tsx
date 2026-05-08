import { PageHeader } from "@/components/PageHeader";
import { Lotus } from "@/components/Lotus";
import { Award, Calendar, Heart, Target, CheckCircle2, Zap, HelpCircle, ShieldCheck, Users, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";

const iconMap: Record<string, any> = {
  Award, Calendar, Heart, Target, CheckCircle2, Zap, ShieldCheck, Users, MessageSquare
};

const About = () => {
  const { t, language } = useLanguage();
  const { content } = useData();
  const { aboutPage, milestones, values } = content;

  return (
    <>
      <PageHeader 
        title={language === 'hi' ? (aboutPage.page_title_hi || t('about.title')) : (aboutPage.page_title_en || t('about.title'))} 
        subtitle={language === 'hi' ? (aboutPage.page_subtitle_hi || t('about.subtitle')) : (aboutPage.page_subtitle_en || t('about.subtitle'))} 
      />
      <section className="container py-12 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-2xl" />
          <img src={aboutPage.main_image} alt={t('hero.mla_name')} className="relative rounded-3xl shadow-glow w-full max-w-md mx-auto object-cover object-top" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-primary">{t('hero.mla_name')}</h2>
          <p className="text-muted-foreground italic">{t('hero.mla_pos')}, {t('footer.address').split(',')[1]}</p>
          <p className="text-foreground/80 leading-relaxed text-lg">
            {language === 'hi' ? aboutPage.intro_text_1_hi : aboutPage.intro_text_1_en}
          </p>
          <p className="text-foreground/80 leading-relaxed">
            {language === 'hi' ? aboutPage.intro_text_2_hi : aboutPage.intro_text_2_en}
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              [t('about.birthplace'), language === 'hi' ? aboutPage.birthplace_hi : aboutPage.birthplace_en],
              [t('about.education'), language === 'hi' ? aboutPage.education_hi : aboutPage.education_en],
              [t('about.party'), language === 'hi' ? aboutPage.party_hi : aboutPage.party_en],
              [t('about.current_pos'), language === 'hi' ? aboutPage.current_pos_hi : aboutPage.current_pos_en]
            ].map(([k,v]) => (
              <div key={k} className="bg-muted rounded-lg p-3 border border-border/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{k}</p>
                <p className="font-bold text-primary">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {values.length > 0 && (
        <section className="bg-muted/50 py-16">
          <div className="container">
            <h2 className="text-4xl font-bold text-center text-primary mb-12">{t('about.values')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(v => {
                const Icon = iconMap[v.icon] || HelpCircle;
                return (
                  <div key={v.title} className="bg-card p-8 rounded-3xl shadow-card text-center border border-border/40 hover:border-primary/30 transition-all group">
                    <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-primary">{language === 'hi' ? v.title_hi : v.title_en}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{language === 'hi' ? v.text_hi : v.text_en}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {milestones.length > 0 && (
        <section className="container py-20 overflow-hidden">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">{t('about.journey')}</h2>
            <div className="h-1.5 w-24 bg-gradient-primary mx-auto rounded-full" />
          </div>
          
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/10 via-primary to-primary/10 hidden md:block" />
            
            <div className="space-y-16">
              {milestones.map((m, i) => (
                <div key={m.id} className="relative flex flex-col md:flex-row items-center justify-between mb-24 last:mb-0">
                  <div className="absolute left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-background border-4 border-primary flex items-center justify-center z-30 shadow-glow hidden md:flex">
                    <span className="text-sm font-bold text-primary">{m.year}</span>
                  </div>
                  
                  <div className={`w-full md:w-[42%] ${i % 2 === 0 ? "order-1" : "order-2 md:order-1 text-center md:text-right"}`}>
                    {i % 2 === 0 ? (
                      <div className="relative group">
                        <div className="absolute -top-4 -left-4 bg-primary text-white px-4 py-2 rounded-xl text-lg font-bold z-30 shadow-glow transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                          {m.year}
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white transform hover:scale-105 transition-transform duration-500 relative z-10 bg-white">
                          <img src={m.image} alt={language === 'hi' ? m.title_hi : m.title_en} className="w-full aspect-[4/3] object-cover" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-primary flex items-center gap-2 justify-center md:justify-end">
                          {language === 'hi' ? m.title_hi : m.title_en}
                          <Lotus className="h-6 w-6" />
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {language === 'hi' ? m.description_hi : m.description_en}
                        </p>
                        <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold md:hidden">
                          {m.year}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`w-full md:w-[42%] mt-12 md:mt-0 ${i % 2 === 0 ? "order-2 text-center md:text-left" : "order-1 md:order-2"}`}>
                    {i % 2 === 0 ? (
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-primary flex items-center gap-2 justify-center md:justify-start">
                          <Lotus className="h-6 w-6" />
                          {language === 'hi' ? m.title_hi : m.title_en}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {language === 'hi' ? m.description_hi : m.description_en}
                        </p>
                        <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold md:hidden">
                          {m.year}
                        </div>
                      </div>
                    ) : (
                      <div className="relative group">
                        <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-xl text-lg font-bold z-30 shadow-glow transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                          {m.year}
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white transform hover:scale-105 transition-transform duration-500 relative z-10 bg-white">
                          <img src={m.image} alt={language === 'hi' ? m.title_hi : m.title_en} className="w-full aspect-[4/3] object-cover" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default About;
