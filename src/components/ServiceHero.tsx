import type { ReactNode } from "react";
import { Check, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Benefit = { title: string; sub?: string };

interface ServiceHeroProps {
  desktopImage: string;
  mobileImage?: string;
  desktopPosition?: string;
  mobilePosition?: string;
  imageLabel: string;
  title: ReactNode;
  description: ReactNode;
  benefits: Benefit[];
  onOffer: () => void;
  whatsappUrl: string;
  whatsappLabel: string;
  onWhatsApp?: () => void;
  footer?: ReactNode;
}

/** Homepage-style hero for service pages: full-screen photo, dark gradient, white text, transparent benefits. */
export function ServiceHero({
  desktopImage, mobileImage, desktopPosition = "bg-center", mobilePosition = "bg-center", imageLabel,
  title, description, benefits, onOffer, whatsappUrl, whatsappLabel, onWhatsApp, footer,
}: ServiceHeroProps) {
  return (
    <section className="relative w-full min-h-[100svh] md:min-h-screen overflow-hidden flex items-center md:items-start pt-16 md:pt-32 md:pb-6">
      <div className={`absolute inset-0 bg-cover bg-no-repeat ${mobileImage ? "hidden md:block" : ""} ${desktopPosition}`} style={{ backgroundImage: `url(${desktopImage})` }} aria-label={imageLabel} role="img" />
      {mobileImage && <div className={`absolute inset-0 md:hidden bg-cover bg-no-repeat ${mobilePosition}`} style={{ backgroundImage: `url(${mobileImage})` }} aria-hidden="true" />}
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,28,0.85) 0%, rgba(8,18,28,0.70) 30%, rgba(8,18,28,0.35) 55%, rgba(8,18,28,0.05) 75%)" }} aria-hidden="true" />
      <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(90deg, rgba(8,18,28,0.88) 0%, rgba(8,18,28,0.72) 45%, rgba(8,18,28,0.45) 75%, rgba(8,18,28,0.30) 100%)" }} aria-hidden="true" />

      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-xl md:max-w-[680px] w-full pt-10 md:pt-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-left text-white mb-6 md:mb-8">{title}</h1>
          <p className="text-base md:text-[23px] text-white md:leading-[1.45] leading-relaxed mb-6 md:mb-8 max-w-md md:max-w-[620px] text-left font-bold">{description}</p>

          <ul className="flex flex-col mb-6 md:mb-8">
            {benefits.map((b, i) => (
              <li key={b.title} className={`flex items-center gap-3 md:gap-4 text-white ${i > 0 ? "pt-3 md:pt-4 border-t border-white/20" : ""} ${i < benefits.length - 1 ? "pb-3 md:pb-4" : ""}`}>
                <span className="w-8 h-8 md:w-11 md:h-11 rounded-full border border-white/60 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </span>
                <span className="flex flex-col">
                  <span className="text-base md:text-[19px] font-bold leading-tight">{b.title}</span>
                  {b.sub && <span className="text-xs md:text-sm text-white/75 leading-tight">{b.sub}</span>}
                </span>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex flex-row gap-5 mb-6">
            <Button size="lg" onClick={onOffer} className="font-semibold h-14 px-10">Kostenloses Angebot erhalten</Button>
            <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold h-14 px-10" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={onWhatsApp} aria-label={whatsappLabel}>
                <MessageCircle className="w-5 h-5" />WhatsApp schreiben
              </a>
            </Button>
          </div>

          <div className="md:hidden flex flex-col gap-3 mb-6">
            <Button size="lg" onClick={onOffer} className="w-full min-h-[4rem] h-auto py-3.5 px-4 font-semibold justify-start gap-4 rounded-xl">
              <FileText className="w-6 h-6 text-white shrink-0" />
              <div className="flex flex-col items-start text-left">
                <span className="text-white font-bold text-base leading-tight">Kostenloses Angebot erhalten</span>
                <span className="text-white/80 text-xs leading-tight">Unverbindlich anfragen</span>
              </div>
            </Button>
            <Button size="lg" className="w-full min-h-[4rem] h-auto py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white justify-start gap-4 rounded-xl shadow-lg font-semibold" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={onWhatsApp} aria-label={whatsappLabel}>
                <MessageCircle className="w-6 h-6 text-white shrink-0" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-white font-bold text-base leading-tight">WhatsApp schreiben</span>
                  <span className="text-white/80 text-xs leading-tight">Direkt &amp; unkompliziert</span>
                </div>
              </a>
            </Button>
          </div>
          {footer}
        </div>
      </div>
    </section>
  );
}
