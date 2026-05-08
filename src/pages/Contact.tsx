import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lotus } from "@/components/Lotus";

const Contact = () => {
  const { language } = useLanguage();
  
  return (
    <>
      <PageHeader 
        title={language === 'hi' ? "संपर्क करें" : "Contact Us"} 
        subtitle={language === 'hi' ? "हमसे जुड़ें, अपनी बात पहुँचाएँ" : "Connect with us, share your thoughts"} 
      />
      <section className="container py-12 grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon: MapPin, title: language === 'hi' ? "कार्यालय पता" : "Office Address", text: language === 'hi' ? "विधायक कार्यालय, वैशाली नगर, जयपुर, राजस्थान - 302021" : "MLA Office, Vaishali Nagar, Jaipur, Rajasthan - 302021" },
            { icon: Phone, title: language === 'hi' ? "फोन" : "Phone", text: "0141-4105020 / +91 97850 18444" },
            { icon: Mail, title: language === 'hi' ? "ईमेल" : "Email", text: "contact@rikeshsen.in" },
            { icon: Clock, title: language === 'hi' ? "कार्यालय समय" : "Office Hours", text: language === 'hi' ? "सोम-शनि: 10:00 AM - 06:00 PM" : "Mon-Sat: 10:00 AM - 06:00 PM" },
          ].map(c => (
            <div key={c.title} className="bg-card rounded-2xl p-5 shadow-card flex gap-4 items-start">
              <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <c.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold mb-1">{c.title}</h3>
                <p className="text-muted-foreground text-sm">{c.text}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl overflow-hidden shadow-card aspect-video">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=vaishali%20nagar%20jaipur&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        <div className="bg-card border border-slate-100 rounded-3xl p-8 md:p-10 shadow-soft h-fit flex flex-col items-center text-center">
          {/* Minimal Header */}
          <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-6">
             <Lotus className="h-10 w-10" />
          </div>

          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-3 text-slate-900 font-hindi">
              {language === 'hi' ? 'कमल सेतु' : 'Kamal Setu'}
            </h3>
            
            <p className="text-sm text-slate-500 mb-8 font-hindi leading-relaxed">
              {language === 'hi' 
                ? 'विधायक रिकेश सेन जी से सीधे संपर्क और त्वरित सहायता के लिए व्हाट्सएप हेल्पलाइन का उपयोग करें।' 
                : 'Use the WhatsApp helpline for direct contact and quick assistance from MLA Rikesh Sen Ji.'}
            </p>
            
            <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
               <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">WhatsApp Helpline</p>
               <p className="text-2xl font-bold text-slate-800">+91 99778 91333</p>
            </div>

            <Button 
              asChild
              className="w-full h-14 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <a 
                href={`https://wa.me/919977891333?text=${encodeURIComponent(
                  language === 'hi' ? 'नमस्ते विधायक जी, मुझे आपकी सहायता चाहिए।' : 'Namaste MLA Ji, I need your assistance.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                 <MessageCircle className="h-5 w-5" />
                 {language === 'hi' ? 'व्हाट्सएप संदेश' : 'WhatsApp Message'}
              </a>
            </Button>
            
            <p className="mt-6 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
               {language === 'hi' ? '24/7 त्वरित सहायता सेवा' : '24/7 Quick Support Service'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
