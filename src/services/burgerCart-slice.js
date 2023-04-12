import { createSlice } from "@reduxjs/toolkit";

const buregerCart = createSlice({
    name: 'cart',
    initialState: {
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
                console.log(newItem)
            state.cart.bun = [newItem]
            }
            else {
                state.cart.main = [...state.cart.main, newItem]
            }

        },

        removeItem: (state, action) => {
            state.cart.main = state.cart.main.filter((item) =>item.newId !== action.payload)
        },

        clearCart: (state) => {
            state.cart.bun = []
            state.cart.main = []
        }, 
        moveItem: (state, action) => {
            state.cart.main = action.payload
        }
    }
})


export const {addItem, removeItem, clearCart, moveItem} = buregerCart.actions
export default buregerCart