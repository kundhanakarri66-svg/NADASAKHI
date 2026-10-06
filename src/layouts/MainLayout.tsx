import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar.tsx';
import { Header } from '../components/navigation/Header.tsx';

export const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* WCAG Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-700 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Navigation Sidebar */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main App Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto outline-none"
        >
          <Outlet />
        </main>

        <footer className="py-4 px-6 border-t border-slate-200/80 bg-white/50 text-center sm:text-left sm:flex sm:justify-between items-center text-xs text-slate-500">
          <p>
            NĀDASAKHI – Smart Accessibility Platform · Connecting hearing loss communities to sound & conversation.
          </p>
          <div className="mt-2 sm:mt-0 flex items-center justify-center gap-4">
            <span>WCAG 2.1 AA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>Step 1 Architecture</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
