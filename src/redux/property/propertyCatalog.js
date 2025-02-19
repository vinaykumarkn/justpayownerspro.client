import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    jsonPropertyControls: [],
}

const propertyCatalog = createSlice({
    name: 'propertyByCity',
    initialState,
    reducers: {
        setPropertyCatalog: (state, action) => {
            state.jsonPropertyControls = action.payload;
        },
    }
});

export const { setPropertyCatalog } = propertyCatalog.actions;

export default propertyCatalog.reducer;
