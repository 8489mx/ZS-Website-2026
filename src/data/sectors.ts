import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  CloudOff,
  Eye,
  FileText,
  ListChecks,
  Lock,
  Network,
  PlugZap,
  ReceiptText,
  RefreshCw,
  Scale,
  ShieldCheck,
  Store,
  Timer,
  Users,
  UtensilsCrossed,
  Warehouse,
  WifiOff,
  Zap,
} from "lucide-react";

/**
 * Content model for the sector / solution landing pages.
 *
 * Every claim in this file traces to the published product facts in
 * public/llms.txt: multi-branch ERP + POS, a cloud edition and a local
 * edition that works fully offline and syncs when the connection
 * returns, per-cashier permissions with an audit log of voids,
 * discounts and price edits, multi-warehouse inventory with transfers,
 * reorder alerts and batch tracking, tax invoices with QR codes, a
 * ZATCA e-invoicing submission service for Saudi Arabia, standard POS
 * hardware, and EGP/SAR/AED/QAR/KWD/BHD/OMR currencies. No statistics,
 * customer counts, testimonials, ratings, or prices are stated here;
 * pricing lives only on the /erp page.
 */

export type SectorSlug = "pos-supermarket" | "pos-restaurants" | "offline-pos";

export interface SectorPoint {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface SectorStep {
  title: string;
  text: string;
}

export interface SectorFaq {
  q: string;
  a: string;
}

type Points4 = [SectorPoint, SectorPoint, SectorPoint, SectorPoint];
type Points6 = [SectorPoint, SectorPoint, SectorPoint, SectorPoint, SectorPoint, SectorPoint];
type Steps3 = [SectorStep, SectorStep, SectorStep];
type Faqs5 = [SectorFaq, SectorFaq, SectorFaq, SectorFaq, SectorFaq];

export interface SectorContent {
  /** Short label used on related-page cards. */
  cardTitle: string;
  h1: string;
  /** Two-to-three sentence direct answer to the buyer query. */
  lead: string;
  pains: Points4;
  features: Points6;
  steps: Steps3;
  faqs: Faqs5;
}

export interface Sector {
  slug: SectorSlug;
  path: string;
  related: SectorSlug[];
  ar: SectorContent;
  en: SectorContent;
}

const supermarket: Sector = {
  slug: "pos-supermarket",
  path: "/pos-supermarket",
  related: ["pos-restaurants", "offline-pos"],
  ar: {
    cardTitle: "برنامج كاشير للسوبر ماركت",
    h1: "برنامج كاشير للسوبر ماركت ومحلات البقالة",
    lead: "Z-ERP هو برنامج كاشير للسوبر ماركت يربط نقطة البيع بالمخزون والمحاسبة في نظام واحد: تبيع بالباركود بسرعة في أوقات الذروة، ويتحدث مخزونك مع كل فاتورة، وتدير فروعك ومخازنك من مكان واحد. وتتوفر منه نسخة محلية تعمل بالكامل بدون إنترنت وتزامن بياناتها عند عودة الاتصال، حتى لا يتوقف البيع أبدًا.",
    pains: [
      {
        icon: Users,
        title: "طوابير وقت الذروة",
        text: "أي بطء عند الكاشير في أوقات الذروة يعني طابورًا أطول وعملاء يتركون مشترياتهم، خصوصًا إذا كان البحث عن سعر صنف أو إدخاله يتم يدويًا.",
      },
      {
        icon: Boxes,
        title: "فروقات مخزون لا تعرف سببها",
        text: "مع آلاف الأصناف سريعة الحركة، أي عملية بيع لا تُسجل بدقة تظهر فرقًا في الجرد، وتتحول إلى خسارة لا تستطيع تحديد مصدرها.",
      },
      {
        icon: Eye,
        title: "إلغاءات وخصومات بدون رقابة",
        text: "إلغاء فاتورة بعد الدفع، أو خصم غير مبرر، أو تعديل سعر عند الكاشير، كلها تسريبات تأكل من الربح ولا تُكتشف إلا متأخرًا أو لا تُكتشف أصلًا.",
      },
      {
        icon: WifiOff,
        title: "انقطاع الإنترنت يوقف البيع",
        text: "إذا كان نظامك سحابيًا فقط، فانقطاع الاتصال يعني توقف البيع أو اللجوء إلى الورق، ثم إدخالًا يدويًا مليئًا بالأخطاء بعد عودة الخدمة.",
      },
    ],
    features: [
      {
        icon: Zap,
        title: "بيع سريع بالباركود",
        text: "شاشة كاشير مصممة للسرعة: اقرأ الباركود وأصدر فاتورة ضريبية برمز QR في ثوانٍ، مع أجهزة نقاط البيع المعتادة من طابعات إيصالات وماسحات باركود وأدراج نقدية.",
      },
      {
        icon: RefreshCw,
        title: "مخزون يتحدث مع كل فاتورة",
        text: "كل عملية بيع تخصم من المخزون تلقائيًا، مع تنبيهات عند الوصول إلى حد إعادة الطلب وتتبع لدفعات الأصناف يساعدك على متابعة تواريخ صلاحية الأغذية قبل أن تتحول إلى هالك.",
      },
      {
        icon: Scale,
        title: "أصناف بالوزن وأصناف بالقطعة",
        text: "بِع الأصناف الموزونة مثل الخضار والجبن واللحوم والأصناف المغلفة بالقطعة من نفس شاشة الكاشير، بسعر محسوب حسب وحدة بيع كل صنف.",
      },
      {
        icon: ShieldCheck,
        title: "رقابة كاملة على الكاشير",
        text: "صلاحيات منفصلة لكل كاشير وسجل تدقيق يوثق الإلغاءات والخصومات وتعديلات الأسعار وفتح درج النقدية، فتعرف من فعل ماذا ومتى.",
      },
      {
        icon: Warehouse,
        title: "فروع ومخازن متعددة",
        text: "أدر مخازن متعددة وحركات التحويل بين الفروع، وتابع مخزون ومبيعات كل فرع لحظيًا من مكان واحد في النسخة السحابية.",
      },
      {
        icon: CloudOff,
        title: "نسخة محلية تعمل بدون إنترنت",
        text: "النسخة المحلية تستمر في البيع وإصدار الفواتير أثناء انقطاع الإنترنت، وتزامن بياناتها تلقائيًا بمجرد عودة الاتصال.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ فرعك الأول، وأضف الأصناف والأسعار والباركود أو استوردها.",
      },
      {
        title: "جهّز الكاشير والمخزون",
        text: "وصّل طابعة الإيصالات وماسح الباركود ودرج النقدية، وحدّد صلاحيات كل كاشير.",
      },
      {
        title: "بِع وتابع من أي مكان",
        text: "ابدأ البيع من أول يوم، وتابع المبيعات والمخزون والتقارير لكل فرع على حدة أو مجمعة.",
      },
    ],
    faqs: [
      {
        q: "هل يعمل برنامج الكاشير إذا انقطع الإنترنت؟",
        a: "نعم. النسخة المحلية من Z-ERP تعمل بالكامل بدون إنترنت، فتستمر في البيع وإصدار الفواتير وتحديث المخزون محليًا، ثم تزامن البيانات تلقائيًا عند عودة الاتصال. النسخة السحابية وحدها هي التي تعتمد على الاتصال المستمر.",
      },
      {
        q: "هل يدعم البرنامج أجهزة الكاشير التي أملكها؟",
        a: "يعمل Z-ERP مع أجهزة نقاط البيع القياسية: طابعات الإيصالات الحرارية، وماسحات الباركود، وأدراج النقدية، فغالبًا لن تحتاج إلى تغيير أجهزتك الحالية.",
      },
      {
        q: "كيف يقلل البرنامج سرقات الكاشير؟",
        a: "عن طريق صلاحيات منفصلة لكل كاشير تحدد من يستطيع الإلغاء أو الخصم أو تعديل الأسعار، وسجل تدقيق يوثق كل عملية من هذا النوع باسم المستخدم ووقتها، فيصبح أي تلاعب ظاهرًا وقابلًا للمراجعة.",
      },
      {
        q: "هل أستطيع إدارة أكثر من فرع ومخزن؟",
        a: "نعم. يدعم Z-ERP الفروع المتعددة والمخازن المتعددة داخل الفرع الواحد، مع تحويلات مخزون بين الفروع ومزامنة لحظية في النسخة السحابية.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "POS software for supermarkets",
    h1: "Supermarket & Grocery POS Software",
    lead: "Z-ERP is POS software for supermarkets that connects the checkout to inventory and accounting in one system: you sell by barcode at peak-hour speed, stock updates with every invoice, and you manage all branches and warehouses from one place. A local edition also works fully offline and syncs when the connection returns, so selling never stops.",
    pains: [
      {
        icon: Users,
        title: "Peak-hour queues",
        text: "Any slowdown at the till during peak hours means longer queues and abandoned baskets, especially when prices have to be looked up or keyed in by hand.",
      },
      {
        icon: Boxes,
        title: "Stock differences you cannot explain",
        text: "With thousands of fast-moving items, any sale recorded inaccurately shows up as a stocktaking difference and turns into a loss you cannot trace.",
      },
      {
        icon: Eye,
        title: "Uncontrolled voids and discounts",
        text: "A receipt voided after payment, an unjustified discount, or a price edited at the till all leak profit and surface late, if at all.",
      },
      {
        icon: WifiOff,
        title: "Internet outages stop selling",
        text: "With a cloud-only system, a dropped connection means selling stops or falls back to paper, followed by error-prone manual re-entry.",
      },
    ],
    features: [
      {
        icon: Zap,
        title: "Fast barcode checkout",
        text: "A till screen built for speed: scan the barcode and issue a tax invoice with a QR code in seconds, using standard POS hardware such as receipt printers, barcode scanners, and cash drawers.",
      },
      {
        icon: RefreshCw,
        title: "Stock that updates with every sale",
        text: "Every sale deducts from stock automatically, with reorder-point alerts and batch tracking that helps you follow food expiry dates before items turn into waste.",
      },
      {
        icon: Scale,
        title: "Weighed and unit-priced items",
        text: "Sell weighed goods such as vegetables, cheese, and meat alongside packaged unit items from the same till screen, priced by each item's unit of sale.",
      },
      {
        icon: ShieldCheck,
        title: "Full control over cashiers",
        text: "Separate permissions for each cashier and an audit log recording voids, discounts, price edits, and cash-drawer openings, so you know who did what, and when.",
      },
      {
        icon: Warehouse,
        title: "Multiple branches and warehouses",
        text: "Run multiple warehouses with stock transfers between branches, and follow each branch's stock and sales in real time from one place in the cloud edition.",
      },
      {
        icon: CloudOff,
        title: "A local edition that works offline",
        text: "The local edition keeps selling and issuing invoices during an internet outage and syncs its data automatically once the connection returns.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial, create your first branch, and add or import your items, prices, and barcodes.",
      },
      {
        title: "Set up the till and stock",
        text: "Connect the receipt printer, barcode scanner, and cash drawer, and set each cashier's permissions.",
      },
      {
        title: "Sell and stay on top of it",
        text: "Start selling from day one and follow sales, stock, and reports for each branch separately or combined.",
      },
    ],
    faqs: [
      {
        q: "Does the POS keep working if the internet goes down?",
        a: "Yes. The local edition of Z-ERP works fully offline: selling, invoicing, and stock updates continue locally, and data syncs automatically when the connection returns. Only the cloud edition depends on a constant connection.",
      },
      {
        q: "Will it work with my existing POS hardware?",
        a: "Z-ERP works with standard POS hardware: thermal receipt printers, barcode scanners, and cash drawers, so in most cases you will not need to replace your current devices.",
      },
      {
        q: "How does it reduce cashier theft?",
        a: "Separate permissions per cashier define who may void, discount, or edit prices, and an audit log records every such action with the user and time, so manipulation is visible and reviewable.",
      },
      {
        q: "Can I manage more than one branch and warehouse?",
        a: "Yes. Z-ERP supports multiple branches and multiple warehouses per branch, with stock transfers between branches and real-time sync in the cloud edition.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const restaurants: Sector = {
  slug: "pos-restaurants",
  path: "/pos-restaurants",
  related: ["pos-supermarket", "offline-pos"],
  ar: {
    cardTitle: "برنامج كاشير للمطاعم والكافيهات",
    h1: "برنامج كاشير للمطاعم والكافيهات والمخابز",
    lead: "Z-ERP هو برنامج كاشير للمطاعم والكافيهات والمخابز يدير الطلبات بأنواعها في الصالة والتيك أواي والتوصيل من شاشة واحدة، ويربط المبيعات بالمخزون والمحاسبة، ويصدر فواتير ضريبية برمز QR. وتتوفر نسخة محلية تعمل بدون إنترنت وتزامن عند عودة الاتصال، حتى لا تتعطل الخدمة في أوقات الذروة.",
    pains: [
      {
        icon: Timer,
        title: "طلبات تتلخبط وقت الذروة",
        text: "في أوقات الزحام تتداخل طلبات الصالة مع التيك أواي والتوصيل، وأي خطأ في طلب يعني إعادة تحضير وخسارة وعميلًا غير راضٍ.",
      },
      {
        icon: Boxes,
        title: "خامات تخلص فجأة",
        text: "مخزون الخامات والمكونات غير مربوط بحركة البيع، فينفد صنف أساسي في عز الخدمة ولا تكتشف ذلك إلا عندما يطلبه عميل.",
      },
      {
        icon: Eye,
        title: "إلغاءات ووجبات بدون رقابة",
        text: "إلغاء طلب بعد تقديمه أو خصم لصديق أو تعديل سعر، عمليات قد تتم عند الكاشير دون أن تظهر في أي تقرير.",
      },
      {
        icon: WifiOff,
        title: "انقطاع الإنترنت يعطل الخدمة",
        text: "توقف إصدار الفواتير أو بطء النظام وقت الذروة بسبب الاتصال يعني طابورًا عند الكاشير وتجربة سيئة للعميل.",
      },
    ],
    features: [
      {
        icon: UtensilsCrossed,
        title: "طلبات الصالة والتيك أواي والتوصيل",
        text: "استقبل وسجل طلبات الصالة والتيك أواي والتوصيل من نفس شاشة الكاشير، وحوّل كل طلب إلى فاتورة منظمة تصل إلى المطبخ والحسابات دون إعادة إدخال.",
      },
      {
        icon: ReceiptText,
        title: "فواتير ضريبية برمز QR وخدمة ZATCA",
        text: "فواتير تحمل الحقول الضريبية ورمز QR، مع خدمة إرسال للفوترة الإلكترونية لدى هيئة الزكاة والضريبة والجمارك (ZATCA) للمنشآت العاملة في السعودية.",
      },
      {
        icon: ShieldCheck,
        title: "رقابة على الكاشير والخصومات",
        text: "صلاحيات منفصلة لكل كاشير وسجل تدقيق للإلغاءات والخصومات وتعديلات الأسعار وفتح درج النقدية، فكل استثناء موثق باسم صاحبه.",
      },
      {
        icon: ListChecks,
        title: "متابعة مخزون الخامات",
        text: "تابع مخزون الخامات والأصناف في مخازن متعددة عند الحاجة، مع تنبيهات عند الوصول إلى حد إعادة الطلب حتى تطلب قبل النفاد لا بعده.",
      },
      {
        icon: CloudOff,
        title: "خدمة لا تتوقف بانقطاع الإنترنت",
        text: "النسخة المحلية تعمل بالكامل بدون إنترنت أثناء الخدمة، وتزامن المبيعات والبيانات تلقائيًا عند عودة الاتصال.",
      },
      {
        icon: Network,
        title: "فروع متعددة بعملات متعددة",
        text: "أدر فروعًا في أكثر من مدينة أو دولة من نظام واحد، مع دعم عملات مصر والسعودية والخليج (EGP وSAR وAED وQAR وKWD وBHD وOMR).",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل وأنشئ فرعك، وأضف الأصناف والأسعار وقوائم البيع الأساسية.",
      },
      {
        title: "جهّز نقطة البيع",
        text: "وصّل أجهزة الكاشير المعتادة من طابعة إيصالات وماسح باركود ودرج نقدية، وحدّد صلاحيات كل كاشير.",
      },
      {
        title: "استقبل الطلبات وتابع",
        text: "ابدأ استقبال طلبات الصالة والتيك أواي والتوصيل، وتابع المبيعات والمخزون والتقارير يومًا بيوم.",
      },
    ],
    faqs: [
      {
        q: "هل يعمل البرنامج في المطعم بدون إنترنت؟",
        a: "نعم، النسخة المحلية تعمل بالكامل بدون اتصال: تستمر في استقبال الطلبات وإصدار الفواتير أثناء الخدمة، وتزامن البيانات عند عودة الإنترنت.",
      },
      {
        q: "هل يصدر البرنامج فواتير ضريبية؟",
        a: "نعم، يصدر Z-ERP فواتير بالحقول الضريبية ورمز QR، ويوفر للمنشآت في السعودية خدمة إرسال الفوترة الإلكترونية إلى هيئة الزكاة والضريبة والجمارك (ZATCA).",
      },
      {
        q: "هل أستطيع منع الكاشير من الإلغاء أو الخصم؟",
        a: "نعم، الصلاحيات منفصلة لكل كاشير، فيمكن قصر الإلغاء والخصم وتعديل الأسعار على المديرين، وكل عملية استثنائية تُسجل في سجل التدقيق باسم من نفذها.",
      },
      {
        q: "هل يناسب البرنامج سلسلة فروع؟",
        a: "نعم، Z-ERP نظام متعدد الفروع والمخازن مع مزامنة سحابية، فيمكنك متابعة مبيعات ومخزون كل فرع من مكان واحد، وبعملات متعددة للفروع خارج مصر.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "خطط الاشتراك والترخيص موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا حسب حجم النشاط، ويمكنك تجربة النظام مجانًا أولًا.",
      },
    ],
  },
  en: {
    cardTitle: "POS software for restaurants & cafés",
    h1: "Restaurant, Café & Bakery POS Software",
    lead: "Z-ERP is POS software for restaurants, cafés, and bakeries that runs dine-in, takeaway, and delivery orders from one screen, connects sales to inventory and accounting, and issues tax invoices with QR codes. A local edition works without internet and syncs when the connection returns, so service never stalls at peak time.",
    pains: [
      {
        icon: Timer,
        title: "Orders get mixed up at peak time",
        text: "During the rush, dine-in, takeaway, and delivery orders collide, and a single wrong order means remakes, waste, and an unhappy guest.",
      },
      {
        icon: Boxes,
        title: "Ingredients run out without warning",
        text: "Ingredient and item stock is not tied to sales, so a key item runs out mid-service and you only find out when a customer orders it.",
      },
      {
        icon: Eye,
        title: "Voids and freebies with no oversight",
        text: "An order voided after serving, a friendly discount, or a price edit can all happen at the till without appearing in any report.",
      },
      {
        icon: WifiOff,
        title: "An outage disrupts service",
        text: "Invoicing that stops or slows down because of the connection means a queue at the till and a poor guest experience.",
      },
    ],
    features: [
      {
        icon: UtensilsCrossed,
        title: "Dine-in, takeaway & delivery orders",
        text: "Take and record dine-in, takeaway, and delivery orders from the same till screen, turning every order into an organised invoice for the kitchen and the accounts with no re-entry.",
      },
      {
        icon: ReceiptText,
        title: "Tax invoices with QR & ZATCA service",
        text: "Invoices carry the tax fields and a QR code, with an e-invoicing submission service to ZATCA for businesses operating in Saudi Arabia.",
      },
      {
        icon: ShieldCheck,
        title: "Control over cashiers and discounts",
        text: "Separate permissions for each cashier and an audit log of voids, discounts, price edits, and cash-drawer openings, so every exception is recorded under its owner's name.",
      },
      {
        icon: ListChecks,
        title: "Ingredient stock under watch",
        text: "Follow ingredient and item stock across multiple warehouses when needed, with reorder-point alerts so you order before you run out, not after.",
      },
      {
        icon: CloudOff,
        title: "Service that survives outages",
        text: "The local edition works fully offline during service and syncs sales and data automatically when the connection returns.",
      },
      {
        icon: Network,
        title: "Multiple branches, multiple currencies",
        text: "Run branches in more than one city or country from one system, with support for Egypt, Saudi, and Gulf currencies (EGP, SAR, AED, QAR, KWD, BHD, OMR).",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up, create your branch, and add your items, prices, and basic sales lists.",
      },
      {
        title: "Set up the point of sale",
        text: "Connect standard till hardware — receipt printer, barcode scanner, and cash drawer — and set each cashier's permissions.",
      },
      {
        title: "Take orders and follow up",
        text: "Start taking dine-in, takeaway, and delivery orders, and follow sales, stock, and reports day by day.",
      },
    ],
    faqs: [
      {
        q: "Does it work in the restaurant without internet?",
        a: "Yes. The local edition works fully offline: orders and invoicing continue during service, and data syncs when the internet returns.",
      },
      {
        q: "Does it issue tax invoices?",
        a: "Yes. Z-ERP issues invoices with tax fields and QR codes, and offers businesses in Saudi Arabia an e-invoicing submission service to ZATCA.",
      },
      {
        q: "Can I stop cashiers from voiding or discounting?",
        a: "Yes. Permissions are set per cashier, so voids, discounts, and price edits can be restricted to managers, and every exceptional action is recorded in the audit log under the name of whoever performed it.",
      },
      {
        q: "Does it suit a branch chain?",
        a: "Yes. Z-ERP is multi-branch and multi-warehouse with cloud sync, so you can follow each branch's sales and stock from one place, in multiple currencies for branches outside Egypt.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans are listed in detail on the Z-ERP system page on our website, based on business size, and you can try the system free first.",
      },
    ],
  },
};

const offlinePos: Sector = {
  slug: "offline-pos",
  path: "/offline-pos",
  related: ["pos-supermarket", "pos-restaurants"],
  ar: {
    cardTitle: "برنامج كاشير يعمل بدون إنترنت",
    h1: "برنامج كاشير يعمل بدون إنترنت",
    lead: "Z-ERP برنامج كاشير يعمل بدون إنترنت عبر نسخته المحلية: البيع وإصدار الفواتير وتحديث المخزون يستمر بالكامل عند انقطاع الاتصال، وتتم مزامنة البيانات مع السحابة تلقائيًا بمجرد عودته. إنه الحل للمحلات والفروع التي لا تستطيع إيقاف البيع دقيقة واحدة، أو تعمل في مناطق ضعيفة التغطية.",
    pains: [
      {
        icon: WifiOff,
        title: "كل انقطاع يعني بيعًا متوقفًا",
        text: "الأنظمة السحابية فقط تقف عند أول انقطاع، فتخسر مبيعات اللحظة وتضطر إما إلى إغلاق الكاشير أو البيع بدون تسجيل.",
      },
      {
        icon: FileText,
        title: "الورق ثم الإدخال اليدوي",
        text: "تسجيل المبيعات على الورق أثناء الانقطاع ثم إدخالها لاحقًا يستهلك وقتًا ويملأ حساباتك ومخزونك بالأخطاء.",
      },
      {
        icon: PlugZap,
        title: "فروع في مناطق ضعيفة التغطية",
        text: "فرع في منطقة اتصالها ضعيف أو متقطع لا يستطيع الاعتماد على نظام يشترط اتصالًا مستقرًا طوال ساعات العمل.",
      },
      {
        icon: Lock,
        title: "الخوف من ضياع البيانات المحلية",
        text: "العمل محليًا يثير سؤالًا مشروعًا: ماذا لو تعطل الجهاز؟ تحتاج ضمانة أن بياناتك لا تعيش على جهاز واحد فقط.",
      },
    ],
    features: [
      {
        icon: CloudOff,
        title: "بيع كامل بدون اتصال",
        text: "النسخة المحلية تصدر الفواتير وتدير المخزون والكاشير بكامل وظائفها أثناء الانقطاع، دون أي وضع مقيد أو شاشات معطلة.",
      },
      {
        icon: RefreshCw,
        title: "مزامنة تلقائية عند عودة الإنترنت",
        text: "بمجرد عودة الاتصال تزامن النسخة المحلية فواتيرها وحركات مخزونها مع السحابة تلقائيًا، دون إدخال يدوي من فريقك.",
      },
      {
        icon: Store,
        title: "نظام واحد: سحابي ومحلي",
        text: "النسخة المحلية تزامن بياناتها مع نفس منظومة Z-ERP السحابية، فتبقى بيانات الفرع جزءًا من تقاريرك الموحدة حتى لو كان اتصاله متقطعًا.",
      },
      {
        icon: ShieldCheck,
        title: "الرقابة تعمل محليًا أيضًا",
        text: "صلاحيات الكاشير وسجل تدقيق الإلغاءات والخصومات وتعديلات الأسعار جزء من النظام نفسه، فيعمل في النسخة المحلية كما يعمل في السحابية.",
      },
      {
        icon: ReceiptText,
        title: "فواتير ضريبية برمز QR دون اتصال",
        text: "الفواتير الصادرة أثناء الانقطاع تحمل الحقول الضريبية ورمز QR كالمعتاد، وتندرج ضمن بياناتك المتزامنة بعد عودة الاتصال.",
      },
      {
        icon: Network,
        title: "متابعة مركزية عندما يتوفر الاتصال",
        text: "كل ما تحتاجه المزامنة هو عودة الاتصال في أي وقت، لتصبح مبيعات ومخزون الفرع البعيد ظاهرين في تقاريرك الموحدة.",
      },
    ],
    steps: [
      {
        title: "اختر النسخة المحلية",
        text: "ابدأ بالتجربة المجانية، واختر النسخة المحلية للفرع الذي يعاني من الاتصال.",
      },
      {
        title: "ثبّت وجهّز في الفرع",
        text: "ثبّت النظام في الفرع، وأضف الأصناف والأسعار، ووصّل أجهزة الكاشير القياسية، وحدّد صلاحيات الكاشير.",
      },
      {
        title: "بِع دائمًا، والمزامنة علينا",
        text: "اعمل يوميًا دون أن تفكر في الاتصال، واترك المزامنة تتم تلقائيًا كلما عاد الإنترنت.",
      },
    ],
    faqs: [
      {
        q: "ماذا يحدث للفواتير الصادرة أثناء انقطاع الإنترنت؟",
        a: "تُحفظ الفواتير وحركات المخزون محليًا في الفرع، وتتم مزامنتها تلقائيًا مع السحابة بمجرد عودة الاتصال، فلا تضيع عملية ولا تحتاج إلى إعادة إدخال.",
      },
      {
        q: "هل النسخة المحلية نسخة مخفّفة من النظام؟",
        a: "لا. النسخة المحلية هي نظام Z-ERP نفسه بنقاط البيع والمحاسبة والمخزون متعدد الفروع والمخازن، وصلاحيات الكاشير وسجل التدقيق، وفواتير ضريبية برمز QR — الفرق أنها تعمل في فرعك دون اعتماد على الاتصال.",
      },
      {
        q: "هل أحتاج إلى الإنترنت نهائيًا؟",
        a: "البيع اليومي لا يحتاج أي اتصال. تحتاج إلى عودة الاتصال من وقت لآخر فقط لكي تحدث المزامنة وتصل بيانات الفرع إلى تقاريرك الموحدة.",
      },
      {
        q: "ماذا لو كان لديّ فروع متصلة وأخرى ضعيفة التغطية؟",
        a: "يمكن لكل فرع العمل بالنسخة المناسبة لاتصاله، وتتزامن بيانات النسخة المحلية مع منظومة Z-ERP، فتبقى تقاريرك ومتابعتك موحدة لكل الفروع.",
      },
      {
        q: "كم تبلغ تكلفة النسخة المحلية؟",
        a: "خطط الاشتراك والترخيص، بما فيها خيارات النسخة المحلية، موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا، ويمكنك البدء بتجربة مجانية.",
      },
    ],
  },
  en: {
    cardTitle: "POS that works offline",
    h1: "Offline POS Software That Never Stops Selling",
    lead: "Z-ERP is POS software that works without internet through its local edition: selling, invoicing, and stock updates continue in full during an outage, and data syncs to the cloud automatically the moment the connection returns. It is built for shops and branches that cannot stop selling for a minute, or that operate where coverage is weak.",
    pains: [
      {
        icon: WifiOff,
        title: "Every outage is lost selling time",
        text: "Cloud-only systems stop at the first outage, so you lose the moment's sales and must either close the till or sell unrecorded.",
      },
      {
        icon: FileText,
        title: "Paper first, manual entry later",
        text: "Writing sales on paper during an outage and keying them in afterwards burns time and fills your accounts and stock with errors.",
      },
      {
        icon: PlugZap,
        title: "Branches where coverage is weak",
        text: "A branch with weak or intermittent connectivity cannot rely on a system that demands a stable connection all working day.",
      },
      {
        icon: Lock,
        title: "Fear of losing local data",
        text: "Working locally raises a fair question: what if the device fails? You need assurance that your data does not live on a single machine.",
      },
    ],
    features: [
      {
        icon: CloudOff,
        title: "Complete selling with no connection",
        text: "The local edition issues invoices and runs stock and cashiers with full functionality during an outage — no restricted mode and no dead screens.",
      },
      {
        icon: RefreshCw,
        title: "Automatic sync when internet returns",
        text: "As soon as the connection is back, the local edition syncs its invoices and stock movements to the cloud automatically, with no manual entry from your team.",
      },
      {
        icon: Store,
        title: "One system: cloud and local",
        text: "The local edition syncs with the same Z-ERP cloud system, so a branch's data stays part of your combined reporting even when its connection is intermittent.",
      },
      {
        icon: ShieldCheck,
        title: "Controls work locally too",
        text: "Cashier permissions and the audit log of voids, discounts, and price edits are part of the system itself, so they work in the local edition exactly as in the cloud.",
      },
      {
        icon: ReceiptText,
        title: "Tax invoices with QR, offline",
        text: "Invoices issued during an outage carry the tax fields and QR code as usual, and join your synced data once the connection returns.",
      },
      {
        icon: Network,
        title: "Central oversight whenever a connection exists",
        text: "All sync needs is the connection coming back at any point, and the remote branch's sales and stock appear in your combined reports.",
      },
    ],
    steps: [
      {
        title: "Choose the local edition",
        text: "Start with the free trial and choose the local edition for the branch that struggles with connectivity.",
      },
      {
        title: "Install and set up at the branch",
        text: "Install the system at the branch, add items and prices, connect standard till hardware, and set cashier permissions.",
      },
      {
        title: "Sell always; sync is on us",
        text: "Work every day without thinking about the connection, and let sync happen automatically whenever the internet returns.",
      },
    ],
    faqs: [
      {
        q: "What happens to invoices issued during an outage?",
        a: "Invoices and stock movements are stored locally at the branch and sync to the cloud automatically as soon as the connection returns — nothing is lost and nothing needs re-entering.",
      },
      {
        q: "Is the local edition a reduced version?",
        a: "No. The local edition is Z-ERP itself: POS, accounting, multi-branch and multi-warehouse inventory, cashier permissions and audit log, and tax invoices with QR codes. The only difference is that it runs at your branch without depending on a connection.",
      },
      {
        q: "Do I need the internet at all?",
        a: "Daily selling needs no connection at all. You only need connectivity from time to time so sync can happen and branch data reaches your combined reports.",
      },
      {
        q: "What if some branches are connected and others are not?",
        a: "Each branch can run the edition that suits its connectivity, and local-edition data syncs into the Z-ERP system, keeping your reporting and oversight unified across all branches.",
      },
      {
        q: "How much does the local edition cost?",
        a: "Subscription and licence plans, including local-edition options, are listed in detail on the Z-ERP system page on our website, and you can start with a free trial.",
      },
    ],
  },
};

export const SECTORS: Record<SectorSlug, Sector> = {
  "pos-supermarket": supermarket,
  "pos-restaurants": restaurants,
  "offline-pos": offlinePos,
};

export const SECTOR_LIST: Sector[] = [supermarket, restaurants, offlinePos];
