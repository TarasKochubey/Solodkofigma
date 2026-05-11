import React from 'react';
import { motion } from 'motion/react';
import { Settings2 } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { RecurringCard } from '../components/MealCards';
import { useSolodko } from '../context/SolodkoContext';
import { getCurrentMealMoment, type MealMoment } from '../utils/mealMoment';

type HomeOutletContext = {
  mealMoment?: MealMoment;
  onRecurringMealSelect?: (item: any) => void;
};

export const Home = () => {
  const { memory } = useSolodko();
  const { mealMoment = getCurrentMealMoment(), onRecurringMealSelect } = useOutletContext<HomeOutletContext>();

  const recurringMeals = memory
    .filter(item => item.mealMoment === mealMoment || item.recurrence === 'Usually around now')
    .sort((a, b) => (b.usedThisWeek || 0) - (a.usedThisWeek || 0))
    .slice(0, 3);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-16 px-6 pb-6 flex justify-between items-end"
      >
        <h1 className="font-serif text-[38px] leading-[40px] text-[#1F2422] tracking-tight">{mealMoment}</h1>
        <button className="w-[44px] h-[44px] bg-white/30 backdrop-blur-[32px] rounded-full flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.04)] border border-white/40 hover:bg-white/50 transition-colors cursor-pointer z-50 relative pointer-events-auto" aria-label="Settings">
          <Settings2 size={18} strokeWidth={1.5} className="text-[#5F6661]" />
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
        className="px-7 mb-4 mt-2"
      >
        <h3 className="font-serif text-[22px] text-[#8B918C] italic font-light">Usually around now...</h3>
      </motion.div>
      
      <div className="pointer-events-auto z-10 relative">
        {recurringMeals.length > 0 ? (
          recurringMeals.map((item, index) => (
            <RecurringCard
              key={item.id}
              title={item.name}
              carbs={item.carbs}
              weight={item.weight}
              time={item.time}
              delay={0.2 + index * 0.1}
              source={item.source}
              previousUsage={item.lastUsed ? `Last logged ${item.lastUsed.toLowerCase()}` : item.recurrence}
              onClick={() => onRecurringMealSelect?.(item)}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="mx-5 p-6 rounded-[28px] bg-white/35 backdrop-blur-[32px] border border-white/45 shadow-[0_16px_40px_-18px_rgba(180,140,120,0.14)]"
          >
            <p className="font-sans text-[16px] leading-[23px] text-[#5F6661]">
              Memory will bring familiar meals here as you log them.
            </p>
          </motion.div>
        )}
      </div>
    </>
  );
};
