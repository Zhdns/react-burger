import { createSlice, createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";
import { url } from "../utils/constants";



export const submitOrder = createAsyncThunk(
    "cart/submitOrder", 
    async(_, {getState, rejectWithValue}) => {
        const {bun, main} = getState().cart.cart
        const ingredientsIds = [...bun, ...main].map((item) => item._id)
        try {
        const response = await fetch(`${url}/orders`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsIds }),
        });

        if(!response.ok ) { 
            throw new Error(`Ошибка ${response.status}`)
        }
        const data = await response.json()
        return data
        }  
        catch (error) {
            console.error('Ошибка', error)
            return rejectWithValue(error.message)
        }
    }
)

const buregerCart = createSlice({
    name: 'cart',
    initialState: {
        orderNumber: 0,
        cart: {
            bun: [],
            main: [],
        }
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.fulfilled, (state, action) => {
                const data = action.payload;
                state.orderNumber = data.order.number;
                state.cart.bun = [];
                state.cart.main = [];
            })
            .addCase(submitOrder.rejected, (state, action) => {
                console.error("Ошибка при отправке заказа:", action.error.message);
            })
    }    
})


export const {addItem, removeItem, clearCart, moveItem} = buregerCart.actions
export default buregerCart