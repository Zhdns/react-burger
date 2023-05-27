import { createSlice } from "@reduxjs/toolkit";

const ingredientDetailSlice = createSlice({
    name: "IngredientDetail",
    initialState: {
        id: null
    },
    reducers: {
        showDetails: (state, action) => {
            state.id = action.payload
        }
    }
})

export const {showDetails} = ingredientDetailSlice.actions
export default ingredientDetailSlice