/**
 * Content model for the Z-ERP blog (answer articles for shop owners).
 *
 * Every product claim in this file traces to the published product
 * facts in public/llms.txt: multi-branch ERP + POS, a cloud edition
 * and a local edition that works fully offline (an offline queue that
 * keeps issuing invoices during outages and syncs when the connection
 * returns), per-cashier permissions with a tamper-evident audit log,
 * multi-warehouse inventory with transfers, stock alerts and reorder
 * thresholds, tax invoices with QR codes and VAT calculation, a ZATCA
 * e-invoicing submission service for Saudi Arabia, and standard POS
 * hardware. No statistics, customer counts, testimonials, ratings, or
 * prices — for Z-ERP or anyone else — are stated here; Z-ERP pricing
 * lives only on the /erp page. Market-level statements in the pricing
 * article are general buying knowledge, phrased generically and never
 * attributed to a named competitor.
 */

export type ArticleSlug = "pos-software-prices-egypt" | "offline-pos-guide";

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface ArticleRelatedLink {
  path: string;
  title: string;
}

export interface ArticleContent {
  title: string;
  /** One-to-two sentence direct answer to the article's question. */
  excerpt: string;
  readingMinutes: number;
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  relatedLinks: ArticleRelatedLink[];
}

export interface Article {
  slug: ArticleSlug;
  path: string;
  publishedDate: string;
  ar: ArticleContent;
  en: ArticleContent;
}

