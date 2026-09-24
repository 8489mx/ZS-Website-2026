import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { APP_LOGIN_URL, APP_TRIAL_URL } from "./links";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import {
  MonitorCheck,
  Clock,
  Boxes,
  TrendingUp,
  Users,
  BarChart3,
  HelpCircle,
  Check,
  X,
  ShieldCheck,
  ShieldAlert,
  WifiOff,
  Globe,
  Server,
  Calculator,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  DollarSign,
  ArrowUpRight,
  Menu,
  CheckCircle,
  Lock,
  Percent,
  CheckSquare,
  Building2,
  Trash2,
  UserCheck,
  Zap,
  Search
} from "lucide-react";
import WhatsAppSimulation from "./WhatsAppSimulation";
import { ERP_CATEGORIES, PROBLEM_STATEMENTS, DEPLOYMENT_MODES, PRICING_TIERS, FAQS } from "./data";
import { ERP_CATEGORIES_EN, PROBLEM_STATEMENTS_EN, DEPLOYMENT_MODES_EN, FAQS_EN, PRICING_TIERS_EN } from "./dataEn";
import { MessageCircle, Palette, Utensils, UtensilsCrossed, Smile, Star, Coffee, Activity, Pizza, Bird, Carrot, Store, Car, Sun, CarFront } from "lucide-react";
import SystemGallery from "./SystemGallery";
import { content } from "./i18n";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCurrency } from "./CurrencyContext";

