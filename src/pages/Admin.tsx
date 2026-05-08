import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Settings as SettingsIcon, Video, Newspaper, 
  Construction, HandHeart, Image as ImageIcon, MessageSquare, 
  Users, Save, Upload, Plus, Trash2, LogOut, BookOpen, ArrowRight,
  ShieldCheck, Eye, EyeOff, Edit, History, Target, MapPin, GraduationCap, X,
  Droplets, HeartPulse, Zap, Briefcase, TreePine, Building2, Bus, Home, Tractor,
  Youtube, Twitter, Facebook, Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "https://mla-backend-q5jw.onrender.com/api";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { content, updateContent } = useData();
  const { language } = useLanguage();
  
  // States for forms
  const [heroForm, setHeroForm] = useState(content.hero);
  const [aboutForm, setAboutForm] = useState(content.about);
  const [aboutPageForm, setAboutPageForm] = useState(content.aboutPage);
  const [milestones, setMilestones] = useState(content.milestones);
  const [values, setValues] = useState(content.values);
  const [development, setDevelopment] = useState(content.development);
  const [ctaForm, setCtaForm] = useState(content.cta);
  const [settingsForm, setSettingsForm] = useState(content.settings);
  const [uploading, setUploading] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<any>(null);
  const [showAddDev, setShowAddDev] = useState(false);
  const [editingDev, setEditingDev] = useState<any>(null);
  const [showAddWard, setShowAddWard] = useState(false);
  const [editingWard, setEditingWard] = useState<any>(null);
  const [newMilestone, setNewMilestone] = useState({ year: '', title_hi: '', title_en: '', description_hi: '', description_en: '', image: '' });
  const [newDev, setNewDev] = useState({ icon: 'Construction', title_hi: '', title_en: '', count: '', desc_hi: '', desc_en: '', color: 'from-orange-500 to-amber-500' });
  const [newWard, setNewWard] = useState({ ward_num: 1, project_count: 0, details: '' });
  const [showAddScheme, setShowAddScheme] = useState(false);
  const [editingScheme, setEditingScheme] = useState<any>(null);
  const [newScheme, setNewScheme] = useState({ 
    icon: 'Users', 
    title_hi: '', 
    title_en: '', 
    desc_hi: '', 
    desc_en: '', 
    category_hi: '', 
    category_en: '', 
    color: 'from-orange-500 to-amber-500' 
  });
  const [showAddNews, setShowAddNews] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [newNews, setNewNews] = useState({ title_hi: '', title_en: '', date_hi: '', date_en: '', category_hi: '', category_en: '', description_hi: '', description_en: '', content_hi: '', content_en: '', image: '' });
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [newGallery, setNewGallery] = useState({ title: '', image: '', category: '' });
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [editingSocial, setEditingSocial] = useState<any>(null);
  const [newSocial, setNewSocial] = useState({ platform: 'youtube', title: '', url: '', embedCode: '' });

  // Sync with context
  useEffect(() => {
    setHeroForm(content.hero);
    setAboutForm(content.about);
    setAboutPageForm(content.aboutPage);
    setMilestones(content.milestones);
    setValues(content.values);
    setDevelopment(content.development);
    setCtaForm(content.cta);
    setSettingsForm(content.settings);
  }, [content.hero, content.settings, content.about, content.aboutPage, content.milestones, content.values, content.development, content.cta]);

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      toast.success("Welcome Admin");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  const handleFileUpload = async (file: File, type: 'video' | 'image') => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        if (type === 'video') {
          setHeroForm(prev => ({ ...prev, videoUrl: data.url }));
        } else {
          setHeroForm(prev => ({ ...prev, mlaImage: data.url }));
        }
        toast.success(`${type} uploaded successfully to R2`);
      }
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteHeroAsset = async (type: 'video' | 'image') => {
    const url = type === 'video' ? heroForm.videoUrl : heroForm.mlaImage;
    if (!url || url.startsWith('/')) {
       toast.info("Cannot delete local default asset");
       if (type === 'video') setHeroForm({...heroForm, videoUrl: ""});
       else setHeroForm({...heroForm, mlaImage: ""});
       return;
    }

    try {
      const res = await fetch(`${API_URL}/delete-file`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (res.ok) {
        if (type === 'video') setHeroForm(prev => ({ ...prev, videoUrl: "" }));
        else setHeroForm(prev => ({ ...prev, mlaImage: "" }));
        toast.success(`${type} deleted from R2`);
      }
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  const saveHeroChanges = async () => {
    try {
      const res = await fetch(`${API_URL}/hero`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...heroForm,
          video_url: heroForm.videoUrl,
          mla_image: heroForm.mlaImage,
          slogan1_hi: heroForm.slogan1_hi,
          slogan1_en: heroForm.slogan1_en,
          slogan2_hi: heroForm.slogan2_hi,
          slogan2_en: heroForm.slogan2_en,
          desc_hi: heroForm.desc_hi,
          desc_en: heroForm.desc_en
        }),
      });
      if (res.ok) {
        updateContent({ hero: heroForm });
        toast.success("Hero section updated successfully");
      }
    } catch (err) {
      toast.error("Failed to save changes");
    }
  };

  const saveSettings = async (newSettings: any) => {
    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        updateContent({ settings: newSettings });
        toast.success("Visibility settings updated");
      }
    } catch (err) {
      toast.error("Failed to update settings");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-none">
          <CardHeader className="text-center">
            <div className="h-16 w-16 bg-primary rounded-2xl mx-auto flex items-center justify-center text-white mb-4">
               <ShieldCheck className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl font-bold">MLA Portal Admin</CardTitle>
            <p className="text-muted-foreground">Authorized Access Only</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input 
                  value={loginData.username} 
                  onChange={e => setLoginData({...loginData, username: e.target.value})}
                  placeholder="admin" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input 
                  type="password"
                  value={loginData.password} 
                  onChange={e => setLoginData({...loginData, password: e.target.value})}
                  placeholder="••••••••" 
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-primary">Login to Dashboard</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 space-y-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="font-bold text-lg text-primary tracking-tight">Admin CMS</span>
        </div>

        <nav className="space-y-1 flex-1">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="settings" icon={SettingsIcon} label="Site Settings" />
          <SidebarItem id="hero" icon={Video} label="Hero Section" />
          <SidebarItem id="about-section" icon={Users} label="About Section (Home)" />
          <SidebarItem id="biography" icon={BookOpen} label="Biography Page" />
          <SidebarItem id="timeline" icon={History} label="Timeline & Journey" />
          <SidebarItem id="news" icon={Newspaper} label="News & Events" />
          <SidebarItem id="development" icon={Construction} label="Development Page" />
          <SidebarItem id="schemes" icon={HandHeart} label="Schemes" />
          <SidebarItem id="cta" icon={Target} label="CTA Banner" />
          <SidebarItem id="social-media" icon={MessageSquare} label="Social Media" />
          <SidebarItem id="gallery" icon={ImageIcon} label="Gallery" />
        </nav>

        <Button 
          variant="ghost" 
          onClick={() => setIsLoggedIn(false)}
          className="justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" /> Logout
        </Button>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-10">
           <h1 className="text-3xl font-bold text-slate-800 capitalize">{activeTab} Management</h1>
           <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-sm font-medium">
                 {new Date().toLocaleDateString()}
              </div>
           </div>
        </header>

        {activeTab === 'settings' && (
          <Card className="border-none shadow-soft max-w-2xl">
            <CardHeader>
              <CardTitle>Site Components Visibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'show_topbar', label: 'Top Bar (Contact Info)' },
                { key: 'show_navbar', label: 'Navigation Bar' },
                { key: 'show_hero', label: 'Hero Section (Main)' },
                { key: 'show_hero_slogan', label: '  ↳ Hero Slogan' },
                { key: 'show_hero_buttons', label: '  ↳ Hero CTA Buttons' },
                { key: 'show_hero_mla', label: '  ↳ MLA Profile Card' },
                { key: 'show_hero_services', label: '  ↳ Hero Bottom Services' },
                { key: 'show_news', label: 'News & Events' },
                { key: 'show_schemes', label: 'Government Schemes' },
                { key: 'show_gallery', label: 'Photo Gallery' },
                { key: 'show_about', label: 'About Section' },
                { key: 'show_timeline', label: 'Growth Timeline' },
                { key: 'show_social', label: 'Social Media Hub' },
                { key: 'show_cta', label: 'Call to Action Banner' },
                { key: 'show_footer', label: 'Footer Section' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    {(settingsForm as any)[item.key] ? <Eye className="h-5 w-5 text-green-500" /> : <EyeOff className="h-5 w-5 text-slate-400" />}
                    <span className={`font-bold ${item.label.startsWith(' ') ? 'ml-4 font-medium text-slate-600' : ''}`}>{item.label}</span>
                  </div>
                  <Switch 
                    checked={(settingsForm as any)[item.key]} 
                    onCheckedChange={(val) => {
                      const updated = { ...settingsForm, [item.key]: val };
                      setSettingsForm(updated);
                      saveSettings(updated);
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === 'hero' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle>Hero Text & Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Main Slogan (Hindi)</label>
                    <Input 
                      value={heroForm.slogan1_hi} 
                      onChange={e => setHeroForm({...heroForm, slogan1_hi: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Main Slogan (English)</label>
                    <Input 
                      value={heroForm.slogan1_en} 
                      onChange={e => setHeroForm({...heroForm, slogan1_en: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Secondary Slogan (Hindi)</label>
                    <Input 
                      value={heroForm.slogan2_hi} 
                      onChange={e => setHeroForm({...heroForm, slogan2_hi: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Secondary Slogan (English)</label>
                    <Input 
                      value={heroForm.slogan2_en} 
                      onChange={e => setHeroForm({...heroForm, slogan2_en: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Description (Hindi)</label>
                    <Textarea 
                      rows={3} 
                      value={heroForm.desc_hi} 
                      onChange={e => setHeroForm({...heroForm, desc_hi: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Description (English)</label>
                    <Textarea 
                      rows={3} 
                      value={heroForm.desc_en} 
                      onChange={e => setHeroForm({...heroForm, desc_en: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold flex items-center gap-2"><Video className="h-4 w-4" /> Hero Video</label>
                    {heroForm.videoUrl && (
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                         <div className="flex-1 text-xs truncate text-muted-foreground">{heroForm.videoUrl}</div>
                         <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteHeroAsset('video')}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    )}
                    <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-primary transition-colors">
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'video')}
                      />
                      <div className="text-center space-y-1">
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Click to upload new video</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold flex items-center gap-2"><ImageIcon className="h-4 w-4" /> MLA Image</label>
                    {heroForm.mlaImage && (
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                         <div className="flex-1 text-xs truncate text-muted-foreground">{heroForm.mlaImage}</div>
                         <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteHeroAsset('image')}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    )}
                    <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-primary transition-colors">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'image')}
                      />
                      <div className="text-center space-y-1">
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Click to upload new image</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={saveHeroChanges} 
                  className="w-full gap-2" 
                  disabled={uploading}
                >
                  <Save className="h-4 w-4" /> {uploading ? "Uploading..." : "Save All Changes"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-soft overflow-hidden h-fit sticky top-8">
               <CardHeader>
                 <CardTitle>Live Preview</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="aspect-video bg-black relative">
                    {heroForm.videoUrl && (
                      <video 
                        key={heroForm.videoUrl}
                        autoPlay loop muted 
                        className="w-full h-full object-cover opacity-50"
                      >
                        <source src={heroForm.videoUrl} type="video/mp4" />
                      </video>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                       <div className="text-white text-center">
                          <h2 className="text-2xl font-bold mb-2">{heroForm.slogan1_hi}</h2>
                          <h3 className="text-xl font-bold text-orange-400">{heroForm.slogan2_hi}</h3>
                       </div>
                    </div>
                    {heroForm.mlaImage && (
                      <img 
                        src={heroForm.mlaImage} 
                        className="absolute bottom-0 right-4 h-3/4 object-contain"
                      />
                    )}
                  </div>
               </CardContent>
            </Card>
          </div>
        )}

             {activeTab === 'about-section' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-none shadow-soft h-fit">
              <CardHeader>
                <CardTitle>Home Page "About" Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Title (Hindi)</label>
                    <Input value={aboutForm.title_hi} onChange={e => setAboutForm({...aboutForm, title_hi: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Title (English)</label>
                    <Input value={aboutForm.title_en} onChange={e => setAboutForm({...aboutForm, title_en: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Subtitle (Hindi)</label>
                    <Input value={aboutForm.subtitle_hi} onChange={e => setAboutForm({...aboutForm, subtitle_hi: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Subtitle (English)</label>
                    <Input value={aboutForm.subtitle_en} onChange={e => setAboutForm({...aboutForm, subtitle_en: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Main Description (Hindi)</label>
                    <Textarea rows={3} value={aboutForm.description_hi} onChange={e => setAboutForm({...aboutForm, description_hi: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Main Description (English)</label>
                    <Textarea rows={3} value={aboutForm.description_en} onChange={e => setAboutForm({...aboutForm, description_en: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <React.Fragment key={i}>
                      <div className="space-y-2">
                        <label className="text-sm font-bold italic text-primary">Key Point {i} (Hindi)</label>
                        <Input value={(aboutForm as any)[`point${i}_hi`]} onChange={e => setAboutForm({...aboutForm, [`point${i}_hi`]: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold italic text-primary">Key Point {i} (English)</label>
                        <Input value={(aboutForm as any)[`point${i}_en`]} onChange={e => setAboutForm({...aboutForm, [`point${i}_en`]: e.target.value})} />
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Birthplace (Hindi)</label>
                    <Input value={aboutForm.birthplace_hi} onChange={e => setAboutForm({...aboutForm, birthplace_hi: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Birthplace (English)</label>
                    <Input value={aboutForm.birthplace_en} onChange={e => setAboutForm({...aboutForm, birthplace_en: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Education (Hindi)</label>
                    <Input value={aboutForm.education_hi} onChange={e => setAboutForm({...aboutForm, education_hi: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Education (English)</label>
                    <Input value={aboutForm.education_en} onChange={e => setAboutForm({...aboutForm, education_en: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Experience (Hindi) - e.g. 15+</label>
                    <Input value={aboutForm.experience_hi} onChange={e => setAboutForm({...aboutForm, experience_hi: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Experience (English)</label>
                    <Input value={aboutForm.experience_en} onChange={e => setAboutForm({...aboutForm, experience_en: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Leader Profile Image</label>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <img src={aboutForm.image} className="h-16 w-16 rounded-xl object-cover shadow-md" />
                    <Input type="file" className="flex-1" onChange={async e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const formData = new FormData();
                        formData.append("file", file);
                        setUploading(true);
                        const res = await fetch(`${API_URL}/upload`, { method: "POST", body: formData });
                        const data = await res.json();
                        if (data.url) setAboutForm({...aboutForm, image: data.url});
                        setUploading(false);
                      }
                    }} />
                  </div>
                </div>

                <Button 
                  onClick={async () => {
                    try {
                      const res = await fetch(`${API_URL}/about`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          ...aboutForm,
                          title_hi: aboutForm.title_hi,
                          title_en: aboutForm.title_en,
                          subtitle_hi: aboutForm.subtitle_hi,
                          subtitle_en: aboutForm.subtitle_en,
                          description_hi: aboutForm.description_hi,
                          description_en: aboutForm.description_en,
                          point1_hi: (aboutForm as any).point1_hi,
                          point1_en: (aboutForm as any).point1_en,
                          point2_hi: (aboutForm as any).point2_hi,
                          point2_en: (aboutForm as any).point2_en,
                          point3_hi: (aboutForm as any).point3_hi,
                          point3_en: (aboutForm as any).point3_en,
                          birthplace_hi: aboutForm.birthplace_hi,
                          birthplace_en: aboutForm.birthplace_en,
                          education_hi: aboutForm.education_hi,
                          education_en: aboutForm.education_en,
                          experience_hi: aboutForm.experience_hi,
                          experience_en: aboutForm.experience_en
                        }),
                      });
                      if (res.ok) {
                        updateContent({ about: aboutForm });
                        toast.success("Home about section updated");
                      }
                    } catch (err) { toast.error("Save failed"); }
                  }} 
                  className="w-full gap-2 h-12" 
                  disabled={uploading}
                >
                  <Save className="h-5 w-5" /> {uploading ? "Uploading..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-soft overflow-hidden h-fit sticky top-8">
               <CardHeader className="bg-slate-50">
                 <CardTitle className="text-slate-600 text-sm uppercase tracking-wider">Visual Preview (Home Page)</CardTitle>
               </CardHeader>
               <CardContent className="p-0 bg-white">
                  <div className="flex flex-col">
                    <div className="p-8 flex gap-8 items-start">
                      <div className="w-2/5 relative group">
                        <img src={aboutForm.image} className="rounded-3xl shadow-2xl w-full aspect-[4/5] object-cover ring-8 ring-slate-50 transition-transform duration-500 group-hover:scale-[1.02]" />
                        <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-orange-500 to-orange-700 text-white p-5 rounded-2xl text-center shadow-xl transform group-hover:scale-105 transition-transform border-4 border-white">
                           <div className="text-3xl font-black">{aboutForm.experience_hi}</div>
                           <div className="text-[10px] uppercase tracking-tighter font-bold opacity-80 leading-none">Years of Service</div>
                        </div>
                      </div>
                      <div className="w-3/5 space-y-5 pt-4">
                         <div className="space-y-1">
                           <div className="flex items-center gap-2 text-orange-600 font-bold text-[10px] uppercase tracking-widest">
                             <div className="h-px w-4 bg-orange-600" /> Leader Introduction
                           </div>
                           <h2 className="text-3xl font-serif text-primary leading-tight font-black italic">
                             {aboutForm.title_hi} <br />
                             <span className="text-orange-600">{aboutForm.subtitle_hi}</span>
                           </h2>
                         </div>
                         <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-4 italic">{aboutForm.description_hi}</p>
                         
                         <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {[aboutForm.point1_hi, aboutForm.point2_hi, aboutForm.point3_hi, aboutForm.point4_hi].map((p, i) => (
                              <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
                                 <div className="h-4 w-4 rounded-full bg-orange-50 flex items-center justify-center">
                                   <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                 </div> 
                                 {p}
                              </div>
                            ))}
                         </div>

                         <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                               <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                  <MapPin className="h-4 w-4 text-orange-600" />
                               </div>
                               <div>
                                 <p className="text-[7px] uppercase tracking-wider text-muted-foreground font-bold">Birthplace</p>
                                 <p className="text-[9px] font-bold text-primary">{aboutForm.birthplace_hi}</p>
                               </div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                               <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                  <GraduationCap className="h-4 w-4 text-orange-600" />
                               </div>
                               <div>
                                 <p className="text-[7px] uppercase tracking-wider text-muted-foreground font-bold">Education</p>
                                 <p className="text-[9px] font-bold text-primary">{aboutForm.education_hi}</p>
                               </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
               </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'biography' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Card className="border-none shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100">
                  <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Biography Header</CardTitle>
                  <Button size="sm" onClick={async () => {
                    try {
                      await fetch(`${API_URL}/about-page`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          ...aboutPageForm,
                          page_title_hi: aboutPageForm.page_title_hi,
                          page_title_en: aboutPageForm.page_title_en,
                          page_subtitle_hi: aboutPageForm.page_subtitle_hi,
                          page_subtitle_en: aboutPageForm.page_subtitle_en,
                          intro_text_1_hi: aboutPageForm.intro_text_1_hi,
                          intro_text_1_en: aboutPageForm.intro_text_1_en,
                          intro_text_2_hi: aboutPageForm.intro_text_2_hi,
                          intro_text_2_en: aboutPageForm.intro_text_2_en,
                          birthplace_hi: aboutPageForm.birthplace_hi,
                          birthplace_en: aboutPageForm.birthplace_en,
                          education_hi: aboutPageForm.education_hi,
                          education_en: aboutPageForm.education_en,
                          party_hi: aboutPageForm.party_hi,
                          party_en: aboutPageForm.party_en,
                          current_pos_hi: aboutPageForm.current_pos_hi,
                          current_pos_en: aboutPageForm.current_pos_en
                        }),
                      });
                      updateContent({ aboutPage: aboutPageForm });
                      toast.success("Biography updated");
                    } catch (err) { toast.error("Save failed"); }
                  }}><Save className="h-4 w-4 mr-2" /> Save Settings</Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Main Title (Hindi)</label>
                      <Input className="font-bold text-primary" value={aboutPageForm.page_title_hi} onChange={e => setAboutPageForm({...aboutPageForm, page_title_hi: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Main Title (English)</label>
                      <Input className="font-bold text-primary" value={aboutPageForm.page_title_en} onChange={e => setAboutPageForm({...aboutPageForm, page_title_en: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Subtitle (Hindi)</label>
                      <Input className="font-bold text-orange-600" value={aboutPageForm.page_subtitle_hi} onChange={e => setAboutPageForm({...aboutPageForm, page_subtitle_hi: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Subtitle (English)</label>
                      <Input className="font-bold text-orange-600" value={aboutPageForm.page_subtitle_en} onChange={e => setAboutPageForm({...aboutPageForm, page_subtitle_en: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Intro Text 1 (Hindi)</label>
                      <Textarea rows={3} value={aboutPageForm.intro_text_1_hi} onChange={e => setAboutPageForm({...aboutPageForm, intro_text_1_hi: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Intro Text 1 (English)</label>
                      <Textarea rows={3} value={aboutPageForm.intro_text_1_en} onChange={e => setAboutPageForm({...aboutPageForm, intro_text_1_en: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Intro Text 2 (Hindi)</label>
                      <Textarea rows={3} value={aboutPageForm.intro_text_2_hi} onChange={e => setAboutPageForm({...aboutPageForm, intro_text_2_hi: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Intro Text 2 (English)</label>
                      <Textarea rows={3} value={aboutPageForm.intro_text_2_en} onChange={e => setAboutPageForm({...aboutPageForm, intro_text_2_en: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500">Birthplace (Hindi)</label>
                      <Input className="h-9 text-xs" value={aboutPageForm.birthplace_hi} onChange={e => setAboutPageForm({...aboutPageForm, birthplace_hi: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500">Birthplace (English)</label>
                      <Input className="h-9 text-xs" value={aboutPageForm.birthplace_en} onChange={e => setAboutPageForm({...aboutPageForm, birthplace_en: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500">Education (Hindi)</label>
                      <Input className="h-9 text-xs" value={aboutPageForm.education_hi} onChange={e => setAboutPageForm({...aboutPageForm, education_hi: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500">Education (English)</label>
                      <Input className="h-9 text-xs" value={aboutPageForm.education_en} onChange={e => setAboutPageForm({...aboutPageForm, education_en: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500">Party (Hindi)</label>
                      <Input className="h-9 text-xs" value={aboutPageForm.party_hi} onChange={e => setAboutPageForm({...aboutPageForm, party_hi: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500">Party (English)</label>
                      <Input className="h-9 text-xs" value={aboutPageForm.party_en} onChange={e => setAboutPageForm({...aboutPageForm, party_en: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500">Position (Hindi)</label>
                      <Input className="h-9 text-xs" value={aboutPageForm.current_pos_hi} onChange={e => setAboutPageForm({...aboutPageForm, current_pos_hi: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500">Position (English)</label>
                      <Input className="h-9 text-xs" value={aboutPageForm.current_pos_en} onChange={e => setAboutPageForm({...aboutPageForm, current_pos_en: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Main Bio Image</label>
                    <div className="flex gap-4">
                      <img src={aboutPageForm.main_image} className="h-20 w-16 rounded-lg object-cover shadow-sm border border-slate-200" />
                      <Input type="file" className="flex-1" onChange={async e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append("file", file);
                          setUploading(true);
                          const res = await fetch(`${API_URL}/upload`, { method: "POST", body: formData });
                          const data = await res.json();
                          if (data.url) setAboutPageForm({...aboutPageForm, main_image: data.url});
                          setUploading(false);
                        }
                      }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Core Values Management */}
              <Card className="border-none shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100">
                  <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Core Pillars & Values</CardTitle>
                  <Button size="sm" onClick={async () => {
                    try {
                      await fetch(`${API_URL}/values`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(values),
                      });
                      toast.success("Values saved");
                    } catch (err) { toast.error("Save failed"); }
                  }}><Save className="h-4 w-4 mr-2" /> Save Values</Button>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {values.map((v, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 group hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary">
                             <Input className="h-8 w-16 text-[10px] p-1 text-center" value={v.icon} onChange={e => {
                               const nv = [...values]; nv[i].icon = e.target.value; setValues(nv);
                             }} />
                           </div>
                           <Input className="font-bold text-xs" placeholder="Title (Hindi)" value={v.title_hi} onChange={e => {
                             const nv = [...values]; nv[i].title_hi = e.target.value; setValues(nv);
                           }} />
                           <Input className="font-bold text-xs" placeholder="Title (English)" value={v.title_en} onChange={e => {
                             const nv = [...values]; nv[i].title_en = e.target.value; setValues(nv);
                           }} />
                        </div>
                        <Textarea className="text-[10px] min-h-[40px]" placeholder="Text (Hindi)" value={v.text_hi} onChange={e => {
                          const nv = [...values]; nv[i].text_hi = e.target.value; setValues(nv);
                        }} />
                        <Textarea className="text-[10px] min-h-[40px]" placeholder="Text (English)" value={v.text_en} onChange={e => {
                          const nv = [...values]; nv[i].text_en = e.target.value; setValues(nv);
                        }} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              {/* Biography Page Preview Mockup */}
              <Card className="border-none shadow-soft overflow-hidden h-fit sticky top-8 bg-white">
                 <CardHeader className="bg-slate-900 text-white">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Live Biography Preview</span>
                       <Badge className="bg-orange-600 text-[8px]">Active Page</Badge>
                    </div>
                 </CardHeader>
                 <CardContent className="p-0">
                    <div className="bg-slate-50 p-6 border-b border-slate-200">
                       <div className="h-20 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center p-4">
                          <div className="text-center">
                             <h4 className="text-white font-serif italic text-lg font-black leading-none">{aboutPageForm.page_title_hi}</h4>
                             <p className="text-orange-400 text-[8px] font-bold uppercase tracking-widest mt-1">{aboutPageForm.page_subtitle_hi}</p>
                          </div>
                       </div>
                    </div>
                    <div className="p-6 space-y-6">
                       <div className="flex gap-4">
                          <img src={aboutPageForm.main_image} className="w-20 h-28 rounded-xl object-cover shadow-lg border-2 border-white ring-4 ring-slate-50" />
                          <div className="space-y-2 flex-1">
                             <div className="h-1 w-8 bg-orange-600 rounded-full" />
                             <p className="text-[9px] font-bold text-primary leading-tight line-clamp-3">{aboutPageForm.intro_text1_hi}</p>
                             <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="bg-slate-100 p-2 rounded-lg text-[8px] font-bold">
                                   <p className="text-slate-400 uppercase text-[6px]">Education</p>
                                   <p className="truncate">{aboutPageForm.education_hi}</p>
                                </div>
                                <div className="bg-slate-100 p-2 rounded-lg text-[8px] font-bold">
                                   <p className="text-slate-400 uppercase text-[6px]">Party</p>
                                   <p className="truncate">{aboutPageForm.party_hi}</p>
                                </div>
                             </div>
                          </div>
                       </div>
                       
                       <div className="space-y-3 pt-4 border-t border-slate-100">
                          <p className="text-[9px] font-black uppercase text-primary tracking-widest flex justify-between">
                             <span>Journey Preview</span>
                             <span className="text-orange-600 text-[8px]">{milestones.length} Events</span>
                          </p>
                          <div className="max-h-[150px] overflow-y-auto pr-2 space-y-3 scrollbar-hide">
                             {milestones.map((m, i) => (
                                <div key={i} className="flex gap-3 group/item">
                                   <div className="flex flex-col items-center">
                                      <div className="h-2 w-2 rounded-full bg-orange-600" />
                                      <div className="w-px flex-1 bg-slate-200" />
                                   </div>
                                   <div className="pb-2">
                                      <p className="text-[8px] font-black text-orange-600 leading-none mb-1">{m.year}</p>
                                      <p className="text-[9px] font-bold text-primary leading-tight line-clamp-1">{m.title_hi}</p>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Milestone Modal */}
        {showAddMilestone && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl border-none animate-in fade-in zoom-in duration-300">
              <CardHeader className="bg-primary text-white rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">{editingMilestone ? "Edit Political Milestone" : "Add Political Milestone"}</CardTitle>
                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => { setShowAddMilestone(false); setEditingMilestone(null); }}><X className="h-5 w-5" /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2 col-span-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider italic">Year</label>
                    <Input className="font-black text-orange-600 h-11" placeholder="2024" value={newMilestone.year} onChange={e => setNewMilestone({...newMilestone, year: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider italic">Title (Hindi)</label>
                    <Input className="font-bold h-11" placeholder="Hindi Title" value={newMilestone.title_hi} onChange={e => setNewMilestone({...newMilestone, title_hi: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider italic">Title (English)</label>
                  <Input className="font-bold h-11" placeholder="English Title" value={newMilestone.title_en} onChange={e => setNewMilestone({...newMilestone, title_en: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider italic">Description (Hindi)</label>
                    <Textarea rows={2} value={newMilestone.description_hi} onChange={e => setNewMilestone({...newMilestone, description_hi: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider italic">Description (English)</label>
                    <Textarea rows={2} value={newMilestone.description_en} onChange={e => setNewMilestone({...newMilestone, description_en: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider italic">Milestone Image</label>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="h-16 w-16 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                      {newMilestone.image ? <img src={newMilestone.image} className="h-full w-full object-cover" /> : <ImageIcon className="h-6 w-6 text-slate-300" />}
                    </div>
                    <Input type="file" className="flex-1" onChange={async e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const formData = new FormData();
                        formData.append("file", file);
                        setUploading(true);
                        const res = await fetch(`${API_URL}/upload`, { method: "POST", body: formData });
                        const data = await res.json();
                        if (data.url) setNewMilestone({...newMilestone, image: data.url});
                        setUploading(false);
                      }
                    }} />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 h-12" onClick={() => { setShowAddMilestone(false); setEditingMilestone(null); }}>Cancel</Button>
                  <Button className="flex-1 h-12 bg-primary shadow-lg shadow-primary/20" disabled={uploading} onClick={async () => {
                    if (!newMilestone.year || !newMilestone.title_hi) return toast.error("Year and Hindi Title are required");
                    try {
                      const method = editingMilestone ? 'PUT' : 'POST';
                      const url = editingMilestone ? `${API_URL}/milestones/${editingMilestone.id}` : `${API_URL}/milestones`;
                      const res = await fetch(url, {
                        method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          ...newMilestone,
                          title_hi: newMilestone.title_hi,
                          title_en: newMilestone.title_en,
                          description_hi: newMilestone.description_hi,
                          description_en: newMilestone.description_en
                        }),
                      });
                      const data = await res.json();
                      if (data.id) {
                        if (editingMilestone) {
                          updateContent({ milestones: milestones.map(x => x.id === data.id ? data : x) });
                          toast.success("Milestone updated");
                        } else {
                          updateContent({ milestones: [data, ...milestones] });
                          toast.success("Milestone added to timeline");
                        }
                        setNewMilestone({ year: '', title_hi: '', title_en: '', description_hi: '', description_en: '', image: '' });
                        setShowAddMilestone(false);
                        setEditingMilestone(null);
                      }
                    } catch (err) { toast.error("Failed to save milestone"); }
                  }}>{uploading ? "Uploading..." : (editingMilestone ? "Update Milestone" : "Add to Timeline")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'development' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
              <div>
                <h2 className="text-2xl font-black text-primary tracking-tight">Development Projects</h2>
                <p className="text-muted-foreground text-sm">Manage work categories and impact counts on the Development page.</p>
              </div>
              <Button onClick={() => setShowAddDev(true)} className="gap-2 shadow-lg shadow-primary/20">
                <Plus className="h-4 w-4" /> Add Project Category
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {development.map((p) => (
                <Card key={p.id} className="border-none shadow-soft overflow-hidden group hover:ring-2 hover:ring-primary/20 transition-all">
                  <div className="flex items-center gap-6 p-5">
                    <div className={`h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg`}>
                       {React.createElement({ Construction, Droplets, GraduationCap, HeartPulse, Zap, Briefcase, MapPin, TreePine, Building2, Bus }[p.icon] || Construction, { className: "h-8 w-8" })}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-primary">{p.title_hi} / {p.title_en}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{p.desc_hi}</p>
                      <div className="mt-2 font-black text-orange-600 text-sm">{p.count} Impacted</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="text-primary border-primary/20" onClick={() => {
                        setEditingDev(p);
                        setNewDev({ icon: p.icon, title_hi: p.title_hi, title_en: p.title_en, count: p.count, desc_hi: p.desc_hi, desc_en: p.desc_en, color: p.color });
                        setShowAddDev(true);
                      }}><Edit className="h-4 w-4" /></Button>
                      <Button variant="outline" size="icon" className="text-red-500 border-red-100" onClick={async () => {
                        if (confirm("Delete this category?")) {
                          await fetch(`${API_URL}/development/${p.id}`, { method: "DELETE" });
                          updateContent({ development: development.filter(x => x.id !== p.id) });
                          toast.success("Deleted");
                        }
                      }}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">Ward-wise Project Counts</h3>
                  <p className="text-sm text-muted-foreground">Update the number of projects per ward displayed at the bottom of Development page.</p>
                </div>
                <Button className="ml-auto bg-primary hover:bg-primary/90" onClick={() => {
                  setEditingWard(null);
                  setNewWard({ ward_num: content.wardWork.length + 1, project_count: 0, details: '' });
                  setShowAddWard(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" /> Add Ward
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {content.wardWork.map((w) => (
                  <div key={w.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2 relative group">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button 
                        onClick={() => {
                          setEditingWard(w);
                          setNewWard({ ward_num: w.ward_num, project_count: w.project_count, details: w.details });
                          setShowAddWard(true);
                        }}
                        className="p-1 hover:bg-primary/10 rounded text-primary"
                      ><Edit className="h-3 w-3" /></button>
                      <button 
                        onClick={async () => {
                          if (confirm(`Delete Ward ${w.ward_num}?`)) {
                            await fetch(`${API_URL}/ward-work/${w.id}`, { method: "DELETE" });
                            updateContent({ wardWork: content.wardWork.filter(x => x.id !== w.id) });
                            toast.success("Ward deleted");
                          }
                        }}
                        className="p-1 hover:bg-red-100 rounded text-red-500"
                      ><Trash2 className="h-3 w-3" /></button>
                    </div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Ward {w.ward_num}</label>
                    <div className="text-lg font-bold text-primary">{w.project_count} Projects</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schemes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
              <div>
                <h2 className="text-2xl font-bold text-primary">Schemes Management</h2>
                <p className="text-sm text-muted-foreground">Manage government schemes and welfare programs.</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => {
                setEditingScheme(null);
                setNewScheme({ icon: 'Users', title_hi: '', title_en: '', desc_hi: '', desc_en: '', category_hi: '', category_en: '', color: 'from-orange-500 to-amber-500' });
                setShowAddScheme(true);
              }}>
                <Plus className="h-4 w-4 mr-2" /> Add New Scheme
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.schemes.map((s) => (
                <Card key={s.id} className="overflow-hidden border-none shadow-soft hover:shadow-glow transition-all group">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {(() => {
                          const IconMap: any = { Users, HandHeart, GraduationCap, Briefcase, HeartPulse, Home, Zap, Construction };
                          const IconComp = IconMap[s.icon] || Users;
                          return <IconComp className="h-6 w-6" />;
                        })()}
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-500 font-medium">{s.category_hi} / {s.category_en}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{s.title_hi} / {s.title_en}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{s.desc_hi}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                        setEditingScheme(s);
                        setNewScheme({ 
                          icon: s.icon, 
                          title_hi: s.title_hi, 
                          title_en: s.title_en, 
                          desc_hi: s.desc_hi, 
                          desc_en: s.desc_en, 
                          category_hi: s.category_hi, 
                          category_en: s.category_en, 
                          color: s.color 
                        });
                        setShowAddScheme(true);
                      }}><Edit className="h-4 w-4 mr-2" /> Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600" onClick={async () => {
                        if (confirm("Delete this scheme?")) {
                          await fetch(`${API_URL}/schemes/${s.id}`, { method: "DELETE" });
                          updateContent({ schemes: content.schemes.filter(x => x.id !== s.id) });
                          toast.success("Scheme deleted");
                        }
                      }}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
              <div>
                <h2 className="text-2xl font-black text-primary tracking-tight">Timeline & Journey</h2>
                <p className="text-muted-foreground text-sm">Manage the milestones displayed on both Home and Biography pages.</p>
              </div>
              <Button onClick={() => { setEditingMilestone(null); setNewMilestone({ year: '', title_hi: '', title_en: '', description_hi: '', description_en: '', image: '' }); setShowAddMilestone(true); }} className="gap-2 shadow-lg shadow-primary/20">
                <Plus className="h-4 w-4" /> Add Milestone
              </Button>
            </div>
            <div className="grid gap-4">
              {milestones.length === 0 ? (
                <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-slate-200">
                  <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <History className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-400">No Milestones Yet</h3>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">Click "Add Milestone" to start building your journey.</p>
                </div>
              ) : (
                milestones.map((m) => (
                  <Card key={m.id} className="border-none shadow-soft overflow-hidden group hover:ring-2 hover:ring-primary/20 transition-all">
                    <div className="flex items-center gap-6 p-5">
                      <div className="h-24 w-32 shrink-0 rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                        {m.image ? <img src={m.image} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-slate-300"><ImageIcon className="h-8 w-8" /></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-orange-600 text-white font-black">{m.year}</Badge>
                        </div>
                        <h4 className="font-bold text-lg text-primary">{m.title_hi} / {m.title_en}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{m.description_hi} / {m.description_en}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => {
                          setEditingMilestone(m);
                          setNewMilestone({
                            year: m.year,
                            title_hi: m.title_hi,
                            title_en: m.title_en,
                            description_hi: m.description_hi,
                            description_en: m.description_en,
                            image: m.image || ''
                          });
                          setShowAddMilestone(true);
                        }}><Edit className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" className="text-red-500 border-red-100" onClick={async () => {
                          if (confirm("Delete milestone?")) {
                            await fetch(`${API_URL}/milestones/${m.id}`, { method: "DELETE" });
                            updateContent({ milestones: milestones.filter(x => x.id !== m.id) });
                            toast.success("Deleted");
                          }
                        }}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-bold">News & Events</h3>
               <Button onClick={() => { setEditingNews(null); setNewNews({ title_hi: '', title_en: '', date_hi: '', date_en: '', category_hi: '', category_en: '', description_hi: '', description_en: '', content_hi: '', content_en: '', image: '' }); setShowAddNews(true); }} className="gap-2 bg-gradient-orange text-white border-none">
                 <Plus className="h-4 w-4" /> Add News Item
               </Button>
            </div>
            <div className="grid gap-4">
               {content.news.map((item: any) => (
                 <Card key={item.id} className="border-none shadow-soft overflow-hidden hover:shadow-glow transition-all">
                   <div className="flex flex-col md:flex-row items-center gap-6 p-4">
                      <div className="relative group">
                        <img src={item.image} className="h-32 w-48 object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                          <Button variant="secondary" size="sm" onClick={() => {
                            setEditingNews(item);
                            setNewNews({
                              title_hi: item.title_hi, title_en: item.title_en,
                              date_hi: item.date_hi, date_en: item.date_en,
                              category_hi: item.category_hi, category_en: item.category_en,
                              description_hi: item.description_hi, description_en: item.description_en,
                              content_hi: item.content_hi, content_en: item.content_en,
                              image: item.image
                            });
                            setShowAddNews(true);
                          }}>Edit Image</Button>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-1">
                           <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10">{item.category}</Badge>
                           <span className="text-xs text-muted-foreground">{item.date}</span>
                         </div>
                         <h4 className="font-bold text-lg truncate">{item.title_hi}</h4>
                         <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description_hi}</p>
                      </div>
                      <div className="flex gap-2">
                         <Button variant="outline" size="icon" onClick={() => {
                           setEditingNews(item);
                           setNewNews({
                             title: item.title,
                             date: item.date,
                             category: item.category,
                             description: item.description,
                             content: item.content,
                             image: item.img
                           });
                           setShowAddNews(true);
                         }} className="hover:bg-primary/10 hover:text-primary transition-colors">
                           <Edit className="h-4 w-4" />
                         </Button>
                         <Button variant="outline" size="icon" onClick={async () => {
                           if(window.confirm('Are you sure you want to delete this news item?')) {
                             try {
                               const res = await fetch(`${API_URL}/news/${item.id}`, { method: 'DELETE' });
                               if(res.ok) {
                                 toast.success("News deleted successfully");
                                 window.location.reload();
                               }
                             } catch (err) {
                               toast.error("Failed to delete news");
                             }
                           }
                         }} className="text-red-500 hover:bg-red-50 transition-colors">
                           <Trash2 className="h-4 w-4" />
                         </Button>
                      </div>
                   </div>
                 </Card>
               ))}
            </div>

            {/* News Modal */}
            {showAddNews && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-background rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative animate-in fade-in zoom-in duration-300">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4 rounded-full" 
                    onClick={() => { setShowAddNews(false); setEditingNews(null); }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold bg-gradient-orange bg-clip-text text-transparent">
                      {editingNews ? 'Edit News Item' : 'Add New News Item'}
                    </h3>
                    <p className="text-muted-foreground">Fill in the details to update your news feed.</p>
                  </div>

                  <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Title (Hindi)</label>
                        <Input 
                          value={newNews.title_hi} 
                          onChange={e => setNewNews({...newNews, title_hi: e.target.value})}
                          placeholder="Hindi Title"
                          className="rounded-xl border-muted-foreground/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Title (English)</label>
                        <Input 
                          value={newNews.title_en} 
                          onChange={e => setNewNews({...newNews, title_en: e.target.value})}
                          placeholder="English Title"
                          className="rounded-xl border-muted-foreground/20"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Date (Hindi)</label>
                        <Input 
                          value={newNews.date_hi} 
                          onChange={e => setNewNews({...newNews, date_hi: e.target.value})}
                          placeholder="e.g. 15 मई, 2024"
                          className="rounded-xl border-muted-foreground/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Date (English)</label>
                        <Input 
                          value={newNews.date_en} 
                          onChange={e => setNewNews({...newNews, date_en: e.target.value})}
                          placeholder="e.g. May 15, 2024"
                          className="rounded-xl border-muted-foreground/20"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Category (Hindi)</label>
                        <Input 
                          value={newNews.category_hi} 
                          onChange={e => setNewNews({...newNews, category_hi: e.target.value})}
                          placeholder="e.g. शिक्षा..."
                          className="rounded-xl border-muted-foreground/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Category (English)</label>
                        <Input 
                          value={newNews.category_en} 
                          onChange={e => setNewNews({...newNews, category_en: e.target.value})}
                          placeholder="e.g. Education..."
                          className="rounded-xl border-muted-foreground/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold ml-1">Image URL</label>
                      <div className="flex gap-2">
                        <Input 
                          value={newNews.image} 
                          onChange={e => setNewNews({...newNews, image: e.target.value})}
                          placeholder="https://..."
                          className="rounded-xl border-muted-foreground/20"
                        />
                        <Button variant="secondary" className="rounded-xl" onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = async (e: any) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            setUploading(true);
                            const formData = new FormData();
                            formData.append('file', file);
                            try {
                              const res = await fetch(`${API_URL}/upload`, {
                                method: 'POST',
                                body: formData
                              });
                              const data = await res.json();
                              if (data.url) {
                                setNewNews({...newNews, image: data.url});
                                toast.success("Image uploaded!");
                              }
                            } catch (err) {
                              toast.error("Upload failed");
                            } finally {
                              setUploading(false);
                            }
                          };
                          input.click();
                        }}>
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Short Description (Hindi)</label>
                        <Textarea 
                          value={newNews.description_hi} 
                          onChange={e => setNewNews({...newNews, description_hi: e.target.value})}
                          placeholder="Hindi description..."
                          className="rounded-xl border-muted-foreground/20 min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Short Description (English)</label>
                        <Textarea 
                          value={newNews.description_en} 
                          onChange={e => setNewNews({...newNews, description_en: e.target.value})}
                          placeholder="English description..."
                          className="rounded-xl border-muted-foreground/20 min-h-[80px]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Full Content (Hindi)</label>
                        <Textarea 
                          value={newNews.content_hi} 
                          onChange={e => setNewNews({...newNews, content_hi: e.target.value})}
                          placeholder="Hindi content..."
                          className="rounded-xl border-muted-foreground/20 min-h-[150px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Full Content (English)</label>
                        <Textarea 
                          value={newNews.content_en} 
                          onChange={e => setNewNews({...newNews, content_en: e.target.value})}
                          placeholder="English content..."
                          className="rounded-xl border-muted-foreground/20 min-h-[150px]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                      <Button variant="ghost" className="rounded-xl" onClick={() => { setShowAddNews(false); setEditingNews(null); }}>
                        Cancel
                      </Button>
                      <Button 
                        disabled={uploading}
                        onClick={async () => {
                          const payload = {
                             title_hi: newNews.title_hi,
                             title_en: newNews.title_en,
                             date_hi: newNews.date_hi,
                             date_en: newNews.date_en,
                             category_hi: newNews.category_hi,
                             category_en: newNews.category_en,
                             description_hi: newNews.description_hi,
                             description_en: newNews.description_en,
                             content_hi: newNews.content_hi,
                             content_en: newNews.content_en,
                             image: newNews.image
                           };
                          
                          try {
                            const method = editingNews ? 'PUT' : 'POST';
                            const url = editingNews ? `${API_URL}/news/${editingNews.id}` : `${API_URL}/news`;
                            const res = await fetch(url, {
                              method,
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(payload)
                            });
                            
                            if (res.ok) {
                              toast.success(`News ${editingNews ? 'updated' : 'added'} successfully!`);
                              setShowAddNews(false);
                              setEditingNews(null);
                              window.location.reload();
                            }
                          } catch (err) {
                            toast.error("Failed to save news");
                          }
                        }}
                        className="rounded-xl bg-gradient-orange text-white border-none px-8"
                      >
                        {uploading ? "Uploading..." : (editingNews ? 'Update News' : 'Add News')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Development Modal */}
        {showAddDev && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl border-none">
              <CardHeader className="bg-primary text-white rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Add Project Category</CardTitle>
                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => setShowAddDev(false)}><X className="h-5 w-5" /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase">Title (Hindi)</label>
                     <Input placeholder="e.g. सड़क निर्माण" value={newDev.title_hi} onChange={e => setNewDev({...newDev, title_hi: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase">Title (English)</label>
                     <Input placeholder="e.g. Road Construction" value={newDev.title_en} onChange={e => setNewDev({...newDev, title_en: e.target.value})} />
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase">Description (Hindi)</label>
                     <Textarea rows={2} value={newDev.desc_hi} onChange={e => setNewDev({...newDev, desc_hi: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase">Description (English)</label>
                     <Textarea rows={2} value={newDev.desc_en} onChange={e => setNewDev({...newDev, desc_en: e.target.value})} />
                   </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Impact Count</label>
                    <Input placeholder="e.g. 125+" value={newDev.count} onChange={e => setNewDev({...newDev, count: e.target.value})} />
                 </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Icon Type</label>
                    <select 
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newDev.icon}
                      onChange={e => setNewDev({...newDev, icon: e.target.value})}
                    >
                      {['Construction', 'Droplets', 'GraduationCap', 'HeartPulse', 'Zap', 'Briefcase', 'MapPin', 'TreePine', 'Building2', 'Bus'].map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Color Theme</label>
                    <select 
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newDev.color}
                      onChange={e => setNewDev({...newDev, color: e.target.value})}
                    >
                      <option value="from-orange-500 to-amber-500">Orange</option>
                      <option value="from-blue-500 to-cyan-500">Blue</option>
                      <option value="from-emerald-500 to-teal-500">Green</option>
                      <option value="from-rose-500 to-pink-500">Pink</option>
                      <option value="from-violet-500 to-purple-500">Purple</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => { setShowAddDev(false); setEditingDev(null); }}>Cancel</Button>
                  <Button className="flex-1" onClick={async () => {
                    try {
                      const method = editingDev ? "PUT" : "POST";
                      const url = editingDev ? `${API_URL}/development/${editingDev.id}` : `${API_URL}/development`;
                      
                      const res = await fetch(url, {
                        method: method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newDev),
                      });
                      const data = await res.json();
                      
                      if (editingDev) {
                        updateContent({ 
                          development: development.map(x => x.id === editingDev.id ? { ...x, ...newDev } : x) 
                        });
                        toast.success("Updated successfully");
                      } else {
                        updateContent({ development: [...development, data] });
                        toast.success("Added successfully");
                      }
                      setShowAddDev(false);
                      setEditingDev(null);
                      setNewDev({ icon: 'Construction', title_hi: '', title_en: '', count: '', desc_hi: '', desc_en: '', color: 'from-orange-500 to-amber-500' });
                    } catch (err) { toast.error("Failed to save"); }
                  }}>{editingDev ? "Update Category" : "Add Category"}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {['dashboard'].includes(activeTab) && (
          <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-medium">Management for {activeTab} is being initialized...</p>
          </div>
        )}

        {showAddWard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{editingWard ? "Edit Ward" : "Add New Ward"}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowAddWard(false)}><X className="h-4 w-4" /></Button>
                </div>
                <CardDescription>Manage ward project counts and details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ward Number</label>
                    <Input 
                      type="number" 
                      value={newWard.ward_num} 
                      onChange={(e) => setNewWard({ ...newWard, ward_num: parseInt(e.target.value) || 0 })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Count</label>
                    <Input 
                      type="number" 
                      value={newWard.project_count} 
                      onChange={(e) => setNewWard({ ...newWard, project_count: parseInt(e.target.value) || 0 })} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Details (Popup Content)</label>
                  <textarea 
                    className="w-full h-32 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    placeholder="Enter development work details for this ward..."
                    value={newWard.details}
                    onChange={(e) => setNewWard({ ...newWard, details: e.target.value })}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowAddWard(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={async () => {
                    try {
                      const method = editingWard ? "PUT" : "POST";
                      const url = editingWard ? `${API_URL}/ward-work/${editingWard.id}` : `${API_URL}/ward-work`;
                      const res = await fetch(url, {
                        method: method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newWard),
                      });
                      const data = await res.json();
                      if (editingWard) {
                        updateContent({ wardWork: content.wardWork.map(x => x.id === editingWard.id ? { ...x, ...newWard } : x) });
                        toast.success("Ward updated");
                      } else {
                        updateContent({ wardWork: [...content.wardWork, data] });
                        toast.success("Ward added");
                      }
                      setShowAddWard(false);
                    } catch (err) { toast.error("Failed to save ward"); }
                  }}>{editingWard ? "Update Ward" : "Add Ward"}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {showAddScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 border-none rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary text-white p-6">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-2xl font-bold">{editingScheme ? "Edit Scheme" : "Add New Scheme"}</CardTitle>
                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => setShowAddScheme(false)}><X className="h-5 w-5" /></Button>
                </div>
                <CardDescription className="text-white/80">Enter details for the government welfare scheme.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6 bg-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title (Hindi)</label>
                    <Input className="h-12 rounded-xl" value={newScheme.title_hi} onChange={(e) => setNewScheme({ ...newScheme, title_hi: e.target.value })} placeholder="e.g. आयुष्मान भारत" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title (English)</label>
                    <Input className="h-12 rounded-xl" value={newScheme.title_en} onChange={(e) => setNewScheme({ ...newScheme, title_en: e.target.value })} placeholder="e.g. Ayushman Bharat" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category (Hindi)</label>
                    <Input className="h-12 rounded-xl" value={newScheme.category_hi} onChange={(e) => setNewScheme({ ...newScheme, category_hi: e.target.value })} placeholder="e.g. स्वास्थ्य" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category (English)</label>
                    <Input className="h-12 rounded-xl" value={newScheme.category_en} onChange={(e) => setNewScheme({ ...newScheme, category_en: e.target.value })} placeholder="e.g. Health" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description (Hindi)</label>
                  <textarea 
                    className="w-full h-24 p-4 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="Enter Hindi description..."
                    value={newScheme.desc_hi}
                    onChange={(e) => setNewScheme({ ...newScheme, desc_hi: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description (English)</label>
                  <textarea 
                    className="w-full h-24 p-4 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="Enter English description..."
                    value={newScheme.desc_en}
                    onChange={(e) => setNewScheme({ ...newScheme, desc_en: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Icon</label>
                    <select 
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      value={newScheme.icon}
                      onChange={(e) => setNewScheme({ ...newScheme, icon: e.target.value })}
                    >
                      <option value="Users">Users</option>
                      <option value="GraduationCap">Education</option>
                      <option value="HeartPulse">Health</option>
                      <option value="Home">Home</option>
                      <option value="Briefcase">Business</option>
                      <option value="HandHeart">Welfare</option>
                      <option value="Zap">Energy</option>
                      <option value="Tractor">Agriculture</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setShowAddScheme(false)}>Cancel</Button>
                  <Button className="flex-1 h-12 rounded-xl font-bold bg-primary hover:shadow-glow transition-all" onClick={async () => {
                    try {
                      const method = editingScheme ? "PUT" : "POST";
                      const url = editingScheme ? `${API_URL}/schemes/${editingScheme.id}` : `${API_URL}/schemes`;
                      const res = await fetch(url, {
                        method: method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newScheme),
                      });
                      const data = await res.json();
                      if (editingScheme) {
                        updateContent({ schemes: content.schemes.map(x => x.id === editingScheme.id ? { ...x, ...newScheme } : x) });
                        toast.success("Scheme updated");
                      } else {
                        updateContent({ schemes: [...content.schemes, data] });
                        toast.success("Scheme added");
                      }
                      setShowAddScheme(false);
                      setNewScheme({ icon: 'Users', title_hi: '', title_en: '', desc_hi: '', desc_en: '', category_hi: '', category_en: '', color: 'from-orange-500 to-amber-500' });
                    } catch (err) { toast.error("Failed to save scheme"); }
                  }}>{editingScheme ? "Update Scheme" : "Add Scheme"}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Photo Gallery</h2>
                <p className="text-slate-500">Manage institutional activity photos</p>
              </div>
              <Button className="bg-primary hover:shadow-glow transition-all rounded-xl h-11 px-6 font-bold" onClick={() => {
                setNewGallery({ title: '', image: '', category: 'Events' });
                setShowAddGallery(true);
              }}>
                <Plus className="h-5 w-5 mr-2" /> Add Image
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {content.gallery.map((item) => (
                <Card key={item.id} className="border-none shadow-soft group relative overflow-hidden rounded-3xl">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <Button size="icon" variant="destructive" className="h-10 w-10 rounded-xl" onClick={async () => {
                         if (confirm("Delete this image?")) {
                           try {
                             await fetch(`${API_URL}/gallery/${item.id}`, { method: "DELETE" });
                             updateContent({ gallery: content.gallery.filter(x => x.id !== item.id) });
                             toast.success("Image deleted");
                           } catch (err) { toast.error("Delete failed"); }
                         }
                       }}>
                         <Trash2 className="h-5 w-5" />
                       </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-[10px] font-black uppercase text-orange-600 tracking-wider mb-1">{item.category}</p>
                    <p className="text-sm font-bold text-primary truncate">{item.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'social-media' && (
          <div className="space-y-8">
             <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Social Media Hub</h2>
                <p className="text-slate-500">Manage social media feeds and links</p>
              </div>
              <Button className="bg-primary hover:shadow-glow transition-all rounded-xl h-11 px-6 font-bold" onClick={() => {
                setNewSocial({ platform: 'youtube', title: '', url: '', embedCode: '' });
                setEditingSocial(null);
                setShowAddSocial(true);
              }}>
                <Plus className="h-5 w-5 mr-2" /> Add Social Link
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {(content.socials || []).map((social) => (
                <Card key={social.id} className="border-none shadow-soft rounded-3xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-white ${
                          social.platform === 'youtube' ? 'bg-red-600' : 
                          social.platform === 'twitter' ? 'bg-black' : 
                          social.platform === 'facebook' ? 'bg-blue-600' : 'bg-pink-600'
                        }`}>
                          {social.platform === 'youtube' && <Youtube className="h-6 w-6" />}
                          {social.platform === 'twitter' && <Twitter className="h-6 w-6" />}
                          {social.platform === 'facebook' && <Facebook className="h-6 w-6" />}
                          {social.platform === 'instagram' && <Instagram className="h-6 w-6" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-primary">{social.title}</h3>
                          <p className="text-sm text-muted-foreground uppercase font-black tracking-tighter">{social.platform}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => {
                          setEditingSocial(social);
                          setNewSocial({ ...social });
                          setShowAddSocial(true);
                        }}><Edit className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-red-500" onClick={async () => {
                           if (confirm("Delete this link?")) {
                             try {
                               await fetch(`${API_URL}/socials/${social.id}`, { method: "DELETE" });
                               updateContent({ socials: content.socials.filter(x => x.id !== social.id) });
                               toast.success("Deleted");
                             } catch (err) { toast.error("Delete failed"); }
                           }
                        }}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-mono break-all text-slate-500">
                       {social.url}
                    </div>
                    {social.embedCode && (
                       <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-[10px] text-slate-400">
                          Embed Enabled: {social.embedCode.substring(0, 50)}...
                       </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cta' && ctaForm && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-none shadow-soft h-fit">
              <CardHeader>
                <CardTitle>Call to Action Banner</CardTitle>
                <CardDescription>The large orange banner at the bottom of the home page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Banner Title (Hindi)</label>
                    <Input 
                      value={ctaForm.title_hi} 
                      onChange={e => setCtaForm({...ctaForm, title_hi: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Banner Title (English)</label>
                    <Input 
                      value={ctaForm.title_en} 
                      onChange={e => setCtaForm({...ctaForm, title_en: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Banner Subtitle (Hindi)</label>
                    <Input 
                      value={ctaForm.subtitle_hi} 
                      onChange={e => setCtaForm({...ctaForm, subtitle_hi: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Banner Subtitle (English)</label>
                    <Input 
                      value={ctaForm.subtitle_en} 
                      onChange={e => setCtaForm({...ctaForm, subtitle_en: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Button 1 Text (Hindi)</label>
                    <Input 
                      value={ctaForm.button1_text_hi} 
                      onChange={e => setCtaForm({...ctaForm, button1_text_hi: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Button 1 Text (English)</label>
                    <Input 
                      value={ctaForm.button1_text_en} 
                      onChange={e => setCtaForm({...ctaForm, button1_text_en: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Button 1 Link</label>
                  <Input 
                    value={ctaForm.button1_link} 
                    onChange={e => setCtaForm({...ctaForm, button1_link: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Button 2 Text (Hindi)</label>
                    <Input 
                      value={ctaForm.button2_text_hi} 
                      onChange={e => setCtaForm({...ctaForm, button2_text_hi: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Button 2 Text (English)</label>
                    <Input 
                      value={ctaForm.button2_text_en} 
                      onChange={e => setCtaForm({...ctaForm, button2_text_en: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Button 2 Link</label>
                  <Input 
                    value={ctaForm.button2_link} 
                    onChange={e => setCtaForm({...ctaForm, button2_link: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={async () => {
                    try {
                      const res = await fetch(`${API_URL}/cta`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          ...ctaForm,
                          title_hi: ctaForm.title_hi,
                          title_en: ctaForm.title_en,
                          subtitle_hi: ctaForm.subtitle_hi,
                          subtitle_en: ctaForm.subtitle_en,
                          button1_text_hi: ctaForm.button1_text_hi,
                          button1_text_en: ctaForm.button1_text_en,
                          button1_link: ctaForm.button1_link,
                          button2_text_hi: ctaForm.button2_text_hi,
                          button2_text_en: ctaForm.button2_text_en,
                          button2_link: ctaForm.button2_link
                        }),
                      });
                      if (res.ok) {
                        updateContent({ cta: ctaForm });
                        toast.success("CTA banner updated");
                      }
                    } catch (err) {
                      toast.error("Failed to save changes");
                    }
                  }} 
                  className="w-full gap-2 h-12 bg-primary"
                >
                  <Save className="h-5 w-5" /> Save CTA Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-soft overflow-hidden h-fit sticky top-8 bg-primary p-12 text-center text-white rounded-[50px]">
               <h2 className="text-2xl font-bold mb-4">{ctaForm.title}</h2>
               <p className="text-sm opacity-80 mb-8">{ctaForm.subtitle}</p>
               <div className="flex gap-4 justify-center">
                  <div className="bg-secondary text-secondary-foreground px-6 py-2 rounded-xl text-xs font-bold">{ctaForm.button1Text}</div>
                  <div className="border border-white/30 px-6 py-2 rounded-xl text-xs font-bold">{ctaForm.button2Text}</div>
               </div>
            </Card>
          </div>
        )}

        {/* Add Gallery Modal */}
        {showAddGallery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <Card className="w-full max-w-lg border-none shadow-2xl rounded-[32px] overflow-hidden animate-in zoom-in-95 duration-300">
              <CardHeader className="bg-slate-50 border-b border-slate-100 p-8">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-black italic text-primary">Add Gallery Image</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowAddGallery(false)} className="rounded-full"><X className="h-5 w-5" /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Title (Hindi/English)</label>
                    <Input className="h-12 rounded-xl border-slate-200 font-bold" value={newGallery.title} onChange={e => setNewGallery({...newGallery, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Category</label>
                    <select 
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      value={newGallery.category}
                      onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                    >
                      <option value="Events">Events</option>
                      <option value="Work">Development Work</option>
                      <option value="Public">Public Meeting</option>
                      <option value="Press">Press Coverage</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Image Source</label>
                    <div className="flex gap-2">
                       <Input className="h-12 rounded-xl border-slate-200 font-medium" value={newGallery.image} onChange={e => setNewGallery({...newGallery, image: e.target.value})} placeholder="https://..." />
                       <div className="relative">
                          <input 
                            type="file" 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const formData = new FormData();
                                formData.append("file", file);
                                setUploading(true);
                                try {
                                  const res = await fetch(`${API_URL}/upload`, { method: "POST", body: formData });
                                  const data = await res.json();
                                  setNewGallery(prev => ({ ...prev, image: data.url }));
                                  toast.success("Image uploaded");
                                } catch (err) { toast.error("Upload failed"); }
                                finally { setUploading(false); }
                              }
                            }} 
                          />
                          <Button disabled={uploading} className="h-12 rounded-xl aspect-square bg-slate-100 hover:bg-slate-200 text-slate-600 border-none">
                             {uploading ? "..." : <Upload className="h-5 w-5" />}
                          </Button>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setShowAddGallery(false)}>Cancel</Button>
                  <Button className="flex-1 h-12 rounded-xl font-bold bg-primary hover:shadow-glow transition-all" onClick={async () => {
                    try {
                      const res = await fetch(`${API_URL}/gallery`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newGallery),
                      });
                      const data = await res.json();
                      updateContent({ gallery: [...content.gallery, { ...data, id: data.id.toString() }] });
                      setShowAddGallery(false);
                      toast.success("Image added to gallery");
                    } catch (err) { toast.error("Failed to add image"); }
                  }}>Add to Gallery</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add/Edit Social Modal */}
        {showAddSocial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <Card className="w-full max-w-lg border-none shadow-2xl rounded-[32px] overflow-hidden animate-in zoom-in-95 duration-300">
              <CardHeader className="bg-slate-50 border-b border-slate-100 p-8">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-black italic text-primary">{editingSocial ? 'Edit Social Link' : 'Add Social Link'}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowAddSocial(false)} className="rounded-full"><X className="h-5 w-5" /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Platform</label>
                    <select 
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      value={newSocial.platform}
                      onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                    >
                      <option value="youtube">YouTube</option>
                      <option value="twitter">X / Twitter</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Title</label>
                    <Input className="h-12 rounded-xl border-slate-200 font-bold" value={newSocial.title} onChange={e => setNewSocial({...newSocial, title: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Profile/Page URL</label>
                  <Input className="h-12 rounded-xl border-slate-200" value={newSocial.url} onChange={e => setNewSocial({...newSocial, url: e.target.value})} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Embed Code (Optional - for YouTube Playlist/Live)</label>
                  <Input className="h-12 rounded-xl border-slate-200" value={newSocial.embedCode} onChange={e => setNewSocial({...newSocial, embedCode: e.target.value})} placeholder="Embed URL or Code" />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setShowAddSocial(false)}>Cancel</Button>
                  <Button className="flex-1 h-12 rounded-xl font-bold bg-primary hover:shadow-glow transition-all" onClick={async () => {
                    try {
                      const method = editingSocial ? "PUT" : "POST";
                      const url = editingSocial ? `${API_URL}/socials/${editingSocial.id}` : `${API_URL}/socials`;
                      const res = await fetch(url, {
                        method: method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newSocial),
                      });
                      const data = await res.json();
                      if (editingSocial) {
                        updateContent({ socials: content.socials.map(x => x.id === editingSocial.id ? { ...x, ...newSocial } : x) });
                        toast.success("Social link updated");
                      } else {
                        updateContent({ socials: [...content.socials, { ...data, id: data.id.toString() }] });
                        toast.success("Social link added");
                      }
                      setShowAddSocial(false);
                    } catch (err) { toast.error("Failed to save link"); }
                  }}>{editingSocial ? "Update Link" : "Add Link"}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
