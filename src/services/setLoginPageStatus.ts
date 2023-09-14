import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { LOG_IN, REGISTRATION, FORGOT_PASSWORD, RESET_PASSWORD } from "../utility/constants";

const setLoginStatus = createSlice({
    name: 'loginStatus',
    initialState: {
        status: LOG_IN
    },
    reducers: {
        setStatusProfile: (state, action) => {
            state.status = action.payload
        }
    }
})

export const {  setStatusProfile } = setLoginStatus.actions;

export default setLoginStatus;