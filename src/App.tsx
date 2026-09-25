import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExternalRedirect from "./ExternalRedirect";
import { APP_LOGIN_URL, APP_TRIAL_URL } from "./links";
import ScrollToTop from "./ScrollToTop";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import { CurrencyProvider } from "./CurrencyContext";
import LocationModal from "./LocationModal";

// Code-split routes so visitors don't load the entire 170KB+ ErpPage or HomePage unnecessarily on first paint
const HomePage = lazy(() => import("./HomePage"));
const ErpPage = lazy(() => import("./ErpPage"));

// Minimal lightweight fallback during lazy-loading transition
function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <LocationModal />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/erp" element={<ErpPage />} />
                <Route path="/register" element={<ExternalRedirect to={APP_TRIAL_URL} />} />
                <Route path="/login" element={<ExternalRedirect to={APP_LOGIN_URL} />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
