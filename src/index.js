import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.jsx';
import { Provider } from 'react-redux';
import { configureStore, createAction } from '@reduxjs/toolkit';
import appSlice from './services/app-slice';
import buregerCart from './services/burgerCart-slice';
import ingredientDetailSlice from './services/ingredientDetails-slice';
import orderConfirmSlice from './services/orederConfirm-slice';
import  setLoginStatus  from './services/setLoginPageStatus';
import isLogin from './services/isLogin';
import { BrowserRouter } from 'react-router-dom';
import { middleware } from './services/middleware';
import middlewareReducer from './services/middlewareReducer';
import listenerMiddleware from './services/middleware';
import orderDetails from './services/orderDetails-slice';



const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    cart: buregerCart.reducer,
    details: ingredientDetailSlice.reducer,
    order: orderConfirmSlice.reducer,   
    loginStatus: setLoginStatus.reducer,
    isLogin: isLogin.reducer,
    webSocket: middlewareReducer.reducer,
    orderDetails: orderDetails.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

export default store

  