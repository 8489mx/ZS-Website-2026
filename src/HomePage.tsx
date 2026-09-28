import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { APP_LOGIN_URL } from "./links";
import { 
  ArrowRight,
  Dumbbell, CheckCircle,
  Building2, LayoutDashboard, Target,
  X, Bell, CheckCircle2, Mail, Loader2,
  Database, Shield, ShoppingCart, Boxes, FileText, BarChart3
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close waitlist modal on Escape key press
  useEffect(() => {
    if (!waitlistProduct) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setWaitlistProduct(null);
        setWaitlistSubmitted(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [waitlistProduct]);

  // Handle silent background waitlist submission
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || isSubmitting) return;

    setIsSubmitting(true);

    const lead = {
      id: Date.now().toString(),
      product: waitlistProduct,
      email: waitlistEmail,
      phone: waitlistPhone || "غير مسجل",
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("zsystems_waitlist_leads") || "[]");
      existing.unshift(lead);
      localStorage.setItem("zsystems_waitlist_leads", JSON.stringify(existing));
    } catch {
      // Storage unavailable fallback
    }

    // Send silent background email notification to info@zsystemai.com
    try {
      await fetch("https://formsubmit.co/ajax/4e885857a3c4f32f671d9c3da5dc6cad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `طلب انضمام جديد لقائمة انتظار (${waitlistProduct}) - Z Systems`,
          "النظام المطلوب": waitlistProduct,
          "البريد الإلكتروني للعميل": waitlistEmail,
          "رقم الهاتف أو واتساب": waitlistPhone || "غير مسجل",
          "تاريخ ووقت التسجيل": new Date().toLocaleString("ar-EG"),
        }),
      });
    } catch {
      // Background request completed
    }

    setIsSubmitting(false);
    setWaitlistSubmitted(true);
  };

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
          name: "ZS-ERP",
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
          name: "ZS-ERP",
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
        <div className="max-w-[1440px] mx-auto px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0" dir="ltr">
            <img src="/logo.png" alt="Z Systems" width="140" height="36" className="h-7 sm:h-10 w-auto object-contain shrink-0" />
            <span className="font-display font-black text-sm sm:text-xl text-slate-900 tracking-tight leading-none whitespace-nowrap">
              {content.nav.company}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <LanguageSwitcher />
            <a
              href={APP_LOGIN_URL}
              className="text-slate-800 hover:text-brand-600 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap px-1.5 py-1"
            >
              {content.nav.signIn}
            </a>
            <a 
              href="https://wa.me/201018017523" 
              target="_blank" rel="noreferrer"
              className="bg-brand-600 text-white hover:bg-brand-500 font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all duration-300 shadow-md shadow-brand-500/20 whitespace-nowrap"
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
        className="w-full pt-8 pb-14 sm:pt-12 sm:pb-16 lg:pt-20 lg:pb-20 bg-white relative overflow-hidden px-4 sm:px-6"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left / Text Column (7 cols) */}
            <div className={`lg:col-span-7 flex flex-col ${isRTL ? "text-start items-start" : "text-start items-start"}`}>
              <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-3.5 py-1.5 rounded-full text-xs font-bold mb-5 shadow-sm border border-brand-100">
                {content.hero.badge}
              </div>
              
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.18] tracking-tight max-w-2xl whitespace-pre-line">
                {content.hero.title}
              </h1>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
                {content.hero.subtitle}
              </p>

              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
                <a 
                  href="#systems" 
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-brand-500/20 text-sm flex items-center justify-center gap-2"
                >
                  <span>{content.hero.cta}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </a>

                <a 
                  href="https://wa.me/201018017523" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center"
                >
                  {content.nav.contactUs}
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg text-slate-600 text-center sm:text-start">
                <div className="p-1">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">100%</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-600 leading-tight mt-0.5">{lang === "ar" ? "تحكم مالي ومخزني" : "Financial Control"}</div>
                </div>
                <div className="p-1">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">+500</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-600 leading-tight mt-0.5">{lang === "ar" ? "نقطة بيع نشطة" : "Active POS Units"}</div>
                </div>
                <div className="p-1">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">24/7</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-600 leading-tight mt-0.5">{lang === "ar" ? "دعم واستشارات" : "Live Support"}</div>
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
              <div className="aspect-square bg-gradient-to-b from-slate-900/95 via-[#0f172a] to-indigo-950/60 rounded-3xl border border-indigo-400/20 p-4 sm:p-6 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden flex items-center justify-center">
                
                {/* Tech Grid with Clean Deep Contrast */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none" />

                {/* Subtle Celestial Micro-Stars */}
                <div className="absolute top-8 left-12 w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px]" />
                <div className="absolute top-16 right-14 w-2 h-2 rounded-full bg-indigo-200/70 blur-[0.5px]" />
                <div className="absolute bottom-12 left-16 w-1.5 h-1.5 rounded-full bg-cyan-200/60 blur-[0.5px]" />
                <div className="absolute bottom-20 right-10 w-2 h-2 rounded-full bg-white/50 blur-[0.5px]" />

                {/* SVG Precision Orbital Rings - Radiant Silver & Cyan */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="85" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
                  <circle cx="200" cy="200" r="135" stroke="rgba(165, 180, 252, 0.28)" strokeWidth="1.2" />
                  <circle cx="200" cy="200" r="175" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                </svg>

                {/* THE CENTRAL SUN: Quiet Luxury Glass Core with Tight Breathing Pulse Glow */}
                <div className="relative z-20 flex flex-col items-center justify-center">
                  {/* Outer Breathing Aura (Tight Spread, Rhythmic Pulse) */}
                  <motion.div 
                    animate={{ scale: [0.98, 1.15, 0.98], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-500/50 via-indigo-500/60 to-blue-600/50 blur-xl pointer-events-none" 
                  />

                  {/* Inner Tight Reactor Glow (Directly under the rim, expanding and contracting) */}
                  <motion.div 
                    animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.35, 0.85, 0.35] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400/60 via-indigo-400/70 to-purple-500/60 blur-md pointer-events-none" 
                  />
                  
                  {/* Platinum / Titanium frosted rim with soft luminous edge */}
                  <div className="relative p-[1.5px] rounded-full bg-gradient-to-b from-white/40 via-indigo-400/30 to-transparent shadow-[0_0_35px_rgba(99,102,241,0.35),0_15px_35px_rgba(0,0,0,0.6)]">
                    {/* Dark glass reactor core */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-2 border border-white/15 relative overflow-hidden group">
                      
                      {/* Delicate internal reflection */}
                      <div className="absolute -top-6 -left-6 w-16 h-16 bg-white/15 rounded-full blur-md pointer-events-none" />
                      
                      {/* Glowing Stylized Geometric Z Emblem - Refined compact bubble hugging the Z */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-indigo-500/25 to-cyan-500/25 border border-indigo-300/40 flex items-center justify-center mb-1.5 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                        <svg className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]" viewBox="0 0 24 24" fill="none">
                          <defs>
                            <linearGradient id="zCoreGradV3" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#67e8f9" />
                              <stop offset="50%" stopColor="#38bdf8" />
                              <stop offset="100%" stopColor="#818cf8" />
                            </linearGradient>
                          </defs>
                          <path d="M4.5 5H19.5L13.5 12.5H19L18 19H4.5L10.5 11.5H5L4.5 5Z" fill="url(#zCoreGradV3)" />
                        </svg>
                      </div>

                      {/* Brand Wordmark - Centered SYSTEMS with refined 9px and #d9dee6 silver tone */}
                      <span className="font-mono text-[9px] tracking-[0.32em] font-semibold text-[#d9dee6] uppercase text-center block leading-none">
                        SYSTEMS
                      </span>
                    </div>
                  </div>
                </div>

                {/* THE ORBITING PLANETS: Premium Obsidian Glass Orbs Harmonized with Center Core */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] rounded-full pointer-events-none"
                >
                  {/* Planet 1: ZS-ERP (Top: 0 deg) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                      className="group flex flex-col items-center cursor-pointer"
                    >
                      {/* Deep Obsidian Frosted Glass Satellite matching Central Core */}
                      <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full p-[1px] bg-gradient-to-b from-white/30 via-slate-700/50 to-transparent shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_12px_rgba(99,102,241,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:from-white/50 transition-all duration-300">
                        <div className="w-full h-full rounded-full bg-slate-950/90 backdrop-blur-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                          {/* Delicate specular highlight */}
                          <div className="absolute -top-2 -left-2 w-5 h-5 bg-white/15 rounded-full blur-[2px] pointer-events-none" />
                          <LayoutDashboard className="w-5 h-5 text-[#d9dee6] group-hover:text-white transition-colors drop-shadow" />
                        </div>
                      </div>
                      {/* Crisp Label in text-[#d9dee6] */}
                      <span className="mt-1.5 text-[11px] font-semibold text-[#d9dee6] group-hover:text-white transition-colors tracking-tight drop-shadow">
                        ZS-ERP
                      </span>
                    </motion.div>
                  </div>

                  {/* Planet 2: Z Coaching (Bottom Left: 120 deg) */}
                  <div className="absolute bottom-3 left-2 sm:left-3 pointer-events-auto">
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                      className="group flex flex-col items-center cursor-pointer"
                    >
                      {/* Deep Obsidian Frosted Glass Satellite matching Central Core */}
                      <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full p-[1px] bg-gradient-to-b from-white/30 via-slate-700/50 to-transparent shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_12px_rgba(99,102,241,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:from-white/50 transition-all duration-300">
                        <div className="w-full h-full rounded-full bg-slate-950/90 backdrop-blur-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                          {/* Delicate specular highlight */}
                          <div className="absolute -top-2 -left-2 w-5 h-5 bg-white/15 rounded-full blur-[2px] pointer-events-none" />
                          <Dumbbell className="w-5 h-5 text-[#d9dee6] group-hover:text-white transition-colors drop-shadow" />
                        </div>
                      </div>
                      {/* Crisp Label in text-[#d9dee6] */}
                      <span className="mt-1.5 text-[11px] font-semibold text-[#d9dee6] group-hover:text-white transition-colors tracking-tight drop-shadow">
                        Z Coaching
                      </span>
                    </motion.div>
                  </div>

                  {/* Planet 3: Z Construction (Bottom Right: 240 deg) */}
                  <div className="absolute bottom-3 right-2 sm:right-3 pointer-events-auto">
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                      className="group flex flex-col items-center cursor-pointer"
                    >
                      {/* Deep Obsidian Frosted Glass Satellite matching Central Core */}
                      <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full p-[1px] bg-gradient-to-b from-white/30 via-slate-700/50 to-transparent shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_12px_rgba(99,102,241,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:from-white/50 transition-all duration-300">
                        <div className="w-full h-full rounded-full bg-slate-950/90 backdrop-blur-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                          {/* Delicate specular highlight */}
                          <div className="absolute -top-2 -left-2 w-5 h-5 bg-white/15 rounded-full blur-[2px] pointer-events-none" />
                          <Building2 className="w-5 h-5 text-[#d9dee6] group-hover:text-white transition-colors drop-shadow" />
                        </div>
                      </div>
                      {/* Crisp Label in text-[#d9dee6] */}
                      <span className="mt-1.5 text-[11px] font-semibold text-[#d9dee6] group-hover:text-white transition-colors tracking-tight drop-shadow">
                        Z Construction
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

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
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <LayoutDashboard className="w-7 h-7" />
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
               <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Dumbbell className="w-7 h-7" />
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
               <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Building2 className="w-7 h-7" />
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
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm cursor-pointer select-none"
            onClick={() => {
              setWaitlistProduct(null);
              setWaitlistSubmitted(false);
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-7 max-w-md w-full relative overflow-hidden cursor-default select-text"
            >
              <button
                onClick={() => {
                  setWaitlistProduct(null);
                  setWaitlistSubmitted(false);
                }}
                className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {waitlistSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 font-display">
                    {isRTL ? "تم تسجيلك وإرسال طلبك بنجاح!" : "Registration Complete!"}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                    {isRTL
                      ? `تم حفظ بياناتك بنجاح وإرسال إشعار فوري بالطلب إلى إدارة (${waitlistProduct}). سنقوم بالتواصل معك عبر بريدك الإلكتروني فور التدشين الرسمي.`
                      : `Your request for (${waitlistProduct}) has been submitted successfully. Our team will contact you via email upon official launch.`}
                  </p>
                  
                  <div className="pt-2 flex flex-col gap-2">
                    {/* Optional Instant WhatsApp */}
                    <a
                      href={`https://wa.me/201018017523?text=${encodeURIComponent(
                        `مرحباً Z Systems، سجلت في قائمة انتظار نظام (${waitlistProduct}).\nالبريد: ${waitlistEmail}\nالهاتف: ${waitlistPhone || "غير مسجل"}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>{isRTL ? "تواصل فوري عبر واتساب (اختياري)" : "Quick WhatsApp (Optional)"}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setWaitlistProduct(null);
                        setWaitlistSubmitted(false);
                      }}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer mt-1"
                    >
                      {isRTL ? "تم / إغلاق النافذة" : "Done / Close"}
                    </button>
                  </div>
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

                  <form onSubmit={handleWaitlistSubmit} className="space-y-3.5">
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
                        disabled={isSubmitting}
                        className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>{isRTL ? "جاري الإرسال والتسجيل..." : "Submitting..."}</span>
                          </>
                        ) : (
                          <>
                            <span>{isRTL ? "تأكيد الانضمام لقائمة الانتظار" : "Confirm Waitlist Registration"}</span>
                            <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="w-full bg-white py-12 border-t border-slate-200 text-slate-600 text-xs mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pb-8 border-b border-slate-100">
            {/* Column 1: Company & Contact */}
            <div className="space-y-3 text-start">
              <div className="flex items-center gap-2 w-fit" dir="ltr">
                <img src="/logo.png" alt="Z" width="32" height="32" className="h-7 w-auto object-contain shrink-0" />
                <span className="font-display font-black text-slate-900 text-lg tracking-tight">Systems</span>
              </div>
              
              {/* Contact Information on one line */}
              <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-medium">{lang === "ar" ? "الهاتف / واتساب:" : "Mobile / WhatsApp:"}</span>
                  <a href="tel:+201018017523" className="text-brand-600 font-mono font-bold hover:underline" dir="ltr">
                    <span dir="ltr" className="inline-block font-mono">+20 1018017523</span>
                  </a>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-medium">{lang === "ar" ? "الأرضي:" : "Landline:"}</span>
                  <a href="tel:0663640828" className="text-slate-800 font-mono font-bold hover:underline" dir="ltr">
                    <span dir="ltr" className="inline-block font-mono">066-3640828</span>
                  </a>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-medium">{lang === "ar" ? "البريد:" : "Email:"}</span>
                  <a href="mailto:info@zsystemai.com" className="text-brand-600 font-mono font-bold hover:underline" dir="ltr">info@zsystemai.com</a>
                </div>
              </div>
            </div>

            {/* Column 2: Legal & Policies & Payment */}
            <div className="space-y-4 text-center md:flex md:flex-col md:items-center justify-center">
              <div className="w-full flex flex-col items-center text-center">
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-3 text-center">
                  {lang === "ar" ? "السياسات والاستخدام" : "Legal & Policies"}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-700">
                  <Link to="/terms" className="hover:text-brand-600 transition-colors">
                    {lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link to="/refund-policy" className="hover:text-brand-600 transition-colors">
                    {lang === "ar" ? "سياسة الاسترجاع" : "Refund Policy"}
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link to="/privacy" className="hover:text-brand-600 transition-colors">
                    {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link to="/contact" className="hover:text-brand-600 transition-colors">
                    {lang === "ar" ? "اتصل بنا" : "Contact Us"}
                  </Link>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500">
                <span>{lang === "ar" ? "مدفوعات إلكترونية آمنة عبر:" : "Secure online payments via:"}</span>
                <span className="font-bold font-mono text-xs text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200/70" dir="ltr">Visa</span>
                <span className="font-bold font-mono text-xs text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200/70" dir="ltr">MasterCard</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Compliance */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-start pt-2">
            <p>
              © {new Date().getFullYear()} Z Systems for Software Solutions. {content.footer.rights}
            </p>
            <p className="text-slate-400 text-[11px]">
              {lang === "ar" ? (
                <>
                  الأسعار بالجنيه المصري (EGP) مع دعم العملات الإقليمية • معاملات بنكية مشفرة <span dir="ltr" className="font-mono font-medium text-slate-500">256-bit SSL</span>
                </>
              ) : (
                "Prices in EGP with regional currency support • 256-bit SSL encrypted"
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
