import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Heart, Search, Sparkles, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSolodko } from '../context/SolodkoContext';

export const Memory = () => {
  const navigate = useNavigate();
  const { memory } = useSolodko();

  const routines = memory.filter(m => m.time === 'Morning' || m.time === 'Afternoon');
  const personal = [
    { id: 'p1', name: "My Weekend Pancakes", carbs: 54, weight: "2 pancakes + syrup", time: "Recipe" },
    { id: 'p2', name: "Mom's Green Borscht", carbs: 22, weight: "1 bowl (300g)", time: "Saved Meal" },
  ];

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

      <div className="px-6 mt-4 pb-32">
        <p className="font-sans text-[16px] text-[#5F6661] leading-relaxed mb-8">
          The foods that shape your days, quietly remembered and always ready.
        </p>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 px-2">
            <Sparkles size={14} className="text-[#8B918C]" />
            <h3 className="font-sans text-[13px] uppercase tracking-widest font-semibold text-[#8B918C]">Rhythms & Routines</h3>
          </div>
          <div className="space-y-3">
            {routines.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (i * 0.05), duration: 0.5 }}
                className="p-5 rounded-[24px] bg-[#FFF8F0]/80 shadow-[0_4px_16px_-4px_rgba(180,140,120,0.1)] border border-white/40 flex justify-between items-center group cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all hover:bg-white/60"
              >
                <div>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#A3D9A5] mb-1 block">Usually {item.time}</span>
                  <h4 className="font-sans text-[17px] font-medium text-[#1F2422]">{item.name}</h4>
                  <p className="font-sans text-[13px] text-[#8B918C] mt-0.5">{item.weight}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-sans text-[20px] font-semibold text-[#1F2422]">{item.carbs}<span className="text-[14px] text-[#8B918C]">g</span></span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4 px-2">
            <ChefHat size={14} className="text-[#8B918C]" />
            <h3 className="font-sans text-[13px] uppercase tracking-widest font-semibold text-[#8B918C]">Personal Kitchen</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {personal.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.05), duration: 0.5 }}
                className="p-4 rounded-[20px] bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md shadow-[0_4px_12px_-4px_rgba(180,140,120,0.1)] border border-white/50 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all group"
              >
                <Heart size={16} className="text-[#FFB3A7] mb-3 group-hover:scale-110 transition-transform" strokeWidth={2} fill="#FFB3A7" />
                <h4 className="font-sans text-[15px] font-medium text-[#1F2422] leading-tight mb-1">{item.name}</h4>
                <p className="font-sans text-[12px] text-[#8B918C] mb-3">{item.time}</p>
                <div className="font-sans text-[20px] font-semibold text-[#1F2422]">{item.carbs}<span className="text-[13px] font-medium text-[#5F6661] ml-0.5">g</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};