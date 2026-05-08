import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export const WhatsAppSupport = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { language } = useLanguage();
  const whatsappNumber = "919977891333";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    language === 'hi' ? 'नमस्ते विधायक जी, मुझे "कमल सेतु" के माध्यम से सहायता चाहिए।' : 'Namaste MLA Ji, I need assistance through "Kamal Setu".'
  )}`;

  useEffect(() => {
    // Show popup after a short delay on every reload
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] group flex items-center gap-3"
      >
        <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-slate-200 text-sm font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 hidden md:block">
           {language === 'hi' ? 'कमल सेतु' : 'Kamal Setu'}
        </div>
        <div className="h-14 w-14 md:h-16 md:w-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300 relative group-active:scale-95">
           <MessageCircle className="h-8 w-8 md:h-9 md:w-9" />
           <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </div>
      </a>

      {/* Entrance Popup - Premium Minimal Version */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="p-0 overflow-hidden border-none bg-white rounded-[40px] max-w-[95vw] sm:max-w-[440px] shadow-[0_30px_80px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col">
            {/* Close Button */}
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-6 right-6 z-50 h-10 w-10 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all hover:rotate-90"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Media Header Section */}
            <div className="relative aspect-[4/5] w-full bg-primary overflow-hidden">
              <img 
                src="/mla kamal setu.jpg" 
                alt="MLA Kamal Setu" 
                className="w-full h-full object-cover transition-transform duration-[20s] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1 w-12 bg-orange-500 rounded-full" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black opacity-70">Official Portal</span>
                </div>
                <h2 className="text-4xl font-bold leading-tight font-hindi">
                  {language === 'hi' ? 'कमल सेतु' : 'Kamal Setu'}
                </h2>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="p-8 space-y-6">
              <p className="text-slate-600 leading-relaxed font-hindi text-lg">
                {language === 'hi' 
                  ? 'आपकी समस्याओं का सीधा और त्वरित समाधान। अब व्हाट्सएप के माध्यम से सीधे जुड़ें।' 
                  : 'Direct and quick solution to your problems. Connect directly via WhatsApp now.'}
              </p>

              <div className="flex flex-col gap-3">
                <Button 
                  asChild
                  className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-lg shadow-[0_10px_25px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                     <MessageCircle className="h-6 w-6" />
                     {language === 'hi' ? 'व्हाट्सएप पर जुड़ें' : 'Join on WhatsApp'}
                  </a>
                </Button>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="w-full py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm uppercase tracking-widest"
                >
                  {language === 'hi' ? 'बाद में' : 'Remind me later'}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

