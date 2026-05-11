import React from 'react';
import { BookmarkPlus, Check, Clock, Pencil, Plus, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

type MealCardState = 'exact' | 'estimated' | 'from_memory' | 'scanned' | 'not_found' | 'offline';

const sourceLabels: Record<string, string> = {
  exact: 'Recent',
  estimated: 'Estimated',
  from_memory: 'From Memory',
  scanned: 'Scanned',
  not_found: 'Manual',
  offline: 'Recent',
  recent: 'Recent',
  manual: 'Manual'
};

const getSourceLabel = (source?: string, state?: MealCardState) => {
  if (source) return sourceLabels[source.toLowerCase().replace(/\s+/g, '_')] || source;
  return sourceLabels[state || 'estimated'];
};

export const RecurringCard = ({ title, carbs, weight, time, delay, source = 'Recent', previousUsage, onClick }: { title: string; carbs: number; weight: string; time: string; delay: number; source?: string; previousUsage?: string; onClick?: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    onClick={onClick}
    className="mx-5 mb-4 p-4.5 rounded-[28px] bg-gradient-to-br from-white/50 to-white/20 backdrop-blur-[32px] shadow-[0_16px_40px_-12px_rgba(180,140,120,0.1)] relative overflow-hidden group hover:bg-white/60 transition-all duration-500 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-12px_rgba(180,140,120,0.15)]"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#FFF3E0]/0 via-[#FFF3E0]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    <div className="absolute inset-0 rounded-[28px] border border-white/40 group-hover:border-white/60 transition-colors duration-500 pointer-events-none" />
    <div className="absolute inset-0 rounded-[28px] shadow-[inset_0_2px_8px_rgba(255,255,255,0.6)] pointer-events-none" />
    
    <div className="flex items-center justify-between relative z-10">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/50 rounded-[18px] flex items-center justify-center text-[#8B918C] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] group-hover:scale-105 transition-transform duration-500">
          <Clock size={18} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-sans text-[16px] leading-[20px] font-medium text-[#1F2422] tracking-tight">{title}</h3>
          <p className="font-sans text-[13px] leading-[18px] text-[#8B918C] mt-0.5">
            <span className="text-[#5F6661] mr-1">{source}</span>
            {weight}
          </p>
          {previousUsage && (
            <p className="font-sans text-[12px] leading-[16px] text-[#A8ADA9] mt-0.5">{previousUsage}</p>
          )}
        </div>
      </div>
      <div className="text-right pr-2">
        <div className="font-sans text-[22px] leading-none font-semibold text-[#1F2422] flex items-baseline">
          {carbs}<span className="text-[14px] font-medium text-[#5F6661] ml-0.5">g</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export const ExpandedMealCard = ({ title, carbs, calories, details, source, state = 'estimated', lastEnjoyed, previousUsage, onLog, onCancel, onSaveMemory, onAdjust, onEdit }: any) => {
  const sourceLabel = getSourceLabel(source, state);
  const isNotFound = state === 'not_found';
  const isOffline = state === 'offline';
  const primaryAction = isNotFound ? 'Add manually' : 'Log meal';
  const portion = details?.portion || 'Portion needed';
  const ratio = details?.ratio;

  return (
  <div className={`p-6 rounded-[32px] bg-white/60 backdrop-blur-[48px] shadow-[0_32px_64px_-16px_rgba(200,160,140,0.25)] relative overflow-hidden group border ${isOffline ? 'border-white/50' : 'border-white/70'}`}>
    <div className="absolute inset-0 shadow-[inset_0_2px_12px_rgba(255,255,255,0.9)] pointer-events-none rounded-[32px]" />
    
    <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-gradient-to-br from-[#A3D9A5]/10 to-transparent blur-[30px] rounded-full pointer-events-none" />

    <div className="flex justify-between items-start mb-5 relative z-10">
      <div className="pr-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-sans text-[11px] leading-none text-[#5F6661] font-semibold uppercase tracking-[0.15em] bg-white/80 px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
            {sourceLabel}
          </span>
          {isOffline && (
            <span className="font-sans text-[11px] leading-none text-[#8B918C] font-semibold uppercase tracking-[0.15em] bg-white/50 px-2 py-1 rounded-full shadow-sm">
              Offline
            </span>
          )}
        </div>
        <h2 className="font-sans text-[24px] leading-[28px] font-medium text-[#1F2422] tracking-tight whitespace-pre-line">
          {isNotFound ? 'Not in Memory yet' : title}
        </h2>
      </div>
      <div className="text-right shrink-0">
        <div className="font-sans text-[56px] leading-[0.8] font-semibold text-[#1F2422] tracking-tighter flex items-baseline">
          {isNotFound ? '--' : carbs}<span className="text-[20px] text-[#5F6661] font-medium ml-1">g</span>
        </div>
        <div className="font-sans text-[12px] leading-none text-[#8B918C] mt-1">carbs</div>
      </div>
    </div>
    
    <div className="flex flex-col gap-2 mb-6 relative z-10">
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-[16px] leading-snug font-medium text-[#1F2422]">{portion}</span>
        {calories !== undefined && !isNotFound && (
          <span className="font-sans text-[13px] leading-snug text-[#5F6661]">{calories} kcal</span>
        )}
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="font-sans text-[14px] leading-snug text-[#8B918C]">{ratio || (isNotFound ? 'Add it once, then it can be remembered.' : 'Carb ratio unavailable')}</span>
        {(lastEnjoyed || previousUsage) && (
          <span className="font-sans text-[12px] leading-snug text-[#8B918C] text-right shrink-0">{previousUsage || `Last: ${lastEnjoyed}`}</span>
        )}
      </div>
    </div>

    <div className="flex flex-col gap-2 relative z-10">
      <button 
        onClick={isNotFound ? onEdit : onLog}
        className="w-full bg-white/90 backdrop-blur-md text-[#1F2422] rounded-[20px] py-3.5 font-sans text-[16px] font-medium hover:bg-white transition-all shadow-[0_8px_20px_-6px_rgba(180,140,120,0.1)] border border-white/60 flex items-center justify-center gap-2 hover:scale-[1.01]"
      >
        {isNotFound ? <Plus size={18} strokeWidth={2.2} className="text-[#8B918C]" /> : <Check size={18} strokeWidth={2.5} className="text-[#A3D9A5]" />}
        {primaryAction}
      </button>
      <div className="flex gap-2">
        <button onClick={onAdjust} className="flex-1 bg-white/40 backdrop-blur-md rounded-[20px] py-3 font-sans text-[14px] font-medium text-[#5F6661] hover:bg-white/60 transition-colors border border-white/40 flex items-center justify-center gap-1.5">
          <SlidersHorizontal size={15} strokeWidth={1.8} />
          Adjust portion
        </button>
        <button onClick={onSaveMemory} className="flex-1 bg-white/40 backdrop-blur-md rounded-[20px] py-3 font-sans text-[14px] font-medium text-[#5F6661] hover:bg-white/60 transition-colors border border-white/40 flex items-center justify-center gap-1.5">
          <BookmarkPlus size={15} strokeWidth={1.8} />
          Save
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="flex-1 bg-white/30 backdrop-blur-md rounded-[18px] py-2.5 font-sans text-[13px] font-medium text-[#8B918C] hover:bg-white/50 transition-colors border border-white/30 flex items-center justify-center gap-1.5">
          <Pencil size={14} strokeWidth={1.7} />
          {isNotFound ? 'Try again' : 'Edit'}
        </button>
        <button onClick={onCancel} className="flex-1 bg-white/30 backdrop-blur-md rounded-[18px] py-2.5 font-sans text-[13px] font-medium text-[#8B918C] hover:bg-white/50 transition-colors border border-white/30">
          Dismiss
        </button>
      </div>
    </div>
  </div>
  );
};
