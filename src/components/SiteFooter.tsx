import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Lotus } from "./Lotus";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";

export const SiteFooter = () => {
  const { t, language } = useLanguage();
  const { content } = useData();
  const { settings } = content;
  return (
    <>
      {settings.show_footer && (
        <footer className="bg-secondary text-secondary-foreground">
          <div className="container py-12 grid md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full border-2 border-primary flex items-center justify-center text-primary">
                  <Lotus className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-bold text-lg font-hindi">{t('footer.about_title')}</p>
                  <p className="text-xs opacity-80">{t('hero.mla_pos')}, {t('footer.address').split(',')[1]}</p>
                </div>
              </div>
              <p className="opacity-90 mb-4 text-xs leading-relaxed">
                {t('footer.about_desc')}
              </p>
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, url: "https://www.facebook.com/SenRikesh/" },
                  { Icon: Twitter, url: "https://x.com/Rikesh_SenBJP" },
                  { Icon: Instagram, url: "https://www.instagram.com/rikeshsenbjp/" },
                  { Icon: Youtube, url: "https://www.youtube.com/@RIKESHSENBJP" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-transform hover:scale-110"
                  >
                    <social.Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-primary font-bold mb-3">{t('footer.links')}</h4>
              <ul className="space-y-2 opacity-90">
                <li><Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/development" className="hover:text-primary transition-colors">{t('nav.development')}</Link></li>
                <li><Link to="/schemes" className="hover:text-primary transition-colors">{t('nav.schemes')}</Link></li>
                <li><Link to="/news" className="hover:text-primary transition-colors">{t('nav.news')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-primary font-bold mb-3">{t('footer.contact')}</h4>
              <ul className="space-y-2 opacity-90">
                <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {t('footer.address')}</li>
                <li className="flex gap-2"><Phone className="h-4 w-4 text-primary" /> 0141-4105020</li>
                <li className="flex gap-2"><Phone className="h-4 w-4 text-primary" /> +91 97850 18444</li>
                <li className="flex gap-2"><Mail className="h-4 w-4 text-primary" /> contact@rikeshsen.in</li>
              </ul>
            </div>
            <div>
              <h4 className="text-primary font-bold mb-3">{language === 'hi' ? 'कार्यालय समय' : 'Office Hours'}</h4>
              <ul className="space-y-2 opacity-90">
                <li className="flex gap-2"><Clock className="h-4 w-4 text-primary" /> {language === 'hi' ? 'सोमवार - शनिवार' : 'Monday - Saturday'}</li>
                <li className="flex gap-2"><Clock className="h-4 w-4 text-primary" /> {language === 'hi' ? 'प्रातः 10:00 AM - 06:00 PM' : '10:00 AM - 06:00 PM'}</li>
                <li className="flex gap-2"><Clock className="h-4 w-4 text-primary" /> {language === 'hi' ? 'रविवार' : 'Sunday'}</li>
                <li className="flex gap-2"><Clock className="h-4 w-4 text-primary" /> {language === 'hi' ? 'केवल पूर्व निर्धारित समय पर' : 'By Appointment Only'}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="container py-4 flex flex-col md:flex-row justify-between text-xs opacity-80">
              <span>© 2024 {t('footer.about_title')} {t('footer.rights')}</span>
              <div className="flex gap-4"><a href="#" className="hover:text-primary">Privacy Policy</a><a href="#" className="hover:text-primary">Terms & Conditions</a></div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};
