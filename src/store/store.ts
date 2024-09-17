// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '@/features/roomSlice';

export const store = configureStore({
  reducer: {
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
