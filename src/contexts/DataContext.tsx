import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NewsItem {
  id: string;
  image: string;
  date_hi: string;
  date_en: string;
  title_hi: string;
  title_en: string;
  description_hi: string;
  description_en: string;
  category_hi: string;
  category_en: string;
  content_hi: string;
  content_en: string;
}

interface StatItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  sub: string;
}

interface SchemeItem {
  id: string;
  icon: string;
  title_hi: string;
  title_en: string;
  desc_hi: string;
  desc_en: string;
  category_hi: string;
  category_en: string;
  color: string;
}

interface ProjectItem {
  id: string;
  icon: string;
  title_hi: string;
  title_en: string;
  desc_hi: string;
  desc_en: string;
  count: string;
  color: string;
}

interface VisibilitySettings {
  id?: number;
  show_topbar: boolean;
  show_navbar: boolean;
  show_hero: boolean;
  show_hero_slogan: boolean;
  show_hero_buttons: boolean;
  show_hero_mla: boolean;
  show_hero_services: boolean;
  show_stats: boolean;
  show_news: boolean;
  show_schemes: boolean;
  show_gallery: boolean;
  show_about: boolean;
  show_timeline: boolean;
  show_social: boolean;
  show_footer: boolean;
  show_cta: boolean;
}

interface AboutItem {
  id?: number;
  title_hi: string;
  title_en: string;
  subtitle_hi: string;
  subtitle_en: string;
  description_hi: string;
  description_en: string;
  experience_hi: string;
  experience_en: string;
  point1_hi: string;
  point1_en: string;
  point2_hi: string;
  point2_en: string;
  point3_hi: string;
  point3_en: string;
  point4_hi: string;
  point4_en: string;
  image: string;
  birthplace_hi: string;
  birthplace_en: string;
  education_hi: string;
  education_en: string;
}

export interface Milestone {
  id?: number;
  year: string;
  title_hi: string;
  title_en: string;
  description_hi: string;
  description_en: string;
  image: string;
}

export interface Value {
  id?: number;
  title_hi: string;
  title_en: string;
  text_hi: string;
  text_en: string;
  icon: string;
}

export interface AboutPageData {
  id?: number;
  page_title_hi: string;
  page_title_en: string;
  page_subtitle_hi: string;
  page_subtitle_en: string;
  intro_text_1_hi: string;
  intro_text_1_en: string;
  intro_text_2_hi: string;
  intro_text_2_en: string;
  birthplace_hi: string;
  birthplace_en: string;
  education_hi: string;
  education_en: string;
  party_hi: string;
  party_en: string;
  current_pos_hi: string;
  current_pos_en: string;
  main_image: string;
}

export interface DevelopmentItem {
  id?: number;
  icon: string;
  title_hi: string;
  title_en: string;
  count: string;
  desc_hi: string;
  desc_en: string;
  color: string;
}

export interface WardWorkItem {
  id?: number;
  ward_num: number;
  project_count: number;
  details: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  title: string;
  url: string;
  embedCode: string;
}

interface SiteContent {
  hero: {
    slogan1_hi: string;
    slogan1_en: string;
    slogan2_hi: string;
    slogan2_en: string;
    desc_hi: string;
    desc_en: string;
    videoUrl: string;
    mlaImage: string;
  };
  news: NewsItem[];
  stats: StatItem[];
  schemes: SchemeItem[];
  projects: ProjectItem[];
  gallery: GalleryItem[];
  socials: SocialLink[];
  settings: VisibilitySettings;
  about: AboutItem;
  aboutPage: AboutPageData;
  milestones: Milestone[];
  values: Value[];
  development: DevelopmentItem[];
  wardWork: WardWorkItem[];
  cta: {
    title_hi: string;
    title_en: string;
    subtitle_hi: string;
    subtitle_en: string;
    button1_text_hi: string;
    button1_text_en: string;
    button1_link: string;
    button2_text_hi: string;
    button2_text_en: string;
    button2_link: string;
  };
}

interface DataContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_URL = "http://localhost:5001/api";

