import { PageHeader } from "@/components/PageHeader";
import { Construction, Droplets, GraduationCap, HeartPulse, Zap, Briefcase, MapPin, TreePine, Building2, Bus, X } from "lucide-react";
import { useState } from "react";

import { useData } from "@/contexts/DataContext";

const Development = () => {
  const { content } = useData();
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const projects = content.development;
  return (
    <>
      <PageHeader title="विकास कार्य" subtitle="वैशाली नगर में हुए विकास कार्यों का विवरण" />
      <section className="container py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => {
            const IconComp = { Construction, Droplets, GraduationCap, HeartPulse, Zap, Briefcase, MapPin, TreePine, Building2, Bus }[p.icon] || Construction;
            return (
              <div key={idx} className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all hover:-translate-y-1">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white mb-4 shadow-soft`}>
                  <IconComp className="h-7 w-7" />
                </div>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <span className="text-2xl font-bold text-primary">{p.count}</span>
              </div>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-hero py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-secondary mb-3">क्षेत्रवार कार्य</h2>
          <p className="text-muted-foreground mb-8">वैशाली नगर के सभी वार्डों में निरंतर विकास</p>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-4">
            {content.wardWork.map((w) => (
              <div 
                key={w.id} 
                className="bg-card rounded-xl p-4 shadow-card hover:shadow-glow cursor-pointer transition-all hover:scale-105"
                onClick={() => setSelectedWard(w)}
              >
                <MapPin className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-sm font-semibold">वार्ड {w.ward_num}</p>
                <p className="text-xs text-muted-foreground">{w.project_count} परियोजनाएं</p>
              </div>
            ))}
          </div>
        </div>

        {selectedWard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setSelectedWard(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">वार्ड संख्या {selectedWard.ward_num}</h3>
                  <p className="text-primary/70 font-semibold">{selectedWard.project_count} विकास परियोजनाएं</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">विकास कार्यों का विवरण</label>
                  <p className="text-slate-700 leading-relaxed">{selectedWard.details}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Development;
