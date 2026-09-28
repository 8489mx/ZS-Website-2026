import React from "react";
import LegalLayout from "./LegalLayout";
import { useLanguage } from "../LanguageContext";
import { Lock, Shield, EyeOff, Server, Database, UserCheck, Cookie } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { lang } = useLanguage();

  if (lang === "en") {
    return (
      <LegalLayout
        titleAr="سياسة الخصوصية وأمان البيانات"
        titleEn="Privacy & Data Protection Policy"
        subtitleAr="التزامنا بحماية سرية بيانات عملائنا وتشفير المعاملات المالية"
        subtitleEn="Our commitment to safeguarding your business data and payment privacy"
      >
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">1. Overview &amp; Commitment</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            At <strong>Z Systems for Software Solutions</strong>, we consider the privacy and security of your business and personal information paramount. This Privacy Policy outlines how we collect, process, and safeguard your data when using our ERP and POS software solutions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">2. Financial Data &amp; Payment Processing Security</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            When you purchase a subscription or license through our site:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-2">
            <li><strong>Zero Storage of Cardholder Data:</strong> Z Systems never stores, views, or records your credit card numbers, CVV codes, or bank PINs on its servers.</li>
            <li><strong>Certified Payment Gateways:</strong> Payment processing is handled exclusively through authorized and certified electronic payment gateways compliant with international <strong>PCI-DSS</strong> standards.</li>
            <li><strong>256-bit TLS Encryption:</strong> All data transmissions between your browser and our servers are encrypted via 256-bit encryption using modern TLS protocols.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">3. Business &amp; Accounting Data Confidentiality</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            All records, invoices, customer directories, and inventory catalogs stored inside your Z Systems ERP instance belong solely to your organization. Z Systems does not sell, lease, or share your proprietary business data with third parties.
          </p>
        </section>

        {/* Data Collection, Rights, and Cookies Clauses */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">4. Data We Collect &amp; User Rights</h2>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong>Data We Collect:</strong> We collect your name, email address, phone number, and organization name upon registration or service request, solely for the purpose of providing service, technical support, and issuing invoices.
            </p>
            <p>
              <strong>Customer Rights:</strong> Clients have the right at any time to request access to, correction of, or deletion of their personal data by contacting us at the email provided below.
            </p>
            <p>
              <strong>Cookies:</strong> The site may use cookies to improve your browsing experience, and you can control or disable them through your browser settings.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">5. Privacy Inquiries</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            If you have questions or inquiries regarding our data protection policies, please contact us at:{" "}
            <a href="mailto:info@zsystemai.com" className="text-brand-600 underline font-mono font-bold">info@zsystemai.com</a>{" "}
            or call{" "}
            <a href="tel:+201018017523" className="text-brand-600 underline font-mono font-bold" dir="ltr">
              <span dir="ltr" className="inline-block font-mono">+20 1018017523</span>
            </a>{" "}
            /{" "}
            <a href="tel:0663640828" className="text-slate-800 underline font-mono font-bold" dir="ltr">
              <span dir="ltr" className="inline-block font-mono">066-3640828</span>
            </a>.
          </p>
        </section>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout
      titleAr="سياسة الخصوصية وأمان البيانات"
      titleEn="Privacy & Data Protection Policy"
      subtitleAr="التزامنا بحماية سرية بيانات عملائنا وتشفير المعاملات المالية"
      subtitleEn="Our commitment to safeguarding your business data and payment privacy"
    >
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-600" />
          <span>١. الالتزام بحماية الخصوصية</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          تعتبر <strong>زد سستمز لحلول البرمجيات (Z Systems for Software Solutions)</strong> خصوصية وسرية بياناتكم المحاسبية والتجارية أولوية قصوى. توضح هذه الوثيقة التزامنا الكامل بحماية بياناتكم وفقاً لأفضل الممارسات والمعايير العالمية.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-600" />
          <span>٢. أمان المدفوعات والبطاقات البنكية</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          عند قيامكم بسداد قيمة الاشتراك أو شراء التراخيص من خلال منصتنا:
        </p>
        <ul className="list-disc pr-6 text-xs sm:text-sm text-slate-600 space-y-2">
          <li><strong>عدم تخزين بيانات البطاقات:</strong> لا تقوم Z Systems نهائياً بتسجيل أو حفظ أرقام بطاقات الدفع أو رموز الأمان (CVV) على خوادمها الخاصة.</li>
          <li><strong>معالجة عبر بوابات دفع معتمدة:</strong> تتم معالجة كافة المدفوعات والبطاقات البنكية من خلال بوابات دفع إلكترونية مرخصة ومعتمدة رسمياً ومتوافقة مع أعلى معايير أمان بطاقات الدفع العالمية (PCI-DSS).</li>
          <li><strong>تشفير حديث للاتصال:</strong> يتم تأمين كافة الاتصالات وعمليات نقل البيانات بتشفير 256-bit عبر بروتوكول TLS الحديث المعتمد مصرفياً.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
          <Server className="w-5 h-5 text-brand-600" />
          <span>٣. سرية البيانات التشغيلية والمخزنية</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          كافة الفواتير، وحركات المخازن، والبيانات المالية المسجلة داخل نظام Z ERP ملك حصري وخالص لمنشأتكم. نتعهد بعدم مشاركة أو بيع أي من بياناتكم مع أي أطراف خارجية تحت أي ظرف.
        </p>
      </section>

      {/* NEW SECTION: Data Collected, Customer Rights, Cookies */}
      <section className="space-y-3 bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
          <Database className="w-5 h-5 text-brand-600" />
          <span>٤. البيانات التي نجمعها، حقوق العميل، وملفات تعريف الارتباط</span>
        </h2>
        
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div>
            <strong className="text-slate-900 block mb-0.5">البيانات التي نجمعها:</strong>
            <p className="text-slate-600">
              نقوم بجمع الاسم، البريد الإلكتروني، رقم الهاتف، واسم المنشأة عند التسجيل أو طلب الخدمة، وذلك لغرض تقديم الخدمة والدعم الفني وإصدار الفواتير فقط.
            </p>
          </div>

          <div>
            <strong className="text-slate-900 block mb-0.5">حقوق العميل:</strong>
            <p className="text-slate-600">
              يحق للعميل في أي وقت طلب الاطلاع على بياناته الشخصية أو تعديلها أو حذفها بمراسلتنا على البريد الإلكتروني الموضح أدناه.
            </p>
          </div>

          <div>
            <strong className="text-slate-900 block mb-0.5">ملفات تعريف الارتباط (Cookies):</strong>
            <p className="text-slate-600">
              قد يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة التصفح، ويمكنك التحكم فيها من إعدادات المتصفح.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
          <EyeOff className="w-5 h-5 text-brand-600" />
          <span>٥. الاستفسارات والخصوصية</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          لأي استفسارات بخصوص الخصوصية وحماية البيانات، يمكنكم مراسلتنا مباشرة عبر البريد الإلكتروني:{" "}
          <a href="mailto:info@zsystemai.com" className="text-brand-600 underline font-mono font-bold">info@zsystemai.com</a>{" "}
          أو هاتفياً:{" "}
          <a href="tel:+201018017523" className="text-brand-600 underline font-mono font-bold" dir="ltr">
            <span dir="ltr" className="inline-block font-mono">+20 1018017523</span>
          </a>{" "}
          /{" "}
          <a href="tel:0663640828" className="text-slate-800 underline font-mono font-bold" dir="ltr">
            <span dir="ltr" className="inline-block font-mono">066-3640828</span>
          </a>.
        </p>
      </section>
    </LegalLayout>
  );
}

