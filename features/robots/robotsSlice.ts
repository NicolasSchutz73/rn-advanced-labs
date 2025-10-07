import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Robot } from '@/model/Robot';

interface RobotsState {
    items: Robot[];
}

const initialState: RobotsState = {
    items: [],
};

const robotsSlice = createSlice({
    name: 'robots',
    initialState,
    reducers: {
        createRobot: (state, action: PayloadAction<Omit<Robot, 'id'>>) => {
            const robot = action.payload;

            // Vérifier si le nom est unique
            const nameExists = state.items.some(r => r.name === robot.name);
            if (nameExists) {
                throw new Error(`Un robot avec le nom "${robot.name}" existe déjà`);
            }

            // Générer un ID avec uuid si absent
            const newRobot: Robot = {
                ...robot,
                id: uuidv4(),
            };

            state.items.push(newRobot);
        },

        updateRobot: (state, action: PayloadAction<{ id: string; changes: Partial<Robot> }>) => {
            const { id, changes } = action.payload;
            const index = state.items.findIndex(r => r.id === id);

            if (index === -1) {
                throw new Error(`Robot avec l'id "${id}" introuvable`);
            }

            // Si le nom est modifié, vérifier qu'il ne collisionne pas avec un autre robot
            if (changes.name) {
                const nameExists = state.items.some(
                    r => r.id !== id && r.name === changes.name
                );
                if (nameExists) {
                    throw new Error(`Un autre robot avec le nom "${changes.name}" existe déjà`);
                }
            }

            state.items[index] = { ...state.items[index], ...changes };
        },

        deleteRobot: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const index = state.items.findIndex(r => r.id === id);

            if (index === -1) {
                throw new Error(`Robot avec l'id "${id}" introuvable`);
            }

            state.items = state.items.filter(r => r.id !== id);
        },
    },
});

export const { createRobot, updateRobot, deleteRobot } = robotsSlice.actions;
export default robotsSlice.reducer;