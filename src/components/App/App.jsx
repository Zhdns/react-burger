import  Style  from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import {useEffect, useCallback } from 'react';
import { url } from '../../utils/constants.js';
import { checkResponse } from '../../utils/utils.js';
import { useDispatch } from 'react-redux';
import { setData } from '../../services/app-slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



function App() {

  const dispatch = useDispatch()
  
  
    const fetchData = useCallback (async(dispatch) => {
      
        const response = await fetch(`${url}/ingredients`);
        const result = await response.json();

        checkResponse(response, () => {
          dispatch(setData(result.data));
        })
    }, [dispatch]);
    
    useEffect(() => {
      fetchData(dispatch)
    }, [dispatch, fetchData])

    

  

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
      <AppHeader/>
      <div className={Style.burgerConstructor}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </div>
      </DndProvider>
    </div>
  );
}

export default App;
