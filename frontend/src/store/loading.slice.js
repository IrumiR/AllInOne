import { createSlice } from "@reduxjs/toolkit";

// to show and set the loading component
const initialState = {
    isLoading: false,
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setIsLoading(state, action) {
            const isLoading = action.payload;
            state.loaderCount = isLoading ? state.loaderCount + 1 : Math.max(0, state.loaderCount - 1);
            state.isLoading = isLoading || state.loaderCount - 1 > 0;
          },
    }
});

export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;