interface Props { title: string; subtitle?: string; }
export const PageHeader = ({ title, subtitle }: Props) => (
  <section className="bg-gradient-hero border-b border-primary/10">
    <div className="container py-12 md:py-16 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-secondary font-hindi">{title}</h1>
      {subtitle && <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  </section>
);
