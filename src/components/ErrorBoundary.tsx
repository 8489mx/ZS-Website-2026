import React, { useState, useEffect } from "react";

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Global caught error:", event.error);
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center" dir="rtl">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto text-xl font-bold">
            Z
          </div>
          <h2 className="text-xl font-bold text-white">حدث خطأ أثناء تحميل الصفحة</h2>
          <p className="text-sm text-slate-400">
            يرجى إعادة تحديث الصفحة أو العودة إلى الصفحة الرئيسية.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              window.location.href = "/";
            }}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all cursor-pointer"
          >
            إعادة التحميل
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
