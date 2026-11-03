import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  BadgeCheck,
  BellRing,
  Boxes,
  CalendarClock,
  CircleDollarSign,
  CloudOff,
  Coins,
  Database,
  Eye,
  FileText,
  HandCoins,
  Hash,
  KeyRound,
  Landmark,
  Layers,
  ListChecks,
  Lock,
  Network,
  NotebookPen,
  PackageSearch,
  Pill,
  PlugZap,
  QrCode,
  ReceiptText,
  RefreshCw,
  Scale,
  ScanBarcode,
  ScrollText,
  Send,
  ShieldCheck,
  Shirt,
  Split,
  Store,
  Timer,
  TriangleAlert,
  Undo2,
  UserCheck,
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
 * reorder alerts and batch and serial tracking, tax invoices with QR codes, a
 * ZATCA e-invoicing submission service for Saudi Arabia, standard POS
 * hardware, and EGP/SAR/AED/QAR/KWD/BHD/OMR currencies. No statistics,
 * customer counts, testimonials, ratings, or prices are stated here;
 * pricing lives only on the /erp page. Comparison and buying-guide
 * pages name alternatives (Daftra, Foodics) only at their widely
 * published positioning — cloud accounting and invoicing, and
 * restaurant-specialised POS respectively — framed as fit for
 * different business types, with no competitor prices, feature
 * checklists, or disparagement.
 */

export type SectorSlug =
  | "pos-supermarket"
  | "pos-restaurants"
  | "offline-pos"
  | "pos-fashion"
  | "pos-pharmacy"
  | "pos-auto-parts"
  | "pos-electronics"
  | "inventory-management"
  | "zatca-invoicing"
  | "pos-security"
  | "alternative-daftra"
  | "alternative-foodics"
  | "erp-vs-excel"
  | "best-pos-egypt";

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

