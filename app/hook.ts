import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/features/robots/selectors';
import { store } from './store';

// Typage du dispatch pour l'application
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// Typage du selector pour l'application
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
