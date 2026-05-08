import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";

const NewsDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { content } = useData();
  
  const news = content.news.find(n => n.id === id);
  const relatedNews = content.news.filter(n => n.id !== id).slice(0, 3);

  if (!news) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">News not found</h2>
        <Button asChild>
          <Link to="/news">{t('news.back')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader title={t('nav.news')} subtitle={news.title} />
      
      <section className="container py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <Link to="/news" className="inline-flex items-center gap-2 text-primary font-semibold mb-6 hover:gap-3 transition-all">
              <ArrowLeft className="h-4 w-4" /> {t('news.back')}
            </Link>
            
            <img 
              src={news.img} 
              alt={news.title} 
              className="w-full aspect-video object-cover rounded-3xl shadow-card mb-8" 
            />
            
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-muted-foreground border-b pb-6">
              <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
                {news.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {news.date}
              </span>
              <div className="flex items-center gap-3 ml-auto">
                <span className="font-semibold text-foreground">{t('news.share')}:</span>
                <Facebook className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
                <Twitter className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
                <LinkIcon className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
              {news.title}
            </h1>
            
            <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed space-y-6">
              <p className="font-bold text-lg text-foreground">
                {news.description}
              </p>
              <p>
                {news.content}
              </p>
              <p>
                {language === 'hi' 
                  ? "इस परियोजना के पूरा होने से स्थानीय निवासियों को आवागमन में सुविधा होगी और क्षेत्र का बुनियादी ढांचा और मजबूत होगा। विधायक ने संबंधित अधिकारियों को कार्य समय सीमा के भीतर पूरा करने के निर्देश दिए हैं।"
                  : "The completion of this project will facilitate movement for local residents and further strengthen the infrastructure of the area. The MLA has directed the concerned officers to complete the work within the time limit."}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-muted/50 rounded-3xl p-8 sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                {t('news.related')}
              </h3>
              
              <div className="space-y-6">
                {relatedNews.map(rn => (
                  <Link key={rn.id} to={`/news/${rn.id}`} className="flex gap-4 group">
                    <img 
                      src={rn.img} 
                      alt={rn.title} 
                      className="h-20 w-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform" 
                    />
                    <div>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">
                        {rn.category}
                      </p>
                      <h4 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {rn.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {rn.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="bg-gradient-cta rounded-2xl p-6 text-white text-center">
                  <h4 className="font-bold mb-2 text-lg">
                    {language === 'hi' ? 'सीधे जुड़ें' : 'Connect Directly'}
                  </h4>
                  <p className="text-xs opacity-90 mb-4">
                    {language === 'hi' ? 'ताज़ा अपडेट पाने के लिए हमारे न्यूज़लेटर को सब्सक्राइब करें' : 'Subscribe to our newsletter to get latest updates'}
                  </p>
                  <Button variant="secondary" size="sm" className="w-full">
                    {language === 'hi' ? 'जुड़ें' : 'Join Now'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsDetail;
