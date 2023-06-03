import { createSlice, createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";
import { request } from "../utils/utils";
import { TOKEN, ISPENDING } from "../utils/constants";
import { setError } from "./isLogin";



export const submitOrder = createAsyncThunk(
    "cart/submitOrder", 
    async(_, {getState, rejectWithValue}) => {
        try {
            const {bun, main} = getState().cart.cart
            const ingredientsIds = [...bun, ...bun,  ...main].map((item) => item._id)
            return await request('/orders', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": localStorage.getItem(TOKEN)
                },
                body: JSON.stringify({ ingredients: ingredientsIds }),
            });
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const buregerCart = createSlice({
    name: 'cart',
    initialState: {
        orderNumber: 0,
        cart: {
            bun: [],
            main: [],
        }, 
        error: ''
    }, 
    reducers: {
        addItem: (state, action) => { 
            const newItem = {
                ...action.payload,
                newId: `${action.payload._id}-${Date.now()}`
            }
            if (newItem.type === 'bun'){
            state.cart.bun = [newItem]
            }
            else {
                state.cart.main = [...state.cart.main, newItem]
            }

        },

        removeItem: (state, action) => {
            state.cart.main = state.cart.main.filter((item) =>item.newId !== action.payload)
        }, 
        moveItem: (state, action) => {
            state.cart.main = action.payload
        },
        emptyCart: (state, action) => {
            state.cart.bun = [];
            state.cart.main = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.fulfilled, (state, action) => {
                const data = action.payload;
                console.log(data)

                state.orderNumber = data.order.number;
                state.cart.bun = [];
                state.cart.main = [];
            })
            .addCase(submitOrder.rejected, (state, action) => {
                state.error = action.error.message
                console.log('aaa')
            })
            .addCase(submitOrder.pending, (state, action) => {
                state.orderNumber = ISPENDING
            })
    }    
})


export const {addItem, removeItem, clearCart, moveItem, emptyCart} = buregerCart.actions
export default buregerCart