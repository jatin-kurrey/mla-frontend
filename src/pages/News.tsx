import { PageHeader } from "@/components/PageHeader";
import { Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";

const News = () => {
  const { t, language } = useLanguage();
  const { content } = useData();
  const newsItems = content.news || [];

  return (
    <>
      <PageHeader title={t('nav.news')} subtitle={language === 'hi' ? "हाल की गतिविधियों और कार्यक्रमों की जानकारी" : "Information about recent activities and programs"} />
      <section className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((n) => (
            <article key={n.id} className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition group">
              <div className="relative overflow-hidden">
                <img src={n.image} alt={language === 'hi' ? n.title_hi : n.title_en} className="aspect-[16/10] w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">{language === 'hi' ? 'समाचार' : 'News'}</span>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2"><Calendar className="h-3 w-3" />{language === 'hi' ? n.date_hi : n.date_en}</p>
                <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">{language === 'hi' ? n.title_hi : n.title_en}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{language === 'hi' ? n.description_hi : n.description_en}</p>
                <Link to={`/news/${n.id}`} className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  {t('news.read_more')} <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default News;
