import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { AmbientOrb } from '../components/AmbientOrb';

export const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen sm:h-[852px] sm:max-w-[393px] mx-auto bg-[#FFF3E0] sm:rounded-[44px] sm:shadow-[0_0_0_8px_#111,0_0_0_12px_#333,0_40px_80px_rgba(0,0,0,0.2)] overflow-hidden font-sans">
      
      {/* Super soft, immersive mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#FFF8F0]">
        <div className="absolute top-[-10%] left-[-20%] w-[140%] h-[70%] rounded-full bg-gradient-to-b from-[#FFD6B4] to-transparent blur-[120px] opacity-70 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[120%] h-[60%] rounded-full bg-[#C8E6C9] blur-[100px] opacity-50 mix-blend-multiply" />
      </div>

      <div className="relative z-10 flex flex-col h-full items-center justify-between py-24 px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="font-serif text-[42px] leading-[48px] text-[#1F2422] tracking-tight mb-6">Solodko</h1>
          <p className="font-sans text-[18px] leading-[26px] text-[#5F6661] font-light max-w-[260px] mx-auto">
            A quieter rhythm for your food life. No noise, just calm awareness.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          className="scale-150"
        >
          <AmbientOrb />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={() => navigate('/')}
          className="w-full bg-white/60 backdrop-blur-xl text-[#1F2422] rounded-[28px] py-4.5 font-sans text-[17px] font-medium hover:bg-white transition-all shadow-[0_12px_32px_-8px_rgba(180,140,120,0.2)] border border-white/60"
        >
          Enter
        </motion.button>
      </div>
    </div>
  );
};