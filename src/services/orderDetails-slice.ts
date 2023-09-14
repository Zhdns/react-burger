import { createSlice } from "@reduxjs/toolkit";
import { ORDERID } from "../utility/constants";

type Details = {
    id: string | null
}

const initialState: Details = {
    id: localStorage.getItem(ORDERID) || null
}


const orderDetails = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
        addDetails: (state, action) => {
            state.id = action.payload
        },
    }
})

export const {addDetails} = orderDetails.actions
export default orderDetails



