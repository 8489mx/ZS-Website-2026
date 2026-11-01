import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

export default function NotFoundPage() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
        <p className="font-mono font-black text-5xl text-slate-900">404</p>
        <h1 className="mt-3 text-xl font-black text-slate-900 font-display">
          {isArabic ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {isArabic
            ? "الرابط الذي فتحته غير موجود أو تم نقله. يمكنك العودة للرئيسية أو صفحة النظام."
            : "The link you opened does not exist or was moved. Go back home or to the ERP page."}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Link
            to="/"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors"
          >
            {isArabic ? "الصفحة الرئيسية" : "Home"}
          </Link>
          <Link
            to="/erp"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold py-2.5 px-6 rounded-xl text-xs transition-colors"
          >
            {isArabic ? "صفحة النظام والأسعار" : "ERP & Pricing"}
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-2.5 px-6 rounded-xl text-xs transition-colors"
          >
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </Link>
        </div>
      </div>
    </div>
  );
}
