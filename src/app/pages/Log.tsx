import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSolodko } from '../context/SolodkoContext';

const sections = ['Morning', 'Afternoon', 'Evening'] as const;

const getMomentFromTime = (time: string) => {
  const hour = Number(time.split(':')[0]);
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
};

const LogMealCard = ({ entry, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.08 + index * 0.04, duration: 0.5, ease: "easeOut" }}
    className="flex gap-4 items-start relative z-10"
  >
    <div className="w-[34px] shrink-0 font-sans text-[12px] font-medium text-[#8B918C] pt-4 text-right">
      {entry.time}
    </div>
    <div className="w-2.5 h-2.5 rounded-full bg-[#FFF8F0] border-[2px] border-[#C8E6C9] shadow-[0_0_0_4px_rgba(255,248,240,1)] mt-[19px] shrink-0 relative z-20" />
    <div className="flex-1 bg-gradient-to-br from-white/70 to-white/40 p-4 rounded-[23px] shadow-[0_8px_24px_-12px_rgba(180,140,120,0.16)] border border-white/60">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h4 className="font-sans text-[16px] font-medium text-[#1F2422] leading-tight">{entry.name}</h4>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
            <span className="font-sans text-[13px] text-[#5F6661]">{entry.weight}</span>
            <span className="font-sans text-[12px] text-[#8B918C]">{entry.source}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="font-sans text-[24px] leading-none font-semibold text-[#1F2422] tracking-tight">
            {entry.carbs}<span className="text-[14px] text-[#5F6661] ml-0.5">g</span>
          </span>
          <div className="font-sans text-[11px] text-[#8B918C] mt-1">carbs</div>
        </div>
      </div>
    </div>
  </motion.div>
);

export const Log = () => {
  const navigate = useNavigate();
  const { logs } = useSolodko();

  const groupedLogs = sections.map(section => ({
    section,
    entries: logs
      .filter(log => (log.mealMoment || getMomentFromTime(log.time)) === section)
      .sort((a, b) => a.time.localeCompare(b.time))
  }));

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-14 px-4 pb-4 flex items-center justify-between z-20 relative"
      >
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center text-[#5F6661] bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-colors">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h2 className="font-serif text-[22px] text-[#1F2422]">Today</h2>
        <div className="w-11 h-11" />
      </motion.div>

      <div className="px-6 mt-2 pb-36 relative">
        {logs.length > 0 && (
          <div className="absolute left-[44px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-[#1F2422]/8 via-[#1F2422]/5 to-transparent z-0 rounded-full" />
        )}
        
        {logs.length === 0 ? (
          <div className="text-center pt-24">
            <p className="font-serif text-[20px] text-[#8B918C] italic">The day is still open.</p>
          </div>
        ) : (
          groupedLogs.map(({ section, entries }) => entries.length > 0 && (
            <section key={section} className="mb-9">
              <div className="flex items-baseline justify-between mb-3 pl-[52px]">
                <h3 className="font-sans text-[12px] uppercase tracking-widest font-semibold text-[#8B918C]">{section}</h3>
                <span className="font-sans text-[12px] text-[#A8ADA9]">{entries.length} {entries.length === 1 ? 'meal' : 'meals'}</span>
              </div>
              <div className="space-y-4">
                {entries.map((entry, i) => (
                  <LogMealCard key={entry.id} entry={entry} index={i} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
};
