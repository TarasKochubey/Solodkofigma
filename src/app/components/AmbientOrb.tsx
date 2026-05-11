import React from 'react';
import { motion } from 'motion/react';

type OrbState = 'idle' | 'listening' | 'processing' | 'clarification';

export const AmbientOrb = ({ state = 'idle', onClick }: { state?: OrbState; onClick?: () => void }) => {
  const getScale = () => {
    switch(state) {
      case 'listening': return [1.05, 1.15, 1.05];
      case 'processing': return [1.02, 1.08, 1.02];
      case 'clarification': return [0.95, 1.0, 0.95];
      default: return [1, 1.04, 1];
    }
  };

  const getDuration = () => {
    switch(state) {
      case 'listening': return 2.5;
      case 'processing': return 1.5;
      case 'clarification': return 4;
      default: return 5; // slow idle cycle
    }
  };

  const getCoreColors = () => {
    switch(state) {
      case 'clarification': return 'from-[#D0C4B8] to-[#E5DCD1]'; // Muted, patient
      case 'listening': return 'from-[#FFCBA4] to-[#FFFFFF]'; // Brighter, more active
      case 'processing': return 'from-[#FFB3A7] to-[#FFE0C2]'; // Warmer processing
      default: return 'from-[#FFD6B4] to-[#FFF3E0]'; // Warm peach-cream
    }
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center w-[76px] h-[76px] cursor-pointer group transition-transform"
    >
      {/* Outer ambient intelligence aura */}
      <motion.div 
        animate={{ 
          scale: state === 'listening' ? [1.2, 1.4, 1.2] : [1.1, 1.2, 1.1],
          opacity: state === 'listening' ? [0.15, 0.25, 0.15] : [0.05, 0.1, 0.05]
        }}
        transition={{ repeat: Infinity, duration: getDuration() * 1.5, ease: "easeInOut" }}
        className="absolute inset-[-40%] rounded-full bg-gradient-to-br from-[#FFD6B4] to-transparent blur-[24px] pointer-events-none"
      />

      {/* Breathing environmental resonance */}
      <motion.div 
        animate={{ 
          scale: getScale(), 
          opacity: state === 'clarification' ? [0.1, 0.15, 0.1] : [0.2, 0.35, 0.2],
          rotate: state === 'processing' ? [0, 180, 360] : 0
        }}
        transition={{ repeat: Infinity, duration: getDuration(), ease: state === 'processing' ? "linear" : "easeInOut" }}
        className="absolute inset-[-15%] rounded-full bg-gradient-to-br from-[#FFD6B4] to-[#FFE0C2] blur-[16px] pointer-events-none"
      />
      
      {/* Physical glass shell */}
      <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-2xl border border-white/60 shadow-[inset_0_-6px_20px_rgba(180,140,120,0.1),inset_0_4px_12px_rgba(255,255,255,0.8),0_16px_32px_-8px_rgba(180,140,120,0.3)] overflow-hidden pointer-events-none" />
      
      {/* Defined luminous core */}
      <motion.div 
        animate={{ 
          scale: state === 'listening' ? [0.85, 0.95, 0.85] : [0.8, 0.88, 0.8],
          opacity: state === 'clarification' ? 0.5 : 0.9,
          rotate: state === 'processing' ? [0, -180, -360] : [0, 45, 0]
        }}
        transition={{ repeat: Infinity, duration: getDuration(), ease: state === 'processing' ? "linear" : "easeInOut" }}
        className={`absolute w-[50%] h-[50%] rounded-full bg-gradient-to-br ${getCoreColors()} blur-[8px] shadow-[0_0_24px_rgba(255,214,180,0.8)] transition-colors duration-1000 pointer-events-none`}
      />
      
      {/* Specular reflections */}
      <div className="absolute top-[15%] left-[20%] w-[25%] h-[25%] rounded-full bg-white/90 blur-[2px] opacity-80 pointer-events-none" />
      <div className="absolute bottom-[15%] right-[15%] w-[35%] h-[15%] rounded-full bg-white/40 blur-[4px] mix-blend-overlay rotate-[-45deg] pointer-events-none" />
      
      {/* Subtle depth ring */}
      <div className="absolute inset-2 rounded-full border border-white/30 mix-blend-overlay opacity-50 pointer-events-none" />
    </motion.div>
  );
};