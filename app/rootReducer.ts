import { combineReducers } from '@reduxjs/toolkit';
import robotsReducer from '@/features/robots/robotsSlice';

/* Sert à regrouper tous les reducers de l'application en un seul reducer principle.*/
const rootReducer = combineReducers({
    robots: robotsReducer,
});

export default rootReducer;
