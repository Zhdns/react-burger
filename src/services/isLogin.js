import { createSlice } from "@reduxjs/toolkit";
import { ISLOGIN, USER} from "../utils/constants";

const isLogin = createSlice({
    name: 'isLogin',
    initialState: {
        isLogin: JSON.parse(localStorage.getItem(ISLOGIN)),
        user: JSON.parse(localStorage.getItem(USER)) || { name: '', email: '' },
        resetPasswordState: false,
        isModal: false,
    }, 
    reducers: {
        authorization: (state, action) => {
            state.isLogin = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        resetPasswordAction: (state, action) => {
            state.resetPasswordState = action.payload
        },
        setUserName: (state, action) => {
            state.user.name = action.payload
        },
        setUserEmail: (state, action) => {
            state.user.email = action.payload
        },
        setModal: (state, action ) => {
            state.isModal = action.payload
        }
    }
})

export const {authorization, setUser, resetPasswordAction, setUserName, setUserEmail, setModal} = isLogin.actions
export default isLogin

