import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExternalRedirect from "./ExternalRedirect";
import { APP_LOGIN_URL, APP_TRIAL_URL } from "./links";
import ScrollToTop from "./ScrollToTop";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import { CurrencyProvider } from "./CurrencyContext";
import LocationModal from "./LocationModal";
import ErrorBoundary from "./components/ErrorBoundary";
import useDocumentMeta from "./useDocumentMeta";

// Code-split the pages (the home page included) so the initial
// bundle only carries the app shell and shared providers.
const HomePage = lazy(() => import("./HomePage"));
const ErpPage = lazy(() => import("./ErpPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const RefundPolicyPage = lazy(() => import("./pages/RefundPolicyPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const SectorPage = lazy(() => import("./pages/SectorPage"));
const BlogIndexPage = lazy(() => import("./pages/BlogIndexPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Minimal lightweight fallback during lazy-loading transition
function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
    </div>
  );
}

function RouteMeta() {
  useDocumentMeta();
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <LocationModal />
            <BrowserRouter>
              <RouteMeta />
              <ScrollToTop />
              <Suspense fallback={<PageLoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/erp" element={<ErpPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/refund-policy" element={<RefundPolicyPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/pos-supermarket" element={<SectorPage slug="pos-supermarket" />} />
                  <Route path="/pos-restaurants" element={<SectorPage slug="pos-restaurants" />} />
                  <Route path="/offline-pos" element={<SectorPage slug="offline-pos" />} />
                  <Route path="/pos-fashion" element={<SectorPage slug="pos-fashion" />} />
                  <Route path="/pos-pharmacy" element={<SectorPage slug="pos-pharmacy" />} />
                  <Route path="/pos-auto-parts" element={<SectorPage slug="pos-auto-parts" />} />
                  <Route path="/pos-electronics" element={<SectorPage slug="pos-electronics" />} />
                  <Route path="/inventory-management" element={<SectorPage slug="inventory-management" />} />
                  <Route path="/zatca-invoicing" element={<SectorPage slug="zatca-invoicing" />} />
                  <Route path="/pos-security" element={<SectorPage slug="pos-security" />} />
                  <Route path="/alternative-daftra" element={<SectorPage slug="alternative-daftra" />} />
                  <Route path="/alternative-foodics" element={<SectorPage slug="alternative-foodics" />} />
                  <Route path="/erp-vs-excel" element={<SectorPage slug="erp-vs-excel" />} />
                  <Route path="/best-pos-egypt" element={<SectorPage slug="best-pos-egypt" />} />
                  <Route path="/blog" element={<BlogIndexPage />} />
                  <Route
                    path="/blog/pos-software-prices-egypt"
                    element={<ArticlePage slug="pos-software-prices-egypt" />}
                  />
                  <Route path="/blog/offline-pos-guide" element={<ArticlePage slug="offline-pos-guide" />} />
                  <Route
                    path="/blog/how-to-choose-pos-software"
                    element={<ArticlePage slug="how-to-choose-pos-software" />}
                  />
                  <Route
                    path="/blog/prevent-cashier-theft"
                    element={<ArticlePage slug="prevent-cashier-theft" />}
                  />
                  <Route
                    path="/blog/egypt-e-invoice-guide"
                    element={<ArticlePage slug="egypt-e-invoice-guide" />}
                  />
                  <Route
                    path="/blog/multi-branch-inventory-mistakes"
                    element={<ArticlePage slug="multi-branch-inventory-mistakes" />}
                  />
                  <Route
                    path="/blog/zatca-e-invoice-requirements"
                    element={<ArticlePage slug="zatca-e-invoice-requirements" />}
                  />
                  <Route
                    path="/blog/excel-vs-accounting-software-cost"
                    element={<ArticlePage slug="excel-vs-accounting-software-cost" />}
                  />
                  <Route path="/register" element={<ExternalRedirect to={APP_TRIAL_URL} />} />
                  <Route path="/login" element={<ExternalRedirect to={APP_LOGIN_URL} />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </CurrencyProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
