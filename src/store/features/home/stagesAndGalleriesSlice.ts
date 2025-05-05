import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { stageAndGalleriesType } from '@/types/stageAndGalleries';
import { stageAndGalleriesService } from '@/services/stageAndGalleriesService';

interface StagesAndGalleriesState {
  items: stageAndGalleriesType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StagesAndGalleriesState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchStagesAndGalleries = createAsyncThunk(
  'stagesAndGalleries/fetchStagesAndGalleries',
  async (_, { rejectWithValue }) => {
    try {
      // Service üzerinden veriyi al
      return await stageAndGalleriesService.getStageAndGalleries();
    } catch (error) {
      // Hata durumunda
      console.error('Sahne ve galeriler yüklenirken hata:', error);
      return rejectWithValue('Sahne ve galeriler yüklenirken bir hata oluştu.');
    }
  }
);

const stagesAndGalleriesSlice = createSlice({
  name: 'stagesAndGalleries',
  initialState,
  reducers: {
    resetStagesAndGalleriesState: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStagesAndGalleries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStagesAndGalleries.fulfilled, (state, action: PayloadAction<stageAndGalleriesType[]>) => {
        state.status = 'succeeded';
        console.log('Sahne ve galeriler:', action.payload);
        state.items = action.payload;
      })
      .addCase(fetchStagesAndGalleries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

// Reducer ve action'ları dışa aktar
export const { resetStagesAndGalleriesState } = stagesAndGalleriesSlice.actions;

// Selector'ları export etme
export const selectStagesAndGalleries = (state: { stagesAndGalleries: StagesAndGalleriesState }) => state.stagesAndGalleries?.items;
export const selectStagesAndGalleriesStatus = (state: { stagesAndGalleries: StagesAndGalleriesState }) => state.stagesAndGalleries?.status;
export const selectStagesAndGalleriesError = (state: { stagesAndGalleries: StagesAndGalleriesState }) => state.stagesAndGalleries?.error;

// Reducer'ı export etme
export default stagesAndGalleriesSlice.reducer;
