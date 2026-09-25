import React, { useState } from "react";
import { Link } from "react-router-dom";
import { APP_LOGIN_URL } from "./links";
import { 
  ArrowRight,
  Dumbbell, CheckCircle,
  Building2, LayoutDashboard, Target,
  X, Bell, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";

import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import InteractiveCyberRobot from "./components/InteractiveCyberRobot";

export default function HomePage() {
  const { lang, setLang, isRTL } = useLanguage();
  const { theme, setTheme } = useTheme();

  // Waitlist modal state for upcoming systems
  const [waitlistProduct, setWaitlistProduct] = useState<string | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistPhone, setWaitlistPhone] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  // Basic translations for the Home Page
  const t = {
    en: {
      nav: {
        company: "Systems",
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
        company: "Systems",
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
            <img src="/logo.png" alt="Z Systems" width="160" height="40" className="h-10 w-auto object-contain shrink-0" />
            <span className="font-display font-black text-xl text-slate-900 tracking-tight leading-none">
              {content.nav.company}
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/erp"
              className="text-slate-800 hover:text-brand-600 font-bold text-xs sm:text-sm px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all flex items-center gap-1.5 border border-transparent hover:border-slate-200"
            >
              <span>{lang === "ar" ? "نظام Z ERP" : "Z ERP System"}</span>
              <span className="text-[10px] bg-brand-50 text-brand-700 border border-brand-200 px-1.5 py-0.5 rounded font-mono font-bold">
                PRO
              </span>
            </Link>
            <ThemeSwitcher />
            <LanguageSwitcher />
            <a
              href={APP_LOGIN_URL}
              className="text-slate-800 hover:text-brand-600 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              {content.nav.signIn}
            </a>
            <a 
              href="https://wa.me/201018017523" 
              target="_blank" rel="noreferrer"
              className="bg-brand-600 text-white hover:bg-brand-500 font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all duration-300 shadow-md shadow-brand-500/20"
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
        className="w-full pt-12 pb-16 lg:pt-20 lg:pb-20 bg-white relative overflow-hidden px-6"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left / Text Column (7 cols) */}
            <div className={`lg:col-span-7 flex flex-col ${isRTL ? "text-start items-start" : "text-start items-start"}`}>
              <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6 shadow-sm border border-brand-100">
                {content.hero.badge}
              </div>
              
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight max-w-2xl whitespace-pre-line">
                {content.hero.title}
              </h1>

              <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
                {content.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <a 
                  href="#systems" 
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3.5 rounded-lg transition-colors shadow-lg shadow-brand-500/20 text-sm flex items-center gap-2"
                >
                  {content.hero.cta}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </a>

                <a 
                  href="https://wa.me/201018017523" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-lg transition-colors text-sm"
                >
                  {content.nav.contactUs}
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="mt-10 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 w-full max-w-lg text-slate-600">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">100%</div>
                  <div className="text-[11px] text-slate-600">{lang === "ar" ? "تحكم مالي ومخزني" : "Financial Control"}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">+500</div>
                  <div className="text-[11px] text-slate-600">{lang === "ar" ? "نقطة بيع نشطة" : "Active POS Units"}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">24/7</div>
                  <div className="text-[11px] text-slate-600">{lang === "ar" ? "دعم واستشارات" : "Live Support"}</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Interactive Cyber Robot (5 cols) */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <InteractiveCyberRobot />
            </div>

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
            <div className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
               <div className="absolute top-6 right-6 rtl:left-6 rtl:right-auto bg-purple-100 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-full">{isRTL ? "قريباً · انضم للانتظار" : "SOON · WAITLIST"}</div>
               <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Dumbbell className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-3">{content.products.coaching.name}</h3>
               <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-8">{content.products.coaching.desc}</p>
               
               <button
                 onClick={() => {
                   setWaitlistProduct(content.products.coaching.name);
                   setWaitlistSubmitted(false);
                 }}
                 className="mt-auto inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold text-sm cursor-pointer text-start"
               >
                 <span>{isRTL ? "انضم لقائمة الانتظار وحجز الأسبقية" : "Join Early Access Waitlist"}</span>
                 <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
               </button>
               <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Z CONSTRUCTION CARD */}
            <div className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
               <div className="absolute top-6 right-6 rtl:left-6 rtl:right-auto bg-orange-100 text-orange-700 text-[10px] font-bold px-2.5 py-1 rounded-full">{isRTL ? "قريباً · انضم للانتظار" : "SOON · WAITLIST"}</div>
               <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Building2 className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-3">{content.products.construction.name}</h3>
               <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-8">{content.products.construction.desc}</p>
               
               <button
                 onClick={() => {
                   setWaitlistProduct(content.products.construction.name);
                   setWaitlistSubmitted(false);
                 }}
                 className="mt-auto inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold text-sm cursor-pointer text-start"
               >
                 <span>{isRTL ? "انضم لقائمة الانتظار وحجز الأسبقية" : "Join Early Access Waitlist"}</span>
                 <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
               </button>
               <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

          </div>
        </div>
      </motion.section>

      {/* WAITLIST MODAL */}
      <AnimatePresence>
        {waitlistProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-7 max-w-md w-full relative overflow-hidden"
            >
              <button
                onClick={() => setWaitlistProduct(null)}
                className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {waitlistSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 font-display mb-2">
                    {isRTL ? "تم تسجيلك في قائمة الأسبقية بنجاح!" : "You're on the priority list!"}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {isRTL
                      ? `شكراً لاهتمامك بنظام (${waitlistProduct}). سنرسل لك إشعاراً ودعوة وصول مبكر فور انطلاق المرحلة التجريبية.`
                      : `Thank you for your interest in ${waitlistProduct}. We will notify you with early access invitation once live.`}
                  </p>
                  <button
                    onClick={() => setWaitlistProduct(null)}
                    className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {isRTL ? "تم، شكراً" : "Done"}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-3 border border-brand-200">
                    <Bell className="w-3.5 h-3.5" />
                    <span>{isRTL ? "حجز مقعد في الإطلاق التجريبي" : "Early Beta Access"}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 font-display mb-2">
                    {isRTL ? `قائمة انتظار: ${waitlistProduct}` : `Waitlist: ${waitlistProduct}`}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {isRTL
                      ? "النظام حالياً في مراحله النهائية من التطوير والتدقيق. سجل بياناتك لتكون أول من يجربه مجاناً مع أولوية في باقات التدشين."
                      : "The system is in its final staging phase. Leave your details to get first-day free access and launch benefits."}
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setWaitlistSubmitted(true);
                    }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {isRTL ? "البريد الإلكتروني *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        placeholder="your-name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {isRTL ? "رقم الجوال أو واتساب (اختياري)" : "Mobile or WhatsApp (Optional)"}
                      </label>
                      <input
                        type="tel"
                        value={waitlistPhone}
                        onChange={(e) => setWaitlistPhone(e.target.value)}
                        placeholder="+20 10... / +966 5..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-500 font-mono text-end direction-ltr"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>{isRTL ? "تأكيد الانضمام لقائمة الانتظار" : "Confirm Waitlist Registration"}</span>
                        <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="w-full bg-white py-8 border-t border-slate-200 text-center text-slate-600 text-xs mt-auto">
        <div className="max-w-[1440px] mx-auto px-6">
          © {new Date().getFullYear()} Z Systems. {content.footer.rights}
        </div>
      </footer>
    </div>
  );
}
