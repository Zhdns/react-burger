import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISLOGIN, USER ,TOKEN, REFRESH_TOKEN, PASSWORD } from "../utility/constants"
import { request } from "../utility/utility";

// type User = {
//     email: string;
//     name: string;
// }

// type LoginResponse = {
//     accessToken: string;
//     refreshToken: string;
//     user: User;
//     success: boolean;
// }

type LoginRequest = { 
    name?: string;
    email: string;
    password: string;
}

export const login = createAsyncThunk(
    'isLogin/login', 
    async (bodyData: LoginRequest) => {
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
    async(bodyData: LoginRequest) => {
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
    async(bodyData: {token: string | null}) => {
        
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
    async(bodyData: {
        email: string,
        name: string,
    }) => {
        
        const token = localStorage.getItem(TOKEN) || ''
        return request('/auth/user', {
            method: 'PATCH',
            headers : {
                "Content-type": 'application/json',
                "Authorization": token
            },
            body : JSON.stringify(bodyData)
        })
    }
)

export const forgotPassword = createAsyncThunk(
    'isLogin/forgonPassword', 
    async(bodyData: { email: string }) => {
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
    async(bodyData: {password: string, token: string}) => {
        return request('/password-reset/reset', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        })
    }
)

// export const updateToken = createAsyncThunk(
//     'isLOgin/updateToken', 
//     async() => {
//         // console.log(`Thunk: ${token}`)
//         return request('/auth/token', {
//             method: 'POST',
//             headers : {
//                 "Content-type": 'application/json'
//             },
//             body : JSON.stringify(`'token': ${localStorage.getItem(REFRESH_TOKEN)}`)
//         })
//     }
// )

type Login = {
    isLogin: boolean;
    user: {
        name: string | '' ; 
        email: string | '' ;
    }
    resetPasswordState: boolean;
    isModal: boolean;
    error: any;
}

const initialState: Login = {
        isLogin: JSON.parse(localStorage.getItem(ISLOGIN) as string) || false,
        user: JSON.parse(localStorage.getItem(USER) as string) || { name: '', email: '' },
        resetPasswordState: false,
        isModal: false,
        error: ''
}

const isLogin = createSlice({
    name: 'isLogin',
    initialState, 
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
        },
        setError: (state, action) => {
            state.error = action.payload
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
                    name: '',
                    email: '',
                };

                localStorage.removeItem(TOKEN)
                localStorage.removeItem(REFRESH_TOKEN)
                localStorage.setItem(ISLOGIN, JSON.stringify(false))
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
                state.error = action.error.message
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
                console.log(data)
                const password = action.payload.password;
                const token = data.accessToken;
                const refreshToken = data.refreshToken;
                const user = data.user;

                localStorage.setItem(TOKEN, token)
                localStorage.setItem(REFRESH_TOKEN, refreshToken)
                localStorage.setItem(PASSWORD, password)
                localStorage.setItem(ISLOGIN, JSON.stringify(true))
                localStorage.setItem(USER, JSON.stringify(user))
                state.user = user
                state.isLogin = true
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action.error.message)
                state.error = action.error.message
            })

            // .addCase(updateToken.fulfilled, (state, action) => {
            //     const data = action.payload
            //     console.log(data)
            //     const token = data.accessToken;
            //     const refreshToken = data.refreshToken;
            //     localStorage.setItem(TOKEN, token)
            //     localStorage.setItem(REFRESH_TOKEN, refreshToken)
            //     localStorage.setItem(ISLOGIN, true)
            //     state.isLogin = true
            // })
            // .addCase(updateToken.rejected, (state, action) => {
            //     console.error("Error:", action.error.message)
            //     console.log('update token error')
            // })
    }   
}) 

export const {authorization, setUser, resetPasswordAction, setUserName, setUserEmail, setModal, setError} = isLogin.actions
export default isLogin

