import { createSlice } from "@reduxjs/toolkit";

const orderConfirmSlice = createSlice({
    name: 'order',
    initialState: { 
        order: []
    }, 
    reducers: { 
        showOrder: (state, action) => {
            state.order = action.payload
        }
    }
})

export const {showOrder} = orderConfirmSlice.actions
export default orderConfirmSlice