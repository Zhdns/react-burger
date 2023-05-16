import  Style  from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import {useEffect, useCallback } from 'react';
import { url } from '../../utils/constants.js';
import { checkResponse } from '../../utils/utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { setData, getData } from '../../services/app-slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage'
import LoginPage from '../../pages/LoginPage/LoginPage';
import PrivateRoute from '../../utils/PrivateRoute';
import { ISLOGIN } from '../../utils/constants.js';
import IngredientsDetails from '../IngredientDetails/IngredientDetails';
import IngerdienPage from '../../pages/IngredientPage/IngradientPage';
import NoPage from '../../pages/NoPage';





function App() {

  const dispatch = useDispatch() 
  const isLogin = useSelector((state) => state.isLogin.isLogin);
  const resetPass = useSelector((state) => state.isLogin.resetPasswordState)
  const isModal = useSelector((state) => state.isLogin.isModal)

  
  
    useEffect(() => {
      dispatch(getData())
    }, [dispatch])

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
      <AppHeader/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={
        <PrivateRoute condition={!isLogin} redirectTo='/'>
          <LoginPage/>
        </PrivateRoute>
        }/>
        <Route path='/register' element={
        <PrivateRoute condition={!isLogin} redirectTo='/profile'>
          <LoginPage/>
        </PrivateRoute>
        }/>
        <Route path='/password-reset' element={
        <PrivateRoute condition={!isLogin} redirectTo='/profile'>
          <LoginPage/>
        </PrivateRoute>
        }/>
        <Route path='/password-reset/reset' element={
        <PrivateRoute condition={resetPass} redirectTo='/profile'>
          <LoginPage/>
        </PrivateRoute>
        }/>
        <Route path='/profile' element={
            <PrivateRoute condition={isLogin} redirectTo='/login'>
              <LoginPage/>
            </PrivateRoute>
          }/>
          <Route path='/profile/orders' element={
            <PrivateRoute condition={isLogin} redirectTo='/login'>
              <NoPage/>
            </PrivateRoute>
          }/>
          <Route path='/ingredients/:id' element={isModal ? <HomePage/> : <IngerdienPage/>} />
          <Route path='/feed' element={<NoPage/>}/>
      </Routes>
      </BrowserRouter>
      </DndProvider>
    </div>
  );
}

export default App;
