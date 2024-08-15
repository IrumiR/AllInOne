import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet } from "@/services/http.service";

const initialState = {
    loading: false,
    data: [],
    error: ''
}

// fetch data from api
export const fetchServices = createAsyncThunk('fetchServicesData', async () => {
    return httpGet('/services')
        .then((response) => response.data)
})

export const allServicesSlice = createSlice({
    name: "services",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchServices.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchServices.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.error = ''
            state.loading = false

            // console.log("action here",action.payload)
        })
        builder.addCase(fetchServices.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
    }
});

export default allServicesSlice.reducer