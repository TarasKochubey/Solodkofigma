import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, Camera as CameraIcon, ReceiptText, Utensils } from 'lucide-react';

export const CameraView = ({ isOpen, mode = 'meal', onClose, onSimulateCapture, onNotFound }: { isOpen: boolean; mode?: 'meal' | 'label'; onClose: () => void; onSimulateCapture: () => void; onNotFound?: () => void }) => {
  const isLabel = mode === 'label';
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[60] pointer-events-auto overflow-hidden flex flex-col justify-end"
        >
          {/* Soft blur backdrop */}
          <div className="absolute inset-0 bg-[#1F2422]/35 backdrop-blur-md" onClick={onClose} />
          
          {/* Simulated Camera Window */}
          <motion.div 
            initial={reduceMotion ? { opacity: 0 } : { y: '100%', scale: 0.95 }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: '100%', scale: 0.95 }}
            transition={reduceMotion ? { duration: 0.2 } : { type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full h-[80%] bg-[#2E312F] rounded-t-[44px] shadow-[0_-24px_64px_rgba(31,36,34,0.32)] border-t border-white/10 overflow-hidden flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center px-6 pt-6 pb-2 relative z-10">
              <div>
                <span className="font-sans text-[15px] font-medium text-white/78">{isLabel ? 'Place the label in view' : 'Frame the meal softly'}</span>
                <p className="font-sans text-[12px] text-white/42 mt-0.5">{isLabel ? 'Label or package' : 'Meal photo or plate'}</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Viewfinder area */}
            <div className="flex-1 relative flex items-center justify-center">
              {/* Simulated camera feed - just a softly animated gradient for prototype */}
              <motion.div 
                animate={reduceMotion ? undefined : { 
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-br from-[#5F6661] via-[#3E433F] to-[#2E312F] bg-[length:200%_200%] opacity-60"
              />
              
              <div className={`${isLabel ? 'w-[260px] h-[180px]' : 'w-[280px] h-[280px]'} relative border border-white/18 bg-white/[0.03] rounded-[34px] flex flex-col items-center justify-center backdrop-blur-[2px] shadow-[inset_0_2px_20px_rgba(255,255,255,0.06)]`}>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  {isLabel ? <ReceiptText size={30} className="text-white/50" strokeWidth={1.4} /> : <Utensils size={30} className="text-white/50" strokeWidth={1.4} />}
                </div>
                <p className="font-sans text-[15px] text-white/68">{isLabel ? 'Find label' : 'Identify meal'}</p>
              </div>
            </div>

            {/* Bottom Control */}
            <div className="pb-12 pt-6 flex justify-center items-center gap-5 relative z-10 bg-gradient-to-t from-[#1F2422]/80 to-transparent">
              {isLabel && (
                <button
                  onClick={onNotFound}
                  className="min-h-11 px-4 rounded-full bg-white/10 text-white/68 font-sans text-[13px] font-medium border border-white/10 hover:bg-white/15 transition-colors"
                >
                  Add instead
                </button>
              )}
              <button 
                onClick={() => {
                  onSimulateCapture();
                }}
                aria-label={isLabel ? 'Use label' : 'Use photo'}
                className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center hover:border-white/50 transition-colors"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group">
                  <CameraIcon size={24} className="text-black/80 group-hover:scale-110 transition-transform" />
                </div>
              </button>
              {isLabel && <div className="w-[86px]" />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
