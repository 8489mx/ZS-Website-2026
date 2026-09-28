import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExternalRedirect from "./ExternalRedirect";
import { APP_LOGIN_URL, APP_TRIAL_URL } from "./links";
import ScrollToTop from "./ScrollToTop";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import { CurrencyProvider } from "./CurrencyContext";
import LocationModal from "./LocationModal";
import SeoManager from "./components/SeoManager";
import ErrorBoundary from "./components/ErrorBoundary";

// Code-split routes so visitors don't load the entire 170KB+ ErpPage or HomePage unnecessarily on first paint
const HomePage = lazy(() => import("./HomePage"));
const ErpPage = lazy(() => import("./ErpPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const RefundPolicyPage = lazy(() => import("./pages/RefundPolicyPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

// Minimal lightweight fallback during lazy-loading transition
function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <LocationModal />
            <BrowserRouter>
              <SeoManager />
              <ScrollToTop />
              <Suspense fallback={<PageLoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/erp" element={<ErpPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/refund-policy" element={<RefundPolicyPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/register" element={<ExternalRedirect to={APP_TRIAL_URL} />} />
                  <Route path="/login" element={<ExternalRedirect to={APP_LOGIN_URL} />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </CurrencyProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
