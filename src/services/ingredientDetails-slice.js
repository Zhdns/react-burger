import { createSlice } from "@reduxjs/toolkit";

const ingredientDetailSlice = createSlice({
    name: "IngredientDetail",
    initialState: {
        details: []
    },
    reducers: {
        showDetails: (state, action) => {
            state.details = action.payload
        }
    }
})

export const {showDetails} = ingredientDetailSlice.actions
export default ingredientDetailSlice