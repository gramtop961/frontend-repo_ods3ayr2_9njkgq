import React from 'react';
import { Home, User, Settings, Calendar } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'quiz', label: 'Personalize', icon: User },
  { id: 'dashboard', label: 'Dashboard', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings, disabled: true },
];

export default function HeaderNav({ active = 'home', onChange }) {
  return (
    <header className="w-full sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-emerald-500 flex items-center justify-center text-white font-bold">N</div>
          <span className="font-semibold text-gray-900">NutriThali</span>
        </div>
        <nav className="flex items-center gap-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                disabled={t.disabled}
                onClick={() => !t.disabled && onChange?.(t.id)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                } ${t.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
