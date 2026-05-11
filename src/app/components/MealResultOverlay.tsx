import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExpandedMealCard } from './MealCards';

export const MealResultOverlay = ({ isOpen, onClose, result, onLog, onSaveMemory, onAdjust, onEdit }: any) => {
  return (
    <div className="fixed inset-x-0 bottom-[100px] z-50 flex flex-col justify-end px-5 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, transformOrigin: "bottom center" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="pointer-events-auto"
          >
            <ExpandedMealCard
              {...result}
              onLog={onLog || onClose}
              onCancel={onClose}
              onSaveMemory={onSaveMemory}
              onAdjust={onAdjust}
              onEdit={onEdit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
