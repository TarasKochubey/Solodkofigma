import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Camera, ScanBarcode, ArrowRight } from 'lucide-react';

export const InputComposer = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onCameraOpen,
  placeholder = "What are you eating?"
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (text: string) => void;
  onCameraOpen: () => void;
  placeholder?: string;
}) => {
  const [text, setText] = React.useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setText('');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
          className="absolute bottom-6 left-4 right-4 pointer-events-auto z-50 flex flex-col gap-3"
        >
          {/* Main Input Pill */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-[28px] p-2 flex items-center shadow-[0_16px_40px_-12px_rgba(180,140,120,0.25)] border border-white/60">
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent px-4 font-sans text-[17px] text-[#1F2422] placeholder:text-[#8B918C]/70 outline-none focus:ring-0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && text.trim()) {
                  onSubmit(text);
                }
              }}
            />
            {text.trim() ? (
              <button 
                onClick={() => onSubmit(text)}
                className="w-10 h-10 bg-[#FFD6B4] rounded-full flex items-center justify-center text-[#5F6661] shadow-sm hover:scale-105 transition-transform"
              >
                <ArrowRight size={20} strokeWidth={2} />
              </button>
            ) : (
              <div className="flex items-center gap-1 pr-2">
                <button className="w-10 h-10 flex items-center justify-center text-[#8B918C] hover:text-[#5F6661] transition-colors">
                  <Mic size={20} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={onCameraOpen}
                  className="w-10 h-10 flex items-center justify-center text-[#8B918C] hover:text-[#5F6661] transition-colors"
                >
                  <Camera size={20} strokeWidth={1.5} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-[#8B918C] hover:text-[#5F6661] transition-colors">
                  <ScanBarcode size={20} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
          
          {/* Ambient Close Background Layer */}
          <div 
            className="fixed inset-0 -z-10"
            onClick={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
