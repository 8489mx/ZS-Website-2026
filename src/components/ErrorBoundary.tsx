import React from "react";

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends (React.Component as any) {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
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
                this.setState({ hasError: false });
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
    return this.props.children;
  }
}
