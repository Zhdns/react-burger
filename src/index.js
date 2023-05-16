import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.jsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import appSlice from './services/app-slice';
import buregerCart from './services/burgerCart-slice';
import ingredientDetailSlice from './services/ingredientDetails-slice';
import orderConfirmSlice from './services/orederConfirm-slice';
import  setLoginStatus  from './services/setLoginPageStatus';
import isLogin from './services/isLogin';


const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    cart: buregerCart.reducer,
    details: ingredientDetailSlice.reducer,
    order: orderConfirmSlice.reducer,   
    loginStatus: setLoginStatus.reducer,
    isLogin: isLogin.reducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App/>
    </Provider>
  </React.StrictMode>
);

export default store

  