
import AppHeader from '../AppHeader/AppHeader.jsx';
import {useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../services/app-slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage'
import PrivateRoute from '../PrivateRoute';
import IngredientsDetails from '../IngredientDetails/IngredientDetails';
import NoPage from '../../pages/NoPage';
import RegistrationPage from '../../pages/RegistrationPage';
import ProfilePage from '../../pages/ProfilePage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../../pages/ResetPasswordPage.jsx';
import LoginPage from '../../pages/LoginPage.jsx';
import FeedPage from '../../pages/FeedPage/FeedPage';
import ProfileFeedPage from '../../pages/ProfileFeedPage/ProfileFeedPage';
import OrderDetailsPage from '../../pages/OrderDetailPage/OrderDetailsPage';







function App() {

  const dispatch = useDispatch() 
  const isLogin = useSelector((state) => state.isLogin.isLogin);
  const resetPass = useSelector((state) => state.isLogin.resetPasswordState)
  const location = useLocation()
  const background = location.state && location.state.background


  
  
    useEffect(() => {
      dispatch(getData())
    }, [dispatch])

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
      {/* <BrowserRouter> */}
      <AppHeader/>
      <Routes location={background || location}>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={
        <PrivateRoute condition={!isLogin} redirectTo='/'>
          <LoginPage/>
        </PrivateRoute>
        }/>
        <Route path='/register' element={
        <PrivateRoute condition={!isLogin} redirectTo='/profile'>
          <RegistrationPage/>
        </PrivateRoute>
        }/>
        <Route path='/password-reset' element={
        <PrivateRoute condition={!isLogin} redirectTo='/profile'>
          <ForgotPasswordPage/>
        </PrivateRoute>
        }/>
        <Route path='/password-reset/reset' element={
        <PrivateRoute condition={resetPass} redirectTo='/profile'>
          <ResetPasswordPage/>
        </PrivateRoute>
        }/>
        <Route path='/profile' element={
            <PrivateRoute condition={isLogin} redirectTo='/login'>
              <ProfilePage/>
            </PrivateRoute>
          }/>
          <Route path='/profile/orders' element={
            <PrivateRoute condition={isLogin} redirectTo='/login'>
              <ProfileFeedPage/>
            </PrivateRoute>
          }/>
          <Route path='/profile/orders/:id' element={
            <PrivateRoute condition={isLogin} redirectTo='/login'>
              <OrderDetailsPage/>
            </PrivateRoute>
          }/>
          <Route path='/ingredients/:id' element={<IngredientsDetails/>} />
          {background && <Route path='/ingredients/:id' element={<HomePage/>} />}
          <Route path='/feed' element={<FeedPage/>}/>
          <Route path='/feed/:id' element={<OrderDetailsPage/>}/>
          {background && <Route path='/feed/:id' element={<FeedPage/>} />}
      </Routes>
      {/* </BrowserRouter> */}
      </DndProvider>
    </div>
  );
}

export default App;
