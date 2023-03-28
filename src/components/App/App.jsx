import  Style  from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
const url = 'https://norma.nomoreparties.space/api/ingredients'


export const CartContext = React.createContext({
    cartItems: [], 
    addItem: (item) => {},
})

function App() {

  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([])

  const addItem = (item) => {
    setCartItems((prevItems) => [...prevItems, item])
    console.log(item)
  }
  
  const contextValue = useMemo(() => {
    return {cartItems, addItem}
  }, [cartItems])
  
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
    <CartContext.Provider value={contextValue}>
    <div>
      <AppHeader/>
      <div className={Style.burgerConstructor}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </div>
    </div>
    </CartContext.Provider>
  );
}

export default App;
