import { PageHeader } from "@/components/PageHeader";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, HandHeart, GraduationCap, Briefcase, HeartPulse, Home, Tractor, Baby, ArrowRight } from "lucide-react";

const Schemes = () => {
  const { content } = useData();
  const { language } = useLanguage();
  const schemes = content.schemes;

  const iconMap: any = { Users, HandHeart, GraduationCap, Briefcase, HeartPulse, Home, Tractor, Baby, ArrowRight };

  return (
    <>
      <PageHeader 
        title={language === 'hi' ? "सरकारी योजनाएं" : "Government Schemes"} 
        subtitle={language === 'hi' ? "हर वर्ग के लिए कल्याणकारी योजनाओं की जानकारी" : "Information about welfare schemes for every section of society"} 
      />
      <section className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {schemes.map(s => {
            const IconComp = iconMap[s.icon] || Users;
            const title = language === 'hi' ? s.title_hi : s.title_en;
            const desc = language === 'hi' ? s.desc_hi : s.desc_en;
            const category = language === 'hi' ? s.category_hi : s.category_en;
            
            return (
              <div key={s.id} className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition group">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">{category}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                <a href="#" className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  {language === 'hi' ? 'अधिक जानें' : 'Learn More'} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Schemes;
