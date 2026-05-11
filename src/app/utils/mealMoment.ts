export type MealMoment = 'Morning' | 'Afternoon' | 'Evening';

export const getCurrentMealMoment = (date = new Date()): MealMoment => {
  const hour = date.getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
};
