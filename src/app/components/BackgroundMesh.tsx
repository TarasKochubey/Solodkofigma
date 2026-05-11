import React from 'react';
import { motion } from 'motion/react';

export const BackgroundMesh = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#FFF8F0]">
    <div className="absolute top-[-15%] left-[-15%] w-[130%] h-[60%] rounded-full bg-gradient-to-b from-[#FFD6B4] to-transparent blur-[90px] opacity-60 mix-blend-multiply" />
    <div className="absolute top-[10%] right-[-40%] w-[90%] h-[90%] rounded-full bg-[#C8E6C9] blur-[120px] opacity-40 mix-blend-multiply" />
    <div className="absolute bottom-[-10%] left-[-20%] w-[120%] h-[50%] rounded-full bg-[#FFF3E0] blur-[80px] opacity-80 mix-blend-overlay" />
  </div>
);