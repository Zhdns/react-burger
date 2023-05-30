import { createAction, createSlice, createListenerMiddleware } from '@reduxjs/toolkit'
import {  wsConnect, wsConnected, wsConnecting, wsDisconnect, wsDisconnected, wsOnMessage} from './middlewareReducer';



// export const middleware = () => {

//     let socket = null 

//     return  webSocket => next => action => {
//         switch (action.type) {
//             case 'WS_CONNECT':
//                 if (socket != null) {
//                     socket.close()
//                 }

//                 webSocket.dispatch(wsConnecting(action.payload))
//                 socket = new WebSocket(action.payload)

//                 socket.onopen = (event) => {
//                     console.log('Socket opened', event)
//                     webSocket.dispatch(wsConnected(action.payload));

//                 }
//                 socket.onmessage = (event) => {
//                     const data = JSON.parse(event.data);
//                     webSocket.dispatch(wsOnMessage(data));
//                 };
//                 socket.onclose = (event) => {
//                     console.log('Socket closed', event);
//                     webSocket.dispatch(wsDisconnected(action.payload));
//                 };
//                 socket.onerror = (error) => {
//                     console.error('WebSocket error: ', error);
//                     webSocket.dispatch(wsDisconnected(action.payload));
//                 };

//                 break

//                 case 'WS_DISCONNECT':
//                     if (socket !== null) {
//                         socket.close();
//                     }

//                     socket = null;

//                 break;

//                 default:

//                     return next(action);    
//         }
//     }
// }

const listenerMiddleware = createListenerMiddleware();

let socket = null;

listenerMiddleware.startListening({
    actionCreator: wsConnecting,
    effect: (action, listenerApi) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
            let socket = null;
        } 

    socket = new WebSocket(action.payload);

    socket.onopen = (event) => {
    //console.log('Socket opened', event);
    listenerApi.dispatch(wsConnected(action.payload));
    };

    socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    listenerApi.dispatch(wsOnMessage(data));
    };

    

    socket.onclose = (event) => {
    //console.log('Socket closed', event);
    listenerApi.dispatch(wsDisconnected(action.payload));
    };

    socket.onerror = (error) => {
    console.error('WebSocket error: ', error);
    listenerApi.dispatch(wsDisconnected(action.payload));
    };
},
});

listenerMiddleware.startListening({
    actionCreator: wsDisconnected,
    effect: () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
        } 
    
    socket = null;
    
},
});

export default listenerMiddleware





