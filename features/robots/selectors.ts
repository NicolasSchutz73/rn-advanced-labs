import { createSelector } from '@reduxjs/toolkit';
import type { Robot } from '@/model/Robot';
import type rootReducer from '@/app/rootReducer';

// Définition du type RootState à partir du type de rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Sélecteur de base pour récupérer tous les robots
export const selectRobots = (state: RootState): Robot[] => state.robots.items;

// Sélecteur mémoïsé pour récupérer un robot par son id
export const selectRobotById = (id: string) =>
  createSelector(
    [selectRobots],
    (robots) => robots.find((r: Robot) => r.id === id)
  );

// Sélecteur mémoïsé pour le nombre total de robots
export const selectRobotsCount = createSelector(
  [selectRobots],
  (robots) => robots.length
);

// Sélecteur mémoïsé pour les robots triés par nom
export const selectRobotsSortedByName = createSelector(
  [selectRobots],
  (robots) => [...robots].sort((a, b) => a.name.localeCompare(b.name))
);
