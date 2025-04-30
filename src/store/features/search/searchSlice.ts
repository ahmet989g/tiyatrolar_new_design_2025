import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { searchInMockData, GroupedSearchResults, SearchCategory } from '@/services/searchService';

interface SearchState {
  query: string;
  categories: SearchCategory[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  categories: [],
  totalCount: 0,
  isLoading: false,
  error: null
};

// Async thunk ile arama yapma
export const searchItems = createAsyncThunk(
  'search/searchItems',
  async (query: string) => {
    // Gerçek bir API çağrısını simüle etmek için mock verileri kullanıyorum
    const results = await searchInMockData(query);
    return results;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.categories = [];
      state.totalCount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchItems.fulfilled, (state, action: PayloadAction<GroupedSearchResults>) => {
        state.isLoading = false;
        state.categories = action.payload.categories;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Arama yapılırken bir hata oluştu';
      });
  }
});

export const { setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;