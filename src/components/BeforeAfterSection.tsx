import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import beforeAfter1 from '@/assets/before-after-1.jpg';
import beforeAfter2 from '@/assets/before-after-2.jpg';
import beforeAfterSessel from '@/assets/before-after-sessel.png';
import beforeAfter4 from '@/assets/before-after-4.png';
import beforeAfter5 from '@/assets/before-after-5.png';
import beforeAfter6 from '@/assets/before-after-6.png';
import beforeAfter7 from '@/assets/before-after-7.png';
import beforeAfter8 from '@/assets/before-after-8.png';
import beforeAfter9 from '@/assets/before-after-9.png';
import beforeAfter10 from '@/assets/before-after-10.png';
import beforeAfter11 from '@/assets/before-after-11.png';
import beforeAfter12 from '@/assets/before-after-12.png';
import beforeAfter13 from '@/assets/before-after-13.jpg';
import beforeAfter14 from '@/assets/before-after-14.jpg';
import beforeAfter15 from '@/assets/before-after-15.jpg';
import beforeAfter16 from '@/assets/before-after-16.png';
import beforeAfter17 from '@/assets/before-after-17.png';
import beforeAfter18 from '@/assets/before-after-18.png';
import beforeAfter19 from '@/assets/before-after-19.png';
import beforeAfter20 from '@/assets/before-after-20.png';
import beforeAfter21 from '@/assets/before-after-21.png';

const gallery = [
  { image: beforeAfter1, alt: 'Sofa Reinigung Vorher Nachher – Tiefenreinigung Ergebnis' },
  { image: beforeAfter2, alt: 'Matratzenreinigung Vorher Nachher – professionelle Fleckenentfernung' },
  { image: beforeAfterSessel, alt: 'Sessel Polsterreinigung Vorher Nachher – Auffrischung' },
  { image: beforeAfter4, alt: 'Cord-Sofa Reinigung Vorher Nachher – Tiefenreinigung Sachsen' },
  { image: beforeAfter5, alt: 'Stoff-Sofa Polsterreinigung Vorher Nachher Ergebnis' },
  { image: beforeAfter6, alt: 'Ecksofa Tiefenreinigung Vorher Nachher – ReinWerk Chemnitz' },
  { image: beforeAfter7, alt: 'Cord-Ecksofa professionelle Reinigung Vorher Nachher' },
  { image: beforeAfter8, alt: 'Dunkles Sofa Reinigung Vorher Nachher – Fleckenentfernung' },
  { image: beforeAfter9, alt: 'Teppichreinigung Vorher Nachher – professionelle Tiefenreinigung' },
  { image: beforeAfter10, alt: 'Ecksofa Polsterreinigung Vorher Nachher – helles Sofa' },
  { image: beforeAfter11, alt: 'Cord-Sofa Tiefenreinigung Vorher Nachher – dunkles Sofa' },
  { image: beforeAfter12, alt: 'Sofa Reinigung Vorher Nachher – Fleckenentfernung Mikrofaser' },
  { image: beforeAfter13, alt: 'Polsterreinigung Sofa Vorher Nachher – Mikrofaser Auffrischung' },
  { image: beforeAfter14, alt: 'Teppich Tiefenreinigung Vorher Nachher – heller Teppich' },
  { image: beforeAfter15, alt: 'Sofa Polsterreinigung Vorher Nachher – Fleckenentfernung Ergebnis' },
  { image: beforeAfter16, alt: 'Wohnlandschaft Mikrofaser Vorher Nachher – Tiefenreinigung ReinWerk' },
  { image: beforeAfter17, alt: 'Sessel Polsterreinigung Vorher Nachher – Auffrischung Mikrofaser' },
  { image: beforeAfter18, alt: 'Teppichboden Tiefenreinigung Vorher Nachher – ReinWerk Sachsen' },
  { image: beforeAfter19, alt: 'Sessel Mikrofaser Polsterreinigung Vorher Nachher – ReinWerk' },
  { image: beforeAfter20, alt: 'Sessel Polsterreinigung Vorher Nachher – Fleckenentfernung Mikrofaser' },
  { image: beforeAfter21, alt: 'Sofa Polsterreinigung Vorher Nachher – Tiefenreinigung Mikrofaser' },
];

function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: typeof gallery;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleClose, goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => { setTouchStart(e.touches[0].clientX); setTouchDelta(0); };
  const handleTouchMove = (e: React.TouchEvent) => { if (touchStart === null) return; setTouchDelta(e.touches[0].clientX - touchStart); };
  const handleTouchEnd = () => { if (Math.abs(touchDelta) > 60) { touchDelta > 0 ? goPrev() : goNext(); } setTouchStart(null); setTouchDelta(0); };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`} onClick={handleClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      <button onClick={(e) => { e.stopPropagation(); handleClose(); }} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200" aria-label="Schließen"><X className="w-5 h-5 text-white" /></button>
      <div className="absolute top-4 left-4 z-10 text-white/70 text-sm font-medium">{currentIndex + 1} / {images.length}</div>
      <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition-colors duration-200 hidden lg:flex" aria-label="Vorheriges Bild"><ChevronLeft className="w-5 h-5 text-white" /></button>
      <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition-colors duration-200 hidden lg:flex" aria-label="Nächstes Bild"><ChevronRight className="w-5 h-5 text-white" /></button>
      <div className="relative z-[1] w-full h-full flex items-center justify-center p-4 lg:p-12" onClick={(e) => e.stopPropagation()} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <img src={images[currentIndex].image} alt={images[currentIndex].alt} className={`max-w-full max-h-full object-contain rounded-lg transition-transform duration-200 ${isClosing ? 'scale-95' : 'scale-100'}`} style={{ transform: touchDelta !== 0 ? `translateX(${touchDelta * 0.4}px)` : undefined }} />
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Mobile: 4 images initially, Desktop: 3 images initially
  const mobileVisible = showAll ? gallery : gallery.slice(0, 4);
  const desktopVisible = showAll ? gallery : gallery.slice(0, 3);

  return (
    <>
      <section id="vorher-nachher" className="py-16">
        <div className="container max-w-6xl">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-8 text-center">Vorher – Nachher</p>

          {/* Mobile: vertical stack */}
          <div className="flex flex-col gap-5 lg:hidden">
            {mobileVisible.map((item, i) => (
              <div
                key={item.alt}
                className="rounded-2xl overflow-hidden shadow-soft cursor-pointer group"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Desktop: 3-column grid with horizontal scroll when expanded */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-5">
              {desktopVisible.map((item, i) => (
                <div
                  key={item.alt}
                  className="rounded-2xl overflow-hidden shadow-soft cursor-pointer group aspect-[4/3]"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Show more / less button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-base transition-colors hover:bg-primary/90"
            >
              {showAll ? 'Weniger anzeigen' : 'Mehr Ergebnisse ansehen'}
            </button>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
