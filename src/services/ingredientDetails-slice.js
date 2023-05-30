import { createSlice } from "@reduxjs/toolkit";
import { IDFORMODAL } from "../utils/constants";

const ingredientDetailSlice = createSlice({
    name: "IngredientDetail",
    initialState: {
        id: localStorage.getItem(IDFORMODAL) || null
    },
    reducers: {
        showDetails: (state, action) => {
            state.id = action.payload
        }
    }
})

export const {showDetails} = ingredientDetailSlice.actions
export default ingredientDetailSlice