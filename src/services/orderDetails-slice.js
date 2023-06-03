import { createSlice } from "@reduxjs/toolkit";
import { ORDERID } from "../utils/constants";


const orderDetails = createSlice({
    name: 'orderDetails',
    initialState: {
        id: localStorage.getItem(ORDERID) || null
    },
    reducers: {
        addDetails: (state, action) => {
            state.id = action.payload
        },
    }
})

export const {addDetails, addOrders} = orderDetails.actions
export default orderDetails



