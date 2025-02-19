import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    advertiseData: [],
}

const propertyAdvertiseData = createSlice({
    name: 'propertyByCity',
    initialState,
    reducers: {
        setAdvartise: (state, action) => {
            state.advertiseData = action.payload;
        },
    }
});

export const { setAdvartise } = propertyAdvertiseData.actions;

export default propertyAdvertiseData.reducer;
