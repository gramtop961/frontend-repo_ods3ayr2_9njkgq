import React, { useMemo } from 'react';
import { Calendar, Package, Utensils } from 'lucide-react';

// Minimal, local rule-based planner for demo purposes
const baseMeals = [
  { id: 'poha', name: 'Poha', tags: ['Vegetarian'], macros: { cal: 320, p: 8, f: 6, c: 58 } },
  { id: 'dal_makhani', name: 'Dal Makhani', tags: ['Vegetarian', 'High-Protein'], macros: { cal: 420, p: 18, f: 14, c: 56 } },
  { id: 'paneer_tikka', name: 'Paneer Tikka', tags: ['Vegetarian', 'High-Protein'], macros: { cal: 380, p: 28, f: 18, c: 20 } },
  { id: 'rajma_chawal', name: 'Rajma Chawal', tags: ['Vegetarian'], macros: { cal: 520, p: 16, f: 8, c: 90 } },
  { id: 'chicken_curry', name: 'Chicken Curry', tags: ['Non-Vegetarian', 'High-Protein'], macros: { cal: 480, p: 35, f: 20, c: 28 } },
  { id: 'grilled_fish', name: 'Grilled Fish', tags: ['Non-Vegetarian', 'High-Protein', 'Seafood'], macros: { cal: 360, p: 34, f: 12, c: 10 } },
  { id: 'quinoa_salad', name: 'Quinoa Salad', tags: ['Vegan', 'Gluten-Free'], macros: { cal: 300, p: 10, f: 8, c: 48 } },
  { id: 'tofu_stir_fry', name: 'Tofu Stir Fry', tags: ['Vegan', 'High-Protein'], macros: { cal: 350, p: 22, f: 12, c: 30 } },
  { id: 'upma', name: 'Upma', tags: ['Vegetarian'], macros: { cal: 330, p: 9, f: 7, c: 60 } },
];

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const slots = ['Breakfast', 'Lunch', 'Dinner'];

function filterMeals(profile) {
  let meals = [...baseMeals];
  // Hard filters
  if (profile?.diet === 'Vegetarian') {
    meals = meals.filter((m) => m.tags.includes('Vegetarian') || m.tags.includes('Vegan'));
  } else if (profile?.diet === 'Vegan') {
    meals = meals.filter((m) => m.tags.includes('Vegan'));
  }

  // Allergies
  if (profile?.allergies?.includes('seafood')) {
    meals = meals.filter((m) => !m.tags.includes('Seafood'));
  }
  if (profile?.allergies?.includes('gluten_free')) {
    meals = meals.filter((m) => m.tags.includes('Gluten-Free'));
  }
  if (profile?.allergies?.includes('nuts')) {
    meals = meals.filter((m) => !m.tags.includes('Contains Nuts'));
  }

  // Culture restrictions
  if (profile?.culture === 'Jain') {
    meals = meals.filter((m) => !m.tags.includes('Root Veg') && !m.tags.includes('Onion/Garlic'));
  }
  if (profile?.culture === 'Sattvic') {
    meals = meals.filter((m) => !m.tags.includes('Onion/Garlic'));
  }

  // Goal-based prioritization
  const preferHighProtein = profile?.goal === 'Build Muscle';

  const sorted = [...meals].sort((a, b) => {
    if (preferHighProtein) {
      const aHP = a.tags.includes('High-Protein') ? 1 : 0;
      const bHP = b.tags.includes('High-Protein') ? 1 : 0;
      return bHP - aHP;
    }
    return a.macros.cal - b.macros.cal;
  });

  return sorted;
}

function createWeeklyPlan(profile) {
  const meals = filterMeals(profile);
  const plan = {};
  let idx = 0;
  weekdays.forEach((d) => {
    plan[d.toLowerCase()] = {};
    slots.forEach((s) => {
      plan[d.toLowerCase()][s.toLowerCase()] = meals[idx % meals.length];
      idx += 1;
    });
  });
  return plan;
}

export default function DashboardPreview({ profile }) {
  const name = profile?.name || 'Friend';
  const plan = useMemo(() => createWeeklyPlan(profile || {}), [profile]);

  // Simple nutrition rollup for the first day as a demo
  const todayKey = weekdays[new Date().getDay() - 1] || 'Monday';
  const today = plan[todayKey.toLowerCase()];
  const todayTotals = Object.values(today || {}).reduce(
    (acc, m) => {
      if (!m) return acc;
      return {
        cal: acc.cal + m.macros.cal,
        p: acc.p + m.macros.p,
        f: acc.f + m.macros.f,
        c: acc.c + m.macros.c,
      };
    },
    { cal: 0, p: 0, f: 0, c: 0 }
  );

  const goalCalories = profile?.activity === 'Active' ? 2200 : profile?.activity === 'Light' ? 2000 : 1800;
  const goalProtein = profile?.goal === 'Build Muscle' ? 110 : 80;

  const pct = (val, goal) => Math.min(100, Math.round((val / goal) * 100));

  return (
    <section className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Hello, {name}</h2>
                <p className="text-sm text-gray-600">Your AI-Recommended Weekly Plan</p>
              </div>
              <Calendar className="text-emerald-600" />
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {weekdays.map((d) => {
                const day = plan[d.toLowerCase()];
                return (
                  <div key={d} className="border border-gray-100 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-900 mb-2">{d}</div>
                    <ul className="space-y-2 text-sm">
                      {slots.map((s) => (
                        <li key={s} className="flex items-center justify-between">
                          <span className="text-gray-600">{s}</span>
                          <span className="font-medium text-gray-800">{day?.[s.toLowerCase()]?.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-gray-900 font-semibold"><Utensils size={18} className="text-emerald-600" /> Nutrition Summary (Today)</div>
            <div className="mt-3 space-y-3">
              <Progress label={`Calories ${todayTotals.cal} / ${goalCalories} kcal`} value={pct(todayTotals.cal, goalCalories)} color="bg-amber-500" />
              <Progress label={`Protein ${todayTotals.p} / ${goalProtein} g`} value={pct(todayTotals.p, goalProtein)} color="bg-emerald-600" />
              <Progress label={`Fats ${todayTotals.f} g`} value={pct(todayTotals.f, 60)} color="bg-rose-500" />
              <Progress label={`Carbs ${todayTotals.c} g`} value={pct(todayTotals.c, 250)} color="bg-sky-500" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-gray-900 font-semibold"><Package size={18} className="text-emerald-600" /> Today's Delivery</div>
            <div className="mt-3 text-sm text-gray-700">
              <p className="mb-2">Status: <span className="font-medium text-emerald-700">On the way</span></p>
              <ul className="space-y-1">
                <li>Breakfast: {today?.breakfast?.name}</li>
                <li>Lunch: {today?.lunch?.name}</li>
                <li>Dinner: {today?.dinner?.name}</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-5 text-white">
            <div className="text-sm uppercase tracking-wide opacity-90">Wellness</div>
            <div className="mt-1 text-lg font-semibold">Quick self-care picks</div>
            <ul className="mt-3 text-sm space-y-2">
              <li>• No-Equipment Workout (7 mins)</li>
              <li>• 5-Minute Meditation (audio)</li>
              <li>• Benefits of Turmeric (read)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Progress({ label, value, color = 'bg-emerald-600' }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