const fashion: Sector = {
  slug: "pos-fashion",
  path: "/pos-fashion",
  related: ["offline-pos", "pos-supermarket"],
  ar: {
    cardTitle: "برنامج كاشير لمحلات الملابس",
    h1: "برنامج كاشير لمحلات الملابس والأزياء",
    lead: "Z-ERP هو برنامج كاشير لمحلات الملابس والأزياء ينظم مخزونك على مستوى المقاس واللون، ويبيع بالباركود من شاشة واحدة، ويربط فروعك ومخازنك بمزامنة لحظية في النسخة السحابية. وتتوفر نسخة محلية تعمل بالكامل بدون إنترنت وتزامن بياناتها عند عودة الاتصال، حتى لا يتوقف البيع في مواسم الذروة والعروض.",
    pains: [
      {
        icon: Layers,
        title: "مقاسات وألوان تضيع بين الفروع",
        text: "العميل يطلب مقاسًا نفد من فرعك بينما هو متاح في فرع آخر أو في المخزن، ولا أحد يعرف، فتضيع البيعة رغم أن القطعة موجودة عندك أصلًا.",
      },
      {
        icon: Undo2,
        title: "مرتجعات وتبديلات بلا ضوابط",
        text: "تبديل المقاسات والمرتجعات حركة يومية في محلات الملابس، وإذا تمت عند الكاشير دون تسجيل ورقابة تحولت إلى فروقات مخزون وباب مفتوح للتلاعب.",
      },
      {
        icon: Boxes,
        title: "مخزون موسمي يتراكم ورأس مال يتجمد",
        text: "في نهاية كل موسم تتراكم قطع لم تُبع، بينما نفدت المقاسات سريعة الحركة في أول الموسم دون أن ينتبه أحد في الوقت المناسب.",
      },
      {
        icon: Eye,
        title: "خصومات موسمية تُستغل عند الكاشير",
        text: "مواسم التخفيضات تفتح بابًا للخصومات غير المصرح بها وتعديلات الأسعار والإلغاءات، وكلها تخصم من الربح ولا تظهر في أي تقرير.",
      },
    ],
    features: [
      {
        icon: Shirt,
        title: "مخزون منظم بالمقاس واللون",
        text: "نظّم أصنافك في المخزون بحيث يكون لكل مقاس ولون رصيده المستقل ورمزه، فيتحدث رصيد المتغير نفسه تلقائيًا مع كل فاتورة، وتعرف المتاح منه بدقة في أي لحظة.",
      },
      {
        icon: ScanBarcode,
        title: "بيع بالباركود للقطعة نفسها",
        text: "امسح باركود ملصق القطعة عند الكاشير فيُخصم البيع من رصيد مقاسها ولونها تحديدًا لا من الصنف كله، مع أجهزة نقاط البيع المعتادة من ماسحات باركود وطابعات إيصالات وأدراج نقدية.",
      },
      {
        icon: ArrowLeftRight,
        title: "تحويلات مخزون بين الفروع",
        text: "إذا كان المقاس المطلوب متاحًا في فرع آخر، حوّله بحركة مخزون موثقة بين الفروع، وتابع أرصدة كل الفروع لحظيًا من مكان واحد في النسخة السحابية بدل أن تضيع البيعة.",
      },
      {
        icon: ShieldCheck,
        title: "رقابة على الإلغاءات والخصومات",
        text: "حذف الإيصالات والإلغاءات والخصومات وتعديلات الأسعار وفتح درج النقدية عمليات مضبوطة بصلاحيات منفصلة لكل كاشير وموثقة في سجل تدقيق باسم من نفذها ووقتها، فتبقى كل حركة عند الكاشير ظاهرة وقابلة للمراجعة.",
      },
      {
        icon: BellRing,
        title: "تنبيهات وحدود إعادة طلب",
        text: "حدّد حد إعادة طلب لأصنافك، وتصلك تنبيهات المخزون عند اقتراب نفاد المقاسات والألوان سريعة الحركة، فتطلب قبل أن يفوت الموسم لا بعده.",
      },
      {
        icon: CloudOff,
        title: "نسخة محلية تعمل بدون إنترنت",
        text: "النسخة المحلية تستمر في البيع وإصدار الفواتير أثناء انقطاع الإنترنت، وتزامن بياناتها تلقائيًا بمجرد عودة الاتصال، فلا تتعطل مواسم الذروة والعروض.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ فرعك الأول، وأضف الأصناف منظمة بالمقاسات والألوان وأسعارها وباركود كل متغير.",
      },
      {
        title: "جهّز الكاشير والمخزون",
        text: "وصّل ماسح الباركود وطابعة الإيصالات ودرج النقدية، وحدّد صلاحيات كل كاشير في الإلغاء والخصم وتعديل الأسعار.",
      },
      {
        title: "بِع وتابع فروعك",
        text: "ابدأ البيع من أول يوم، وتابع مخزون ومبيعات كل فرع، وحوّل المقاسات بين الفروع حسب الطلب.",
      },
    ],
    faqs: [
      {
        q: "هل أستطيع متابعة رصيد كل مقاس ولون على حدة؟",
        a: "نعم. تُنظم الأصناف في المخزون بحيث يكون لكل مقاس ولون رصيده ورمزه المستقل، ويتحدث الرصيد تلقائيًا مع كل فاتورة بيع، وتظهر أرصدة جميع الفروع لحظيًا في النسخة السحابية.",
      },
      {
        q: "ماذا أفعل إذا كان المقاس المطلوب موجودًا في فرع آخر؟",
        a: "يمكنك تحويله إليك بحركة تحويل مخزون موثقة بين الفروع، وبفضل المزامنة اللحظية في النسخة السحابية ترى رصيد كل فرع قبل أن تعد العميل بشيء.",
      },
      {
        q: "كيف أضبط الإلغاءات والخصومات عند الكاشير؟",
        a: "الصلاحيات منفصلة لكل كاشير: يمكنك قصر حذف الإيصالات والإلغاء والخصم وتعديل الأسعار على المديرين، وكل عملية من هذا النوع تُسجل في سجل التدقيق باسم من نفذها ووقتها، فيصبح أي تلاعب ظاهرًا.",
      },
      {
        q: "هل يعمل البرنامج إذا انقطع الإنترنت في المحل؟",
        a: "نعم. النسخة المحلية من Z-ERP تعمل بالكامل بدون إنترنت، فتستمر في البيع وإصدار الفواتير وتحديث المخزون محليًا، ثم تزامن البيانات تلقائيًا عند عودة الاتصال.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "POS software for clothing stores",
    h1: "Fashion & Clothing Store POS Software",
    lead: "Z-ERP is POS software for fashion and clothing stores that organises your stock down to size and colour, sells by barcode from one screen, and connects your branches and warehouses with real-time sync in the cloud edition. A local edition also works fully offline and syncs when the connection returns, so selling never stops in peak seasons and promotions.",
    pains: [
      {
        icon: Layers,
        title: "Sizes and colours lost between branches",
        text: "A customer asks for a size that is out of stock at your branch while it sits available at another branch or in the warehouse, and nobody knows — so the sale is lost even though you own the piece.",
      },
      {
        icon: Undo2,
        title: "Returns and exchanges with no controls",
        text: "Size exchanges and returns are daily business in clothing stores, and when they happen at the till unrecorded and unsupervised they turn into stock differences and an open door to manipulation.",
      },
      {
        icon: Boxes,
        title: "Seasonal stock piles up and cash freezes",
        text: "At the end of every season unsold pieces pile up, while the fast-moving sizes ran out early in the season and nobody noticed in time.",
      },
      {
        icon: Eye,
        title: "Seasonal discounts abused at the till",
        text: "Sale seasons open the door to unauthorised discounts, price edits, and voids, all of which eat into profit without appearing in any report.",
      },
    ],
    features: [
      {
        icon: Shirt,
        title: "Stock organised by size and colour",
        text: "Organise your items in inventory so every size and colour carries its own balance and code; that variant's balance updates automatically with every invoice, and you know exactly what is available at any moment.",
      },
      {
        icon: ScanBarcode,
        title: "Barcode checkout for the exact piece",
        text: "Scan the barcode on the item's label at the till and the sale is deducted from that size and colour's balance, not the item as a whole, using standard POS hardware such as barcode scanners, receipt printers, and cash drawers.",
      },
      {
        icon: ArrowLeftRight,
        title: "Stock transfers between branches",
        text: "If the requested size is available at another branch, transfer it with a documented stock movement between branches, and follow every branch's balances in real time from one place in the cloud edition instead of losing the sale.",
      },
      {
        icon: ShieldCheck,
        title: "Control over voids and discounts",
        text: "Receipt deletions, voids, discounts, price edits, and cash-drawer openings are governed by separate permissions per cashier and recorded in an audit log with the user and time, so every till action stays visible and reviewable.",
      },
      {
        icon: BellRing,
        title: "Alerts and reorder points",
        text: "Set a reorder point for your items and receive stock alerts as fast-moving sizes and colours approach running out, so you reorder before the season passes, not after.",
      },
      {
        icon: CloudOff,
        title: "A local edition that works offline",
        text: "The local edition keeps selling and issuing invoices during an internet outage and syncs its data automatically once the connection returns, so peak seasons and promotions are never disrupted.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial, create your first branch, and add your items organised by sizes and colours, with prices and a barcode for each variant.",
      },
      {
        title: "Set up the till and stock",
        text: "Connect the barcode scanner, receipt printer, and cash drawer, and set each cashier's permissions for voids, discounts, and price edits.",
      },
      {
        title: "Sell and follow your branches",
        text: "Start selling from day one, follow each branch's stock and sales, and transfer sizes between branches as demand moves.",
      },
    ],
    faqs: [
      {
        q: "Can I track the balance of each size and colour separately?",
        a: "Yes. Items are organised in inventory so each size and colour has its own balance and code, the balance updates automatically with every sales invoice, and all branches' balances appear in real time in the cloud edition.",
      },
      {
        q: "What if the size a customer wants is at another branch?",
        a: "You can transfer it to you with a documented stock transfer between branches, and thanks to real-time sync in the cloud edition you see every branch's balance before promising the customer anything.",
      },
      {
        q: "How do I control voids and discounts at the till?",
        a: "Permissions are set per cashier: receipt deletions, voids, discounts, and price edits can be restricted to managers, and every such action is recorded in the audit log under the name of whoever performed it and when, so manipulation is visible.",
      },
      {
        q: "Does it keep working if the shop's internet goes down?",
        a: "Yes. The local edition of Z-ERP works fully offline: selling, invoicing, and stock updates continue locally, and data syncs automatically when the connection returns.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const pharmacy: Sector = {
  slug: "pos-pharmacy",
  path: "/pos-pharmacy",
  related: ["offline-pos", "pos-supermarket"],
  ar: {
    cardTitle: "برنامج كاشير للصيدليات ومستحضرات التجميل",
    h1: "برنامج كاشير للصيدليات ومحلات مستحضرات التجميل",
    lead: "Z-ERP هو برنامج كاشير للصيدليات ومحلات مستحضرات التجميل يربط البيع بالمخزون والمحاسبة في نظام واحد: تتبع لدفعات الأدوية ومستحضرات التجميل يساعدك على متابعة تواريخ انتهاء الصلاحية، وتنبيهات مخزون وحدود إعادة طلب قبل النفاد، وبيع سريع بالباركود عند الشباك. ويدعم الفروع والمخازن المتعددة، مع نسخة محلية تعمل بدون إنترنت وتزامن عند عودة الاتصال.",
    pains: [
      {
        icon: CalendarClock,
        title: "أدوية تنتهي صلاحيتها على الرف",
        text: "دفعات بأكملها قد تنتهي صلاحيتها وهي على الرف دون أن ينتبه أحد، فتتحول إلى هالك وخسارة، وقد تُباع أصناف قريبة الانتهاء دون قصد.",
      },
      {
        icon: Timer,
        title: "بحث بطيء وعميل ينتظر عند الشباك",
        text: "مع آلاف الأصناف من الأدوية ومستحضرات التجميل، البحث اليدوي عن صنف أو سعره يبطئ الخدمة ويطيل انتظار العملاء، خصوصًا في أوقات الذروة.",
      },
      {
        icon: Boxes,
        title: "نواقص تتكرر في أصناف أساسية",
        text: "أصناف سريعة الحركة تنفد ولا تُكتشف إلا عندما يطلبها عميل، فتضيع البيعة ويخرج العميل إلى صيدلية منافسة.",
      },
      {
        icon: WifiOff,
        title: "انقطاع الإنترنت لا ينتظر أحدًا",
        text: "الصيدلية لا تستطيع إيقاف الصرف والبيع إذا انقطع الاتصال، والأنظمة السحابية فقط تقف بالخدمة أو تدفعك إلى التسجيل الورقي ثم الإدخال اليدوي.",
      },
    ],
    features: [
      {
        icon: Pill,
        title: "تتبع الدفعات وتواريخ الصلاحية",
        text: "تابع مخزونك على مستوى دفعات (باتشات) الأدوية ومستحضرات التجميل، فيساعدك تتبع الدفعات على معرفة ما يقترب من انتهاء صلاحيته والتصرف فيه قبل أن يتحول إلى هالك.",
      },
      {
        icon: BellRing,
        title: "تنبيهات مخزون وحدود إعادة طلب",
        text: "حدّد حد إعادة طلب لأصنافك سريعة الحركة، وتصلك تنبيهات عند اقتراب النفاد، فتطلب في الوقت المناسب بدل اكتشاف النقص من عميل عند الشباك.",
      },
      {
        icon: Zap,
        title: "بيع سريع بالباركود عند الشباك",
        text: "شاشة كاشير مصممة للسرعة: امسح باركود الصنف وأصدر فاتورة ضريبية برمز QR في ثوانٍ، مع أجهزة نقاط البيع القياسية من ماسحات باركود وطابعات إيصالات حرارية وأدراج نقدية وشاشات عرض للعميل.",
      },
      {
        icon: ShieldCheck,
        title: "صلاحيات وسجل تدقيق لكل كاشير",
        text: "صلاحيات منفصلة لكل كاشير تحدد من يستطيع الإلغاء أو الخصم أو تعديل الأسعار، وسجل تدقيق يوثق كل عملية استثنائية باسم المستخدم ووقتها، فتبقى حركة الأصناف الحساسة تحت الرقابة.",
      },
      {
        icon: Warehouse,
        title: "فروع ومخازن متعددة",
        text: "أدر فروعًا ومخازن متعددة مع تحويلات مخزون بينها، فإذا نفد صنف من فرع أمكن تحويله من فرع آخر، وتتابع الأرصدة كلها لحظيًا في النسخة السحابية.",
      },
      {
        icon: CloudOff,
        title: "نسخة محلية تعمل بدون إنترنت",
        text: "النسخة المحلية تستمر في البيع وإصدار الفواتير أثناء انقطاع الإنترنت، وتزامن بياناتها تلقائيًا بمجرد عودة الاتصال، فلا تتوقف خدمة الصيدلية أبدًا.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ فرعك الأول، وأضف الأصناف والدفعات والأسعار والباركود أو استوردها.",
      },
      {
        title: "جهّز الشباك والمخزون",
        text: "وصّل ماسح الباركود وطابعة الإيصالات ودرج النقدية، وحدّد صلاحيات كل كاشير وحدود إعادة الطلب لأصنافك الأساسية.",
      },
      {
        title: "بِع وتابع الصلاحية والمخزون",
        text: "ابدأ البيع من أول يوم، وتابع الدفعات وتواريخ الصلاحية وتنبيهات المخزون ومبيعات كل فرع من مكان واحد.",
      },
    ],
    faqs: [
      {
        q: "كيف يساعدني البرنامج في متابعة تواريخ انتهاء الصلاحية؟",
        a: "عن طريق تتبع الدفعات: يُدار مخزون كل صنف على مستوى دفعاته، فيمكنك معرفة الدفعات الموجودة وما يقترب منها من انتهاء صلاحيته، والتصرف فيه قبل أن يتحول إلى هالك.",
      },
      {
        q: "هل ينبهني البرنامج قبل نفاد صنف مهم؟",
        a: "نعم. يمكنك تحديد حد إعادة طلب لكل صنف، وتصلك تنبيهات مخزون عند الوصول إليه، فتطلب قبل النفاد بدل اكتشاف النقص عند طلب عميل.",
      },
      {
        q: "هل يناسب البرنامج صيدلية لها أكثر من فرع؟",
        a: "نعم. يدعم Z-ERP الفروع المتعددة والمخازن المتعددة مع تحويلات مخزون بين الفروع ومزامنة لحظية في النسخة السحابية، فتتابع أرصدة ومبيعات كل فرع من مكان واحد.",
      },
      {
        q: "هل يعمل برنامج الكاشير إذا انقطع الإنترنت؟",
        a: "نعم. النسخة المحلية تعمل بالكامل بدون إنترنت، فتستمر في البيع وإصدار الفواتير وتحديث المخزون محليًا، ثم تزامن البيانات تلقائيًا عند عودة الاتصال.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "POS software for pharmacies & cosmetics",
    h1: "Pharmacy & Cosmetics Store POS Software",
    lead: "Z-ERP is POS software for pharmacies and cosmetics stores that connects selling to inventory and accounting in one system: batch tracking for medicines and cosmetics helps you follow expiry dates, stock alerts and reorder points warn you before stockouts, and barcode checkout keeps the counter fast. It supports multiple branches and warehouses, with a local edition that works offline and syncs when the connection returns.",
    pains: [
      {
        icon: CalendarClock,
        title: "Medicines expiring on the shelf",
        text: "Whole batches can pass their expiry date sitting on the shelf unnoticed, turning into waste and loss, and near-expiry items may be sold unintentionally.",
      },
      {
        icon: Timer,
        title: "Slow lookup while a customer waits",
        text: "With thousands of medicine and cosmetics items, looking up an item or its price by hand slows service and keeps customers waiting, especially at peak times.",
      },
      {
        icon: Boxes,
        title: "Repeat stockouts of essentials",
        text: "Fast-moving items run out and it is only discovered when a customer asks for them, so the sale is lost and the customer walks to a competing pharmacy.",
      },
      {
        icon: WifiOff,
        title: "Internet outages wait for no one",
        text: "A pharmacy cannot stop dispensing and selling when the connection drops, and cloud-only systems halt service or push you into paper records and manual re-entry.",
      },
    ],
    features: [
      {
        icon: Pill,
        title: "Batch tracking and expiry follow-up",
        text: "Follow your stock at the level of medicine and cosmetics batches; batch tracking helps you know what is approaching its expiry date and act on it before it turns into waste.",
      },
      {
        icon: BellRing,
        title: "Stock alerts and reorder points",
        text: "Set a reorder point for your fast-moving items and receive alerts as they approach running out, so you order in time instead of discovering the shortage from a customer at the counter.",
      },
      {
        icon: Zap,
        title: "Fast barcode checkout at the counter",
        text: "A till screen built for speed: scan the item's barcode and issue a tax invoice with a QR code in seconds, using standard POS hardware such as barcode scanners, thermal receipt printers, cash drawers, and customer displays.",
      },
      {
        icon: ShieldCheck,
        title: "Permissions and an audit log per cashier",
        text: "Separate permissions for each cashier define who may void, discount, or edit prices, and an audit log records every exceptional action with the user and time, keeping sensitive items under control.",
      },
      {
        icon: Warehouse,
        title: "Multiple branches and warehouses",
        text: "Run multiple branches and warehouses with stock transfers between them, so an item that runs out at one branch can be transferred from another, with all balances visible in real time in the cloud edition.",
      },
      {
        icon: CloudOff,
        title: "A local edition that works offline",
        text: "The local edition keeps selling and issuing invoices during an internet outage and syncs its data automatically once the connection returns, so pharmacy service never stops.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial, create your first branch, and add or import your items, batches, prices, and barcodes.",
      },
      {
        title: "Set up the counter and stock",
        text: "Connect the barcode scanner, receipt printer, and cash drawer, and set each cashier's permissions and reorder points for your essential items.",
      },
      {
        title: "Sell and follow expiry and stock",
        text: "Start selling from day one and follow batches, expiry dates, stock alerts, and each branch's sales from one place.",
      },
    ],
    faqs: [
      {
        q: "How does the software help me follow expiry dates?",
        a: "Through batch tracking: each item's stock is managed at batch level, so you can see which batches you hold and which are approaching their expiry date, and act before they turn into waste.",
      },
      {
        q: "Will it warn me before an important item runs out?",
        a: "Yes. You can set a reorder point for each item and receive stock alerts when it is reached, so you order before the stockout instead of discovering it when a customer asks.",
      },
      {
        q: "Does it suit a pharmacy with more than one branch?",
        a: "Yes. Z-ERP supports multiple branches and warehouses, with stock transfers between branches and real-time sync in the cloud edition, so you follow every branch's balances and sales from one place.",
      },
      {
        q: "Does the POS keep working if the internet goes down?",
        a: "Yes. The local edition works fully offline: selling, invoicing, and stock updates continue locally, and data syncs automatically when the connection returns.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const autoParts: Sector = {
  slug: "pos-auto-parts",
  path: "/pos-auto-parts",
  related: ["offline-pos", "pos-restaurants"],
  ar: {
    cardTitle: "برنامج كاشير لقطع غيار السيارات",
    h1: "برنامج كاشير لمحلات وتجارة قطع غيار السيارات",
    lead: "Z-ERP هو برنامج كاشير وإدارة مخزون لمحلات قطع غيار السيارات وتجارتها بالجملة والتجزئة: كتالوج أصناف منظم برقم القطعة والباركود، ومخزون موزع على مخازن وفروع متعددة تراه لحظيًا، وفواتير ضريبية برمز QR لنوعي البيع معًا. وتتوفر نسخة محلية تعمل بدون إنترنت وتزامن عند عودة الاتصال، لتعمل محلاتك ومخازنِك حتى مع ضعف التغطية.",
    pains: [
      {
        icon: Database,
        title: "كتالوج ضخم وأرقام متشابهة",
        text: "آلاف أرقام القطع المتقاربة تجعل البحث اليدوي بطيئًا ومليئًا بالأخطاء، وقطعة واحدة خاطئة تعني مرتجعًا وعميلًا فقد وقته وثقته.",
      },
      {
        icon: Boxes,
        title: "القطعة موجودة… لكن في مخزن آخر",
        text: "المخزون موزع بين المحل ومخازن وفروع أخرى دون صورة موحدة، فيُقال للعميل «غير متوفرة» وهي موجودة عندك على بُعد شارعين.",
      },
      {
        icon: Users,
        title: "تجزئة وجملة على دفاتر منفصلة",
        text: "بيع الكاونتر لعميل عابر وبيع الجملة للورش ومراكز الصيانة إذا أُديرا بأدوات منفصلة أو بالورق، اختلطت الأسعار والفواتير والأرصدة وضاعت المتابعة.",
      },
      {
        icon: Eye,
        title: "خصومات جملة تُمنح شفهيًا",
        text: "في بيع الجملة تُمنح خصومات وتُعدَّل أسعار عند الكاشير باتفاقات شفهية لا تُوثق، فتتآكل الهوامش ولا تستطيع مراجعة من منح ماذا ولماذا.",
      },
    ],
    features: [
      {
        icon: PackageSearch,
        title: "كتالوج منظم برقم القطعة والباركود",
        text: "نظّم أرقام القطع في كتالوج أصناف يكون لكل قطعة فيه رقمها وباركودها ورصيدها، وامسح الباركود عند البيع فيُخصم من المخزون تلقائيًا بدل البحث اليدوي في الدفاتر والأرفف.",
      },
      {
        icon: Warehouse,
        title: "مخازن متعددة برصيد موحد",
        text: "أدر مخازن متعددة وفروعًا متعددة في نظام واحد، وتابع رصيد كل قطعة في كل مخزن لحظيًا في النسخة السحابية، وحوّل بين المخازن والفروع بحركات موثقة.",
      },
      {
        icon: ReceiptText,
        title: "فواتير تجزئة وجملة من نظام واحد",
        text: "أصدر فواتير الكاونتر وفواتير الجملة من النظام نفسه، بالحقول الضريبية ورمز QR وحساب ضريبة القيمة المضافة، مع خدمة إرسال للفوترة الإلكترونية (ZATCA) للمنشآت العاملة في السعودية.",
      },
      {
        icon: ShieldCheck,
        title: "انضباط الأسعار والخصومات",
        text: "الخصومات وتعديلات الأسعار والإلغاءات وحذف الإيصالات مضبوطة بصلاحيات منفصلة لكل كاشير وموثقة في سجل تدقيق، فتبقى أسعار الجملة والتجزئة تحت سيطرتك وقابلة للمراجعة.",
      },
      {
        icon: Network,
        title: "فروع في مصر والخليج بعملات متعددة",
        text: "أدر فروعًا في أكثر من مدينة أو دولة من نظام واحد، مع دعم عملات مصر والسعودية والخليج (EGP وSAR وAED وQAR وKWD وBHD وOMR) لتجارة تعبر الحدود.",
      },
      {
        icon: CloudOff,
        title: "نسخة محلية تعمل بدون إنترنت",
        text: "النسخة المحلية تستمر في البيع وإصدار الفواتير في المحلات والمخازن أثناء انقطاع الإنترنت، وتزامن بياناتها تلقائيًا بمجرد عودة الاتصال.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ فرعك ومخازنك، وأضف كتالوج القطع بأرقامها وأسعارها وباركودها أو استورده.",
      },
      {
        title: "جهّز الكاشير والمخازن",
        text: "وصّل ماسح الباركود وطابعة الإيصالات ودرج النقدية في كل نقطة بيع، وحدّد صلاحيات كل كاشير في الخصومات وتعديل الأسعار.",
      },
      {
        title: "بِع تجزئة وجملة وتابع",
        text: "ابدأ البيع بنوعيه من أول يوم، وتابع رصيد كل قطعة في كل مخزن ومبيعات كل فرع من مكان واحد.",
      },
    ],
    faqs: [
      {
        q: "هل يناسب البرنامج تجارة قطع الغيار بالجملة أيضًا؟",
        a: "نعم. Z-ERP يخدم تجارة قطع غيار السيارات بالتجزئة والجملة معًا: فواتير ضريبية برمز QR لنوعي البيع، ومخزون متعدد المخازن والفروع، ودعم لعملات مصر والسعودية والخليج.",
      },
      {
        q: "كيف أعرف إن كانت قطعة متوفرة في مخزن أو فرع آخر؟",
        a: "لأن المخزون يُدار في نظام واحد متعدد المخازن والفروع مع مزامنة لحظية في النسخة السحابية، ترى رصيد القطعة في كل مخزن وفرع من مكان واحد، ويمكنك تحويلها بحركة مخزون موثقة.",
      },
      {
        q: "لديّ آلاف أرقام القطع، كيف تُدار في النظام؟",
        a: "يُنظم الكتالوج صنفًا بصنف: لكل قطعة رقمها وباركودها ورصيدها في كل مخزن، ويتحدث الرصيد تلقائيًا مع كل فاتورة بيع أو حركة تحويل بين المخازن، فتبقى الصورة دقيقة مهما كبر الكتالوج.",
      },
      {
        q: "هل يعمل البرنامج إذا انقطع الإنترنت في المخزن؟",
        a: "نعم. النسخة المحلية تعمل بالكامل بدون إنترنت، فتستمر في البيع وإصدار الفواتير وتحديث المخزون محليًا، ثم تزامن البيانات تلقائيًا عند عودة الاتصال.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع والمخازن، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "POS software for auto parts stores",
    h1: "Auto Parts Store & Wholesale POS Software",
    lead: "Z-ERP is POS and inventory software for auto parts stores and their wholesale trade: an item catalogue organised by part number and barcode, stock spread across multiple warehouses and branches that you see in real time, and tax invoices with QR codes for retail and wholesale selling alike. A local edition also works offline and syncs when the connection returns, keeping shops and warehouses running where coverage is weak.",
    pains: [
      {
        icon: Database,
        title: "A huge catalogue of look-alike numbers",
        text: "Thousands of similar part numbers make manual lookup slow and error-prone, and a single wrong part means a return and a customer who lost time and trust.",
      },
      {
        icon: Boxes,
        title: "The part exists… in another warehouse",
        text: "Stock is spread between the shop, warehouses, and other branches with no unified picture, so the customer hears “not available” for a part you own two streets away.",
      },
      {
        icon: Users,
        title: "Retail and wholesale on separate notebooks",
        text: "Counter sales to walk-in customers and wholesale sales to workshops and service centres, when run on separate tools or on paper, mix up prices, invoices, and balances and lose all follow-up.",
      },
      {
        icon: Eye,
        title: "Wholesale discounts given verbally",
        text: "In wholesale, discounts are granted and prices edited at the till through verbal deals that are never recorded, so margins erode and you cannot review who granted what, or why.",
      },
    ],
    features: [
      {
        icon: PackageSearch,
        title: "A catalogue organised by part number and barcode",
        text: "Organise part numbers into an item catalogue where every part has its number, barcode, and balance, and scan the barcode at sale so stock deducts automatically instead of searching notebooks and shelves by hand.",
      },
      {
        icon: Warehouse,
        title: "Multiple warehouses, one balance picture",
        text: "Run multiple warehouses and branches in one system, follow every part's balance in every warehouse in real time in the cloud edition, and transfer between warehouses and branches with documented movements.",
      },
      {
        icon: ReceiptText,
        title: "Retail and wholesale invoices from one system",
        text: "Issue counter invoices and wholesale invoices from the same system, with tax fields, QR codes, and VAT calculation, plus a ZATCA e-invoicing submission service for businesses operating in Saudi Arabia.",
      },
      {
        icon: ShieldCheck,
        title: "Discipline over prices and discounts",
        text: "Discounts, price edits, voids, and receipt deletions are governed by separate permissions per cashier and recorded in an audit log, keeping wholesale and retail prices under your control and reviewable.",
      },
      {
        icon: Network,
        title: "Branches across Egypt and the Gulf, in multiple currencies",
        text: "Run branches in more than one city or country from one system, with support for Egypt, Saudi, and Gulf currencies (EGP, SAR, AED, QAR, KWD, BHD, OMR) for trade that crosses borders.",
      },
      {
        icon: CloudOff,
        title: "A local edition that works offline",
        text: "The local edition keeps selling and issuing invoices in shops and warehouses during an internet outage and syncs its data automatically once the connection returns.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial, create your branch and warehouses, and add or import your parts catalogue with numbers, prices, and barcodes.",
      },
      {
        title: "Set up tills and warehouses",
        text: "Connect the barcode scanner, receipt printer, and cash drawer at each point of sale, and set each cashier's permissions for discounts and price edits.",
      },
      {
        title: "Sell retail and wholesale, and follow up",
        text: "Start both kinds of selling from day one, and follow every part's balance in every warehouse and each branch's sales from one place.",
      },
    ],
    faqs: [
      {
        q: "Does it suit wholesale auto parts trade as well?",
        a: "Yes. Z-ERP serves auto parts retail and wholesale together: tax invoices with QR codes for both kinds of sale, multi-warehouse and multi-branch inventory, and support for Egypt, Saudi, and Gulf currencies.",
      },
      {
        q: "How do I know if a part is available at another warehouse or branch?",
        a: "Because inventory runs in one multi-warehouse, multi-branch system with real-time sync in the cloud edition, you see the part's balance in every warehouse and branch from one place, and can transfer it with a documented stock movement.",
      },
      {
        q: "I have thousands of part numbers — how are they managed?",
        a: "The catalogue is organised item by item: each part has its number, barcode, and balance in every warehouse, and balances update automatically with every sales invoice or stock transfer between warehouses, so the picture stays accurate however large the catalogue grows.",
      },
      {
        q: "Does it keep working if the warehouse internet goes down?",
        a: "Yes. The local edition works fully offline: selling, invoicing, and stock updates continue locally, and data syncs automatically when the connection returns.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch and warehouse count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const electronics: Sector = {
  slug: "pos-electronics",
  path: "/pos-electronics",
  related: ["offline-pos", "pos-fashion"],
  ar: {
    cardTitle: "برنامج كاشير لمحلات الإلكترونيات والموبايلات",
    h1: "برنامج كاشير لمحلات الإلكترونيات والموبايلات",
    lead: "Z-ERP هو برنامج كاشير لمحلات الإلكترونيات والموبايلات يتتبع كل جهاز برقمه التسلسلي (السيريال) من لحظة دخوله المخزن حتى خروجه في فاتورة بيع، فتعرف رصيدك قطعةً قطعة وترجع إلى سجل بيع أي جهاز عند الحاجة إلى متابعة الضمان. ويربط البيع بالمخزون والمحاسبة عبر فروع ومخازن متعددة، مع نسخة محلية تعمل بدون إنترنت وتزامن عند عودة الاتصال.",
    pains: [
      {
        icon: TriangleAlert,
        title: "أجهزة غالية تتحرك بلا أثر",
        text: "هاتف أو جهاز واحد قد يساوي آلاف الجنيهات، فإذا خرج من المحل أو تبدّل بآخر دون تسجيل دقيق، لا توجد طريقة لمعرفة متى خرج وبيد من.",
      },
      {
        icon: NotebookPen,
        title: "أرقام سيريال على الورق وبيانات ضمان تضيع",
        text: "تسجيل الأرقام التسلسلية في دفاتر أو ملفات منفصلة يعني أنك عند مطالبة عميل بالضمان لا تستطيع التحقق بسرعة: هل بيع هذا الجهاز من عندنا أصلًا؟ ومتى؟",
      },
      {
        icon: CircleDollarSign,
        title: "فرق قطعة واحدة يساوي خسارة كبيرة",
        text: "في بضاعة عالية القيمة، أي فرق في الجرد ولو بجهاز واحد يعني خسارة حقيقية، والجرد اليدوي المتكرر لتصحيح الصورة يستهلك وقت فريقك كله.",
      },
      {
        icon: Timer,
        title: "بحث بطيء بين موديلات متشابهة",
        text: "مئات الموديلات بإصدارات وسعات متقاربة تجعل البحث اليدوي عن جهاز أو سعره بطيئًا عند الكاونتر، والخطأ في موديل واحد يعني مرتجعًا وعميلًا منزعجًا.",
      },
    ],
    features: [
      {
        icon: Hash,
        title: "تتبع كل جهاز برقمه التسلسلي",
        text: "يدعم Z-ERP تتبع الدفعات والأرقام التسلسلية، فيرتبط كل جهاز بسيرياله الخاص داخل المخزون، وتعرف مكانه وحالته من الاستلام حتى البيع.",
      },
      {
        icon: BadgeCheck,
        title: "سجل بيع يساعدك في متابعة الضمان",
        text: "لأن بيع الجهاز يُسجل برقمه التسلسلي في فاتورته، تستطيع لاحقًا الرجوع إلى سجل البيع لمعرفة الجهاز المباع وتاريخ بيعه، فتتابع مطالبات الضمان ببيانات موثقة بدل التخمين.",
      },
      {
        icon: ShieldCheck,
        title: "رقابة كاملة على بيع الأجهزة الغالية",
        text: "الإلغاءات وحذف الإيصالات والخصومات وتعديلات الأسعار وفتح درج النقدية مضبوطة بصلاحيات منفصلة لكل كاشير وموثقة في سجل تدقيق، فتبقى حركة البضاعة عالية القيمة تحت الرقابة دائمًا.",
      },
      {
        icon: BellRing,
        title: "مخزون يتحدث مع كل فاتورة وتنبيهات إعادة طلب",
        text: "كل فاتورة بيع تخصم الجهاز المباع برقمه التسلسلي من المخزون تلقائيًا، وتصلك تنبيهات عند الوصول إلى حد إعادة الطلب للموديلات سريعة الحركة قبل نفادها.",
      },
      {
        icon: Warehouse,
        title: "فروع ومخازن متعددة",
        text: "أدر فروعًا ومخازن متعددة في نظام واحد، وحوّل الأجهزة بينها بحركات موثقة، وتابع رصيد كل موديل في كل فرع لحظيًا في النسخة السحابية.",
      },
      {
        icon: CloudOff,
        title: "نسخة محلية تعمل بدون إنترنت",
        text: "النسخة المحلية تستمر في البيع وإصدار الفواتير أثناء انقطاع الإنترنت، وتزامن بياناتها تلقائيًا بمجرد عودة الاتصال، فلا يتوقف المحل ولا تضيع فاتورة.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ فرعك الأول، وأضف الأجهزة والموديلات وأسعارها وأرقامها التسلسلية أو استوردها.",
      },
      {
        title: "جهّز الكاونتر والمخزون",
        text: "وصّل ماسح الباركود وطابعة الإيصالات ودرج النقدية، وحدّد صلاحيات كل كاشير في الإلغاء والخصم وتعديل الأسعار.",
      },
      {
        title: "بِع وتابع كل جهاز",
        text: "ابدأ البيع من أول يوم، وتابع رصيد كل موديل وأرقامه التسلسلية ومبيعات كل فرع من مكان واحد.",
      },
    ],
    faqs: [
      {
        q: "هل يتتبع البرنامج الرقم التسلسلي (السيريال) لكل جهاز؟",
        a: "نعم. يدعم Z-ERP تتبع الدفعات والأرقام التسلسلية، فيرتبط كل جهاز بسيرياله داخل المخزون، ويُسجل الرقم التسلسلي مع فاتورة بيعه، فتعرف تاريخ كل جهاز من الاستلام حتى البيع.",
      },
      {
        q: "كيف يساعدني البرنامج عند مطالبة عميل بالضمان؟",
        a: "لأن فاتورة البيع موثقة برقم الجهاز التسلسلي وتاريخ البيع، يمكنك الرجوع إلى سجل البيع للتحقق من أن الجهاز بيع من محلك ومتى تم بيعه، فتتعامل مع مطالبة الضمان ببيانات دقيقة بدل البحث في الدفاتر.",
      },
      {
        q: "لديّ أكثر من فرع ومخزن، هل يدعم البرنامج ذلك؟",
        a: "نعم. يدعم Z-ERP الفروع والمخازن المتعددة مع تحويلات موثقة بينها ومزامنة لحظية في النسخة السحابية، فتتابع رصيد كل موديل في كل موقع من مكان واحد.",
      },
      {
        q: "هل يعمل برنامج الكاشير إذا انقطع الإنترنت؟",
        a: "نعم. النسخة المحلية من Z-ERP تعمل بالكامل بدون إنترنت، فتستمر في البيع وإصدار الفواتير وتحديث المخزون محليًا، ثم تزامن البيانات تلقائيًا عند عودة الاتصال.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "POS software for electronics & mobile stores",
    h1: "Electronics & Mobile Store POS Software",
    lead: "Z-ERP is POS software for electronics and mobile phone stores that tracks every device by its serial number from the moment it enters stock until it leaves on a sales invoice, so you know your balance device by device and can pull up any unit's sales record when a warranty follow-up needs it. It connects selling to inventory and accounting across multiple branches and warehouses, with a local edition that works offline and syncs when the connection returns.",
    pains: [
      {
        icon: TriangleAlert,
        title: "High-value devices moving without a trace",
        text: "A single phone or device can be worth thousands, so if one leaves the store or is swapped for another without accurate recording, there is no way to know when it left or in whose hands.",
      },
      {
        icon: NotebookPen,
        title: "Serials on paper, warranty data lost",
        text: "Recording serial numbers in notebooks or separate files means that when a customer claims warranty you cannot verify quickly: was this device actually sold by us, and when?",
      },
      {
        icon: CircleDollarSign,
        title: "A single missing unit is a serious loss",
        text: "With high-value goods, even a one-device stocktaking difference is a real loss, and repeated manual stock counts to correct the picture consume your whole team's time.",
      },
      {
        icon: Timer,
        title: "Slow lookup among look-alike models",
        text: "Hundreds of models with close versions and storage sizes make manual lookup of a device or its price slow at the counter, and one wrong model means a return and an annoyed customer.",
      },
    ],
    features: [
      {
        icon: Hash,
        title: "Every device tracked by serial number",
        text: "Z-ERP supports batch and serial tracking, so each device is tied to its own serial number in inventory, and you know where it is and what its status is from receiving to sale.",
      },
      {
        icon: BadgeCheck,
        title: "A sales record that helps with warranty follow-up",
        text: "Because a device's sale is recorded with its serial number on its invoice, you can later go back to the sales record to identify the unit sold and its sale date, and handle warranty claims with documented data instead of guesswork.",
      },
      {
        icon: ShieldCheck,
        title: "Full control over high-value sales",
        text: "Voids, receipt deletions, discounts, price edits, and cash-drawer openings are governed by separate permissions per cashier and recorded in an audit log, so high-value stock movement stays under control at all times.",
      },
      {
        icon: BellRing,
        title: "Stock that updates with every invoice, with reorder alerts",
        text: "Every sales invoice automatically deducts the sold device, by its serial number, from stock, and you receive alerts at the reorder point for fast-moving models before they run out.",
      },
      {
        icon: Warehouse,
        title: "Multiple branches and warehouses",
        text: "Run multiple branches and warehouses in one system, transfer devices between them with documented movements, and follow every model's balance at every branch in real time in the cloud edition.",
      },
      {
        icon: CloudOff,
        title: "A local edition that works offline",
        text: "The local edition keeps selling and issuing invoices during an internet outage and syncs its data automatically once the connection returns, so the store never stops and no invoice is lost.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial, create your first branch, and add or import your devices, models, prices, and serial numbers.",
      },
      {
        title: "Set up the counter and stock",
        text: "Connect the barcode scanner, receipt printer, and cash drawer, and set each cashier's permissions for voids, discounts, and price edits.",
      },
      {
        title: "Sell and trace every device",
        text: "Start selling from day one, and follow every model's balance, its serial numbers, and each branch's sales from one place.",
      },
    ],
    faqs: [
      {
        q: "Does the software track each device's serial number?",
        a: "Yes. Z-ERP supports batch and serial tracking: each device is tied to its serial number in inventory, and the serial is recorded on its sales invoice, so you know each unit's history from receiving to sale.",
      },
      {
        q: "How does it help when a customer claims warranty?",
        a: "Because the sales invoice documents the device's serial number and the sale date, you can check the sales record to verify that the device was sold by your store and when, and handle the warranty claim with accurate data instead of searching through notebooks.",
      },
      {
        q: "I have more than one branch and warehouse — is that supported?",
        a: "Yes. Z-ERP supports multiple branches and warehouses with documented transfers between them and real-time sync in the cloud edition, so you follow every model's balance at every location from one place.",
      },
      {
        q: "Does the POS keep working if the internet goes down?",
        a: "Yes. The local edition of Z-ERP works fully offline: selling, invoicing, and stock updates continue locally, and data syncs automatically when the connection returns.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const inventoryManagement: Sector = {
  slug: "inventory-management",
  path: "/inventory-management",
  related: ["offline-pos", "pos-supermarket"],
  ar: {
    cardTitle: "برنامج إدارة المخزون متعدد الفروع",
    h1: "برنامج إدارة المخزون متعدد الفروع والمخازن",
    lead: "Z-ERP هو برنامج إدارة مخزون متعدد الفروع والمخازن يعطيك صورة واحدة لحظية لرصيد كل صنف في كل فرع ومخزن: تحويلات موثقة بين المواقع، وتنبيهات عند الوصول إلى حد إعادة الطلب، وتتبع للدفعات والأرقام التسلسلية، وربط كامل بنقاط البيع والمحاسبة في نظام واحد. وتعمل المخازن والفروع ضعيفة الاتصال بنسخة محلية تزامن بياناتها عند عودة الإنترنت.",
    pains: [
      {
        icon: Split,
        title: "كل فرع يعيش بصورته الخاصة",
        text: "فروع ومخازن يعمل كلٌّ منها بدفاتره أو ملفاته المنفصلة، فلا توجد إجابة واحدة سريعة لسؤال بسيط: كم عندنا من هذا الصنف الآن، وأين هو؟",
      },
      {
        icon: Boxes,
        title: "راكد هنا وناقص هناك",
        text: "صنف يتراكم في مخزن فرع بينما ينفد من فرع آخر وتضيع مبيعاته، رغم أن الحل كان تحويلًا بسيطًا لو كانت الصورة الموحدة واضحة في وقتها.",
      },
      {
        icon: FileText,
        title: "تحويلات شفهية أو ورقية بين المواقع",
        text: "المخزون الذي يتحرك بين الفروع والمخازن باتصال هاتفي أو ورقة غير موثقة داخل النظام يظهر لاحقًا فروقات في الجرد لا يستطيع أحد تفسيرها.",
      },
      {
        icon: Eye,
        title: "الجرد يتحول إلى موسم مفاجآت",
        text: "لأن الرصيد لا يتحدث مع البيع والحركة لحظة بلحظة، يكتشف كل جرد فروقات كبيرة مجهولة السبب، وتضيع المسؤولية بين المواقع والفرق.",
      },
    ],
    features: [
      {
        icon: RefreshCw,
        title: "أرصدة لحظية موحدة لكل المواقع",
        text: "في النسخة السحابية تتزامن الفروع والمخازن لحظيًا، فترى رصيد أي صنف في كل موقع من شاشة واحدة، وتتخذ قرارات الشراء والتحويل بناءً على أرقام حديثة لا على تقارير قديمة.",
      },
      {
        icon: ArrowLeftRight,
        title: "تحويلات مخزون موثقة بين الفروع والمخازن",
        text: "حرّك الأصناف بين الفروع والمخازن بحركات تحويل موثقة داخل النظام، فينقص الرصيد من موقع المصدر ويزيد في موقع الوجهة بنفس الحركة، وتبقى كل حركة مسجلة وقابلة للتتبع.",
      },
      {
        icon: BellRing,
        title: "تنبيهات مخزون وحدود إعادة طلب",
        text: "حدّد حد إعادة طلب لكل صنف، وتصلك تنبيهات المخزون عند الوصول إليه في أي موقع، فتطلب من المورد أو تحوّل من موقع آخر قبل أن يتحول النقص إلى مبيعات ضائعة.",
      },
      {
        icon: ScanBarcode,
        title: "تتبع الدفعات والأرقام التسلسلية",
        text: "تابع مخزونك على مستوى الدفعات (الباتشات) والأرقام التسلسلية عند الحاجة، فيبقى تاريخ كل دفعة وكل جهاز معروفًا أينما تحرك بين فروعك ومخازنك.",
      },
      {
        icon: Network,
        title: "مخزون مرتبط بالبيع والمحاسبة",
        text: "المخزون جزء من نظام Z-ERP نفسه: كل فاتورة بيع من أي فرع تحدّث الأرصدة تلقائيًا، وترتبط الحركة بالمحاسبة دون إدخال مكرر أو تصدير واستيراد بين برامج منفصلة.",
      },
      {
        icon: CloudOff,
        title: "مواقع ضعيفة الاتصال تعمل وتزامن",
        text: "المخزن أو الفرع ضعيف التغطية يعمل بالنسخة المحلية كاملة الوظائف دون إنترنت، ويزامن حركاته وفواتيره تلقائيًا عند عودة الاتصال، فينضم إلى الصورة الموحدة دون إدخال يدوي.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ فروعك ومخازنك في النظام، وأضف الأصناف والأرصدة الافتتاحية أو استوردها.",
      },
      {
        title: "اضبط حدود الطلب والتحويلات",
        text: "حدّد حد إعادة الطلب لأصنافك الأساسية، وفعّل حركات التحويل الموثقة بين الفروع والمخازن.",
      },
      {
        title: "تابع وحرّك من مكان واحد",
        text: "راقب أرصدة كل موقع لحظيًا، وحوّل واطلب في الوقت المناسب بدل اكتشاف النقص عند الجرد.",
      },
    ],
    faqs: [
      {
        q: "هل أرى رصيد كل صنف في جميع الفروع والمخازن لحظيًا؟",
        a: "نعم في النسخة السحابية، إذ تتزامن الفروع والمخازن لحظيًا داخل نظام واحد، فترى رصيد الصنف في كل موقع من مكان واحد. أما المواقع العاملة بالنسخة المحلية فتزامن بياناتها تلقائيًا عند عودة اتصالها.",
      },
      {
        q: "كيف تتم التحويلات بين الفروع والمخازن؟",
        a: "بحركات تحويل موثقة داخل النظام: تنشئ حركة التحويل فينقص رصيد الصنف من موقع المصدر ويزيد في موقع الوجهة بنفس الحركة، وتبقى الحركة مسجلة وقابلة للمراجعة في أي وقت.",
      },
      {
        q: "هل ينبهني النظام قبل نفاد الأصناف؟",
        a: "نعم. تحدد حد إعادة طلب لكل صنف، وتصلك تنبيهات مخزون عند الوصول إليه في أي موقع، فتطلب من المورد أو تحوّل من موقع آخر قبل النفاد بدل اكتشاف النقص من طلب عميل.",
      },
      {
        q: "هل يدعم النظام تتبع الدفعات والأرقام التسلسلية عبر المواقع؟",
        a: "نعم. يدعم Z-ERP تتبع الدفعات والأرقام التسلسلية، فيمكن متابعة الأصناف ذات الدفعات كالأغذية والأدوية، والأجهزة ذات الأرقام التسلسلية كالإلكترونيات، عبر كل الفروع والمخازن.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع والمخازن، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "Multi-branch inventory management software",
    h1: "Multi-Branch & Multi-Warehouse Inventory Management Software",
    lead: "Z-ERP is inventory management software for multiple branches and warehouses that gives you one real-time picture of every item's balance at every branch and warehouse: documented transfers between locations, reorder-point alerts, batch and serial tracking, and full linkage to point of sale and accounting in one system. Branches and warehouses with weak connectivity run a local edition that syncs when the internet returns.",
    pains: [
      {
        icon: Split,
        title: "Every branch lives in its own picture",
        text: "Branches and warehouses each keep their own notebooks or separate files, so there is no single quick answer to a simple question: how much of this item do we have right now, and where is it?",
      },
      {
        icon: Boxes,
        title: "Overstocked here, out of stock there",
        text: "An item piles up in one branch's warehouse while it runs out at another branch and its sales are lost, when the fix was a simple transfer — if only the unified picture had been clear in time.",
      },
      {
        icon: FileText,
        title: "Transfers by word of mouth or on paper",
        text: "Stock that moves between branches and warehouses by a phone call or a note that is never documented in the system later shows up as stocktaking differences nobody can explain.",
      },
      {
        icon: Eye,
        title: "Stocktaking becomes surprise season",
        text: "Because balances do not update with sales and movements moment by moment, every stocktake discovers large differences of unknown cause, and responsibility is lost between locations and teams.",
      },
    ],
    features: [
      {
        icon: RefreshCw,
        title: "Real-time unified balances for all locations",
        text: "In the cloud edition, branches and warehouses sync in real time, so you see any item's balance at every location on one screen and make purchasing and transfer decisions on current numbers, not stale reports.",
      },
      {
        icon: ArrowLeftRight,
        title: "Documented stock transfers between branches and warehouses",
        text: "Move items between branches and warehouses with documented transfer movements inside the system: the balance decreases at the source location and increases at the destination in the same movement, and every movement stays recorded and traceable.",
      },
      {
        icon: BellRing,
        title: "Stock alerts and reorder points",
        text: "Set a reorder point for each item and receive stock alerts when it is reached at any location, so you order from the supplier or transfer from another location before a shortage turns into lost sales.",
      },
      {
        icon: ScanBarcode,
        title: "Batch and serial tracking",
        text: "Follow your stock at the level of batches and serial numbers where needed, so the history of every batch and every device stays known wherever it moves among your branches and warehouses.",
      },
      {
        icon: Network,
        title: "Inventory linked to sales and accounting",
        text: "Inventory is part of the Z-ERP system itself: every sales invoice from any branch updates balances automatically, and movements tie into accounting with no duplicate entry and no exporting and importing between separate programs.",
      },
      {
        icon: CloudOff,
        title: "Weak-coverage locations work and sync",
        text: "A warehouse or branch with weak coverage runs the fully functional local edition with no internet, and syncs its movements and invoices automatically when the connection returns, joining the unified picture with no manual entry.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial, create your branches and warehouses in the system, and add or import your items and opening balances.",
      },
      {
        title: "Set reorder points and transfers",
        text: "Set reorder points for your key items and enable documented transfer movements between branches and warehouses.",
      },
      {
        title: "Watch and move from one place",
        text: "Monitor every location's balances in real time, and transfer or order in good time instead of discovering shortages at stocktake.",
      },
    ],
    faqs: [
      {
        q: "Do I see every item's balance across all branches and warehouses in real time?",
        a: "Yes, in the cloud edition: branches and warehouses sync in real time inside one system, so you see an item's balance at every location from one place. Locations running the local edition sync their data automatically when their connection returns.",
      },
      {
        q: "How do transfers between branches and warehouses work?",
        a: "Through documented transfer movements inside the system: you create the transfer and the item's balance decreases at the source location and increases at the destination in the same movement, and the movement stays recorded and reviewable at any time.",
      },
      {
        q: "Does the system warn me before items run out?",
        a: "Yes. You set a reorder point for each item and receive stock alerts when it is reached at any location, so you order from the supplier or transfer from another location before the stockout instead of discovering it from a customer's request.",
      },
      {
        q: "Does it support batch and serial tracking across locations?",
        a: "Yes. Z-ERP supports batch and serial tracking, so you can follow batch-based items such as food and medicines, and serial-numbered devices such as electronics, across all branches and warehouses.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch and warehouse count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const zatcaInvoicing: Sector = {
  slug: "zatca-invoicing",
  path: "/zatca-invoicing",
  related: ["offline-pos", "pos-supermarket"],
  ar: {
    cardTitle: "الفاتورة الإلكترونية السعودية ZATCA",
    h1: "الفاتورة الإلكترونية السعودية (ZATCA) مع Z-ERP",
    lead: "Z-ERP يصدر لمنشآت التجزئة في السعودية فواتير ضريبية تحمل رمز QR مع حساب لضريبة القيمة المضافة داخل الفاتورة، ويوفر خدمة إرسال للفوترة الإلكترونية إلى هيئة الزكاة والضريبة والجمارك (ZATCA)، كل ذلك من نظام واحد لنقاط البيع والمخزون والمحاسبة يعمل بالريال السعودي ويدير فروعك في المملكة بمزامنة سحابية.",
    pains: [
      {
        icon: FileText,
        title: "فوترة منفصلة عن الكاشير والمحاسبة",
        text: "حين تُصدر الفواتير الضريبية بأداة منفصلة عن نقطة البيع، يتضاعف الإدخال وتتضارب الأرقام بين الكاشير والفواتير والحسابات، ويضيع وقت فريقك في المطابقة.",
      },
      {
        icon: TriangleAlert,
        title: "أخطاء يدوية في الضريبة ورمز QR",
        text: "حساب ضريبة القيمة المضافة يدويًا أو التعامل مع رمز QR خارج نظام البيع يفتح الباب لخطأ في فاتورة واحدة يتكرر مئات المرات في الشهر دون أن ينتبه أحد.",
      },
      {
        icon: Split,
        title: "فروع متعددة في المملكة بلا صورة موحدة",
        text: "منشأة لها فروع في أكثر من مدينة تحتاج فوترة ومبيعات ومخزونًا في صورة واحدة، لا أنظمة متفرقة تجعل متابعة كل فرع عملًا مستقلًا بذاته.",
      },
      {
        icon: Landmark,
        title: "قلق دائم من متطلبات الهيئة",
        text: "صاحب المنشأة يريد أن يركز على البيع وهو مطمئن إلى أن فواتيره تصدر بالحقول الضريبية ورمز QR وأن لديه خدمة إرسال مخصصة للفوترة الإلكترونية، بدل مطاردة التفاصيل بنفسه كل يوم.",
      },
    ],
    features: [
      {
        icon: QrCode,
        title: "فواتير ضريبية برمز QR وحساب للضريبة",
        text: "تصدر كل فاتورة بيع بالحقول الضريبية ورمز QR، مع حساب ضريبة القيمة المضافة داخل الفاتورة نفسها، فلا حسابات يدوية ولا أدوات خارجية للتعامل مع الرمز.",
      },
      {
        icon: Send,
        title: "خدمة إرسال الفوترة الإلكترونية إلى ZATCA",
        text: "يوفر Z-ERP للمنشآت العاملة في السعودية خدمة إرسال للفوترة الإلكترونية لدى هيئة الزكاة والضريبة والجمارك (ZATCA)، لتصبح الفوترة الإلكترونية جزءًا من بيعك اليومي لا عملًا منفصلًا بجانبه.",
      },
      {
        icon: Coins,
        title: "الريال السعودي وعملات الخليج ومصر",
        text: "يعمل النظام بالريال السعودي (SAR) إلى جانب عملات الخليج ومصر (AED وQAR وKWD وBHD وOMR وEGP)، فيناسب المنشآت العاملة في المملكة ولها نشاط أو فروع عبر الحدود.",
      },
      {
        icon: ReceiptText,
        title: "نقاط بيع ومحاسبة ومخزون في نظام واحد",
        text: "الفاتورة الضريبية في Z-ERP هي فاتورة البيع نفسها: تُصدر من الكاشير، وتخصم من المخزون، وتدخل المحاسبة في حركة واحدة، فلا إدخال مكرر ولا فروقات بين أنظمة متفرقة.",
      },
      {
        icon: Network,
        title: "فروع المملكة بمزامنة سحابية لحظية",
        text: "أدر فروعًا في مدن سعودية متعددة من نظام واحد مع مزامنة لحظية في النسخة السحابية، وتابع فواتير ومبيعات ومخزون كل فرع من مكان واحد.",
      },
      {
        icon: ShieldCheck,
        title: "صلاحيات وسجل تدقيق حول الفوترة",
        text: "الخصومات وتعديلات الأسعار وإلغاءات الفواتير وحذف الإيصالات مضبوطة بصلاحيات منفصلة لكل كاشير وموثقة في سجل تدقيق، فتبقى فوترة منشأتك منظمة وقابلة للمراجعة.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ منشأتك وفرعك الأول في المملكة، وأضف الأصناف والأسعار بالريال السعودي.",
      },
      {
        title: "جهّز بيانات منشأتك الضريبية",
        text: "أدخل بيانات منشأتك الضريبية اللازمة لفواتيرك، ووصّل أجهزة الكاشير القياسية من طابعة إيصالات وماسح باركود ودرج نقدية، وحدّد صلاحيات كل كاشير.",
      },
      {
        title: "بِع وأصدر فواتيرك من نظام واحد",
        text: "ابدأ البيع وإصدار الفواتير الضريبية برمز QR من الكاشير مباشرة، واستخدم خدمة إرسال الفوترة الإلكترونية إلى ZATCA، وتابع كل فروعك من مكان واحد.",
      },
    ],
    faqs: [
      {
        q: "هل يصدر Z-ERP فواتير إلكترونية للمنشآت في السعودية؟",
        a: "يصدر Z-ERP فواتير بالحقول الضريبية ورمز QR مع حساب ضريبة القيمة المضافة، ويوفر للمنشآت العاملة في السعودية خدمة إرسال للفوترة الإلكترونية إلى هيئة الزكاة والضريبة والجمارك (ZATCA). وننصح كل منشأة بالتحقق من متطلبات الهيئة الحالية الخاصة بنشاطها قبل الاعتماد على أي نظام في إقراراتها.",
      },
      {
        q: "هل يدعم النظام الريال السعودي؟",
        a: "نعم. يعمل Z-ERP بالريال السعودي (SAR) ضمن عملات مدعومة تشمل عملات الخليج (AED وQAR وKWD وBHD وOMR) والجنيه المصري (EGP)، ليناسب المنشآت العاملة في المملكة وما حولها.",
      },
      {
        q: "هل أحتاج إلى برنامج محاسبة منفصل بجانب الكاشير؟",
        a: "لا. Z-ERP نظام واحد يجمع نقاط البيع والمخزون والمحاسبة: فاتورة البيع الضريبية تُصدر من الكاشير وتحدّث المخزون والمحاسبة في الحركة نفسها، دون إدخال مكرر بين برامج منفصلة.",
      },
      {
        q: "لديّ فروع في أكثر من مدينة سعودية، هل يناسبني؟",
        a: "نعم. يدعم Z-ERP الفروع والمخازن المتعددة مع مزامنة لحظية في النسخة السحابية، فتتابع فوترة ومبيعات ومخزون كل فرع في المملكة من مكان واحد.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "Saudi ZATCA e-invoicing",
    h1: "Saudi ZATCA E-Invoicing with Z-ERP",
    lead: "Z-ERP issues tax invoices with QR codes and VAT calculated inside the invoice for retail businesses in Saudi Arabia, and provides an e-invoicing submission service to the Zakat, Tax and Customs Authority (ZATCA) — all from one point-of-sale, inventory, and accounting system that runs in Saudi riyals and manages your branches across the Kingdom with cloud sync.",
    pains: [
      {
        icon: FileText,
        title: "Invoicing separate from the till and the accounts",
        text: "When tax invoices are issued by a tool separate from the point of sale, entry doubles and the numbers conflict between the till, the invoices, and the accounts, and your team wastes time reconciling them.",
      },
      {
        icon: TriangleAlert,
        title: "Manual errors in VAT and QR codes",
        text: "Calculating VAT by hand or handling QR codes outside the sales system opens the door to an error in a single invoice that repeats hundreds of times a month without anyone noticing.",
      },
      {
        icon: Split,
        title: "Several branches in the Kingdom, no unified picture",
        text: "A business with branches in more than one city needs its invoicing, sales, and stock in one picture — not scattered systems that make following each branch a job of its own.",
      },
      {
        icon: Landmark,
        title: "Constant worry about authority requirements",
        text: "A business owner wants to focus on selling, reassured that invoices carry the tax fields and QR code and that a dedicated e-invoicing submission service exists, instead of chasing the details personally every day.",
      },
    ],
    features: [
      {
        icon: QrCode,
        title: "Tax invoices with QR codes and VAT calculation",
        text: "Every sales invoice is issued with the tax fields and a QR code, with VAT calculated inside the invoice itself — no manual calculations and no external tools to handle the code.",
      },
      {
        icon: Send,
        title: "A ZATCA e-invoicing submission service",
        text: "For businesses operating in Saudi Arabia, Z-ERP provides an e-invoicing submission service to the Zakat, Tax and Customs Authority (ZATCA), making e-invoicing part of your daily selling rather than separate work alongside it.",
      },
      {
        icon: Coins,
        title: "Saudi riyal, Gulf, and Egypt currencies",
        text: "The system runs in Saudi riyals (SAR) alongside Gulf and Egypt currencies (AED, QAR, KWD, BHD, OMR, EGP), suiting businesses that operate in the Kingdom with activity or branches across borders.",
      },
      {
        icon: ReceiptText,
        title: "POS, accounting, and inventory in one system",
        text: "The tax invoice in Z-ERP is the sales invoice itself: issued at the till, deducted from stock, and entered into accounting in one movement — no duplicate entry and no differences between scattered systems.",
      },
      {
        icon: Network,
        title: "Kingdom branches with real-time cloud sync",
        text: "Run branches in several Saudi cities from one system with real-time sync in the cloud edition, and follow each branch's invoices, sales, and stock from one place.",
      },
      {
        icon: ShieldCheck,
        title: "Permissions and an audit log around invoicing",
        text: "Discounts, price edits, invoice voids, and receipt deletions are governed by separate permissions per cashier and recorded in an audit log, keeping your business's invoicing organised and reviewable.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial, create your business and its first branch in the Kingdom, and add your items and prices in Saudi riyals.",
      },
      {
        title: "Set up your business's tax details",
        text: "Enter the tax details your invoices need, connect standard till hardware — receipt printer, barcode scanner, and cash drawer — and set each cashier's permissions.",
      },
      {
        title: "Sell and invoice from one system",
        text: "Start selling and issuing tax invoices with QR codes directly from the till, use the e-invoicing submission service to ZATCA, and follow all your branches from one place.",
      },
    ],
    faqs: [
      {
        q: "Does Z-ERP issue e-invoices for businesses in Saudi Arabia?",
        a: "Z-ERP issues invoices with tax fields and QR codes with VAT calculation, and provides businesses operating in Saudi Arabia with an e-invoicing submission service to the Zakat, Tax and Customs Authority (ZATCA). We advise every business to verify the authority's current requirements for its own activity before relying on any system for its filings.",
      },
      {
        q: "Does the system support Saudi riyals?",
        a: "Yes. Z-ERP runs in Saudi riyals (SAR) among supported currencies that include the Gulf currencies (AED, QAR, KWD, BHD, OMR) and the Egyptian pound (EGP), suiting businesses operating in the Kingdom and around it.",
      },
      {
        q: "Do I need separate accounting software alongside the till?",
        a: "No. Z-ERP is one system combining point of sale, inventory, and accounting: the tax sales invoice is issued at the till and updates stock and accounting in the same movement, with no duplicate entry between separate programs.",
      },
      {
        q: "I have branches in more than one Saudi city — does it suit me?",
        a: "Yes. Z-ERP supports multiple branches and warehouses with real-time sync in the cloud edition, so you follow each branch's invoicing, sales, and stock across the Kingdom from one place.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const posSecurity: Sector = {
  slug: "pos-security",
  path: "/pos-security",
  related: ["offline-pos", "pos-restaurants"],
  ar: {
    cardTitle: "حماية الكاشير من السرقة والتلاعب",
    h1: "حماية الكاشير من السرقة والتلاعب",
    lead: "Z-ERP يحمي نقطة البيع من السرقة والتلاعب بصلاحيات منفصلة لكل كاشير تتحكم في تعديل الأسعار وحذف الإيصالات والخصومات وفتح درج النقدية، وبسجل تدقيق يسجل كل عملية استثنائية باسم من نفذها ووقتها. فتُسد أشهر طرق التسريب عند الكاشير، ويصبح كل استثناء ظاهرًا وموثقًا وقابلًا للمراجعة بدل أن يختفي دون أثر.",
    pains: [
      {
        icon: ReceiptText,
        title: "فاتورة تُقبض قيمتها ثم تُلغى",
        text: "أشهر تسريب عند الكاشير: يبيع للعميل ويقبض الثمن نقدًا، ثم يلغي الفاتورة أو يحذف الإيصال، فيختفي البيع من النظام ويذهب الفرق إلى جيبه.",
      },
      {
        icon: HandCoins,
        title: "خصومات للأصحاب والمعارف",
        text: "خصم غير مصرح به لصديق أو قريب، أو «سعر خاص» يُمنح شفهيًا عند الكاشير، حركة تتكرر يوميًا وتأكل من هامش ربحك دون أن تظهر في أي تقرير.",
      },
      {
        icon: Eye,
        title: "تعديلات أسعار لا يراها أحد",
        text: "تخفيض سعر صنف لحظة البيع ثم تحصيل السعر الكامل من العميل وقبض الفرق، تلاعب يستحيل اكتشافه في نظام لا يوثق من عدّل ماذا ومتى.",
      },
      {
        icon: CircleDollarSign,
        title: "درج نقدية يفتح بلا بيع",
        text: "فتح درج النقدية دون فاتورة — لأخذ مبلغ أو تبديل فئات — يجب أن يكون استثناءً مضبوطًا وموثقًا، لا حدثًا عاديًا متكررًا لا يعرف عنه صاحب المحل شيئًا.",
      },
    ],
    features: [
      {
        icon: KeyRound,
        title: "صلاحيات منفصلة لكل كاشير",
        text: "حدّد لكل كاشير ما يستطيع فعله بالضبط: البيع فقط، أم الخصم أيضًا، أم الإلغاء وحذف الإيصالات وتعديل الأسعار وفتح الدرج. وما ليس من صلاحيته لا يستطيع تنفيذه من الأساس.",
      },
      {
        icon: ScrollText,
        title: "سجل تدقيق لكل عملية استثنائية",
        text: "كل إلغاء أو حذف إيصال أو خصم أو تعديل سعر أو فتح لدرج النقدية يُسجل في سجل تدقيق باسم المستخدم الذي نفذه ووقته، فتتحول العمليات التي كانت تختفي إلى سجل موثق قابل للمراجعة في أي وقت.",
      },
      {
        icon: Lock,
        title: "قصر العمليات الحساسة على المديرين",
        text: "اجعل الإلغاءات والخصومات وتعديلات الأسعار من صلاحيات المدير فقط، فيحتاج أي استثناء عند الكاشير إلى مسؤول يملك الصلاحية، ويبقى الكاشير حرًا في البيع العادي وحده.",
      },
      {
        icon: Undo2,
        title: "لا حذف أو إلغاء يمر بصمت",
        text: "حذف الإيصالات وإلغاء الفواتير ليسا زرين صامتين: إما ممنوعان عن الكاشير بصلاحياته، أو موثقان في سجل التدقيق بمن نفذهما، فتظهر كل حركة عند المراجعة.",
      },
      {
        icon: ShieldCheck,
        title: "فتح درج النقدية مضبوط وموثق",
        text: "فتح درج النقدية خارج سياق عملية بيع عملية مضبوطة بالصلاحيات وموثقة في سجل التدقيق، فتعرف كل مرة فُتح فيها الدرج، ومتى، وبواسطة من.",
      },
      {
        icon: UserCheck,
        title: "الرقابة تعمل في السحابية والمحلية معًا",
        text: "صلاحيات الكاشير وسجل التدقيق جزء من نظام Z-ERP نفسه، فيعملان في النسخة المحلية كما يعملان في السحابية، وتبقى الرقابة قائمة حتى في الفروع ضعيفة الاتصال.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ فرعك، وعرّف الكاشيرين والمديرين، لكلٍّ منهم حسابه الخاص.",
      },
      {
        title: "اضبط صلاحية كل دور",
        text: "حدّد ما يستطيع الكاشير فعله منفردًا، وما يحتاج إلى مدير: الإلغاء، والخصم، وتعديل الأسعار، وفتح درج النقدية.",
      },
      {
        title: "راجع سجل التدقيق دوريًا",
        text: "اجعل مراجعة سجل العمليات الاستثنائية عادة دورية، فكل عملية موثقة باسم صاحبها ووقتها وجاهزة للمراجعة.",
      },
    ],
    faqs: [
      {
        q: "هل يمنع البرنامج سرقة الكاشير منعًا كاملًا؟",
        a: "لا يستطيع أي برنامج أن يعد بمنع السرقة منعًا مطلقًا، لكن Z-ERP يسد الطرق الأشهر: صلاحيات منفصلة لكل كاشير تمنع من لا يملك الصلاحية من الإلغاء أو الخصم أو تعديل الأسعار أو فتح درج النقدية، وسجل تدقيق يوثق كل عملية استثنائية باسم من نفذها ووقتها، فيصبح التلاعب أصعب وظاهرًا وقابلًا للاكتشاف عند المراجعة.",
      },
      {
        q: "هل يستطيع الكاشير حذف فاتورة دون أن أعلم؟",
        a: "حذف الإيصالات عملية مضبوطة بالصلاحيات: يمكنك منعها عن الكاشير تمامًا أو قصرها على المديرين، وحتى حيث توجد الصلاحية تُسجل العملية في سجل التدقيق باسم من نفذها ووقتها، فلا حذف يمر بصمت.",
      },
      {
        q: "ماذا يسجل سجل التدقيق بالضبط؟",
        a: "يسجل العمليات الاستثنائية عند نقطة البيع: إلغاءات الفواتير، وحذف الإيصالات، والخصومات، وتعديلات الأسعار، وفتح درج النقدية، مع اسم المستخدم الذي نفذ كل عملية ووقتها.",
      },
      {
        q: "هل تعمل الصلاحيات والسجل في فرع يستخدم النسخة المحلية؟",
        a: "نعم. صلاحيات الكاشير وسجل التدقيق جزء من نظام Z-ERP نفسه في النسختين السحابية والمحلية، فتبقى الرقابة عاملة في الفروع ضعيفة الاتصال كما في الفروع المتصلة.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "Stop cashier theft & manipulation",
    h1: "Stop Cashier Theft and Manipulation at the Till",
    lead: "Z-ERP protects the point of sale against theft and manipulation with separate permissions for each cashier governing price edits, receipt deletions, discounts, and cash-drawer openings, plus a tamper-evident audit log that records every exceptional action with who performed it and when. The most common till leak routes are closed off, and every exception becomes visible, documented, and reviewable instead of disappearing without a trace.",
    pains: [
      {
        icon: ReceiptText,
        title: "An invoice collected, then voided",
        text: "The most common till leak: the cashier sells to the customer and collects the cash, then voids the invoice or deletes the receipt, so the sale vanishes from the system and the difference goes into a pocket.",
      },
      {
        icon: HandCoins,
        title: "Discounts for friends and acquaintances",
        text: "An unauthorised discount for a friend or relative, or a 'special price' granted verbally at the till, is a movement that repeats daily and eats into your margin without appearing in any report.",
      },
      {
        icon: Eye,
        title: "Price edits nobody sees",
        text: "Lowering an item's price at the moment of sale, then charging the customer the full price and pocketing the difference, is manipulation that is impossible to catch in a system that does not record who edited what, and when.",
      },
      {
        icon: CircleDollarSign,
        title: "A cash drawer that opens with no sale",
        text: "Opening the cash drawer without an invoice — to take an amount or swap denominations — should be a controlled, documented exception, not an ordinary repeated event the shop owner knows nothing about.",
      },
    ],
    features: [
      {
        icon: KeyRound,
        title: "Separate permissions for each cashier",
        text: "Define exactly what each cashier can do: sell only, or also discount, or also void, delete receipts, edit prices, and open the drawer. Anything outside their permission, they cannot perform in the first place.",
      },
      {
        icon: ScrollText,
        title: "An audit log of every exceptional action",
        text: "Every void, receipt deletion, discount, price edit, and cash-drawer opening is recorded in a tamper-evident audit log with the user who performed it and its time, turning actions that used to vanish into a documented record you can review at any moment.",
      },
      {
        icon: Lock,
        title: "Sensitive actions restricted to managers",
        text: "Make voids, discounts, and price edits manager-only permissions, so any exception at the till needs someone who holds the permission, while cashiers stay free to do ordinary selling alone.",
      },
      {
        icon: Undo2,
        title: "No deletion or void passes silently",
        text: "Receipt deletions and invoice voids are not silent buttons: they are either denied to the cashier by their permissions, or documented in the audit log with who performed them, so every movement shows up on review.",
      },
      {
        icon: ShieldCheck,
        title: "Drawer openings controlled and recorded",
        text: "Opening the cash drawer outside the context of a sale is governed by permissions and recorded in the audit log, so you know every time the drawer was opened, when, and by whom.",
      },
      {
        icon: UserCheck,
        title: "Control that works in cloud and local editions",
        text: "Cashier permissions and the audit log are part of the Z-ERP system itself, so they work in the local edition exactly as in the cloud, and control stays in place even at branches with weak connectivity.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial, create your branch, and define your cashiers and managers, each with their own account.",
      },
      {
        title: "Set each role's permissions",
        text: "Decide what a cashier can do alone and what needs a manager: voids, discounts, price edits, and cash-drawer openings.",
      },
      {
        title: "Review the audit log regularly",
        text: "Make reviewing the exceptions log a regular habit: every action is documented with its owner's name and time, ready for review.",
      },
    ],
    faqs: [
      {
        q: "Does the software stop cashier theft completely?",
        a: "No software can honestly promise to eliminate theft entirely, but Z-ERP closes the most common routes: separate permissions per cashier stop anyone without the permission from voiding, discounting, editing prices, or opening the cash drawer, and an audit log documents every exceptional action with who performed it and when, making manipulation harder, visible, and discoverable on review.",
      },
      {
        q: "Can a cashier delete an invoice without me knowing?",
        a: "Receipt deletion is governed by permissions: you can deny it to cashiers entirely or restrict it to managers, and even where the permission exists, the action is recorded in the audit log with the user and time — no deletion passes silently.",
      },
      {
        q: "What exactly does the audit log record?",
        a: "It records the exceptional actions at the point of sale: invoice voids, receipt deletions, discounts, price edits, and cash-drawer openings, with the name of the user who performed each action and its time.",
      },
      {
        q: "Do permissions and the log work at a branch on the local edition?",
        a: "Yes. Cashier permissions and the audit log are part of the Z-ERP system itself in both the cloud and local editions, so control keeps working at branches with weak connectivity just as at connected branches.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const daftraAlternative: Sector = {
  slug: "alternative-daftra",
  path: "/alternative-daftra",
  related: ["offline-pos", "inventory-management"],
  ar: {
    cardTitle: "بديل دفترة للمحلات والفروع",
    h1: "بديل دفترة لإدارة المحلات والفروع",
    lead: "إذا كان نشاطك محاسبة وفوترة إلكترونية تُدار عبر الإنترنت فقط، فمنصات المحاسبة السحابية مثل دفترة خيار معروف ومناسب. أما إذا كنت تدير محلات وفروعًا فعلية بكاشير ومخزون، فـ Z-ERP يجمع نقاط البيع والمخزون والمحاسبة في نظام واحد مصمم للبيع الفعلي، ويوفر نسخة محلية تعمل بالكامل بدون إنترنت وتزامن عند عودة الاتصال، مع صلاحيات منفصلة لكل كاشير وسجل تدقيق ضد التلاعب.",
    pains: [
      {
        icon: WifiOff,
        title: "انقطاع الإنترنت يوقف البيع",
        text: "إذا كان نشاطك بيعًا فعليًا في محل، فاعتماد الكاشير الكامل على الاتصال بالسحابة يعني أن أي انقطاع يوقف البيع والفوترة حتى تعود الشبكة — والمحل لا يستطيع إغلاق بابه بانتظار الإنترنت.",
      },
      {
        icon: Store,
        title: "احتياجك كاشير أولًا لا محاسبة أولًا",
        text: "صاحب المحل يبدأ يومه عند الكاشير: بيع سريع بالباركود وورديات ودرج نقدية، فيحتاج نظامًا تكون نقطة البيع قلبه الأساسي وتُبنى حولها المحاسبة والمخزون، لا العكس.",
      },
      {
        icon: Warehouse,
        title: "مخزون فروع ومخازن بعمق تشغيلي",
        text: "متجر بفروع ومخازن متعددة يحتاج أرصدة موحدة لحظيًا وتحويلات موثقة بين المواقع وحدود إعادة طلب وتنبيهات نفاد — إدارة مخزون تشغيلية كاملة، لا مجرد رصيد ينقص مع كل فاتورة.",
      },
      {
        icon: Eye,
        title: "تلاعب الكاشير لا تراه المحاسبة وحدها",
        text: "إلغاء فاتورة بعد قبض ثمنها، أو خصم لمعرفة، أو تعديل سعر لحظة البيع: حركات تحدث عند الكاشير، وإن لم تضبطها صلاحيات لكل كاشير وتوثقها سجلات تدقيق فلن تظهر في أي قيد محاسبي.",
      },
    ],
    features: [
      {
        icon: CloudOff,
        title: "نسخة محلية تعمل بالكامل بدون إنترنت",
        text: "إلى جانب النسخة السحابية، يوفر Z-ERP نسخة محلية تستمر في البيع وإصدار الفواتير وتحديث المخزون أثناء انقطاع الإنترنت، وتزامن بياناتها تلقائيًا عند عودة الاتصال.",
      },
      {
        icon: ScanBarcode,
        title: "نقطة بيع في قلب النظام",
        text: "Z-ERP نظام ERP ونقاط بيع منذ تصميمه: بيع سريع بالباركود عند الكاشير، مع دعم طابعات الإيصالات والماسحات وأدراج النقدية وشاشات العميل القياسية.",
      },
      {
        icon: Network,
        title: "فروع ومخازن متعددة بأرصدة موحدة",
        text: "أدر فروعك ومخازنك من نظام واحد: أرصدة لحظية موحدة، وتحويلات موثقة بين الفروع والمخازن، وتنبيهات مخزون بحدود إعادة طلب.",
      },
      {
        icon: ShieldCheck,
        title: "صلاحيات وسجل تدقيق ضد التلاعب",
        text: "صلاحيات منفصلة لكل كاشير على تعديل الأسعار وحذف الإيصالات والخصومات وفتح درج النقدية، وسجل تدقيق موثق لكل عملية استثنائية باسم من نفذها ووقتها.",
      },
      {
        icon: ReceiptText,
        title: "محاسبة وفواتير ضريبية من البيع نفسه",
        text: "فاتورة البيع في Z-ERP تحمل الحقول الضريبية ورمز QR مع حساب ضريبة القيمة المضافة داخلها، وتحدّث المخزون والمحاسبة في الحركة نفسها دون إدخال مكرر.",
      },
      {
        icon: RefreshCw,
        title: "سحابي أو محلي — بنفس النظام",
        text: "يوفر Z-ERP نسخة سحابية بمزامنة لحظية ونسخة محلية تعمل دون إنترنت، فيختار كل نشاط النمط المناسب لاتصاله وطبيعة فروعه ضمن نظام واحد.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ نشاطك وفرعك الأول خلال دقائق، وقيّم النظام ببياناتك الحقيقية.",
      },
      {
        title: "أدخل أصنافك وأرصدتك الافتتاحية",
        text: "أضف الأصناف والأسعار وأرصدة المخزون الافتتاحية، ووصّل أجهزة الكاشير القياسية، وحدّد صلاحيات كل كاشير.",
      },
      {
        title: "بِع والمحاسبة والمخزون يتحركان معك",
        text: "من أول فاتورة يُحدَّث المخزون والمحاسبة تلقائيًا، وتتابع كل فروعك من مكان واحد.",
      },
    ],
    faqs: [
      {
        q: "ما الفرق الجوهري بين Z-ERP ودفترة؟",
        a: "دفترة منصة سحابية معروفة للمحاسبة والفوترة الإلكترونية وإدارة الأعمال عبر الإنترنت، وتناسب من يدير حساباته وفواتيره أونلاين. أما Z-ERP فهو نظام ERP ونقاط بيع مصمم للمحلات والفروع الفعلية: يجمع الكاشير والمخزون متعدد الفروع والمخازن والمحاسبة في نظام واحد، ويوفر نسخة محلية تعمل بالكامل بدون إنترنت، وصلاحيات وسجل تدقيق مضادَّين لتلاعب الكاشير. فالاختيار يتبع طبيعة نشاطك: محاسبة سحابية خالصة، أم بيع فعلي عند كاشير بفروع ومخزون؟",
      },
      {
        q: "هل يعمل Z-ERP عندما ينقطع الإنترنت عن المحل؟",
        a: "نعم. النسخة المحلية من Z-ERP تستمر في البيع وإصدار الفواتير وتحديث المخزون طوال فترة الانقطاع، ثم تزامن بياناتها تلقائيًا عند عودة الاتصال، فلا يتوقف الكاشير ولا تضيع أي حركة.",
      },
      {
        q: "هل يدعم Z-ERP الفواتير الضريبية والفاتورة الإلكترونية؟",
        a: "يصدر Z-ERP فواتير بالحقول الضريبية ورمز QR مع حساب ضريبة القيمة المضافة داخل الفاتورة، ويوفر للمنشآت العاملة في السعودية خدمة إرسال للفوترة الإلكترونية إلى ZATCA. وننصح كل منشأة بالتحقق من متطلبات الجهة الضريبية الحالية الخاصة بنشاطها قبل الاعتماد على أي نظام في إقراراتها.",
      },
      {
        q: "لديّ فروع ومخازن متعددة، هل يديرها Z-ERP في نظام واحد؟",
        a: "نعم. يدعم Z-ERP الفروع والمخازن المتعددة مع أرصدة موحدة وتحويلات موثقة بينها ومزامنة لحظية في النسخة السحابية، فتتابع مبيعات ومخزون كل فرع من مكان واحد.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "A Daftra alternative for stores",
    h1: "A Daftra Alternative for Retail Stores and Branches",
    lead: "If your work is accounting and e-invoicing handled purely online, cloud accounting platforms such as Daftra are a well-known and fitting choice. But if you run physical stores and branches with a till and stock, Z-ERP combines point of sale, inventory, and accounting in one system designed for physical selling, adds a local edition that works fully offline and syncs when the connection returns, and protects the till with separate permissions for each cashier and an audit log.",
    pains: [
      {
        icon: WifiOff,
        title: "An internet outage stops the selling",
        text: "If your business sells in a physical store, a till that depends entirely on a cloud connection means every outage stops selling and invoicing until the network returns — and a store cannot close its doors while waiting for the internet.",
      },
      {
        icon: Store,
        title: "You need POS-first, not accounting-first",
        text: "A shop owner's day starts at the till: fast barcode selling, shifts, and a cash drawer. You need a system whose core is the point of sale, with accounting and inventory built around it — not the other way round.",
      },
      {
        icon: Warehouse,
        title: "Branch and warehouse stock with operational depth",
        text: "A store with several branches and warehouses needs unified real-time balances, documented transfers between locations, reorder thresholds, and stock alerts — full operational inventory management, not just a balance that drops with each invoice.",
      },
      {
        icon: Eye,
        title: "Till manipulation that accounting alone cannot see",
        text: "Voiding an invoice after collecting its value, discounting for an acquaintance, or editing a price at the moment of sale all happen at the till; if per-cashier permissions do not govern them and an audit log does not record them, they never appear in any accounting entry.",
      },
    ],
    features: [
      {
        icon: CloudOff,
        title: "A local edition that works fully offline",
        text: "Alongside its cloud edition, Z-ERP offers a local edition that keeps selling, issuing invoices, and updating stock during an internet outage, then syncs its data automatically when the connection returns.",
      },
      {
        icon: ScanBarcode,
        title: "Point of sale at the core of the system",
        text: "Z-ERP is an ERP and point-of-sale system by design: fast barcode checkout at the till, with support for standard receipt printers, scanners, cash drawers, and customer displays.",
      },
      {
        icon: Network,
        title: "Multiple branches and warehouses, one balance picture",
        text: "Run your branches and warehouses from one system: real-time unified balances, documented transfers between branches and warehouses, and stock alerts with reorder thresholds.",
      },
      {
        icon: ShieldCheck,
        title: "Permissions and an audit log against manipulation",
        text: "Separate permissions for each cashier over price edits, receipt deletions, discounts, and cash-drawer openings, with a tamper-evident audit log recording every exceptional action with who performed it and when.",
      },
      {
        icon: ReceiptText,
        title: "Accounting and tax invoices from the sale itself",
        text: "The sales invoice in Z-ERP carries the tax fields and a QR code with VAT calculated inside it, and updates stock and accounting in the same movement — no duplicate entry.",
      },
      {
        icon: RefreshCw,
        title: "Cloud or local — the same system",
        text: "Z-ERP provides a cloud edition with real-time sync and a local edition that works without internet, so each business chooses the mode that fits its connection and branch structure within one system.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial and create your business and its first branch in minutes, evaluating the system with your real data.",
      },
      {
        title: "Enter your items and opening balances",
        text: "Add your items, prices, and opening stock balances, connect your standard till hardware, and set each cashier's permissions.",
      },
      {
        title: "Sell — accounting and stock move with you",
        text: "From the first invoice, stock and accounting update automatically, and you follow all your branches from one place.",
      },
    ],
    faqs: [
      {
        q: "What is the fundamental difference between Z-ERP and Daftra?",
        a: "Daftra is a well-known cloud platform for accounting, e-invoicing, and business management handled online, and it suits owners who run their accounts and invoices purely over the internet. Z-ERP is an ERP and point-of-sale system designed for physical stores and branches: it combines the till, multi-branch and multi-warehouse inventory, and accounting in one system, offers a local edition that works fully offline, and adds per-cashier permissions with an audit log against till manipulation. The choice follows your business: pure cloud accounting, or physical selling at a till with branches and stock?",
      },
      {
        q: "Does Z-ERP work when the store's internet goes down?",
        a: "Yes. The Z-ERP local edition keeps selling, issuing invoices, and updating stock throughout the outage, then syncs its data automatically when the connection returns — the till never stops and no movement is lost.",
      },
      {
        q: "Does Z-ERP support tax invoices and e-invoicing?",
        a: "Z-ERP issues invoices with tax fields and QR codes, with VAT calculated inside the invoice, and provides businesses operating in Saudi Arabia with an e-invoicing submission service to ZATCA. We advise every business to verify its tax authority's current requirements for its activity before relying on any system for its filings.",
      },
      {
        q: "I have several branches and warehouses — can one system run them?",
        a: "Yes. Z-ERP supports multiple branches and warehouses with unified balances, documented transfers between them, and real-time sync in the cloud edition, so you follow each branch's sales and stock from one place.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const foodicsAlternative: Sector = {
  slug: "alternative-foodics",
  path: "/alternative-foodics",
  related: ["pos-restaurants", "offline-pos"],
  ar: {
    cardTitle: "بديل فودكس للمطاعم والمقاهي",
    h1: "بديل فودكس للمطاعم والمقاهي",
    lead: "فودكس منصة معروفة متخصصة في نقاط بيع وإدارة المطاعم. وZ-ERP يخدم المطاعم والكافيهات والمخابز بنقاط بيع تغطي طلبات الصالة والتيك أواي والتوصيل، لكنه في الوقت نفسه نظام ERP متكامل يدير أنشطة التجزئة والجملة الأخرى لنفس المالك في نظام واحد، ويوفر نسخة محلية تعمل بالكامل بدون إنترنت، وفواتير ضريبية برمز QR وخدمة إرسال للفوترة الإلكترونية إلى ZATCA.",
    pains: [
      {
        icon: Split,
        title: "مطعم وأنشطة أخرى عند مالك واحد",
        text: "كثير من أصحاب المطاعم يملكون بجانبها محلات تجزئة أو نشاط جملة؛ فإذا كان نظامك متخصصًا في المطاعم وحده، ستدير بقية أعمالك بنظام آخر وتتفرق الحسابات والمخزون بين عالمين.",
      },
      {
        icon: WifiOff,
        title: "انقطاع الإنترنت في ساعة الذروة",
        text: "المطعم لا يختار توقيت انقطاع الاتصال؛ ونظام يعتمد على السحابة وحدها يعرّض كاشيرك للتوقف في أكثر أوقات اليوم ازدحامًا وطلبات.",
      },
      {
        icon: Warehouse,
        title: "مخزون المطعم منفصل عن بقية الأعمال",
        text: "مخزون المطعم وفروعه جزء من صورة مالية أكبر للمالك؛ وفصله في نظام مستقل يعني مطابقات يدوية بين مبيعات المطعم وحسابات بقية الأنشطة.",
      },
      {
        icon: Landmark,
        title: "متطلبات فوترة ضريبية لا تنتظر",
        text: "مطاعم السعودية تحتاج فواتير برمز QR وحساب ضريبة وخدمة فوترة إلكترونية لدى ZATCA داخل نظام البيع نفسه، لا أداة إضافية تُدار بجانب الكاشير.",
      },
    ],
    features: [
      {
        icon: UtensilsCrossed,
        title: "نقطة بيع للمطاعم داخل ERP كامل",
        text: "طلبات الصالة والتيك أواي والتوصيل من كاشير Z-ERP، متصلة لحظيًا بالمخزون والمحاسبة، فطلب العميل حركة واحدة من الكاشير إلى الحسابات.",
      },
      {
        icon: Store,
        title: "مطعمك ومحلاتك وجملتك في نظام واحد",
        text: "أدر المطعم وأنشطة التجزئة والجملة التابعة لك من Z-ERP واحد، بأرصدة وحسابات موحدة، بدل نظام منفصل لكل نشاط.",
      },
      {
        icon: CloudOff,
        title: "نسخة محلية لا توقف خدمة الزبائن",
        text: "النسخة المحلية تعمل بالكامل بدون إنترنت — بيع وفوترة وتحديث مخزون — وتزامن تلقائيًا عند عودة الاتصال، فلا يقف الكاشير في الذروة.",
      },
      {
        icon: QrCode,
        title: "فواتير ضريبية برمز QR وخدمة ZATCA",
        text: "كل فاتورة بالحقول الضريبية ورمز QR وحساب لضريبة القيمة المضافة، مع خدمة إرسال للفوترة الإلكترونية إلى ZATCA للمنشآت العاملة في السعودية.",
      },
      {
        icon: Network,
        title: "فروع وسلاسل بمزامنة لحظية",
        text: "النسخة السحابية تزامن فروعك لحظيًا، فتتابع مبيعات ومخزون كل فرع — مطعمًا كان أو محلًا — من مكان واحد.",
      },
      {
        icon: ShieldCheck,
        title: "رقابة على إلغاءات وخصومات الكاشير",
        text: "صلاحيات منفصلة لكل كاشير على الإلغاء وحذف الإيصالات والخصومات وتعديلات الأسعار، موثقة في سجل تدقيق — حماية يحتاجها أي كاشير مطعم مزدحم.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ مطعمك أو فرعك الأول وأصناف قائمتك.",
      },
      {
        title: "جهّز الكاشير والصلاحيات",
        text: "وصّل أجهزة الكاشير القياسية، وأضف فروعك وأنشطتك الأخرى إن وجدت، وحدّد صلاحيات كل كاشير.",
      },
      {
        title: "استقبل الطلبات من نظام واحد",
        text: "بِع طلبات الصالة والتيك أواي والتوصيل، وتابع المخزون والمحاسبة وكل فروعك وأنشطتك من مكان واحد.",
      },
    ],
    faqs: [
      {
        q: "ما الفرق الجوهري بين Z-ERP وفودكس؟",
        a: "فودكس منصة متخصصة في نقاط بيع وإدارة المطاعم. أما Z-ERP فنظام ERP ونقاط بيع أوسع: يخدم المطاعم والكافيهات والمخابز، ويدير في الوقت نفسه أنشطة التجزئة والجملة الأخرى للمالك نفسه، ويوفر نسخة محلية تعمل بالكامل بدون إنترنت. فإن كان نشاطك مطعمًا خالصًا وتريد تخصصًا مطلقًا فقد يناسبك المتخصص، وإن كانت لك أنشطة أو فروع متنوعة أو اتصال غير مستقر، فالنظام المتكامل أقرب لاحتياجك.",
      },
      {
        q: "هل يناسب Z-ERP من يملك مطعمًا واحدًا فقط؟",
        a: "نعم، يعمل Z-ERP لمطعم واحد كما يعمل لسلاسل وفروع متعددة، وستحصل على نقطة البيع والمخزون والمحاسبة والفوترة الضريبية في نظام واحد. والفرق يظهر حين يتوسع نشاطك أو تُضاف أنشطة أخرى: لن تحتاج إلى تغيير النظام أو إضافة نظام ثانٍ بجانبه.",
      },
      {
        q: "هل يعمل الكاشير إذا انقطع الإنترنت عن المطعم؟",
        a: "نعم. النسخة المحلية من Z-ERP تستمر في استقبال الطلبات وإصدار الفواتير وتحديث المخزون أثناء الانقطاع، وتزامن بياناتها تلقائيًا عند عودة الاتصال.",
      },
      {
        q: "هل يدعم Z-ERP الفوترة الإلكترونية السعودية للمطاعم؟",
        a: "يصدر Z-ERP فواتير بالحقول الضريبية ورمز QR مع حساب ضريبة القيمة المضافة، ويوفر للمنشآت العاملة في السعودية خدمة إرسال للفوترة الإلكترونية إلى ZATCA. وننصح كل منشأة بالتحقق من متطلبات الهيئة الحالية الخاصة بنشاطها قبل الاعتماد على أي نظام في إقراراتها.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "A Foodics alternative for restaurants",
    h1: "A Foodics Alternative for Restaurants and Cafés",
    lead: "Foodics is a well-known platform specialised in restaurant point of sale and management. Z-ERP also serves restaurants, cafés, and bakeries with a point of sale covering dine-in, takeaway, and delivery orders — but it is at the same time a full ERP that runs the same owner's other retail and wholesale activities in one system, offers a local edition that works fully offline, and issues tax invoices with QR codes alongside a ZATCA e-invoicing submission service.",
    pains: [
      {
        icon: Split,
        title: "A restaurant plus other activities under one owner",
        text: "Many restaurant owners also run retail shops or a wholesale activity alongside. If your system specialises in restaurants alone, the rest of your business lives in a second system, and accounts and stock split across two worlds.",
      },
      {
        icon: WifiOff,
        title: "An internet outage at peak hour",
        text: "A restaurant does not choose when the connection drops; a system that depends on the cloud alone puts your till at risk of stopping at the busiest, most order-heavy moment of the day.",
      },
      {
        icon: Warehouse,
        title: "Restaurant stock separated from the rest of the business",
        text: "A restaurant's stock and branches are part of the owner's bigger financial picture; isolating them in a separate system means manual reconciliations between restaurant sales and the accounts of the other activities.",
      },
      {
        icon: Landmark,
        title: "Tax invoicing requirements that will not wait",
        text: "Restaurants in Saudi Arabia need invoices with QR codes, VAT calculation, and a ZATCA e-invoicing service inside the selling system itself — not an extra tool managed alongside the till.",
      },
    ],
    features: [
      {
        icon: UtensilsCrossed,
        title: "A restaurant POS inside a full ERP",
        text: "Dine-in, takeaway, and delivery orders from the Z-ERP till, connected in real time to stock and accounting — a customer order is one movement from the till to the books.",
      },
      {
        icon: Store,
        title: "Your restaurant, shops, and wholesale in one system",
        text: "Run the restaurant and your related retail and wholesale activities from one Z-ERP, with unified balances and accounts, instead of a separate system per activity.",
      },
      {
        icon: CloudOff,
        title: "A local edition that never stops serving",
        text: "The local edition works fully without internet — selling, invoicing, and stock updates — and syncs automatically when the connection returns, so the till never stalls at peak time.",
      },
      {
        icon: QrCode,
        title: "Tax invoices with QR codes and a ZATCA service",
        text: "Every invoice carries the tax fields and a QR code with VAT calculated inside it, with an e-invoicing submission service to ZATCA for businesses operating in Saudi Arabia.",
      },
      {
        icon: Network,
        title: "Branches and chains with real-time sync",
        text: "The cloud edition syncs your branches in real time, so you follow each branch's sales and stock — restaurant or shop — from one place.",
      },
      {
        icon: ShieldCheck,
        title: "Control over till voids and discounts",
        text: "Separate permissions for each cashier over voids, receipt deletions, discounts, and price edits, recorded in an audit log — protection any busy restaurant till needs.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial and create your restaurant or first branch and your menu items.",
      },
      {
        title: "Set up the till and permissions",
        text: "Connect your standard till hardware, add your branches and other activities if any, and set each cashier's permissions.",
      },
      {
        title: "Take orders from one system",
        text: "Sell dine-in, takeaway, and delivery orders, and follow stock, accounting, and all your branches and activities from one place.",
      },
    ],
    faqs: [
      {
        q: "What is the fundamental difference between Z-ERP and Foodics?",
        a: "Foodics is a platform specialised in restaurant point of sale and management. Z-ERP is a broader ERP and point-of-sale system: it serves restaurants, cafés, and bakeries while also running the same owner's other retail and wholesale activities, and it offers a local edition that works fully offline. If your business is purely a restaurant and you want absolute specialisation, the specialist may suit you; if you have varied activities or branches, or an unreliable connection, the integrated system is closer to your need.",
      },
      {
        q: "Does Z-ERP suit someone with a single restaurant?",
        a: "Yes — Z-ERP works for a single restaurant just as it does for chains and multiple branches, giving you point of sale, stock, accounting, and tax invoicing in one system. The difference shows when your business grows or other activities are added: you will not need to change systems or bolt on a second one.",
      },
      {
        q: "Does the till work if the restaurant's internet drops?",
        a: "Yes. The Z-ERP local edition keeps taking orders, issuing invoices, and updating stock during the outage, and syncs its data automatically when the connection returns.",
      },
      {
        q: "Does Z-ERP support Saudi e-invoicing for restaurants?",
        a: "Z-ERP issues invoices with tax fields and QR codes with VAT calculated inside them, and provides businesses operating in Saudi Arabia with an e-invoicing submission service to ZATCA. We advise every business to verify the authority's current requirements for its activity before relying on any system for its filings.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const erpVsExcel: Sector = {
  slug: "erp-vs-excel",
  path: "/erp-vs-excel",
  related: ["offline-pos", "pos-security"],
  ar: {
    cardTitle: "إكسل أم برنامج محاسبة وكاشير؟",
    h1: "إكسل أم برنامج محاسبة وكاشير؟",
    lead: "إكسل والدفاتر بداية مجانية ومألوفة، وتناسب محلًا واحدًا صغيرًا بحركات قليلة وشخص واحد يدير كل شيء. لكن حين تتعدد الأصناف أو يزيد عدد الكاشيرين أو يُفتح فرع ثانٍ، تتحول الجداول إلى مصدر أخطاء وتسريب ووقت ضائع. برنامج كاشير ومحاسبة مثل Z-ERP يحدّث المخزون مع كل فاتورة، ويضبط صلاحيات كل كاشير بسجل تدقيق، ويربط الفروع والمخازن في صورة واحدة — فاسأل نفسك: هل ما زال نشاطك في مرحلة الجداول، أم تجاوزها؟",
    pains: [
      {
        icon: NotebookPen,
        title: "المخزون لا يتحدث إلا بيدك",
        text: "في الجداول، كل عملية بيع يجب أن تُخصم يدويًا من الرصيد؛ وأي تأخير أو نسيان أو خطأ إدخال يعني أن رصيدك على الشاشة لا يطابق رصيدك على الرف.",
      },
      {
        icon: Users,
        title: "أكثر من يد على الملف نفسه",
        text: "حين يحرر أكثر من موظف جدولًا واحدًا — أو نسخًا متفرقة منه — تتضارب الأرقام، ولا تعود متأكدًا أي نسخة هي الحقيقة، وتضيع ساعات في المطابقة.",
      },
      {
        icon: Eye,
        title: "لا صلاحيات ولا أثر لمن غيّر",
        text: "من يفتح ملف إكسل يستطيع تغيير سعر أو حذف عملية دون ترك أي أثر يخبرك من فعل ماذا ومتى؛ فالتلاعب والحذف الخاطئ كلاهما يمر بصمت.",
      },
      {
        icon: Split,
        title: "فرع ثانٍ يعني فوضى مضاعفة",
        text: "مع كل فرع أو مخزن جديد تتكاثر الملفات وتتعقد المطابقة بينها، ولا تتجمع صورة نشاطك كاملة إلا بجهد يدوي متكرر في نهاية كل فترة.",
      },
    ],
    features: [
      {
        icon: RefreshCw,
        title: "مخزون يتحدث مع كل فاتورة",
        text: "في Z-ERP تُخصم الكمية من المخزون لحظة إصدار فاتورة البيع نفسها، فالرصيد الذي تراه رصيد فعلي الآن، لا رقم تنوي تحديثه لاحقًا.",
      },
      {
        icon: ShieldCheck,
        title: "صلاحيات وسجل تدقيق لا تعرفهما الجداول",
        text: "لكل كاشير صلاحياته المحددة، وكل إلغاء أو خصم أو تعديل سعر أو فتح لدرج النقدية موثق في سجل تدقيق باسم من نفذه ووقته.",
      },
      {
        icon: Network,
        title: "فروع ومخازن في صورة واحدة",
        text: "أرصدة موحدة لحظيًا عبر الفروع والمخازن في النسخة السحابية، وتحويلات موثقة بينها، بدل ملفات منفصلة لكل موقع تنتظر من يجمعها.",
      },
      {
        icon: BellRing,
        title: "تنبيهات قبل نفاد الأصناف",
        text: "حدود إعادة طلب وتنبيهات مخزون تخبرك باقتراب نفاد صنف قبل أن تكتشفه من عميل يقف عند الكاشير ولا يجد ما جاء لأجله.",
      },
      {
        icon: ReceiptText,
        title: "فواتير ضريبية ومحاسبة من البيع نفسه",
        text: "فواتير بالحقول الضريبية ورمز QR وحساب لضريبة القيمة المضافة، وحركات محاسبية تتولد من عملية البيع مباشرة دون إعادة إدخال في دفتر آخر.",
      },
      {
        icon: CloudOff,
        title: "عمل كامل حتى بلا إنترنت",
        text: "النسخة المحلية من Z-ERP تستمر في البيع والفوترة وتحديث المخزون أثناء انقطاع الإنترنت وتزامن عند عودته، فلا يتوقف نشاطك على جودة الاتصال.",
      },
    ],
    steps: [
      {
        title: "ابدأ التجربة المجانية",
        text: "سجل في التجربة المجانية وأنشئ نشاطك وفرعك الأول، وتعرّف على النظام ببياناتك الحقيقية.",
      },
      {
        title: "انقل أصنافك مرة واحدة",
        text: "أدخل أصنافك وأسعارها وأرصدة مخزونك الافتتاحية مرة واحدة عند الإعداد، ووصّل أجهزة الكاشير القياسية، وحدّد صلاحيات الكاشيرين.",
      },
      {
        title: "بِع ودَع التحديث يحدث وحده",
        text: "من أول فاتورة يتحدث المخزون والحسابات تلقائيًا مع كل حركة، وتنتهي المطابقات اليدوية اليومية.",
      },
    ],
    faqs: [
      {
        q: "متى يكون إكسل كافيًا لإدارة محل؟",
        a: "يكون كافيًا غالبًا في أضيق الحدود: فرع واحد صغير، أصناف قليلة، حركات يومية محدودة، وشخص واحد يدير البيع والمخزون بنفسه. الجداول مجانية ومألوفة، ولا عيب في البدء بها؛ العيب أن تبقى أداتك بعد أن يكبر النشاط وتتعدد الأيدي والفروع.",
      },
      {
        q: "ما العلامات أن نشاطي تجاوز مرحلة الجداول؟",
        a: "أشهرها: أرصدة مخزون لا تطابق الواقع مهما راجعت، ووقت متزايد يضيع في المطابقة والتصحيح، وأكثر من كاشير يعمل على نفس البيانات، وخصومات أو إلغاءات لا تستطيع تتبع صاحبها، والتفكير في فرع ثانٍ. ظهور علامتين منها يعني أن تكلفة الجداول الخفية صارت أعلى من تكلفة نظام.",
      },
      {
        q: "كيف أنتقل من إكسل إلى Z-ERP؟",
        a: "الانتقال يبدأ عند الإعداد بإدخال أصنافك وأسعارك وأرصدة مخزونك الافتتاحية مرة واحدة، وتعريف الكاشيرين وصلاحياتهم، وتوصيل أجهزة الكاشير القياسية. وبعدها يتولى النظام التحديث التلقائي مع كل عملية بيع، ويمكنك بدء تجربة مجانية لتقييم الانتقال ببياناتك قبل الالتزام.",
      },
      {
        q: "هل أستطيع ضبط تلاعب الكاشير في إكسل؟",
        a: "عمليًا لا: أي شخص يصل إلى الملف يستطيع التعديل أو الحذف دون أثر. أما في Z-ERP فالصورة معكوسة: لكل كاشير صلاحيات محددة على الإلغاء والخصم وتعديل الأسعار وفتح درج النقدية، وكل عملية استثنائية موثقة في سجل تدقيق باسم من نفذها ووقتها.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "Excel vs POS & accounting software",
    h1: "Excel or POS & Accounting Software?",
    lead: "Spreadsheets and notebooks are a free, familiar start, and they suit a single small shop with few movements and one person running everything. But once items multiply, cashiers increase, or a second branch opens, spreadsheets become a source of errors, leakage, and lost time. A POS and accounting system like Z-ERP updates stock with every invoice, governs each cashier with permissions and an audit log, and joins branches and warehouses into one picture — so ask yourself: is your business still at the spreadsheet stage, or has it outgrown it?",
    pains: [
      {
        icon: NotebookPen,
        title: "Stock only updates by your own hand",
        text: "In spreadsheets, every sale must be deducted from the balance manually; any delay, oversight, or entry error means the balance on your screen no longer matches the balance on your shelf.",
      },
      {
        icon: Users,
        title: "More than one hand on the same file",
        text: "When several employees edit one sheet — or scattered copies of it — the numbers conflict, you can no longer be sure which version is the truth, and hours are lost reconciling.",
      },
      {
        icon: Eye,
        title: "No permissions, no trace of who changed what",
        text: "Anyone who opens an Excel file can change a price or delete a movement without leaving any trace of who did what, or when; manipulation and mistaken deletion both pass in silence.",
      },
      {
        icon: Split,
        title: "A second branch doubles the chaos",
        text: "With every new branch or warehouse, the files multiply and the reconciliation between them grows harder, and the full picture of your business only comes together through repeated manual effort at each period's end.",
      },
    ],
    features: [
      {
        icon: RefreshCw,
        title: "Stock that updates with every invoice",
        text: "In Z-ERP, the quantity is deducted from stock at the moment the sales invoice itself is issued — the balance you see is the actual balance now, not a number you intend to update later.",
      },
      {
        icon: ShieldCheck,
        title: "Permissions and an audit log spreadsheets cannot offer",
        text: "Each cashier has defined permissions, and every void, discount, price edit, or cash-drawer opening is recorded in an audit log with who performed it and when.",
      },
      {
        icon: Network,
        title: "Branches and warehouses in one picture",
        text: "Real-time unified balances across branches and warehouses in the cloud edition, with documented transfers between them — instead of a separate file per location waiting for someone to merge them.",
      },
      {
        icon: BellRing,
        title: "Alerts before items run out",
        text: "Reorder thresholds and stock alerts tell you an item is about to run out before you discover it from a customer standing at the till who cannot find what they came for.",
      },
      {
        icon: ReceiptText,
        title: "Tax invoices and accounting from the sale itself",
        text: "Invoices with tax fields and QR codes and VAT calculated inside them, and accounting movements generated directly from the sale — no re-entry into a separate ledger.",
      },
      {
        icon: CloudOff,
        title: "Full operation even without internet",
        text: "The Z-ERP local edition keeps selling, invoicing, and updating stock during an internet outage and syncs when it returns, so your business does not depend on connection quality.",
      },
    ],
    steps: [
      {
        title: "Start the free trial",
        text: "Sign up for the free trial, create your business and first branch, and get to know the system with your real data.",
      },
      {
        title: "Move your items over — once",
        text: "Enter your items, their prices, and your opening stock balances once at setup, connect your standard till hardware, and set your cashiers' permissions.",
      },
      {
        title: "Sell, and let updating happen by itself",
        text: "From the first invoice, stock and accounts update automatically with every movement, and the daily manual reconciliations end.",
      },
    ],
    faqs: [
      {
        q: "When is Excel enough to run a shop?",
        a: "Usually only within the narrowest limits: one small branch, few items, limited daily movements, and one person who handles selling and stock personally. Spreadsheets are free and familiar, and there is no shame in starting with them; the mistake is keeping them as your tool after the business grows and the hands and branches multiply.",
      },
      {
        q: "What are the signs my business has outgrown spreadsheets?",
        a: "The most common: stock balances that never match reality however much you check, growing time lost to reconciliation and correction, more than one cashier working on the same data, discounts or voids you cannot trace to their owner, and thinking about a second branch. Two of these signs mean the hidden cost of spreadsheets now exceeds the cost of a system.",
      },
      {
        q: "How do I move from Excel to Z-ERP?",
        a: "The move starts at setup: entering your items, prices, and opening stock balances once, defining your cashiers and their permissions, and connecting standard till hardware. After that, the system handles automatic updating with every sale, and you can start a free trial to evaluate the move with your own data before committing.",
      },
      {
        q: "Can I control cashier manipulation in Excel?",
        a: "Practically, no: anyone with access to the file can edit or delete without a trace. In Z-ERP the picture is reversed: each cashier has defined permissions over voids, discounts, price edits, and cash-drawer openings, and every exceptional action is recorded in an audit log with who performed it and when.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

const bestPosEgypt: Sector = {
  slug: "best-pos-egypt",
  path: "/best-pos-egypt",
  related: ["pos-supermarket", "offline-pos"],
  ar: {
    cardTitle: "أفضل برامج الكاشير في مصر 2026",
    h1: "أفضل برامج الكاشير في مصر 2026: دليل المشتري",
    lead: "لا يوجد برنامج كاشير واحد هو «الأفضل» للجميع؛ الأفضل هو ما يطابق طبيعة نشاطك. خيارات السوق في مصر والخليج تنقسم عمليًا إلى أدوات محاسبة وفوترة سحابية مثل دفترة، ومنصات متخصصة في قطاع واحد مثل فودكس للمطاعم، وبرامج نقاط بيع عالمية عامة، وأنظمة ERP ونقاط بيع متكاملة مثل Z-ERP. هذا الدليل يرتب لك المعايير التي تصنع الفرق فعلًا في 2026 — العمل دون إنترنت، ومخزون الفروع والمخازن، ومكافحة تلاعب الكاشير، والفوترة الضريبية والإلكترونية، وتوافق الأجهزة، والتخصص مقابل الشمول — لتختار بالمعيار لا بالاسم.",
    pains: [
      {
        icon: TriangleAlert,
        title: "الاختيار بالشهرة أو السعر وحده",
        text: "شراء البرنامج الأشهر أو الأرخص دون فحص ملاءمته لنشاطك ينتهي غالبًا باكتشاف فجوة مؤلمة بعد التعاقد — لا يعمل دون إنترنت، أو لا يدير فروعك — ثم تغيير ثانٍ أصعب وأغلى.",
      },
      {
        icon: WifiOff,
        title: "نسيان سؤال: ماذا عند انقطاع الإنترنت؟",
        text: "الاتصال في كثير من المناطق غير مستقر؛ فإذا كان برنامجك سحابيًا خالصًا ولا نسخة محلية له، فكل انقطاع هو كاشير متوقف وبيع ضائع في وقت لا تختاره.",
      },
      {
        icon: Eye,
        title: "إهمال معيار رقابة الكاشير",
        text: "أغلب البرامج تبيع وتفوتر، لكن الفارق الحقيقي فيمن يضبط الإلغاءات والخصومات وتعديلات الأسعار بصلاحيات لكل كاشير ويوثقها في سجل تدقيق — وهو معيار لا يظهر في العروض التسويقية.",
      },
      {
        icon: FileText,
        title: "اكتشاف الفوترة الإلكترونية متأخرًا",
        text: "من يشتري دون التأكد من الفواتير الضريبية برمز QR وحساب الضريبة وخدمات الإرسال للجهات الضريبية يكتشف بعد الشراء أن الفوترة ستصبح عملًا منفصلًا بجانب الكاشير لا جزءًا منه.",
      },
    ],
    features: [
      {
        icon: CloudOff,
        title: "المعيار الأول: العمل دون إنترنت",
        text: "اسأل كل مرشح: هل توجد نسخة محلية تعمل بالكامل أثناء الانقطاع وتزامن عند عودته؟ في Z-ERP هذا سلوك معلن: نسخة محلية تبيع وتفوتر وتحدّث المخزون دون اتصال، إلى جانب نسخة سحابية بمزامنة لحظية.",
      },
      {
        icon: Network,
        title: "المعيار الثاني: الفروع والمخازن",
        text: "إذا كان لديك — أو سيكون لديك — أكثر من فرع أو مخزن، فاطلب أرصدة موحدة لحظيًا وتحويلات موثقة وتنبيهات إعادة طلب. وهذه من قدرات Z-ERP الأساسية المعلنة في وصفه الرسمي.",
      },
      {
        icon: ShieldCheck,
        title: "المعيار الثالث: مكافحة تلاعب الكاشير",
        text: "ابحث عن صلاحيات منفصلة لكل كاشير على الإلغاء والخصم وتعديل الأسعار وفتح درج النقدية، وسجل تدقيق يوثق كل استثناء. في Z-ERP هذه الرقابة جزء من النظام نفسه في النسختين السحابية والمحلية.",
      },
      {
        icon: QrCode,
        title: "المعيار الرابع: الفوترة الضريبية والإلكترونية",
        text: "تأكد أن فواتيرك تصدر بالحقول الضريبية ورمز QR مع حساب ضريبة القيمة المضافة من الكاشير نفسه. يوفر Z-ERP ذلك، مع خدمة إرسال للفوترة الإلكترونية إلى ZATCA للعاملين في السعودية.",
      },
      {
        icon: PlugZap,
        title: "المعيار الخامس: أجهزتك الحالية",
        text: "برنامج يلزمك بأجهزة خاصة يرفع تكلفة البدء؛ والأفضل ما يعمل مع طابعات الإيصالات وماسحات الباركود وأدراج النقدية وشاشات العميل القياسية — كما يعمل Z-ERP — فتبدأ بما تملكه.",
      },
      {
        icon: Users,
        title: "المعيار السادس: التخصص أم الشمول؟",
        text: "أداة محاسبة سحابية مثل دفترة تناسب من يدير حساباته وفواتيره أونلاين، ومنصة متخصصة مثل فودكس تناسب من يريد عمق المطاعم وحده، ونظام متكامل مثل Z-ERP يناسب من يدير كاشير وفروعًا وأنشطة متعددة ويريد العمل دون إنترنت. لا توجد إجابة واحدة؛ توجد إجابة لنشاطك.",
      },
    ],
    steps: [
      {
        title: "اكتب معاييرك قبل الأسماء",
        text: "حدّد احتياجاتك غير القابلة للتفاوض أولًا: استقرار الإنترنت عندك، وعدد الفروع والمخازن، وقطاعات أنشطتك، ومتطلبات فوترتك الضريبية.",
      },
      {
        title: "صفِّ المرشحين بالمعايير لا بالإعلانات",
        text: "مرّر كل مرشح على معاييرك الستة، واسأل عن اليوم الأسوأ: انقطاع الاتصال، وتلاعب كاشير، وافتتاح فرع جديد.",
      },
      {
        title: "جرّب قبل أن تلتزم",
        text: "ابدأ التجربة المجانية للمرشح الأقرب لمعاييرك، واختبره بأصنافك وكاشيرك وأجهزتك الحقيقية قبل أي التزام — وفي Z-ERP التجربة مجانية ومتاحة فورًا.",
      },
    ],
    faqs: [
      {
        q: "ما أفضل برنامج كاشير في مصر عام 2026؟",
        a: "لا توجد إجابة صادقة واحدة للجميع: الأفضل لمن يدير حساباته أونلاين قد يكون أداة محاسبة سحابية مثل دفترة، ولمن يريد تخصص المطاعم منصة مثل فودكس، ولمن يدير محلات وفروعًا ومخازن بأنشطة متعددة ويحتاج العمل دون إنترنت نظام متكامل مثل Z-ERP. قيّم بالمعايير: العمل دون إنترنت، ومخزون الفروع، ورقابة الكاشير، والفوترة الضريبية، والأجهزة، والدعم — واختر ما يطابق نشاطك.",
      },
      {
        q: "هل أحتاج فعلًا برنامجًا يعمل دون إنترنت؟",
        a: "إذا كان اتصال الإنترنت في موقعك غير مستقر، أو كان توقف الكاشير ولو لنصف ساعة يعني خسارة بيع حقيقية، فنعم: ابحث عن نسخة محلية تعمل بالكامل أثناء الانقطاع وتزامن عند عودته، كما في Z-ERP. أما إذا كان اتصالك مستقرًا تمامًا ونشاطك إداريًا أونلاين، فقد تكفيك أداة سحابية.",
      },
      {
        q: "ما الفرق بين أدوات المحاسبة السحابية وأنظمة الكاشير المتكاملة والمنصات المتخصصة؟",
        a: "أدوات المحاسبة السحابية (مثل دفترة) تجعل المحاسبة والفوترة عبر الإنترنت مركزها. والمنصات المتخصصة (مثل فودكس) تركز بعمق على قطاع واحد كالمطاعم. وأنظمة ERP ونقاط البيع المتكاملة (مثل Z-ERP) تجمع الكاشير والمخزون متعدد الفروع والمحاسبة في نظام واحد يخدم قطاعات متعددة، وغالبًا ما توفر نسخًا محلية للعمل دون إنترنت. فالفرق في المركز والنطاق، لا في «الأفضلية» المطلقة.",
      },
      {
        q: "هل يدعم Z-ERP الفواتير الضريبية والفوترة الإلكترونية؟",
        a: "يصدر Z-ERP فواتير بالحقول الضريبية ورمز QR مع حساب ضريبة القيمة المضافة داخل الفاتورة، ويوفر للمنشآت العاملة في السعودية خدمة إرسال للفوترة الإلكترونية إلى ZATCA. وننصح كل منشأة بالتحقق من متطلبات الجهة الضريبية الحالية الخاصة بنشاطها وبلدها قبل الاعتماد على أي نظام في إقراراتها.",
      },
      {
        q: "كم تبلغ تكلفة الاشتراك؟",
        a: "توجد خطط اشتراك وترخيص مختلفة حسب حجم النشاط وعدد الفروع، وجميعها موضحة بالتفصيل في صفحة نظام Z-ERP على موقعنا. ويمكنك بدء تجربة مجانية لتقييم النظام قبل أي التزام.",
      },
    ],
  },
  en: {
    cardTitle: "Best POS software in Egypt 2026",
    h1: "Best POS Software in Egypt 2026: A Buyer's Guide",
    lead: "There is no single 'best' POS software for everyone; the best is the one that matches your kind of business. The options in Egypt and the Gulf fall into practical categories: cloud accounting and invoicing tools such as Daftra, platforms specialised in one sector such as Foodics for restaurants, general international point-of-sale programs, and integrated ERP and POS systems such as Z-ERP. This guide lays out the criteria that actually make the difference in 2026 — working without internet, branch and warehouse stock, protection against cashier manipulation, tax and electronic invoicing, hardware compatibility, and specialisation versus breadth — so you choose by criteria, not by name.",
    pains: [
      {
        icon: TriangleAlert,
        title: "Choosing by fame or price alone",
        text: "Buying the most famous or the cheapest program without checking its fit for your business usually ends with a painful discovery after signing — it does not work offline, or it cannot run your branches — followed by a second, harder and costlier switch.",
      },
      {
        icon: WifiOff,
        title: "Forgetting to ask: what happens when the internet drops?",
        text: "Connectivity in many areas is unstable; if your software is purely cloud with no local edition, every outage is a stopped till and lost sales at a moment you do not choose.",
      },
      {
        icon: Eye,
        title: "Overlooking the cashier-control criterion",
        text: "Most programs sell and invoice, but the real difference lies in who governs voids, discounts, and price edits with per-cashier permissions and records them in an audit log — a criterion that never appears in marketing demos.",
      },
      {
        icon: FileText,
        title: "Discovering e-invoicing too late",
        text: "Whoever buys without confirming tax invoices with QR codes, VAT calculation, and submission services to the tax authorities discovers after purchase that invoicing becomes separate work alongside the till instead of part of it.",
      },
    ],
    features: [
      {
        icon: CloudOff,
        title: "Criterion 1: working without internet",
        text: "Ask every candidate: is there a local edition that works fully during an outage and syncs when the connection returns? In Z-ERP this is a stated behaviour: a local edition that sells, invoices, and updates stock with no connection, alongside a cloud edition with real-time sync.",
      },
      {
        icon: Network,
        title: "Criterion 2: branches and warehouses",
        text: "If you have — or will have — more than one branch or warehouse, require unified real-time balances, documented transfers, and reorder alerts. These are among Z-ERP's core stated capabilities in its official description.",
      },
      {
        icon: ShieldCheck,
        title: "Criterion 3: protection against cashier manipulation",
        text: "Look for separate permissions per cashier over voids, discounts, price edits, and cash-drawer openings, plus an audit log documenting every exception. In Z-ERP this control is part of the system itself in both the cloud and local editions.",
      },
      {
        icon: QrCode,
        title: "Criterion 4: tax and electronic invoicing",
        text: "Make sure your invoices are issued with tax fields and QR codes and VAT calculated, from the till itself. Z-ERP provides that, with an e-invoicing submission service to ZATCA for businesses operating in Saudi Arabia.",
      },
      {
        icon: PlugZap,
        title: "Criterion 5: the hardware you already own",
        text: "Software that forces proprietary hardware raises your starting cost; the better choice works with standard receipt printers, barcode scanners, cash drawers, and customer displays — as Z-ERP does — so you start with what you have.",
      },
      {
        icon: Users,
        title: "Criterion 6: specialisation or breadth?",
        text: "A cloud accounting tool such as Daftra suits owners who run their accounts and invoices online; a specialised platform such as Foodics suits those who want restaurant depth alone; an integrated system such as Z-ERP suits those who run a till, branches, and several activities and want to work without internet. There is no single answer — there is an answer for your business.",
      },
    ],
    steps: [
      {
        title: "Write your criteria before the names",
        text: "Define your non-negotiables first: your connection's stability, your branch and warehouse count, the sectors your activities span, and your tax invoicing requirements.",
      },
      {
        title: "Filter candidates by criteria, not ads",
        text: "Run every candidate through your six criteria, and ask about the worst day: a connection outage, a manipulating cashier, and opening a new branch.",
      },
      {
        title: "Try before you commit",
        text: "Start the free trial of the candidate closest to your criteria and test it with your real items, cashiers, and hardware before any commitment — with Z-ERP the trial is free and available immediately.",
      },
    ],
    faqs: [
      {
        q: "What is the best POS software in Egypt in 2026?",
        a: "There is no one honest answer for everyone: the best for an owner running accounts online may be a cloud accounting tool such as Daftra; for someone wanting restaurant specialisation, a platform such as Foodics; and for someone running stores, branches, and warehouses across several activities who needs to work without internet, an integrated system such as Z-ERP. Judge by criteria — offline work, branch stock, cashier control, tax invoicing, hardware, and support — and choose what matches your business.",
      },
      {
        q: "Do I really need software that works without internet?",
        a: "If the internet connection at your location is unstable, or if a till stoppage of even half an hour means real lost sales, then yes: look for a local edition that works fully during outages and syncs when the connection returns, as in Z-ERP. If your connection is completely stable and your work is administrative and online, a cloud tool may be enough.",
      },
      {
        q: "What is the difference between cloud accounting tools, integrated POS systems, and specialised platforms?",
        a: "Cloud accounting tools (such as Daftra) centre on accounting and invoicing handled over the internet. Specialised platforms (such as Foodics) focus deeply on one sector, such as restaurants. Integrated ERP and point-of-sale systems (such as Z-ERP) combine the till, multi-branch inventory, and accounting in one system serving several sectors, and often offer local editions for working without internet. The difference is in centre and scope, not in absolute 'betterness'.",
      },
      {
        q: "Does Z-ERP support tax invoices and e-invoicing?",
        a: "Z-ERP issues invoices with tax fields and QR codes with VAT calculated inside the invoice, and provides businesses operating in Saudi Arabia with an e-invoicing submission service to ZATCA. We advise every business to verify its tax authority's current requirements for its own activity and country before relying on any system for its filings.",
      },
      {
        q: "How much does it cost?",
        a: "Subscription and licence plans vary with business size and branch count, and all of them are listed in detail on the Z-ERP system page on our website. You can start a free trial to evaluate the system before committing.",
      },
    ],
  },
};

export const SECTORS: Record<SectorSlug, Sector> = {
  "pos-supermarket": supermarket,
  "pos-restaurants": restaurants,
  "offline-pos": offlinePos,
  "pos-fashion": fashion,
  "pos-pharmacy": pharmacy,
  "pos-auto-parts": autoParts,
  "pos-electronics": electronics,
  "inventory-management": inventoryManagement,
  "zatca-invoicing": zatcaInvoicing,
  "pos-security": posSecurity,
  "alternative-daftra": daftraAlternative,
  "alternative-foodics": foodicsAlternative,
  "erp-vs-excel": erpVsExcel,
  "best-pos-egypt": bestPosEgypt,
};

export const SECTOR_LIST: Sector[] = [
  supermarket,
  restaurants,
  offlinePos,
  fashion,
  pharmacy,
  autoParts,
  electronics,
  inventoryManagement,
  zatcaInvoicing,
  posSecurity,
  daftraAlternative,
  foodicsAlternative,
  erpVsExcel,
  bestPosEgypt,
];
