import { configureStore } from '@reduxjs/toolkit';
//import { useDispatch } from 'react-redux';
import searchReducer from './features/search/searchSlice';
import sliderReducer from './features/slider/sliderSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    slider: sliderReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;