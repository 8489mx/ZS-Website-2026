import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";
import SiteLogo from "../components/SiteLogo";
import { APP_TRIAL_URL } from "../links";
import { ARTICLE_LIST, type Article } from "../data/articles";

const WHATSAPP_URL = "https://wa.me/201018017523";

const UI = {
  ar: {
    home: "الرئيسية",
    erp: "نظام Z-ERP",
    contact: "اتصل بنا",
    trial: "ابدأ التجربة مجاناً",
    chip: "مدونة Z-ERP",
    h1: "مدونة Z-ERP: إجابات لصاحب المحل",
    sub: "أدلة عملية وإجابات مباشرة عن الأسئلة التي تسبق شراء برنامج كاشير أو محاسبة: الأسعار، والعمل دون إنترنت، وإدارة الفروع والمخزون — من وقائع منشورة، وبدون مبالغة تسويقية.",
    readArticle: "اقرأ المقال",
    minutesRead: "دقائق قراءة",
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
    chip: "Z-ERP Blog",
    h1: "The Z-ERP Blog: Straight Answers for Shop Owners",
    sub: "Practical guides and direct answers to the questions that come before buying POS or accounting software: prices, working without internet, and running branches and stock — from published facts, without marketing exaggeration.",
    readArticle: "Read the article",
    minutesRead: "min read",
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

/**
 * Blog index (/blog): article cards for the answer blog. Header and
 * footer mirror the slim pattern of SectorPage (duplicated locally —
 * SectorPage is not modified). Per-route title/description stays
 * owned by useDocumentMeta.
 */
export default function BlogIndexPage() {
  const { lang, isRTL } = useLanguage();
  const t = UI[lang];
  const MoreArrow = isRTL ? ArrowLeft : ArrowRight;

  const articleCard = (article: Article) => {
    const content = lang === "ar" ? article.ar : article.en;
    return (
      <Link
        key={article.slug}
        to={article.path}
        className="block p-6 rounded-xl border border-slate-200 bg-white space-y-4 hover:border-brand-300 hover:shadow-md transition"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-slate-500 font-semibold">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-600" />
            <time dateTime={article.publishedDate}>{formatArticleDate(article.publishedDate, lang)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            {content.readingMinutes} {t.minutesRead}
          </span>
        </div>
        <h2 className="font-bold text-slate-900 font-display text-lg sm:text-xl leading-snug">
          {content.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{content.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600">
          {t.readArticle}
          <MoreArrow className="w-3.5 h-3.5" />
        </span>
      </Link>
    );
  };

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

      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-5">
          <span className="text-brand-600 font-bold text-xs tracking-widest uppercase font-mono bg-brand-50 px-3 py-1.5 rounded-full inline-block">
            {t.chip}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 font-display tracking-tight leading-snug">
            {t.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">{t.sub}</p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 lg:py-20 bg-slate-50 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {ARTICLE_LIST.map(articleCard)}
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
