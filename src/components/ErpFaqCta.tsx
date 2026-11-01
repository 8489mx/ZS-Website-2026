import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SiteLogo from "./SiteLogo";

export interface FaqItem {
  q: string;
  a: string;
}

interface ErpFaqCtaProps {
  lang: "ar" | "en";
  faqs: FaqItem[];
  openFAQIndex: number | null;
  onToggleFaq: (index: number) => void;
  onRequestConsultation: () => void;
}

/**
 * FAQ + final call-to-action sections, lazy-loaded behind a visibility
 * gate in ErpPage. The CTA copy states no customer count, no absolute
 * compliance claim, no invented efficiency figure, and no refund
 * period: the published refund policy (14 days cloud / 7 days
 * offline) is the only refund wording.
 */
export default function ErpFaqCta({
  lang,
  faqs,
  openFAQIndex,
  onToggleFaq,
  onRequestConsultation,
}: ErpFaqCtaProps) {
  return (
    <>
{/* SOCIAL PROOF & FAQS SECTION */}
<motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} id="faqs" className="py-16 lg:py-24 bg-white border-b border-slate-200">
  <div className="max-w-[1440px] mx-auto px-6 sm:px-8 font-sans">
    
    <div className="text-center max-w-2xl mx-auto mb-10">
      <span className="text-brand-600 font-bold text-xs tracking-widest uppercase font-mono bg-brand-50 px-3 py-1.5 rounded-full inline-block">{lang === "ar" ? "إجابات وافية لاستفساراتك" : "Comprehensive answers to your inquiries"}</span>
      <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight leading-normal">
        {lang === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
      </h2>
      <p className="mt-2 text-slate-600 text-xs sm:text-sm">
        {lang === "ar" ? "إجابات عن أكثر الأسئلة شيوعاً حول النظام والأسعار والترخيص:" : "Answers to the most common questions about the system, pricing, and licensing:"}
      </p>
    </div>

    {/* Accordion FAQ block */}
    <div className="bg-white rounded border border-slate-200 p-6 sm:p-8 shadow-sm text-start space-y-4 max-w-4xl mx-auto">
      <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 pb-3 border-b border-slate-200 mb-4">{lang === "ar" ? "الأسئلة التي تتردد غالباً بذهن أصحاب العمل:" : "Common Questions in Employers' Minds:"}</h3>
      
      {faqs.map((faq, idx) => {
        const isOpen = openFAQIndex === idx;
        return (
          <div key={`faq-item-${idx}`} className="border-b border-slate-150 last:border-0 pb-3 last:pb-0">
            <button
              onClick={() => onToggleFaq(idx)}
              className="w-full flex justify-between items-center text-start font-bold text-slate-800 text-xs sm:text-sm py-2 hover:text-brand-600 transition-colors cursor-pointer font-sans"
            >
              <span>{faq.q}</span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-brand-600 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key={`faq-ans-${idx}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-2.5 pb-3">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>

  </div>
</motion.section>

{/* FINAL CALL TO ACTION */}
<motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200 text-slate-800 relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-[1440px] mx-auto px-6 sm:px-8 text-center relative z-10">
    
    <SiteLogo alt="Z Systems" className="h-20 w-auto object-contain mx-auto mb-6 drop-shadow-md" />

    {/* Copywriting Final Climax headline */}
    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-normal max-w-4xl mx-auto">
      {lang === "ar" ? "اتخذ قرار الريادة اليوم وحوّل نظامك لمكسب حقيقي خاضع للسيطرة" : "Take the leadership decision today and turn your system into real controlled gain"}
    </h2>
    
    <p className="mt-4 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
      {lang === "ar" ? (
        <>
          انضم الآن إلى الشركات وسلاسل المحلات التجارية التي تثق في <strong className="text-brand-500 font-bold">Z Systems Pro</strong> لحماية مبيعاتها اليومية ورفع كفاءة جرد مستودعاتها ودون أي مجهود بشري ضائع.
        </>
      ) : (
        <>
          Join the companies and retail chains that trust <strong className="text-brand-500 font-bold">Z Systems Pro</strong> to protect their daily sales and boost warehouse inventory efficiency without any wasted human effort.
        </>
      )}
    </p>

    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <button 
        onClick={onRequestConsultation}
        className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded text-xs transition-colors cursor-pointer shadow-sm"
      >
        {lang === "ar" ? "احجز جلستك المحاسبية والاستشارية مجاناً" : "Book your accounting & consulting free session"}
      </button>
      <a 
        href="#pricing"
        className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold px-6 py-3 rounded text-xs transition-colors shadow-sm"
      >
        {lang === "ar" ? "استعراض الباقات وخطط الأسعار" : "Explore Plans & Pricing"}
      </a>
    </div>

    <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-[11px] text-slate-600 font-semibold font-mono">
      <span>{lang === "ar" ? "✓ لا توجد بطاقة ائتمانية مطلوبة" : "✓ No Credit Card Required"}</span>
      <span className="w-1 h-1 bg-slate-300 rounded-full" />
      <span>{lang === "ar" ? "✓ فواتير بحقول ضريبية ورمز QR" : "✓ Tax-field invoices with QR codes"}</span>
      <span className="w-1 h-1 bg-slate-300 rounded-full" />
      <span>{lang === "ar" ? "✓ استرداد وفق سياسة الاسترداد المعلنة" : "✓ Refund under the published refund policy"}</span>
    </div>

  </div>
</motion.section>
    </>
  );
}
