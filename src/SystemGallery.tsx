import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// The intended images the user wants to show (using realistic unsplash representations)
const initialImages = [
  { id: 1, src: "/screenshot1.png", alt: "POS Interface - نقطة البيع السريعة" },
  { id: 2, src: "/screenshot2.png", alt: "Dashboard & Analytics - لوحة التحكم والتحليلات" },
  { id: 3, src: "/screenshot3.png", alt: "Inventory Management - إدارة المبيعات والمخزون" },
  { id: 4, src: "/screenshot4.png", alt: "Accounting & Reports - الحسابات والتقارير" }
];

export default function SystemGallery({ lang }: { lang: "ar" | "en" }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const images = initialImages;

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
              whileHover={{ y: -5 }}
              onClick={() => openImage(index)}
              className="group cursor-pointer aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative flex items-center justify-center"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('fallback-active');
                }}
              />
              
              <div className="absolute inset-0 bg-slate-800/0 group-hover:bg-slate-800/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {lang === "ar" ? "تكبير الصورة" : "Enlarge Image"}
                </div>
              </div>

              {/* Fallback overlay when image isn't loaded */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 fallback-overlay hide-when-loaded p-6 text-center">
                <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                <span className="text-[10px] font-mono text-slate-500 font-bold tracking-wide border border-slate-200 px-3 py-1.5 rounded bg-white">Z Systems Preview</span>
                <span className="text-sm font-black text-slate-800 mt-2">{img.alt}</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 sm:p-8"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={closeGallery}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={showPrev}
                className="absolute left-0 lg:-left-16 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl z-10 transition-all"
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
                <div className="relative w-full rounded-lg overflow-hidden bg-slate-950 flex shadow-2xl items-center justify-center" style={{ minHeight: '300px' }}>
                  <img 
                    src={images[selectedImageIndex].src} 
                    alt={images[selectedImageIndex].alt} 
                    className="max-w-full max-h-[80vh] object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Fallback text in Lightbox if img is broken */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 lightbox-fallback text-center p-6">
                    <ImageIcon className="w-16 h-16 text-slate-800 mb-4" />
                    <span className="text-sm font-bold text-slate-400 max-w-[250px]">
                      {lang === "ar" ? "برجاء رفع الصورة إلى مجلد public/ عبر متصفح الملفات على اليسار." : "Please upload the image to the public/ folder via the file explorer on the left."}
                    </span>
                    <span className="text-lg text-brand-400 font-mono font-bold mt-3 px-4 py-2 border border-dashed border-slate-700 bg-slate-900 rounded">{images[selectedImageIndex].src.replace('/', '')}</span>
                  </div>
                </div>

                <div className="mt-4 px-4 py-2 bg-slate-800 rounded-full text-center">
                  <span className="text-white font-medium text-sm">
                    {images[selectedImageIndex].alt}
                  </span>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={showNext}
                className="absolute right-0 lg:-right-16 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl z-10 transition-all"
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
