import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "PlaceIT Exam Platform",
  description: "Multi-exam mock tests with analytics and leaderboards"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6">
          <header className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
            <h1 className="text-xl font-semibold tracking-tight">
              Place<span className="text-sky-400">IT</span>
            </h1>
            <span className="text-xs text-slate-400">
              Exam practice with analytics
            </span>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}

