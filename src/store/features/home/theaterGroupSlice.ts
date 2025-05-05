import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { theaterGroupType } from '@/types/theaterGroup';
import { theaterGroupService } from '@/services/theaterGroupService';

interface TheaterGroupState {
  items: theaterGroupType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TheaterGroupState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchTheaterGroups = createAsyncThunk(
  'theaterGroup/fetchTheaterGroups',
  async (_, { rejectWithValue }) => {
    try {
      // Service üzerinden veriyi al
      return await theaterGroupService.gettheaterGroups();
    } catch (error) {
      // Hata durumunda
      console.error('Tiyatro grupları yüklenirken hata:', error);
      return rejectWithValue('Tiyatro grupları yüklenirken bir hata oluştu.');
    }
  }
);

const theaterGroupSlice = createSlice({
  name: 'theaterGroup',
  initialState,
  reducers: {
    resetTheaterGroupState: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheaterGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTheaterGroups.fulfilled, (state, action: PayloadAction<theaterGroupType[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTheaterGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

// Reducer ve action'ları dışa aktar
export const { resetTheaterGroupState } = theaterGroupSlice.actions;

// Selector'ları export etme
export const selectTheaterGroups = (state: { theaterGroup: TheaterGroupState }) => state.theaterGroup?.items || [];
export const selectTheaterGroupStatus = (state: { theaterGroup: TheaterGroupState }) => state.theaterGroup.status;
export const selectTheaterGroupError = (state: { theaterGroup: TheaterGroupState }) => state.theaterGroup.error || null;

// Reducer'ı dışa aktar
export default theaterGroupSlice.reducer;
