import  Style  from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
const url = 'https://norma.nomoreparties.space/api/ingredients'

function App() {

  const [data, setData] = useState([]);
  
  
    const fetchData = useCallback (async() => {
      try { 
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setData(result.data);
        } else {
          throw new Error(`Ошибка: ${response.statusText}`);
        }
      } catch (error) {
        console.log(error);
      }
    }, []);
    
    useEffect(() => {
      fetchData()
    }, [fetchData])

    

  

  return (
    <div>
      <AppHeader/>
      <div className={Style.burgerConstructor}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </div>
    </div>
  );
}

export default App;
