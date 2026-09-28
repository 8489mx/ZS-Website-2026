import React from "react";
import LegalLayout from "./LegalLayout";
import { useLanguage } from "../LanguageContext";
import { RefreshCw, Clock, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

export default function RefundPolicyPage() {
  const { lang } = useLanguage();

  if (lang === "en") {
    return (
      <LegalLayout
        titleAr="سياسة الاستبدال والاسترجاع وإلغاء الاشتراك"
        titleEn="Refund, Cancellation & Return Policy"
        subtitleAr="الضمان الذهبي لاسترداد الأموال وخطوات إلغاء الاشتراكات في أنظمة Z Systems"
        subtitleEn="Money-back guarantee, cancellation rules, and refund procedures for Z Systems"
      >
        {/* Banner with Clear Conditions */}
        <section className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 text-emerald-950">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm space-y-1.5">
              <strong className="block text-emerald-950 font-bold text-sm sm:text-base">
                100% Money-Back Guarantee (Cloud Subscriptions &amp; Pre-Activation Licenses):
              </strong>
              <p className="text-emerald-900 leading-relaxed">
                We stand behind the quality of our systems. The 100% full refund guarantee strictly applies to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-emerald-900">
                <li><strong>New Cloud Subscriptions:</strong> Full refund within <strong>14 calendar days</strong> from the initial purchase date.</li>
                <li><strong>Offline Lifetime Licenses:</strong> Full refund within <strong>7 calendar days</strong> from purchase date, provided the request is made <strong>prior to the generation and delivery of permanent activation license keys</strong>.</li>
              </ul>
              <p className="text-[11px] text-emerald-800 pt-1">
                * Note: Please review Section 4 below regarding non-refundable custom software engineering and unboxed physical devices.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-600" />
            <span>1. Refund Eligibility &amp; Precise Periods</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            As a licensed software provider operating under the laws of the Arab Republic of Egypt and the Consumer Protection Agency guidelines:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-2">
            <li><strong>New Cloud ERP/POS Subscriptions:</strong> You are eligible for a 100% refund within <strong>14 calendar days</strong> from the first payment date.</li>
            <li><strong>Lifetime Offline Licenses:</strong> Eligible for refund strictly within <strong>7 calendar days</strong> from invoice date and <strong>prior to generating final activation license keys</strong> and setting up on-premise databases.</li>
            <li><strong>Recurring Subscription Renewals:</strong> You can cancel auto-renewal at any time before the upcoming billing cycle with zero cancellation fees.</li>
          </ul>
        </section>

        {/* PROMINENT EXCEPTIONS BOX */}
        <section className="space-y-4">
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 sm:p-5 text-amber-950 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>4. Non-Refundable Items &amp; Exceptions (Please Read Carefully)</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              In accordance with Egyptian commercial regulations and standard digital software practices, the refund policy does <strong>not</strong> apply to:
            </p>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-amber-900 space-y-1.5">
              <li><strong>Custom Bespoke Engineering:</strong> Tailor-made features, custom API integrations, or modules developed specifically to a client&apos;s custom specification once delivered and verified.</li>
              <li><strong>Unboxed &amp; Deployed POS Hardware:</strong> Physical equipment (thermal receipt printers, barcode scanners, cash drawers) once unboxed and operated on-site. These are covered by manufacturer warranty against defects.</li>
              <li><strong>Requests Exceeding Stated Deadlines:</strong> Any refund request submitted after the 14-day window for cloud subscriptions, or after 7 days / post-license key delivery for offline licenses.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-brand-600" />
            <span>2. Refund Method &amp; Settlement Timeframe</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            In compliance with Central Bank of Egypt regulations and electronic payment gateway protocols:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-2">
            <li>Refunds are processed exclusively back to the <strong>original payment method</strong> used during checkout (Visa, MasterCard, Meeza). Cash refunds for card transactions are strictly prohibited.</li>
            <li>Once reviewed by our billing department, the refund is initiated within <strong>24 to 48 business hours</strong>.</li>
            <li>The refunded amount will reflect in your card statement or bank account within <strong>5 to 14 business days</strong>, depending on your issuing bank&apos;s settlement schedule.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-600" />
            <span>3. How to Submit a Refund or Cancellation Request</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To request a refund or cancel your subscription, please submit your request to our team:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-xs sm:text-sm space-y-2 text-slate-700">
            <div><strong>Official Email:</strong> <a href="mailto:info@zsystemai.com" className="text-brand-600 underline font-mono font-bold">info@zsystemai.com</a> (Please mention company name and invoice number)</div>
            <div>
              <strong>Phone / WhatsApp:</strong>{" "}
              <a href="tel:+201018017523" className="text-brand-600 underline font-mono font-bold" dir="ltr">
                <span dir="ltr" className="inline-block font-mono">+20 1018017523</span>
              </a>{" "}
              &bull; Office Landline:{" "}
              <a href="tel:0663640828" className="text-slate-800 underline font-mono font-bold" dir="ltr">
                <span dir="ltr" className="inline-block font-mono">066-3640828</span>
              </a>
            </div>
            <div><strong>Support Hours:</strong> Saturday through Thursday, 9:00 AM – 6:00 PM (Cairo Time).</div>
          </div>
        </section>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout
      titleAr="سياسة الاستبدال والاسترجاع وإلغاء الاشتراك"
      titleEn="Refund, Cancellation & Return Policy"
      subtitleAr="الضمان الذهبي لاسترداد الأموال وخطوات إلغاء الاشتراكات في أنظمة Z Systems"
      subtitleEn="Money-back guarantee, cancellation rules, and refund procedures for Z Systems"
    >
      {/* Banner with Clear Distinction */}
      <section className="space-y-3">
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 text-emerald-950">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1.5">
            <strong className="block text-emerald-950 font-bold text-sm sm:text-base">
              ضمان استرداد الأموال بنسبة ١٠٠٪ (خاص بالاشتراكات السحابية والتراخيص قبل التفعيل):
            </strong>
            <p className="text-emerald-900 leading-relaxed">
              ثقتكم في برمجياتنا هي أولويتنا المطلقة. ينطبق ضمان استرداد الأموال الكامل بنسبة ١٠٠٪ على الحالات التالية حصراً:
            </p>
            <ul className="list-disc pr-5 space-y-1 text-emerald-900">
              <li><strong>الاشتراكات السحابية الجديدة:</strong> يحق للعميل استرداد كامل المبلغ خلال <strong>١٤ يوماً</strong> من تاريخ أول سداد.</li>
              <li><strong>تراخيص التمليك (الأوفلاين):</strong> يحق للعميل استرداد كامل المبلغ خلال <strong>٧ أيام</strong> من الشراء، <strong>بشرط أن يكون الطلب قبل توليد وتسليم مفاتيح التفعيل النهائية</strong>.</li>
            </ul>
            <p className="text-[11px] text-emerald-800 pt-1">
              * تنبيه هام: يرجى مراجعة قسم الاستثناءات (البند رقم ٤ أدناه) بخصوص البرمجيات المخصصة ومعدات نقاط البيع الملموسة بعد فتح كرتونتها.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-600" />
          <span>١. شروط وفترة الأهلية المحددة للاسترجاع</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          نلتزم بتقديم تجربة اشتراك واستخدام مرنة وعادلة لعملائنا وفق المعايير الزمنية المحددة:
        </p>
        <ul className="list-disc pr-6 text-xs sm:text-sm text-slate-600 space-y-2">
          <li>
            <strong>الاشتراكات السحابية (الجديدة):</strong> يحق للعميل طلب إلغاء الاشتراك واسترداد كامل القيمة المدفوعة خلال <strong>١٤ يوماً تقويمياً</strong> تبدأ من تاريخ إتمام الاشتراك الأول.
          </li>
          <li>
            <strong>تراخيص التمليك المحلي (Offline):</strong> يحق للعميل طلب الاسترداد خلال <strong>٧ أيام تقويمية</strong> من تاريخ الفاتورة، وبشرط أساسي أن يكون ذلك <strong>قبل استخراج وتسليم مفاتيح التفعيل الرقمية</strong> وتثبيت قواعد البيانات على أجهزة المنشأة.
          </li>
          <li>
            <strong>تجديد الاشتراكات الدورية:</strong> يمكن للعميل إلغاء التجديد التلقائي في أي وقت قبل تاريخ دورة الفوترة القادمة بطلب مباشر لفريق الدعم، دون فرض أي رسوم جزائية.
          </li>
        </ul>
      </section>

      {/* PROMINENT EXCEPTIONS BOX */}
      <section className="space-y-3">
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 sm:p-5 text-amber-950 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>٤. الحالات المستثناة من الاسترجاع (يُرجى القراءة بعناية)</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            وفقاً لطبيعة المنتجات الرقمية والتشريعات التجارية المصرية المعمول بها، <strong>لا تسري</strong> سياسة استرداد الأموال على الحالات التالية:
          </p>
          <ul className="list-disc pr-5 text-xs sm:text-sm text-amber-900 space-y-1.5">
            <li>
              <strong>البرمجيات أو الميزات المخصصة (Custom Development):</strong> التعديلات البرمجية الخاصة، أو واجهات الربط (APIs)، أو الشاشات التي يتم تطويرها بناءً على طلب وتوصيف خاص للمنشأة وتم تسليمها واختبارها.
            </li>
            <li>
              <strong>أجهزة نقاط البيع المادية بعد فتح الكرتونة:</strong> الطابعات الحرارية، شاشات اللمس، وقارئات الباركود المادية بعد فتح كرتونتها الأصلية وتشغيلها بالموقع (تخضع هذه الأجهزة لضمان الصيانة والاستبدال ضد عيوب الصناعة المعتمد من الوكيل الرسمي وفقاً لقانون حماية المستهلك).
            </li>
            <li>
              <strong>الطلبات بعد انتهاء المهلة:</strong> أي طلب استرجاع يُقدم بعد انقضاء المهلة المقررة (١٤ يوماً للاشتراكات السحابية، أو بعد ٧ أيام / بعد تسليم مفاتيح التفعيل لتراخيص التمليك).
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-brand-600" />
          <span>٢. آلية استرداد الأموال والمدة الزمنية</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          حرصاً على أمان التعاملات المصرفية وحماية الحسابات وفق تعليمات البنك المركزي وبوابات الدفع الإلكتروني:
        </p>
        <ul className="list-disc pr-6 text-xs sm:text-sm text-slate-600 space-y-2">
          <li>
            <strong>طريقة الإرجاع:</strong> تتم إعادة المبلغ المسترد حصراً إلى <strong>نفس وسيلة الدفع الأصلية</strong> التي استخدمها العميل (بطاقة Visa أو MasterCard أو بطاقة ميزة التي تم الخصم منها). يُحظر قانوناً استرداد مبالغ المعاملات الإلكترونية نقداً.
          </li>
          <li>
            <strong>وقت اعتماد الطلب:</strong> يقوم فريق الحسابات بمراجعة واعتماد طلب الاسترجاع خلال <strong>٢٤ إلى ٤٨ ساعة عمل</strong>.
          </li>
          <li>
            <strong>وقت وصول المبلغ:</strong> يستغرق ظهور المبلغ في كشف حساب بطاقتكم فترة تتراوح بين <strong>٥ إلى ١٤ يوم عمل</strong>، تبعاً لدورات التسوية المعتمدة لدى البنك المصدر لبطاقتكم.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-600" />
          <span>٣. خطوات تقديم طلب الاسترجاع أو إلغاء الاشتراك</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          يمكنكم تقديم طلب الاسترجاع أو إلغاء الاشتراك بكل سهولة من خلال التواصل المباشر معنا:
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-xs sm:text-sm space-y-2 text-slate-700">
          <div>
            <strong className="text-slate-900">عبر البريد الإلكتروني الرسمي:</strong>{" "}
            <a href="mailto:info@zsystemai.com" className="text-brand-600 underline font-mono font-bold">info@zsystemai.com</a>
            <span className="block text-[11px] text-slate-500 mt-0.5">(يرجى توضيح اسم المنشأة ورقم الفاتورة أو المعاملة)</span>
          </div>
          <div>
            <strong className="text-slate-900">عبر الهاتف أو واتساب:</strong>{" "}
            <a href="tel:+201018017523" className="text-brand-600 underline font-mono font-bold" dir="ltr">
              <span dir="ltr" className="inline-block font-mono">+20 1018017523</span>
            </a>
            <span className="text-slate-400 mx-2">•</span>
            <span className="text-slate-700">هاتف المكتب: </span>
            <a href="tel:0663640828" className="text-slate-800 underline font-mono font-bold" dir="ltr">
              <span dir="ltr" className="inline-block font-mono">066-3640828</span>
            </a>
          </div>
          <div>
            <strong className="text-slate-900">مواعيد العمل والدعم الفني:</strong>{" "}
            <span>من السبت إلى الخميس (٩:٠٠ صباحاً – ٦:٠٠ مساءً بتوقيت القاهرة).</span>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
}

