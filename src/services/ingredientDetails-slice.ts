import { createSlice } from "@reduxjs/toolkit";
import { IDFORMODAL } from "../utility/constants";

type ID = {
    id: string | null
}

const initialState: ID = {
    id: localStorage.getItem(IDFORMODAL) || null
}

const ingredientDetailSlice = createSlice({
    name: "IngredientDetail",
    initialState,
    reducers: {
        showDetails: (state, action) => {
            state.id = action.payload
        }
    }
})

export const {showDetails} = ingredientDetailSlice.actions
export default ingredientDetailSlice