const defaultContent: SiteContent = {
  hero: {
    slogan1_hi: "सेवा ही संकल्प,",
    slogan1_en: "Service is Resolution,",
    slogan2_hi: "विकास ही लक्ष्य",
    slogan2_en: "Development is Goal",
    desc_hi: "वैशाली नगर के विकास, जनसेवा और आपके विश्वास का प्रतिबद्ध नेतृत्व",
    desc_en: "Committed leadership for Vaishali Nagar's development and service",
    videoUrl: "/rikesh_sen.mp4",
    mlaImage: "/image.png"
  },
  news: [
    { id: '1', image: "/src/assets/news1.jpg", date_hi: "15 May 2024", date_en: "15 May 2024", title_hi: "वैशाली नगर में विकास कार्यों का शिलान्यास", title_en: "Foundation Stone Laid for Development Works", description_hi: "", description_en: "", category_hi: "", category_en: "", content_hi: "", content_en: "" },
    { id: '2', image: "/src/assets/news2.jpg", date_hi: "10 May 2024", date_en: "10 May 2024", title_hi: "महिला सशक्तिकरण कार्यक्रम का आयोजन", title_en: "Women Empowerment Program Organized", description_hi: "", description_en: "", category_hi: "", category_en: "", content_hi: "", content_en: "" },
    { id: '3', image: "/src/assets/news3.jpg", date_hi: "05 May 2024", date_en: "05 May 2024", title_hi: "निःशुल्क स्वास्थ्य शिविर का आयोजन", title_en: "Free Health Camp Organized", description_hi: "", description_en: "", category_hi: "", category_en: "", content_hi: "", content_en: "" },
  ],
  stats: [
    { id: '1', icon: 'Construction', label: "सड़क निर्माण", value: "125+", sub: "परियोजनाएं पूर्ण" },
    { id: '2', icon: 'Droplets', label: "जल आपूर्ति", value: "85+", sub: "परियोजनाएं पूर्ण" },
    { id: '3', icon: 'GraduationCap', label: "शिक्षा", value: "60+", sub: "परियोजनाएं पूर्ण" },
    { id: '4', icon: 'HeartPulse', label: "स्वास्थ्य", value: "40+", sub: "परियोजनाएं पूर्ण" },
    { id: '5', icon: 'Zap', label: "विद्युत व्यवस्था", value: "70+", sub: "प्रोजेक्ट पूर्ण" },
    { id: '6', icon: 'Briefcase', label: "युवा रोजगार", value: "30+", sub: "कार्यक्रम आयोजित" },
  ],
  schemes: [
    { id: '1', icon: 'Users', title_hi: "महिलाओं के लिए", title_en: "For Women", color: "text-pink-500", desc_hi: "", desc_en: "", category_hi: "all", category_en: "all" },
    { id: '2', icon: 'Users', title_hi: "युवाओं के लिए", title_en: "For Youth", color: "text-teal-600", desc_hi: "", desc_en: "", category_hi: "all", category_en: "all" },
    { id: '3', icon: 'HandHeart', title_hi: "किसानों के लिए", title_en: "For Farmers", color: "text-green-600", desc_hi: "", desc_en: "", category_hi: "all", category_en: "all" },
    { id: '4', icon: 'Users', title_hi: "वरिष्ठ नागरिक", title_en: "Senior Citizens", color: "text-orange-500", desc_hi: "", desc_en: "", category_hi: "all", category_en: "all" },
    { id: '5', icon: 'GraduationCap', title_hi: "शिक्षा योजनाएं", title_en: "Education Schemes", color: "text-emerald-700", desc_hi: "", desc_en: "", category_hi: "all", category_en: "all" },
    { id: '6', icon: 'Briefcase', title_hi: "अन्य योजनाएं", title_en: "Other Schemes", color: "text-amber-600", desc_hi: "", desc_en: "", category_hi: "all", category_en: "all" },
  ],
  projects: [],
  gallery: [
    { id: '1', title: "गणेश चतुर्थी उत्सव", image: "https://images.unsplash.com/photo-1567591974574-e852631b1813?q=80&w=2070", category: "Events" },
    { id: '2', title: "विकास कार्यों का निरीक्षण", image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070", Category: "Work" },
    { id: '3', title: "जनता से संवाद", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070", category: "Public" },
  ],
  socials: [
    { id: '1', platform: 'youtube', title: "YouTube Live Feed", url: "https://www.youtube.com/@RIKESH_SEN_BJP", embedCode: "https://www.youtube.com/embed/live_stream?channel=UC-..." },
    { id: '2', platform: 'twitter', title: "Twitter Updates", url: "https://twitter.com/rikeshsen", embedCode: "" },
  ],
  settings: {
    show_topbar: true,
    show_navbar: true,
    show_hero: true,
    show_hero_slogan: true,
    show_hero_buttons: true,
    show_hero_mla: true,
    show_hero_services: true,
    show_stats: true,
    show_news: true,
    show_schemes: true,
    show_gallery: true,
    show_about: true,
    show_timeline: true,
    show_social: true,
    show_footer: true,
    show_cta: true,
  },
  about: {
    title_hi: "समर्पित जनसेवक,",
    title_en: "Dedicated Servant,",
    subtitle_hi: "रिकेश सेन",
    subtitle_en: "Rikesh Sen",
    description_hi: "वैशाली नगर विधानसभा क्षेत्र के सर्वांगीण विकास के लिए कटिबद्ध।",
    description_en: "Committed to the holistic development of Vaishali Nagar assembly constituency.",
    experience_hi: "25+",
    experience_en: "25+",
    point1_hi: "युवा नेतृत्व",
    point1_en: "Youth Leadership",
    point2_hi: "स्वच्छ छवि",
    point2_en: "Clean Image",
    point3_hi: "जन सुलभ",
    point3_en: "Accessible",
    point4_hi: "विकासशील सोच",
    point4_en: "Progressive Thinking",
    image: "/src/assets/about-mla.png",
    birthplace_hi: "भिलाई",
    birthplace_en: "Bhilai",
    education_hi: "स्नातकोत्तर",
    education_en: "Post Graduate"
  },
  aboutPage: {
    page_title_hi: "विधायक रिकेश सेन का जीवन परिचय",
    page_title_en: "Biography of MLA Rikesh Sen",
    page_subtitle_hi: "जनसेवा के 25 वर्ष: एक संघर्षपूर्ण एवं गौरवमयी यात्रा",
    page_subtitle_en: "25 Years of Public Service: A Struggle and Glorious Journey",
    intro_text_1_hi: "रिकेश सेन का जन्म भिलाई की पावन धरा पर हुआ...",
    intro_text_1_en: "Rikesh Sen was born on the holy land of Bhilai...",
    intro_text_2_hi: "छात्र राजनीति से अपने सार्वजनिक जीवन की शुरुआत करने वाले...",
    intro_text_2_en: "Starting his public life from student politics...",
    birthplace_hi: "भिलाई, छत्तीसगढ़",
    birthplace_en: "Bhilai, Chhattisgarh",
    education_hi: "स्नातकोत्तर (M.A.)",
    education_en: "Post Graduate (M.A.)",
    party_hi: "भारतीय जनता पार्टी",
    party_en: "BJP",
    current_pos_hi: "विधायक, वैशाली नगर विधानसभा",
    current_pos_en: "MLA, Vaishali Nagar Assembly",
    main_image: "/src/assets/about-mla.png"
  },
  milestones: [],
  values: [],
  development: [],
  wardWork: [],
  cta: {
    title: "Let's make Vaishali Nagar better together",
    subtitle: "Your support, our effort - A new flight of development",
    button1Text: "Become a Volunteer",
    button1Link: "/janasamvad",
    button2Text: "Contact Us",
    button2Link: "/contact",
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    const safeFetch = async (endpoint: string, defaultValue: any) => {
      try {
        const res = await fetch(`${API_URL}/${endpoint}`);
        if (!res.ok) return defaultValue;
        return await res.json();
      } catch (e) {
        console.warn(`Failed to fetch ${endpoint}, using default`);
        return defaultValue;
      }
    };

    try {
      const [
        hero, news, stats, schemes, settings, about, ap, m, v, dev, ww, gallery, socials, cta
      ] = await Promise.all([
        safeFetch('hero', defaultContent.hero),
        safeFetch('news', []),
        safeFetch('stats', []),
        safeFetch('schemes', []),
        safeFetch('settings', defaultContent.settings),
        safeFetch('about', defaultContent.about),
        safeFetch('about-page', defaultContent.aboutPage),
        safeFetch('milestones', []),
        safeFetch('values', []),
        safeFetch('development', []),
        safeFetch('ward-work', []),
        safeFetch('gallery', []),
        safeFetch('socials', []),
        safeFetch('cta', defaultContent.cta),
      ]);

      setContent({
        hero: hero.id ? {
          slogan1_hi: hero.slogan1_hi,
          slogan1_en: hero.slogan1_en,
          slogan2_hi: hero.slogan2_hi,
          slogan2_en: hero.slogan2_en,
          desc_hi: hero.desc_hi,
          desc_en: hero.desc_en,
          videoUrl: hero.video_url,
          mlaImage: hero.mla_image
        } : defaultContent.hero,
        news: (news && Array.isArray(news) && news.length) ? news.map((n: any) => ({
          id: n.id.toString(),
          title_hi: n.title_hi,
          title_en: n.title_en,
          date_hi: n.date_hi,
          date_en: n.date_en,
          image: n.image,
          description_hi: n.description_hi,
          description_en: n.description_en,
          category_hi: n.category_hi,
          category_en: n.category_en,
          content_hi: n.content_hi,
          content_en: n.content_en
        })) : defaultContent.news,
        stats: (stats && Array.isArray(stats) && stats.length) ? stats : defaultContent.stats,
        schemes: (schemes && Array.isArray(schemes)) ? schemes.map((s: any) => ({
          id: s.id.toString(),
          icon: s.icon,
          title_hi: s.title_hi,
          title_en: s.title_en,
          desc_hi: s.desc_hi,
          desc_en: s.desc_en,
          category_hi: s.category_hi,
          category_en: s.category_en,
          color: s.color || "text-primary"
        })) : defaultContent.schemes,
        gallery: (gallery && Array.isArray(gallery) && gallery.length) ? gallery.map((g: any) => ({
          id: g.id.toString(),
          title: g.title,
          image: g.image || g.image_url,
          category: g.category
        })) : defaultContent.gallery,
        socials: (socials && Array.isArray(socials) && socials.length) ? socials.map((s: any) => ({
          id: s.id.toString(),
          platform: s.platform,
          title: s.title,
          url: s.url,
          embedCode: s.embed_code
        })) : defaultContent.socials,
        projects: [],
        settings: settings.id ? settings : defaultContent.settings,
        about: about.id ? {
          id: about.id,
          title_hi: about.title_hi,
          title_en: about.title_en,
          subtitle_hi: about.subtitle_hi,
          subtitle_en: about.subtitle_en,
          description_hi: about.description_hi,
          description_en: about.description_en,
          experience_hi: about.experience_hi,
          experience_en: about.experience_en,
          point1_hi: about.point1_hi,
          point1_en: about.point1_en,
          point2_hi: about.point2_hi,
          point2_en: about.point2_en,
          point3_hi: about.point3_hi,
          point3_en: about.point3_en,
          point4_hi: about.point4_hi,
          point4_en: about.point4_en,
          image: about.image,
          birthplace_hi: about.birthplace_hi,
          birthplace_en: about.birthplace_en,
          education_hi: about.education_hi,
          education_en: about.education_en
        } : defaultContent.about,
        aboutPage: ap.id ? {
          id: ap.id,
          page_title_hi: ap.page_title_hi,
          page_title_en: ap.page_title_en,
          page_subtitle_hi: ap.page_subtitle_hi,
          page_subtitle_en: ap.page_subtitle_en,
          intro_text_1_hi: ap.intro_text_1_hi,
          intro_text_1_en: ap.intro_text_1_en,
          intro_text_2_hi: ap.intro_text_2_hi,
          intro_text_2_en: ap.intro_text_2_en,
          birthplace_hi: ap.birthplace_hi,
          birthplace_en: ap.birthplace_en,
          education_hi: ap.education_hi,
          education_en: ap.education_en,
          party_hi: ap.party_hi,
          party_en: ap.party_en,
          current_pos_hi: ap.current_pos_hi,
          current_pos_en: ap.current_pos_en,
          main_image: ap.main_image
        } : defaultContent.aboutPage,
        milestones: (m && Array.isArray(m)) ? m.map((mi: any) => ({
          id: mi.id,
          year: mi.year,
          title_hi: mi.title_hi,
          title_en: mi.title_en,
          description_hi: mi.description_hi,
          description_en: mi.description_en,
          image: mi.image 
        })) : [],
        values: (v && Array.isArray(v)) ? v.map((vi: any) => ({
          id: vi.id,
          title_hi: vi.title_hi,
          title_en: vi.title_en,
          text_hi: vi.text_hi,
          text_en: vi.text_en,
          icon: vi.icon
        })) : [],
        development: (dev && Array.isArray(dev)) ? dev.map((d: any) => ({
          id: d.id,
          icon: d.icon,
          title_hi: d.title_hi,
          title_en: d.title_en,
          count: d.count,
          desc_hi: d.desc_hi,
          desc_en: d.desc_en,
          color: d.color
        })) : [],
        wardWork: (ww && Array.isArray(ww)) ? ww : [],
        cta: cta.id ? {
          title_hi: cta.title_hi,
          title_en: cta.title_en,
          subtitle_hi: cta.subtitle_hi,
          subtitle_en: cta.subtitle_en,
          button1_text_hi: cta.button1_text_hi,
          button1_text_en: cta.button1_text_en,
          button1_link: cta.button1_link,
          button2_text_hi: cta.button2_text_hi,
          button2_text_en: cta.button2_text_en,
          button2_link: cta.button2_link
        } : defaultContent.cta
      });
    } catch (err) {
      console.error("Critical error in fetchContent", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  return (
    <DataContext.Provider value={{ content, updateContent, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
