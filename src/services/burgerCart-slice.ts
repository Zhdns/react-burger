import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { request } from "../utility/utility";
import { IngredientGlobalType } from "../utility/types";
import { TOKEN, ISPENDING } from "../utility/constants";

type Cart = {
    orderNumber: number | string;
    cart: {
        bun: IngredientGlobalType[];
        main: IngredientGlobalType[];
    };
    error: any;
}

type Owner = {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };

type Order = {
    createdAt: string;
    ingredients: IngredientGlobalType[];
    name: string;
    number: number;
    owner: Owner;
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
  };

type OrederResponse = { 
    name: string;
    order: Order;
    succses: boolean;
}  


const initialState: Cart = {
    orderNumber: 0,
    cart: {
        bun: [],
        main: [],
    },
    error: ''
};

export const submitOrder = createAsyncThunk<OrederResponse, void, { state: { cart: Cart }, rejectValue: any }>(
    "cart/submitOrder", 
    async(_, {getState, rejectWithValue}) => {
        try {
            const {bun, main} = getState().cart.cart
            const ingredientsIds = [...bun, ...bun,  ...main].map((item) => item._id)
            const token = localStorage.getItem(TOKEN) || ''
            return await request('/orders', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
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
    initialState, 
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
        emptyCart: (state) => {
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


export const {addItem, removeItem, moveItem, emptyCart} = buregerCart.actions
export default buregerCart