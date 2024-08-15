import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet } from "@/services/http.service";

const initialState = {
    loading: false,
    data: [],
    error: ''
}

// fetch data from api
export const fetchProducts = createAsyncThunk('fetchProductsData', async () => {
    return httpGet('/products')
        .then((response) => response.data)
})

export const allProductsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.error = ''
            state.loading = false

            // console.log("action here",action.payload)
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
    }
});

export default allProductsSlice.reducer