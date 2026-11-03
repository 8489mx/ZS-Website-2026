import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";
import SiteLogo from "../components/SiteLogo";
import { APP_TRIAL_URL } from "../links";
import { SECTORS, type SectorSlug } from "../data/sectors";

const SITE_URL = "https://zsystemai.com";
const WHATSAPP_URL = "https://wa.me/201018017523";

const UI = {
  ar: {
    home: "الرئيسية",
    erp: "نظام Z-ERP",
    contact: "اتصل بنا",
    trial: "ابدأ التجربة مجاناً",
    whatsapp: "تواصل عبر واتساب",
    chip: "حلول Z-ERP لنقاط البيع",
    highlights: ["تجربة مجانية بدون التزام", "فواتير ضريبية برمز QR", "نسخة محلية تعمل بدون إنترنت"],
    painsHeading: "أبرز التحديات",
    painsSub: "المشكلات التي تتكرر يوميًا في هذا النشاط:",
    featuresHeading: "كيف يساعدك Z-ERP؟",
    featuresSub: "الإمكانيات التي تعالج كل تحدٍّ من التحديات السابقة:",
    stepsHeading: "البدء في ثلاث خطوات",
    faqHeading: "الأسئلة الشائعة",
    faqSub: "إجابات مباشرة عن أكثر الأسئلة تكرارًا حول هذا الحل:",
    relatedHeading: "حلول مرتبطة",
    learnMore: "اعرف المزيد",
    erpCardTitle: "نظام Z-ERP الكامل",
    erpCardText: "المحاسبة والمخزون ونقاط البيع متعددة الفروع والمخازن، مع خطط الأسعار والترخيص بالتفصيل.",
    ctaHeading: "جرّب Z-ERP في نشاطك بنفسك",
    ctaText: "ابدأ التجربة المجانية اليوم دون التزام، أو راسلنا عبر واتساب لأي استفسار عن الإعداد أو الأسعار.",
    companyLine: "Z Systems for Software Solutions — بورسعيد، مصر",
    rights: "جميع الحقوق محفوظة.",
    terms: "الشروط والأحكام",
    refund: "سياسة الاسترداد والإلغاء",
    privacy: "سياسة الخصوصية",
  },
  en: {
    home: "Home",
    erp: "Z-ERP System",
    contact: "Contact Us",
    trial: "Start Free Trial",
    whatsapp: "Chat on WhatsApp",
    chip: "Z-ERP Point-of-Sale Solutions",
    highlights: ["Free trial, no commitment", "Tax invoices with QR codes", "Local edition that works offline"],
    painsHeading: "The everyday challenges",
    painsSub: "The problems that repeat daily in this line of business:",
    featuresHeading: "How Z-ERP helps",
    featuresSub: "The capabilities that answer each of the challenges above:",
    stepsHeading: "Getting started in three steps",
    faqHeading: "Frequently Asked Questions",
    faqSub: "Straight answers to the most common questions about this solution:",
    relatedHeading: "Related solutions",
    learnMore: "Learn more",
    erpCardTitle: "The full Z-ERP system",
    erpCardText: "Accounting, inventory, and multi-branch, multi-warehouse POS, with pricing and licence plans in detail.",
    ctaHeading: "Try Z-ERP in your own business",
    ctaText: "Start the free trial today with no commitment, or message us on WhatsApp with any setup or pricing question.",
    companyLine: "Z Systems for Software Solutions — Port Said, Egypt",
    rights: "All rights reserved.",
    terms: "Terms & Conditions",
    refund: "Refund Policy",
    privacy: "Privacy Policy",
  },
} as const;

interface SectorPageProps {
  slug: SectorSlug;
}

/**
 * Data-driven landing page for a sector / solution (supermarkets,
 * restaurants, offline POS). All copy comes from src/data/sectors.ts;
 * per-route title/description stays owned by useDocumentMeta. The only
 * head side effect here is the FAQPage JSON-LD, injected for the
 * current language and removed on unmount or language change.
 */
