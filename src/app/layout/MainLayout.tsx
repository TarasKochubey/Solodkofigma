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
  const { addLog, addMemory, memory } = useSolodko();
  const [orbState, setOrbState] = useState<'idle' | 'listening' | 'processing' | 'clarification'>('idle');
  const [clarificationText, setClarificationText] = useState('');
  
  const [composerOpen, setComposerOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState<'meal' | 'label'>('meal');
  const [resultOpen, setResultOpen] = useState(false);
  const [pendingText, setPendingText] = useState('');
  const [pendingResult, setPendingResult] = useState<any>(null);
  const [quietStatus, setQuietStatus] = useState('');

  const extractAmount = (text: string) => {
    const match = text.match(/(\d+(?:[.,]\d+)?)\s?(g|gram|grams|kg|ml|cup|cups|bowl|bowls|slice|slices|piece|pieces)\b/i);
    return match ? match[0].replace(',', '.') : '';
  };

  const stripAmount = (text: string) => text.replace(/(\d+(?:[.,]\d+)?)\s?(g|gram|grams|kg|ml|cup|cups|bowl|bowls|slice|slices|piece|pieces)\b/ig, '').trim();

  const gramsFromAmount = (amount: string) => {
    const value = Number(amount.match(/\d+(?:\.\d+)?/)?.[0] || 0);
    if (!value) return 0;
    if (/kg/i.test(amount)) return value * 1000;
    if (/cup/i.test(amount)) return value * 240;
    if (/bowl/i.test(amount)) return value * 300;
    if (/slice/i.test(amount)) return value * 60;
    return value;
  };

  const titleCaseFood = (text: string) => text
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const resolveMeal = (foodText: string, amountText?: string) => {
    const rawFood = stripAmount(foodText) || foodText;
    const amount = amountText || extractAmount(foodText);
    const food = rawFood.trim();
    const normalized = food.toLowerCase();
    const grams = gramsFromAmount(amount);
    const memoryMatch = memory.find(item => normalized && item.name.toLowerCase().includes(normalized));

    if (/offline|saved foods/i.test(foodText)) {
      const saved = memory[0];
      return {
        title: saved?.name || titleCaseFood(food.replace(/offline|saved foods/ig, '').trim() || 'Saved Meal'),
        carbs: saved?.carbs || 32,
        calories: saved?.calories || 260,
        source: 'Recent',
        state: 'offline',
        isEstimated: true,
        previousUsage: 'Using saved foods',
        details: { portion: amount || saved?.weight || 'last logged portion', ratio: saved?.carbRatio || 'Saved ratio' }
      };
    }

    if (/unknown|not found|xyz|not in memory/i.test(foodText)) {
      return {
        title: titleCaseFood(food || 'New Food'),
        carbs: 0,
        source: 'Manual',
        state: 'not_found',
        details: { portion: amount || 'No portion set', ratio: '' }
      };
    }

    if (memoryMatch) {
      const ratioMatch = memoryMatch.carbRatio?.match(/\d+(?:\.\d+)?/)?.[0];
      const per100 = ratioMatch ? Number(ratioMatch) : memoryMatch.carbs / Math.max(gramsFromAmount(memoryMatch.weight), 100) * 100;
      const resolvedCarbs = grams ? Math.round((per100 * grams) / 100) : memoryMatch.carbs;

      return {
        title: memoryMatch.name,
        carbs: resolvedCarbs,
        calories: Math.round(resolvedCarbs * 7.2),
        source: 'From Memory',
        state: 'from_memory',
        isEstimated: false,
        previousUsage: memoryMatch.lastUsed ? `Used ${memoryMatch.lastUsed.toLowerCase()}` : undefined,
        details: { portion: amount || memoryMatch.weight, ratio: `${per100.toFixed(per100 % 1 ? 1 : 0)}g per 100g` }
      };
    }

    const per100 = normalized.includes('apple') ? 14 : normalized.includes('borscht') ? 7.3 : 18;
    const resolvedGrams = grams || 250;
    const resolvedCarbs = Math.round((per100 * resolvedGrams) / 100);

      return {
        title: titleCaseFood(food),
      carbs: resolvedCarbs,
      calories: Math.round(resolvedCarbs * 7),
      source: 'Estimated',
      state: amount ? 'estimated' : 'exact',
      isEstimated: true,
      details: { portion: amount || '1 portion', ratio: `${per100}g per 100g` }
    };
  };

  const showQuietStatus = (message: string) => {
    setQuietStatus(message);
    window.setTimeout(() => setQuietStatus(''), 1800);
  };

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
        setPendingResult(resolveMeal(pendingText, text));
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
        setPendingResult(resolveMeal(text));
        setResultOpen(true);
      }
    }, 1500);
  };

  const handleCameraCapture = () => {
    setCameraOpen(false);
    setOrbState('processing');
    setTimeout(() => {
      setOrbState('idle');
      if (cameraMode === 'label') {
        setPendingResult({
          title: "Scanned Rye Crispbread",
          carbs: 18,
          calories: 110,
          source: 'Scanned',
          state: 'scanned',
          isEstimated: false,
          details: { portion: "2 pieces (36g)", ratio: "50g per 100g" }
        });
      } else {
        setPendingResult({
          title: "Rice Bowl\nwith Vegetables",
          carbs: 58,
          calories: 420,
          source: 'Estimated',
          state: 'estimated',
          isEstimated: true,
          details: { portion: "1 bowl (330g)", ratio: "18g per 100g" }
        });
      }
      setResultOpen(true);
    }, 1100);
  };

  const handleBarcodeNotFound = () => {
    setCameraOpen(false);
    setOrbState('idle');
    setPendingResult(resolveMeal('not in memory label'));
    setResultOpen(true);
  };

  const handleLogMeal = () => {
    if (pendingResult) {
      addLog({
        name: pendingResult.title.replace('\n', ' '),
        carbs: pendingResult.carbs,
        weight: pendingResult.details.portion,
        source: pendingResult.source,
        isEstimated: pendingResult.isEstimated,
        carbRatio: pendingResult.details.ratio,
        lastUsed: 'Today'
      });
    }
    setResultOpen(false);
    setPendingResult(null);
    showQuietStatus('Meal logged');
    navigate('/log');
  };

  const handleSaveMemory = () => {
    if (pendingResult && pendingResult.state !== 'not_found') {
      addMemory({
        name: pendingResult.title.replace('\n', ' '),
        carbs: pendingResult.carbs,
        calories: pendingResult.calories,
        weight: pendingResult.details.portion,
        source: 'From Memory',
        isEstimated: pendingResult.isEstimated,
        carbRatio: pendingResult.details.ratio,
        lastUsed: 'Today'
      });
      setPendingResult({
        ...pendingResult,
        source: 'From Memory',
        state: 'from_memory',
        previousUsage: 'Saved to Memory'
      });
      showQuietStatus(pendingResult.kind === 'recipe' ? 'Recipe saved' : 'Saved to Memory');
    }
  };

  const handleAdjustPortion = () => {
    if (!pendingResult) return;
    setPendingText(pendingResult.title.replace('\n', ' '));
    setClarificationText('Adjust portion');
    setResultOpen(false);
    setOrbState('clarification');
    setComposerOpen(true);
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
              placeholder={orbState === 'clarification' ? "300g" : "What are you eating?"}
              supportingText={orbState === 'clarification' ? clarificationText : undefined}
              onCameraOpen={() => {
                setComposerOpen(false);
                setCameraMode('meal');
                setCameraOpen(true);
              }}
              onBarcodeOpen={() => {
                setComposerOpen(false);
                setCameraMode('label');
                setCameraOpen(true);
              }}
            />
          </div>
        </div>

        <CameraView 
          isOpen={cameraOpen} 
          mode={cameraMode}
          onClose={() => setCameraOpen(false)} 
          onSimulateCapture={handleCameraCapture}
          onNotFound={handleBarcodeNotFound}
        />

        <AnimatePresence>
          {resultOpen && pendingResult && (
            <MealResultOverlay 
              isOpen={resultOpen} 
              onClose={() => setResultOpen(false)}
              result={pendingResult}
              onLog={handleLogMeal}
              onSaveMemory={handleSaveMemory}
              onAdjust={handleAdjustPortion}
              onEdit={handleAdjustPortion}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {quietStatus && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute left-1/2 bottom-[108px] z-[70] -translate-x-1/2 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_10px_28px_-12px_rgba(180,140,120,0.22)] rounded-full px-4 py-2 pointer-events-none"
            >
              <span className="font-sans text-[13px] font-medium text-[#5F6661]">{quietStatus}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
