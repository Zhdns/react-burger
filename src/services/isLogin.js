import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISLOGIN, USER ,TOKEN, REFRESH_TOKEN, PASSWORD } from "../utils/constants";
import { request } from "../utils/utils";


export const login = createAsyncThunk(
    'isLogin/login', 
    async (bodyData) => {
        const response = await request('/auth/login', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        });

        return { response: response, password: bodyData.password }
    }
)

export const registration = createAsyncThunk(
    'isLogin/registration', 
    async(bodyData) => {
        const response = await request('/auth/register', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        });

        return { response: response, password: bodyData.password };
    }
)

export const logout = createAsyncThunk(
    'isLogin/logout', 
    async(bodyData) => {
        
        console.log(bodyData)
        
        return request('/auth/logout', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        })
    }
)

export const editProfile = createAsyncThunk(
    'islogin/editProfile', 
    async(bodyData) => {
        
        return request('/auth/user', {
            method: 'PATCH',
            headers : {
                "Content-type": 'application/json',
                "Authorization": localStorage.getItem(TOKEN)
            },
            body : JSON.stringify(bodyData)
        })
    }
)

export const forgotPassword = createAsyncThunk(
    'isLogin/forgonPassword', 
    async(bodyData) => {
        console.log(bodyData)
        return request('/password-reset', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        })
    }
)

export const resetPassword = createAsyncThunk(
    'isLogin/resetPassword', 
    async(bodyData) => {
        return request('/password-reset/reset', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        })
    }
)

export const updateToken = createAsyncThunk(
    'isLOgin/updateToken', 
    async(token) => {
        return request('/auth/token', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(token)
        })
    }
)

const isLogin = createSlice({
    name: 'isLogin',
    initialState: {
        isLogin: JSON.parse(localStorage.getItem(ISLOGIN)),
        user: JSON.parse(localStorage.getItem(USER)) || { name: '', email: '' },
        resetPasswordState: false,
        isModal: false,
        error: ''
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.fulfilled, (state, action) => {
                const data = action.payload.response
                const password = action.payload.password;
                const token = data.accessToken;
                const refreshToken = data.refreshToken;
                const user = data.user;

                console.log(data)
                localStorage.setItem(TOKEN, token)
                localStorage.setItem(REFRESH_TOKEN, refreshToken)
                localStorage.setItem(PASSWORD, password)
                state.user = user
                state.isLogin = true
            })
            .addCase(registration.rejected, (state, action) => {
                console.error("Error:", action.error.message)
            })
            
            .addCase(logout.fulfilled, (state, action) => {
                const data = action.payload
                const user = {
                    email: '',
                    password: '',
                };

                localStorage.removeItem(TOKEN)
                localStorage.removeItem(REFRESH_TOKEN)
                localStorage.setItem(ISLOGIN, false)
                state.isLogin = false
                state.user = user
            })
            .addCase(logout.rejected, (state, action) => {
                console.error("Error:", action.error.message)
            })
            
            .addCase(editProfile.fulfilled, (state, action) => {
                const data = action.payload
                state.user = data.user
                localStorage.setItem(USER, JSON.stringify(data.user))
                console.log(data)
            })
            .addCase(editProfile.rejected, (state, action) => {
                console.error("Error:", action.error.message)
            })
            
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.resetPasswordState = true

            })
            .addCase(forgotPassword.rejected, (state, action) => {
                console.error("Error:", action.error.message)
            })

            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPasswordState = false
            })
            .addCase(resetPassword.rejected, (state, action) => {
                console.error("Error:", action.error.message)
            })

            .addCase(login.fulfilled, (state, action) => {
                const data = action.payload.response
                const password = action.payload.password;
                const token = data.accessToken;
                const refreshToken = data.refreshToken;
                const user = data.user;

                localStorage.setItem(TOKEN, token)
                localStorage.setItem(REFRESH_TOKEN, refreshToken)
                localStorage.setItem(PASSWORD, password)
                localStorage.setItem(ISLOGIN, true)
                state.user = user
                state.isLogin = true
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action.error.message)
            })

            .addCase(updateToken.fulfilled, (state, action) => {
                const data = action.payload.response
                const token = data.accessToken;
                const refreshToken = data.refreshToken;
                localStorage.setItem(TOKEN, token)
                localStorage.setItem(REFRESH_TOKEN, refreshToken)
                localStorage.setItem(ISLOGIN, true)
                state.isLogin = true
            })
            .addCase(updateToken.rejected, (state, action) => {
                console.error("Error:", action.error.message)
            })
    }   
}) 

export const {authorization, setUser, resetPasswordAction, setUserName, setUserEmail, setModal} = isLogin.actions
export default isLogin

