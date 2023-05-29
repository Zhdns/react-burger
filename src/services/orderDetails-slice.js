import { createSlice } from "@reduxjs/toolkit";


const orderDetails = createSlice({
    name: 'orderDetails',
    initialState: {
        order: {},
        date: '',
        orderPrice: '', 
    },
    reducers: {
        addDetails: (state, action) => {
            state.order = action.payload.order;
            state.date = action.payload.date;
            state.orderPrice = action.payload.orderPrice;
        }
    }
})

export const {addDetails} = orderDetails.actions
export default orderDetails



