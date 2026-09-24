import React, { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "./LanguageContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { lang, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
        title={lang === 'ar' ? 'تغيير ألوان الثيم' : 'Toggle Theme'}
      >
        <Palette className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 ${isRTL ? 'left-0' : 'right-0'}`}>
          <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            {lang === 'ar' ? 'اختر الثيم' : 'Select Theme'}
          </div>
          <button
            onClick={() => { setTheme("emerald"); setIsOpen(false); }}
            className={`w-full text-start px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${theme === 'emerald' ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-700'}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-500"></div>
              {lang === 'ar' ? 'إميرالد (الأخضر الأصلي)' : 'Emerald (Original)'}
            </div>
            {theme === 'emerald' && <Check className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => { setTheme("hybrid"); setIsOpen(false); }}
            className={`w-full text-start px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${theme === 'hybrid' ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-700'}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              {lang === 'ar' ? 'هايبرد (أزرق Z Systems)' : 'Hybrid (System Blue)'}
            </div>
            {theme === 'hybrid' && <Check className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
