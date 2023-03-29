import  Style  from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { url } from '../../utils/constants.js';
import { checkResponse } from '../../utils/utils.js';


export const CartContext = React.createContext({
    cartItems: [], 
    addItem: (item) => {},
    clearCart: () => {}, 
    removeItem: (index) => {}
})

function App() {

  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([])

  const addItem = (item) => {
    const newItem = {
      ...item,
      newId: `${item._id}-${Date.now()}`
    }
    setCartItems((prevItems) => [...prevItems, newItem])
    console.log(item)
  }

  const clearCart = () => {
    setCartItems([])
  }
  
  const removeItem = (newId) => { 
    setCartItems((prevItems) => prevItems.filter((item) => item.newId !== newId))
  }
  
  const contextValue = useMemo(() => {
    return {cartItems, addItem, clearCart, removeItem}
  }, [cartItems])
  
    const fetchData = useCallback (async() => {
      
        const response = await fetch(`${url}/ingredients`);
        const result = await response.json();

        checkResponse(response, () => {
          setData(result.data);
        })
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
