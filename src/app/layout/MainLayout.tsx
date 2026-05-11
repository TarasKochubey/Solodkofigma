import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { List, Bookmark } from 'lucide-react';
import { BackgroundMesh } from '../components/BackgroundMesh';
import { AmbientOrb } from '../components/AmbientOrb';
import { InputComposer } from '../components/InputComposer';
import { CameraView } from '../components/CameraView';
import { MealResultOverlay } from '../components/MealResultOverlay';
import { useSolodko } from '../context/SolodkoContext';

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addLog } = useSolodko();
  const [orbState, setOrbState] = useState<'idle' | 'listening' | 'processing' | 'clarification'>('idle');
  const [clarificationText, setClarificationText] = useState('');
  
  const [composerOpen, setComposerOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [pendingText, setPendingText] = useState('');
  const [pendingResult, setPendingResult] = useState<any>(null);

  const handleOrbClick = () => {
    if (orbState === 'idle' || orbState === 'clarification') {
      setComposerOpen(true);
    }
  };

  const handleComposerSubmit = (text: string) => {
    setComposerOpen(false);
    
    if (orbState === 'clarification') {
      setOrbState('processing');
      setTimeout(() => {
        setOrbState('idle');
        setClarificationText('');
        setPendingResult({
          title: pendingText,
          carbs: 35,
          source: 'AI',
          isEstimated: false,
          confidence: 92,
          details: { portion: text, ratio: "11g per 100g" }
        });
        setResultOpen(true);
      }, 1000);
      return;
    }

    setOrbState('processing');
    setPendingText(text);
    
    // Simulate API logic
    setTimeout(() => {
      // If it's short, simulate asking for weight
      if (text.length < 10 && !text.includes('g') && !text.includes('bowl')) {
        setClarificationText('How much?');
        setOrbState('clarification');
      } else {
        setOrbState('idle');
        setPendingResult({
          title: text,
          carbs: text.includes('apple') ? 25 : 45,
          source: 'AI',
          isEstimated: true,
          confidence: 88,
          details: { portion: "1 portion", ratio: "Estimated" }
        });
        setResultOpen(true);
      }
    }, 1500);
  };

  const handleCameraCapture = () => {
    setCameraOpen(false);
    setOrbState('processing');
    setTimeout(() => {
      setOrbState('idle');
      setPendingResult({
        title: "Nutrition Label\nRecognized",
        carbs: 12,
        source: 'Scanned',
        isEstimated: false,
        details: { portion: "Per 100g", ratio: "12g per 100g" }
      });
      setResultOpen(true);
    });
  };

  const handleLogMeal = () => {
    if (pendingResult) {
      addLog({
        name: pendingResult.title.replace('\n', ' '),
        carbs: pendingResult.carbs,
        weight: pendingResult.details.portion,
        source: pendingResult.source,
        isEstimated: pendingResult.isEstimated
      });
    }
    setResultOpen(false);
    setPendingResult(null);
    navigate('/log');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      <div className="relative w-full h-screen sm:h-[852px] sm:max-w-[393px] mx-auto bg-[#FFF3E0] sm:rounded-[44px] sm:shadow-[0_0_0_8px_#111,0_0_0_12px_#333,0_40px_80px_rgba(0,0,0,0.2)] overflow-hidden font-sans selection:bg-[#C8E6C9]/50">
        
        <BackgroundMesh />

        <div className="relative z-10 flex flex-col h-full">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar pb-[220px]" style={{ scrollbarWidth: 'none' }}>
            <Outlet />
          </div>

          {/* Ambient Console Architecture */}
          <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none flex flex-col justify-end z-40">
            {/* The environmental bleed */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/90 to-transparent" />
            
            {/* Soft glass architectural surface */}
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-white/10 backdrop-blur-[32px] border-t border-white/30 [mask-image:linear-gradient(to_bottom,transparent,black_40px)] shadow-[0_-12px_40px_rgba(180,140,120,0.1)]" />

            {/* Orb Interaction Light Pool */}
            <motion.div 
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute bottom-[30px] left-1/2 -translate-x-1/2 w-[160px] h-[60px] bg-gradient-to-t ${orbState === 'listening' ? 'from-[#FFD6B4]/60' : 'from-[#FFD6B4]/40'} to-transparent blur-[24px] rounded-[100%] transition-colors duration-1000`}
            />

            {/* Clarification Prompt - Inline above the orb */}
            <AnimatePresence>
              {orbState === 'clarification' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute bottom-[120px] left-0 right-0 flex justify-center pointer-events-auto"
                  onClick={handleOrbClick}
                >
                  <div className="bg-white/60 backdrop-blur-xl px-5 py-2.5 rounded-full shadow-[0_8px_24px_-8px_rgba(180,140,120,0.2)] border border-white/50 cursor-pointer hover:bg-white/80 transition-colors">
                    <span className="font-sans text-[16px] font-medium text-[#1F2422]">{clarificationText}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3-Tab Navigation & Embedded Orb */}
            <div className="pointer-events-auto flex items-center justify-between px-10 pb-8 relative z-30">
              <AnimatePresence mode="popLayout">
                {!composerOpen ? (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                    onClick={() => navigate('/log')} 
                    className={`flex flex-col items-center gap-1.5 transition-colors ${location.pathname === '/log' ? 'text-[#1F2422]' : 'text-[#8B918C] hover:text-[#5F6661]'}`}
                  >
                    <List size={24} strokeWidth={location.pathname === '/log' ? 2 : 1.5} />
                    <span className="text-[11px] font-medium tracking-wide">Log</span>
                  </motion.button>
                ) : (
                  <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} className="w-6" /> // Spacer
                )}
              </AnimatePresence>
              
              <motion.div 
                className="px-1 relative group mb-2"
                animate={{ y: composerOpen ? -20 : 0, scale: composerOpen ? 0.9 : 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="absolute inset-x-2 top-1/2 bottom-0 bg-black/5 blur-[8px] rounded-full scale-x-125 translate-y-2 pointer-events-none transition-opacity group-hover:opacity-50" />
                <AmbientOrb state={orbState} onClick={handleOrbClick} />
              </motion.div>
              
              <AnimatePresence mode="popLayout">
                {!composerOpen ? (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                    onClick={() => navigate('/memory')} 
                    className={`flex flex-col items-center gap-1.5 transition-colors ${location.pathname === '/memory' ? 'text-[#1F2422]' : 'text-[#8B918C] hover:text-[#5F6661]'}`}
                  >
                    <Bookmark size={24} strokeWidth={location.pathname === '/memory' ? 2 : 1.5} />
                    <span className="text-[11px] font-medium tracking-wide">Memory</span>
                  </motion.button>
                ) : (
                  <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} className="w-6" /> // Spacer
                )}
              </AnimatePresence>
            </div>
            
            <InputComposer 
              isOpen={composerOpen} 
              onClose={() => setComposerOpen(false)} 
              onSubmit={handleComposerSubmit}
              placeholder={orbState === 'clarification' ? "e.g., a handful, 300g..." : "What are you eating?"}
              onCameraOpen={() => {
                setComposerOpen(false);
                setCameraOpen(true);
              }}
            />
          </div>
        </div>

        <CameraView 
          isOpen={cameraOpen} 
          onClose={() => setCameraOpen(false)} 
          onSimulateCapture={handleCameraCapture}
        />

        <AnimatePresence>
          {resultOpen && pendingResult && (
            <MealResultOverlay 
              isOpen={resultOpen} 
              onClose={() => setResultOpen(false)}
              result={pendingResult}
              onLog={handleLogMeal}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};