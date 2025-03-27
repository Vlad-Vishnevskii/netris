import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error('Ошибка при загрузке событий:', error);
  }
});
