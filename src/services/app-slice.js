import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { request} from "../utils/utils";


export const getData = createAsyncThunk(
    'data/getData', 
        () => {
        return request('/ingredients')    
    }
);
const appSlice = createSlice({
    name: 'app',
    initialState: {
        data: []
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.fulfilled, (state, action) => {
                state.data = action.payload.data
            })
            .addCase(getData.rejected, (state, action) => {
                console.error("Ошибка при отправке заказа:", action.error.message);
            })
            
    }    
})

export const {setData} = appSlice.actions
export default appSlice

