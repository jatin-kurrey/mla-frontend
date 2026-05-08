import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppSupport } from "./WhatsAppSupport";

export const Layout = () => (
  <div className="min-h-screen bg-background font-hindi flex flex-col">
    <SiteHeader />
    <main className="flex-1"><Outlet /></main>
    <SiteFooter />
    <WhatsAppSupport />
  </div>
);
