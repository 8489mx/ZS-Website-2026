import React from "react";
import LegalLayout from "./LegalLayout";
import { useLanguage } from "../LanguageContext";
import { Link } from "react-router-dom";

export default function TermsPage() {
  const { lang } = useLanguage();

  if (lang === "en") {
    return (
      <LegalLayout
        titleAr="الشروط والأحكام"
        titleEn="Terms & Conditions"
        subtitleAr="شروط استخدام خدمات وبرمجيات Z Systems وعقود الاشتراكات السحابية"
        subtitleEn="Terms of Service, Software Licensing, and Subscription Agreement for Z Systems"
      >
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">1. Agreement to Terms</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            By accessing or subscribing to the software, cloud services, and enterprise solutions provided by <strong>Z Systems for Software Solutions</strong> (&quot;Z Systems&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), an entity operating in the Arab Republic of Egypt, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use or subscribe to our systems.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">2. Services &amp; Software Licenses</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Z Systems provides cloud-based and on-premise Enterprise Resource Planning (ERP), Point of Sale (POS), inventory management, and business intelligence software. 
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-2">
            <li><strong>Cloud Subscriptions:</strong> Granted on monthly or annual recurring licenses, including continuous updates, automated backups, and hosting infrastructure.</li>
            <li><strong>Lifetime / On-Premise Licenses:</strong> Granted for perpetual local offline usage according to the agreed number of branches and devices.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">3. Pricing &amp; Currency</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            All prices on our platform are primarily denominated and billed in <strong>Egyptian Pounds (EGP)</strong> for clients within Egypt, with regional currencies (SAR, AED, USD, etc.) displayed for international clients. All quoted prices are transparently displayed before payment checkout.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">4. Payment Methods &amp; Gateway Security</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Payments are securely processed via certified electronic payment gateways and banking partners. We accept:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-2">
            <li>Visa &amp; MasterCard debit and credit cards.</li>
            <li>Meeza national payment cards.</li>
            <li>Bank transfers and authorized installment partners.</li>
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed">
            Cardholder details and financial credentials are never stored on our servers. All transactions are encrypted using 256-bit TLS encryption and comply with global PCI-DSS standards.
          </p>
        </section>

        {/* Dedicated Refund Policy Section with Direct Link */}
        <section className="space-y-4 bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">5. Cancellation &amp; Refund Policy</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            All purchases, subscriptions, and licenses are strictly governed by our detailed Refund &amp; Cancellation Policy. We offer a <strong>14-day 100% money-back guarantee</strong> on new cloud subscriptions, and a <strong>7-day guarantee</strong> on offline licenses prior to activation key generation.
          </p>
          <p className="text-sm text-slate-800 font-semibold pt-1">
            To view complete cancellation procedures, timeframes, and non-refundable exceptions, please read our full{" "}
            <Link to="/refund-policy" className="text-brand-600 underline font-bold hover:text-brand-700">
              Refund, Cancellation &amp; Return Policy
            </Link>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">6. Service Level &amp; Support</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Z Systems commits to high availability and uptime for its cloud services. Technical support, training, and database migration consultations are provided via WhatsApp, phone, email (<a href="mailto:info@zsystemai.com" className="text-brand-600 font-mono font-bold">info@zsystemai.com</a>), and remote assistance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">7. Governing Law &amp; Jurisdiction</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            These Terms and any dispute arising in connection with them shall be governed by and construed in accordance with the applicable laws of the <strong>Arab Republic of Egypt</strong>.
          </p>
        </section>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout
      titleAr="الشروط والأحكام"
      titleEn="Terms & Conditions"
      subtitleAr="شروط استخدام خدمات وبرمجيات Z Systems وعقود الاشتراكات السحابية والتراخيص"
      subtitleEn="Terms of Service, Software Licensing, and Subscription Agreement for Z Systems"
    >
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2">١. مقدمة وقبول الشروط</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          أهلاً بكم في <strong>زد سستمز لحلول البرمجيات (Z Systems for Software Solutions)</strong>. بمجرد استخدامكم لموقعنا أو الاشتراك في أنظمة إدارة الموارد السحابية (ERP) ونقاط البيع (POS)، فإنكم توافقون التزاماً تاماً بهذه الشروط والأحكام المنظمة لتقديم خدماتنا البرمجية.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2">٢. وصف الخدمة والتراخيص الممنوحة</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          تقدم Z Systems برمجيات متكاملة سحابية ومحلية لإدارة المبيعات، المخازن، الحسابات العامة، شؤون الموظفين، والفوترة الإلكترونية:
        </p>
        <ul className="list-disc pr-6 text-xs sm:text-sm text-slate-600 space-y-2">
          <li><strong>الاشتراكات السحابية (Cloud ERP):</strong> تمنح العميل ترخيص استخدام مرن (شهري أو سنوي) يشمل الاستضافة السحابية الآمنة، النسخ الاحتياطي الآلي، وتحديثات النظام الدورية.</li>
          <li><strong>ترخيص التمليك المحلي (Offline Lifetime):</strong> يمنح العميل ترخيصاً دائماً لتشغيل النظام على خوادم أو أجهزة منشأته دون اشتراكات شهرية، وفقاً لعدد الفروع والشاشات المتفق عليها.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2">٣. العملة والأسعار</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          يتم تسعير وفوترة جميع الخدمات والاشتراكات للعملاء داخل مصر بـ <strong>الجنيه المصري (EGP)</strong> بصورة واضحة وشفافة شاملة تفاصيل الباقة، كما يدعم الموقع استعراض الأسعار بالعملات الإقليمية لخدمة عملائنا في الدول العربية وحول العالم.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2">٤. وسائل الدفع وأمان المعاملات</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          تتم معالجة المدفوعات الإلكترونية عبر بوابات دفع إلكترونية معتمدة ومؤمنة:
        </p>
        <ul className="list-disc pr-6 text-xs sm:text-sm text-slate-600 space-y-1.5">
          <li>بطاقات الائتمان والخصم المباشر (Visa و MasterCard).</li>
          <li>بطاقات الدفع الوطنية المصرية (ميزة Meeza).</li>
          <li>التحويلات البنكية المباشرة وخيارات التقسيط المعتمدة.</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
          <strong>معايير الأمان:</strong> لا تقوم Z Systems بتخزين بيانات بطاقات الائتمان إطلاقاً على خوادمها، وتخضع جميع عمليات الدفع لأعلى معايير التشفير البنكي العالمي ومعايير PCI-DSS.
        </p>
      </section>

      {/* DEDICATED REFUND POLICY SECTION WITH DIRECT LINK */}
      <section className="space-y-3 bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
          ٥. سياسة الإلغاء والاسترجاع
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          تخضع كافة عمليات الشراء وسداد الاشتراكات لسياسة الاستبدال والاسترجاع المعتمدة لدى الشركة، والتي تمنح العميل <strong>ضمان استرداد الأموال بنسبة ١٠٠٪ خلال ١٤ يوماً</strong> للاشتراكات السحابية، و<strong>٧ أيام</strong> لتراخيص التمليك قبل تسليم مفاتيح التفعيل.
        </p>
        <div className="pt-1">
          <Link
            to="/refund-policy"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 underline hover:text-brand-700"
          >
            <span>اضغط هنا للاطلاع على الشروط الكاملة ومواعيد الاسترداد في: سياسة الاستبدال والاسترجاع وإلغاء الاشتراك</span>
            <span dir="ltr">&larr;</span>
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2">٦. التزامات العميل وأمن الحساب</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          يلتزم العميل بالحفاظ على سرية بيانات تسجيل الدخول الخاصة بحسابه، ويكون مسؤولاً عن الأنشطة التشغيلية التي تتم من خلال حسابه، والتأكد من صحة البيانات المدخلة في النظام.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2">٧. القانون الواجب التطبيق والاختصاص القضائي</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          تخضع هذه الاتفاقية وأي التزام ينشأ عنها للقوانين المعمول بها في <strong>جمهورية مصر العربية</strong> وتختص المحاكم المصرية بالفصل في أي نزاع يتعلق بتفسير أو تطبيق هذه الشروط.
        </p>
      </section>
    </LegalLayout>
  );
}

