import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Gallery Images (Cache-busting '?v=2' ensures browsers instantly load the new images instead of showing old cached ones)
const GALLERY_IMAGES = [
  { id: 1, src: "/screenshot1.png?v=2" },
  { id: 2, src: "/screenshot2.png?v=2" },
  { id: 3, src: "/screenshot3.png?v=2" },
  { id: 4, src: "/screenshot4.png?v=2" }
];

export default function SystemGallery({ lang }: { lang: "ar" | "en" }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const images = GALLERY_IMAGES;

  const openImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeGallery = () => {
    setSelectedImageIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-600 font-bold text-xs tracking-widest uppercase font-mono bg-brand-50 px-3 py-1.5 rounded-full inline-block">
            {lang === "ar" ? "صور حية من قلب النظام" : "Live Real-System Gallery"}
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-normal">
            {lang === "ar" ? "شاهد قوة النظام من الداخل" : "See the System's Power from Inside"}
          </h2>
          <p className="mt-2 text-slate-500 text-xs sm:text-sm">
            {lang === "ar" 
              ? "واجهات عصرية فائقة السرعة، توفر لك تحكماً لحظياً في مبيعات الكاشير، حركة المخازن، والتقارير المالية بدقة متناهية وسهولة مطلقة." 
              : "Modern, high-speed interfaces providing real-time control over POS sales, inventory movements, and financial reports with absolute precision."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              whileHover={{ y: -4 }}
              onClick={() => openImage(index)}
              className="group cursor-pointer aspect-video bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:border-slate-400 hover:shadow-lg transition-all relative flex items-center justify-center"
            >
              <img 
                src={img.src} 
                alt={`Screenshot ${img.id}`} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('fallback-active');
                }}
              />
              
              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/95 backdrop-blur-xs text-slate-900 px-3.5 py-1.5 rounded-full font-bold text-xs shadow-md transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
                  <span>{lang === "ar" ? "عرض وتكبير الصورة" : "Enlarge Preview"}</span>
                </div>
              </div>

              {/* Fallback overlay when image isn't loaded */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 fallback-overlay hide-when-loaded p-6 text-center">
                <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wide border border-slate-200 px-3 py-1.5 rounded bg-white">Z Systems Preview</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            key="gallery-lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 sm:p-8"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={closeGallery}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={showPrev}
                className="absolute left-0 lg:-left-16 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl z-20 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col items-center max-h-full"
              >
                <div className="relative w-full rounded-xl overflow-hidden bg-slate-950 flex shadow-2xl items-center justify-center border border-slate-800" style={{ minHeight: '300px' }}>
                  <img 
                    src={images[selectedImageIndex].src} 
                    alt={`Screenshot ${images[selectedImageIndex].id}`} 
                    className="max-w-full max-h-[82vh] object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Fallback text in Lightbox if img is broken */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 lightbox-fallback text-center p-6">
                    <ImageIcon className="w-16 h-16 text-slate-800 mb-4" />
                    <span className="text-sm font-bold text-slate-400 max-w-[250px]">
                      {lang === "ar" ? "الصورة جاري تحميلها." : "Loading image."}
                    </span>
                  </div>
                </div>

                {/* Subtle Image Indicator (1 / 4) */}
                <div className="mt-3 px-3.5 py-1 bg-slate-900/80 border border-slate-800 rounded-full text-center">
                  <span className="text-slate-400 font-mono text-xs">
                    {selectedImageIndex + 1} / {images.length}
                  </span>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={showNext}
                className="absolute right-0 lg:-right-16 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl z-20 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
