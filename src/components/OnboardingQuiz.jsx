import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const goals = ['Lose Fat', 'Build Muscle', 'Maintain Weight', 'Manage a Condition', 'Address a Deficiency'];
const diets = ['Vegetarian', 'Non-Vegetarian', 'Vegan'];
const cultures = ['No Restrictions', 'Jain', 'Sattvic'];
const allergies = [
  { key: 'gluten_free', label: 'Gluten-Free' },
  { key: 'lactose_intolerant', label: 'Lactose-Intolerant' },
  { key: 'nuts', label: 'Nuts Allergy' },
  { key: 'seafood', label: 'Seafood Allergy' },
];
const activity = ['Sedentary', 'Light', 'Active'];

export default function OnboardingQuiz({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    goal: '',
    diet: '',
    culture: '',
    allergies: [],
    allergy_other: '',
    activity: '',
  });

  const steps = useMemo(
    () => [
      { key: 'intro', title: 'Welcome', desc: 'Tell us about your goals to craft a hyper-personalized thali for you.' },
      { key: 'name', title: 'Your Name', desc: 'How should we address you?' },
      { key: 'goal', title: 'Primary Goal', desc: 'Pick the goal that best fits you.' },
      { key: 'diet', title: 'Dietary Preference', desc: 'Select your base preference.' },
      { key: 'culture', title: 'Cultural/Religious Needs', desc: 'We respect your choices.' },
      { key: 'allergies', title: 'Allergies', desc: 'Choose any that apply.' },
      { key: 'activity', title: 'Weekly Activity Level', desc: 'Helps us balance your macros.' },
      { key: 'review', title: 'Review', desc: 'Confirm your profile.' },
    ],
    []
  );

  const canNext = useMemo(() => {
    const s = steps[step]?.key;
    if (s === 'intro') return true;
    if (s === 'name') return form.name.trim().length >= 2;
    if (s === 'goal') return !!form.goal;
    if (s === 'diet') return !!form.diet;
    if (s === 'culture') return !!form.culture;
    if (s === 'allergies') return true; // optional
    if (s === 'activity') return !!form.activity;
    if (s === 'review') return true;
    return false;
  }, [form, step, steps]);

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goPrev = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    onComplete?.(form);
  };

  return (
    <section className="w-full max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
          <h2 className="text-lg font-semibold text-gray-900">{steps[step].title}</h2>
          <p className="text-sm text-gray-600">{steps[step].desc}</p>
        </div>

        <div className="p-5 space-y-4">
          {steps[step].key === 'intro' && (
            <div className="text-gray-700">
              <p>Answer a few quick questions. It takes less than a minute.</p>
              <ul className="list-disc pl-5 mt-3 text-sm text-gray-600">
                <li>Respects cultural needs like Jain and Sattvic</li>
                <li>Understands allergies and preferences</li>
                <li>Optimizes macros for your goal</li>
              </ul>
            </div>
          )}

          {steps[step].key === 'name' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Priya Sharma"
              />
            </div>
          )}

          {steps[step].key === 'goal' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => setForm((f) => ({ ...f, goal: g }))}
                  className={`p-3 rounded-lg border text-left transition ${
                    form.goal === g ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{g}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {g === 'Build Muscle' && 'Higher protein, balanced calories'}
                    {g === 'Lose Fat' && 'Satiating, lower calorie density'}
                    {g === 'Maintain Weight' && 'Balanced macros'}
                    {g === 'Manage a Condition' && 'Condition-friendly choices'}
                    {g === 'Address a Deficiency' && 'Micronutrient support'}
                  </div>
                </button>
              ))}
            </div>
          )}

          {steps[step].key === 'diet' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {diets.map((d) => (
                <button
                  key={d}
                  onClick={() => setForm((f) => ({ ...f, diet: d }))}
                  className={`p-3 rounded-lg border transition ${
                    form.diet === d ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{d}</div>
                </button>
              ))}
            </div>
          )}

          {steps[step].key === 'culture' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cultures.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm((f) => ({ ...f, culture: c }))}
                  className={`p-3 rounded-lg border transition ${
                    form.culture === c ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{c}</div>
                </button>
              ))}
            </div>
          )}

          {steps[step].key === 'allergies' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allergies.map((a) => (
                  <label key={a.key} className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={form.allergies.includes(a.key)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm((f) => ({
                          ...f,
                          allergies: checked
                            ? [...f.allergies, a.key]
                            : f.allergies.filter((k) => k !== a.key),
                        }));
                      }}
                    />
                    <span className="text-sm text-gray-800">{a.label}</span>
                  </label>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Other</label>
                <input
                  value={form.allergy_other}
                  onChange={(e) => setForm((f) => ({ ...f, allergy_other: e.target.value }))}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Soy allergy"
                />
              </div>
            </div>
          )}

          {steps[step].key === 'activity' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activity.map((a) => (
                <button
                  key={a}
                  onClick={() => setForm((f) => ({ ...f, activity: a }))}
                  className={`p-3 rounded-lg border transition ${
                    form.activity === a ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{a}</div>
                </button>
              ))}
            </div>
          )}

          {steps[step].key === 'review' && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> <span><span className="font-medium">Name:</span> {form.name}</span></div>
              <div className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> <span><span className="font-medium">Goal:</span> {form.goal}</span></div>
              <div className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> <span><span className="font-medium">Diet:</span> {form.diet}</span></div>
              <div className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> <span><span className="font-medium">Culture:</span> {form.culture}</span></div>
              <div className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> <span><span className="font-medium">Allergies:</span> {form.allergies.length ? form.allergies.join(', ') : 'None'}</span></div>
              {form.allergy_other && (
                <div className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> <span><span className="font-medium">Other:</span> {form.allergy_other}</span></div>
              )}
              <div className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> <span><span className="font-medium">Activity:</span> {form.activity}</span></div>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <button onClick={goPrev} disabled={step === 0} className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-gray-200 text-gray-700 disabled:opacity-50">
            <ChevronLeft size={16} /> Back
          </button>
          {steps[step].key !== 'review' ? (
            <button onClick={goNext} disabled={!canNext} className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-emerald-600 text-white disabled:opacity-50">
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={finish} className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-emerald-600 text-white">
              Finish <Check size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
