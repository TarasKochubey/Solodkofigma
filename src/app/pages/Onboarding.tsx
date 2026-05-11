import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Camera, HeartPulse, Mic, Bell } from 'lucide-react';
import { AmbientOrb } from '../components/AmbientOrb';

const setupItems = [
  {
    icon: <Camera size={18} strokeWidth={1.5} />,
    title: 'Camera',
    body: 'Use a meal photo or label when typing is slower.',
    fallback: 'You can always type the food instead.'
  },
  {
    icon: <Mic size={18} strokeWidth={1.5} />,
    title: 'Microphone',
    body: 'Speak a food when your hands are busy.',
    fallback: 'Text entry stays available.'
  },
  {
    icon: <Bell size={18} strokeWidth={1.5} />,
    title: 'Gentle reminders',
    body: 'Let Solodko surface usual meals at familiar times.',
    fallback: 'Memory still works without reminders.'
  },
  {
    icon: <HeartPulse size={18} strokeWidth={1.5} />,
    title: 'Health',
    body: 'Keep food context near your health routine.',
    fallback: 'Core logging does not depend on it.'
  }
];

export const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [permissionIndex, setPermissionIndex] = useState(0);
  const [status, setStatus] = useState('');
  const permission = setupItems[permissionIndex];

  const advancePermission = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(''), 1300);
    if (permissionIndex < setupItems.length - 1) {
      setPermissionIndex(permissionIndex + 1);
    } else {
      setStep(3);
    }
  };

  return (
    <div className="relative w-full h-screen sm:h-[852px] sm:max-w-[393px] mx-auto bg-[#FFF3E0] sm:rounded-[44px] sm:shadow-[0_0_0_8px_#111,0_0_0_12px_#333,0_40px_80px_rgba(0,0,0,0.2)] overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#FFF8F0]">
        <div className="absolute top-[-10%] left-[-20%] w-[140%] h-[70%] rounded-full bg-gradient-to-b from-[#FFD6B4] to-transparent blur-[120px] opacity-70 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[120%] h-[60%] rounded-full bg-[#C8E6C9] blur-[100px] opacity-50 mix-blend-multiply" />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between py-16 px-8">
        <div className="flex justify-center pt-4">
          <motion.div
            animate={{ scale: step === 2 ? 0.9 : 1 }}
            transition={{ type: "spring", damping: 24, stiffness: 220 }}
            className="scale-125"
          >
            <AmbientOrb state={step === 2 ? 'clarification' : 'idle'} />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="font-serif text-[42px] leading-[48px] text-[#1F2422] tracking-tight mb-6">Solodko</h1>
              <p className="font-sans text-[18px] leading-[26px] text-[#5F6661] font-light max-w-[282px] mx-auto">
                A calm food companion for remembering what you eat often and logging it with less effort.
              </p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="why"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center"
            >
              <h2 className="font-serif text-[34px] leading-[40px] text-[#1F2422] tracking-tight mb-5">Food repeats.</h2>
              <p className="font-sans text-[17px] leading-[25px] text-[#5F6661] font-light max-w-[286px] mx-auto">
                Solodko keeps those familiar meals close, so the next bowl, coffee, or recipe starts from Memory.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="font-sans text-[12px] uppercase tracking-widest font-semibold text-[#8B918C] text-center mb-4">Optional setup</p>
              <div className="bg-white/55 backdrop-blur-2xl rounded-[30px] p-6 border border-white/60 shadow-[0_18px_44px_-18px_rgba(180,140,120,0.22)]">
                <div className="w-12 h-12 rounded-[18px] bg-white/60 flex items-center justify-center text-[#5F6661] mb-5">
                  {permission.icon}
                </div>
                <h2 className="font-sans text-[24px] leading-[29px] font-medium text-[#1F2422] mb-3">{permission.title}</h2>
                <p className="font-sans text-[15px] leading-[22px] text-[#5F6661] mb-2">{permission.body}</p>
                <p className="font-sans text-[13px] leading-[19px] text-[#8B918C]">{permission.fallback}</p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="first-meal"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center"
            >
              <h2 className="font-serif text-[34px] leading-[40px] text-[#1F2422] tracking-tight mb-5">Start with one meal.</h2>
              <p className="font-sans text-[17px] leading-[25px] text-[#5F6661] font-light max-w-[286px] mx-auto">
                Type a food, use a photo, or choose from Memory. Skipped permissions stay available later and won't limit logging.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          {status && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mx-auto w-fit bg-white/60 backdrop-blur-xl rounded-full px-4 py-2 border border-white/60"
            >
              <span className="font-sans text-[13px] font-medium text-[#5F6661]">{status}</span>
            </motion.div>
          )}

          {step === 2 ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => advancePermission('Setup updated')}
                className="bg-white/70 backdrop-blur-xl text-[#1F2422] rounded-[24px] py-4 font-sans text-[15px] font-medium hover:bg-white transition-all shadow-[0_12px_32px_-12px_rgba(180,140,120,0.2)] border border-white/60"
              >
                Allow
              </button>
              <button
                onClick={() => advancePermission('Skipped')}
                className="bg-white/35 backdrop-blur-xl text-[#5F6661] rounded-[24px] py-4 font-sans text-[15px] font-medium hover:bg-white/50 transition-all border border-white/40"
              >
                Not now
              </button>
            </div>
          ) : (
            <button
              onClick={() => step < 3 ? setStep(step + 1) : navigate('/')}
              className="w-full bg-white/60 backdrop-blur-xl text-[#1F2422] rounded-[28px] py-4.5 font-sans text-[17px] font-medium hover:bg-white transition-all shadow-[0_12px_32px_-8px_rgba(180,140,120,0.2)] border border-white/60"
            >
              {step === 0 ? 'Continue' : step === 1 ? 'Optional setup' : 'Log first meal'}
            </button>
          )}

          {step === 1 && (
            <button
              onClick={() => navigate('/')}
              className="w-full text-[#8B918C] font-sans text-[14px] py-2"
            >
              Start without setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
