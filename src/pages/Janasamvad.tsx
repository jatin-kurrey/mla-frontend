import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Twitter, Youtube, Instagram, Share2, Play, Heart, MessageCircle, ExternalLink } from "lucide-react";

import { useData } from "@/contexts/DataContext";

const Janasamvad = () => {
  const { language } = useLanguage();
  const { content } = useData();
  const { socials } = content;
  
  const youtube = socials.find(s => s.platform === 'youtube');
  const twitter = socials.find(s => s.platform === 'twitter');
  const facebook = socials.find(s => s.platform === 'facebook');
  const instagram = socials.find(s => s.platform === 'instagram');
  
  return (
    <div className="bg-[#f1f5f9] min-h-screen">
      <PageHeader 
        title={language === 'hi' ? "सोशल मीडिया हब" : "Social Media Hub"} 
        subtitle={language === 'hi' ? "विधायक जी के सभी सोशल मीडिया अपडेट्स एक जगह" : "All social media updates of the MLA in one place"} 
      />
      
      <section className="container py-12 space-y-16">
        {/* Real YouTube Wall - Multi-Video Grid */}
        {youtube && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b-2 border-red-600 pb-4">
               <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/20">
                   <Youtube className="h-7 w-7" />
                 </div>
                 <div>
                   <h2 className="text-3xl font-bold text-primary">{youtube.title}</h2>
                   <p className="text-sm text-muted-foreground">Official Channel: @RIKESHSENBJP</p>
                 </div>
               </div>
               <a 
                 href={youtube.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-red-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg flex items-center gap-2"
               >
                 Subscribe <ExternalLink className="h-4 w-4" />
               </a>
            </div>
            
            <div className="grid lg:grid-cols-1 gap-8">
              <div className="aspect-video w-full rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white bg-black">
                <iframe 
                  className="w-full h-full"
                  src={youtube.embedCode} 
                  title="YouTube playlist player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Real Facebook Live Timeline */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b-2 border-blue-600 pb-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <Facebook className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-bold text-primary">Facebook Live</h2>
            </div>
            <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border-8 border-white h-[700px]">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSenRikesh%2F&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                width="100%" 
                height="100%" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>

          {/* Real X (Twitter) Live Timeline */}
          {twitter && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b-2 border-black pb-4">
                <div className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg shadow-black/20">
                  <Twitter className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold text-primary">{twitter.title}</h2>
              </div>
              <div className="bg-white rounded-[40px] p-6 shadow-2xl border-8 border-white h-[700px] overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                  <a className="twitter-timeline" data-height="650" href={twitter.url}>Tweets by {twitter.title}</a> 
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instagram Interaction Hub */}
        <div className="space-y-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b-2 border-pink-500 pb-8">
             <div className="flex items-center gap-5">
               <div className="h-16 w-16 rounded-[24px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                 <Instagram className="h-10 w-10" />
               </div>
               <div>
                 <h2 className="text-4xl font-bold text-primary">Instagram {instagram?.title || "@rikeshsenbjp"}</h2>
                 <p className="text-xl text-muted-foreground">{language === 'hi' ? 'ताज़ा गतिविधियों की लाइव तस्वीरें' : 'Live photos of latest activities'}</p>
               </div>
             </div>
             <div className="flex gap-4">
                <a 
                  href={instagram?.url || "https://www.instagram.com/rikeshsenbjp/"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl flex items-center gap-2"
                >
                  Follow on Instagram <ExternalLink className="h-5 w-5" />
                </a>
             </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-slate-100">
             <div className="text-center space-y-6 max-w-2xl mx-auto mb-12">
                <h3 className="text-2xl font-bold text-slate-800">
                   {language === 'hi' ? 'Instagram की ताज़ा रील और तस्वीरें देखने के लिए यहाँ क्लिक करें' : 'Click below to view latest Instagram reels and photos'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                   {language === 'hi' 
                     ? 'प्राइवेसी पॉलिसी के कारण Instagram फीड को सीधे एम्बेड करने के लिए अकाउंट एक्सेस की आवश्यकता होती है। लाइव अपडेट्स के लिए सीधे प्रोफाइल पर जाएँ।' 
                     : 'Due to privacy policies, direct Instagram feed embedding requires account access. Visit the profile directly for live updates.'}
                </p>
             </div>
             
             {instagram?.embedCode ? (
                <div className="rounded-[40px] overflow-hidden border-8 border-slate-50 h-[600px]">
                   <iframe 
                      src={instagram.embedCode}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency={true}
                      allowFullScreen={true}
                   ></iframe>
                </div>
             ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1,2,3,4].map((i) => (
                    <a 
                      key={i}
                      href={instagram?.url || "https://www.instagram.com/rikeshsenbjp/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square bg-slate-100 rounded-3xl overflow-hidden relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all" />
                      <div className="absolute inset-0 flex items-center justify-center text-pink-500 opacity-20 group-hover:opacity-100 transition-all">
                        <Play className="h-12 w-12 fill-pink-500" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-all">
                        <span className="flex items-center gap-1"><Heart className="h-4 w-4 fill-white" /> 1.2k</span>
                        <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4 fill-white" /> 84</span>
                      </div>
                    </a>
                  ))}
                </div>
             )}
          </div>
        </div>
      </section>

      {/* Script for Twitter */}
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  );
};

export default Janasamvad;
