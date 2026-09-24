import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErpPage from "./ErpPage";
import HomePage from "./HomePage";
import ExternalRedirect from "./ExternalRedirect";
import { APP_LOGIN_URL, APP_TRIAL_URL } from "./links";
import ScrollToTop from "./ScrollToTop";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import { CurrencyProvider } from "./CurrencyContext";
import LocationModal from "./LocationModal";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <LocationModal />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/erp" element={<ErpPage />} />
              <Route path="/register" element={<ExternalRedirect to={APP_TRIAL_URL} />} />
              <Route path="/login" element={<ExternalRedirect to={APP_LOGIN_URL} />} />
            </Routes>
          </BrowserRouter>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
