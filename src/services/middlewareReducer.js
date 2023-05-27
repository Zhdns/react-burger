import { createSlice } from "@reduxjs/toolkit";


const middlewareReducer = createSlice({
    name: 'webSocket',
    initialState: {
        orders : [],
        connected: false
    },
    reducers: {
    wsConnecting: (state) => {
        state.connected = false;
    },
    wsConnected: (state) => {
        state.connected = true;
    },
    wsDisconnected: (state) => {
        state.connected = false;
        state.orders = []
    },
    wsOnMessage: (state, action) => {
        state.orders = action.payload;
        
    },
    },
});

export const { wsConnecting, wsConnected, wsDisconnected, wsOnMessage } = middlewareReducer.actions;

export default middlewareReducer



