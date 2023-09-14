import { createListenerMiddleware, MiddlewareAPI, Dispatch, AnyAction, PayloadAction } from '@reduxjs/toolkit'
import { wsConnected, wsConnecting, wsDisconnected, wsOnMessage} from './middlewareReducer';

type WebSocketEvent = Event & {data: string}

interface ListenerApi extends MiddlewareAPI<Dispatch<AnyAction>, any> {
    dispatch: Dispatch<AnyAction>
}

const listenerMiddleware = createListenerMiddleware();

let socket: any = null;

listenerMiddleware.startListening({
    actionCreator: wsConnecting,
    effect: (action: PayloadAction<string>, listenerApi: ListenerApi) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
            socket = null;
        } 

    socket = new WebSocket(action.payload);

    socket.onopen = (event: Event) => {
    //console.log('Socket opened', event);
    listenerApi.dispatch(wsConnected(action.payload));
    };

    socket.onmessage = (event: WebSocketEvent) => {
    const data = JSON.parse(event.data);
    listenerApi.dispatch(wsOnMessage(data));
    };

    

    socket.onclose = (event: CloseEvent) => {
    //console.log('Socket closed', event);
    listenerApi.dispatch(wsDisconnected());
    };

    socket.onerror = (error: Event) => {
    console.error('WebSocket error: ', error);
    listenerApi.dispatch(wsDisconnected());
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





