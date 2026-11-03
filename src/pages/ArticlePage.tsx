import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";
import SiteLogo from "../components/SiteLogo";
import { APP_TRIAL_URL } from "../links";
import { ARTICLES, type ArticleSlug } from "../data/articles";

const SITE_URL = "https://zsystemai.com";
const WHATSAPP_URL = "https://wa.me/201018017523";

const UI = {
  ar: {
    home: "الرئيسية",
    blog: "المدونة",
    erp: "نظام Z-ERP",
    contact: "اتصل بنا",
    trial: "ابدأ التجربة مجاناً",
    whatsapp: "تواصل عبر واتساب",
    minutesRead: "دقائق قراءة",
    faqHeading: "الأسئلة الشائعة",
    faqSub: "إجابات مباشرة عن أكثر الأسئلة تكرارًا حول هذا الموضوع:",
    relatedHeading: "اقرأ أيضًا",
    learnMore: "اعرف المزيد",
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
    blog: "Blog",
    erp: "Z-ERP System",
    contact: "Contact Us",
    trial: "Start Free Trial",
    whatsapp: "Chat on WhatsApp",
    minutesRead: "min read",
    faqHeading: "Frequently Asked Questions",
    faqSub: "Straight answers to the most common questions on this topic:",
    relatedHeading: "Keep reading",
    learnMore: "Learn more",
    ctaHeading: "Try Z-ERP in your own business",
    ctaText: "Start the free trial today with no commitment, or message us on WhatsApp with any setup or pricing question.",
    companyLine: "Z Systems for Software Solutions — Port Said, Egypt",
    rights: "All rights reserved.",
    terms: "Terms & Conditions",
    refund: "Refund Policy",
    privacy: "Privacy Policy",
  },
} as const;

function formatArticleDate(iso: string, lang: "ar" | "en") {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

interface ArticlePageProps {
  slug: ArticleSlug;
}

/**
 * A single blog article. All copy comes from src/data/articles.ts;
 * per-route title/description stays owned by useDocumentMeta. The
 * head side effects here are two JSON-LD blocks — Article and
 * FAQPage — for the current language, removed on unmount or
 * language change. Header and footer mirror the slim pattern of
 * SectorPage (duplicated locally; SectorPage is not modified).
 */
export default function ArticlePage({ slug }: ArticlePageProps) {
  const { lang, isRTL } = useLanguage();
  const article = ARTICLES[slug];
  const content = lang === "ar" ? article.ar : article.en;
  const t = UI[lang];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const organization = {
      "@type": "Organization",
      name: "Z Systems for Software Solutions",
      url: SITE_URL,
    };
    const articleScript = document.createElement("script");
    articleScript.type = "application/ld+json";
    articleScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: content.title,
      description: content.excerpt,
      datePublished: article.publishedDate,
      inLanguage: lang === "ar" ? "ar" : "en",
      mainEntityOfPage: `${SITE_URL}${article.path}`,
      author: organization,
      publisher: organization,
    });
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: `${SITE_URL}${article.path}`,
      mainEntity: content.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    });
    document.head.append(articleScript, faqScript);
    return () => {
      articleScript.remove();
      faqScript.remove();
    };
  }, [article, content, lang]);

  const sectionHeading = (heading: string, sub?: string) => (
    <div className="text-center max-w-2xl mx-auto mb-10">
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight leading-normal">
        {heading}
      </h2>
      {sub ? <p className="mt-2 text-slate-600 text-xs sm:text-sm">{sub}</p> : null}
    </div>
  );

  const CrumbSeparator = isRTL ? ChevronLeft : ChevronRight;
  const MoreArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      className={`min-h-screen bg-white text-slate-800 flex flex-col font-sans ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header (same slim pattern as SectorPage) */}
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

      {/* Article body */}
      <article className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500 mb-8">
            <Link to="/" className="hover:text-brand-600 transition-colors">
              {t.home}
            </Link>
            <CrumbSeparator className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/blog" className="hover:text-brand-600 transition-colors">
              {t.blog}
            </Link>
            <CrumbSeparator className="w-3.5 h-3.5 text-slate-400" />
            <span aria-current="page" className="text-slate-700 line-clamp-1">
              {content.title}
            </span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight leading-snug">
            {content.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-500 font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-600" />
              <time dateTime={article.publishedDate}>{formatArticleDate(article.publishedDate, lang)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-600" />
              {content.readingMinutes} {t.minutesRead}
            </span>
          </div>

          {/* Excerpt as the direct-answer intro */}
          <p className="mt-8 bg-brand-50 border border-brand-100 rounded-xl p-5 sm:p-6 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            {content.excerpt}
          </p>

          {/* Sections */}
          {content.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight leading-snug">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                      <CircleCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {sectionHeading(t.faqHeading, t.faqSub)}
          <div className="bg-white rounded border border-slate-200 p-6 sm:p-8 shadow-sm text-start space-y-4 max-w-4xl mx-auto">
            {content.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={faq.q} className="border-b border-slate-200 last:border-0 pb-3 last:pb-0">
                  <button
                    id={`article-faq-button-${idx}`}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`article-faq-answer-${idx}`}
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
                      id={`article-faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`article-faq-button-${idx}`}
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

      {/* Related links */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {sectionHeading(t.relatedHeading)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {content.relatedLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-3 hover:border-brand-300 hover:shadow-md transition"
              >
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{link.title}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600">
                  {t.learnMore}
                  <MoreArrow className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
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

      {/* Footer (same slim pattern as SectorPage) */}
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
