import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { RecurringCard } from '../components/MealCards';
import { MealResultOverlay } from '../components/MealResultOverlay';
import { useSolodko } from '../context/SolodkoContext';

export const Home = () => {
  const [showResult, setShowResult] = useState<any>(null);
  const { addLog } = useSolodko();
  const navigate = useNavigate();

  const handleLog = () => {
    if (showResult) {
      addLog({
        name: showResult.title.replace('\n', ' '),
        carbs: showResult.carbs,
        weight: showResult.details.portion,
        source: showResult.source,
        isEstimated: showResult.isEstimated
      });
    }
    setShowResult(null);
    navigate('/log');
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-16 px-6 pb-6 flex justify-between items-end"
      >
        <h1 className="font-serif text-[38px] leading-[40px] text-[#1F2422] tracking-tight">Morning</h1>
        <button className="w-[44px] h-[44px] bg-white/30 backdrop-blur-[32px] rounded-full flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.04)] border border-white/40 hover:bg-white/50 transition-colors cursor-pointer z-50 relative pointer-events-auto">
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
        <RecurringCard 
          title="Oatmeal & Berries" carbs={45} weight="250g" time="8:30 AM" delay={0.2} 
          source="Recent"
          previousUsage="Used yesterday"
          onClick={() => setShowResult({
            title: "Oatmeal with Mixed\nSummer Berries",
            carbs: 45,
            calories: 310,
            source: "Recent",
            state: "exact",
            isEstimated: false,
            lastEnjoyed: "Yesterday",
            details: { portion: "1 bowl (250g)", ratio: "18g per 100g" }
          })}
        />
        <RecurringCard 
          title="Flat White (Oat)" carbs={14} weight="240ml" time="9:00 AM" delay={0.3} 
          source="From Memory"
          previousUsage="Used Tuesday"
          onClick={() => setShowResult({
            title: "Oat Flat White",
            carbs: 14,
            calories: 130,
            source: "From Memory",
            state: "from_memory",
            isEstimated: false,
            lastEnjoyed: "Tuesday",
            details: { portion: "1 cup (240ml)", ratio: "6g per 100ml" }
          })}
        />
      </div>

      <AnimatePresence>
        {showResult && (
          <MealResultOverlay 
            isOpen={!!showResult} 
            onClose={() => setShowResult(null)}
            result={showResult}
            onLog={handleLog}
          />
        )}
      </AnimatePresence>
    </>
  );
};