export default function ErpPage() {
  const { lang, setLang } = useLanguage();
  const { theme, setTheme } = useTheme();

  const currentErpCats = lang === "ar" ? ERP_CATEGORIES : ERP_CATEGORIES_EN;
  const currentProblemStmts = lang === "ar" ? PROBLEM_STATEMENTS : PROBLEM_STATEMENTS_EN;
  const currentDeploymentModes = lang === "ar" ? DEPLOYMENT_MODES : DEPLOYMENT_MODES_EN;
  const currentFaqs = lang === "ar" ? FAQS : FAQS_EN;
  const currentPricingTiers = lang === "ar" ? PRICING_TIERS : PRICING_TIERS_EN;
  const { currencyCode, currency, formatPrice } = useCurrency();
  const t = content[lang];

  // Helper for pricing per tier
  const getTierPrice = (tierIndex: number) => {
    switch (tierIndex) {
      case 0: return currency.plans.starter;
      case 1: return currency.plans.business;
      case 2: return currency.plans.enterprise;
      case 3: return currency.plans.lifetime;
      default: return currency.plans.starter;
    }
  };

  const currencySymbol = lang === "ar" ? currency.symbolAr : currency.symbolEn;

  // Navigation Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Feature Section Interactive States
  const [activeTab, setActiveTab] = useState("pos");

  // Offline Mode Simulator State
  const [simulatedOnline, setSimulatedOnline] = useState(true);

  // ROI Calculator states
  const [numBranches, setNumBranches] = useState(2);
  const [avgMonthlySales, setAvgMonthlySales] = useState(() => currency.roi.defaultTurnover);
  const [isLifetimeTarget, setIsLifetimeTarget] = useState(false);
  const [isChartMounted, setIsChartMounted] = useState(false);

  useEffect(() => {
    setIsChartMounted(true);
  }, []);

  // FAQ Accordion State
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  // Demo Modal State
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [demoForm, setDemoForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    employees: "1-5",
    preferredMode: "Cloud"
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // POS Interactive App Simulator Items State
  const [posItems, setPosItems] = useState([
    { id: 1, name: lang === "ar" ? "عسل سدر أصلي 1 كغ" : "Original Sidr Honey 1 kg", price: Math.round(120 * currency.rateFromSAR), qty: 1 },
    { id: 2, name: lang === "ar" ? "قهوة هرري ممتاز حبة كاملة 500 غ" : "Harari Excellent Coffee Beans 500g", price: Math.round(45 * currency.rateFromSAR), qty: 2 },
    { id: 3, name: lang === "ar" ? "زيت زيتون بكر عضوي 500 مل" : "Organic Virgin Olive Oil 500ml", price: Math.round(35 * currency.rateFromSAR), qty: 1 },
  ]);

  // Sync ROI Turnover and POS items when currency or lang changes
  useEffect(() => {
    setAvgMonthlySales(currency.roi.defaultTurnover);
    setPosItems([
      { id: 1, name: lang === "ar" ? "عسل سدر أصلي 1 كغ" : "Original Sidr Honey 1 kg", price: Math.round(120 * currency.rateFromSAR), qty: 1 },
      { id: 2, name: lang === "ar" ? "قهوة هرري ممتاز حبة كاملة 500 غ" : "Harari Excellent Coffee Beans 500g", price: Math.round(45 * currency.rateFromSAR), qty: 2 },
      { id: 3, name: lang === "ar" ? "زيت زيتون بكر عضوي 500 مل" : "Organic Virgin Olive Oil 500ml", price: Math.round(35 * currency.rateFromSAR), qty: 1 },
    ]);
  }, [currencyCode, lang]);

  const [posHoldStatus, setPosHoldStatus] = useState<"active" | "suspended" | "resumed">("active");
  const [posDiscount, setPosDiscount] = useState(10); // fixed quantity or flat
  const [posPaymentMethod, setPosPaymentMethod] = useState<"cash" | "card" | "credit">("card");

  const updateQty = (id: number, delta: number) => {
    setPosItems(posItems.map(item => {
      if (item.id === id) {
        const nextQty = Math.max(1, item.qty + delta);
        return { ...item, qty: nextQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setPosItems(posItems.filter(item => item.id !== id));
  };

  const addSimulatedItem = (name?: string, price?: number) => {
    const randomIdBase = Date.now() + Math.random();
    const itemName = name || (lang === "ar" ? "تمر خلاص ملكي فاخر" : "Premium Royal Khalas Dates");
    const itemPrice = price !== undefined ? price : 65;

    setPosItems(prev => {
      const existingIdx = prev.findIndex(item => item.name === itemName);
      if (existingIdx > -1) {
        return prev.map((item, idx) => {
          if (idx === existingIdx) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        });
      } else {
        return [...prev, { id: randomIdBase, name: itemName, price: itemPrice, qty: 1 }];
      }
    });
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDemoSubmitted(true);
    }, 1200);
  };

  // Calculations for POS Interactive view
  const posSubtotal = posItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const posDiscountAmount = (posSubtotal * posDiscount) / 100;
  const vatRate = currencyCode === "EGP" ? 0.14 : currencyCode === "AED" ? 0.05 : currencyCode === "JOD" ? 0.16 : currencyCode === "BHD" ? 0.10 : (currencyCode === "KWD" || currencyCode === "QAR" || currencyCode === "IQD") ? 0 : 0.15;
  const posVat = (posSubtotal - posDiscountAmount) * vatRate;
  const posTotal = (posSubtotal - posDiscountAmount) + posVat;

  // Calculators for ROI Box
  const calculatedSavings = Math.round(avgMonthlySales * 0.04 * numBranches * 12); // 4% savings annually
  const systemSaaSAnnualCost = isLifetimeTarget ? 799 : (numBranches > 3 ? 149 : numBranches > 1 ? 69 : 29) * 12;
  const finalRationOfROI = Math.max(12, Math.round((calculatedSavings / (systemSaaSAnnualCost || 1)) * 100));

  const roiChartData = useMemo(() => {
    const monthlySaving = Math.round(avgMonthlySales * 0.04 * numBranches);
    return Array.from({ length: 12 }).map((_, i) => ({
      month: lang === "ar" ? `شهر ${i + 1}` : `M${i + 1}`,
      savings: monthlySaving * (i + 1),
    }));
  }, [avgMonthlySales, numBranches, lang]);

  // Auto recommend plan based on user branches and settings
  const recommendedPlanIndex = () => {
    if (isLifetimeTarget) return 3; // Lifetime offline
    if (numBranches >= 5) return 2; // Enterprise
    if (numBranches >= 2) return 1; // Business / Pro
    return 0; // Cloud basic
  };
  const recommendedPlan = () => currentPricingTiers[recommendedPlanIndex()];
  const recommendedPlanPrice = getTierPrice(recommendedPlanIndex());

  const getIcon = (name: string, className?: string) => {
    switch (name) {
      case "MonitorCheck": return <MonitorCheck className={className} />;
      case "Clock": return <Clock className={className} />;
      case "Boxes": return <Boxes className={className} />;
      case "TrendingUp": return <TrendingUp className={className} />;
      case "Users": return <Users className={className} />;
      case "BarChart3": return <BarChart3 className={className} />;
      case "ShieldAlert": return <ShieldAlert className={className} />;
      case "WifiOff": return <WifiOff className={className} />;
      case "Globe": return <Globe className={className} />;
      case "Server": return <Server className={className} />;
      default: return <BarChart3 className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white antialiased overflow-x-hidden flex flex-col justify-start">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 select-none hover:opacity-80 transition-opacity" dir="ltr">
              <img src="/logo.png" alt="Z Systems" className="h-10 w-auto object-contain shrink-0" />
              <div className="flex flex-col text-start">
                <span className="font-display font-black text-[16px] text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
                  Z Systems 
                  <span className="bg-brand-50 text-brand-600 text-[9px] px-1.5 py-0.5 rounded font-bold">Pro</span>
                </span>
                <span className="text-[9px] text-slate-600 font-mono font-bold uppercase tracking-wider mt-0.5">Smart Financial Hub</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-slate-600">
              <a href="#why-us" className="hover:text-brand-600 transition-colors">{t.nav.whyUs}</a>
              <a href="#features" className="hover:text-brand-600 transition-colors">{t.nav.features}</a>
              <a href="#deployment" className="hover:text-brand-600 transition-colors">{t.nav.deployment}</a>
              <a href="#roi-calculator" className="hover:text-brand-600 transition-colors">{t.nav.roi}</a>
              <a href="#pricing" className="hover:text-brand-600 transition-colors">{t.nav.pricing}</a>
              <a href="#faqs" className="hover:text-brand-600 transition-colors">{t.nav.faqs}</a>
            </nav>

            {/* CTA button */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeSwitcher />
              <LanguageSwitcher />
              <a
                href={APP_LOGIN_URL}
                className="text-slate-800 text-xs font-semibold hover:text-brand-600 transition-colors whitespace-nowrap"
              >
                {t.nav.signIn}
              </a>
              <a 
                href="#pricing"
                className="text-slate-800 text-xs font-semibold hover:text-brand-600 transition-colors"
              >
                {t.nav.browsePlans}
              </a>
              <button 
                onClick={() => {
                  setSelectedPlan(lang === "ar" ? "مستشار ERP" : "ERP Consultant");
                  window.location.assign(APP_TRIAL_URL);
                }}
                className="bg-brand-600 text-white hover:bg-brand-500 font-semibold px-4 py-2 rounded-lg text-xs transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
              >
                {t.nav.freeConsultation}
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeSwitcher />
              <LanguageSwitcher />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-700 hover:text-brand-600 p-2 focus:outline-none"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              key="mobile-nav-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-4 text-start">
                <a 
                  href="#why-us" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-700 font-medium py-2 hover:bg-slate-50 rounded-lg px-2"
                >
                  {t.nav.whyUs}
                </a>
                <a 
                  href="#features" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-700 font-medium py-2 hover:bg-slate-50 rounded-lg px-2"
                >
                  {t.nav.features}
                </a>
                <a 
                  href="#deployment" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-700 font-medium py-2 hover:bg-slate-50 rounded-lg px-2"
                >
                  {t.nav.deployment}
                </a>
                <a 
                  href="#roi-calculator" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-700 font-medium py-2 hover:bg-slate-50 rounded-lg px-2"
                >
                  {t.nav.roi}
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-700 font-medium py-2 hover:bg-slate-50 rounded-lg px-2"
                >
                  {t.nav.pricing}
                </a>
                <a 
                  href="#faqs" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-700 font-medium py-2 hover:bg-slate-50 rounded-lg px-2"
                >
                  {t.nav.faqs}
                </a>
                <div className="pt-2 flex flex-col gap-3">
                  <a
                    href={APP_LOGIN_URL}
                    className="w-full border border-slate-200 text-slate-800 hover:bg-slate-50 font-medium py-3 rounded-lg text-center transition-all"
                  >
                    {t.nav.signIn}
                  </a>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSelectedPlan(lang === "ar" ? "المستشار السريع" : "Quick Consultant");
                      window.location.assign(APP_TRIAL_URL);
                    }}
                    className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 shadow-md shadow-brand-500/10 transition-all cursor-pointer"
                  >
                    {lang === "ar" ? "اطلب استشارة مجانية الآن" : "Request Free Consultation Now"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION - Sells the outcome, not just software */}
      <motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-white border-b border-slate-200 relative overflow-hidden">
        
        {/* Subtle Background Art */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-10 right-20 w-44 h-44 bg-brand-500/5 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Copywriter Text Column */}
            <div className="lg:col-span-7 flex flex-col text-start">
              {/* Trust Badge */}
              <div className="inline-flex self-start items-center gap-1.5 bg-brand-50/80 border border-brand-200/20 text-brand-800 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>{t.hero.badge}</span>
              </div>

              {/* Real World-Class Headline (Sells the ultimate business outcome: control, anti-theft, ROI) */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight mb-4 text-start">
                {t.hero.title} <span className="text-brand-500">{t.hero.titleHighlight}</span>
              </h1>

              {/* Bullet proof Sub-headline */}
              <p className="my-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl text-start">
                {t.hero.desc} <strong className="text-slate-900">{t.hero.descHighlight}</strong>
              </p>

              {/* Special Premium Service: Customer Driven Development */}
              <div className={`mt-6 mb-2 text-sm sm:text-base leading-relaxed max-w-2xl bg-gradient-to-r ${lang === 'ar' ? 'from-indigo-50/80 to-white border-r-4' : 'from-indigo-50/80 to-white border-l-4'} border-indigo-500 p-5 rounded-lg shadow-sm text-start`}>
                <h4 className="font-display font-bold text-indigo-900 mb-2">
                  {lang === "ar" ? "نظام متطور يتشكل حسب احتياجاتك" : "An Evolving System Shaped by Your Needs"}
                </h4>
                <p className="text-slate-700 font-medium">
                  {lang === "ar" 
                    ? "نحن لا نبيع مجرد برمجيات؛ بل نبني شراكات. إذا كان عملك يتطلب ميزة فريدة للنجاح، فإن فريقنا يستمع، يطور، ويدمجها في النظام الأساسي. Z Systems تنمو جنباً إلى جنب مع عملك، لضمان حصولك دائماً على الأدوات الدقيقة التي يتطلبها قطاعك."
                    : "We don’t just sell software; we build partnerships. If your business requires a unique feature to succeed, our team listens, develops, and integrates it into the core system. Z Systems grows alongside your business, ensuring you always have the exact tools your industry demands."
                  }
                </p>
              </div>

              {/* Bold Proof Metrics / Benefits */}
              <div className="mt-8 grid grid-cols-3 gap-2 border-y border-slate-200/50 py-5">
                <div className="text-center px-1">
                  <span className="block text-xl sm:text-2xl font-black text-brand-600 font-mono tracking-tight">%96+</span>
                  <span className="block mt-1 text-[11px] sm:text-xs text-slate-600 font-medium">{t.hero.metrics[0].label}</span>
                </div>
                <div className={`px-2 sm:px-4 text-center border-slate-200 ${lang === 'ar' ? 'border-r' : 'border-l'}`}>
                  <span className="block text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight">Zero</span>
                  <span className="block mt-1 text-[11px] sm:text-xs text-slate-600 font-medium">{t.hero.metrics[1].label}</span>
                </div>
                <div className={`px-2 sm:px-4 text-center border-slate-200 ${lang === 'ar' ? 'border-r' : 'border-l'}`}>
                  <span className="block text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight">15 Min</span>
                  <span className="block mt-1 text-[11px] sm:text-xs text-slate-600 font-medium">{t.hero.metrics[2].label}</span>
                </div>
              </div>

              {/* Highly Convincing Lead Capture Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-start">
                <button
                  onClick={() => {
                    setSelectedPlan(lang === "ar" ? "التجربة الكاملة" : "Full Experience");
                    window.location.assign(APP_TRIAL_URL);
                  }}
                  className="bg-brand-600 text-white hover:bg-brand-500 font-semibold px-6 py-3 rounded-lg text-xs transition-all duration-300 shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <a
                  href="#pricing"
                  className="bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 font-semibold px-6 py-3 rounded-lg text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{t.hero.ctaSecondary}</span>
                </a>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-400">
                <span className="w-1.2 h-1.2 bg-brand-500 rounded-full animate-ping" />
                <span>{t.hero.supportText}</span>
              </div>
            </div>

            {/* Simulated Live Executive Dashboard Preview (Instead of heavy/static image) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-y-0 right-1/2 -translate-x-12 w-[110%] h-[110%] bg-gradient-to-tr from-slate-200/20 to-teal-50/10 rounded-3xl blur-2xl pointer-events-none -z-10" />
              
              <div className="bg-slate-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-start leading-none max-w-md mx-auto">
                {/* Simulated App Header */}
                <div className="bg-slate-900 text-slate-100 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                    <span className="font-mono text-xs text-slate-100 font-medium">Z Systems : LIVE SYSTEM V4.9</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  </div>
                </div>

                {/* Simulated Stat Mini widgets */}
                <div className="p-4 bg-slate-50 border-b border-slate-100 grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-600 font-medium">{lang === "ar" ? "مبيعات الوردية الحالية" : "Current Shift Sales"}</span>
                    <span className="text-lg font-bold text-slate-900 font-mono tracking-tight mt-1.5">+{(14840.50 * currency.rateFromSAR).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs text-slate-600">{currencySymbol}</span></span>
                    <span className="text-[9px] text-brand-600 mt-1 flex items-center gap-0.5 font-medium">{lang === "ar" ? "١٠٠٪ مطابقة نقدية بنهاية الوردية" : "100% Cash Match at Shift End"}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-600 font-medium">{lang === "ar" ? "عجز الجرد المالي" : "Financial Inventory Deficit"}</span>
                    <span className="text-lg font-bold text-rose-600 font-mono tracking-tight mt-1.5">0.00 <span className="text-xs text-slate-600">{currencySymbol}</span></span>
                    <span className="text-[9px] text-brand-600 mt-1 flex items-center gap-0.5 font-medium">{lang === "ar" ? "تنبيهات جردية حقيقية" : "Real Inventory Alerts"}</span>
                  </div>
                </div>

                {/* Fake visual charts list */}
                <div className="p-4 space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">{lang === "ar" ? "مراقبة الفروع والتدقيق اللحظي" : "Branch Monitoring & Real-time Audit"}</span>
                    <span className="text-brand-600 font-medium flex items-center gap-1">{lang === "ar" ? "سجل تدقيق نشط" : "Active Audit Log"} <span className="w-2 h-2 rounded-full bg-brand-500 inline-block animate-pulse" /></span>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-slate-50 p-2.5 rounded-lg text-xs flex justify-between items-center border-l-2 border-brand-500">
                      <div>
                        <span className="font-semibold text-slate-800">{lang === "ar" ? "فاتورة مبيعات #4928" : "Sales Invoice #4928"}</span>
                        <p className="text-[10px] text-slate-600 mt-0.5">
                          {currencyCode === "EGP"
                            ? (lang === "ar" ? "بواسطة: كاشير (أحمد محمود) - فرع القاهرة الأول" : "By: Cashier (Ahmed Mahmoud) - Cairo Branch 1")
                            : (lang === "ar" ? "بواسطة: كاشير (سلمان العتيبي) - فرع الرياض الأول" : "By: Cashier (Salman Al-Otaibi) - Riyadh Branch 1")
                          }
                        </p>
                      </div>
                      <span className="font-mono bg-brand-100 text-brand-800 text-[10px] px-1.5 py-0.5 rounded font-bold">+{Math.round(280 * currency.rateFromSAR).toLocaleString()} {currencySymbol}</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg text-xs flex justify-between items-center border-l-2 border-rose-500">
                      <div>
                        <span className="font-semibold text-slate-800">{lang === "ar" ? "حظر محاولة إلغاء صنف يدوي" : "Blocked Attempt to Void Item Manually"}</span>
                        <p className="text-[10px] text-slate-600 mt-0.5">{lang === "ar" ? "المنتج: (شاحن جداري 45w) - يتطلب رمز المدير" : "Product: (Wall Charger 45w) - Requires Manager Code"}</p>
                      </div>
                      <span className="font-mono bg-rose-50 text-rose-700 text-[10px] px-1.5 py-0.5 rounded font-medium">{lang === "ar" ? "تم الحظر والتدوين" : "Blocked & Logged"}</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg text-xs flex justify-between items-center border-l-2 border-brand-500">
                      <div>
                        <span className="font-semibold text-slate-800">{lang === "ar" ? "تحويل مخزني تلقائي ناجح" : "Successful Auto Stock Transfer"}</span>
                        <p className="text-[10px] text-slate-600 mt-0.5">
                          {currencyCode === "EGP"
                            ? (lang === "ar" ? "من: مستودع العاشر من رمضان إلى فرع المعادي" : "From: 10th of Ramadan WH To: Maadi Branch")
                            : (lang === "ar" ? "من: مستودع السلي إلى فرع جدة حى الصفا" : "From: Sulay Warehouse To: Jeddah Safa Branch")
                          }
                        </p>
                      </div>
                      <span className="font-mono bg-brand-50 text-brand-800 text-[10px] px-1.5 py-0.5 rounded font-medium">{lang === "ar" ? "٥٠ قطعة" : "50 Pieces"}</span>
                    </div>
                  </div>

                  {/* Trust highlight block */}
                  <div className="mt-4 bg-brand-50/70 p-3 rounded-xl border border-brand-100/60 flex items-start gap-2.5">
                    <span className="text-xl">🏆</span>
                    <div>
                      <p className="font-bold text-xs text-brand-950">{lang === "ar" ? "قوة الرقابة والتحصيل في يدك" : "The Power of Control & Collection in Your Hand"}</p>
                      <p className="text-[10px] text-brand-800 h-auto leading-relaxed mt-1">{lang === "ar" ? "تتبع التدفق المالي لكل فرع بدقة دون الاعتماد على التقارير اليدوية غير الدقيقة." : "Track financial flow for each branch accurately without relying on inaccurate manual reports."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* TRUST BANNER - Client Logos */}
      <section className="py-12 border-b border-slate-200 bg-slate-50 overflow-hidden flex flex-col items-center">
        <p className="text-center text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-8">
          {lang === "ar" ? "أكثر من 5,000+ شركة من مختلف القطاعات تثق بنا" : "Over 5,000+ companies from all sectors trust us"}
        </p>

        <div className="w-full max-w-[100vw] overflow-hidden flex flex-col gap-8 relative mask-image-linear-gradient">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Row 1 */}
          <div className="flex w-full overflow-hidden pause-on-hover">
            <div className="flex shrink-0 min-w-full animate-marquee gap-8 sm:gap-14 md:gap-20 items-center justify-around opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
               {[
                  { name: "Healthy Box", icon: <Utensils className="w-6 h-6 text-emerald-500" /> },
                  { name: "Howa Kida", icon: <Smile className="w-6 h-6 text-rose-500" /> },
                  { name: "Kids Town", icon: <Star className="w-6 h-6 text-amber-500" /> },
                  { name: "Dose Spot", icon: <Coffee className="w-6 h-6 text-amber-700" /> },
                  { name: "Quanta Egypt", icon: <Activity className="w-6 h-6 text-blue-500" /> },
                  { name: "Sandwicha", icon: <Pizza className="w-6 h-6 text-orange-500" /> },
                  { name: "Rouh Beirut", icon: <UtensilsCrossed className="w-6 h-6 text-teal-500" /> }
               ].map((c) => (
                  <div key={`client-r1a-${c.name}`} className="flex items-center gap-2 font-display font-black text-xl text-slate-800 whitespace-nowrap shrink-0">
                    {c.icon} {c.name}
                  </div>
               ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 min-w-full animate-marquee gap-8 sm:gap-14 md:gap-20 items-center justify-around opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
               {[
                  { name: "Healthy Box", icon: <Utensils className="w-6 h-6 text-emerald-500" /> },
                  { name: "Howa Kida", icon: <Smile className="w-6 h-6 text-rose-500" /> },
                  { name: "Kids Town", icon: <Star className="w-6 h-6 text-amber-500" /> },
                  { name: "Dose Spot", icon: <Coffee className="w-6 h-6 text-amber-700" /> },
                  { name: "Quanta Egypt", icon: <Activity className="w-6 h-6 text-blue-500" /> },
                  { name: "Sandwicha", icon: <Pizza className="w-6 h-6 text-orange-500" /> },
                  { name: "Rouh Beirut", icon: <UtensilsCrossed className="w-6 h-6 text-teal-500" /> }
               ].map((c) => (
                  <div key={`client-r1b-${c.name}`} className="flex items-center gap-2 font-display font-black text-xl text-slate-800 whitespace-nowrap shrink-0">
                    {c.icon} {c.name}
                  </div>
               ))}
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="flex w-full overflow-hidden pause-on-hover">
            <div className="flex shrink-0 min-w-full animate-marquee-reverse gap-8 sm:gap-14 md:gap-20 items-center justify-around opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
              {[
                { name: "Chikadoo", icon: <Bird className="w-6 h-6 text-amber-500" /> },
                { name: "Baba Batata", icon: <Carrot className="w-6 h-6 text-orange-600" /> },
                { name: "Bab Aloush", icon: <Store className="w-6 h-6 text-slate-500" /> },
                { name: "Auto Samir Rayan", icon: <Car className="w-6 h-6 text-blue-600" /> },
                { name: "Al.Keif Keda", icon: <Coffee className="w-6 h-6 text-amber-800" /> },
                { name: "Al Masif Park", icon: <Sun className="w-6 h-6 text-yellow-500" /> },
                { name: "Abaza Auto", icon: <CarFront className="w-6 h-6 text-slate-700" /> }
              ].map((c) => (
                  <div key={`client-r2a-${c.name}`} className="flex items-center gap-2 font-display font-black text-xl text-slate-800 whitespace-nowrap shrink-0">
                    {c.icon} {c.name}
                  </div>
               ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 min-w-full animate-marquee-reverse gap-8 sm:gap-14 md:gap-20 items-center justify-around opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
              {[
                { name: "Chikadoo", icon: <Bird className="w-6 h-6 text-amber-500" /> },
                { name: "Baba Batata", icon: <Carrot className="w-6 h-6 text-orange-600" /> },
                { name: "Bab Aloush", icon: <Store className="w-6 h-6 text-slate-500" /> },
                { name: "Auto Samir Rayan", icon: <Car className="w-6 h-6 text-blue-600" /> },
                { name: "Al.Keif Keda", icon: <Coffee className="w-6 h-6 text-amber-800" /> },
                { name: "Al Masif Park", icon: <Sun className="w-6 h-6 text-yellow-500" /> },
                { name: "Abaza Auto", icon: <CarFront className="w-6 h-6 text-slate-700" /> }
              ].map((c) => (
                  <div key={`client-r2b-${c.name}`} className="flex items-center gap-2 font-display font-black text-xl text-slate-800 whitespace-nowrap shrink-0">
                    {c.icon} {c.name}
                  </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS AND COGNITIVE SOLUTION */}
      <motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} id="why-us" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-brand-600 font-bold text-xs tracking-widest uppercase font-mono">{lang === "ar" ? "معضلة الإدارة وهدر الموارد" : "The Core Management Dilemma & Resource Waste"}</h2>
            <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-normal">
              {lang === "ar" ? "ما دمت لا تملك رؤية رقمية صارمة، فأنت تؤسس للخسارة!" : "Without strict digital vision, you are establishing a culture of loss!"}
            </p>
            <p className="mt-3 text-slate-600 text-xs sm:text-sm">
              {lang === "ar" ? "هل تنام بسلام وأنت لا تدري ما إذا كان صندوق الكاشير يطابق ما تم بيعه حقاً؟ إليك الكوابيس التي ننهيها تماماً في دورتنا المحاسبية:" : "Do you sleep peacefully not knowing if the cash drawer matches the actual sales? Here are the nightmares we end completely:"}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentProblemStmts.map((item, index) => (
              <div 
                key={`problem-${index}`}
                className="bg-white p-7 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/ transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center mb-6">
                    {index === 0 && <Boxes className="w-5 h-5 text-rose-600" />}
                    {index === 1 && <ShieldAlert className="w-5 h-5 text-rose-600" />}
                    {index === 2 && <WifiOff className="w-5 h-5 text-rose-600" />}
                  </div>
                  <h3 className="font-display font-black text-lg text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">{item.desc}</p>
                </div>
                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <span className="text-[11px] font-bold text-brand-600 flex items-center gap-1">
                    {lang === "ar" ? "كيف يحل Z Systems هذه المشكلة؟" : "How does Z Systems solve this?"} <ArrowLeft className="w-3.5 h-3.5 me-auto" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Social outcome box */}
          <div className="mt-12 bg-brand-50 text-slate-900 rounded-xl p-8 lg:p-10 relative overflow-hidden border border-slate-200 shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-start">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono font-bold text-brand-500 tracking-wider block mb-2">{lang === "ar" ? "حماية متكاملة لعملياتك اليومية" : "Complete Protection for Your Daily Operations"}</span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-brand-800 leading-normal">
                  {lang === "ar" ? "كيف يقضي نظام Z Systems على كوابيس التشغيل ويحولها لتدفقات أرباح؟" : "How Z Systems eliminates operational nightmares & creates profit streams?"}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                  {lang === "ar" ? "ربطنا الكاشير بالمستودع تلقائياً، والورديات بالدفاتر الأساسية، ووضعنا صلاحيات تدقيق ذكية للمدير تمنع تمرير أي خصم أو تعديل دون علمه. النتيجة: تطابق مالي بنسبة 100% وحماية كاملة لثمرة كفاحك." : "We linked the POS to the warehouse automatically, and shifts to general ledgers, enforcing smart audit controls for the manager. Result: 100% financial match and complete protection for your efforts."}
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <button
                  onClick={() => {
                    setSelectedPlan(lang === "ar" ? "العرض الكامل" : "Full Offer");
                    window.location.assign(APP_TRIAL_URL);
                  }}
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3.5 rounded-lg text-xs transition-colors flex items-center gap-2 shadow-lg shadow-brand-600/20 cursor-pointer"
                >
                  <span>{lang === "ar" ? "أريد جولة استعراضية تجريبية" : "I want a demo tour"}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      <SystemGallery lang={lang} />

      {/* SYSTEM CAPABILITIES SECTION - TABBED EXPERIENCE TO SHOW INTENT AND DETAIL */}
      <motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} id="features" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-600 font-bold text-xs tracking-widest uppercase font-mono bg-brand-50 px-3 py-1.5 rounded-full">{lang === "ar" ? "نظرة شاملة على ميزات النظام" : "Comprehensive Overview of System Features"}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-normal">
              {lang === "ar" ? "جدار حماية إداري ومحاسبي كامل لنشاطك" : "Complete administrative and accounting firewall for your business"}
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm">
              {lang === "ar" ? "جميع عناصر ووحدات برنامجنا تم تصميمها وصياغتها لتكون خادماً أميناً وخبيراً مالياً للـ CEO وصاحب العمل. حدد الوحدة لمشاهدة تفاصيل الميزات والفوائد:" : "All components and modules of our software are designed to be a faithful servant and financial expert for the CEO and business owner. Select a module to view features and benefits:"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Desktop Navigation Tabs Column (Left on RTL, acts as side selection) */}
            <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24">
              {currentErpCats.map((cat) => {
                const isSelected = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`w-full text-start p-4 rounded-lg transition-all flex items-center justify-between border cursor-pointer ${
                      isSelected 
                        ? "bg-white border-slate-300 text-slate-900 shadow-md font-bold" 
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                        isSelected ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}>
                        {getIcon(cat.iconName, "w-4 h-4")}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm tracking-tight">{cat.title}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-1 h-5 bg-brand-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content Details Display Column */}
            <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-sm min-h-[480px]">
              {currentErpCats.map((cat) => {
                if (cat.id !== activeTab) return null;
                return (
                  <div key={cat.id} className="space-y-6">
                    {/* Active tab header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-100 gap-4">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                          {getIcon(cat.iconName, "w-6 h-6 text-brand-600")}
                          {cat.title}
                        </h3>
                        <p className="text-slate-600 text-sm mt-1">{cat.shortDesc}</p>
                      </div>
                      <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md font-bold tracking-wider font-mono uppercase">
                        {cat.id}_MODULE_SECURE
                      </span>
                    </div>

                    {/* Highly Interactive Feature Simulator on POS component */}
                    {cat.id === "pos" && (
                      <div className="my-4 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[460px] text-slate-800 font-sans  text-start">
                        
                        {/* Fake Sidebar */}
                        <div className="hidden md:flex w-52 bg-slate-100 border-l border-slate-200 p-4 flex-col gap-2 shrink-0">
                          <div className="flex items-center gap-2 mb-6">
                            <img src="/logo.png" alt="Z Systems" className="h-8 w-auto object-contain drop-shadow-sm" />
                            <div className="flex flex-col">
                              <span className="font-black text-[13px] text-slate-900 tracking-tight leading-none mb-0.5">Z Systems</span>
                              <span className="text-[9px] text-slate-600 font-medium">{lang === "ar" ? "إدارة المبيعات والمخزون" : "Sales and Inventory Management"}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 text-[11px] font-bold hover:bg-slate-300 transition-colors cursor-pointer"><MonitorCheck className="w-3.5 h-3.5" /> {lang === "ar" ? "الرئيسية" : "Dashboard"}</div>
                            <div className="flex items-center gap-2.5 px-3 py-2 border border-brand-200 bg-white shadow-sm rounded-lg text-brand-600 font-bold text-[11px] relative"><Calculator className="w-3.5 h-3.5 text-brand-600" /> {lang === "ar" ? "نقطة البيع" : "Point of Sale"} <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-brand-600 rounded-r-md" /></div>
                            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 text-[11px] font-bold hover:bg-slate-300 transition-colors cursor-pointer"><Clock className="w-3.5 h-3.5" /> {lang === "ar" ? "وردية نقطة البيع" : "Point of Sale Shift"}</div>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between px-3 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-slate-600 text-[10px] font-bold cursor-pointer"><span className="flex items-center gap-2"><Boxes className="w-3.5 h-3.5 text-brand-500" /> {lang === "ar" ? "المبيعات" : "Sales"}</span> <ChevronDown className="w-3 h-3" /></div>
                            <div className="flex items-center justify-between px-3 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-slate-600 text-[10px] font-bold cursor-pointer"><span className="flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 text-teal-500" /> {lang === "ar" ? "المشتريات والموردين" : "Purchases & Suppliers"}</span> <ChevronDown className="w-3 h-3" /></div>
                            <div className="flex items-center justify-between px-3 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-slate-600 text-[10px] font-bold cursor-pointer"><span className="flex items-center gap-2"><Server className="w-3.5 h-3.5 text-brand-500" /> {lang === "ar" ? "المخزون والأصناف" : "Inventory & Items"}</span> <ChevronDown className="w-3 h-3" /></div>
                          </div>
                        </div>

                        {/* Main POS Interface */}
                        <div className="flex-1 flex flex-col bg-slate-50 w-full">
                          {/* Fake Header */}
                          <div className="bg-white border-b border-slate-200 p-2 md:p-3 flex items-center justify-between shadow-sm z-10">
                            <div className="flex items-center gap-3">
                              <span className="font-extrabold text-[13px] md:text-sm text-slate-800">{lang === "ar" ? "نقطة البيع" : "Point of Sale"}</span>
                              <div className="hidden md:flex gap-1.5">
                                <span className="bg-slate-50 text-slate-600 px-2 py-1.5 rounded text-[9px] border border-slate-200 cursor-pointer font-medium hover:bg-slate-100 transition">{lang === "ar" ? "إعادة طباعة آخر فاتورة" : "Reprint Last Invoice"}</span>
                                <span className="bg-slate-50 text-slate-600 px-2 py-1.5 rounded text-[9px] border border-slate-200 cursor-pointer font-medium hover:bg-slate-100 transition">{lang === "ar" ? "تعليق F4" : "Hold F4"}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                               <span className="bg-brand-600 text-white px-3 py-1.5 rounded text-[10px] font-bold border border-brand-600 shadow-sm">{lang === "ar" ? "الدفع نقدي" : "Cash Payment"}</span>
                               <span className="hidden md:flex bg-slate-50 text-slate-600 px-2 flex-col justify-center items-center py-1 rounded text-[9px] border border-slate-200 cursor-pointer"><span className="font-bold">{lang === "ar" ? "سكانر" : "Scanner"}</span></span>
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row flex-1 p-2 md:p-3 gap-3 h-[400px]">
                             {/* Left: Cart Area */}
                             <div className="w-full lg:w-1/2 bg-white rounded-lg border border-slate-200 shadow-[0_2px_8px_rgb(0,0,0,0.04)] flex flex-col overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-1.5 text-[10px]">
                                  {/* Table Header */}
                                  <div className="flex items-center bg-slate-50 border-b border-slate-100 p-2 font-bold text-slate-600 mb-1 rounded">
                                    <div className="w-5 md:w-6 text-center text-[9px] text-slate-400">{lang === "ar" ? "م" : "No."}</div>
                                    <div className="flex-1 pe-1">{lang === "ar" ? "الصنف" : "Item"}</div>
                                    <div className="w-16 md:w-20 text-center">{lang === "ar" ? "الكمية" : "Qty"}</div>
                                    <div className="w-12 md:w-14 text-center">{lang === "ar" ? "السعر" : "Price"}</div>
                                    <div className="w-12 md:w-16 text-center">{lang === "ar" ? "الإجمالي" : "Total"}</div>
                                    <div className="w-8 md:w-10 text-center text-[9px]">{lang === "ar" ? "حذف" : "Remove"}</div>
                                  </div>

                                  {posItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                                      <Boxes className="w-10 h-10 mb-3 opacity-20" />
                                      <p className="font-medium text-[11px]">{lang === "ar" ? "السلة فارغة" : "Cart is empty"}</p>
                                    </div>
                                  ) : (
                                    posItems.map((item, idx) => (
                                      <div key={item.id} className="flex items-center p-2 border-b border-slate-50 hover:bg-slate-100 transition-colors group">
                                        <div className="w-5 md:w-6 text-center bg-brand-100/50 text-brand-600 rounded-full h-5 md:h-6 flex items-center justify-center font-bold mb-auto">{idx + 1}</div>
                                        <div className="flex-1 px-1 pe-2">
                                          <div className="font-bold text-slate-800 line-clamp-1 leading-snug">{item.name}</div>
                                          <div className="text-[8px] text-slate-400 font-mono mt-0.5">#{1029301920 + item.id}</div>
                                        </div>
                                        <div className="w-16 md:w-20 text-center flex items-center justify-center gap-1.5">
                                          <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 bg-white border border-slate-200 shadow-sm rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-mono font-bold">-</button>
                                          <span className="w-4 text-center font-bold text-slate-700">{item.qty}</span>
                                          <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 bg-white border border-slate-200 shadow-sm rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-mono font-bold">+</button>
                                        </div>
                                        <div className="w-12 md:w-14 text-center text-slate-300 font-bold font-mono">{item.price}</div>
                                        <div className="w-12 md:w-16 text-center text-brand-600 font-extrabold font-mono">{item.price * item.qty}</div>
                                        <div className="w-8 md:w-10 text-center">
                                          <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-white border-none md:border md:border-red-200 bg-transparent md:bg-red-900/40 md:group-hover:bg-red-600 rounded p-1 md:py-1 md:px-2 transition-colors"><Trash2 className="w-3.5 h-3.5 md:hidden mx-auto" /><span className="hidden md:inline text-[9px] font-bold">{lang === "ar" ? "حذف" : "Remove"}</span></button>
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>
                                
                                {/* Totals & Actions */}
                                <div className="border-t border-slate-200 bg-white/80 p-2 md:p-3 text-xs shrink-0">
                                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 shadow-sm rounded-lg p-2 mb-2.5">
                                     <div className="text-center px-4 border-l border-slate-700">
                                      <span className="block text-[9px] text-slate-600 font-medium mb-0.5">{lang === "ar" ? "عدد القطع" : "Total items"}</span>
                                      <span className="font-bold text-slate-700">{posItems.reduce((acc, i) => acc+i.qty, 0)}</span>
                                     </div>
                                     <div className="text-center px-4 flex-1">
                                      <span className="block text-[9px] text-slate-600 font-medium mb-0.5">{lang === "ar" ? "المطلوب دفعه" : "Total to pay"}</span>
                                      <span className="font-black text-brand-600 text-base md:text-lg flex justify-center items-center gap-1 font-mono tracking-tight">{posTotal.toFixed(2)} <span className="text-[9px] text-brand-500 font-sans tracking-normal">{currencySymbol}</span></span>
                                     </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-2 md:py-2.5 rounded-lg text-[10px] md:text-[11px] transition-colors shadow-md shadow-brand-500/20 active:scale-95">{lang === "ar" ? "إتمام البيع F2" : "Complete F2"}</button>
                                    <button onClick={() => setPosItems([])} className="px-4 md:px-6 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-700 font-bold py-2 md:py-2.5 rounded-lg text-[10px] md:text-[11px] transition-colors active:scale-95">{lang === "ar" ? "تفريغ" : "Clear"}</button>
                                    <button 
                                      onClick={() => {
                                        if (posHoldStatus === "active") setPosHoldStatus("suspended");
                                        else setPosHoldStatus("resumed");
                                      }}
                                       className={`hidden md:block px-4 border font-bold py-2.5 rounded-lg text-[11px] transition-colors ${posHoldStatus === "suspended" ? "bg-amber-50 border-amber-300 text-amber-700 shadow-inner" : "bg-white border-slate-200 shadow-sm hover:bg-slate-50 text-slate-700 active:scale-95"}`}
                                    >
                                      {posHoldStatus === "suspended" ? (lang === "ar" ? "استعادة استئناف" : "Resume") : (lang === "ar" ? "تعليق F4" : "Hold F4")}
                                    </button>
                                  </div>
                                </div>
                             </div>

                             {/* Right: Products Area */}
                             <div className="w-full lg:w-1/2 flex flex-col h-full bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                                <div className="p-2 md:p-3 shrink-0">
                                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-1.5 md:p-2 mb-2 w-full max-w-sm mx-auto relative group">
                                    <input type="text" placeholder={lang === "ar" ? "ابحث بالباركود هنا أو اكتب الاسم..." : "Search by barcode or type name..."} className="w-full text-[10px] md:text-[11px] font-medium border-0 focus:ring-0 rounded p-1.5 pe-8 focus:outline-none bg-transparent" />
                                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 group-focus-within:text-brand-500 transition-colors" />
                                  </div>
                                  <div className="flex gap-2 text-[10px] md:text-[11px] max-w-sm mx-auto mb-2">
                                     <button className="flex-1 bg-brand-600 text-white rounded-md py-1.5 md:py-2 font-bold shadow-md shadow-brand-600/20">{lang === "ar" ? "قطاعي" : "Retail"}</button>
                                     <button className="flex-1 bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-slate-900 rounded-md py-1.5 md:py-2 font-bold transition-colors">{lang === "ar" ? "جملة" : "Wholesale"}</button>
                                  </div>
                                  <div className="flex justify-center gap-1 text-[9px] md:text-[10px] max-w-sm mx-auto mb-1">
                                     <button className="bg-brand-600 text-white rounded-full px-3 py-1 font-bold">{lang === "ar" ? "الكل" : "All"}</button>
                                     <button className="bg-white border border-slate-200 text-slate-600 rounded-full px-3 py-1 font-bold">{lang === "ar" ? "المفضلة" : "Favorites"}</button>
                                     <button className="bg-white border border-slate-200 text-slate-600 rounded-full px-3 py-1 font-bold">{lang === "ar" ? "آخر أستخدام" : "Recent"}</button>
                                  </div>
                                </div>

                                <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-2 gap-2 content-start p-2 border-t border-slate-200/50">
                                   {[
                                     {name: lang === "ar" ? "أرز ممتاز 5 كج" : "Premium Rice 5kg", price: currency.posProducts.rice, bc: "10283"},
                                     {name: lang === "ar" ? "عصير برتقال طازج 1لتر" : "Fresh Orange Juice 1L", price: currency.posProducts.juice, bc: "10284"},
                                     {name: lang === "ar" ? "مياه معدنية كرتون" : "Mineral Water Carton", price: currency.posProducts.water, bc: "10285"},
                                     {name: lang === "ar" ? "حليب كامل الدسم" : "Full Fat Milk", price: currency.posProducts.milk, bc: "10286"},
                                     {name: lang === "ar" ? "زيت ذرة 1.5 لتر" : "Corn Oil 1.5L", price: currency.posProducts.oil, bc: "10287"},
                                     {name: lang === "ar" ? "سكر ناعم 10 كج" : "Fine Sugar 10kg", price: currency.posProducts.sugar, bc: "10288"},
                                   ].map((prod) => (
                                     <div key={`pos-prod-${prod.bc}`} onClick={() => addSimulatedItem(prod.name, prod.price)} className="bg-white border border-slate-200 hover:border-brand-400 hover:shadow-md rounded-xl p-2.5 text-[10px] flex flex-col justify-between cursor-pointer relative group transition-all duration-200">
                                        <div className="flex justify-between items-start mb-2">
                                          <div className="bg-brand-50 text-brand-600 text-[8px] px-1.5 py-0.5 font-bold rounded-sm border border-brand-100">{lang === "ar" ? "مباشر" : "Direct"}</div>
                                          <span className="font-black text-brand-600 text-xs font-mono">{prod.price.toFixed(2)}</span>
                                        </div>
                                        <div className="font-bold text-slate-800 leading-snug">{prod.name}</div>
                                        <div className="text-[8px] text-slate-400 font-mono mt-1.5 flex justify-between items-center">
                                            <span>{lang === "ar" ? "باركود" : "Barcode"}: {prod.bc}</span>
                                            <span className="opacity-0 group-hover:opacity-100 text-brand-600 transition-opacity font-bold">{lang === "ar" ? "أضف الآن" : "Add Now"}</span>
                                        </div>
                                     </div>
                                   ))}
                                </div>
                             </div>
                          </div>
                        </div>
                        
                      </div>
                    )}

                    {/* Interactive Session/Shifts Simulator */}
                    {cat.id === "sessions" && (
                      <div className="my-4 bg-white text-slate-600 rounded-xl p-5 border border-slate-200 shadow-sm font-sans text-xs">
                        <p className="font-bold text-slate-800 text-sm mb-3">{lang === "ar" ? "🗄️ محاكي تصفية وجرد نهاية الوردية (Z-Report)" : "🗄️ Shift Z-Report Simulator"}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <p className="text-slate-600 font-medium text-[11px]">{lang === "ar" ? "بيانات الوردية الفعالة" : "Active Shift Data"}</p>
                            <p className="text-slate-800 font-bold text-xs mt-1">{lang === "ar" ? "رقم الوردية: #SHFT-093" : "Shift No: #SHFT-093"}</p>
                            <p className="text-slate-600 mt-1">{lang === "ar" ? "الموظف: سليمان البدر" : "Employee: Sulaiman Al-Bader"}</p>
                            <p className="text-slate-600 mt-2">{lang === "ar" ? "البداية: 08:30 ص / رصيد الافتتاح:" : "Start: 08:30 AM / Opening Balance:"} <strong className="text-slate-900">{currency.shift.opening.toLocaleString()} {currencySymbol}</strong></p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <p className="text-slate-600 font-medium text-[11px]">{lang === "ar" ? "إقرار المطبقات النقدية" : "Cash Match Confirmation"}</p>
                            <p className="text-brand-500 font-bold text-xs mt-1 flex items-center gap-1">
                              {lang === "ar" ? "✓ لا يوجد أي عجز مالي بالصندوق" : "✓ No financial deficit in drawer"}
                            </p>
                            <p className="text-slate-600 mt-1">{lang === "ar" ? "المدفوع الكاش المجرى:" : "Cash Paid Drawer:"} {currency.shift.cash.toLocaleString()} {currencySymbol}</p>
                            <p className="text-slate-500">{lang === "ar" ? `${currency.shift.networkAr}:` : `${currency.shift.networkEn}:`} {currency.shift.card.toLocaleString()} {currencySymbol}</p>
                          </div>
                        </div>
                        <div className="mt-4 p-2 bg-brand-950/20 border border-brand-900/30 text-brand-500 rounded text-[11px]">
                          {lang === "ar" ? "✓ مطابقة الكاش تتم تصفيتها رقمياً فور تسليم الوردية للمدير آلياً، وتصدر قيود محاسبية تلقائية في دفتر الإغلاق المزدوج." : "✓ Cash match is digitally cleared upon shift handover to manager, automatically generating double-entry ledger entries."}
                        </div>
                      </div>
                    )}

                    {/* Deep Feature list with business impacts (The requested features) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {cat.features.map((feat, idx) => (
                        <div 
                          key={`cat-${cat.id}-feat-${idx}`}
                          className="p-4 rounded border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mt-0.5 shrink-0">
                              <Check className="w-3 h-3 text-emerald-500" />
                            </div>
                            <div className="flex flex-col text-start">
                              <h4 className="font-bold text-xs sm:text-sm text-slate-900">{feat.name}</h4>
                              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{feat.desc}</p>
                              <p className="text-[10px] text-brand-800 font-bold mt-1 bg-white border border-brand-100 shadow-sm self-start px-3 py-1 rounded font-mono">
                                {lang === "ar" ? "العائد المباشر:" : "Direct Return:"} {feat.benefit}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Final reassurance */}
                    <div className="bg-slate-50 rounded p-4 flex flex-col sm:flex-row items-center justify-between border border-slate-200 mt-6 gap-3">
                      <p className="text-xs text-slate-600 text-center sm:text-start">
                        {lang === "ar" ? "أثق في الكفاءة والسرعة التامة. هذه الوحدات مترابطة وتوفر %20 من الجهد الإداري ككل." : "I trust the complete efficiency and speed. These cohesive modules save 20% of overall administrative effort."}
                      </p>
                      <button 
                        onClick={() => {
                          setSelectedPlan(lang === "ar" ? `تفاصيل ${cat.title}` : `Details ${cat.title}`);
                          window.location.assign(APP_TRIAL_URL);
                        }}
                        className="text-xs bg-white border border-brand-200 hover:bg-brand-50 hover:border-brand-300 text-brand-800 shadow-sm font-bold px-4 py-2.5 rounded transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {lang === "ar" ? "اطلب استعراضا حيا لهذه الوحدة" : "Request a Live Demo for this Module"}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </motion.section>

      {/* SMART AI ASSISTANT SECTION (Like Competitor) */}
      <motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} id="ai-assistant" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div>
                <div className="inline-flex items-center justify-center gap-1.5 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 px-3 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider mb-6">
                  {lang === "ar" ? "يعمل بالذكاء الاصطناعي" : "AI-Powered"}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-6 leading-[1.1]">
                  {lang === "ar" ? "ZAD AI — مساعدك الذكي عبر الواتساب والنظام" : "ZAD AI — Your Smart Assistant via WhatsApp & System"}
                </h2>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
                  {lang === "ar" 
                    ? "اسأل باللغة العربية أو الإنجليزية. يمكنه توليد التقارير، تحليل حركات البيع، وإدارة مهامك اليومية بسرعة — سواء من داخل النظام أو مباشرة من خلال تطبيق الواتساب الخاص بك." 
                    : "Ask in Arabic or English. It can generate reports, analyze sales data, and help you get things done faster — from inside the system or directly via your WhatsApp app."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-start">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 text-indigo-400">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-bold mb-1">{lang === "ar" ? "اسأل بلغتك" : "Ask in Your Language"}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{lang === "ar" ? "ZAD AI يفهم السياق ويجيب باستخدام بيانات عملك الحقيقية. اكتب أو تحدث بلغتك." : "ZAD AI understands context and answers using your actual business data. Type or speak."}</p>
                  </div>
                  <div>
                     <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 text-indigo-400">
                      <Search className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-bold mb-1">{lang === "ar" ? "تقارير وتحليلات صوتية" : "Voice & Analytical Reports"}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{lang === "ar" ? "أرسل رسالة صوتية ليحلل لك بيانات المبيعات أو يقوم بجرد الباركود المعقد تلقائياً." : "Send a voice note to analyze sales data or perform complex barcode counts automatically."}</p>
                  </div>
                  <div>
                     <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 text-indigo-400">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-bold mb-1">{lang === "ar" ? "تنبيهات استباقية" : "Smart Alerts"}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{lang === "ar" ? "احصل على تنبيهات بوصول الأصناف للحد الأدنى، والفواتير المتأخرة الدفع." : "Get notified about overdue invoices, low stock levels, and expiring quotations."}</p>
                  </div>
                </div>
             </div>

             {/* AI Assistant WhatsApp Interactive Mockup */}
             <div className="relative flex justify-center md:justify-end">
                <WhatsAppSimulation lang={lang} />
             </div>
          </div>
        </div>
      </motion.section>

      {/* UNIQUE ADVANTAGE - DEPLOYMENT EXCELLENCE */}
      <motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} id="deployment" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200 relative">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-600 font-bold text-xs tracking-widest uppercase font-mono bg-brand-50 px-3 py-1.5 rounded-full inline-block">{lang === "ar" ? "أكبر ميزة تنافسية وحصرية لـ Z Systems" : "The biggest exclusive competitive advantage of Z Systems"}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-normal">
              {lang === "ar" ? "وضع التشغيل المناسب لسرّية عملك وموقعك الفعلي" : "Operation mode suited for your business privacy and actual location"}
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm">
              {lang === "ar" ? "هل تفضّل مرونة السحابة والتحكم الجغرافي الواسع؟ أم حماية بياناتك محلياً بشكل تمليك مدى الحياة بدون إنترنت ودون اشتراكات؟ نحن النظام الوحيد الذي يقدم لك الحلين بنفس الكفاءة وقابلان للتحويل:" : "Do you prefer Cloud flexibility and wide geo-control? Or local offline lifetime ownership without internet and subscriptions? We are the only system providing both solutions with the same efficiency and convertibility:"}
            </p>
          </div>

          {/* Connected/Disconnected Interactive Experience to show offline portability */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg max-w-2xl mx-auto mb-12 flex flex-col justify-between items-center gap-4 text-center">
            <div>
              <p className="text-[10px] font-bold text-[#2b3a4f] uppercase tracking-wider font-mono">{lang === "ar" ? "🔌 محاكي حالة الإرسال والـ Offline للشبكة" : "🔌 Network Offline Simulator Tracker"}</p>
              <h3 className="text-xs font-bold text-slate-800 mt-1">{lang === "ar" ? "تأكد بنفسك كيف يتصرف نظامنا بحال انقطاع الإنترنت التام:" : "See for yourself how our system behaves under complete internet outage:"}</h3>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setSimulatedOnline(true)}
                className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  simulatedOnline 
                    ? "bg-brand-600 text-white shadow-md shadow-brand-500/20" 
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-ping" />
                {lang === "ar" ? "متصل بالشبكة (الوضع السحابي)" : "Online (Cloud SaaS Mode)"}
              </button>
              <button
                onClick={() => setSimulatedOnline(false)}
                className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  !simulatedOnline 
                    ? "bg-amber-600 text-white shadow-md shadow-amber-500/15" 
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-305" />
                {lang === "ar" ? "منقطع الإنترنت (وضع التمليك المحلي)" : "Offline (Local Lifetime Mode)"}
              </button>
            </div>

            <div className="mt-2 text-xs">
              {simulatedOnline ? (
                <div className="bg-brand-50/70 text-brand-900 border border-brand-200 p-4 rounded-lg leading-relaxed text-xs">
                  {lang === "ar" ? (
                    <><strong>الوضع السحابي الفعّال:</strong> بيانات مبيعات الفروع تترحل فورياً لدفتر الأستاذ العام وتستطيع تصفح تقارير الأرباح والخسائر وهامش الربح الفعلي حالياً من جوالك مباشرة بسهولة وأمان تام.</>
                  ) : (
                    <><strong>Effective Cloud Mode:</strong> Branch sales data is instantly posted to the general ledger, and you can securely browse P&L and net margin reports live from your phone.</>
                  )}
                </div>
              ) : (
                <div className="bg-amber-50/70 text-amber-900 border border-amber-150 p-4 rounded-lg leading-relaxed text-xs">
                  {lang === "ar" ? (
                    <><strong>الوضع المحلي المستقل والآمن:</strong> حتى بجهاز كمبيوتر معزول تماماً عن كوكب الأرض، كاشيرك يسجل مبيعاته بكل دلالة ويسحب الباركود ويطبع الفاتورة الضريبية وتصدر القيود المحاسبية وتتراكم القواعد بلا أي حاجة لخط إنترنت واحد وبأقصى سرعة ممكنة!</>
                  ) : (
                    <><strong>Secure Offline Mode:</strong> Even on an isolated PC, your cashier can record sales, scan barcodes, print tax invoices & issue accounting entries perfectly without any internet connection at maximum speed!</>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {currentDeploymentModes.map((mode, i) => (
              <div 
                key={`deploy-${i}`} 
                className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  i === 1 
                    ? "bg-white text-slate-900 border-brand-500 shadow-2xl ring-1 ring-brand-500" 
                    : "bg-slate-50 text-slate-900 border-slate-200/70"
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                    i === 1 ? "bg-brand-500/10 text-brand-500" : "bg-brand-50 text-brand-600"
                  }`}>
                    {getIcon(mode.icon, "w-6 h-6")}
                  </div>
                  
                  <h3 className={`font-display font-extrabold text-2xl mb-4 ${
                    "text-slate-900"
                  }`}>
                    {mode.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed mb-8 ${
                    "text-slate-600"
                  }`}>
                    {mode.desc}
                  </p>

                  <div className="border-t border-slate-200/10 pt-6 mb-8">
                    <p className={`text-xs font-bold tracking-wider uppercase mb-4 ${
                      i === 1 ? "text-brand-500" : "text-brand-600"
                    }`}>
                      {lang === "ar" ? "العناصر الركيزة في هذا النمط:" : "Core Pillars in this Mode:"}
                    </p>
                    <ul className="space-y-3.5">
                      {mode.highlights.map((high, hIdx) => (
                        <li key={`deploy-mode-${i}-high-${hIdx}`} className="flex items-start gap-2.5 text-xs">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            i === 1 ? "bg-brand-400" : "bg-brand-500"
                          }`} />
                          <span className={"text-slate-700 font-normal"}>{high}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(mode.title);
                    window.location.assign(APP_TRIAL_URL);
                  }}
                  className={`w-full py-3.5 rounded-xl text-center text-xs font-bold transition-all ${
                    i === 1 
                      ? "bg-brand-600 hover:bg-brand-500 text-white shadow-xl shadow-brand-500/10" 
                      : "bg-slate-100 hover:bg-slate-300 text-slate-800 font-medium"
                  }`}
                >
                  {mode.cta}
                </button>
              </div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* INTERACTIVE ROI & PLAN CALCULATOR WIDGET */}
      <motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} id="roi-calculator" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-brand-600 font-bold text-xs tracking-widest uppercase font-mono bg-brand-50 px-3 py-1.5 rounded-full inline-block">{lang === "ar" ? "حاسبة العائد على الاستثمار الرقابي المالي" : "Financial Auditing ROI Calculator"}</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-normal">
              {lang === "ar" ? "احسب مقدار التوفير المالي السنوي وحظر التسريبات لنشاطك" : "Calculate your annual financial savings and blocked leaks"}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
              {lang === "ar" ? "استخدم خيارات حركتك الاستثمارية لتكتشف الباقة الملائمة وحجم فجوات الأرباح التي يوقفها البرنامج عنك سنوياً:" : "Use your investment movement options to discover the appropriate plan and the size of profit gaps the program stops for you annually:"}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-sm text-start grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Input range blocks */}
            <div className="md:col-span-7 space-y-6 flex flex-col justify-center">
              {/* Branches count */}
              <div>
                <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                  <span>{lang === "ar" ? "كم عدد الفروع أو مستودعاتك المغطاة؟" : "How many branches or warehouses are covered?"}</span>
                  <span className="font-mono text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded text-xs">{numBranches} {lang === "ar" ? "فروع" : "Branches"}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  value={numBranches}
                  onChange={(e) => setNumBranches(Number(e.target.value))}
                  className="w-full accent-brand-600 h-1.5 bg-slate-100 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-medium mt-1">
                  <span>{lang === "ar" ? "فرع واحد" : "One Branch"}</span>
                  <span>{lang === "ar" ? "15 فرعاً" : "15 Branches"}</span>
                </div>
              </div>

              {/* Monthly volume */}
              <div>
                <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                  <span>{lang === "ar" ? "متوسط المبيعات الشهرية المتوقعة لكل فرع؟" : "Average expected monthly sales per branch?"}</span>
                  <span className="font-mono text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded text-xs">
                    {avgMonthlySales.toLocaleString()} {currencySymbol}/{lang === "ar" ? "شهرياً" : "Monthly"}
                  </span>
                </div>
                <input 
                  type="range" 
                  min={currency.roi.minTurnover} 
                  max={currency.roi.maxTurnover} 
                  step={currency.roi.turnoverStep}
                  value={avgMonthlySales}
                  onChange={(e) => setAvgMonthlySales(Number(e.target.value))}
                  className="w-full accent-brand-600 h-1.5 bg-slate-100 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-medium mt-1">
                  <span>{currency.roi.minTurnover.toLocaleString()} {currencySymbol}</span>
                  <span>{currency.roi.maxTurnover.toLocaleString()} {currencySymbol}</span>
                </div>
              </div>

              {/* Check if lifetime is target preference */}
              <div className="bg-white p-4 rounded border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex flex-col text-start">
                  <span className="text-xs font-bold text-slate-800">{lang === "ar" ? "أفضّل امتلاك النسخة مدى الحياة (تمليك)" : "I prefer lifetime offline ownership (One time pay)"}</span>
                  <span className="text-[10px] text-slate-600 mt-0.5">{lang === "ar" ? "شراء رخصة لمرة واحدة تغنيك عن الاشتراكات السنوية." : "Buy a one-time license to eliminate the need for annual subscriptions."}</span>
                </div>
                <input 
                  type="checkbox"
                  checked={isLifetimeTarget}
                  onChange={(e) => setIsLifetimeTarget(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculations and suggestion blocks */}
            <div className="md:col-span-5 bg-white text-slate-900 rounded p-6 border border-brand-200 shadow-sm flex flex-col justify-between min-h-[280px]">
              <div className="space-y-4">
                <span className="text-[10px] bg-brand-100 text-brand-800 border border-brand-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono">
                  {lang === "ar" ? "تحليل استثمار العائد التقريبي لشركتك" : "Approximate Return on Investment Analysis for your Company"}
                </span>
                
                <div>
                  <span className="text-[11px] text-slate-600 block font-medium">{lang === "ar" ? "أرباح وتكاليف سرقات نمنعها عنك سنوياً (بحرص 4%):" : "Lost profits and theft costs prevented annually (at conservative 4%):"}</span>
                  <span className="text-2xl sm:text-3xl font-bold text-brand-500 tracking-tight font-mono block mt-1">
                    +{calculatedSavings.toLocaleString()} <span className="text-xs">{currencySymbol}</span>
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <p className="text-[10px] text-slate-600">{lang === "ar" ? "الباقة التلقائية المقترحة والموفرة:" : "Recommended Automated & Saving Plan:"}</p>
                  <p className="text-slate-900 text-xs sm:text-sm font-bold mt-1 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                    {recommendedPlan().name} ({recommendedPlan().type})
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1">{lang === "ar" ? "سعر الباقة التقريبي:" : "Approximate Plan Price:"} <strong className="text-brand-500 text-xs font-mono">{recommendedPlanPrice.toLocaleString()} {currencySymbol}</strong> / {lang === "ar" ? recommendedPlan().period : recommendedPlan().periodEn}</p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {
                    setSelectedPlan(`${recommendedPlan().name} - ROI Calculator`);
                    window.location.assign(APP_TRIAL_URL);
                  }}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-4 rounded text-xs transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-brand-500/20"
                >
                  {lang === "ar" ? "احجز هذه الباقة واطلب الاستشارة مجاناً" : "Book this plan and request a free consultation"}
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ROI Chart rendering area */}
            <div className="md:col-span-12 mt-4 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 mb-6 text-center">
                {lang === "ar" ? "حجم التوفير التراكمي المتوقع خلال 12 شهراً" : "Cumulative Expected Savings over 12 Months"}
              </h3>
              <div className="h-64 w-full min-w-0 text-xs font-mono" dir="ltr" style={{ minHeight: "256px" }}>
                {isChartMounted && (
                  <ResponsiveContainer width="100%" height={256} minWidth={0}>
                    <BarChart data={roiChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} tickFormatter={(value) => `${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`} />
                      <RechartsTooltip 
                        cursor={{fill: '#f1f5f9'}} 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} 
                        formatter={(value: number) => [`${value.toLocaleString()} ${currencySymbol}`, lang === "ar" ? "التوفير" : "Savings"]}
                      />
                      <Bar dataKey="savings" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

          </div>

        </div>
      </motion.section>

      {/* PRICING PLANS SECTION */}
      <motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} id="pricing" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-600 font-bold text-xs tracking-widest uppercase font-mono bg-brand-50 px-3 py-1.5 rounded-full inline-block">{lang === "ar" ? "خطط أسعار واضحة خالية من الرسوم المستترة" : "Clear pricing plans with no hidden fees"}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-normal mt-3">
              {t.pricing.title}
            </h2>
            <p className="mt-3 text-slate-600 text-xs sm:text-sm">
              {lang === "ar" ? "اختر الخطة التي تتماشى كلياً مع كادر عمالتك ونطاق فروع نشاطك بموثوقية، بأسعار اقتصادية تنافسية تضمن لك سرعة العائد على استثمارك:" : "Choose the plan that perfectly matches your workforce and branch scope reliably, at competitive economic prices guaranteeing fast ROI:"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentPricingTiers.map((tier, index) => {
              const isOffline = tier.type === "Offline Lifetime";
              const currentTierPrice = getTierPrice(index);
              return (
                <div 
                  key={`tier-${tier.type}-${index}`}
                  className={`relative rounded-lg border p-6 transition-all duration-300 flex flex-col justify-between ${
                    tier.mostPopular 
                      ? "bg-white border-brand-500 text-slate-900 shadow-2xl scale-100 z-10 ring-1 ring-brand-500" 
                      : isOffline
                        ? "bg-gradient-to-b from-slate-50/50 to-amber-50/10 border-amber-200 shadow-sm text-slate-900"
                        : "bg-slate-50/60 border-slate-200 text-slate-900 hover:border-slate-300"
                  }`}
                >
                  {tier.mostPopular && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-wide uppercase shadow-sm">
                      {t.pricing.mostPopular}
                    </span>
                  )}
                  {isOffline && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-wide uppercase shadow-sm">
                      {t.pricing.lifetime}
                    </span>
                  )}

                  <div>
                    <span className={`text-[9px] font-mono font-bold tracking-widest uppercase block ${
                      tier.mostPopular ? "text-brand-500" : "text-slate-400"
                    }`}>
                      {tier.type}
                    </span>
                    
                    <h3 className="mt-1 text-lg font-black font-display tracking-tight">
                      {lang === "ar" ? tier.name : tier.nameEn}
                    </h3>
                    
                    <p className={`text-[11px] mt-1.5 min-h-10 leading-relaxed ${
                      tier.mostPopular ? "text-slate-600" : "text-slate-600"
                    }`}>
                      {lang === "ar" ? tier.description : ""}
                    </p>

                    <div className={`mt-4 pb-4 border-b border-dashed ${
                      tier.mostPopular ? "border-brand-100" : "border-slate-200"
                    }`}>
                      <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-brand-600">
                        {currentTierPrice.toLocaleString()} {currencySymbol}
                      </span>
                      <span className={`text-[10px] font-bold mx-1 text-slate-400`}>
                        / {lang === "ar" ? tier.period : tier.periodEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-4 text-[11px] font-bold text-slate-600 bg-slate-50 p-2 rounded justify-center">
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {tier.users}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {tier.branches}</span>
                    </div>

                    <div className="mt-5 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                      {lang === "ar" ? "الأنظمة المشمولة" : "Included Systems"}
                    </div>

                    <ul className="mt-2 space-y-2.5 font-sans">
                      {tier.features.map((feat: any, fIdx: number) => (
                        <li key={`tier-${index}-feat-${fIdx}`} className={`flex items-center gap-2 text-xs ${!feat.included ? 'opacity-60 grayscale' : ''}`}>
                          {feat.included ? (
                            <Check className={`w-3.5 h-3.5 shrink-0 ${tier.mostPopular ? "text-brand-500" : "text-brand-500"}`} />
                          ) : (
                            <X className="w-3.5 h-3.5 shrink-0 text-slate-300" />
                          )}
                          <span className={feat.included && tier.mostPopular ? "text-slate-700 font-bold" : feat.included ? "text-slate-600 font-medium" : "text-slate-400 line-through"}>{feat.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 font-sans">
                    <button
                      onClick={() => {
                        setSelectedPlan(tier.name);
                        window.location.assign(APP_TRIAL_URL);
                      }}
                      className={`w-full py-2.5 rounded text-xs font-bold transition-all duration-200 cursor-pointer ${
                        tier.mostPopular
                          ? "bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/20"
                          : isOffline
                            ? "bg-amber-600 hover:bg-amber-500 text-white shadow-sm"
                            : "bg-slate-100 hover:bg-slate-300 text-slate-800 font-medium"
                      }`}
                    >
                      {index === 0
                        ? (lang === "ar" ? `ابدأ رحلتك بـ ${currentTierPrice.toLocaleString()} ${currencySymbol} فقط` : `Start for ${currentTierPrice.toLocaleString()} ${currencySymbol} Only`)
                        : tier.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DETAILED COMPARISON TABLE TOGGLE */}
          <div className="mt-12 text-center">
            <button 
              onClick={() => setShowComparison(!showComparison)}
              className="px-6 py-3 rounded-full border border-slate-300 bg-white text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-400 transition-colors inline-flex items-center gap-2 text-sm shadow-sm"
            >
              {lang === "ar" ? "عرض المقارنة التفصيلية للمميزات" : "View Full Features Comparison"}
              <ChevronDown className={`w-4 h-4 transition-transform ${showComparison ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* DETAILED COMPARISON TABLE CONTENT */}
          {showComparison && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              className="mt-12 w-full overflow-x-auto bg-white border border-slate-200 shadow-sm rounded-xl"
            >
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className={`p-4 font-bold text-slate-800 w-1/3 text-${lang === 'ar' ? 'right' : 'left'}`}>
                     {lang === "ar" ? "المميزات" : "Features"}
                    </th>
                    <th className="p-4 font-bold text-slate-800 text-center">Cloud Basic</th>
                    <th className="p-4 font-bold text-slate-800 text-center">Cloud Pro</th>
                    <th className="p-4 font-bold text-brand-700 text-center bg-brand-50">Cloud Enterprise</th>
                    <th className="p-4 font-bold text-amber-700 text-center bg-amber-50">Offline Lifetime</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    {
                        categoryAr: "المبيعات ونقاط البيع (POS)",
                        categoryEn: "Sales & POS",
                        features: [
                            { nameAr: "نقاط البيع السريعة", nameEn: "Fast POS", basic: true, pro: true, enterprise: true, offline: true },
                            { nameAr: "الفواتير الإلكترونية والضريبية", nameEn: "ZATCA E-Invoices", basic: true, pro: true, enterprise: true, offline: true },
                            { nameAr: "إدارة العملاء والديون", nameEn: "Customers & Debts", basic: true, pro: true, enterprise: true, offline: true },
                            { nameAr: "عروض الأسعار وطلبات البيع", nameEn: "Quotations & Sales Orders", basic: false, pro: true, enterprise: true, offline: true },
                            { nameAr: "نقاط الولاء والمكافآت", nameEn: "Loyalty Points", basic: false, pro: true, enterprise: true, offline: true },
                        ]
                    },
                    {
                        categoryAr: "المخازن والمشتريات",
                        categoryEn: "Inventory & Purchases",
                        features: [
                            { nameAr: "إدارة المنتجات والتصنيفات", nameEn: "Products & Categories", basic: true, pro: true, enterprise: true, offline: true },
                            { nameAr: "إدارة الموردين والمشتريات", nameEn: "Suppliers & Purchases", basic: false, pro: true, enterprise: true, offline: true },
                            { nameAr: "تعدد الفروع والمستودعات", nameEn: "Multi-branch & Warehouses", basic: false, pro: true, enterprise: true, offline: true },
                            { nameAr: "التحويل بين المخازن وتسويات الجرد", nameEn: "Transfers & Adjustments", basic: false, pro: true, enterprise: true, offline: true },
                        ]
                    },
                    {
                        categoryAr: "المالية والمحاسبة",
                        categoryEn: "Finance & Accounting",
                        features: [
                            { nameAr: "تقارير المبيعات والأرباح", nameEn: "Sales & Profit Reports", basic: true, pro: true, enterprise: true, offline: true },
                            { nameAr: "المصروفات وعهد الموظفين", nameEn: "Expenses & Petty Cash", basic: true, pro: true, enterprise: true, offline: true },
                            { nameAr: "دليل الحسابات والقيود اليومية", nameEn: "Chart of Accounts & Entries", basic: false, pro: true, enterprise: true, offline: true },
                            { nameAr: "مراكز التكلفة للمشاريع", nameEn: "Cost Centers (Projects)", basic: false, pro: false, enterprise: true, offline: true },
                        ]
                    },
                    {
                        categoryAr: "أنظمة متقدمة",
                        categoryEn: "Advanced Systems",
                        features: [
                            { nameAr: "الموارد البشرية والرواتب (HR)", nameEn: "HR & Payroll", basic: false, pro: false, enterprise: true, offline: true },
                            { nameAr: "منشئ التقارير المخصص", nameEn: "Custom Report Builder", basic: false, pro: false, enterprise: true, offline: true },
                            { nameAr: "المساعد الذكي ZAD AI", nameEn: "ZAD AI Assistant", basic: false, pro: false, enterprise: true, offline: false },
                            { nameAr: "صلاحيات المستخدمين المتقدمة", nameEn: "Advanced User Permissions", basic: false, pro: true, enterprise: true, offline: true },
                            { nameAr: "شجرة حسابات معقدة غير محدودة", nameEn: "Unlimited Complex Account Tree", basic: false, pro: true, enterprise: true, offline: true },
                        ]
                    }
                  ].map((cat, catIdx) => (
                    <React.Fragment key={`comp-cat-${catIdx}`}>
                      <tr>
                        <td colSpan={5} className={`bg-slate-100 font-bold p-3 text-slate-700 text-${lang === 'ar' ? 'right' : 'left'}`}>
                          {lang === "ar" ? cat.categoryAr : cat.categoryEn}
                        </td>
                      </tr>
                      {cat.features.map((feat, fIdx) => (
                        <tr key={`comp-row-${catIdx}-${fIdx}`} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className={`p-4 text-slate-600 font-medium text-${lang === 'ar' ? 'right' : 'left'}`}>
                            {lang === "ar" ? feat.nameAr : feat.nameEn}
                          </td>
                          <td className="p-4 text-center">
                            {feat.basic ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                          </td>
                          <td className="p-4 text-center border-l-0">
                            {feat.pro ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                          </td>
                          <td className="p-4 text-center bg-brand-50/50">
                            {feat.enterprise ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                          </td>
                          <td className="p-4 text-center bg-amber-50/50">
                            {feat.offline ? <Check className="w-5 h-5 text-amber-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

        </div>
      </motion.section>

      {/* SUPPORT & TRAINING SECTION */}
      <motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} className="py-16 lg:py-24 bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight mb-4">{lang === "ar" ? "كل أنظمة شركتك في اشتراك واحد مع دعم متكامل" : "All your company systems in one subscription with full support"}</h2>
            <p className="text-slate-200 text-sm">{lang === "ar" ? "نحن نضمن نجاحك وتدريب فريقك عبر قنوات دعم متعددة" : "We ensure your success and team training through multiple support channels"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center flex flex-col items-center hover:bg-slate-800 transition-colors">
              <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                <Menu className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{lang === "ar" ? "مركز المساعدة" : "Support Center"}</h3>
              <p className="text-sm text-slate-300 mb-8">{lang === "ar" ? "كل ما تحتاج معرفته حول استخدام النظام في سلسلة مقالات مبسطة للمبتدئين والخبراء." : "Everything you need to know about using the system in a series of simple articles for beginners and experts."}</p>
              <button className="mt-auto px-6 py-2 rounded-full border border-slate-600 text-sm font-bold hover:bg-slate-700 transition-colors">{lang === "ar" ? "مركز المساعدة" : "Help Center"}</button>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center flex flex-col items-center hover:bg-slate-800 transition-colors relative overflow-hidden">
               {/* popular tag */}
              <div className="absolute top-0 inset-x-0 h-1 bg-indigo-500"></div>
              <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{lang === "ar" ? "دعم متكامل" : "Full Support"}</h3>
              <p className="text-sm text-slate-300 mb-8">{lang === "ar" ? "فريق الدعم لدينا مستعد لخدمتك على مدار الساعة عبر الدردشة المباشرة أو الاتصال." : "Our support team is ready to serve you around the clock via live chat or call."}</p>
              <button className="mt-auto px-6 py-2 rounded-full border border-indigo-500 text-indigo-400 text-sm font-bold hover:bg-indigo-500/10 transition-colors">{lang === "ar" ? "محادثة مباشرة" : "Live Chat"}</button>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center flex flex-col items-center hover:bg-slate-800 transition-colors">
              <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{lang === "ar" ? "تدريب مجاني" : "Free Training"}</h3>
              <p className="text-sm text-slate-300 mb-8">{lang === "ar" ? "تعلم كيفية استخدام خبايا النظام في دقائق من خلال تدريب عملي مع أحد خبرائنا." : "Learn how to use system secrets in minutes through practical training with one of our experts."}</p>
              <button className="mt-auto px-6 py-2 rounded-full border border-slate-600 text-sm font-bold hover:bg-slate-700 transition-colors">{lang === "ar" ? "سجل مجاناً" : "Register for Free"}</button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SOCIAL PROOF & FAQS SECTION */}
      <motion.section initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }} id="faqs" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 font-sans">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-brand-600 font-bold text-xs tracking-widest uppercase font-mono bg-brand-50 px-3 py-1.5 rounded-full inline-block">{lang === "ar" ? "قصص نجاح وإجابات وافية لاستفساراتك" : "Success stories and comprehensive answers to your inquiries"}</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight leading-normal">
              {lang === "ar" ? "آراء عملائنا والأسئلة الشائعة" : "Our Customers' Feedback & FAQs"}
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm">
              {lang === "ar" ? "بنينا هذا النظام بمشورة مئات المستثمرين وخبراء الإدارة لتسهيل عملياتك اليومية وضبط حساباتك:" : "Constructed with the advice of hundreds of investors and management experts to streamline your daily operations and control your accounts:"}
            </p>
          </div>

          {/* Social Proof Mini Slider/Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm text-start">
              <div className="flex items-center gap-1 mb-3 text-amber-500">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed mb-4 font-sans">
                "{lang === "ar" ? currency.testimonial.quoteAr : currency.testimonial.quoteEn}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs font-mono">{lang === "ar" ? "ف" : "F"}</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">{lang === "ar" ? "المهندس فيصل الحربي" : "Eng. Faisal Al-Harbi"}</h4>
                  <p className="text-[10px] text-slate-600 font-medium font-mono">{lang === "ar" ? "مالك سلسلة أسواق الحرمين التجارية" : "Owner of Al-Haramain Markets Chain"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm text-start">
              <div className="flex items-center gap-1 mb-3 text-amber-500">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed mb-4 font-sans">
                "{lang === "ar" ? currency.testimonial.lifetimeQuoteAr : currency.testimonial.lifetimeQuoteEn}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs font-mono">{lang === "ar" ? "أ" : "A"}</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">{lang === "ar" ? "أستاذ أحمد الشاذلي" : "Mr. Ahmed El-Shazly"}</h4>
                  <p className="text-[10px] text-slate-600 font-medium font-mono">{lang === "ar" ? "المدير التنفيذي لشركة مودرن هوم التجارية" : "CEO, Modern Home Trading Co."}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion FAQ block */}
          <div className="bg-white rounded border border-slate-200 p-6 sm:p-8 shadow-sm text-start space-y-4 max-w-4xl mx-auto">
            <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 pb-3 border-b border-slate-200 mb-4">{lang === "ar" ? "الأسئلة التي تتردد غالباً بذهن أصحاب العمل:" : "Common Questions in Employers' Minds:"}</h3>
            
            {currentFaqs.map((faq, idx) => {
              const isOpen = openFAQIndex === idx;
              return (
                <div key={`faq-item-${idx}`} className="border-b border-slate-150 last:border-0 pb-3 last:pb-0">
                  <button
                    onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
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
          
          <img src="/logo.png" alt="Z Systems" className="h-20 w-auto object-contain mx-auto mb-6 drop-shadow-md" />

          {/* Copywriting Final Climax headline */}
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-normal max-w-4xl mx-auto">
            {lang === "ar" ? "اتخذ قرار الريادة اليوم وحوّل نظامك لمكسب حقيقي خاضع للسيطرة" : "Take the leadership decision today and turn your system into real controlled gain"}
          </h2>
          
          <p className="mt-4 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {lang === "ar" ? (
              <>
                انضم الآن لمئات الشركات وسلسلة المحلات التجارية التي تثق في <strong className="text-brand-500 font-bold">Z Systems Pro</strong> لحماية مبيعاتها اليومية ورفع كفاءة جرد مستودعاتها بنسبة <span className="text-emerald-500 font-bold text-[18px]">%200</span> ودون أي مجهود بشري ضائع.
              </>
            ) : (
              <>
                Join hundreds of companies and retail chains that trust <strong className="text-brand-500 font-bold">Z Systems Pro</strong> to protect their daily sales and boost warehouse inventory efficiency by <span className="text-emerald-500 font-bold text-[18px]">200%</span> without any wasted human effort.
              </>
            )}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                setSelectedPlan(lang === "ar" ? "طلب استشارة نهائية" : "Request Final Consultation");
                window.location.assign(APP_TRIAL_URL);
              }}
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
            <span>{lang === "ar" ? "✓ متوافق كلياً مع QR والفواتير الضريبية" : "✓ Fully compliant with local Tax & QR Invoices"}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>{lang === "ar" ? "✓ ضمان استعادة أموال بـ 30 يوماً" : "✓ 30-Day Money Back Guarantee"}</span>
          </div>

        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="bg-slate-50 text-slate-600 pt-12 pb-8 border-t border-slate-200 font-sans">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          {/* Main Top Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-slate-200/80">
            
            {/* Brand Column (5 cols) */}
            <div className="md:col-span-5 space-y-4 flex flex-col items-center md:items-start text-center md:text-start">
              <div className="flex items-center gap-2.5" dir="ltr">
                <img src="/logo.png" alt="Z Systems" className="h-9 w-auto object-contain drop-shadow-sm shrink-0" />
                <div className="flex flex-col text-start">
                  <span className="font-display font-black text-base text-slate-900 tracking-tight leading-none">
                    Z Systems <span className="text-brand-600 font-bold text-xs">Pro</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium mt-1">
                    {lang === "ar" ? "حلول الإدارة ونقاط البيع المتكاملة" : "Enterprise ERP & POS Solutions"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md font-sans">
                {lang === "ar" 
                  ? "أنظمة متطورة لإدارة موارد المؤسسات ونقاط البيع، صُممت لحماية إيراداتك ومنع الهدر والسرقات وضبط المخازن والورديات بأعلى المعايير المحاسبية." 
                  : "Advanced ERP and POS control systems engineered to prevent retail leaks, optimize inventory, reconcile shifts, and ensure rigorous accounting standards."}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{lang === "ar" ? "دعم واستشارات مجانية 24/7" : "24/7 Free Support & Consultation"}</span>
              </div>
            </div>

            {/* Navigation Links (7 cols -> 3 centered columns) */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              
              {/* Column 1: استكشف النظام */}
              <div className="flex flex-col items-center text-center space-y-3">
                <p className="font-display font-bold text-xs uppercase tracking-wider text-slate-900">
                  {lang === "ar" ? "استكشف النظام" : "Explore"}
                </p>
                <ul className="space-y-2 text-xs flex flex-col items-center text-center">
                  <li>
                    <a href="#why-us" className="hover:text-brand-600 transition-colors inline-block">
                      {lang === "ar" ? "تحديات الإدارة والحلول" : "Challenges & Solutions"}
                    </a>
                  </li>
                  <li>
                    <a href="#features" className="hover:text-brand-600 transition-colors inline-block">
                      {lang === "ar" ? "ميزات النظام الشاملة" : "System Features"}
                    </a>
                  </li>
                  <li>
                    <a href="#roi-calculator" className="hover:text-brand-600 transition-colors inline-block">
                      {lang === "ar" ? "حاسبة الأرباح ووفورات التكلفة" : "ROI Calculator"}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: خيارات التشغيل */}
              <div className="flex flex-col items-center text-center space-y-3">
                <p className="font-display font-bold text-xs uppercase tracking-wider text-slate-900">
                  {lang === "ar" ? "خيارات التشغيل" : "Deployment"}
                </p>
                <ul className="space-y-2 text-xs flex flex-col items-center text-center">
                  <li>
                    <a href="#deployment" className="hover:text-brand-600 transition-colors inline-block">
                      {lang === "ar" ? "النسخة السحابية (Cloud)" : "Cloud ERP Edition"}
                    </a>
                  </li>
                  <li>
                    <a href="#deployment" className="hover:text-brand-600 transition-colors inline-block">
                      {lang === "ar" ? "نسخة التمليك الدائم (Offline)" : "Lifetime Offline Edition"}
                    </a>
                  </li>
                  <li>
                    <a href="#ai-assistant" className="hover:text-brand-600 transition-colors inline-block">
                      {lang === "ar" ? "المساعد الذكي ZAD AI" : "ZAD AI Assistant"}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: المساعدة والتواصل */}
              <div className="flex flex-col items-center text-center space-y-3">
                <p className="font-display font-bold text-xs uppercase tracking-wider text-slate-900">
                  {lang === "ar" ? "المساعدة والدعم" : "Help & Support"}
                </p>
                <ul className="space-y-2 text-xs flex flex-col items-center text-center">
                  <li>
                    <a href="#faqs" className="hover:text-brand-600 transition-colors inline-block">
                      {lang === "ar" ? "الأسئلة الأكثر شيوعاً" : "Frequently Asked Questions"}
                    </a>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        setSelectedPlan(lang === "ar" ? "استشارة عامة" : "General Consultation");
                        window.location.assign(APP_TRIAL_URL);
                      }}
                      className="text-brand-600 hover:text-brand-700 font-semibold transition-colors inline-block cursor-pointer"
                    >
                      {lang === "ar" ? "طلب استشارة مجانية" : "Request Free Consultation"}
                    </button>
                  </li>
                  <li>
                    <a href="#pricing" className="hover:text-brand-600 transition-colors inline-block">
                      {lang === "ar" ? "جدول مقارنة الباقات" : "Compare Plans"}
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Centered, balanced, no broken lines */}
          <div className="pt-8 flex flex-col items-center justify-center text-center space-y-2.5">
            <p className="text-xs text-slate-700 font-medium">
              © {new Date().getFullYear()} Z Systems. {lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <p className="text-[11px] text-slate-500 max-w-2xl leading-relaxed">
              {lang === "ar" 
                ? "متوافق بنسبة 100% مع تعليمات الفاتورة الضريبية، الربط الإلكتروني، ورمز الاستجابة السريع (QR Code) • ضمان استرداد الأموال لمدة 30 يوماً" 
                : "100% compliant with e-invoicing tax regulations, electronic integrations, and QR Code requirements • 30-day money-back guarantee"}
            </p>
          </div>

        </div>
      </footer>

      {/* DEMO / CONSULTATION REQUEST MODAL */}
      <AnimatePresence>
        {showDemoModal && (
          <div key="demo-modal-backdrop" className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/85 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
            <motion.div
              key="demo-modal-dialog"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-white rounded p-6 sm:p-8 max-w-lg w-full text-start border border-slate-200 relative shadow-xl text-slate-900"
            >
              
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  setDemoSubmitted(false);
                }}
                className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Success Screen */}
              {demoSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center mx-auto text-brand-600 border border-brand-200 mb-4">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 font-display">{lang === "ar" ? "تم استلام طلب استشارتك بنجاح!" : "Consultation requested successfully!"}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto font-sans">
                     {lang === "ar" ? "أهلاً بك يا" : "Welcome"} <strong>{demoForm.name}</strong>. {lang === "ar" ? "سيقوم مستشار أنظمة ERP مالي وخبير بنشاط" : "An expert financial ERP consultant for the industry:"} <strong>{demoForm.company || (lang === "ar" ? "النشاط المذكور" : "Mentioned Business")}</strong> {lang === "ar" ? "بالتواصل معك هاتفياً أو عبر الواتساب على جوالك" : "will contact you by phone or WhatsApp on"} <strong>({demoForm.phone})</strong> {lang === "ar" ? "خلال 15 دقيقة لتقديم العرض وبدء دورتك التجريبية مجاناً." : "within 15 minutes to present the offer and start your free trial."}
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setShowDemoModal(false);
                        setDemoSubmitted(false);
                      }}
                      className="bg-slate-100 hover:bg-slate-300 text-slate-800 font-bold py-2.5 px-6 rounded text-xs transition-colors cursor-pointer"
                    >
                      {lang === "ar" ? "إغلاق النافذة والعودة للموقع" : "Close and return to site"}
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Screen */
                <div>
                  <span className="text-[10px] font-bold text-brand-600 tracking-wider font-mono block">Z SYSTEMS — CONSULTATION REQUEST</span>
                  <h3 className="text-md sm:text-lg font-black text-slate-900 font-display mt-1">
                    {lang === "ar" ? "طلب نسخة تجريبية واستشارة ERP مجانية" : "Request Free Trial and ERP Consultation"}
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed font-sans">
                    {lang === "ar" ? "لقد اخترت أو تم اقتراح باقة:" : "You have chosen or been recommended the plan:"} <strong className="text-slate-900 border-b border-dashed border-brand-500 font-bold pb-0.5">{selectedPlan || (lang === "ar" ? "تفاصيل النظام الشامل" : "Comprehensive System Details")}</strong>. {lang === "ar" ? "من فضلك املأ البيانات وسنتولى الباقي بدقة متناهية:" : "Please fill in the details and we will handle the rest with utmost accuracy:"}
                  </p>

                  <form onSubmit={handleDemoSubmit} className="mt-5 space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">{lang === "ar" ? "الاسم الكريم بالكامل *" : "Full Name *"}</label>
                      <input
                        type="text"
                        required
                        value={demoForm.name}
                        onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                        placeholder={currencyCode === "EGP" ? (lang === "ar" ? "الأستاذ / أحمد محمود" : "Mr. Ahmed Mahmoud") : (lang === "ar" ? "الأستاذ / عبد الرحمن الحربي" : "Mr. Abdulrahman Alharbi")}
                        className="w-full rounded border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-200 text-start font-sans"
                      />
                    </div>

                    {/* Phone Code */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1 font-sans">{lang === "ar" ? "رقم الجوال الفعال (مع كود الدولة) *" : "Active Mobile (with country code) *"}</label>
                      <input
                        type="tel"
                        required
                        value={demoForm.phone}
                        onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                        placeholder={currencyCode === "EGP" ? "+20 10 1234 5678" : currencyCode === "AED" ? "+971 50 123 4567" : currencyCode === "KWD" ? "+965 99 123 456" : "+966 55 123 4567"}
                        className="w-full rounded border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-800 text-end direction-ltr font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 font-sans">
                      {/* Company Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">{lang === "ar" ? "اسم المحل أو الشركة *" : "Store or Company Name *"}</label>
                        <input
                          type="text"
                          required
                          value={demoForm.company}
                          onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                          placeholder={currencyCode === "EGP" ? (lang === "ar" ? "شركة النيل للتجارة والتوزيع" : "Nile Trading & Distribution") : (lang === "ar" ? "شركة الحربي للتجارة" : "Alharbi Trading Co.")}
                          className="w-full rounded border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-800 text-start font-sans"
                        />
                      </div>

                      {/* Store Type / Employees */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">{lang === "ar" ? "حجم العمالة أو الفروع" : "Business Workforce & Branch Size"}</label>
                        <select
                          value={demoForm.employees}
                          onChange={(e) => setDemoForm({ ...demoForm, employees: e.target.value })}
                          className="w-full rounded border border-slate-200 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-slate-800 text-start font-sans cursor-pointer"
                        >
                          <option value="1-5">{lang === "ar" ? "من 1 إلى 5 أفراد / فرع واحد" : "1 to 5 Employees / One Branch"}</option>
                          <option value="6-20">{lang === "ar" ? "من 6 إلى 20 فرد / فرعين" : "6 to 20 employees / 2 branches"}</option>
                          <option value="21-100">{lang === "ar" ? "من 21 إلى 100 فرد / فروع متعددة" : "21 to 100 Employees / Multiple Branches"}</option>
                          <option value="100+">{lang === "ar" ? "أكثر من 100 فرد / سلسلة متكاملة" : "More than 100 / Enterprise chain"}</option>
                        </select>
                      </div>
                    </div>

                    {/* Mode preferred */}
                    <div className="font-sans">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1.5">{lang === "ar" ? "نمط التثبيت المفضل" : "Preferred Deployment Mode"}</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`border rounded p-2.5 flex items-center justify-between cursor-pointer transition ${
                          demoForm.preferredMode === "Cloud" ? "border-brand-500 bg-brand-50/40" : "border-slate-200"
                        }`}>
                          <input
                            type="radio"
                            name="pref_mode"
                            value="Cloud"
                            checked={demoForm.preferredMode === "Cloud"}
                            onChange={() => setDemoForm({ ...demoForm, preferredMode: "Cloud" })}
                            className="hidden"
                          />
                          <span className="text-xs font-bold text-slate-800">{lang === "ar" ? "سحابي (Cloud)" : "Cloud SaaS"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{lang === "ar" ? "بالاشتراك" : "Subscription"}</span>
                        </label>

                        <label className={`border rounded p-2.5 flex items-center justify-between cursor-pointer transition ${
                          demoForm.preferredMode === "Offline" ? "border-amber-500 bg-amber-50/20" : "border-slate-200"
                        }`}>
                          <input
                            type="radio"
                            name="pref_mode"
                            value="Offline"
                            checked={demoForm.preferredMode === "Offline"}
                            onChange={() => setDemoForm({ ...demoForm, preferredMode: "Offline" })}
                            className="hidden"
                          />
                          <span className="text-xs font-bold text-slate-800">{lang === "ar" ? "تمليك محلي دائم" : "Standard Offline"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{lang === "ar" ? "دفعة واحدة" : "One-Time Pay"}</span>
                        </label>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="pt-2 font-sans">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded text-xs transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>{lang === "ar" ? "إرسال المعطيات وتأكيد الموعد المجاني" : "Send Info & Confirm Free Demo"}</span>
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                      <p className="text-[9px] text-center text-slate-600 mt-2">
                        {lang === "ar" ? "حماية خصوصية بياناتك مضمونة بنسبة %100 بحسب بروتوكول السرية الموحد لدينا." : "100% Guaranteed data privacy under our unified confidentiality protocol."}
                      </p>
                    </div>

                  </form>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <a href="https://wa.me/201018017523" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg shadow-brand-500/20 hover:scale-110 hover:-translate-y-1 transition-all flex items-center justify-center cursor-pointer group">
        <MessageCircle className="w-6 h-6" />
        <span className="absolute flex items-center justify-center w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30 -z-10"></span>
        <span className="absolute right-14 whitespace-nowrap bg-white text-slate-800 text-xs font-bold py-1 px-3 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{t.common.whatsapp}</span>
      </a>
    </div>
  );
}
