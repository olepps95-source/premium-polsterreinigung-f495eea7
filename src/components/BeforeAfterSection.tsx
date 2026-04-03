import { useState, useCallback, useEffect, useRef } from 'react';
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setTouchDelta(e.touches[0].clientX - touchStart);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta) > 60) {
      if (touchDelta > 0) goPrev();
      else goNext();
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      <button
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
        aria-label="Schließen"
      >
        <X className="w-5 h-5 text-white" />
      </button>
      <div className="absolute top-4 left-4 z-10 text-white/70 text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 hidden lg:flex"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 hidden lg:flex"
        aria-label="Nächstes Bild"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
      <div
        className="relative z-[1] w-full h-full flex items-center justify-center p-4 lg:p-12"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex].image}
          alt={images[currentIndex].alt}
          className={`max-w-full max-h-full object-contain rounded-lg transition-transform duration-200 ${
            isClosing ? 'scale-95' : 'scale-100'
          }`}
          style={{
            transform: touchDelta !== 0 ? `translateX(${touchDelta * 0.4}px)` : undefined,
          }}
        />
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section id="vorher-nachher" className="py-16">
        <div className="container">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-8 text-center">Vorher – Nachher</p>

          {/* Mobile: horizontal scroll with peek effect */}
          <div className="lg:hidden -mx-4 px-4">
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {gallery.map((item, i) => (
                <div
                  key={item.alt}
                  className="snap-start shrink-0 cursor-pointer rounded-2xl overflow-hidden shadow-soft"
                  style={{ width: 'calc(85vw - 16px)' }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: 4 images in one row */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-5">
            {gallery.slice(0, 4).map((item, i) => (
              <div
                key={item.alt}
                className="relative rounded-2xl overflow-hidden shadow-soft cursor-pointer group"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                        <path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
