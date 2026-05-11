import React, { createContext, useContext, useState } from 'react';
import { format } from 'date-fns';

type Meal = {
  id: string;
  name: string;
  carbs: number;
  calories?: number;
  weight: string;
  time: string;
  source: 'Memory' | 'AI' | 'Scanned';
  isEstimated?: boolean;
};

type SolodkoContextType = {
  logs: Meal[];
  memory: Meal[];
  addLog: (meal: Omit<Meal, 'id' | 'time'>) => void;
};

const defaultMemory: Meal[] = [
  { id: 'm1', name: "Sourdough Avocado Toast", carbs: 32, weight: "1 slice (120g)", time: "Morning", source: "Memory" },
  { id: 'm2', name: "Sweet Potato Bowl", carbs: 65, weight: "350g", time: "Afternoon", source: "Memory" },
  { id: 'm3', name: "Oat Flat White", carbs: 14, weight: "240ml", time: "Morning", source: "Memory" },
];

const defaultLogs: Meal[] = [
  { id: 'l1', name: "Artisan Sourdough Avocado Toast", carbs: 32, weight: "120g", time: "09:15", source: "Memory" },
  { id: 'l2', name: "Sweet Potato Salad Bowl", carbs: 42, weight: "250g", time: "12:30", source: "Memory" },
];

const SolodkoContext = createContext<SolodkoContextType | undefined>(undefined);

export const SolodkoProvider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<Meal[]>(defaultLogs);
  const [memory] = useState<Meal[]>(defaultMemory);

  const addLog = (meal: Omit<Meal, 'id' | 'time'>) => {
    const newLog = {
      ...meal,
      id: Math.random().toString(36).substr(2, 9),
      time: format(new Date(), 'HH:mm')
    };
    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <SolodkoContext.Provider value={{ logs, memory, addLog }}>
      {children}
    </SolodkoContext.Provider>
  );
};

export const useSolodko = () => {
  const context = useContext(SolodkoContext);
  if (!context) throw new Error('useSolodko must be used within SolodkoProvider');
  return context;
};
