import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'hi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  hi: {
    'nav.home': 'होम',
    'nav.about': 'मेरे बारे में',
    'nav.development': 'विकास कार्य',
    'nav.schemes': 'योजनाएं',
    'nav.news': 'समाचार',
    'nav.janasamvad': 'जनसंपर्क',
    'nav.gallery': 'गैलरी',
    'nav.contact': 'संपर्क करें',
    'nav.cta': 'कमल सेतु',
    'hero.title': 'वैशाली नगर के विकास के लिए समर्पित',
    'hero.subtitle': 'जनसेवा का संकल्प, आधुनिक वैशाली नगर का लक्ष्य। हम सब मिलकर बनाएंगे एक बेहतर कल।',
    'hero.mla_name': 'रिकेश सेन',
    'hero.mla_pos': 'विधायक, वैशाली नगर',
    'hero.mla_exp': '(पूर्व पार्षद - 5 बार)',
    'footer.about_title': 'रिकेश सेन',
    'footer.about_desc': 'जनसेवा और विकास के प्रति समर्पित नेतृत्व। वैशाली नगर को एक आदर्श विधानसभा क्षेत्र बनाने का संकल्प।',
    'footer.links': 'त्वरित लिंक्स',
    'footer.contact': 'संपर्क विवरण',
    'footer.address': 'वैशाली नगर, भिलाई, छत्तीसगढ़',
    'footer.rights': 'सर्वाधिकार सुरक्षित',
    'gallery.title': 'गैलरी',
    'gallery.subtitle': 'कार्यक्रमों और सार्वजनिक आयोजनों की झलकियाँ',
    'about.title': 'मेरे बारे में',
    'about.subtitle': 'जनसेवा का संकल्प, विकास का लक्ष्य',
    'about.journey': 'मेरी राजनीतिक यात्रा',
    'about.values': 'मेरे मूल्य और सिद्धांत',
    'about.birthplace': 'जन्मस्थान',
    'about.education': 'शिक्षा',
    'about.party': 'राजनीतिक दल',
    'about.current_pos': 'वर्तमान पद',
    'about.more': 'और जानें',
    'hero.slogan1': 'सेवा ही संकल्प,',
    'hero.slogan2': 'विकास ही लक्ष्य',
    'hero.desc': 'वैशाली नगर के विकास, जनसेवा और आपके विश्वास का प्रतिबद्ध नेतृत्व',
    'hero.btn_dev': 'हमारे विकास कार्य',
    'hero.btn_complain': 'शिकायत दर्ज करें',
    'home.about_title': 'मेरे बारे में',
    'home.about_desc': 'मैं, रिकेश सेन, वैशाली नगर विधानसभा क्षेत्र का विधायक, भारतीय जनता पार्टी का एक समर्पित कार्यकर्ता हूँ। एक जनप्रतिनिधि होने के नाते मेरा संकल्प है — पारदर्शी शासन, तेज विकास और हर नागरिक का सम्मान।',
    'home.stats_title': 'विकास कार्य',
    'home.stats_all': 'सभी देखें',
    'home.complaint_title': 'जन शिकायत दर्ज करें',
    'home.complaint_subtitle': 'आपकी समस्या, हमारी प्राथमिकता से समाधान',
    'home.news_title': 'समाचार एवं कार्यक्रम',
    'home.schemes_title': 'प्रमुख योजनाएं',
    'home.schemes_all': 'सभी योजनाएं देखें',
    'home.cta_title': 'आइए, मिलकर वैशाली नगर को और बेहतर बनाएं',
    'home.cta_subtitle': 'आपका आगमन साथ, हमारा प्रयास - विकास की नई उड़ान',
    'home.volunteer': 'स्वयंसेवक बनें',
    'news.read_more': 'और पढ़ें',
    'news.back': 'समाचार पर वापस जाएं',
    'news.related': 'संबंधित समाचार',
    'news.share': 'साझा करें',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.development': 'Development',
    'nav.schemes': 'Schemes',
    'nav.news': 'News',
    'nav.janasamvad': 'Contact',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact Us',
    'nav.cta': 'Kamal Setu',
    'hero.title': 'Dedicated to Vaishali Nagar\'s Progress',
    'hero.subtitle': 'Commitment to public service, goal of a modern Vaishali Nagar. Together, we build a better tomorrow.',
    'hero.mla_name': 'Rikesh Sen',
    'hero.mla_pos': 'MLA, Vaishali Nagar',
    'hero.mla_exp': '(Former Councilor - 5 Times)',
    'footer.about_title': 'Rikesh Sen',
    'footer.about_desc': 'Leadership dedicated to public service and development. Resolved to make Vaishali Nagar an ideal constituency.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Details',
    'footer.address': 'Vaishali Nagar, Bhilai, Chhattisgarh',
    'footer.rights': 'All Rights Reserved',
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Glimpses of programs and public events',
    'about.title': 'About Me',
    'about.subtitle': 'Resolution of service, goal of development',
    'about.journey': 'My Political Journey',
    'about.values': 'My Values & Principles',
    'about.birthplace': 'Birthplace',
    'about.education': 'Education',
    'about.party': 'Political Party',
    'about.current_pos': 'Current Position',
    'about.more': 'Learn More',
    'hero.slogan1': 'Service is Commitment,',
    'hero.slogan2': 'Progress is the Goal',
    'hero.desc': 'Committed leadership for development, service, and your trust in Vaishali Nagar',
    'hero.btn_dev': 'Our Development Work',
    'hero.btn_complain': 'Register Complaint',
    'home.about_title': 'About Me',
    'home.about_desc': 'I, Rikesh Sen, MLA of Vaishali Nagar constituency, am a dedicated worker of the Bharatiya Janata Party. As a representative, my resolution is — transparent governance, rapid development, and respect for every citizen.',
    'home.stats_title': 'Development Work',
    'home.stats_all': 'View All',
    'home.complaint_title': 'Register Public Complaint',
    'home.complaint_subtitle': 'Your problem, our priority for resolution',
    'home.news_title': 'News & Events',
    'home.schemes_title': 'Key Schemes',
    'home.schemes_all': 'View All Schemes',
    'home.cta_title': "Let's make Vaishali Nagar better together",
    'home.cta_subtitle': 'Your support, our effort - A new flight of development',
    'home.volunteer': 'Become a Volunteer',
    'news.read_more': 'Read More',
    'news.back': 'Back to News',
    'news.related': 'Related News',
    'news.share': 'Share',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'hi';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
