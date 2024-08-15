import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userRole: null
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        }
    }
})

export const { setUser, setUserRole } = userSlice.actions;

export default userSlice.reducer;