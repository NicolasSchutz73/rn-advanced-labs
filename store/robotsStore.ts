import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Robot, robotSchema } from '../validation/robotSchema';

type RobotInput = Omit<Robot, 'id'>;

interface RobotState {
  robots: Robot[];
  selectedId?: string;
  create: (robotInput: RobotInput) => boolean;
  update: (id: string, robotInput: RobotInput) => boolean;
  remove: (id: string) => void;
  getById: (id: string) => Robot | undefined;
}

export const useRobotsStore = create<RobotState>()(
  persist(
    (set, get) => ({
      robots: [],
      selectedId: undefined,
      create: (robotInput) => {
        if (get().robots.some(r => r.name === robotInput.name)) return false;
        const newRobot: Robot = { id: crypto.randomUUID(), ...robotInput };
        if (!robotSchema.safeParse(newRobot).success) return false;
        set(state => ({ robots: [...state.robots, newRobot] }));
        return true;
      },
      update: (id, robotInput) => {
        if (get().robots.some(r => r.name === robotInput.name && r.id !== id)) return false;
        const updatedRobot: Robot = { id, ...robotInput };
        if (!robotSchema.safeParse(updatedRobot).success) return false;
        set(state => ({
          robots: state.robots.map(robot => robot.id === id ? updatedRobot : robot)
        }));
        return true;
      },
      remove: (id) => set(state => ({
        robots: state.robots.filter(robot => robot.id !== id)
      })),
      getById: (id) => get().robots.find(robot => robot.id === id),
    }),
    {
      name: 'robots-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);