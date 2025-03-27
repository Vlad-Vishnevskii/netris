import { createSlice } from '@reduxjs/toolkit';
import { EventsState } from './types';
import { fetchEvents } from './actions';

const initialState: EventsState = {
  events: [],
  status: 'idle',
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default eventsSlice.reducer;
