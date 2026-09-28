import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail, Phone, MapPin, Globe } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";

interface LegalLayoutProps {
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  children: React.ReactNode;
}

export default function LegalLayout({
  titleAr,
  titleEn,
  subtitleAr,
  subtitleEn,
  children,
}: LegalLayoutProps) {
  const { lang, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 flex flex-col ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 select-none" dir="ltr">
            <img src="/logo.png" alt="Z" width="36" height="36" className="h-8 sm:h-9 w-auto object-contain shrink-0" />
            <span className="font-display font-black text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
              Systems
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <Link
              to="/"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-brand-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{lang === "ar" ? "الرئيسية" : "Home"}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Title */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            {lang === "ar" ? titleAr : titleEn}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {lang === "ar" ? subtitleAr : subtitleEn}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-10 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-10 space-y-8 text-start">
          {children}

          {/* Company Headquarters & Inquiries Card */}
          <div className="mt-12 pt-8 border-t border-slate-200 bg-slate-50/70 rounded-xl p-5 sm:p-6 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>{lang === "ar" ? "المقر ومعلومات التواصل:" : "Headquarters & Inquiries:"}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900">{lang === "ar" ? "الشركة:" : "Company:"}</strong>{" "}
                <span className="font-semibold text-brand-700">Z Systems for Software Solutions</span>
              </div>
              <div>
                <strong className="text-slate-900">{lang === "ar" ? "الدولة:" : "Country:"}</strong>{" "}
                <span>{lang === "ar" ? "جمهورية مصر العربية" : "Egypt"}</span>
              </div>
              <div className="sm:col-span-2">
                <strong className="text-slate-900">{lang === "ar" ? "العنوان:" : "Address:"}</strong>{" "}
                <span>{lang === "ar" ? "محافظة بورسعيد، مكتب تجاري رقم (3) مشروع الـ 5000 وحدة ع 14" : "Port Said Governorate, Commercial Office No. 3, 5000 Units Project, Bldg 14"}</span>
              </div>
              <div>
                <strong className="text-slate-900 font-medium">{lang === "ar" ? "الهاتف / واتساب:" : "Phone / WhatsApp:"}</strong>{" "}
                <div className="inline-flex flex-wrap items-center gap-2">
                  <a href="tel:+201018017523" className="text-brand-600 font-normal hover:underline" dir="ltr">
                    <span dir="ltr" className="inline-block tracking-normal">+20 1018017523</span>
                  </a>
                  <span className="text-slate-300">•</span>
                  <a href="tel:0663640828" className="text-slate-700 font-normal hover:underline" dir="ltr">
                    <span dir="ltr" className="inline-block tracking-normal">066-3640828</span>
                  </a>
                </div>
              </div>
              <div>
                <strong className="text-slate-900 font-medium">{lang === "ar" ? "البريد الإلكتروني:" : "Email:"}</strong>{" "}
                <a href="mailto:info@zsystemai.com" className="text-brand-600 font-normal hover:underline">info@zsystemai.com</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white py-8 border-t border-slate-200 text-xs text-slate-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>
            <p className="font-semibold text-slate-800">
              © {new Date().getFullYear()} Z Systems for Software Solutions. {lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {lang === "ar" ? "جمهورية مصر العربية • مدفوعات إلكترونية آمنة ومعتمدة" : "Egypt • Secure & Verified Online Payments"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
            <Link to="/terms" className="hover:text-brand-600 transition-colors">
              {lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
            </Link>
            <span className="text-slate-300">•</span>
            <Link to="/refund-policy" className="hover:text-brand-600 transition-colors">
              {lang === "ar" ? "سياسة الاستبدال والاسترجاع" : "Refund Policy"}
            </Link>
            <span className="text-slate-300">•</span>
            <Link to="/privacy" className="hover:text-brand-600 transition-colors">
              {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <span className="text-slate-300">•</span>
            <Link to="/contact" className="hover:text-brand-600 transition-colors">
              {lang === "ar" ? "اتصل بنا والعنوان" : "Contact & Address"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
