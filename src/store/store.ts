import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './reducers';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
