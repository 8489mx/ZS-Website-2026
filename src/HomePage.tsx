import React from "react";
import { Link } from "react-router-dom";
import { APP_LOGIN_URL } from "./links";
import { 
  ArrowRight,
  Dumbbell, CheckCircle,
  Building2, LayoutDashboard, Target
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";

import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

export default function HomePage() {
  const { lang, setLang, isRTL } = useLanguage();
  const { theme, setTheme } = useTheme();

  // Basic translations for the Home Page
  const t = {
    en: {
      nav: {
        company: "Z Systems",
        contactUs: "Contact Us",
        signIn: "Sign In"
      },
      hero: {
        badge: "Welcome to Z Systems",
        title: "Enterprise Solutions \nTailored for Your Industry",
        subtitle: "We believe in building powerful, specialized systems. Discover a full suite of applications built intelligently to solve the hardest challenges in retail, coaching, construction, and beyond.",
        cta: "Explore Our Systems"
      },
      products: {
        title: "Our Systems Framework",
        subtitle: "Specialized enterprise platforms designed and structured to operate within specific industries.",
        erp: {
          name: "Z ERP",
          desc: "Advanced retail management, POS, inventory, multi-branch operations, and real-time synchronization.",
          action: "View System Details",
        },
        coaching: {
          name: "Z Coaching",
          desc: "Comprehensive coaching tracking, client management, session scheduling, and progress analysis.",
          action: "Coming Soon",
        },
        construction: {
          name: "Z Construction",
          desc: "Powerful project management, resource allocation, and progress tracking for the construction sector.",
          action: "Coming Soon",
        }
      },
      about: {
        title: "Who We Are",
        desc: "Z Systems aims to be the unified foundation for businesses operating across various regions and industries. We don't just build software; we engineer precise control mechanisms to ensure zero leaks, fast accounting, and incredible scalability.",
        features: ["Scale to any level", "Full data sovereignty", "Zero maintenance nightmare"]
      },
      footer: {
        rights: "All rights reserved.",
      }
    },
    ar: {
      nav: {
        company: "Z Systems",
        contactUs: "تواصل معنا",
        signIn: "تسجيل الدخول"
      },
      hero: {
        badge: "مرحباً بكم في Z Systems",
        title: "حلول تقنية متكاملة\nصُممت لقطاع أعمالك",
        subtitle: "نحن نؤمن ببناء أنظمة قوية ومتخصصة. اكتشف مجموعة كاملة من التطبيقات المصممة بذكاء لحل أصعب التحديات في البيع بالتجزئة والتدريب والمقاولات وغيرها.",
        cta: "استكشف أنظمتنا"
      },
      products: {
        title: "عائلة أنظمة Z Systems",
        subtitle: "منصات إدارة متخصصة صُممت وهيكلت لتعمل وفقاً لكل قطاع بدقة متناهية.",
        erp: {
          name: "Z ERP",
          desc: "نظام متطور لإدارة التجزئة، نقاط البيع، المخازن، والعمليات متعددة الفروع مع مزامنة لحظية.",
          action: "عرض تفاصيل النظام",
        },
        coaching: {
          name: "Z Coaching",
          desc: "نظام التتبع الشامل للمدربين، إدارة العملاء، جدولة الجلسات، وتحليل التطور الرياضي والصحي.",
          action: "قريباً",
        },
        construction: {
          name: "Z Construction",
          desc: "إدارة مشاريع قوية، تخصيص الموارد، وتتبع مراحل الإنجاز لقطاع البناء والمقاولات.",
          action: "قريباً",
        }
      },
      about: {
        title: "من نحن",
        desc: "نطمح في Z Systems إلى أن نكون الأساس الموحد للشركات العاملة في مختلف المناطق والصناعات. نحن لا نبني مجرد برمجيات، بل نصمم آليات دقيقة للتحكم لضمان عدم وجود تسريبات وأخطاء محاسبية مع قابلية التوسع بمرونة.",
        features: ["توسع لأي مستوى تشغيلي", "سيادة أمنية كاملة لبياناتك", "تخلص من كابوس الصيانة العشوائية"]
      },
      footer: {
        rights: "كافة الحقوق محفوظة.",
      }
    }
  };

  const content = t[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white antialiased flex flex-col items-center overflow-x-hidden">
      
      {/* HEADER / NAVIGATION */}
      <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" dir="ltr">
            <img src="/logo.png" alt="Z Systems" className="h-10 w-auto object-contain shrink-0" />
            <span className="font-display font-black text-xl text-slate-900 tracking-tight leading-none">
              {content.nav.company}
            </span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <a
              href={APP_LOGIN_URL}
              className="text-slate-800 hover:text-brand-600 font-semibold text-sm transition-colors whitespace-nowrap"
            >
              {content.nav.signIn}
            </a>
            <a 
              href="https://wa.me/201018017523" 
              target="_blank" rel="noreferrer"
              className="bg-brand-600 text-white hover:bg-brand-500 font-semibold px-5 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-md shadow-brand-500/20"
            >
              {content.nav.contactUs}
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 }} 
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }} 
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
        className="w-full pt-20 pb-16 lg:pt-32 lg:pb-24 bg-white relative overflow-hidden px-6"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-xs font-bold mb-8 shadow-sm border border-brand-100">
            {content.hero.badge}
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight max-w-4xl whitespace-pre-line">
            {content.hero.title}
          </h1>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed">
            {content.hero.subtitle}
          </p>

          <div className="mt-10 flex gap-4">
            <a href="#systems" className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3.5 rounded-lg transition-colors shadow-lg shadow-brand-500/20 text-sm flex items-center gap-2">
              {content.hero.cta}
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </a>
          </div>
        </div>
      </motion.section>

      {/* WHO WE ARE / ABOUT */}
      <motion.section 
        initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} 
        className="w-full py-16 lg:py-24 bg-slate-900 text-white object-cover"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-black mb-6">
                {content.about.title}
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                {content.about.desc}
              </p>
              <ul className="space-y-4">
                {content.about.features.map((ft, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-indigo-400" />
                    <span>{ft}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-800 rounded-3xl border border-slate-700/50 p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
                
                {/* Techy abstract shapes */}
                <div className="relative z-10 w-full flex-1 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-indigo-400/40 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                     <div className="w-32 h-32 rounded-full border border-dashed border-indigo-400/60 flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
                        <div className="w-16 h-16 bg-indigo-500/40 rounded-full blur-md" />
                     </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Target className="w-10 h-10 text-indigo-400" />
                  </div>
                </div>

                <div className="mt-auto w-full z-10">
                    <div className="font-mono text-indigo-300 text-sm mb-2">{isRTL ? "// نظام الإدارة الموحد" : "// UNIFIED FOUNDATION"}</div>
                    <div className="text-xl sm:text-2xl font-bold border-l-2 border-indigo-500 pl-4 rtl:pr-4 rtl:border-r-2 rtl:border-l-0">Z Systems Architecture™</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* THE SYSTEMS ECOSYSTEM */}
      <motion.section 
        initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} 
        id="systems" 
        className="w-full py-20 lg:py-32 bg-slate-50 relative"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mb-4">{content.products.title}</h2>
            <p className="text-slate-600 text-sm sm:text-base">{content.products.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Z ERP CARD */}
            <Link to="/erp" className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <LayoutDashboard className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-3">{content.products.erp.name}</h3>
               <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-8">{content.products.erp.desc}</p>
               
               <div className="mt-auto inline-flex items-center gap-2 text-blue-600 font-bold text-sm">
                 {content.products.erp.action}
                 <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
               </div>
               <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Z COACHING CARD */}
            <div className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col relative overflow-hidden">
               <div className="absolute top-6 right-6 rtl:left-6 rtl:right-auto bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded">{isRTL ? "قريباً" : "SOON"}</div>
               <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Dumbbell className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-3">{content.products.coaching.name}</h3>
               <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-8">{content.products.coaching.desc}</p>
               
               <div className="mt-auto inline-flex items-center gap-2 text-purple-600 font-bold text-sm opacity-50">
                 {content.products.coaching.action}
               </div>
               <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Z CONSTRUCTION CARD */}
            <div className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col relative overflow-hidden">
               <div className="absolute top-6 right-6 rtl:left-6 rtl:right-auto bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded">{isRTL ? "قريباً" : "SOON"}</div>
               <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Building2 className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-3">{content.products.construction.name}</h3>
               <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-8">{content.products.construction.desc}</p>
               
               <div className="mt-auto inline-flex items-center gap-2 text-orange-600 font-bold text-sm opacity-50">
                 {content.products.construction.action}
               </div>
               <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

          </div>
        </div>
      </motion.section>

      <footer className="w-full bg-white py-8 border-t border-slate-200 text-center text-slate-600 text-xs mt-auto">
        <div className="max-w-[1440px] mx-auto px-6">
          © {new Date().getFullYear()} Z Systems. {content.footer.rights}
        </div>
      </footer>
    </div>
  );
}
