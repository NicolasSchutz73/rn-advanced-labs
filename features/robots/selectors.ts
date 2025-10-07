import type { Robot } from '@/model/Robot';
import type rootReducer from '@/app/rootReducer';

// Définition du type RootState à partir du type de rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Sélecteur pour récupérer tous les robots
export const selectRobots = (state: RootState): Robot[] => state.robots.items;

// Sélecteur pour récupérer un robot par son id
export const selectRobotById = (id: string) => (state: RootState): Robot | undefined =>
  state.robots.items.find((r: Robot) => r.id === id);
