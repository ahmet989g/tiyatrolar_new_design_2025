import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TheaterItem } from '@/types/theaterItem';
import { theaterSliderData } from '@/mock/theaterSliderData';
import { CityAndStateTheater } from '@/types/cityAndStateTheater';
import { cityAndStateTheaterData } from '@/mock/cityAndStateTheaterData';

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
  childTheaters: {
    items: TheaterItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  cityTheaters: {
    items: CityAndStateTheater[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  stateTheaters: {
    items: CityAndStateTheater[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
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
  },
  childTheaters: {
    items: [],
    status: 'idle',
    error: null
  },
  cityTheaters: {
    items: [],
    status: 'idle',
    error: null
  },
  stateTheaters: {
    items: [],
    status: 'idle',
    error: null
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
        items: theaterSliderData.slice(0, 8) // Mock data
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
        items: theaterSliderData.slice(6, 14) // Mock data (farklı oyunlar)
      };
    } catch (error) {
      console.error('Error fetching theaters by location:', error);
      return rejectWithValue('Bölge oyunları yüklenirken hata oluştu.');
    }
  }
);

// Çocuk tiyatrolarını getir
export const fetchChildTheaters = createAsyncThunk(
  'thisMonthTheaters/fetchChildTheaters',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        items: theaterSliderData.slice(2, 9)
      };
    } catch (error) {
      console.error('Error fetching theaters by child:', error);
      return rejectWithValue('Çocuk oyunları yüklenirken hata oluştu.');
    }
  }
);

// Şehir tiyatrolarını getir
export const fetchCityTheaters = createAsyncThunk(
  'thisMonthTheaters/fetchCityTheaters',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        items: cityAndStateTheaterData.slice(0, 4)
      };
    } catch (error) {
      console.error('Error fetching theaters by city:', error);
      return rejectWithValue('Şehir oyunları yüklenirken hata oluştu.');
    }
  }
);

// Devlet tiyatrolarını getir
export const fetchStateTheaters = createAsyncThunk(
  'thisMonthTheaters/fetchStateTheaters',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        items: cityAndStateTheaterData.slice(4, 8)
      };
    } catch (error) {
      console.error('Error fetching theaters by state:', error);
      return rejectWithValue('Devlet oyunları yüklenirken hata oluştu.');
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
    
    // Child Theaters
    builder
      .addCase(fetchChildTheaters.pending, (state) => {
        state.childTheaters.status = 'loading';
      })
      .addCase(fetchChildTheaters.fulfilled, (state, action) => {
        state.childTheaters.status = 'succeeded';
        state.childTheaters.items = action.payload.items;
      })
      .addCase(fetchChildTheaters.rejected, (state, action) => {
        state.childTheaters.status = 'failed';
        state.childTheaters.error = action.payload as string;
      });
    
    // City Theaters
    builder
      .addCase(fetchCityTheaters.pending, (state) => {
        state.cityTheaters.status = 'loading';
      })
      .addCase(fetchCityTheaters.fulfilled, (state, action) => {
        state.cityTheaters.status = 'succeeded';
        state.cityTheaters.items = action.payload.items;
      })
      .addCase(fetchCityTheaters.rejected, (state, action) => {
        state.cityTheaters.status = 'failed';
        state.cityTheaters.error = action.payload as string;
      });
    
    // State Theaters
    builder
      .addCase(fetchStateTheaters.pending, (state) => {
        state.stateTheaters.status = 'loading';
      })
      .addCase(fetchStateTheaters.fulfilled, (state, action) => {
        state.stateTheaters.status = 'succeeded';
        state.stateTheaters.items = action.payload.items;
      })
      .addCase(fetchStateTheaters.rejected, (state, action) => {
        state.stateTheaters.status = 'failed';
        state.stateTheaters.error = action.payload as string;
      });
  }
});

// Selectors
export const selectTheatersByStage = (state: { thisMonthTheaters: ThisMonthTheaterListState }) => state.thisMonthTheaters.byStage;
export const selectTheatersByLocation = (state: { thisMonthTheaters: ThisMonthTheaterListState }) => state.thisMonthTheaters.byLocation;
export const selectChildTheaters = (state: { thisMonthTheaters: ThisMonthTheaterListState }) => state.thisMonthTheaters.childTheaters;
export const selectCityTheaters = (state: { thisMonthTheaters: ThisMonthTheaterListState }) => state.thisMonthTheaters.cityTheaters;
export const selectStateTheaters = (state: { thisMonthTheaters: ThisMonthTheaterListState }) => state.thisMonthTheaters.stateTheaters;

export default thisMonthTheaterListSlice.reducer;