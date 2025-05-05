import { configureStore } from '@reduxjs/toolkit';
//import { useDispatch } from 'react-redux';
import searchReducer from './features/search/searchSlice';
import sliderReducer from './features/slider/sliderSlice';
import theaterSliderReducer from './features/slider/theaterSliderSlice';
import thisMonthTheaterListReducer from './features/home/thisMonthTheaterListSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    slider: sliderReducer,
    theaterSlider: theaterSliderReducer,
    thisMonthTheaters: thisMonthTheaterListReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;