import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full mt-10 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} NutriThali — Healthy meals for modern India</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-emerald-600">Privacy</a>
          <a href="#" className="hover:text-emerald-600">Terms</a>
          <a href="#" className="hover:text-emerald-600">Support</a>
        </div>
      </div>
    </footer>
  );
}
