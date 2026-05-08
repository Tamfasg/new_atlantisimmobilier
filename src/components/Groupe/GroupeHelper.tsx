export const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <p className="font-calibri mb-5 text-xs font-bold uppercase tracking-[0.38em] text-champagne/80">
    {children}
  </p>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-georgia text-[clamp(2.4rem,5vw,5rem)] font-medium italic leading-[0.98] text-cream">
    {children}
  </h2>
);

export const BodyText = ({ children }: { children: React.ReactNode }) => (
  <p className="font-calibri text-base leading-[1.9] text-cream/55">
    {children}
  </p>
);
