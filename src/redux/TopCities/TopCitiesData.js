import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    TopCitiesColl: [],
}

const TopCitiesProvider = createSlice({
    name: 'TopCities',
    initialState,
    reducers: {
        setTopCities: (state, action) => {
            state.TopCitiesColl = action.payload;
        },
    }
});

export const { setTopCities } = TopCitiesProvider.actions;

export default TopCitiesProvider.reducer;
