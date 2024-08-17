import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpGet } from '@/services/http.service';

// Async thunk to fetch filtered services
export const fetchFilteredServices = createAsyncThunk(
  'filteredServices/fetchFilteredServices',
  async ({ searchTerm, category }) => {
    const response = await httpGet(`/services/getfiltered`, {
      params: {
        searchTerm,
        category,
      },
    });
    return response.data;
  }
);

const filteredServicesSlice = createSlice({
  name: 'filteredServices',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFilteredServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default filteredServicesSlice.reducer;
