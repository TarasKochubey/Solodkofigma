import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ScanLine, Camera as CameraIcon } from 'lucide-react';

export const CameraView = ({ isOpen, onClose, onSimulateCapture }: { isOpen: boolean; onClose: () => void; onSimulateCapture: () => void }) => {
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
          
          {/* Simulated Camera Window */}
          <motion.div 
            initial={{ y: '100%', scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: '100%', scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full h-[80%] bg-[#1c1c1e] rounded-t-[44px] shadow-[0_-24px_64px_rgba(0,0,0,0.4)] border-t border-white/10 overflow-hidden flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center px-6 pt-6 pb-2 relative z-10">
              <span className="font-sans text-[15px] font-medium text-white/70">Point at food or label</span>
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
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-br from-[#2c2c2e] via-[#3a3a3c] to-[#1c1c1e] bg-[length:200%_200%] opacity-50"
              />
              
              {/* Frame bracket */}
              <div className="relative w-[280px] h-[280px] border border-white/20 rounded-[32px] flex items-center justify-center">
                <ScanLine size={48} className="text-white/30" strokeWidth={1} />
                
                {/* Corner markers */}
                <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-2 border-l-2 border-white/60 rounded-tl-[32px]" />
                <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-t-2 border-r-2 border-white/60 rounded-tr-[32px]" />
                <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-b-2 border-l-2 border-white/60 rounded-bl-[32px]" />
                <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-2 border-r-2 border-white/60 rounded-br-[32px]" />
              </div>
            </div>

            {/* Bottom Control */}
            <div className="pb-12 pt-6 flex justify-center items-center relative z-10 bg-gradient-to-t from-black/80 to-transparent">
              <button 
                onClick={() => {
                  onSimulateCapture();
                }}
                className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center hover:border-white/50 transition-colors"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group">
                  <CameraIcon size={24} className="text-black/80 group-hover:scale-110 transition-transform" />
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
