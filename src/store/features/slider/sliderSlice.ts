import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { homeBoxSliderItem } from '@/types/homeBoxSliderItem';
import { sliderService } from '@/services/sliderService';

// Slice state tipi
interface SliderState {
  homeBoxSlides: homeBoxSliderItem[];
  //playSlides: PlaySliderItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SliderState = {
  homeBoxSlides: [],
  //playSlides: [],
  status: 'idle',
  error: null
};

// Anasayfa kutu slider verilerini almak için async thunk
export const fetchHomeBoxSlides = createAsyncThunk(
  'slider/fetchHomeBoxSlides',
  async (_, { rejectWithValue }) => {
    try {
      // Service üzerinden veriyi al
      return await sliderService.getHomeBoxSlides();
    } catch (error) {
      // Hata durumunda
      console.error('Öne çıkan oyunlar yüklenirken hata:', error);
      return rejectWithValue('Öne çıkan oyunlar yüklenirken bir hata oluştu.');
    }
  }
);

// Slice oluşturma
const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    // Gerekirse ek reducer'lar burada tanımlanabilir
    resetSliderState: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Anasayfa Box Slides
      .addCase(fetchHomeBoxSlides.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHomeBoxSlides.fulfilled, (state, action: PayloadAction<homeBoxSliderItem[]>) => {
        state.status = 'succeeded';
        state.homeBoxSlides = action.payload;
      })
      .addCase(fetchHomeBoxSlides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

// Action'ları export etme
export const { resetSliderState } = sliderSlice.actions;

// Selector'ları export etme
export const selectHomeBoxSlides = (state: { slider: SliderState }) => state.slider.homeBoxSlides;
export const selectSliderStatus = (state: { slider: SliderState }) => state.slider.status;
export const selectSliderError = (state: { slider: SliderState }) => state.slider.error;

// Reducer'ı export etme
export default sliderSlice.reducer;