export default function SectorPage({ slug }: SectorPageProps) {
  const { lang, isRTL } = useLanguage();
  const sector = SECTORS[slug];
  const content = lang === "ar" ? sector.ar : sector.en;
  const t = UI[lang];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: `${SITE_URL}${sector.path}`,
      mainEntity: content.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [sector, content]);

  const sectionHeading = (heading: string, sub?: string) => (
    <div className="text-center max-w-2xl mx-auto mb-10">
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight leading-normal">
        {heading}
      </h2>
      {sub ? <p className="mt-2 text-slate-600 text-xs sm:text-sm">{sub}</p> : null}
    </div>
  );

  const MoreArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      className={`min-h-screen bg-white text-slate-800 flex flex-col font-sans ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 select-none" dir="ltr">
            <SiteLogo alt="Z" width={36} height={36} className="h-8 sm:h-9 w-auto object-contain shrink-0" />
            <span className="font-display font-black text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
              Systems
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-700">
            <Link to="/" className="hover:text-brand-600 transition-colors">
              {t.home}
            </Link>
            <Link to="/erp" className="hover:text-brand-600 transition-colors">
              {t.erp}
            </Link>
            <Link to="/contact" className="hover:text-brand-600 transition-colors">
              {t.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <a
              href={APP_TRIAL_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              {t.trial}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-5">
          <span className="text-brand-600 font-bold text-xs tracking-widest uppercase font-mono bg-brand-50 px-3 py-1.5 rounded-full inline-block">
            {t.chip}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 font-display tracking-tight leading-snug">
            {content.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            {content.lead}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={APP_TRIAL_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors shadow-sm"
            >
              {t.trial}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              {t.whatsapp}
            </a>
          </div>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs text-slate-600 font-semibold">
            {t.highlights.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CircleCheck className="w-4 h-4 text-brand-600" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {sectionHeading(t.painsHeading, t.painsSub)}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.pains.map((pain) => (
              <div key={pain.title} className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <pain.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{pain.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pain.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {sectionHeading(t.featuresHeading, t.featuresSub)}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.features.map((feature) => (
              <div key={feature.title} className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {sectionHeading(t.stepsHeading)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {content.steps.map((step, idx) => (
              <div key={step.title} className="p-6 rounded-xl border border-slate-200 bg-white space-y-3 text-start">
                <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-display font-black text-base flex items-center justify-center">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {sectionHeading(t.faqHeading, t.faqSub)}
          <div className="bg-white rounded border border-slate-200 p-6 sm:p-8 shadow-sm text-start space-y-4 max-w-4xl mx-auto">
            {content.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={faq.q} className="border-b border-slate-200 last:border-0 pb-3 last:pb-0">
                  <button
                    id={`sector-faq-button-${idx}`}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`sector-faq-answer-${idx}`}
                    className="w-full flex justify-between items-center text-start font-bold text-slate-800 text-xs sm:text-sm py-2 hover:text-brand-600 transition-colors cursor-pointer font-sans"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-brand-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div
                      id={`sector-faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`sector-faq-button-${idx}`}
                    >
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-2.5 pb-3">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {sectionHeading(t.relatedHeading)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sector.related.map((relatedSlug) => {
              const related = SECTORS[relatedSlug];
              const relatedContent = lang === "ar" ? related.ar : related.en;
              return (
                <Link
                  key={relatedSlug}
                  to={related.path}
                  className="block p-6 rounded-xl border border-slate-200 bg-white space-y-3 hover:border-brand-300 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{relatedContent.cardTitle}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {relatedContent.lead}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600">
                    {t.learnMore}
                    <MoreArrow className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
            <Link
              to="/erp"
              className="block p-6 rounded-xl border border-slate-200 bg-white space-y-3 hover:border-brand-300 hover:shadow-md transition"
            >
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t.erpCardTitle}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.erpCardText}</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600">
                {t.learnMore}
                <MoreArrow className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-5">
          <SiteLogo alt="Z Systems" className="h-16 w-auto object-contain mx-auto" />
          <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 leading-normal">
            {t.ctaHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">{t.ctaText}</p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={APP_TRIAL_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors shadow-sm"
            >
              {t.trial}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              {t.whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white py-8 border-t border-slate-200 text-xs text-slate-600 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
            <div>
              <p className="font-semibold text-slate-800">
                © {new Date().getFullYear()} Z Systems for Software Solutions. {t.rights}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                {t.companyLine}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
              <Link to="/terms" className="hover:text-brand-600 transition-colors">
                {t.terms}
              </Link>
              <span className="text-slate-500">•</span>
              <Link to="/refund-policy" className="hover:text-brand-600 transition-colors">
                {t.refund}
              </Link>
              <span className="text-slate-500">•</span>
              <Link to="/privacy" className="hover:text-brand-600 transition-colors">
                {t.privacy}
              </Link>
              <span className="text-slate-500">•</span>
              <Link to="/contact" className="hover:text-brand-600 transition-colors">
                {t.contact}
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-[11px] text-slate-500">
            <a href="mailto:info@zsystemai.com" className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              info@zsystemai.com
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors"
              dir="ltr"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              +20 1018017523
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
