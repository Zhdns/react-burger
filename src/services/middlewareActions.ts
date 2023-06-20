import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction('WS_CONNECT');
export const wsConnecting = createAction('WS_CONNECTING');
export const wsConnected = createAction('WS_CONNECTED');
export const wsDisconnect = createAction('WS_DISCONNECT');
export const wsDisconnected = createAction('WS_DISCONNECTED');
export const wsOnMessage = createAction('WS_ONMESSEGE')
export const wsOnSend = createAction('WS_ONSEND')