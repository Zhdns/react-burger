import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import appSlice from './services/appSlice';
import buregerCart from './services/burgerCart-slice';
import ingredientDetailSlice from './services/ingredientDetails-slice';
// import orderConfirmSlice from './services/orederConfirm-slice';
// import  setLoginStatus  from './services/setLoginPageStatus';
import isLogin from './services/isLogin';
import { BrowserRouter } from 'react-router-dom';
import middlewareReducer from './services/middlewareReducer';
import listenerMiddleware from './services/middleware';
import orderDetails from './services/orderDetails-slice';
import { useDispatch as useReduxDispatch } from 'react-redux';

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    cart: buregerCart.reducer,
    details: ingredientDetailSlice.reducer,
    // order: orderConfirmSlice.reducer,   
    // loginStatus: setLoginStatus.reducer,
    isLogin: isLogin.reducer,
    webSocket: middlewareReducer.reducer,
    orderDetails: orderDetails.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
