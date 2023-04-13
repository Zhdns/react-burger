import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { url } from "../utils/constants";;


export const getData = createAsyncThunk(
    'data/getData', 
    async(_, { rejectWithValue}) => {
        try {
            const response = await fetch(`${url}/ingredients`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}`)
            }

            return result
        }
        catch (error) {
            console.error('Ошибка', error)
            return rejectWithValue(error.message)
        }
    }
)

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

