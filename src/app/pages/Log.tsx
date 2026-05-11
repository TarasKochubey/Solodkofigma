import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSolodko } from '../context/SolodkoContext';

export const Log = () => {
  const navigate = useNavigate();
  const { logs } = useSolodko();

  const totalCarbs = logs.reduce((sum, log) => sum + log.carbs, 0);

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
        <div className="w-11 h-11 flex items-center justify-center text-[#1F2422] font-semibold text-[18px]">
          {totalCarbs}<span className="text-[14px] text-[#5F6661] font-normal">g</span>
        </div>
      </motion.div>

      <div className="px-6 mt-2 pb-32 relative">
        {logs.length > 0 && (
          <div className="absolute left-[39px] top-6 bottom-0 w-[2px] bg-gradient-to-b from-[#1F2422]/10 via-[#1F2422]/5 to-transparent z-0 rounded-full" />
        )}
        
        {logs.length === 0 ? (
          <div className="text-center pt-24">
            <p className="font-serif text-[20px] text-[#8B918C] italic">The day is young.</p>
          </div>
        ) : (
          logs.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.05), duration: 0.6, ease: "easeOut" }}
              className="flex gap-5 items-start mb-10 relative z-10"
            >
              <div className="w-[30px] shrink-0 font-sans text-[13px] font-medium text-[#8B918C] pt-5 text-right">
                {entry.time.split(':')[0]}<span className="text-[10px] text-[#A8ADA9] ml-0.5">{entry.time.split(':')[1]}</span>
              </div>
              
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFF8F0] border-[3px] border-[#A3D9A5] shadow-[0_0_0_4px_rgba(255,248,240,1)] mt-[22px] shrink-0 relative z-20 transition-transform hover:scale-110" />
              
              <div className="flex-1 bg-gradient-to-br from-white/70 to-white/40 p-4.5 rounded-[24px] shadow-[0_8px_24px_-8px_rgba(180,140,120,0.1)] border border-white/60 flex justify-between items-center group hover:bg-white/80 hover:-translate-y-0.5 transition-all cursor-pointer">
                <div className="w-2/3 pr-2">
                  <h4 className="font-sans text-[16px] font-medium text-[#1F2422] leading-tight">{entry.name}</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-sans text-[13px] text-[#8B918C]">{entry.weight}</span>
                    {entry.isEstimated && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD6B4]" />
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-sans text-[24px] font-semibold text-[#1F2422] tracking-tight">{entry.carbs}<span className="text-[14px] text-[#5F6661] ml-0.5">g</span></span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </>
  );
};