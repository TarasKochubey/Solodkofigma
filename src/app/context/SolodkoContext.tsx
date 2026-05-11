import React, { createContext, useContext, useState } from 'react';
import { format } from 'date-fns';
import { getCurrentMealMoment } from '../utils/mealMoment';

type Meal = {
  id: string;
  name: string;
  carbs: number;
  calories?: number;
  weight: string;
  time: string;
  source: 'Estimated' | 'From Memory' | 'Scanned' | 'Recent' | 'Homemade' | 'Saved';
  isEstimated?: boolean;
  carbRatio?: string;
  lastUsed?: string;
  kind?: 'meal' | 'custom_food' | 'recipe';
  mealMoment?: 'Morning' | 'Afternoon' | 'Evening';
  recurrence?: string;
  ingredientCount?: number;
  usedThisWeek?: number;
};

type SolodkoContextType = {
  logs: Meal[];
  memory: Meal[];
  addLog: (meal: Omit<Meal, 'id' | 'time'>) => void;
  addMemory: (meal: Omit<Meal, 'id' | 'time'>) => void;
  quickLogMemory: (meal: Meal) => void;
};

const defaultMemory: Meal[] = [
  { id: 'm1', name: "Sourdough Avocado Toast", carbs: 32, weight: "1 slice (120g)", time: "Morning", source: "From Memory", lastUsed: "Yesterday", kind: "meal", mealMoment: "Morning", recurrence: "Often for breakfast", usedThisWeek: 4, carbRatio: "27g per 100g" },
  { id: 'm2', name: "Sweet Potato Bowl", carbs: 65, weight: "350g", time: "Afternoon", source: "From Memory", lastUsed: "Monday", kind: "meal", mealMoment: "Afternoon", recurrence: "Used 2 times this week", usedThisWeek: 2, carbRatio: "19g per 100g" },
  { id: 'm3', name: "Oat Flat White", carbs: 14, weight: "240ml", time: "Morning", source: "From Memory", lastUsed: "Tuesday", kind: "custom_food", mealMoment: "Morning", recurrence: "Usually around now", usedThisWeek: 3, carbRatio: "6g per 100ml" },
  { id: 'm4', name: "Mom's Green Borscht", carbs: 22, weight: "1 bowl (300g)", time: "Saved Meal", source: "From Memory", carbRatio: "7.3g per 100g", lastUsed: "Last week", kind: "recipe", mealMoment: "Afternoon", recurrence: "Logged with lunch", ingredientCount: 7, usedThisWeek: 1 },
  { id: 'm5', name: "Cottage Cheese Bowl", carbs: 18, weight: "usual bowl (220g)", time: "Saved Food", source: "Homemade", carbRatio: "8g per 100g", lastUsed: "Yesterday", kind: "custom_food", mealMoment: "Evening", recurrence: "Last logged yesterday", usedThisWeek: 4 },
  { id: 'm6', name: "Buckwheat Chicken Plate", carbs: 48, weight: "1 plate", time: "Recipe", source: "From Memory", carbRatio: "48g per portion", lastUsed: "Friday", kind: "recipe", mealMoment: "Evening", recurrence: "Often for dinner", ingredientCount: 5, usedThisWeek: 2 },
];

const defaultLogs: Meal[] = [
  { id: 'l1', name: "Artisan Sourdough Avocado Toast", carbs: 32, weight: "120g", time: "09:15", source: "From Memory", mealMoment: "Morning" },
  { id: 'l2', name: "Sweet Potato Salad Bowl", carbs: 42, weight: "250g", time: "12:30", source: "From Memory", mealMoment: "Afternoon" },
  { id: 'l3', name: "Cottage Cheese Bowl", carbs: 18, weight: "usual bowl (220g)", time: "19:10", source: "Homemade", mealMoment: "Evening" },
];

const SolodkoContext = createContext<SolodkoContextType | undefined>(undefined);

export const SolodkoProvider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<Meal[]>(defaultLogs);
  const [memory, setMemory] = useState<Meal[]>(defaultMemory);

  const addLog = (meal: Omit<Meal, 'id' | 'time'>) => {
    const newLog = {
      ...meal,
      id: Math.random().toString(36).substr(2, 9),
      time: format(new Date(), 'HH:mm'),
      mealMoment: meal.mealMoment || getMealMoment()
    };
    setLogs(prev => [newLog, ...prev]);
    rememberLoggedMeal(newLog);
  };

  const addMemory = (meal: Omit<Meal, 'id' | 'time'>) => {
    const newMemory = {
      ...meal,
      id: Math.random().toString(36).substr(2, 9),
      time: 'Saved Meal',
      source: 'From Memory' as const
    };
    setMemory(prev => [newMemory, ...prev]);
  };

  const getMealMoment = (): Meal['mealMoment'] => {
    return getCurrentMealMoment();
  };

  const rememberLoggedMeal = (meal: Meal) => {
    setMemory(prev => {
      const index = prev.findIndex(item => item.name.toLowerCase() === meal.name.toLowerCase());
      if (index === -1) {
        return [{
          ...meal,
          id: `mem-${meal.id}`,
          time: 'Recent Repeat',
          source: 'Recent' as const,
          kind: meal.source === 'Homemade' ? 'custom_food' : 'meal',
          lastUsed: 'Today',
          usedThisWeek: 1,
          recurrence: 'Ready to log again'
        }, ...prev];
      }

      return prev.map((item, itemIndex) => itemIndex === index ? {
        ...item,
        lastUsed: 'Today',
        usedThisWeek: (item.usedThisWeek || 0) + 1,
        recurrence: (item.usedThisWeek || 0) + 1 >= 4 ? `Used ${(item.usedThisWeek || 0) + 1} times this week` : item.recurrence || 'Used recently'
      } : item);
    });
  };

  const quickLogMemory = (meal: Meal) => {
    addLog({
      name: meal.name,
      carbs: meal.carbs,
      calories: meal.calories,
      weight: meal.weight,
      source: meal.source === 'Homemade' ? 'Homemade' : 'From Memory',
      isEstimated: meal.isEstimated,
      carbRatio: meal.carbRatio,
      lastUsed: 'Today',
      kind: meal.kind,
      mealMoment: meal.mealMoment,
      recurrence: meal.recurrence,
      ingredientCount: meal.ingredientCount,
      usedThisWeek: meal.usedThisWeek
    });
  };

  return (
    <SolodkoContext.Provider value={{ logs, memory, addLog, addMemory, quickLogMemory }}>
      {children}
    </SolodkoContext.Provider>
  );
};

export const useSolodko = () => {
  const context = useContext(SolodkoContext);
  if (!context) throw new Error('useSolodko must be used within SolodkoProvider');
  return context;
};
