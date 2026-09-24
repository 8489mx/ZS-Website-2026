import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Video, Phone, Plus, FileText, CheckCheck, Send, Battery, Wifi, Signal } from "lucide-react";
import { useCurrency } from "./CurrencyContext";

export default function WhatsAppSimulation({ lang }: { lang: "ar" | "en" }) {
  const [step, setStep] = useState(0);
  const { currency } = useCurrency();

  useEffect(() => {
    // Sequence:
    // 0: Initial state (1000ms delay)
    // 1: User message appears (Wait 1500ms)
    // 2: AI answers with Document and Text (Wait 5000ms)
    // 0: Reset and loop
    const sequence = async () => {
      while (true) {
        setStep(0);
        await new Promise(r => setTimeout(r, 1000));
        setStep(1);
        await new Promise(r => setTimeout(r, 1500));
        setStep(2);
        await new Promise(r => setTimeout(r, 5000));
      }
    };
    
    // Using a simple flag to avoid overlapping
    let isMounted = true;
    const run = async () => {
      while (isMounted) {
        setStep(0);
        await new Promise(r => setTimeout(r, 1500));
        if (!isMounted) break;
        setStep(1);
        await new Promise(r => setTimeout(r, 2000));
        if (!isMounted) break;
        setStep(2);
        await new Promise(r => setTimeout(r, 6000));
      }
    };
    run();
    return () => { isMounted = false };
  }, []);

  return (
    <div className="w-full max-w-[320px] bg-white rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden h-[600px] flex flex-col font-sans">
      {/* OS Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1 text-slate-800 text-[11px] font-medium z-10 bg-[#f6f6f6]">
        <span>10:10</span>
        <div className="flex gap-1.5 items-center">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-[18px] h-[18px]" />
        </div>
      </div>
      
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20"></div>

      {/* WhatsApp Header */}
      <div className="bg-[#f6f6f6] text-slate-800 p-2 px-3 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-6 h-6 text-indigo-500" />
          <div className="w-9 h-9 bg-brand-600 rounded-full flex items-center justify-center relative shadow-sm">
            <span className="text-white text-[11px] font-black select-none tracking-tight">ZAD</span>
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-sm tracking-wide leading-tight">
               ZAD AI
            </div>
            <span className="text-[10px] text-emerald-600 font-medium leading-none mt-0.5">
               {lang === "ar" ? "مساعد Z Systems • أعمال" : "Z Systems Assistant • Business"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <Video className="w-5 h-5" />
          <Phone className="w-[18px] h-[18px]" />
        </div>
      </div>

      {/* WhatsApp Chat Area */}
      <div className="flex-1 bg-[#efeae2] p-4 flex flex-col gap-3 overflow-hidden text-slate-800 text-sm relative">
         {/* Subtle background pattern (WhatsApp style dots/icons) */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
         
         <AnimatePresence>
            {step >= 1 && (
              <motion.div 
                key="wa-sim-user-msg"
                initial={{ opacity: 0, scale: 0.9, originX: 1, originY: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                className="self-end bg-[#d9fdd3] text-slate-800 p-2.5 rounded-xl rounded-br-sm max-w-[85%] shadow-sm relative z-10"
              >
                <div className="leading-relaxed whitespace-pre-wrap font-medium text-[13px]">
                  {lang === "ar" 
                    ? "طلب فاتورة ربع سنوية...\nرقم ٢٢٣٦٦٨" 
                    : "Request quarterly invoice...\nNo. 223668"}
                </div>
                <div className="text-[10px] text-[#075e54] text-opacity-60 text-right mt-1.5 flex items-center justify-end gap-1 font-mono">
                  09:34 
                  <CheckCheck className="w-4 h-4 text-[#53bdeb]"/>
                </div>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div 
                key="wa-sim-bot-reply"
                initial={{ opacity: 0, scale: 0.9, originX: 0, originY: 1, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="self-start flex gap-2 relative z-10 mt-2"
              >
                <div className="w-7 h-7 bg-brand-600 rounded-full flex shrink-0 items-center justify-center self-end mb-1 shadow-sm">
                  <span className="text-white text-[9px] font-black select-none tracking-tight">ZAD</span>
                </div>
                
                <div className="bg-white text-slate-800 rounded-xl rounded-bl-sm max-w-[90%] shadow-sm overflow-hidden flex flex-col">
                  {/* PDF Attachment inside bubble */}
                  <div className="p-1.5 pb-0">
                    <div className="bg-slate-100 rounded-lg p-2.5 flex items-center gap-3">
                      <div className="w-9 h-10 bg-red-50 rounded flex items-center justify-center shrink-0">
                         <div className="text-red-500 font-bold text-[9px] uppercase">PDF</div>
                      </div>
                      <div className="flex flex-col overflow-hidden">
                         <span className="font-bold text-xs truncate">
                           {lang === "ar" ? "pdf فاتورة رقم ٢٢٣٦٦٨" : "Invoice No. 223668.pdf"}
                         </span>
                         <span className="text-[10px] text-slate-500">
                           {lang === "ar" ? "7 صفحات . 3.5 MB" : "7 pages . 3.5 MB"}
                         </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="p-3 pb-1 pt-2 leading-relaxed text-[13px] font-medium text-slate-700 whitespace-pre-wrap">
                    {lang === "ar" 
                      ? `قمت بمعالجة الفاتورة من شركة عبدالله التجارية\nالإجمالي: ${currency.whatsapp.totalAr}\nالضريبة: ${currency.whatsapp.taxAr}\n\nتم إنشاء فاتورة مشتريات جديدة بنجاح كمسودة في النظام`
                      : `I processed the invoice from Abdullah Trading Co.\nTotal: ${currency.whatsapp.totalEn}\nTax: ${currency.whatsapp.taxEn}\n\nA new purchase invoice draft has been successfully created in the system.`}
                     <div className="text-[10px] text-slate-400 text-right mt-1 font-mono">09:34</div>
                  </div>

                  <div className="h-[1px] bg-slate-100 w-full mt-2"></div>

                  {/* Actions */}
                  <button className="w-full text-center py-2.5 text-indigo-500 font-bold text-xs hover:bg-slate-50 transition-colors">
                    {lang === "ar" ? "عرض في النظام" : "View in System"}
                  </button>
                  <div className="h-[1px] bg-slate-100 w-full"></div>
                  <button className="w-full text-center py-2.5 text-slate-400 font-semibold text-xs hover:bg-slate-50 transition-colors">
                    {lang === "ar" ? "اعتماد الدفع" : "Approve Payment"}
                  </button>

                </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* WhatsApp Input Area */}
      <div className="bg-[#f6f6f6] p-2.5 flex items-center gap-2 border-t border-slate-200 z-10 w-full mb-1">
        <button className="w-8 h-8 flex items-center justify-center shrink-0">
          <Plus className="w-6 h-6 text-indigo-500" />
        </button>
        
        <div className="flex-1 bg-white border border-slate-200 rounded-full px-3 py-1.5 flex items-center justify-between shadow-sm h-9">
           <div className="text-slate-400 text-xs">
             {/* Not showing typing indicator to keep it clean, maybe just static text */}
           </div>
           <FileText className="w-4 h-4 text-slate-400" />
        </div>
        
        <button className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm transition-transform active:scale-95">
          <Send className="w-[15px] h-[15px] -ml-[1px] mt-[1px]" />
        </button>
      </div>
      <div className="h-1 bg-[#f6f6f6] w-full flex justify-center pb-2">
         <div className="w-1/3 h-1 bg-slate-300 rounded-full mt-2"></div>
      </div>
    </div>
  );
}
