import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TheaterItem } from '@/types/theaterItem';
import { theaterSliderData } from '@/mock/theaterSliderData';

interface ThisMonthTheaterListState {
  byStage: {
    items: TheaterItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    stageName: string;
  };
  byLocation: {
    items: TheaterItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    locationName: string;
  };
}

const initialState: ThisMonthTheaterListState = {
  byStage: {
    items: [],
    status: 'idle',
    error: null,
    stageName: ''
  },
  byLocation: {
    items: [],
    status: 'idle',
    error: null,
    locationName: ''
  }
};

// Sahne bazlı oyunları getir
export const fetchTheatersByStage = createAsyncThunk(
  'thisMonthTheaters/fetchByStage',
  async (stageName: string, { rejectWithValue }) => {
    try {
      // Gerçek API: const response = await fetch(`/api/theaters/stage/${stageName}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data'dan sahneye göre filtreleme
      return {
        stageName,
        items: theaterSliderData.slice(0, 10) // Mock data
      };
    } catch (error) {
      console.error('Error fetching theaters by stage:', error);
      return rejectWithValue('Sahne oyunları yüklenirken hata oluştu.');
    }
  }
);

// Lokasyon bazlı oyunları getir
export const fetchTheatersByLocation = createAsyncThunk(
  'thisMonthTheaters/fetchByLocation',
  async (locationName: string, { rejectWithValue }) => {
    try {
      // Gerçek API: const response = await fetch(`/api/theaters/location/${locationName}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data'dan lokasyona göre filtreleme
      return {
        locationName,
        items: theaterSliderData.slice(3, 13) // Mock data (farklı oyunlar)
      };
    } catch (error) {
      console.error('Error fetching theaters by location:', error);
      return rejectWithValue('Bölge oyunları yüklenirken hata oluştu.');
    }
  }
);

const thisMonthTheaterListSlice = createSlice({
  name: 'thisMonthTheaters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // By Stage
    builder
      .addCase(fetchTheatersByStage.pending, (state) => {
        state.byStage.status = 'loading';
      })
      .addCase(fetchTheatersByStage.fulfilled, (state, action) => {
        state.byStage.status = 'succeeded';
        state.byStage.items = action.payload.items;
        state.byStage.stageName = action.payload.stageName;
      })
      .addCase(fetchTheatersByStage.rejected, (state, action) => {
        state.byStage.status = 'failed';
        state.byStage.error = action.payload as string;
      });
    
    // By Location
    builder
      .addCase(fetchTheatersByLocation.pending, (state) => {
        state.byLocation.status = 'loading';
      })
      .addCase(fetchTheatersByLocation.fulfilled, (state, action) => {
        state.byLocation.status = 'succeeded';
        state.byLocation.items = action.payload.items;
        state.byLocation.locationName = action.payload.locationName;
      })
      .addCase(fetchTheatersByLocation.rejected, (state, action) => {
        state.byLocation.status = 'failed';
        state.byLocation.error = action.payload as string;
      });
  }
});

// Selectors
export const selectTheatersByStage = (state: { thisMonthTheaters: ThisMonthTheaterListState }) => state.thisMonthTheaters.byStage;
export const selectTheatersByLocation = (state: { thisMonthTheaters: ThisMonthTheaterListState }) => state.thisMonthTheaters.byLocation;

export default thisMonthTheaterListSlice.reducer;