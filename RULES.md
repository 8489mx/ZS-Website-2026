# قواعد النظام والتصميم / System & UI Rules

## 1. حظر استخدام أيقونة اللمعان/النجوم (Sparkles Icon Prohibition)
> **قاعدة صارمة ودائمة:**
> **يُمنع منعاً باتاً استخدام أيقونة `Sparkles` أو أي أيقونة لمعان/نجوم رباعية الأطراف في أي صفحة أو مكوّن أو شاشة في النظام كلياً.**

### التفاصيل:
- لا تقم أبداً باستيراد `Sparkles` من `lucide-react` أو أي مكتبة أيقونات أخرى.
- لا تضع الأيقونة في الأزرار (Buttons)، البادجات (Badges)، بطاقات المساعد الذكي، الشريط العلوي، أو المحاكاة (Simulators).
- تم تفعيل فحص آلي في `npm run lint` يرفض بناء المشروع أو اجتياز الفحص عند وجود أي استدعاء لهذه الأيقونة.

---

## Strict Rule: Sparkles Icon is Permanently Forbidden
- **Prohibited Component:** `Sparkles` (from `lucide-react` or any icon set).
- **Scope:** All pages, headers, navigation, badges, hero sections, WhatsApp simulators, and marketing/ERP components.
- **Enforcement:** Enforced via `scripts/enforce-rules.cjs` as part of the automated linting and build checks.
