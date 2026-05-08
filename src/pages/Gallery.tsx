import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import { useData } from "@/contexts/DataContext";

const Gallery = () => {
  const { t, language } = useLanguage();
  const { content } = useData();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  
  // Use dynamic images from context, fallback to empty array
  const imgs = content.gallery || [];

  const handlePrev = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + imgs.length) % imgs.length);
    }
  };

  const handleNext = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % imgs.length);
    }
  };

  return (
    <>
      <PageHeader title={t('gallery.title')} subtitle={t('gallery.subtitle')} />
      
      <section className="container py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {imgs.map((item, i) => (
            <div 
              key={item.id} 
              className="mb-6 break-inside-avoid overflow-hidden rounded-3xl shadow-card group relative cursor-pointer border-4 border-white hover:border-primary/20 transition-all duration-300"
              onClick={() => setSelectedIdx(i)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy" 
                className="w-full object-cover group-hover:scale-110 transition-transform duration-700" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070";
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">{item.category}</span>
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
                <div className="mt-4 bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                  <Maximize2 className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Popup */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-[110]"
            onClick={() => setSelectedIdx(null)}
          >
            <X className="h-10 w-10" />
          </button>

          {/* Navigation Buttons */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-3 rounded-full transition-all z-[110]"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          >
            <ChevronLeft className="h-12 w-12" />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-3 rounded-full transition-all z-[110]"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            <ChevronRight className="h-12 w-12" />
          </button>

          {/* Image Container */}
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={imgs[selectedIdx].image} 
              alt={imgs[selectedIdx].title} 
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070";
              }}
            />
            <div className="mt-6 text-center">
              <h3 className="text-white text-2xl font-bold mb-2">{imgs[selectedIdx].title}</h3>
              <p className="text-white/60 text-lg">{language === 'hi' ? 'चित्र' : 'Image'} {selectedIdx + 1} {language === 'hi' ? 'कुल' : 'of'} {imgs.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
