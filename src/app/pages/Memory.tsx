import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Clock, Plus, Search, Utensils, Wheat } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSolodko } from '../context/SolodkoContext';
import { getCurrentMealMoment } from '../utils/mealMoment';

const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-2 mb-3 px-2">
    {icon}
    <h3 className="font-sans text-[12px] uppercase tracking-widest font-semibold text-[#8B918C]">{title}</h3>
  </div>
);

const MemoryCard = ({ item, delay, compact = false, onQuickLog }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className={`${compact ? 'p-4 rounded-[22px]' : 'p-5 rounded-[26px]'} bg-gradient-to-br from-white/70 to-white/35 backdrop-blur-md shadow-[0_10px_28px_-12px_rgba(180,140,120,0.18)] border border-white/55 group hover:bg-white/75 hover:-translate-y-0.5 transition-all`}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B918C] mb-1">
          {item.recurrence || item.source}
        </p>
        <h4 className={`font-sans ${compact ? 'text-[15px]' : 'text-[17px]'} font-medium text-[#1F2422] leading-tight`}>
          {item.name}
        </h4>
      </div>
      <div className="text-right shrink-0">
        <div className="font-sans text-[22px] leading-none font-semibold text-[#1F2422]">
          {item.carbs}<span className="text-[13px] font-medium text-[#5F6661] ml-0.5">g</span>
        </div>
      </div>
    </div>

    <div className="mt-3 flex items-end justify-between gap-3">
      <div>
        <p className="font-sans text-[13px] leading-[18px] text-[#5F6661]">{item.weight}</p>
        <p className="font-sans text-[12px] leading-[17px] text-[#8B918C] mt-0.5">
          {item.kind === 'recipe' && item.ingredientCount ? `${item.ingredientCount} ingredients` : item.carbRatio || item.source}
          {item.lastUsed ? ` - Last used ${item.lastUsed.toLowerCase()}` : ''}
        </p>
      </div>
      <button
        onClick={() => onQuickLog(item)}
        className="shrink-0 h-9 px-3 rounded-full bg-white/70 border border-white/60 shadow-[0_6px_16px_-10px_rgba(180,140,120,0.24)] font-sans text-[12px] font-medium text-[#5F6661] hover:bg-white transition-colors flex items-center gap-1.5"
      >
        <Plus size={14} strokeWidth={1.8} />
        {item.kind === 'recipe' ? 'Log portion' : 'Log'}
      </button>
    </div>
  </motion.div>
);

export const Memory = () => {
  const navigate = useNavigate();
  const { memory, quickLogMemory } = useSolodko();
  const mealMoment = getCurrentMealMoment();

  const usuallyAroundNow = memory
    .filter(item => item.mealMoment === mealMoment || item.recurrence === 'Usually around now')
    .sort((a, b) => (b.usedThisWeek || 0) - (a.usedThisWeek || 0))
    .slice(0, 2);
  const recurringMeals = memory.filter(item => item.kind === 'meal');
  const savedFoods = memory.filter(item => item.kind === 'custom_food');
  const recipes = memory.filter(item => item.kind === 'recipe');
  const recentRepeats = memory.filter(item => item.lastUsed === 'Today' || item.lastUsed === 'Yesterday' || item.time === 'Recent Repeat').slice(0, 3);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-14 px-4 pb-2 flex items-center justify-between"
      >
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center text-[#5F6661] bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-colors">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h2 className="font-serif text-[22px] text-[#1F2422]">Memory</h2>
        <div className="w-11 h-11 flex items-center justify-center text-[#5F6661] bg-white/30 backdrop-blur-md rounded-full cursor-pointer hover:bg-white/50 transition-colors">
          <Search size={20} strokeWidth={1.5} />
        </div>
      </motion.div>

      <div className="px-6 mt-4 pb-36">
        <p className="font-sans text-[16px] text-[#5F6661] leading-relaxed mb-8">
          The foods that shape your days, quietly remembered and ready when they return.
        </p>

        <section className="mb-9">
          <SectionTitle icon={<Clock size={14} className="text-[#8B918C]" />} title="Usually around now" />
          <div className="space-y-3">
            {usuallyAroundNow.map((item, i) => (
              <MemoryCard key={item.id} item={item} delay={0.08 + i * 0.05} onQuickLog={quickLogMemory} />
            ))}
          </div>
        </section>

        <section className="mb-9">
          <SectionTitle icon={<Utensils size={14} className="text-[#8B918C]" />} title="Recurring meals" />
          <div className="space-y-3">
            {recurringMeals.map((item, i) => (
              <MemoryCard key={item.id} item={item} delay={0.16 + i * 0.05} compact onQuickLog={quickLogMemory} />
            ))}
          </div>
        </section>

        <section className="mb-9">
          <SectionTitle icon={<Wheat size={14} className="text-[#8B918C]" />} title="Saved foods" />
          <div className="grid grid-cols-1 gap-3">
            {savedFoods.map((item, i) => (
              <MemoryCard key={item.id} item={item} delay={0.22 + i * 0.05} compact onQuickLog={quickLogMemory} />
            ))}
          </div>
        </section>

        <section className="mb-9">
          <SectionTitle icon={<Utensils size={14} className="text-[#8B918C]" />} title="Recipes" />
          <div className="grid grid-cols-1 gap-3">
            {recipes.map((item, i) => (
              <MemoryCard key={item.id} item={item} delay={0.28 + i * 0.05} compact onQuickLog={quickLogMemory} />
            ))}
          </div>
        </section>

        {recentRepeats.length > 0 && (
          <section>
            <SectionTitle icon={<Clock size={14} className="text-[#8B918C]" />} title="Recent repeats" />
            <div className="space-y-3">
              {recentRepeats.map((item, i) => (
                <MemoryCard key={item.id} item={item} delay={0.34 + i * 0.05} compact onQuickLog={quickLogMemory} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};
