import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MultipleReceivedOrders} from "../utility/types";


interface WebSocketInterface {
    orders: MultipleReceivedOrders;
    connected: boolean;
}

const initialState: WebSocketInterface = {
    orders: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },
    connected: false,
};



const middlewareReducer = createSlice({
    name: 'webSocket',
    initialState: initialState,
    reducers: {
    wsConnecting: (state, action: PayloadAction<string>) => {
        state.connected = false;
    },
    wsConnected: (state, action: PayloadAction<any>) => {
        state.connected = true;
    },
    wsDisconnected: (state, action: PayloadAction<any>) => {
        state.connected = false;
        //state.orders = []
    },
    wsOnMessage: (state, action: PayloadAction<MultipleReceivedOrders>) => {
            state.orders = action.payload;        
    },
    },
});

export const { wsConnecting, wsConnected, wsDisconnected, wsOnMessage } = middlewareReducer.actions;

export default middlewareReducer