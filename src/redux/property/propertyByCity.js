import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    selectedCity: '',
    properties: [],
    isLoading: true,
}

const propertyByCity = createSlice({
    name: 'propertyByCity',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.selectedCity = action.payload;
        },
        setProperties: (state, action) => {
            state.properties = action.payload;
            state.isLoading = false;
        },
        clearProperties: (state) => {
            state.properties = [];
            state.isLoading = true;
        }
    }
});

export const { setCity, setProperties, clearProperties } = propertyByCity.actions;

export default propertyByCity.reducer;