const pricesEgypt: Article = {
  slug: "pos-software-prices-egypt",
  path: "/blog/pos-software-prices-egypt",
  publishedDate: "2026-11-03",
  ar: {
    title: "كم سعر برنامج الكاشير في مصر؟ دليل المشتري 2026",
    excerpt:
      "لا يوجد سعر واحد لبرنامج الكاشير في مصر: السعر يتحدد بعدد الفروع والأجهزة وطريقة الترخيص — اشتراك سحابي دوري أو ترخيص محلي لمرة واحدة — وتضاف إليه الأجهزة والفوترة الإلكترونية والتدريب والدعم. قبل أن تقارن أي عرضين، قارنهما بندًا ببند واسأل عن التكاليف التي لا تظهر في الرقم الأول.",
    readingMinutes: 6,
    sections: [
      {
        heading: "ما الذي يحدد سعر برنامج الكاشير فعلًا؟",
        paragraphs: [
          "حين تطلب سعر برنامج كاشير، فأنت لا تشتري «برنامجًا» واحدًا بسعر ثابت، بل حزمة: ترخيص استخدام، وطريقة تشغيل، وأجهزة، وخدمات إعداد وتدريب. لهذا السبب قد يصلك عرضان لنشاط بالحجم نفسه بفارق كبير في الرقم دون أن يكون أحدهما أرخص فعليًا — الفرق غالبًا في ما يشمله كل عرض وما يستبعده.",
          "العناصر التي تحرك السعر صعودًا وهبوطًا متشابهة عند أغلب البائعين، ومعرفتها هي ما يتيح لك مقارنة عادلة:",
        ],
        bullets: [
          "عدد الفروع ونقاط البيع: بعض التراخيص تُحسب لكل فرع أو لكل جهاز كاشير، وأخرى تشمل عددًا محددًا ثم تُحتسب أي إضافة برسوم.",
          "طريقة التشغيل: نسخة سحابية تعمل عبر الإنترنت، أو نسخة محلية تُثبَّت على أجهزة محلك وتعمل دون اتصال.",
          "عدد المستخدمين: بعض التراخيص مرتبطة بعدد المستخدمين أو بعدد الورديات العاملة على النظام.",
          "الوحدات الإضافية: الفوترة الإلكترونية والربط مع مصلحة الضرائب، وإدارة المخزون المتقدمة، والتقارير — قد تكون ضمن الباقة أو إضافات مدفوعة.",
          "الأجهزة: طابعة الإيصالات الحرارية، وماسح الباركود، ودرج النقود، والميزان الإلكتروني، وشاشة العميل — تُباع منفصلة غالبًا أو ضمن باقة تجهيز.",
          "خدمات البداية: نقل بيانات الأصناف والأرصدة من نظامك القديم، والتدريب، والإعداد الأولي.",
        ],
      },
      {
        heading: "نموذجا التسعير: الاشتراك السحابي والترخيص المحلي",
        paragraphs: [
          "النموذج الأول هو الاشتراك السحابي: تدفع مبلغًا دوريًا — شهريًا أو سنويًا — مقابل استخدام النظام على خوادم البائع، وتشمل الدفعة عادةً التحديثات والنسخ الاحتياطي والدعم طوال فترة الاشتراك. ميزته أن البداية خفيفة على التدفق النقدي وأنك تعمل دائمًا على أحدث نسخة، وشرطه العملي أن يكون اتصالك بالإنترنت موثوقًا، لأن البيع نفسه في الأنظمة السحابية الخالصة يعتمد على الاتصال.",
          "النموذج الثاني هو الترخيص المحلي: تدفع مبلغًا أكبر لمرة واحدة مقابل ترخيص يعمل على أجهزتك داخل المحل، وقد تستمر بعده رسوم سنوية للدعم والتحديثات حسب سياسة البائع. ميزته أن البيع لا يتوقف على الإنترنت، وأن التكلفة المتراكمة عبر السنوات قد تكون أقل من اشتراكات متتالية. واسأل دائمًا عما إذا كانت تحديثات متطلبات الفوترة الإلكترونية والضرائب مشمولة أم مدفوعة منفصلة.",
        ],
      },
      {
        heading: "تكاليف خفية اسأل عنها قبل أن تدفع",
        paragraphs: [
          "الرقم الأول في العرض نادرًا ما يكون التكلفة الكاملة. هذه هي البنود التي تفاجئ المشترين بعد التعاقد، واسأل عنها كتابةً قبل التوقيع:",
        ],
        bullets: [
          "سعر التجديد: هل يتجدد الاشتراك بنفس السعر أم بسعر قابل للزيادة؟ وبأي نسبة إن وُجدت؟",
          "تكلفة النمو: كم ستدفع عند إضافة فرع جديد، أو جهاز كاشير ثانٍ، أو مستخدمين إضافيين؟",
          "نقل البيانات: هل ترحيل أصنافك وأرصدتك الافتتاحية من نظامك أو جداولك الحالية مشمول أم برسوم؟",
          "التدريب الإضافي: تدريب موظفين جدد أو وردية ثانية بعد التدريب الأولي.",
          "حدود الدعم: قنوات الدعم الفني وساعاته، وهل الزيارات الميدانية مدفوعة؟",
          "تحديثات الامتثال: تحديثات الفاتورة الإلكترونية ومتطلبات الضرائب عند تغيّرها.",
          "إنهاء التعاقد: كيف تستخرج بياناتك إذا قررت الانتقال إلى نظام آخر؟ وهل توجد رسوم على ذلك؟",
        ],
      },
      {
        heading: "كيف تقارن عرضين بإنصاف؟ قائمة الفحص",
        paragraphs: [
          "المقارنة العادلة لا تكون بين رقمين، بل بين نطاقين متطابقين. وحّد أولًا ما تطلبه من الطرفين — نفس عدد الفروع والأجهزة والمستخدمين والوحدات — ثم طبّق هذه القائمة:",
        ],
        bullets: [
          "اطلب عرضًا مكتوبًا مفصّلًا بندًا ببند، لا رقمًا إجماليًا عبر الهاتف.",
          "احسب تكلفة ثلاث سنوات كاملة: الرسوم الدورية والتجديدات والإضافات المتوقعة، لا تكلفة السنة الأولى فقط.",
          "جرّب النسخة التجريبية بنفسك على عمليات حقيقية من يومك: بيع، وخصم، وفتح درج، وإغلاق وردية.",
          "افصل الإنترنت أثناء التجربة إن أمكن، واسأل: هل يستمر البيع أم يتوقف؟",
          "اقرأ سياسة الاسترداد والإلغاء قبل الدفع، لا بعده.",
          "اسأل عن دقة البيانات التي ستحصل عليها: هل يتحدث مخزونك مع كل فاتورة، أم ستراجع الأرصدة يدويًا؟",
        ],
      },
      {
        heading: "أين تجد سعر Z-ERP؟",
        paragraphs: [
          "لن تجد في هذا المقال أرقامًا تقريبية لأي نظام — بما فيه نظامنا — لأن رقمًا لا يرتبط بنطاق نشاطك سيضللك أكثر مما يفيدك. أسعار Z-ERP وخطط الاشتراك والترخيص منشورة ومحدَّثة على صفحة النظام، وتشمل نمطي التشغيل: النسخة السحابية، والنسخة المحلية التي تعمل بالكامل دون إنترنت وتزامن بياناتها عند عودة الاتصال. ابدأ من هناك لمقارنة الرقم بنطاقك الفعلي، أو جرّب النظام مجانًا على بياناتك قبل أي التزام.",
        ],
      },
    ],
    faqs: [
      {
        q: "لماذا لا يوجد سعر ثابت معلن لمعظم برامج الكاشير؟",
        a: "لأن الترخيص يرتبط بنطاق الاستخدام: عدد الفروع والأجهزة والمستخدمين والوحدات المطلوبة. محل واحد بجهاز كاشير واحد لا يمكن أن يُسعَّر كنظام لسلسلة فروع ومخازن، ولذلك يطلب البائعون تفاصيل نشاطك قبل إعطاء رقم دقيق — وهذا طبيعي ومقبول، بشرط أن يكون العرض النهائي مكتوبًا ومفصّلًا بندًا ببند.",
      },
      {
        q: "هل الأرخص هو الأوفر دائمًا؟",
        a: "ليس بالضرورة. قارن تكلفة ثلاث سنوات شاملة التجديدات والإضافات والدعم، وأضف إليها تكلفة توقف البيع عند انقطاع الإنترنت إن كان النظام سحابيًا خالصًا وكان نشاطك لا يحتمل التوقف. أحيانًا يكون العرض الأعلى في سنته الأولى هو الأقل تكلفة بمرور الوقت.",
      },
      {
        q: "الاشتراك الدوري أم الدفع مرة واحدة: أيهما أنسب لي؟",
        a: "الاشتراك أنسب غالبًا لمن يريد بداية خفيفة على التدفق النقدي وتحديثات ودعمًا مستمرين دون إدارة تقنية من جانبه. والترخيص المحلي لمرة واحدة أنسب لمن يريد استقلالًا عن الإنترنت وتكلفة أقل على المدى الطويل. القرار العملي يعتمد على تدفقك النقدي وموثوقية اتصالك وعدد فروعك.",
      },
      {
        q: "هل سعر البرنامج يشمل الأجهزة؟",
        a: "في معظم العروض تُباع الأجهزة — الطابعة والماسح ودرج النقود — منفصلة عن ترخيص البرنامج، أو تُقدَّم ضمن باقة تجهيز اختيارية. اسأل صراحةً عما يشمله العرض بندًا ببند، وتأكد من توافق أجهزتك الحالية مع النظام قبل شراء أجهزة جديدة.",
      },
      {
        q: "كيف أتأكد أن عرض السعر نهائي بلا مفاجآت؟",
        a: "اطلب العرض مكتوبًا ومفصّلًا، واسأل كتابةً عن: سعر التجديد، ورسوم إضافة الفروع والمستخدمين، وتكلفة نقل البيانات والتدريب الإضافي، وسياسة الاسترداد والإلغاء. البائع الواثق من سعره يجيب عن هذه النقاط بوضوح قبل التعاقد، لا بعده.",
      },
    ],
    relatedLinks: [
      { path: "/erp", title: "أسعار وخطط Z-ERP الحية" },
      { path: "/best-pos-egypt", title: "أفضل برامج الكاشير في مصر 2026: دليل المشتري" },
      { path: "/erp-vs-excel", title: "إكسل أم برنامج محاسبة وكاشير؟" },
    ],
  },
  en: {
    title: "How Much Does POS Software Cost in Egypt? A 2026 Buyer's Guide",
    excerpt:
      "There is no single price for POS software in Egypt: the price is set by your number of branches and tills and by the licensing model — a recurring cloud subscription or a one-time local licence — plus hardware, e-invoicing, training, and support. Before comparing any two quotes, compare what each one includes, line by line, and ask about the costs that never appear in the first number.",
    readingMinutes: 6,
    sections: [
      {
        heading: "What actually determines the price of POS software?",
        paragraphs: [
          "When you ask for a POS price, you are not buying one fixed-price 'program'. You are buying a bundle: a usage licence, a way of running it, hardware, and setup and training services. That is why two quotes for a business of the same size can differ widely without either being truly cheaper — the difference is usually in what each quote includes and what it leaves out.",
          "The elements that move the price up or down are similar across most vendors, and knowing them is what makes a fair comparison possible:",
        ],
        bullets: [
          "Branches and tills: some licences are charged per branch or per POS device; others include a set number, with every addition billed.",
          "How it runs: a cloud edition that works over the internet, or a local edition installed on your shop's own devices that works without a connection.",
          "Users: some licences are tied to the number of users or shifts working on the system.",
          "Add-on modules: e-invoicing and tax-authority integration, advanced inventory, and reporting may be inside the plan or paid extras.",
          "Hardware: the thermal receipt printer, barcode scanner, cash drawer, electronic scale, and customer display are usually sold separately or as an optional equipment bundle.",
          "Getting-started services: migrating your items and opening balances from your old system, training, and initial setup.",
        ],
      },
      {
        heading: "The two pricing models: cloud subscription vs local licence",
        paragraphs: [
          "The first model is the cloud subscription: you pay a recurring fee — monthly or yearly — to use the system on the vendor's servers, and the fee usually covers updates, backups, and support for as long as you subscribe. Its advantage is a light start on cash flow and always running the latest version; its practical condition is a reliable internet connection, because in purely cloud systems the selling itself depends on it.",
          "The second model is the local licence: you pay a larger one-time amount for a licence that runs on your own devices inside the shop, possibly followed by yearly support and update fees depending on the vendor's policy. Its advantage is that selling never depends on the internet, and that the accumulated cost over the years can be lower than stacked subscriptions. Always ask whether updates for e-invoicing and tax requirements are included or charged separately.",
        ],
      },
      {
        heading: "Hidden costs to ask about before you pay",
        paragraphs: [
          "The first number in a quote is rarely the full cost. These are the items that surprise buyers after signing — ask about them in writing before you commit:",
        ],
        bullets: [
          "Renewal price: does the subscription renew at the same price, or can it increase — and by how much?",
          "Cost of growth: what will you pay when you add a new branch, a second till, or extra users?",
          "Data migration: is moving your items and opening balances from your current system or spreadsheets included, or billed?",
          "Extra training: training new staff or a second shift after the initial training.",
          "Support limits: which support channels and hours are included, and are on-site visits charged?",
          "Compliance updates: e-invoicing and tax-requirement updates when the rules change.",
          "Leaving: how do you export your data if you decide to move to another system, and is there a fee?",
        ],
      },
      {
        heading: "How to compare two quotes fairly: the checklist",
        paragraphs: [
          "A fair comparison is not between two numbers but between two identical scopes. First fix what you are asking both vendors for — the same branches, tills, users, and modules — then apply this checklist:",
        ],
        bullets: [
          "Ask for a written quote detailed line by line, not a single total over the phone.",
          "Calculate the full three-year cost: recurring fees, renewals, and expected additions — not just year one.",
          "Run the trial yourself on real operations from your day: a sale, a discount, opening the drawer, closing a shift.",
          "Disconnect the internet during the trial if you can, and ask: does selling continue, or does it stop?",
          "Read the refund and cancellation policy before paying, not after.",
          "Ask what data accuracy you get: does your stock update with every invoice, or will you reconcile balances by hand?",
        ],
      },
      {
        heading: "Where to find Z-ERP's prices",
        paragraphs: [
          "You will not find approximate numbers in this article for any system — including our own — because a number that is not tied to your scope will mislead you more than it helps. Z-ERP's prices, subscription plans, and licence terms are published and kept current on the system page, covering both ways of running it: the cloud edition, and the local edition that works fully offline and syncs when the connection returns. Start there to compare the number against your real scope, or try the system free on your own data before any commitment.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why do most POS systems have no fixed published price?",
        a: "Because the licence follows the scope of use: the number of branches, tills, users, and modules you need. A single shop with one till cannot be priced like a chain of branches and warehouses, so vendors ask about your business before giving an exact number. That is normal and reasonable — as long as the final quote is written and detailed line by line.",
      },
      {
        q: "Is the cheapest quote always the best saving?",
        a: "Not necessarily. Compare the three-year cost including renewals, additions, and support, and add the cost of stopped selling during internet outages if the system is purely cloud-based and your business cannot afford to stop. Sometimes the quote that is higher in year one is the cheaper one over time.",
      },
      {
        q: "Recurring subscription or one-time payment: which suits me?",
        a: "A subscription usually suits owners who want a light start on cash flow, with continuous updates and support and no technical management on their side. A one-time local licence suits owners who want independence from the internet and a lower long-term cost. The practical decision depends on your cash flow, how reliable your connection is, and how many branches you run.",
      },
      {
        q: "Does the software price include the hardware?",
        a: "In most quotes, hardware — the printer, scanner, and cash drawer — is sold separately from the software licence, or offered as an optional equipment bundle. Ask explicitly what the quote includes, line by line, and check that your current devices are compatible with the system before buying new ones.",
      },
      {
        q: "How can I be sure a quote is final, with no surprises?",
        a: "Ask for the quote in writing, itemised, and ask in writing about: the renewal price, fees for adding branches and users, the cost of data migration and extra training, and the refund and cancellation policy. A vendor confident in their price answers these points clearly before you sign, not after.",
      },
    ],
    relatedLinks: [
      { path: "/erp", title: "Z-ERP live pricing and plans" },
      { path: "/best-pos-egypt", title: "Best POS Software in Egypt 2026: A Buyer's Guide" },
      { path: "/erp-vs-excel", title: "Excel vs POS & Accounting Software" },
    ],
  },
};

const offlineGuide: Article = {
  slug: "offline-pos-guide",
  path: "/blog/offline-pos-guide",
  publishedDate: "2026-11-03",
  ar: {
    title: "برنامج كاشير يعمل بدون إنترنت: يعني إيه وإمتى تحتاجه؟",
    excerpt:
      "برنامج الكاشير الذي يعمل دون إنترنت يبيع ويصدر الفواتير ويحدّث المخزون على جهاز المحل نفسه أثناء انقطاع الاتصال، ثم يزامن كل ما سجّله تلقائيًا بمجرد عودة الإنترنت. تحتاجه فعليًا إذا كان توقف البيع غير مقبول في نشاطك: اتصال غير مستقر، أو انقطاعات متكررة، أو أوقات ذروة لا تحتمل الانتظار.",
    readingMinutes: 6,
    sections: [
      {
        heading: "يعني إيه «يعمل بدون إنترنت» فعليًا؟",
        paragraphs: [
          "المقصود ليس أن البرنامج «يتحمّل» الانقطاع بصعوبة، بل أن البيع نفسه لا يحتاج اتصالًا من الأساس: النسخة المحلية من النظام مثبّتة على جهاز الكاشير في محلك، والبيانات محفوظة على الجهاز نفسه، فتتم عملية البيع كاملة كأن شيئًا لم يحدث.",
          "انتبه لفرق يسوّق له أحيانًا بنفس العبارة: نظام محلي يبيع فعلًا أثناء الانقطاع ويصدر الفاتورة ويخصم المخزون، مقابل نظام سحابي يكتفي عند الانقطاع بعرض شاشة انتظار أو حفظ الطلبات دون فاتورة. سؤال واحد يكشف الفرق: «هل أستطيع إتمام بيع وطباعة فاتورته الآن والإنترنت مقطوع؟»",
          "في Z-ERP، تستمر النسخة المحلية أثناء الانقطاع في المهام اليومية الكاملة لنقطة البيع:",
        ],
        bullets: [
          "إصدار فواتير البيع وطباعتها على طابعة الإيصالات كالمعتاد.",
          "خصم الكميات المباعة من مخزون المحل لحظة البيع.",
          "العمل بأجهزة نقطة البيع المعتادة: ماسح الباركود، ودرج النقود، وشاشة العميل.",
          "تطبيق صلاحيات الكاشير نفسها — التحكم في تعديل الأسعار وحذف الفواتير والخصومات وفتح درج النقود — لأن الصلاحيات وسجل التدقيق جزء من النظام نفسه، لا خدمة خارجية تنقطع مع الاتصال.",
        ],
      },
      {
        heading: "ماذا يحدث عندما يعود الإنترنت؟ المزامنة",
        paragraphs: [
          "أثناء الانقطاع تُحفظ كل عملية في طابور محلي على الجهاز — وهو ما تصفه وثائق Z-ERP بطابور يعمل دون اتصال ويستمر في إصدار الفواتير أثناء انقطاعات الإنترنت. بمجرد عودة الاتصال، يزامن النظام هذا الطابور تلقائيًا: تصبح فواتير فترة الانقطاع جزءًا من بياناتك المركزية، وتتحدث أرصدة المخزون، وتظهر مبيعات كل فرع ومخزن في الصورة الموحدة.",
          "عمليًا يعني ذلك: لا إدخال يدوي بعد عودة الخدمة، ولا فواتير ورقية تُرحَّل على عجل في نهاية اليوم، ولا فجوة في تسلسل بياناتك. وما يحتاج اتصالًا بطبيعته — مثل إرسال الفواتير إلى جهات الفوترة الإلكترونية الخارجية — يتم عند عودة الاتصال؛ وتحقق دائمًا من متطلبات جهتك المحلية الحالية قبل الاعتماد على أي نظام في إقراراتك.",
        ],
      },
      {
        heading: "النسخة السحابية والنسخة المحلية: ما الفرق؟",
        paragraphs: [
          "Z-ERP نظام واحد بنمطي تشغيل. النسخة السحابية تعمل عبر الإنترنت وتمنحك تزامنًا لحظيًا لبيانات كل الفروع والمخازن ووصولًا إليها من أي مكان — وهي الأنسب للإدارة والمتابعة المركزية. والنسخة المحلية تُثبَّت داخل المحل وتعمل بالكامل دون إنترنت، وتزامن بياناتها عند توافر الاتصال.",
          "الاختيار بينهما ليس «أفضل وأسوأ»، بل «أنسب ليومك»: إذا كان بيعك لحظيًا واتصالك متقطعًا، فالنسخة المحلية تحمي نقطة البيع. وإذا كان عملك إداريًا بالأساس واتصالك مستقرًا، فقد تكفيك السحابية. والأنشطة متعددة الفروع تجمع غالبًا بين الرغبتين: بيع لا يتوقف داخل الفروع، وصورة مركزية موحدة للإدارة بفضل المزامنة.",
        ],
      },
      {
        heading: "من يحتاج الكاشير الذي يعمل دون إنترنت فعلًا؟",
        paragraphs: [
          "ليست كل الأنشطة بحاجة متساوية. العمل دون إنترنت يتحول من «ميزة لطيفة» إلى ضرورة تشغيلية في حالات مثل:",
        ],
        bullets: [
          "محلات في مناطق اتصالها ضعيف أو يتقطع بانتظام، أو فروع بعيدة عن مراكز الخدمة.",
          "أنشطة لا يتحمل بيعها الانتظار: سوبر ماركت في ساعة الذروة، أو مطعم وكافيه في أوقات الوجبات.",
          "من جرّب فعليًا خسارة مبيعات أو فوضى ترحيل يدوي بسبب انقطاع سابق.",
          "فروع جديدة لم تستقر خدمة الإنترنت فيها بعد، ولا يمكن تأجيل افتتاحها حتى تستقر.",
        ],
      },
      {
        heading: "مخاطر الاعتماد على السحابة وحدها في وقت الذروة",
        paragraphs: [
          "الانقطاعات لا تختار وقتًا مناسبًا. أسوأ سيناريو هو انقطاع في ذروة البيع مع نظام لا يعمل إلا بالاتصال: يتجمد الطابور عند الكاشير، ويلجأ الفريق إلى الورق أو التأجيل، ثم تأتي مرحلة الترحيل اليدوي بما تحمله من أخطاء في الأسعار والكميات، وفروقات في الجرد وإغلاق الوردية.",
          "الخسارة هنا ليست مبيعات اللحظة فقط، بل دقة بيانات اليوم كله. ولهذا تحديدًا صُممت قدرة العمل دون اتصال: أن يمر الانقطاع دون أن تلاحظه نقطة البيع أصلًا، لا أن يتحول إلى أزمة تشغيلية.",
          "وفي المقابل، بصدق: إذا كان نشاطك مكتبيًا بالكامل وبيعك غير لحظي واتصالك مستقرًا بدرجة عالية، فقد لا تكون هذه القدرة أولويتك الأولى — وازنها مقابل احتياجاتك الأخرى مثل التقارير أو عدد الفروع.",
        ],
      },
      {
        heading: "أسئلة اسألها لأي بائع قبل الشراء",
        paragraphs: [
          "أيًا كان النظام الذي تقارنه، هذه الأسئلة تكشف حقيقة قدرته على العمل دون اتصال خلال دقائق:",
        ],
        bullets: [
          "هل يبيع ويصدر فاتورة أثناء الانقطاع، أم يكتفي بتسجيل الطلبات لوقت لاحق؟",
          "هل تُطبع الفاتورة وتُخصم الكمية من المخزون في لحظة البيع نفسها؟",
          "ماذا يحدث للمخزون بعد المزامنة إذا بيع الصنف نفسه من أكثر من نقطة أثناء الانقطاع؟",
          "هل المزامنة تلقائية عند عودة الاتصال، أم تحتاج خطوة يدوية من الكاشير؟",
          "هل تستمر صلاحيات الكاشير وسجل التدقيق في العمل أثناء الانقطاع؟",
          "والأهم: هل أستطيع أن أجرّب بنفسي؟ افصل الإنترنت أثناء الفترة التجريبية، ونفّذ عملية بيع كاملة، ثم أعد الاتصال وراجع النتيجة.",
        ],
      },
    ],
    faqs: [
      {
        q: "هل «يعمل دون إنترنت» يعني أن النظام لا يحتاج إنترنت أبدًا؟",
        a: "للبيع اليومي داخل المحل: نعم، النسخة المحلية تعمل بالكامل دون اتصال. لكن المزامنة بين الفروع والصورة المركزية للإدارة وإرسال الفواتير إلى جهات خارجية تحتاج اتصالًا بطبيعتها، فتتم تلقائيًا عند توافره. الفكرة أن الاتصال يصبح وسيلة للمزامنة، لا شرطًا للبيع.",
      },
      {
        q: "هل الفواتير الصادرة أثناء الانقطاع فواتير ضريبية كاملة؟",
        a: "في Z-ERP يستمر طابور العمل دون اتصال في إصدار الفواتير، وفواتير النظام ضريبية برمز QR مع حساب ضريبة القيمة المضافة. أما إرسال الفواتير إلى جهات الفوترة الإلكترونية — مثل خدمة الإرسال إلى ZATCA في السعودية — فيحتاج اتصالًا ويتم عند عودته؛ تحقق من متطلبات جهتك المحلية الحالية قبل الاعتماد على النظام في إقراراتك.",
      },
      {
        q: "ماذا يحدث إذا بيع الصنف نفسه في فرعين أثناء الانقطاع؟",
        a: "كل فرع يبيع من مخزونه المسجل لديه محليًا، وعند المزامنة تُدمج العمليات في أرصدة النظام الموحدة، فتظهر الصورة النهائية لكل فرع ومخزن. ولتقليل التعارض عمليًا، تساعدك تنبيهات المخزون وحدود إعادة الطلب والتحويلات بين الفروع والمخازن على توزيع الأصناف سريعة الحركة قبل نفادها.",
      },
      {
        q: "هل تظل رقابة الكاشير فعالة أثناء الانقطاع؟",
        a: "نعم: صلاحيات الكاشير — التحكم في تعديل الأسعار وحذف الفواتير والخصومات وفتح درج النقود — وسجل التدقيق المقاوم للعبث جزء من نظام نقطة البيع نفسه، فيستمران مع النسخة المحلية أثناء العمل دون اتصال، وتراجع الإدارة العمليات الاستثنائية كالمعتاد.",
      },
      {
        q: "كيف أتحقق بنفسي قبل الشراء أن العمل دون إنترنت حقيقي؟",
        a: "استخدم الفترة التجريبية: افصل الإنترنت عن جهاز الكاشير، ونفّذ عملية بيع كاملة — مسح باركود، إصدار فاتورة، طباعة، وخصم من المخزون — ثم أعد الاتصال وراجع أن العملية ظهرت في بياناتك المركزية وأن أرصدة مخزونك محدّثة. دقائق من التجربة العملية أصدق من أي وصف تسويقي.",
      },
    ],
    relatedLinks: [
      { path: "/offline-pos", title: "برنامج كاشير يعمل بدون إنترنت من Z-ERP" },
      { path: "/pos-security", title: "حماية الكاشير من السرقة والتلاعب" },
      { path: "/inventory-management", title: "إدارة المخزون متعدد الفروع والمخازن" },
    ],
  },
  en: {
    title: "POS Software That Works Without Internet: What It Means and When You Need It",
    excerpt:
      "A POS that works without internet sells, issues invoices, and updates stock on the shop's own device during an outage, then syncs everything automatically when the connection returns. You genuinely need it if stopping sales is not an option: an unstable connection, frequent outages, or peak hours that cannot wait.",
    readingMinutes: 6,
    sections: [
      {
        heading: "What does 'works without internet' actually mean?",
        paragraphs: [
          "It does not mean the software merely 'survives' an outage. It means selling itself never needed a connection in the first place: the local edition of the system is installed on the till device in your shop, the data lives on that device, and a sale completes exactly as if nothing had happened.",
          "Watch out for a difference that is sometimes marketed with the same phrase: a local system that genuinely sells during an outage — issuing the invoice and deducting stock — versus a cloud system that, when the connection drops, shows a waiting screen or merely holds orders without an invoice. One question exposes the difference: 'Can I complete a sale and print its invoice right now, with the internet cut?'",
          "In Z-ERP, the local edition keeps the full daily work of the point of sale running during an outage:",
        ],
        bullets: [
          "Issuing sales invoices and printing them on the receipt printer as usual.",
          "Deducting sold quantities from the shop's stock at the moment of sale.",
          "Working with standard POS hardware: the barcode scanner, cash drawer, and customer display.",
          "Applying the same cashier permissions — control over price edits, receipt deletions, discounts, and cash-drawer openings — because permissions and the audit log are part of the system itself, not an external service that drops with the connection.",
        ],
      },
      {
        heading: "What happens when the internet returns? Sync",
        paragraphs: [
          "During the outage, every operation is held in a local queue on the device — what Z-ERP's documentation describes as an offline queue that keeps issuing invoices during internet outages. As soon as the connection returns, the system syncs that queue automatically: the outage period's invoices become part of your central data, stock balances update, and every branch and warehouse's sales appear in the unified picture.",
          "In practice that means: no manual re-entry after service returns, no paper invoices keyed in hurriedly at the end of the day, and no gap in the sequence of your records. Anything that inherently needs a connection — such as submitting invoices to external e-invoicing authorities — happens when the connection returns; always verify your local authority's current requirements before relying on any system for filings.",
        ],
      },
      {
        heading: "Cloud edition vs local edition: what is the difference?",
        paragraphs: [
          "Z-ERP is one system with two ways of running it. The cloud edition works over the internet and gives you real-time synchronisation of all branches and warehouses, accessible from anywhere — the natural fit for central management and follow-up. The local edition is installed inside the shop, works fully without internet, and syncs its data when a connection is available.",
          "The choice is not 'better versus worse' but 'right for your day': if your selling is instant and your connection is unreliable, the local edition protects the till. If your work is mainly administrative and your connection is stable, the cloud edition may be enough. Multi-branch businesses usually want both: selling that never stops inside the branches, and one central picture for management through sync.",
        ],
      },
      {
        heading: "Who genuinely needs an offline-capable POS?",
        paragraphs: [
          "Not every business needs it equally. Working without internet turns from a 'nice feature' into an operational necessity in cases like:",
        ],
        bullets: [
          "Shops in areas with weak or frequently interrupted connections, or branches far from service centres.",
          "Businesses whose selling cannot wait: a supermarket at peak hour, or a restaurant or café at mealtimes.",
          "Owners who have already lived through lost sales or manual re-entry chaos because of a previous outage.",
          "New branches where the internet service has not stabilised yet, and whose opening cannot be postponed until it does.",
        ],
      },
      {
        heading: "The risks of relying on cloud alone at peak hour",
        paragraphs: [
          "Outages do not pick convenient times. The worst scenario is an outage at peak selling with a system that only works connected: the queue freezes at the till, the team falls back to paper or postponement, and then comes manual re-entry with its errors in prices and quantities, and discrepancies in stock counts and shift closing.",
          "The loss is not just that moment's sales, but the accuracy of the whole day's data. That is exactly what offline capability is designed for: the outage passes without the point of sale noticing it at all, instead of becoming an operational crisis.",
          "And honestly, in the other direction: if your business is entirely office-based, your selling is not instant, and your connection is highly stable, this capability may not be your first priority — weigh it against your other needs, such as reporting or the number of branches.",
        ],
      },
      {
        heading: "Questions to ask any vendor before you buy",
        paragraphs: [
          "Whichever system you are comparing, these questions reveal the truth about its offline capability within minutes:",
        ],
        bullets: [
          "Does it sell and issue an invoice during an outage, or does it only record orders for later?",
          "Is the invoice printed and the quantity deducted from stock at the very moment of sale?",
          "What happens to stock after sync if the same item was sold from more than one point during the outage?",
          "Is sync automatic when the connection returns, or does it need a manual step from the cashier?",
          "Do cashier permissions and the audit log keep working during an outage?",
          "And most importantly: can I test it myself? Disconnect the internet during the trial, complete a full sale, then reconnect and check the result.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does 'works without internet' mean the system never needs internet at all?",
        a: "For daily selling inside the shop: yes, the local edition runs completely without a connection. But sync between branches, the central management picture, and submitting invoices to external authorities inherently need a connection, so they happen automatically when one is available. The idea is that the connection becomes a means of syncing, not a condition for selling.",
      },
      {
        q: "Are invoices issued during an outage proper tax invoices?",
        a: "In Z-ERP, the offline queue keeps issuing invoices during outages, and the system's invoices are tax invoices with QR codes and VAT calculation. Submitting invoices to e-invoicing authorities — such as the ZATCA submission service in Saudi Arabia — needs a connection and happens when it returns; verify your local authority's current requirements before relying on the system for your filings.",
      },
      {
        q: "What happens if the same item is sold in two branches during an outage?",
        a: "Each branch sells from the stock recorded locally at that branch, and on sync the operations merge into the system's unified balances, so you see the final picture for every branch and warehouse. To reduce conflicts in practice, stock alerts, reorder thresholds, and transfers between branches and warehouses help you distribute fast-moving items before they run out.",
      },
      {
        q: "Does cashier control stay effective during an outage?",
        a: "Yes: cashier permissions — control over price edits, receipt deletions, discounts, and cash-drawer openings — and the tamper-evident audit log are part of the point-of-sale system itself, so they continue with the local edition while working offline, and management reviews exceptional actions as usual.",
      },
      {
        q: "How can I verify before buying that offline work is real?",
        a: "Use the trial period: disconnect the internet from the till device, run a complete sale — scan a barcode, issue an invoice, print it, and deduct from stock — then reconnect and check that the operation appears in your central data and your stock balances are updated. A few minutes of practical testing are worth more than any marketing description.",
      },
    ],
    relatedLinks: [
      { path: "/offline-pos", title: "Offline POS Software by Z-ERP" },
      { path: "/pos-security", title: "Stop Cashier Theft and Manipulation" },
      { path: "/inventory-management", title: "Multi-Branch Inventory Management" },
    ],
  },
};

export const ARTICLES: Record<ArticleSlug, Article> = {
  "pos-software-prices-egypt": pricesEgypt,
  "offline-pos-guide": offlineGuide,
};

export const ARTICLE_LIST: Article[] = [pricesEgypt, offlineGuide];
