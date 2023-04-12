import { createSlice } from "@reduxjs/toolkit";



const appSlice = createSlice({
    name: 'app',
    initialState: {
        data: []
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    }
    
})

export const {setData} = appSlice.actions
export default appSlice

