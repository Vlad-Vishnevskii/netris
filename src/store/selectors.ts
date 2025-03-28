import { RootState } from './store';

export const selectEvents = (state: RootState) => state.events.events || [];
export const selectIsLoading = (state: RootState): boolean => state.events.status === 'loading';
export const selectIsError = (state: RootState): boolean => state.events.status === 'failed';
