import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav.jsx';
import OnboardingQuiz from './components/OnboardingQuiz.jsx';
import DashboardPreview from './components/DashboardPreview.jsx';
import Footer from './components/Footer.jsx';
import { ChevronRight } from 'lucide-react';

export default function App() {
  const [active, setActive] = useState('home');
  const [profile, setProfile] = useState(null);

  const startQuiz = () => setActive('quiz');
  const onQuizComplete = (p) => {
    setProfile(p);
    setActive('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white">
      <HeaderNav active={active} onChange={(id) => setActive(id === 'settings' ? active : id)} />

      <main className="flex-1 w-full">
        {active === 'home' && (
          <section className="max-w-6xl mx-auto px-4 pt-10 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
                  Hyper-personalized healthy meals, delivered.
                </h1>
                <p className="mt-3 text-gray-700">
                  NutriThali crafts meal plans that respect your culture, preferences, and goals — from Jain to Sattvic, vegan to high-protein.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <button onClick={startQuiz} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md shadow hover:bg-emerald-700">
                    Start Personalization <ChevronRight size={18} />
                  </button>
                  <button onClick={() => setActive('dashboard')} className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50">
                    Preview Dashboard
                  </button>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                  <Stat k="4.9/5" v="Avg. rating" />
                  <Stat k="7-day" v="Flexible plan" />
                  <Stat k="AI" v="Smart swaps" />
                </div>
              </div>
              <div>
                <div className="relative rounded-2xl overflow-hidden border border-emerald-100 shadow-sm bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
                    alt="Healthy Indian thali"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-sm">
                    <div className="font-semibold">Chef-crafted, dietitian-approved</div>
                    <div className="opacity-90">Balanced macros. Local flavors.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {active === 'quiz' && (
          <div className="px-4 pt-8 pb-10">
            <OnboardingQuiz onComplete={onQuizComplete} />
          </div>
        )}

        {active === 'dashboard' && (
          <div className="px-4 pt-8 pb-10">
            <DashboardPreview profile={profile || { name: 'Guest', goal: 'Maintain Weight', diet: 'Vegetarian', culture: 'No Restrictions', allergies: [], activity: 'Light' }} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Stat({ k, v }) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 text-center">
      <div className="text-lg font-semibold text-gray-900">{k}</div>
      <div className="text-xs text-gray-600">{v}</div>
    </div>
  );
}
