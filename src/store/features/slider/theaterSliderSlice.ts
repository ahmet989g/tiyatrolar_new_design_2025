import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TheaterItem } from '@/types/theaterItem';
import { theaterSliderService } from '@/services/theaterSliderService';

interface TheaterSliderState {
  theaterSlides: TheaterItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TheaterSliderState = {
  theaterSlides: [],
  status: 'idle',
  error: null
};

// Tiyatro slider verilerini almak için async thunk
export const fetchTheaterSlides = createAsyncThunk(
  'slider/fetchTheaterSlides',
  async (_, { rejectWithValue }) => {
    try {
      return await theaterSliderService.getTheaterSlides();
    } catch (error) {
      console.error('Tiyatro bilgileri yüklenirken hata:', error);
      return rejectWithValue('Tiyatro bilgileri yüklenirken bir hata oluştu.');
    }
  }
);

const theaterSliderSlice = createSlice({
  name: 'theaterSlider',
  initialState,
  reducers: {
    resetTheaterSliderState: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheaterSlides.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTheaterSlides.fulfilled, (state, action: PayloadAction<TheaterItem[]>) => {
        state.status = 'succeeded';
        state.theaterSlides = action.payload;
      })
      .addCase(fetchTheaterSlides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { resetTheaterSliderState } = theaterSliderSlice.actions;

// Selectors
export const selectTheaterSlider = (state: { theaterSlider: TheaterSliderState }) => state.theaterSlider.theaterSlides;
export const selectTheaterSliderStatus = (state: { theaterSlider: TheaterSliderState }) => state.theaterSlider.status;
export const selectTheaterSliderError = (state: { theaterSlider: TheaterSliderState }) => state.theaterSlider.error;

export default theaterSliderSlice.reducer;