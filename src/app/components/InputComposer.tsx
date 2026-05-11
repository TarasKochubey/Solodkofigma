import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Camera, ScanBarcode, ArrowRight } from 'lucide-react';

export const InputComposer = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onCameraOpen,
  onBarcodeOpen,
  placeholder = "What are you eating?",
  supportingText
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (text: string) => void;
  onCameraOpen: () => void;
  onBarcodeOpen: () => void;
  placeholder?: string;
  supportingText?: string;
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

  const submitText = () => {
    const value = text.trim();
    if (!value) return;
    onSubmit(value);
    setText('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
          className="absolute bottom-6 left-4 right-4 pointer-events-auto z-50 flex flex-col gap-3"
        >
          {supportingText && (
            <div className="mx-auto max-w-fit bg-white/55 backdrop-blur-xl px-4 py-2 rounded-full shadow-[0_8px_24px_-10px_rgba(180,140,120,0.18)] border border-white/50">
              <span className="font-sans text-[14px] font-medium text-[#5F6661]">{supportingText}</span>
            </div>
          )}
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
                  submitText();
                }
              }}
            />
            <div className="flex items-center gap-1 pr-1">
              <button className="w-9 h-9 flex items-center justify-center text-[#8B918C] hover:text-[#5F6661] transition-colors" aria-label="Voice input">
                <Mic size={19} strokeWidth={1.5} />
              </button>
              <button 
                onClick={onCameraOpen}
                className="w-9 h-9 flex items-center justify-center text-[#8B918C] hover:text-[#5F6661] transition-colors"
                aria-label="Photo input"
              >
                <Camera size={19} strokeWidth={1.5} />
              </button>
              <button
                onClick={onBarcodeOpen}
                className="w-9 h-9 flex items-center justify-center text-[#8B918C] hover:text-[#5F6661] transition-colors"
                aria-label="Label scan"
              >
                <ScanBarcode size={19} strokeWidth={1.5} />
              </button>
              <button 
                onClick={submitText}
                disabled={!text.trim()}
                className="w-10 h-10 bg-[#FFD6B4] rounded-full flex items-center justify-center text-[#5F6661] shadow-sm hover:scale-105 transition-transform disabled:opacity-35 disabled:hover:scale-100"
                aria-label="Submit food"
              >
                <ArrowRight size={20} strokeWidth={2} />
              </button>
            </div>
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
